import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen 
        name="home" 
        options={{ headerShown: false }} // Home screen
      />
      <Stack.Screen 
        name="bookings/bookDoc"
        options={{ headerShown: false}} // Booking screen
      />
    </Stack>
  )
}

export default HomeLayout