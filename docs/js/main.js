const d=document.querySelector(".js-search-anime"),r=document.querySelector(".js-search-button"),l=document.querySelector(".js-anime-results"),c=document.querySelector(".js-anime-favorites");let a=[],s=JSON.parse(localStorage.getItem("favoritesAnimes"))||[];function u(i){const t=parseInt(i.currentTarget.id),e=a.find(n=>t===n.mal_id);s.push(e),o()}function o(){c.innerHTML="";for(const i of s){let t="";t+=`
    <li>
        <h3 class="favorite-anime-font">${i.title}<i class="fa-solid fa-star"></i></h3>
        <div class="anime js-anime-listed" id="${i.mal_id}">
            <div class="favorite-anime-background"><img class="anime_image" src="${i.images.jpg.image_url}" alt="${i.titles[0].title}"></div> 
        </div>
    </li>
`,c.innerHTML+=t}localStorage.setItem("favoritesAnimes",JSON.stringify(s))}function m(){const i=d.value;fetch("https://api.jikan.moe/v4/anime?q="+i).then(t=>t.json()).then(t=>{a=t.data;for(const e of a)e.titles[0].title,e.images.jpg.image_url,f(a)})}r.addEventListener("click",m);function f(i){l.innerHTML="";for(const e of i){let n="";n+=`
            <li>
                <h3>${e.title}</h3>
                <div class="anime js-anime-listed" id="${e.mal_id}">
                    <img class="anime_image" src="${e.images.jpg.image_url}" alt="${e.titles[0].title}"> 
                </div>
            </li>
        `,l.innerHTML+=n}const t=document.querySelectorAll(".js-anime-listed");for(const e of t)e.addEventListener("click",u)}r.addEventListener("click",m);o();
//# sourceMappingURL=main.js.map
