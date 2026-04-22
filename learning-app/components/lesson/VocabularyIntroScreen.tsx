import { Question } from '@/constants/CourseData';
import { useMemo, useState } from 'react';
import { View, Text } from 'react-native';

interface StudyCard {
  key: string;
  word: Word;
  direction: 'zh-en' | 'en-zh';
}

interface DeckBuckets {
  recognition: StudyCard[];
  recall: StudyCard[];
  total: number;
}

type StudyPhase = "recognition" | "recall"

interface StudyState {
  phase: StudyPhase;
  queue: string[];
  recallKeys: string[];
  cards: Record<string, StudyCard>;
  total: number;
  completed: number;
}

/*
  1 ~
  When this section is re-rendered,
  `useMemo()` should not trigger
  this logic, as takes some time to
  compute.
  (OPTIMIZATION)
*/
const getUniqueWords = (questions: Question[]): Word[] => {
  const allWords = new Map<string, Word>();
  questions.forEach((question) => {
    const wordSource =
      question.type === 'listening_mc'
        ? question.mandarin.words
        : question.options.flatMap((opt) => opt.mandarin.words);

    wordSource.forEach((word) => {
      if (word && word.hanzi && !allWords.has(word.hanzi)) {
        allWords.set(word.hanzi, word);
      }
    });
  });

  return Array.from(allWords.values());
};

const buildDeck = (words: Word[]): DeckBuckets => {
  const recognition: StudyCard[] = words.map((word) => ({
    key: `${word.hanzi}-recognition`,
    word,
    direction: 'zh-en',
  }));

  const recall: StudyCard[] = words.map((word) => ({
    key: `${word.hanzi}-recall`,
    word,
    direction: 'en-zh',
  }));

  return {
    recognition,
    recall,
    total: recognition.length + recall.length,
  };
};



export default function VocabularyIntroScreen({
  questions,
  onStartLesson,
}: {
  questions: Question[];
  onStartLesson: () => void;
}) {
  const vocabulary = useMemo(() => getUniqueWords(questions), [questions]); // 1 ~
  const deck = useMemo(() => buildDeck(vocabulary), [vocabulary])
  // const [state, setState] = useState<StudyState>(() =>)
  return (
    <View>
      <Text>VocabularyIntroScreen</Text>
    </View>
  );
}
