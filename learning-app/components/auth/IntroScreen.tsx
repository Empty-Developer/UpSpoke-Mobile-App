import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import {
  scale,
  verticalScale,
  moderateScale
} from 'react-native-size-matters'
import { Colors } from '@/constants/theme';
import { ThemedText } from '../themed-text';
import { VideoView } from "expo-video"

const { width, height } = Dimensions.get("window")
const videoSource = require("@/assets/videos/broll.mp4")

const MENU_HEIGHT = 250;
const PEEK_MENU_HEIGHT = 50;
const CLOSED_POSITION = MENU_HEIGHT - PEEK_MENU_HEIGHT;

export default function IntroScreen() {
  return (
    <View className='flex-1 bg-black'>
      <VideoView nativeControls={false} />
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
  heroTextContainer: {
    position: 'absolute',
    top: height * 0.15,
    left: 30,
    right: 30,
    zIndex: 25,
  },
  mainTextContainer: {
    marginBottom: 0,
  },
  heroTextMain: {
    fontSize: verticalScale(45),
    fontWeight: '800',
    fontFamily: 'System',
    color: '#fff4cc',
    lineHeight: verticalScale(50),
    letterSpacing: 0,
  },
  heroTextScript: {
    fontSize: verticalScale(55),
    fontFamily: 'EBGaramond_500Medium_Italic',
    color: Colors.primaryAccentColor,
    letterSpacing: 0.5,
  },
});
