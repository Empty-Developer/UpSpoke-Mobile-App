import { Question } from '@/constants/CourseData';
import { Colors } from '@/constants/theme';
import { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProgressHeader from './ProgressHeader';
import ConfirmDialog from '../ui/ConfirmDialog';
import { router } from 'expo-router';

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

type StudyPhase = 'recognition' | 'recall';

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

const initializeStudyState = (deck: DeckBuckets): StudyState => {
  const cards: Record<string, StudyCard> = {};
  [...deck.recognition, ...deck.recognition].forEach((entry) => {
    cards[entry.key] = entry;
  });

  return {
    phase: 'recognition',
    queue: deck.recognition.map((entry) => entry.key),
    recallKeys: deck.recall.map((entry) => entry.key),
    cards,
    total: deck.total,
    completed: 0,
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
  const deck = useMemo(() => buildDeck(vocabulary), [vocabulary]);
  const [state, setState] = useState<StudyState>(() =>
    initializeStudyState(deck)
  );
  const [exitConfirmVisible, setExitConfirmVisible] = useState(false);

  useEffect(() => {
    if (
      state.queue.length === 0 &&
      state.recallKeys.length === 0 &&
      state.completed >= state.total
    ) {
      onStartLesson();
    }
  }, [
    state.queue.length,
    state.recallKeys.length,
    state.completed,
    state.total,
    onStartLesson,
  ]);

  const progressPercent =
    state.total === 0 ? 0 : (state.completed / state.total) * 100;

  const currentKey = state.queue[0];
  const currentCard = currentKey ? state.cards[currentKey] : undefined;
  const headerCount = currentCard
    ? Math.min(state.completed + 1, state.total)
    : state.completed;

  return (
    <View style={styles.container}>
      <ConfirmDialog
        visible={exitConfirmVisible}
        title="Выйти с практики"
        description="Вы уверены что хотите выйти? Ваш прогресс будет не сохранен!"
        cancelLabel='Отмена'
        confirmLabel='Выход'
        destructive
        onCancel={() => setExitConfirmVisible(false)}
        onConfirm={() => {
          setExitConfirmVisible(false)
          router.push("/lessons")
        }}
      />
      <ProgressHeader
        progress={progressPercent}
        currentCount={headerCount}
        totalCount={state.total}
        onClose={() => setExitConfirmVisible(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  instructionContainer: {
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  instructionTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 6,
    textAlign: 'center',
  },
  instructionText: {
    fontSize: 15,
    color: Colors.subduedTextColor,
    textAlign: 'center',
    lineHeight: 22,
  },
  flashcardContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  bottomActions: {
    marginTop: 'auto',
    paddingTop: 16,
    gap: 16,
  },
  gradeButtons: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  gradeButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  againButton: {
    backgroundColor: '#f3f4f6',
    borderColor: '#d1d5db',
  },
  gotItButton: {
    backgroundColor: Colors.primaryAccentColor,
    borderColor: Colors.primaryAccentColor,
  },
  disabledButton: {
    opacity: 0.4,
  },
  pressedButton: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  gradeButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#374151',
  },
  gradeButtonTextWhite: {
    fontSize: 17,
    fontWeight: '600',
    color: '#ffffff',
  },
  skipButton: {
    width: '100%',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipButtonPressed: {
    opacity: 0.6,
  },
  skipButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.subduedTextColor,
  },
});
