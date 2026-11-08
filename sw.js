const C='santalsabad-v64';const F=['./','index.html','words.csv','slides.json','manifest.json','grammar.json','en_ipa.json','icon.svg','img/sc/c001.webp'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C&&x!=='santalsabad-offline').map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
 e.respondWith(fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res}).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match('index.html'))))});
self.addEventListener('periodicsync',e=>{if(e.tag==='wotd')e.waitUntil(self.registration.showNotification('SantalSabad: आज का शब्द',{body:'आज का नया संताली शब्द देखिए',icon:'icon.svg',tag:'wotd',data:{url:'./'}}))});
self.addEventListener('notificationclick',e=>{e.notification.close();const u=(e.notification.data&&e.notification.data.url)||'./';e.waitUntil(self.clients.matchAll({type:'window'}).then(L=>{for(const c of L){if('focus' in c){c.navigate&&c.navigate(u.startsWith('#')?'./'+u:u);return c.focus()}}return self.clients.openWindow(u.startsWith('#')?'./'+u:u)}))});
