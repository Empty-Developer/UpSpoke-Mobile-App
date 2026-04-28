import { Word } from '@/constants/CourseData';
import { useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from '../themed-text';
import { Colors } from '@/constants/theme';

export default function FlashCard({
  word,
  direction,
}: {
  word: Word;
  direction: 'en-zh' | 'zx-en';
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnimation = useRef(new Animated.Value(0)).current;

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  const flipToFront = () => {
    // this is a flip forward _||_
    Animated.timing(flipAnimation, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
    setIsFlipped(false);
  };

  const flipToBack = () => {
    // this is a flip back _||_
    Animated.timing(flipAnimation, {
      toValue: 180,
      duration: 250,
      useNativeDriver: true,
    }).start();
    setIsFlipped(true);
  };

  const frontContent = () => {
    if (direction === 'en-zh') {
      return (
        <ThemedText style={styles.englishFront}>{word.english}</ThemedText>
      );
    }

    return (
      <View style={styles.mandarinContent}>
        <ThemedText style={styles.pinyin}>{word.hanzi}</ThemedText>
        <ThemedText style={styles.hanzi}>{word.pinyin}</ThemedText>
      </View>
    );
  };

  const backContent = () => {
    if (direction === 'zx-en') {
      return (
        <View style={styles.mandarinContent}>
          <ThemedText style={[styles.pinyin, styles.mandarinBackText]}>
            {word.pinyin}
          </ThemedText>
          <ThemedText style={[styles.hanzi, styles.mandarinBackText]}>
            {word.hanzi}
          </ThemedText>
        </View>
      )
    }

    return (
      <ThemedText style={[styles.englishBack, styles.mandarinBackText]}>
        {word.english}
      </ThemedText>
    )
  };

  return (
    <Pressable onPress={isFlipped ? flipToFront : flipToBack}>
      <View>
        <Animated.View
          style={[styles.card, styles.cardFront, frontAnimatedStyle]}
        >
          {/* front content */}
          {frontContent()}
        </Animated.View>
        <Animated.View
          style={[styles.card, styles.cardBack, backAnimatedStyle]}
        >
          {/* back content */}
          {backContent()}
        </Animated.View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 340,
    maxHeight: 440,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    borderRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    paddingHorizontal: 32,
    paddingVertical: 48,
  },
  cardFront: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  cardBack: {
    backgroundColor: Colors.primaryAccentColor,
    position: 'absolute',
    top: 0,
  },
  mandarinContent: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    width: '100%',
  },
  pinyin: {
    fontSize: 40,
    lineHeight: 48,
    fontWeight: '600',
    textAlign: 'center',
    maxWidth: '90%',
  },
  hanzi: {
    fontSize: 30,
    lineHeight: 36,
    textAlign: 'center',
    maxWidth: '90%',
  },
  mandarinBackText: {
    color: 'black',
  },
  englishFront: {
    fontSize: 40,
    lineHeight: 48,
    textAlign: 'center',
    fontWeight: '600',
    maxWidth: '90%',
  },
  englishBack: {
    fontSize: 40,
    lineHeight: 48,
    textAlign: 'center',
    fontStyle: 'italic',
    maxWidth: '90%',
  },
});
