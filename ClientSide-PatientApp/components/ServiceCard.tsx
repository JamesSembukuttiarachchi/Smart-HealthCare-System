import { View, Text } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

type ServiceCardProps = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const ServiceCard: React.FC<ServiceCardProps> = ({ title, icon }) => {
  return (
    <View className="bg-blue-300 rounded-xl p-4 items-center justify-center m-2 w-28">
      <Ionicons name={icon} size={32} color="white" />
      <Text className="text-white text-center mt-2">{title}</Text>
    </View>
  );
};

export default ServiceCard;
