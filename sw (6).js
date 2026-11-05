const V='n99-v2',A=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.allSettled(A.map(u=>c.add(u)))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
const save=n=>{if(n&&(n.ok||n.type==='opaque')){const cp=n.clone();caches.open(V).then(c=>c.put(r,cp))}return n};
if(r.mode==='navigate'){e.respondWith(fetch(r).then(save).catch(()=>caches.match(r,{ignoreSearch:true}).then(h=>h||caches.match('./index.html'))));return}
e.respondWith(caches.match(r,{ignoreSearch:true}).then(h=>h||fetch(r).then(save)))});
