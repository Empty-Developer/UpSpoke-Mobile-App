import VocabularyIntroScreen from '@/components/lesson/VocabularyIntroScreen';
import { COURSE_DATE } from '@/constants/CourseData';
import { Redirect, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PracticeScreen() {
  const { lessonId } = useLocalSearchParams();
  // first learning vocabulary
  const [isStudyingVocabulary, setIsStudyingVocabulary] = useState(true);

  const allLessons = COURSE_DATE.chapters.flatMap((c) =>
    c.review ? [...c.lessons, c.review] : c.lessons
  );

  const currentLesson = allLessons.find((l) => l.id === lessonId);

  const questions = currentLesson ? currentLesson.questions : [];

  if (questions.length === 0) {
    // if AI create lessons is empty, therefore reverse of router
    return <Redirect href="/(tabs)/lessons" />;
  }

  if (isStudyingVocabulary) {
    return (
      <SafeAreaView style={styles.container}>
        <VocabularyIntroScreen
          questions={questions}
          onStartLesson={() => setIsStudyingVocabulary(false)}
        />
      </SafeAreaView>
    );
  }

  return <View></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
