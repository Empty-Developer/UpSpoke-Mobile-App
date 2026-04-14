import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { router, Stack, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useFonts } from 'expo-font';
import '@/global.css';
import AuthProvider from '@/providers/AuthProvider';
import { useAuth } from '@/context/AuthContext';
import { ActivityIndicator, View } from 'react-native';
import React, { useEffect } from 'react';
import IntroScreen from '@/components/auth/IntroScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Toaster } from 'sonner-native';
import { useDeepLinking } from '@/hooks/use-deep-linking';

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootLayoutNav() {
  const { session, loading, profile } = useAuth();
  const segments = useSegments();
  const [loaded] = useFonts({
    GeistMono: require('@/assets/fonts/Geist-Regular.ttf'),
  });

  // handle deep linking for links
  /*
    redirect users to the
    registration page if
    they are not registered
  */
  useDeepLinking();

  // user are immediately redirected to the screen, sipping th registration screen
  useEffect(() => {
    if (loading || !loaded) return
    // all data user, I use it for requests
    if (session && (!profile || !profile.onboarding_completed)) {
      /*
        if Im currently on the boarding screen,
        there`s no point in going back to the
        boarding screen.

        0 = registration

        if the user current status
        is = "onboarding" there`s no
        point in proceeding to the next step!!!
      */
      const inOnboarding = segments[0] === 'onboarding';
      if (!inOnboarding) {
        router.replace('/onboarding');
      }
    }
  }, [session, loading, loaded, profile, segments]);

  if (loading || !loaded) {
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
          <Toaster />
        </GestureHandlerRootView>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="onboarding" />
      </Stack>
      <Toaster />
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
