import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Colors } from '@/constants/theme';
import { useVideoPlayer, VideoView } from 'expo-video';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  useFonts,
  EBGaramond_500Medium_Italic,
} from '@expo-google-fonts/eb-garamond';

const { width, height } = Dimensions.get('window');
const videoSource = require('@/assets/videos/broll.mp4');

const MENU_HEIGHT = 250;
const PEEK_MENU_HEIGHT = 50;
const CLOSED_POSITION = MENU_HEIGHT - PEEK_MENU_HEIGHT;

export default function IntroScreen() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const mainTextOpacity = useSharedValue(0);
  const scriptTextOpacity = useSharedValue(0);

  const [fontsLoaded] = useFonts({
    EBGaramond_500Medium_Italic,
  });

  // Изучай Английский прямо сейчас, Начни ...
  const mainTextWords: string[] = [
    'Изучай',
    'English',
    'прямо',
    'сейчас!',
    'Начни',
  ];
  const scriptPhrases: string[] = ['Speaking', 'Learning', 'Using', 'Applying'];

  const player = useVideoPlayer(videoSource, (player) => {
    /*
      the video will play indefinitely
      in the background
    */
    player.loop = true;
    player.muted = true; // turn off the sound on the video
    player.play();
  });

  const mainTextAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      mainTextOpacity.value,
      [0, 1],
      [30, 0],
      Extrapolation.CLAMP
    );

    return {
      opacity: mainTextOpacity.value,
      transform: [{ translateY }],
    };
  });

  const scriptTextAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scriptTextOpacity.value,
      [0, 1],
      [20, 0],
      Extrapolation.CLAMP
    );

    return {
      opacity: scriptTextOpacity.value,
      transform: [{ translateY }],
    };
  });

  const animatedTextIn = () => {
    mainTextOpacity.value = withTiming(1, { duration: 1200 });
    scriptTextOpacity.value = withDelay(800, withTiming(1, { duration: 1200 }));
  };

  const animatedScriptOut = () => {
    scriptTextOpacity.value = withTiming(0, { duration: 500 });
  };

  const animatedScriptIn = () => {
    scriptTextOpacity.value = withTiming(1, { duration: 600 });
  };

  useEffect(() => {
    player.play();

    const timeout = setTimeout(() => {
      animatedTextIn();
    }, 300);

    /*
      wait 3.5s (reading time)
      start fade out
      wait 0.5s (animation time)
      change word (invisible)
      wait 0.15s (small pause)
      start fade in
    */
    const cycleInterval = setInterval(() => {
      animatedScriptOut();
      setTimeout(() => {
        setCurrentPhraseIndex((prev) => {
          const nextIndex = (prev + 1) % scriptPhrases.length;

          if (nextIndex === 0) {
            setTimeout(() => animatedScriptIn(), 150)
          }

          return nextIndex;
        });
      }, 500);
    }, 3500);
    /*
      avoiding memory leaks when
      rendering new words
    */
    return () => {
      clearTimeout(timeout);
      clearInterval(cycleInterval);
    };
  }, []);

  useEffect(() => {
    if (currentPhraseIndex > 0) {
      const timeout = setTimeout(() => {
        animatedScriptIn()
      }, 150);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [currentPhraseIndex])

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View className="flex-1 bg-black">
      <VideoView
        nativeControls={false}
        player={player}
        contentFit="cover"
        style={[StyleSheet.absoluteFill, { width, height }]}
      />
      {/* overlay */}
      <View style={[StyleSheet.absoluteFill]} className="bg-black/50 z-[20]" />
      {/* hero text section */}
      <View
        className="left-[30px] right-[30px] z-[25] absolute"
        style={{ top: height * 0.14 }}
      >
        <Animated.View className="mb-0" style={[mainTextAnimatedStyle]}>
          <Text
            className="font-extrabold text-[#fbfbfb] tracking-normal"
            style={{
              fontFamily: 'System',
              fontSize: verticalScale(45),
              lineHeight: verticalScale(50),
            }}
          >
            {mainTextWords.join(' ')}
          </Text>
        </Animated.View>
        <Animated.View style={[scriptTextAnimatedStyle]}>
          <Text
            className="italic"
            style={{
              color: Colors.primaryAccentColor,
              letterSpacing: 0.5,
              fontSize: verticalScale(55),
              fontFamily: 'EBGaramond_500Medium_Italic',
            }}
          >
            {scriptPhrases[currentPhraseIndex]}
          </Text>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: MENU_HEIGHT + 100,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    zIndex: 30,
  },
  handleContainer: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 2,
  },
  menuContent: {
    flex: 1,
    paddingHorizontal: 30,
  },
  viewContainer: {
    flex: 1,
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 25,
    height: 25,
    marginRight: 5,
    borderRadius: 12,
  },
  appName: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
  statsContainer: {
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  buttonsContainer: {
    gap: 16,
  },
  loginButton: {
    backgroundColor: 'rgba(60, 60, 67, 0.8)',
    borderColor: 'rgba(120, 120, 128, 0.4)',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
  },
  appleIcon: {
    marginRight: 12,
  },
  googleIcon: {
    marginRight: 12,
  },
  emailIcon: {
    marginRight: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '500',
    letterSpacing: -0.2,
  },
});
