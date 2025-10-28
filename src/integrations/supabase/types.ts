export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      alerts: {
        Row: {
          created_at: string
          id: string
          is_read: boolean | null
          message: string
          severity: Database["public"]["Enums"]["alert_severity"]
          title: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          message: string
          severity?: Database["public"]["Enums"]["alert_severity"]
          title: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          message?: string
          severity?: Database["public"]["Enums"]["alert_severity"]
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      crop_advisory: {
        Row: {
          best_planting_months: string[] | null
          created_at: string
          crop_type: Database["public"]["Enums"]["crop_type"]
          description: string
          id: string
          rainfall_requirement: string | null
          season: string | null
          title: string
          updated_at: string
        }
        Insert: {
          best_planting_months?: string[] | null
          created_at?: string
          crop_type: Database["public"]["Enums"]["crop_type"]
          description: string
          id?: string
          rainfall_requirement?: string | null
          season?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          best_planting_months?: string[] | null
          created_at?: string
          crop_type?: Database["public"]["Enums"]["crop_type"]
          description?: string
          id?: string
          rainfall_requirement?: string | null
          season?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      crops: {
        Row: {
          area_acres: number | null
          created_at: string
          crop_type: Database["public"]["Enums"]["crop_type"]
          expected_harvest_date: string | null
          id: string
          notes: string | null
          planted_date: string
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          area_acres?: number | null
          created_at?: string
          crop_type: Database["public"]["Enums"]["crop_type"]
          expected_harvest_date?: string | null
          id?: string
          notes?: string | null
          planted_date: string
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          area_acres?: number | null
          created_at?: string
          crop_type?: Database["public"]["Enums"]["crop_type"]
          expected_harvest_date?: string | null
          id?: string
          notes?: string | null
          planted_date?: string
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          farm_location: string | null
          farm_size_acres: number | null
          full_name: string
          id: string
          phone_number: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          farm_location?: string | null
          farm_size_acres?: number | null
          full_name: string
          id?: string
          phone_number?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          farm_location?: string | null
          farm_size_acres?: number | null
          full_name?: string
          id?: string
          phone_number?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      rainfall_records: {
        Row: {
          created_at: string
          date: string
          id: string
          location: string
          rainfall_mm: number
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          location: string
          rainfall_mm: number
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          location?: string
          rainfall_mm?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      weather_data: {
        Row: {
          conditions: string | null
          created_at: string
          forecast_date: string
          humidity: number | null
          id: string
          location: string
          rainfall_mm: number | null
          temperature: number | null
          wind_speed: number | null
        }
        Insert: {
          conditions?: string | null
          created_at?: string
          forecast_date: string
          humidity?: number | null
          id?: string
          location: string
          rainfall_mm?: number | null
          temperature?: number | null
          wind_speed?: number | null
        }
        Update: {
          conditions?: string | null
          created_at?: string
          forecast_date?: string
          humidity?: number | null
          id?: string
          location?: string
          rainfall_mm?: number | null
          temperature?: number | null
          wind_speed?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      alert_severity: "info" | "warning" | "critical"
      app_role: "admin" | "farmer"
      crop_type:
        | "maize"
        | "beans"
        | "potatoes"
        | "tomatoes"
        | "cabbage"
        | "wheat"
        | "rice"
        | "coffee"
        | "tea"
        | "sugarcane"
        | "other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      alert_severity: ["info", "warning", "critical"],
      app_role: ["admin", "farmer"],
      crop_type: [
        "maize",
        "beans",
        "potatoes",
        "tomatoes",
        "cabbage",
        "wheat",
        "rice",
        "coffee",
        "tea",
        "sugarcane",
        "other",
      ],
    },
  },
} as const
