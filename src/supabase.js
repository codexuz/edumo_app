
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = "https://tmzegfpzmfjxjfyngbve.supabase.co"
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtemVnZnB6bWZqeGpmeW5nYnZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAwOTAyNTgsImV4cCI6MjAyNTY2NjI1OH0.et4H-mtc9HUYu_w9fYckebmiOAVLZ2WmfD-viq26DNA'
export const supabase = createClient(supabaseUrl, supabaseKey)

