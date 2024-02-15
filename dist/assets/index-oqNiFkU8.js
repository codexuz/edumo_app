/*! Capacitor: https://capacitorjs.com/ - MIT License */const Z=t=>{const e=new Map;e.set("web",{name:"web"});const r=t.CapacitorPlatforms||{currentPlatform:{name:"web"},platforms:e},a=(s,i)=>{r.platforms.set(s,i)},n=s=>{r.platforms.has(s)&&(r.currentPlatform=r.platforms.get(s))};return r.addPlatform=a,r.setPlatform=n,r},N=t=>t.CapacitorPlatforms=Z(t),R=N(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});R.addPlatform;R.setPlatform;var L;(function(t){t.Unimplemented="UNIMPLEMENTED",t.Unavailable="UNAVAILABLE"})(L||(L={}));class S extends Error{constructor(e,r,a){super(e),this.message=e,this.code=r,this.data=a}}const ee=t=>{var e,r;return t!=null&&t.androidBridge?"android":!((r=(e=t==null?void 0:t.webkit)===null||e===void 0?void 0:e.messageHandlers)===null||r===void 0)&&r.bridge?"ios":"web"},te=t=>{var e,r,a,n,s;const i=t.CapacitorCustomPlatform||null,o=t.Capacitor||{},f=o.Plugins=o.Plugins||{},l=t.CapacitorPlatforms,k=()=>i!==null?i.name:ee(t),P=((e=l==null?void 0:l.currentPlatform)===null||e===void 0?void 0:e.getPlatform)||k,x=()=>P()!=="web",q=((r=l==null?void 0:l.currentPlatform)===null||r===void 0?void 0:r.isNativePlatform)||x,B=c=>{const d=j.get(c);return!!(d!=null&&d.platforms.has(P())||T(c))},F=((a=l==null?void 0:l.currentPlatform)===null||a===void 0?void 0:a.isPluginAvailable)||B,G=c=>{var d;return(d=o.PluginHeaders)===null||d===void 0?void 0:d.find(y=>y.name===c)},T=((n=l==null?void 0:l.currentPlatform)===null||n===void 0?void 0:n.getPluginHeader)||G,K=c=>t.console.error(c),z=(c,d,y)=>Promise.reject("".concat(y,' does not have an implementation of "').concat(d,'".')),j=new Map,V=(c,d={})=>{const y=j.get(c);if(y)return console.warn('Capacitor plugin "'.concat(c,'" already registered. Cannot register plugins twice.')),y.proxy;const p=P(),C=T(c);let w;const Q=async()=>(!w&&p in d?w=typeof d[p]=="function"?w=await d[p]():w=d[p]:i!==null&&!w&&"web"in d&&(w=typeof d.web=="function"?w=await d.web():w=d.web),w),X=(u,m)=>{var h,b;if(C){const v=C==null?void 0:C.methods.find(g=>m===g.name);if(v)return v.rtype==="promise"?g=>o.nativePromise(c,m.toString(),g):(g,E)=>o.nativeCallback(c,m.toString(),g,E);if(u)return(h=u[m])===null||h===void 0?void 0:h.bind(u)}else{if(u)return(b=u[m])===null||b===void 0?void 0:b.bind(u);throw new S('"'.concat(c,'" plugin is not implemented on ').concat(p),L.Unimplemented)}},U=u=>{let m;const h=(...b)=>{const v=Q().then(g=>{const E=X(g,u);if(E){const $=E(...b);return m=$==null?void 0:$.remove,$}else throw new S('"'.concat(c,".").concat(u,'()" is not implemented on ').concat(p),L.Unimplemented)});return u==="addListener"&&(v.remove=async()=>m()),v};return h.toString=()=>"".concat(u.toString(),"() { [capacitor code] }"),Object.defineProperty(h,"name",{value:u,writable:!1,configurable:!1}),h},_=U("addListener"),H=U("removeListener"),Y=(u,m)=>{const h=_({eventName:u},m),b=async()=>{const g=await h;H({eventName:u,callbackId:g},m)},v=new Promise(g=>h.then(()=>g({remove:b})));return v.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await b()},v},A=new Proxy({},{get(u,m){switch(m){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return C?Y:_;case"removeListener":return H;default:return U(m)}}});return f[c]=A,j.set(c,{name:c,proxy:A,platforms:new Set([...Object.keys(d),...C?[p]:[]])}),A},J=((s=l==null?void 0:l.currentPlatform)===null||s===void 0?void 0:s.registerPlugin)||V;return o.convertFileSrc||(o.convertFileSrc=c=>c),o.getPlatform=P,o.handleError=K,o.isNativePlatform=q,o.isPluginAvailable=F,o.pluginMethodNoop=z,o.registerPlugin=J,o.Exception=S,o.DEBUG=!!o.DEBUG,o.isLoggingEnabled=!!o.isLoggingEnabled,o.platform=o.getPlatform(),o.isNative=o.isNativePlatform(),o},re=t=>t.Capacitor=te(t),O=re(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),D=O.registerPlugin;O.Plugins;class I{constructor(e){this.listeners={},this.windowListeners={},e&&(console.warn('Capacitor WebPlugin "'.concat(e.name,'" config object was deprecated in v3 and will be removed in v4.')),this.config=e)}addListener(e,r){this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(r);const n=this.windowListeners[e];n&&!n.registered&&this.addWindowListener(n);const s=async()=>this.removeListener(e,r),i=Promise.resolve({remove:s});return Object.defineProperty(i,"remove",{value:async()=>{console.warn("Using addListener() without 'await' is deprecated."),await s()}}),i}async removeAllListeners(){this.listeners={};for(const e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,r){const a=this.listeners[e];a&&a.forEach(n=>n(r))}hasListeners(e){return!!this.listeners[e].length}registerWindowListener(e,r){this.windowListeners[r]={registered:!1,windowEventName:e,pluginEventName:r,handler:a=>{this.notifyListeners(r,a)}}}unimplemented(e="not implemented"){return new O.Exception(e,L.Unimplemented)}unavailable(e="not available"){return new O.Exception(e,L.Unavailable)}async removeListener(e,r){const a=this.listeners[e];if(!a)return;const n=a.indexOf(r);this.listeners[e].splice(n,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}}const W=t=>encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),M=t=>t.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class ne extends I{async getCookies(){const e=document.cookie,r={};return e.split(";").forEach(a=>{if(a.length<=0)return;let[n,s]=a.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");n=M(n).trim(),s=M(s).trim(),r[n]=s}),r}async setCookie(e){try{const r=W(e.key),a=W(e.value),n="; expires=".concat((e.expires||"").replace("expires=","")),s=(e.path||"/").replace("path=",""),i=e.url!=null&&e.url.length>0?"domain=".concat(e.url):"";document.cookie="".concat(r,"=").concat(a||"").concat(n,"; path=").concat(s,"; ").concat(i,";")}catch(r){return Promise.reject(r)}}async deleteCookie(e){try{document.cookie="".concat(e.key,"=; Max-Age=0")}catch(r){return Promise.reject(r)}}async clearCookies(){try{const e=document.cookie.split(";")||[];for(const r of e)document.cookie=r.replace(/^ +/,"").replace(/=.*/,"=;expires=".concat(new Date().toUTCString(),";path=/"))}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}}D("CapacitorCookies",{web:()=>new ne});const se=async t=>new Promise((e,r)=>{const a=new FileReader;a.onload=()=>{const n=a.result;e(n.indexOf(",")>=0?n.split(",")[1]:n)},a.onerror=n=>r(n),a.readAsDataURL(t)}),oe=(t={})=>{const e=Object.keys(t);return Object.keys(t).map(n=>n.toLocaleLowerCase()).reduce((n,s,i)=>(n[s]=t[e[i]],n),{})},ae=(t,e=!0)=>t?Object.entries(t).reduce((a,n)=>{const[s,i]=n;let o,f;return Array.isArray(i)?(f="",i.forEach(l=>{o=e?encodeURIComponent(l):l,f+="".concat(s,"=").concat(o,"&")}),f.slice(0,-1)):(o=e?encodeURIComponent(i):i,f="".concat(s,"=").concat(o)),"".concat(a,"&").concat(f)},"").substr(1):null,ie=(t,e={})=>{const r=Object.assign({method:t.method||"GET",headers:t.headers},e),n=oe(t.headers)["content-type"]||"";if(typeof t.data=="string")r.body=t.data;else if(n.includes("application/x-www-form-urlencoded")){const s=new URLSearchParams;for(const[i,o]of Object.entries(t.data||{}))s.set(i,o);r.body=s.toString()}else if(n.includes("multipart/form-data")||t.data instanceof FormData){const s=new FormData;if(t.data instanceof FormData)t.data.forEach((o,f)=>{s.append(f,o)});else for(const o of Object.keys(t.data))s.append(o,t.data[o]);r.body=s;const i=new Headers(r.headers);i.delete("content-type"),r.headers=i}else(n.includes("application/json")||typeof t.data=="object")&&(r.body=JSON.stringify(t.data));return r};class le extends I{async request(e){const r=ie(e,e.webFetchExtra),a=ae(e.params,e.shouldEncodeUrlParams),n=a?"".concat(e.url,"?").concat(a):e.url,s=await fetch(n,r),i=s.headers.get("content-type")||"";let{responseType:o="text"}=s.ok?e:{};i.includes("application/json")&&(o="json");let f,l;switch(o){case"arraybuffer":case"blob":l=await s.blob(),f=await se(l);break;case"json":f=await s.json();break;case"document":case"text":default:f=await s.text()}const k={};return s.headers.forEach((P,x)=>{k[x]=P}),{data:f,headers:k,status:s.status,url:s.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:"GET"}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:"POST"}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:"PUT"}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:"PATCH"}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:"DELETE"}))}}D("CapacitorHttp",{web:()=>new le});export{I as W,ie as b,D as r};
