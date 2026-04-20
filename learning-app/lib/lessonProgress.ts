import AsyncStorage from '@react-native-async-storage/async-storage';

const STATS_KEY = 'lesson_progress';

export interface LessonProgress {
  [lessonId: string]: number; // lessonId -> completionCount
}

const readProgress = async (): Promise<LessonProgress> => {
  try {
    const raw = await AsyncStorage.getItem(STATS_KEY);

    return raw ? (JSON.parse(raw) as LessonProgress) : {}
  } catch (error) {
    return {};
  }
};

const writeProgress = async (data: LessonProgress) => {
  await AsyncStorage.setItem(STATS_KEY, JSON.stringify(data));
};

export const incrementLessonCompletion = async (lessonId: string) => {
  const progress = await readProgress();
  progress[lessonId] = (progress[lessonId] || 0) + 1;
  await writeProgress(progress);
};

export const getAllProgress = async (): Promise<LessonProgress> => {
  return await readProgress();
};
