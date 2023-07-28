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
      Applications: {
        Row: {
          application_link: string | null
          applied_at: string | null
          company: string | null
          created_at: string | null
          hunt_title: string
          id: string
          job_title: string | null
          location: string | null
          pay: number | null
          response: boolean | null
        }
        Insert: {
          application_link?: string | null
          applied_at?: string | null
          company?: string | null
          created_at?: string | null
          hunt_title: string
          id?: string
          job_title?: string | null
          location?: string | null
          pay?: number | null
          response?: boolean | null
        }
        Update: {
          application_link?: string | null
          applied_at?: string | null
          company?: string | null
          created_at?: string | null
          hunt_title?: string
          id?: string
          job_title?: string | null
          location?: string | null
          pay?: number | null
          response?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "Applications_hunt_title_fkey"
            columns: ["hunt_title"]
            referencedRelation: "Hunts"
            referencedColumns: ["hunt_title"]
          }
        ]
      }
      Hunts: {
        Row: {
          created_at: string | null
          goal_job_title: string | null
          goal_job_type: string | null
          goal_location: string | null
          goal_salary: number | null
          goal_tech_stack: string | null
          hunt_title: string
          start_date_time: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          goal_job_title?: string | null
          goal_job_type?: string | null
          goal_location?: string | null
          goal_salary?: number | null
          goal_tech_stack?: string | null
          hunt_title?: string
          start_date_time?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          goal_job_title?: string | null
          goal_job_type?: string | null
          goal_location?: string | null
          goal_salary?: number | null
          goal_tech_stack?: string | null
          hunt_title?: string
          start_date_time?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Hunts_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
