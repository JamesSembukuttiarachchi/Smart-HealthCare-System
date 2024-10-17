import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker"; // Picker for selecting month and year
import moment from "moment"; // Moment.js for handling dates
import { useDoctors } from "@/app/context/DoctorContext";
import CustomButton from "@/components/CustomButton";
import { useAuth } from "@/app/context/AuthContext";
import { useAppointments } from "@/app/context/AppointmentContext";
import axios from "axios";
//import { useAuth } from '../hooks/useAuth'; // Assuming you have a custom hook for fetching user

const AppointmentScreen: React.FC = () => {
  const { user } = useAuth();
  const { doctorId } = useLocalSearchParams();
  const { createAppointment } = useAppointments();
  const { doctors } = useDoctors();
  const [selectedDate, setSelectedDate] = useState<string>(
    moment().format("DD")
  ); // Start with current day
  const [selectedMonth, setSelectedMonth] = useState<string>(
    moment().format("MM")
  ); // Start with current month
  const [selectedYear, setSelectedYear] = useState<string>(
    moment().format("YYYY")
  ); // Start with current year
  const [selectedTime, setSelectedTime] = useState<string>();
  const [fullName, setFullName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<string>("Male");
  const [problem, setProblem] = useState<string>("");
  const [selectedHospital, setSelectedHospital] = useState<string>(""); // State to store the selected hospital
  const [appointments, setAppointments] = useState<any[]>([]); // Store fetched appointments

  const selectedDoctor = doctors.find(
    (doctor) => String(doctor._id) === String(doctorId)
  );

  //const  user  = auth.currentUser; // Custom hook to get the current user
  const router = useRouter();

  // Handle appointment creation
  const handleSetAppointment = async () => {
    const appointmentData = {
      patientId: user._id, // Patient ID from auth context
      doctorId: doctorId as string,
      hospitalId: selectedHospital,
      appointmentDate: `${selectedYear}-${selectedMonth}-${selectedDate}`,
      appointmentTime: selectedTime as string,
    };

    await createAppointment(appointmentData); // Use context to create appointment
  };

  // Calculate the days of the selected month, starting from the current day
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);

  useEffect(() => {
    const currentDate = moment(`${selectedYear}-${selectedMonth}-01`);
    const days = Array.from(
      { length: currentDate.daysInMonth() },
      (_, i) => i + 1
    );

    // Fetch appointments for the selected doctor
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `http://192.168.1.3:3000/api/appointments/doctor/${doctorId}`,

        );
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments", error);
      }
    };

    fetchAppointments();
    setDaysInMonth(days);
  }, [selectedMonth, selectedYear, doctorId]);

  // Helper function to filter appointments by selected date
  const isTimeSlotBooked = (time: string) => {
    const selectedFullDate = moment(
      `${selectedYear}-${selectedMonth}-${selectedDate}`
    ).format("YYYY-MM-DD");
    return appointments.some(
      (appointment) =>
        moment(appointment.appointmentDate).format("YYYY-MM-DD") ===
          selectedFullDate && appointment.appointmentTime === time
    );
  };

  return (
    <ScrollView className="flex-1 px-4 py-6 bg-white">
      <Text className="text-lg font-semibold text-center mb-4">
        New Appointment
      </Text>

      {/* Month and Year Selection */}
      <View className="flex-row justify-between items-center mb-4">
        <View style={{ flex: 1 }}>
          <Picker
            selectedValue={selectedMonth}
            onValueChange={(itemValue) => setSelectedMonth(itemValue)}
          >
            {moment.months().map((month, index) => (
              <Picker.Item
                key={index}
                label={month}
                value={String(index + 1).padStart(2, "0")}
              />
            ))}
          </Picker>
        </View>

        <View style={{ flex: 1 }}>
          <Picker
            selectedValue={selectedYear}
            onValueChange={(itemValue) => setSelectedYear(itemValue)}
          >
            {[...Array(5).keys()].map((_, index) => {
              const year = moment().year() + index;
              return (
                <Picker.Item
                  key={year}
                  label={String(year)}
                  value={String(year)}
                />
              );
            })}
          </Picker>
        </View>
      </View>

      {/* Horizontal Scroll for Dates */}
      <Text className="text-md mb-2">Select Date</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-4"
      >
        {daysInMonth.map((day) => (
          <TouchableOpacity
            key={day}
            className={`px-4 py-2 ${
              selectedDate === String(day) ? "bg-blue-400" : "bg-gray-200"
            } rounded mx-2`}
            onPress={() => setSelectedDate(String(day))}
          >
            <Text>{day}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Time Selection */}
      <Text className="text-md mb-4">Available Time</Text>
      <View className="flex-row flex-wrap justify-between mb-4">
        {[
          "09:00 AM",
          "09:30 AM",
          "10:00 AM",
          "10:30 AM",
          "11:00 AM",
          "11:30 AM",
          "12:00 PM",
          "12:30 PM",
          "03:00 PM",
          "03:30 PM",
          "04:00 PM",
          "04:30 PM",
        ].map((time) => (
          <TouchableOpacity
            key={time}
            className={`px-3 py-2 mb-2 ${
              isTimeSlotBooked(time) ? "bg-gray-700" : "bg-gray-200"
            } rounded-lg`}
            disabled={isTimeSlotBooked(time)} // Disable if the slot is booked
            onPress={() => setSelectedTime(time)}
          >
            <Text>{time}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Hospital Dropdown */}
      <Text className="font-semibold mb-2">Select Hospital</Text>
      <View className="border border-gray-300 rounded  mb-4">
        <Picker
          selectedValue={selectedHospital}
          onValueChange={(itemValue) => setSelectedHospital(itemValue)}
        >
          {selectedDoctor?.availableHospitals.length > 0 ? (
            selectedDoctor.availableHospitals.map((hospital) => (
              <Picker.Item
                key={hospital._id}
                label={hospital.name}
                value={hospital._id}
              />
            ))
          ) : (
            <Picker.Item label="No hospitals available" value="" />
          )}
        </Picker>
      </View>

      <TextInput
        className="border border-gray-300 rounded px-4 py-2 mb-4"
        placeholder="Full name"
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        className="border border-gray-300 rounded px-4 py-2 mb-4"
        placeholder="Age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />

      <TextInput
        className="border border-gray-300 rounded px-4 py-2 mb-4"
        placeholder="Write your problem"
        multiline
        numberOfLines={4}
        value={problem}
        onChangeText={setProblem}
      />

      {/* Set Appointment Button */}
      <CustomButton title="Set Appointment" onPress={handleSetAppointment} />
    </ScrollView>
  );
};

export default AppointmentScreen;
