<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { personCircle, shareSocialOutline, chatbubblesOutline, powerOutline } from 'ionicons/icons';
import { RouterLink, useRouter, RouterView } from 'vue-router'
import { Share } from '@capacitor/share';
import { supabase } from '@/supabase'
import { toastController, loadingController } from '@ionic/vue';
import { Dialog } from '@capacitor/dialog';
import User from '@/assets/user.svg'
import Help from '@/assets/help.svg'
import Logout from '@/assets/logout.svg'
import share from '@/assets/share.svg'
import { networkService  } from '@/lib/networkService.js';


const router = useRouter();

const notLoggin = ref(false)
const studentId = ref(null)
const profile = ref({
    full_name: '',
    email: '',
    avatar_url: ''
})

function getStoredProfile() {
    const storedProfile = localStorage.getItem('profile');
    return storedProfile ? JSON.parse(storedProfile) : null;
}

function storeProfileInStorage(profileData) {
    // Check if data already exists in localStorage
    if (!getStoredProfile()) {
        localStorage.setItem('profile', JSON.stringify(profileData));
    }
}

function clearStoredProfile() {
    localStorage.removeItem('profile');
}

async function fetchData() {
    try {
        const { data, error } = await supabase.auth.getSession()
        if (error) {
            console.log('Tizimga kiring')
            return
        }
        if (data) {
            studentId.value = data.session.user.id
            getProfile()
        }

    } catch (error) {
        console.error(error);
    }
}

onMounted(async () => {
    const isOnline = await networkService.getCurrentStatus();
    if (!isOnline.connected) {
        const storedProfile = getStoredProfile();
        if (storedProfile) {
            profile.value = storedProfile;
        } else {
            console.log('No stored profile data available.');
        }
    } else {
        fetchData();
    }
});

async function getProfile() {
    try {
        const { data, error } = await supabase
            .from('students')
            .select(`*`)
            .eq('id', studentId.value)
            .single()

        if (error && status !== 406) throw error

        if (data) {
            const formattedProfile = {
                full_name: data.display_name,
                email: data.email,
                avatar_url: data.avatar_url,
            };
            storeProfileInStorage(formattedProfile);
            profile.value = formattedProfile;
        }
    } catch (error) {
        console.error(error);
    }
}

const confirmExit = async () => {
    const { value } = await Dialog.confirm({
        title: 'Chiqish',
        message: `Hisobingizdan chiqmoqchimisiz?`,
    });

    if (!value) {
        return
    }

    logOutUser()
};


const logOutUser = async () => {
    const toast = await toastController.create({ duration: 2500 })

    try {
        const { error } = await supabase.auth.signOut()
        if (error) {
            toast.message = error
            await toast.present()
            return
        }
        localStorage.clear('isLoggedIn')
        window.location.href = '/login'
    } catch (error) {
        toast.message = error.error_description || error.message
        await toast.present()
    }
}

async function shareApp() {
    try {
        await Share.share({
            title: 'ExamOnline Edumo',
            text: 'Multilevel imtihoniga tayyorlanuvchilar uchun ilova',
            url: 'https://play.google.com/store/apps/details?id=vercel.multiexam.app&hl=en&gl=US',
            dialogTitle: 'Do\'stlaringiz bilan ulashing',
        });
    } catch (error) {
        console.error('Error sharing app:', error);
    }
}
</script>

<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <ion-toolbar color="light">
                <ion-buttons slot="start">
                    <ion-back-button default-href="/profile"></ion-back-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content scroll-y="false">
            <ion-grid>
                <ion-row class="ion-align-items-center ion-justify-content-center">
                    <ion-col size-sm="12" size-xl="4" size-lg="5" size-md="8">
                        <ion-list-header>
                            <ion-title class="ion-text-center mb-6">Profil ma'lumotlari</ion-title>
                        </ion-list-header>

                        <div class="flex flex-col justify-center items-center">
                            <img :src="profile.avatar_url" class="mb-3 w-[90px] h-[90px] mx-2 rounded-full bg-gray-400 border-2 border-gray-300">
                            <p class="text-xl font-bold">{{ profile.full_name }}</p>
                            <p class="text-gray-500 text-lg font-medium"><small>{{ profile.email }}</small></p>
                        </div>
                        <ion-list :inset="true">
                            <ion-item :button="true" router-link="/update" router-direction="forward">
                                <img :src="User" slot="start">
                                Profilni tahrirlash
                            </ion-item>
                            <ion-item :button="true" @click="shareApp">
                                <img :src="share" slot="start" class="w-5 h-5">
                                Do'stlarga ulashish
                            </ion-item>
                            <ion-item :button="true" href="https://t.me/javlon_developer" target="_blank">
                                <img :src="Help" slot="start">
                                Yordam so'rash
                            </ion-item>
                            <ion-item @click="confirmExit" class="cursor-pointer">
                                <img :src="Logout" slot="start">
                                <span class="font-bold text-red-500">Chiqish</span>
                            </ion-item>
                        </ion-list>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>
