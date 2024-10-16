import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useDoctors } from '@/app/context/DoctorContext'; // Adjust the path to your actual context file

const DoctorListScreen = () => {
  const { doctors } = useDoctors();
  const router = useRouter();

  return (
    <ScrollView className="p-4 bg-white">
      <Text className="text-3xl font-bold mb-4">Available Doctors</Text>
      {doctors.map((doctor) => (
        <View
          key={doctor._id}
          className="border p-4 mb-4 rounded-lg shadow-lg"
          style={{ borderColor: '#ccc' }}
        >
          <Text className="text-lg font-bold">{doctor.name}</Text>
          <Text>Specialty: {doctor.specialization}</Text>
          
          <Button
            title="Make Appointment"
            onPress={() => router.push(`/(tabs)/home/bookings/${doctor._id}`)}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default DoctorListScreen;
