const f=document.querySelector(".js-search-anime"),u=document.querySelector(".js-search-button"),m=document.querySelector(".js-anime-results"),d=document.querySelector(".js-anime-favorites");let o=[],n=JSON.parse(localStorage.getItem("favoritesAnimes"))||[];function g(t){const i=parseInt(t.currentTarget.id),e=o.find(s=>s.mal_id===i);if(!e)return;const a=n.findIndex(s=>s.mal_id===i);a===-1?n.push(e):n.splice(a,1),localStorage.setItem("favoritesAnimes",JSON.stringify(n)),l(),c(o)}function l(){d.innerHTML="";for(const t of n){let i="";i+=`
    <li>
        
        <div class="js-anime-listed" id="${t.mal_id}"> <h3 class="anime-subtitle">${t.title}</h3>
            <div class="favorites-header"><img class= "anime-image-favorites" src="${t.images.jpg.image_url}" alt="${t.titles[0].title}">
            <div class= "js-remove-anime remove-button" data-id="${t.mal_id}">❌</div></div>
        </div>
        </div>
    </li>
`,d.innerHTML+=i}h()}function h(){const t=document.querySelectorAll(".js-remove-anime");for(const i of t)i.addEventListener("click",j)}function j(t){const i=parseInt(t.currentTarget.dataset.id);n=n.filter(e=>e.mal_id!==i),localStorage.setItem("favoritesAnimes",JSON.stringify(n)),l(),c(o)}function v(){const t=f.value;fetch("https://api.jikan.moe/v4/anime?q="+t).then(i=>i.json()).then(i=>{o=i.data;for(const e of o)e.titles[0].title,e.images.jpg.image_url,c(o)}).catch(i=>console.error("Error al obtener datos de la API:",i))}u.addEventListener("click",v);function c(t){m.innerHTML="";for(const e of t){const a=n.some(r=>r.mal_id===e.mal_id);let s="";s+=`
            <li class= "anime-item ${a?"favorite-anime-highlight":""}" id="${e.mal_id}">
                <h3 class="anime-subtitle">${e.title}</h3>
                <div class="anime js-anime-listed" id="${e.mal_id}">
                    <img class="anime_image" src="${e.images.jpg.image_url}" alt="${e.titles[0].title}">
                </div>
            </li>
        `,m.innerHTML+=s}const i=document.querySelectorAll(".js-anime-listed");for(const e of i){e.addEventListener("click",g);const a=parseInt(e.parentElement.id);n.find(r=>r.mal_id===a)&&e.parentElement.classList.add("favorite-anime-highlight")}}u.addEventListener("click",v);l();
//# sourceMappingURL=main.js.map
