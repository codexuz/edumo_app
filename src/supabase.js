import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bkxhwaeluswfwfxavmpt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJreGh3YWVsdXN3ZndmeGF2bXB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYwODAyMzMsImV4cCI6MjAyMTY1NjIzM30.K1h9igOuhyKjs_WlPqHXRdlMbVJjD5GIYJ0u41DieZY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

