import { useState } from 'react';
import { supabase } from '@/utils/supabase';
import Entypo from '@expo/vector-icons/Entypo';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { toast } from "sonner-native"
import { makeRedirectUri } from "expo-auth-session"

const redirectTo = makeRedirectUri()

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
      toast.error("Пожалуйста введите адрес электронной почты!")
      return
    }

    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: redirectTo,
        }
      })

      if (error) {
        toast.error(error.message)
        throw error;
      } else {
        toast.success("Ура! Посмотрите вашу почту, для перехода по ссылке")
      }

    } catch (error) {
        toast.error("Кажеться что-то пошло не так. Попробуйте еще раз!")
    } finally {
      setLoading(false)
    }
  };

  return (
    <Animated.View className="flex-1" style={[menuContentAnimatedStyle]}>
      <View className="flex-row items-center justify-between mt-[20px] mb-[20px]">
        <Pressable onPress={onBack}>
          <Entypo name="chevron-thin-left" size={18} color="black" />
        </Pressable>
      </View>
      {/* title */}
      <View className="mb-[20px]">
        <Text className="text-[24px] font-semibold text-black mb-[8px] leading-[34px]">
          Введите Email адрес.
        </Text>
        <Text className="text-[16px] font-normal text-black">
          Мы отправим вам ссылку для входа.
        </Text>
      </View>
      {/* form */}
      <View className="gap-5">
        <View className="gap-2">
          <TextInput
            className="px-4 py-6 text-[16px] text-black bg-white/10 border-black/20 border-[1px] rounded-3xl min-h-[52px]"
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor={'rgba(0, 0, 0, 0.4)'}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
        </View>
        <Pressable
          className={`bg-[#D4FF5F] rounded-3xl px-5 py-6 items-center justify-center mt-[10px] min-h-[52px] ${loading ? 'opacity-60' : ''}`}
          disabled={loading}
          onPress={signInWithEmail}
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
