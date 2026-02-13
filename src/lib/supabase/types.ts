/**
 * Supabase Database Types
 * Generated based on the existing schema
 * TODO: Regenerate with `pnpx supabase gen types typescript --project-id mwbkrkoeltsbkbguoemo`
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      metrics: {
        Row: {
          id: string
          date: string
          invitations_sent: number
          acceptance_rate: number
          qualified_interested: number
          meetings_scheduled: number
          total_pipeline: number
          connections_accepted: number
          total_responses: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          date: string
          invitations_sent: number
          acceptance_rate: number
          qualified_interested: number
          meetings_scheduled: number
          total_pipeline: number
          connections_accepted: number
          total_responses: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          date?: string
          invitations_sent?: number
          acceptance_rate?: number
          qualified_interested?: number
          meetings_scheduled?: number
          total_pipeline?: number
          connections_accepted?: number
          total_responses?: number
          created_at?: string
          updated_at?: string
        }
      }
      leads: {
        Row: {
          id: string
          first_name: string
          last_name: string
          company: string
          position: string
          deal_title: string | null
          deal_value: number
          deal_stage: number
          expected_close_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          company: string
          position: string
          deal_title?: string | null
          deal_value: number
          deal_stage?: number
          expected_close_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          company?: string
          position?: string
          deal_title?: string | null
          deal_value?: number
          deal_stage?: number
          expected_close_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
