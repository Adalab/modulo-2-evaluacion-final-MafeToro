'use strict';

const searchInput = document.querySelector(".js-search-anime");
const searchButton = document.querySelector(".js-search-button");
const ulResults = document.querySelector(".js-anime-results");
const ulFavorites = document.querySelector(".js-anime-favorites");
let animeData = []
let favoritesAnimes = JSON.parse(localStorage.getItem("favoritesAnimes")) || [];
let imageURL = []
//let title = []

function handleClickAnime (event) {
const idAnimeClicked = parseInt(event.currentTarget.id);
const animeSelected = animeData.find((anime) => {
return idAnimeClicked === anime.mal_id;
})
favoritesAnimes.push(animeSelected);
renderFavorites();
}

function renderFavorites() {
ulFavorites.innerHTML = "";
for (const anime of favoritesAnimes) {
    let content = ""
    content += `
    <li>
        <h3 class="favorite-anime-font">${anime.title}<i class="fa-solid fa-star"></i></h3>
        <div class="favorite-anime-year">${anime.aired.string}</div>
        <div class="anime js-anime-listed" id="${anime.mal_id}">
            <div class="favorite-anime-background"><img class="anime_image" src="${anime.images.jpg.image_url}" alt="${anime.titles[0].title}"></div> 
        </div>
    </li>
`;
ulFavorites.innerHTML += content;
}
localStorage.setItem("favoritesAnimes", JSON.stringify(favoritesAnimes));
}

function searchAnime () {
    const value = searchInput.value;
    fetch("https://api.jikan.moe/v4/anime?q=" + value) //aquí debo agregar lo que busca la usuaria para construir la URL
    .then(response => response.json()) //fetch me devuelve response, necesito transformarlo a json
    .then(data => { //aquí accedo a lo que me contesta el servidor
    animeData = data.data; //es data.data porque no es data solamente T.T
    for (const anime of animeData) {
        const title = anime.titles[0].title;
        imageURL = anime.images.jpg.image_url;
        if (imageURL === "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png") {
            imageURL = "https://cdn-icons-png.flaticon.com/512/5219/5219070.png";
        }  
        renderAnimes(animeData);
       }
    })
}
    searchButton.addEventListener("click", searchAnime);

    function renderAnimes(animes) {
        ulResults.innerHTML = "";

        for (const anime of animes) {
            let content = ""
            content += `
            <li>
                <h3>${anime.title}</h3>
                <div class="anime js-anime-listed" id="${anime.mal_id}">
                <div class="favorite-anime-year">${anime.aired.string}</div>
                    <img class="anime_image" src="${anime.images.jpg.image_url}" alt="${anime.titles[0].title}"> 
                </div>
            </li>
        `;
        ulResults.innerHTML += content;
        }

        const animesHTML = document.querySelectorAll(".js-anime-listed");
        for (const animeHTML of animesHTML) {
        animeHTML.addEventListener("click", handleClickAnime);
    }
    }

    searchButton.addEventListener("click", searchAnime);

   renderFavorites();

    /*} else {
    searchAnime();
    }*/

    /*if (localStorageAnimes !== null) {
    favoritesAnimes = localStorageAnimes;
    console.log (localStorageAnimes);
    } else {*/ 