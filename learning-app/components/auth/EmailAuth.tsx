import { useState } from 'react';
import { supabase } from '@/utils/supabase';
import Entypo from '@expo/vector-icons/Entypo';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Animated from 'react-native-reanimated';

export default function EmailAuth({
  onBack,
  menuContentAnimatedStyle,
}: {
  onBack: () => void;
  menuContentAnimatedStyle: any;
}) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const signInWithEmail = async () => {
    if (!email) {
      // toast
    }
  };

  return (
    <Animated.View className="flex-1" style={[menuContentAnimatedStyle]}>
      <View className="flex-row items-center justify-between mt-[20px] mb-[20px]">
        <Pressable onPress={onBack}>
          <Entypo name="chevron-thin-left" size={18} color="white" />
        </Pressable>
      </View>
      {/* title */}
      <View className="mb-[20px]">
        <Text className="text-[24px] font-semibold text-white mb-[8px] leading-[34px]">
          Введите Email адрес.
        </Text>
        <Text className="text-[16px] font-normal text-white/70">
          Мы отправим вам ссылку для входа.
        </Text>
      </View>
      {/* form */}
      <View className="gap-5">
        <View className="gap-2">
          <TextInput
            className="px-4 py-4 text-[16px] text-white bg-white/10 border-white/20 border-[1px] rounded-lg min-h-[52px]"
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor={'rgba(255, 255, 255, 0.4)'}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
        </View>
        <Pressable
          className={`bg-[#D4FF5F] rounded-lg px-5 py-4 items-center justify-center mt-[10px] min-h-[52px] ${loading ? 'opacity-60' : ''}`}
          disabled={loading}
          onPress={() => {}}
        >
          <Text className="text-black text-[16px] font-semibold leading-[-0.2px]">
            {loading ? 'Отправка...' : 'Отправить'}
          </Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    width: 40,
  },
});
