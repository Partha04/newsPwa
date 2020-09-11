const CATCHE_NAME="version 1";
const urlsToCatche=['index.html','offline.html'];

const self=this;
//install sw
self.addEventListener('install',(event)=>{
    event.waitUntil(
        caches.open(CATCHE_NAME)
        .then((cathe)=>{
          //  console.log(cathe);
            return cathe.addAll(urlsToCatche);
        })
    )
});
//listen for req

self.addEventListener('fetch',(event)=>{
    event.respondWith(
        caches.match(event.request)
         .then(()=>{
            return fetch(event.request)
            .catch(()=>{caches.match("offline.html")})
        })
    )
});
//activate the sw
self.addEventListener('activate',(event)=>{
    const cathceWhitelist=[];
    cathceWhitelist.push(CATCHE_NAME);
    
    event.waitUntil(
        caches.keys().then((catchenames)=>{
           Promise.all(
               catchenames.map((catchname)=>{
                   if(!cathceWhitelist.includes(catchname))
                   {
                       return caches.delete(catchname);
                   }
               })
           ) 
        })
    ) 
 });