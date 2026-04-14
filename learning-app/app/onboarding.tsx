import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
} from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function OnBoardingScreen() {
  const color = Colors['light'];
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [level, setLevel] = useState<string | null>(null);
  const [motivation, setMotivation] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [showPaywall, setShowPaywall] = useState(false);

  // arrow button
  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      router.back();
    }
  };

  // button
  const isNextEnable = () => {
    /*
      if the input text and `trim` is
      greater than 0, the function will return `true`;
      otherwise, if the input is empty, it will return
      `false` and nothing will happen
    */
    if (step === 0) return name.trim().length > 0;
    if (step === 1) return !!level;
    if (step === 2) return motivation.length > 0;
    if (step === 3) return selectedInterests.length > 0;
    return false;
  };

  // next step for button
  const handleContinue = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // TODO: Save profile
    }
  };

  // 4 function for rendering step by step...
  const renderStepOneName = () => (
    <View style={styles.stepContainer}>
      <ThemedText type="title" style={styles.title}>
        Как тебя зовут?
      </ThemedText>
      <Text style={[styles.subtitle, { color: Colors.subduedTextColor }]}>
        Ваше имя будет использоваться для персонализации ваших уроков.
      </Text>
      <TextInput
        onChangeText={setName}
        autoFocus
        value={name}
        placeholderTextColor="#9CA3AF"
        placeholder="Ваше Имя..."
        style={[
          styles.input,
          { color: color.text, borderBottomColor: color.text },
        ]}
      />
    </View>
  );

  const renderStepTwoLevel = () => (
    <View style={styles.stepContainer}>
      <ThemedText type="title" style={styles.title}>
        Какой сильно ты знаешь English?
      </ThemedText>
      <ScrollView
        contentContainerStyle={{ rowGap: 16 }}
        style={{ marginTop: 20 }}
      ></ScrollView>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: color.background }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        {/* header */}
        <View style={styles.header}>
          {step > 0 && (
            <TouchableOpacity onPress={handleBack} hitSlop={20}>
              <Ionicons name="arrow-back" size={26} color={color.text} />
            </TouchableOpacity>
          )}
          <View style={styles.progressTrack}>
            <View
              style={{
                height: '100%',
                width: `${((step + 1) / 4) * 100}%`,
                backgroundColor: Colors.primaryAccentColor,
                borderRadius: 10,
              }}
            ></View>
          </View>
        </View>
        {/* main container */}
        <View style={styles.mainContent}>
          <Animated.View
            key={step}
            entering={FadeIn}
            exiting={FadeOut}
            style={styles.animatedView}
          >
            {step === 0 && renderStepOneName()}
            {step === 1 && renderStepTwoLevel()}
          </Animated.View>
        </View>
        {/* button next step || footer*/}
        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleContinue}
            disabled={!isNextEnable()}
            style={[
              styles.continueButton,
              {
                backgroundColor: isNextEnable() ? '#91B829' : '#E5E7EB',
              },
            ]}
          >
            <Text
              style={[
                styles.continueButtonText,
                { color: isNextEnable() ? '#FFF' : '#9CA3AF' },
              ]}
            >
              {step === 3 ? 'Начнем!' : 'Продолжить'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 60,
    marginTop: 10,
  },
  backButtonContainer: {
    width: 40,
  },
  progressTrack: {
    flex: 1,
    height: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  progressBar: {
    height: '100%',
    borderRadius: 10,
  },
  mainContent: {
    flex: 1,
  },
  animatedView: {
    flex: 1,
  },
  stepContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 12,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 32,
  },
  input: {
    fontSize: 22,
    fontWeight: '500',
    paddingVertical: 12,
    borderBottomWidth: 2,
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  continueButton: {
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
