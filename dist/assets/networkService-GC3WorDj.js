import{_ as s}from"./index-M_SpqCHy.js";import{r as o}from"./index-oqNiFkU8.js";const r=o("Network",{web:()=>s(()=>import("./web-U35n05TE.js"),__vite__mapDeps([0,1])).then(t=>new t.NetworkWeb)});class i{constructor(){this.initializeListeners()}initializeListeners(){r.addListener("networkStatusChange",e=>{console.log("Network status changed",e)})}async getCurrentStatus(){return await r.getStatus()}}const c=new i;export{c as n};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/web-U35n05TE.js","assets/index-oqNiFkU8.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
