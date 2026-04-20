import AsyncStorage from '@react-native-async-storage/async-storage';

const STATS_KEY = 'lesson_progress';

export interface LessonProgress {
  [lessonId: string]: number; // lessonId -> completionCount

}

const readProgress = async (): Promise<LessonProgress> => {
  try {
    const raw = await AsyncStorage.getItem(STATS_KEY);

    if (!raw) {
      return;
    }

    return JSON.parse(raw) as LessonProgress;
  } catch (error) {
    return {}
  }
};

const writeProgress = async (data: LessonProgress) => {
  await AsyncStorage.setItem(STATS_KEY, JSON.stringify(stats))
}

export const incrementLessonCompletion = async (lessonId: string) => {
  const progress = await readProgress()
  progress[lessonId] = (progress[lessonId] || 0) + 1
  await writeProgress(stats)
}

export const getAllProgress = async () => {
  const stats = await readStats()

  return {
    minutesSpoken: Math.round(stats.minutesSpoken * 10) / 10,
    minutesListened: Math.round(stats.minutesListened * 10) / 10,
    weeklyChange: {
      spoken: 0,
      listened: 0,
    }
  }
}


