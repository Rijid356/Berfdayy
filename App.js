import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from './src/utils/theme';

// Screens - Claude CLI will build these out
import HomeScreen from './src/screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.background },
          headerTintColor: COLORS.primary,
          headerTitleStyle: { fontWeight: '600', color: COLORS.text },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: COLORS.background },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: '🎂 Birthday Interviews' }}
        />
        {/* Add remaining screens here:
          - AddChild
          - ChildProfile
          - Interview (headerShown: false, gestureEnabled: false)
          - InterviewReview
          - YearCompare
          - Settings
        */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
