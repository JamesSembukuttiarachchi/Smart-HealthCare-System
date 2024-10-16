import { View, Text, ScrollView, TextInput } from 'react-native';
import React from 'react';
import ServiceCard from '@/components/ServiceCard';
import DoctorCard from '@/components/DoctorCard';
import { Ionicons } from '@expo/vector-icons';

const Home = () => {
  return (
    <ScrollView className="bg-white flex-1 p-4">
      {/* Notification */}
      <View className="flex-row justify-between items-center p-4 bg-gray-100 rounded-lg mb-4">
        <Text className="text-sm">You have a message</Text>
        <Text className="font-bold">Your ID is verified</Text>
        <Ionicons name="notifications-outline" size={24} color="black" />
      </View>

      {/* Search Bar */}
      <View className="flex-row items-center bg-gray-200 rounded-lg p-2 mb-4">
        <Ionicons name="search-outline" size={24} color="gray" />
        <TextInput
          placeholder="Search your health service"
          className="ml-2 flex-1 text-gray-700"
        />
      </View>

      {/* Banner */}
      <View className="bg-blue-100 rounded-lg p-6 mb-6">
        <Text className="text-lg font-semibold">Your first booking gets 20% off!</Text>
        <Text className="text-sm text-gray-700 mb-4">There are many offers available.</Text>
        <View className="bg-blue-500 rounded-lg p-2 w-24 text-center">
          <Text className="text-white text-center">Book now</Text>
        </View>
      </View>

      {/* Top Service */}
      <View className="mb-6">
        <View className="flex-row justify-between">
          <Text className="text-xl font-bold">Top Service</Text>
          <Text className="text-sm text-blue-500">See all</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <ServiceCard title="Appointments" icon="calendar-outline" />
          <ServiceCard title="Insurance Management" icon="shield-outline" />
          <ServiceCard title="Remote Consultations" icon="videocam-outline" />
        </ScrollView>
      </View>

      {/* Popular Doctor */}
      <View>
        <View className="flex-row justify-between mb-4">
          <Text className="text-xl font-bold">Popular Doctor</Text>
          <Text className="text-sm text-blue-500">See all</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <DoctorCard name="Dr. Aruni" specialty="Eye Specialist" rating="5.8" />
          <DoctorCard name="Dr. Ajey" specialty="Hair Specialist" rating="7.1" />
        </ScrollView>
      </View>

      {/* How can we help today */}
      <View className="mb-6">
        <Text className="text-xl font-bold mb-4">How can we help you today?</Text>
        <View className="flex-row flex-wrap justify-between">
          <ServiceCard title="Book appointments" icon="clipboard-outline" />
          <ServiceCard title="My prescriptions" icon="document-text-outline" />
          <ServiceCard title="Ask a doctor" icon="chatbubbles-outline" />
          <ServiceCard title="My reports" icon="file-tray-outline" />
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
