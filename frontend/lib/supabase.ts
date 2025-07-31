import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";

const supabaseUrl =
  process.env.EXPO_PUBLIC_SUPABASE_URL ||
  "https://qlblrexwpmqprrmfynum.supabase.co";
const supabaseAnonKey =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsYmxyZXh3cG1xcHJybWZ5bnVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5OTA1ODUsImV4cCI6MjA2OTU2NjU4NX0.aiIr0Gd6W_xvQukzaNMlbvj3ZKWZT4cDhhrCE6CzPsA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: {
      async getItem(key: string) {
        // Implement secure storage for React Native
        return null;
      },
      async setItem(key: string, value: string) {
        // Implement secure storage for React Native
      },
      async removeItem(key: string) {
        // Implement secure storage for React Native
      },
    },
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Database types for TypeScript
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: number;
          email: string;
          username: string;
          hashed_password: string;
          full_name: string | null;
          is_active: boolean;
          is_superuser: boolean;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: number;
          email: string;
          username: string;
          hashed_password: string;
          full_name?: string | null;
          is_active?: boolean;
          is_superuser?: boolean;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: number;
          email?: string;
          username?: string;
          hashed_password?: string;
          full_name?: string | null;
          is_active?: boolean;
          is_superuser?: boolean;
          created_at?: string;
          updated_at?: string | null;
        };
      };
      courses: {
        Row: {
          id: number;
          title: string;
          description: string | null;
          difficulty_level: string;
          estimated_duration: number | null;
          is_active: boolean;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: number;
          title: string;
          description?: string | null;
          difficulty_level: string;
          estimated_duration?: number | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string | null;
          difficulty_level?: string;
          estimated_duration?: number | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string | null;
        };
      };
      modules: {
        Row: {
          id: number;
          course_id: number;
          title: string;
          description: string | null;
          content: string | null;
          order_index: number;
          is_active: boolean;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: number;
          course_id: number;
          title: string;
          description?: string | null;
          content?: string | null;
          order_index: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: number;
          course_id?: number;
          title?: string;
          description?: string | null;
          content?: string | null;
          order_index?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string | null;
        };
      };
      scenarios: {
        Row: {
          id: number;
          module_id: number;
          title: string;
          description: string | null;
          scenario_type: string;
          content: string;
          is_active: boolean;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: number;
          module_id: number;
          title: string;
          description?: string | null;
          scenario_type: string;
          content: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: number;
          module_id?: number;
          title?: string;
          description?: string | null;
          scenario_type?: string;
          content?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string | null;
        };
      };
    };
  };
}
