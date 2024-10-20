import * as doctorService from "../services/doctorService";
import * as doctorRepository from "../repositories/doctorRepository";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config";

// Mock the repository functions
jest.mock("../repositories/doctorRepository");
jest.mock("jsonwebtoken");

describe("doctorService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("signupDoctor", () => {
    it("should create a new doctor if not already registered", async () => {
      const doctorData = {
        name: "Dr. John",
        email: "john@example.com",
        specialization: "Cardiology",
        phone: "1234567890",
        password: "password",
      };

      (doctorRepository.findDoctorByEmail as jest.Mock).mockResolvedValue(null);
      (doctorRepository.createDoctor as jest.Mock).mockResolvedValue(doctorData);

      const result = await doctorService.signupDoctor(doctorData);

      expect(doctorRepository.findDoctorByEmail).toHaveBeenCalledWith(doctorData.email);
      expect(doctorRepository.createDoctor).toHaveBeenCalledWith(doctorData);
      expect(result).toEqual(doctorData);
    });

    it("should throw an error if the doctor is already registered", async () => {
      const doctorData = {
        name: "Dr. John",
        email: "john@example.com",
        specialization: "Cardiology",
        phone: "1234567890",
        password: "password",
      };

      (doctorRepository.findDoctorByEmail as jest.Mock).mockResolvedValue(doctorData);

      await expect(doctorService.signupDoctor(doctorData)).rejects.toThrow(
        "Doctor already registered with this email."
      );
    });
  });

  describe("loginDoctor", () => {
    it("should return a token if credentials are correct", async () => {
      const email = "john@example.com";
      const password = "password";
      const doctor = { _id: "123", email, comparePassword: jest.fn().mockResolvedValue(true) };

      (doctorRepository.findDoctorByEmail as jest.Mock).mockResolvedValue(doctor);
      (jwt.sign as jest.Mock).mockReturnValue("mockToken");

      const result = await doctorService.loginDoctor(email, password);

      expect(doctorRepository.findDoctorByEmail).toHaveBeenCalledWith(email);
      expect(doctor.comparePassword).toHaveBeenCalledWith(password);
      expect(result).toEqual({ token: "mockToken", doctor });
    });

    it("should throw an error if doctor not found", async () => {
      const email = "john@example.com";
      const password = "password";

      (doctorRepository.findDoctorByEmail as jest.Mock).mockResolvedValue(null);

      await expect(doctorService.loginDoctor(email, password)).rejects.toThrow(
        "Doctor not found with this email."
      );
    });

    it("should throw an error if password is incorrect", async () => {
      const email = "john@example.com";
      const password = "password";
      const doctor = { _id: "123", email, comparePassword: jest.fn().mockResolvedValue(false) };

      (doctorRepository.findDoctorByEmail as jest.Mock).mockResolvedValue(doctor);

      await expect(doctorService.loginDoctor(email, password)).rejects.toThrow(
        "Incorrect password."
      );
    });
  });

  describe("getAllDoctors", () => {
    it("should return all doctors", async () => {
      const doctors = [{ name: "Dr. John" }, { name: "Dr. Jane" }];
      (doctorRepository.getAllDoctors as jest.Mock).mockResolvedValue(doctors);

      const result = await doctorService.getAllDoctors();

      expect(doctorRepository.getAllDoctors).toHaveBeenCalled();
      expect(result).toEqual(doctors);
    });

    it("should throw an error if fetching doctors fails", async () => {
      (doctorRepository.getAllDoctors as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(doctorService.getAllDoctors()).rejects.toThrow("Database error");
    });
  });

  describe("getDoctorById", () => {
    it("should return doctor by ID", async () => {
      const doctor = { name: "Dr. John" };
      (doctorRepository.getDoctorById as jest.Mock).mockResolvedValue(doctor);

      const result = await doctorService.getDoctorById("123");

      expect(doctorRepository.getDoctorById).toHaveBeenCalledWith("123");
      expect(result).toEqual(doctor);
    });

    it("should throw an error if doctor is not found", async () => {
      (doctorRepository.getDoctorById as jest.Mock).mockResolvedValue(null);

      await expect(doctorService.getDoctorById("123")).rejects.toThrow("Doctor not found");
    });
  });

  describe("updateDoctor", () => {
    it("should update and return the doctor", async () => {
      const updatedDoctor = { name: "Dr. John Updated" };
      (doctorRepository.updateDoctor as jest.Mock).mockResolvedValue(updatedDoctor);

      const result = await doctorService.updateDoctor("123", updatedDoctor);

      expect(doctorRepository.updateDoctor).toHaveBeenCalledWith("123", updatedDoctor);
      expect(result).toEqual(updatedDoctor);
    });

    it("should throw an error if doctor is not found", async () => {
      (doctorRepository.updateDoctor as jest.Mock).mockResolvedValue(null);

      await expect(doctorService.updateDoctor("123", {})).rejects.toThrow("Doctor not found");
    });
  });

  describe("deleteDoctor", () => {
    it("should delete the doctor", async () => {
      const deletedDoctor = { name: "Dr. John" };
      (doctorRepository.deleteDoctor as jest.Mock).mockResolvedValue(deletedDoctor);

      const result = await doctorService.deleteDoctor("123");

      expect(doctorRepository.deleteDoctor).toHaveBeenCalledWith("123");
      expect(result).toEqual(deletedDoctor);
    });

    it("should throw an error if doctor is not found", async () => {
      (doctorRepository.deleteDoctor as jest.Mock).mockResolvedValue(null);

      await expect(doctorService.deleteDoctor("123")).rejects.toThrow("Doctor not found");
    });
  });
});
