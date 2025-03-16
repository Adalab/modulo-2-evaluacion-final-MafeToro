const f=document.querySelector(".js-search-anime"),d=document.querySelector(".js-search-button"),c=document.querySelector(".js-anime-results"),m=document.querySelector(".js-anime-favorites");let o=[],n=JSON.parse(localStorage.getItem("favoritesAnimes"))||[];function g(i){const e=parseInt(i.currentTarget.id),t=o.find(s=>s.mal_id===e);if(!t)return;const a=n.findIndex(s=>s.mal_id===e);a===-1?n.push(t):n.splice(a,1),localStorage.setItem("favoritesAnimes",JSON.stringify(n)),l(),v(o)}function l(){m.innerHTML="";for(const i of n){let e="";e+=`
    <li>
        <h3>${i.title}</h3>
        <div class="js-anime-listed" id="${i.mal_id}">
            <div class="favorites-header"><img class= "anime-image-favorites" src="${i.images.jpg.image_url}" alt="${i.titles[0].title}">
            <div class= "js-remove-anime remove-button" data-id="${i.mal_id}">❌</div></div>
        </div>
        </div>
    </li>
`,m.innerHTML+=e}h()}function h(){const i=document.querySelectorAll(".js-remove-anime");for(const e of i)e.addEventListener("click",p)}function p(i){i.stopPropagation();const e=parseInt(i.currentTarget.dataset.id);n=n.filter(a=>a.mal_id!==e),localStorage.setItem("favoritesAnimes",JSON.stringify(n)),l()}function u(){const i=f.value;fetch("https://api.jikan.moe/v4/anime?q="+i).then(e=>e.json()).then(e=>{o=e.data;for(const t of o)t.titles[0].title,t.images.jpg.image_url,v(o)}).catch(e=>console.error("Error al obtener datos de la API:",e))}d.addEventListener("click",u);function v(i){c.innerHTML="";for(const t of i){const a=n.some(r=>r.mal_id===t.mal_id);let s="";s+=`
            <li class= "anime-item ${a?"favorite-anime-highlight":""}" id="${t.mal_id}">
                <h3>${t.title}</h3>
                <div class="anime js-anime-listed" id="${t.mal_id}">
                    <img class="anime_image" src="${t.images.jpg.image_url}" alt="${t.titles[0].title}">
                </div>
            </li>
        `,c.innerHTML+=s}const e=document.querySelectorAll(".js-anime-listed");for(const t of e){t.addEventListener("click",g);const a=parseInt(t.parentElement.id);n.find(r=>r.mal_id===a)&&t.parentElement.classList.add("favorite-anime-highlight")}}d.addEventListener("click",u);l();
//# sourceMappingURL=main.js.map
