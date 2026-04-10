import { supabase } from '@/utils/supabase';
import * as QueryParams from 'expo-auth-session/build/QueryParams';
import * as Linking from 'expo-linking';
import { useEffect } from 'react';
import { toast } from 'sonner-native';

const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url);

  if (errorCode) {
    console.error('Deep link error: ', errorCode);
    throw new Error(errorCode);
  }

  const { access_token, refresh_token } = params;

  if (!access_token) {
    return;
  }

  const { data, error } = await supabase.auth.setSession({
    /*
      session: state user
      user have token "access_token" and update "refresh_token"
      and [metadata] - name, id, ... base information about user
      can be used for render screen
    */
    access_token,
    refresh_token,
  });

  if (error) {
    console.log('Session error: ', error);
    throw error;
  }

  return data.session;
};

export const useDeepLinking = () => {
  const url = Linking.useLinkingURL()

  useEffect(() => {
    if (url) {
      createSessionFromUrl(url).then((session) => {
        if (session) {
          console.log("Session create from deep link")
        }
      }).catch((error) => {
        console.log("Error creating session from URL: ", error)
        toast.error("Ошибка входа. Пожалуйста попробуйте еще раз!")
      })
    }
  }, [url])
}
