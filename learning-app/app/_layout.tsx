import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useFonts } from 'expo-font';
import '@/global.css';
import { useColorScheme } from '@/hooks/use-color-scheme';
import AuthProvider from '@/providers/AuthProvider';
import { useAuth } from '@/context/AuthContext';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React from 'react';
import IntroScreen from '@/components/auth/IntroScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootLayoutNav() {
  const { session, loading, profile } = useAuth();

  const [loaded] = useFonts({
    GeistMono: require('@/assets/fonts/Geist-Regular.ttf'),
  });

  if (loading) {
    return (
      <View className="flex-1">
        <ActivityIndicator size={'large'} color="white" />
      </View>
    );
  }

  console.log(session);

  if (!session) {
    return (
      <ThemeProvider value={DefaultTheme}>
        {/* the first element visible
        when opening the application*/}
        <GestureHandlerRootView className="flex-1">
          <IntroScreen />
        </GestureHandlerRootView>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: 'modal', title: 'Modal' }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

const style = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});
