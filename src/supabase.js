import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bkxhwaeluswfwfxavmpt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJreGh3YWVsdXN3ZndmeGF2bXB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYwODAyMzMsImV4cCI6MjAyMTY1NjIzM30.K1h9igOuhyKjs_WlPqHXRdlMbVJjD5GIYJ0u41DieZY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const trackUserActivityStart = async(userId, activity) => {
    try {
        // Assuming you have initialized Supabase client already
        const { data, error } = await supabase
            .from('user_activity')
            .insert([
                { user_id: userId, activity: activity }
            ]);

        if (error) {
            throw error;
        }

        console.log('User activity started successfully');
    } catch (error) {
        console.error('Error tracking user activity start:', error.message);
        return false;
    }
}


export const endUserActivity = async (userId, activity) => {
    try {
        // Update the end_time for the corresponding user and activity
        const { data, error } = await supabase
            .from('user_activity')
            .update({ end_time: new Date() })
            .match({ user_id: userId, activity: activity });
        if (error) {
            throw error;
        }
        console.log('User activity ended successfully');
    } catch (error) {
        console.error('Error ending user activity:', error.message);
    }
}
