import { Session, User } from '@supabase/supabase-js';
import { createContext, useContext } from 'react';
/*
    A user hook is all 
    the user data that 
    the application needs 
    to know at any given time
*/
type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: any | null;
  loading: boolean;
  isAdmin: boolean;
  isPremium: boolean;
  premiumExpiresAt: string | null;
  refreshProfile: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  profile: null,
  loading: true,
  isAdmin: false,
  isPremium: false,
  premiumExpiresAt: null,
  refreshProfile: async () => {},
});
/*
    I will use this as a hook when 
    I need to access the content of
    this information
*/
export const useAuth = () => useContext(AuthContext);
