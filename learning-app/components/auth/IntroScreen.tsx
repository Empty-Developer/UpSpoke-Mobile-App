import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Keyboard,
  Platform,
  Image,
  Pressable,
} from 'react-native';
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from "@expo/vector-icons/AntDesign"
import Fontisto from "@expo/vector-icons/Fontisto"
// import { Pressable } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');
const videoSource = require('@/assets/videos/broll.mp4');
const logoSource = require("@/assets/images/logo.png")

const MENU_HEIGHT = 250;
const PEEK_MENU_HEIGHT = 50;
const CLOSED_POSITION = MENU_HEIGHT - PEEK_MENU_HEIGHT;

export default function IntroScreen() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const insets = useSafeAreaInsets();
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const mainTextOpacity = useSharedValue(0);
  const scriptTextOpacity = useSharedValue(0);
  const menuTranslateY = useSharedValue(CLOSED_POSITION);
  const [KeyboardHeight, setKeyboardHeight] = useState(0);
  const [currentView, setCurrentView] = useState<"login" | "email">("login")
  const menuContentOpacity = useSharedValue(1)

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

  // menu
  const menuAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: menuTranslateY.value }],
    };
  });

  const menuContentAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: menuContentOpacity.value
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

  const animatedMenu = (open: boolean) => {
    menuTranslateY.value = withSpring(open ? 0 : CLOSED_POSITION, {
      damping: 95,
      stiffness: 320,
      mass: 7
    })
  };

  const handlePress = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    animatedMenu(newState);
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
            setTimeout(() => animatedScriptIn(), 150);
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
        animatedScriptIn();
      }, 150);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [currentPhraseIndex]);

  // sliding menu
  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (event) => {
        setKeyboardHeight(event.endCoordinates.height);
      }
    );

    const keyboardWillHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      (event) => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardWillShowListener?.remove();
      keyboardWillHideListener?.remove();
    };
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  // function render login view
  const renderLoginView = () => (
    <Animated.View className='flex-1' style={[menuContentAnimatedStyle]}>
      <View className='justify-between mt-[20px] mb-[24px] px-[10px] flex-row items-center'>
        <View className='flex-row flex-1 items-center'>
          <Image source={logoSource} className='w-[25px] h-[25px] mr-[5px] rounded-xl'/>
          <Text className='text-[18px] font-bold text-white'>UpSpoke</Text>
        </View>
        <View className='items-center'>
          <Text className='text-base font-semibold text-white'>Let's go!</Text>
        </View>
      </View>
      <View className='gap-4'>
        {/* Apple */}
        <Pressable
          className='px-[20px] min-h-[40px] justify-center items-center flex-row py-3 rounded-xl border-[1px] bg-[#3c3c43] border-[#787880]/40'
          onPress={() => console.log("Apple login")}
        >
          <AntDesign
            name="apple"
            size={16}
            color="white"
            className='mr-[12px]'
          />
          <Text className='tracking-[-0.2px] font-medium text-white text-[17px]'>
            Войти с помощью Apple
          </Text>
        </Pressable>
        {/* Google */}
        <Pressable
          className='px-[20px] min-h-[40px] justify-center items-center flex-row py-3 rounded-xl border-[1px] bg-[#3c3c43] border-[#787880]/40'
          onPress={() => console.log("Google login")}
        >
          <AntDesign
            name="google"
            size={16}
            color="white"
            className='mr-[12px]'
          />
          <Text className='tracking-[-0.2px] font-medium text-white text-[17px]'>
            Войти с помощью Google
          </Text>
        </Pressable>
        {/* Email */}
        <Pressable
          className='px-[20px] min-h-[40px] justify-center items-center flex-row py-3 rounded-xl border-[1px] bg-[#3c3c43] border-[#787880]/40'
          onPress={() => console.log("Email login")}
        >
          <Fontisto
            name="email"
            size={16}
            color="white"
            className='mr-[12px]'
          />
          <Text className='tracking-[-0.2px] font-medium text-white text-[17px]'>
            Войти с помощью Email
          </Text>
        </Pressable>
      </View>
    </Animated.View>
  )

  const dynamicMenuHeight =
    KeyboardHeight > 0 ? MENU_HEIGHT + KeyboardHeight + 50 : MENU_HEIGHT + 100;

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
      {/* sliding menu with dynamic heigh */}
      {/* TODO: gesture handler */}
      <Animated.View
        style={[
          { height: MENU_HEIGHT + 100 },
          menuAnimatedStyle,
          { height: dynamicMenuHeight, paddingBottom: insets.bottom + 30 },
        ]}
        className="bottom-0 left-0 right-0 bg-black/60 z-[30] absolute border-white/15 border-r-[1.5px] border-l-[1.5px] border-t-[1.5px] rounded-t-[24px]"
      >
        <Pressable
          style={{
            paddingVertical: 12,
            alignItems: 'center',
          }}
          onPress={handlePress}
        >
          <View className="w-[40px] h-[4px] bg-white/50 rounded-full" />
        </Pressable>

        <View
          className='flex-1 px-[30px]'
        >
          {currentView === "login" ? renderLoginView() : null}
        </View>
      </Animated.View>
    </View>
  );
}
