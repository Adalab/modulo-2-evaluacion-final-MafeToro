const d=document.querySelector(".js-search-anime"),u=document.querySelector(".js-search-button"),m=document.querySelector(".js-anime-results"),o=document.querySelector(".js-anime-favorites");let r=[],i=JSON.parse(localStorage.getItem("favoritesAnimes"))||[];const h=document.querySelector(".js-reset-button");function L(e){const n=parseInt(e.currentTarget.id),t=r.find(a=>a.mal_id===n);if(!t)return;const s=i.findIndex(a=>a.mal_id===n);s===-1?i.push(t):i.splice(s,1),localStorage.setItem("favoritesAnimes",JSON.stringify(i)),l(),v(r)}function l(){o.innerHTML="";for(const e of i){const n=document.createElement("li");n.innerHTML=`
        
        <div class="js-anime-listed" id="${e.mal_id}"> <h3 class="anime-subtitle">${e.title}</h3>
            <div class="favorites-header"><img class= "anime-image-favorites" src="${e.images.jpg.image_url}" alt="${e.titles[0].title}">
            <button class= "js-remove-anime remove-button" data-id="${e.mal_id}">❌</button></div>
        </div>
        </div>
`,o.appendChild(n)}if(localStorage.setItem("favoritesAnimes",JSON.stringify(i)),i.length>0){const e=document.createElement("button");e.classList.add("js-favorite-reset-button","favorites-reset-button"),e.textContent="🗑 Borrar todos los favoritos",o.appendChild(e)}o.removeEventListener("click",p),S()}function p(e){e.target.classList.contains("js-remove-anime")?j(e):e.target.classList.contains("js-favorite-reset-button")&&g(e)}function j(e){e.preventDefault();const n=parseInt(e.target.dataset.id);i=i.filter(t=>t.mal_id!==n),localStorage.setItem("favoritesAnimes",JSON.stringify(i)),l()}function f(e){e.preventDefault(e);const n=d.value;fetch("https://api.jikan.moe/v4/anime?q="+n).then(t=>t.json()).then(t=>{r=t.data;for(const s of r)s.titles[0].title,s.images.jpg.image_url,v(r)}).catch(t=>console.error("Error al obtener datos de la API:",t))}u.addEventListener("click",f);function v(e){m.innerHTML="";for(const t of e){const s=i.some(c=>c.mal_id===t.mal_id);let a="";a+=`
            <li class= "anime-item ${s?"favorite-anime-highlight":""}" id="${t.mal_id}">
                <h3 class="anime-subtitle">${t.title}</h3>
                <div class="anime js-anime-listed" id="${t.mal_id}" data-id="${t.mal_id}">
                    <img class="anime_image" src="${t.images.jpg.image_url}" alt="${t.titles[0].title}">
                </div>
            </li>
        `,m.innerHTML+=a}const n=document.querySelectorAll(".js-anime-listed");for(const t of n){t.addEventListener("click",L);const s=parseInt(t.parentElement.id);i.find(c=>c.mal_id===s)&&t.parentElement.classList.add("favorite-anime-highlight")}}u.addEventListener("click",f);function S(){const e=document.querySelector(".js-favorite-reset-button");e&&e.addEventListener("click",g)}function g(e){e.preventDefault(e),i=[],localStorage.removeItem("favoritesAnimes"),o.innerHTML="",d.value="",l()}document.addEventListener("DOMContentLoaded",()=>{l()});function A(e){i=[],localStorage.removeItem("favoritesAnimes"),o.innerHTML="",m.innerHTML="",d.value="",l()}h.addEventListener("click",A);
//# sourceMappingURL=main.js.map
