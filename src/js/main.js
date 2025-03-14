'use strict';

const searchInput = document.querySelector(".js-search-anime");
const searchButton = document.querySelector(".js-search-button");
const ulResults = document.querySelector(".js-anime-results");
const ulFavorites = document.querySelector(".js-anime-favorites");
let animeData = []
let favoritesAnimes = []
//let imageURL = []
//let title = []



function handleClickAnime (event) {
const idAnimeClicked = parseInt(event.currentTarget.id);
const animeSelected = animeData.find((anime) => {
return idAnimeClicked === anime.mal_id;
})

favoritesAnimes.push(animeSelected);
ulFavorites.innerHTML = "";

for (const anime of favoritesAnimes) {
    let content = ""
    content += `
    <li>
        <h3>${anime.title}</h3>
        <div class="anime js-anime-listed" id="${anime.mal_id}">
            <img class="anime_image" src="${anime.images.jpg.image_url}" alt="${anime.titles[0].title}"> 
        </div>
    </li>
`;
ulFavorites.innerHTML += content;
}

}



function searchAnime () {
    const value = searchInput.value;
    fetch("https://api.jikan.moe/v4/anime?q=" + value) //aquí debo agregar lo que busca la usuaria para construir la URL
    .then(response => response.json()) //fetch me devuelve response, necesito transformarlo a json
    .then(data => { //aquí accedo a lo que me contesta el servidor
    animeData = data.data;
    for (const anime of animeData) {
        const title = anime.titles[0].title;
        const imageURL = anime.images.jpg.image_url || "https://via.placeholder.com/150https://cdn-icons-png.flaticon.com/512/5219/5219070.png";
        if (imageURL === "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png") {
            imageURL = "https://cdn-icons-png.flaticon.com/512/5219/5219070.png";
        }  
       }
       renderAnimes(animeData);
    })
}
    searchButton.addEventListener("click", searchAnime);

    function renderAnimes (animes) {
        ulResults.innerHTML = "";

        for (const anime of animes) {
            let content = ""
            content += `
            <li>
                <h3>${anime.title}</h3>
                <div class="anime js-anime-listed" id="${anime.mal_id}">
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

       // Ahora necesito pintar en mi HTML una tarjeta donde mostramos una imagen de la serie y el título //

    
      /* for (const images of anime.image) {
        content += `<img class="anime_image" src="${imageURL}" alt="${title}>"`
    }
        content +=*/
     
/*const seriesHTML = document.querySelectorAll(".js-anime-listed");
for (const serieHTML of seriesHTML) {
    serieHTML.addEventListener("click", handleclickSerie);
}
searchButton.addEventListener("click", searchAnime)
const localStorageSeries = JSON.parse(localStorage.getItem("series")); */



   /* ulResults.innerHTML = "";
    for (const item of animeArray) {
        let item = ""
        item += `
        <li>
        <h3>${titles}</h3>
        <div class= "anime js-anime-listed">
        `
        
        for (const images of imagesHTML) {
            content += `<img class="anime_image" src="${images}" alt="${titles}"`
        }
            content +=
            `</div>
            </li>
            `
    }
    }*/

/*function renderAnimes(animeArray) {
    ulResults.innerHTML = "";
    for (const anime of animeArray) {
        let content = ""
        content += `
        <li>
        <h3>${titles}</h3>
        <div class= "anime js-anime-listed" id="${mal_id}">
        `
        
        for (const images of anime.image) {
            content += `<img class="anime_image" src="${images}" alt="${titles}"`
        }
            content +=
            `</div>
            </li>
            `
    }

const seriesHTML = document.querySelectorAll(".js-anime-listed");
for (const serieHTML of seriesHTML) {
    serieHTML.addEventListener("click", handleclickSerie);
}
}
*/
    //const value = searchInput.value;
    //const filteredAnime = 
    //renderAnimes(filteredAnime);
    //



/*
console.log("escuchando el click")
    if (localStorageSeries !== null) {
        series = localStorageSeries;
        renderAnimes(localStorageSeries);
    } else {

*/

/*if (localStorageSeries !== null) {
    series = localStorageSeries;
    renderAnimes(localStorageSeries);
} else {
    fetch("https://api.jikan.moe/v4/anime")
    .then(response => response.json()) //fetch me devuelve response, necesito transformarlo a json
    .then(data => { //aquí accedo a lo que me contesta el servidor
    const titles = data.title;
    console.log(titles);
    })
}*/
