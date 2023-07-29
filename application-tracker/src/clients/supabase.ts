import { createClient } from "@supabase/supabase-js"
import { type Database } from '../db_types/supabase'

const supabaseUrl = import.meta.env.VITE_SUAPURL
const supabaseKey = import.meta.env.VITE_SUPAKEY

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)
