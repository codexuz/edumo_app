import{r as s,u as g,B as h,b as o,c as v,v as w,w as e,e as n,i as C}from"./index-lmc9I_XF.js";import{n as x}from"./networkService-tFJzkXRb.js";import"./index-oqNiFkU8.js";const N={__name:"Courses",setup(b){x.getCurrentStatus().then(t=>{console.log("Current network status:",t)}),s(!1),g();const l=s(!0),c=s("O'quvchi");return h(t=>{if(t){const{uid:i,displayName:a,email:r}=t;t.photoURL,c.value=a,l.value=!1}else console.log("You are not authorized"),l.value=!1}),(t,i)=>{const a=o("ion-title"),r=o("ion-toolbar"),_=o("ion-header"),u=o("ion-col"),p=o("ion-row"),m=o("ion-grid"),d=o("ion-content"),f=o("ion-page");return v(),w(f,null,{default:e(()=>[n(_,{class:"ion-no-border"},{default:e(()=>[n(r,{color:"primary",class:"px-2"},{default:e(()=>[n(a,null,{default:e(()=>[C("Kurslar")]),_:1})]),_:1})]),_:1}),n(d,{"scroll-y":"true"},{default:e(()=>[n(m,null,{default:e(()=>[n(p,null,{default:e(()=>[n(u,{class:"ion-align-items-center"})]),_:1})]),_:1})]),_:1})]),_:1})}}};export{N as default};