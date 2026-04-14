import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { supabase } from '@/utils/supabase';
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

const LEVELS = [
  {
    id: 'beginner',
    title: 'Начинающий',
    description: 'Я знаю несколько слов или не знаю ничего.',
  },
  {
    id: 'intermediate',
    title: 'Средний',
    description: 'Я знаю нормально, но хочу закрепить знания на практике.',
  },
  {
    id: 'advancer',
    title: 'Продвинутый',
    description:
      'Я могу спокойно использовать English в жизни, но хочу изучить что-то новое.',
  },
];

const MOTIVATION = [
  {
    id: 'travel',
    title: 'Путишествие',
    icon: 'airplane-outline',
  },
  {
    id: 'work',
    title: 'Работа',
    icon: 'briefcase-outline',
  },
  {
    id: 'family',
    title: 'Семья',
    icon: 'heart-outline',
  },
  {
    id: 'colture',
    title: 'Культура',
    icon: 'book-outline',
  },
  {
    id: 'hobby',
    title: 'Хобби',
    icon: 'game-controller-outline',
  },
];

const INTERESTING = [
  'Еда',
  'Бизнес',
  'Повседневная жизнь',
  'Технологии',
  'Творчиство',
  'Музыка',
  'Политика',
  'Спорт',
];

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

  // motivation
  const toggleMotivation = (id: string) => {
    if (motivation.includes(id)) {
      setMotivation(motivation.filter((m) => m !== id));
    } else {
      setMotivation([...motivation, id]);
    }
  };

  // interest
  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  // supabase save data
  const saveProfile = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Now user found")

      const {error} = await supabase.from("profiles").upsert({
        id: user.id,
        full_name: name,
        english_level: level,
        motivations: motivation,
        interests: selectedInterests,
        onboarding_completed: true,
        updated_at: new Date().toISOString()
      })

      if (error) throw error
    } catch (error) {}
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
        Как сильно ты знаешь English?
      </ThemedText>
      <ScrollView
        contentContainerStyle={{ rowGap: 16 }}
        style={{ marginTop: 20 }}
      >
        {LEVELS.map((l) => (
          <TouchableOpacity
            key={l.id}
            style={[
              styles.optionCard,
              level === l.id && {
                borderColor: '#91B829',
                backgroundClip: '#FFF5F0',
              },
            ]}
            onPress={() => setLevel(l.id)}
          >
            <ThemedText
              style={[
                styles.optionTitle,
                level == l.id && { color: '#91B829' },
              ]}
            >
              {l.title}
            </ThemedText>
            <ThemedText style={[styles.optionDescription]}>
              {l.description}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderStepTreeMotivation = () => (
    <View style={styles.stepContainer}>
      <ThemedText type="title" style={styles.title}>
        Почему ты хочешь выучишь English?
      </ThemedText>
      <ThemedText style={styles.subtitle}>
        Выбирите все что подходит.
      </ThemedText>

      <ScrollView contentContainerStyle={{ rowGap: 10 }}>
        {MOTIVATION.map((m) => {
          const isSelected = motivation.includes(m.id);

          return (
            <TouchableOpacity
              key={m.id}
              style={[
                styles.optionCard,
                styles.motivationCard,
                isSelected && {
                  borderColor: '#91B829',
                  backgroundClip: '#FFF5F0',
                },
              ]}
              onPress={() => toggleMotivation(m.id)}
            >
              <Ionicons
                name={m.icon as any}
                size={24}
                color={isSelected ? '#91B829' : color.icon}
              />
              <ThemedText
                style={[styles.optionTitle, isSelected && { color: '#91B829' }]}
              >
                {m.title}
              </ThemedText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  const renderStepFourInterests = () => (
    <View style={styles.stepContainer}>
      <ThemedText type="title" style={styles.title}>
        Что вас интересует?
      </ThemedText>
      <ThemedText style={styles.subtitle}>
        Выбирите все что подходит.
      </ThemedText>

      <View style={styles.tagsContainer}>
        {INTERESTING.map((i) => {
          const isSelected = selectedInterests.includes(i);

          return (
            <TouchableOpacity
              key={i}
              style={[
                styles.tag,
                isSelected && {
                  borderColor: '#91B829',
                  backgroundClip: '#FFF5F0',
                },
              ]}
              onPress={() => toggleInterest(i)}
            >
              <ThemedText
                style={[styles.tagText, isSelected && { color: '#91B829' }]}
              >
                {i}
              </ThemedText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: color.background }]}
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
          <View style={styles.progressBarContainer}>
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
            style={{ flex: 1 }}
          >
            {step === 0 && renderStepOneName()}
            {step === 1 && renderStepTwoLevel()}
            {step === 2 && renderStepTreeMotivation()}
            {step === 3 && renderStepFourInterests()}
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
  backButton: {
    marginRight: 16,
  },
  progressBarContainer: {
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
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  stepContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.subduedTextColor,
    marginBottom: 32,
  },
  input: {
    fontSize: 20,
    borderBottomWidth: 2,
    paddingVertical: 12,
    marginTop: 20,
  },
  optionCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  motivationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: Colors.subduedTextColor,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 20,
  },
  tag: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  tagText: {
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
    width: '100%',
  },
  continueButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
