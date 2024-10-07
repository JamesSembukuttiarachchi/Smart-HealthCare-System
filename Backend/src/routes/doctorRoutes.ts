import express from "express";
import { getAllDoctors } from "../controllers/doctorController";

const router = express.Router();

router.get("/doctors", getAllDoctors);

export default router;
