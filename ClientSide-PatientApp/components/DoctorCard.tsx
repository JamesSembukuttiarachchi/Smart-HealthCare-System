import { View, Text, Image, Button } from 'react-native';
import React from 'react';

type DoctorCardProps = {
  name: string;
  specialty: string;
  rating: string;
};

const DoctorCard: React.FC<DoctorCardProps> = ({ name, specialty, rating }) => {
  return (
    <View className="bg-blue-100 rounded-xl p-4 m-2 w-64">
      <View className="flex-row items-center">
        <Image
          source={{ uri: 'https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?semt=ais_hybrid' }} // Placeholder for doctor image
          className="w-16 h-16 rounded-full"
        />
        <View className="ml-4">
          <Text className="text-lg font-semibold">{name}</Text>
          <Text className="text-sm text-gray-600">{specialty}</Text>
          <Text className="text-sm text-yellow-600">{rating} reviews</Text>
        </View>
      </View>
      <View className="flex-row justify-between mt-4">
        <Button title="View Details" onPress={() => {}} />
        <Button title="Book now" onPress={() => {}} />
      </View>
    </View>
  );
};

export default DoctorCard;
