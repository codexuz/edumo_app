System.register(["./index-legacy-LTGG3myd.js"],(function(e,l){"use strict";var a,t,o,s,n,i,u,r,c,d,m,f,v,g,p,_,y;return{setters:[e=>{a=e.u,t=e.r,o=e.b,s=e.c,n=e.d,i=e.w,u=e.f,r=e.g,c=e.h,d=e.i,m=e.q,f=e.v,v=e.x,g=e.y,p=e.m,_=e.l,y=e.z}],execute:function(){const l={class:"mx-auto"},h=["src"];e("default",{__name:"Register",setup(e){const w=a(),b=t(!1),x=t(""),V=t(""),z=t(""),k=t(""),j=async()=>{if(!z.value||!k.value||!V.value)return b.value=!0,void(x.value="Barcha maydonlarni to'ldirish shart");const e=await m.create({message:"Hisob yaratilmoqda..."});e.present();try{const l=await f(z.value,k.value);l.user&&(await v(V.value,"https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"),w.push("/home")),e.dismiss()}catch(l){e.dismiss();const a=l.message||"Xatolik yuz berdi";b.value=!0,x.value=a,console.error(l)}};return(e,a)=>{const t=o("ion-back-button"),m=o("ion-buttons"),f=o("ion-toolbar"),v=o("ion-header"),w=o("ion-label"),J=o("ion-icon"),U=o("ion-input"),q=o("ion-item"),H=o("ion-button"),I=o("ion-col"),B=o("ion-row"),C=o("ion-grid"),E=o("ion-toast"),K=o("ion-content"),L=o("ion-page");return s(),n(L,null,{default:i((()=>[u(v,{class:"ion-no-border"},{default:i((()=>[u(f,{color:"primary"},{default:i((()=>[u(m,{slot:"start"},{default:i((()=>[u(t,{"default-href":"/login"})])),_:1})])),_:1})])),_:1}),u(K,{fullscreen:!0,class:"ion-padding ion-margin-top","scroll-y":"false"},{default:i((()=>[u(C,null,{default:i((()=>[u(B,{class:"ion-justify-content-center"},{default:i((()=>[u(I,{size:"12","size-md":"8","size-lg":"6","size-xl":"4"},{default:i((()=>[r("div",l,[r("img",{src:c("/assets/auth-IJJdJiwK.svg"),class:"w-[40%] sm:w-32 mx-auto",alt:"Logo"},null,8,h)]),u(q,{class:"relative flex items-end"},{default:i((()=>[u(w,{position:"floating"},{default:i((()=>[d("Ism")])),_:1}),u(J,{icon:c(g),slot:"start"},null,8,["icon"]),u(U,{modelValue:V.value,"onUpdate:modelValue":a[0]||(a[0]=e=>V.value=e)},null,8,["modelValue"])])),_:1}),u(q,{class:"relative flex items-end"},{default:i((()=>[u(w,{position:"floating"},{default:i((()=>[d("Email")])),_:1}),u(J,{icon:c(p),slot:"start"},null,8,["icon"]),u(U,{type:"email",modelValue:z.value,"onUpdate:modelValue":a[1]||(a[1]=e=>z.value=e)},null,8,["modelValue"])])),_:1}),u(q,{class:"relative flex items-end"},{default:i((()=>[u(w,{position:"floating"},{default:i((()=>[d("Parol")])),_:1}),u(J,{icon:c(_),slot:"start"},null,8,["icon"]),u(U,{modelValue:k.value,"onUpdate:modelValue":a[2]||(a[2]=e=>k.value=e),type:"password"},null,8,["modelValue"])])),_:1}),u(H,{onClick:j,class:"ion-margin-top",expand:"block"},{default:i((()=>[d("Hisob yaratish "),u(J,{icon:c(y),slot:"end"},null,8,["icon"])])),_:1})])),_:1})])),_:1})])),_:1}),u(E,{"is-open":b.value,message:x.value,duration:2e3},null,8,["is-open","message"])])),_:1})])),_:1})}}})}}}));
