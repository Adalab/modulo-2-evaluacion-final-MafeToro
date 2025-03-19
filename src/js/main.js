'use strict';
const searchInput = document.querySelector(".js-search-anime");
const searchButton = document.querySelector(".js-search-button");
const ulResults = document.querySelector(".js-anime-results");
const ulFavorites = document.querySelector(".js-anime-favorites");
let animeData = []
let favoritesAnimes = JSON.parse(localStorage.getItem("favoritesAnimes")) || [];
const resetButtonAll = document.querySelector(".js-reset-button");
//Manejar click === añadir/eliminar de favoritos//

function handleClickAnime (event) {
const idAnimeClicked = parseInt(event.currentTarget.id); // obtenemos el ID del anime clicado y lo convertimos a número
const animeSelected = animeData.find(anime => anime.mal_id === idAnimeClicked); // busca el anime en el array de la API
if (!animeSelected) return; // si el anime no existe, se detiene la función
const index = favoritesAnimes.findIndex(anime => anime.mal_id === idAnimeClicked); // busca si el anime ya está en la lista de favoritos
if (index === -1) { // si el anime no está en favoritos, lo agrega
    favoritesAnimes.push(animeSelected);
} else {
    favoritesAnimes.splice(index, 1); //si el anime ya está en favoritos, borra un elemento a partir de la posición index
}
localStorage.setItem("favoritesAnimes", JSON.stringify(favoritesAnimes)); 
renderFavorites();
renderAnimes(animeData);
}

function renderFavorites() { // creamos una lista de animes favs

ulFavorites.innerHTML = ""; //se limpia la UL

for (const anime of favoritesAnimes) { // itera con el bucle
    const li = document.createElement("li"); // crea los li y los rellena

    li.innerHTML = `
        
        <div class="js-anime-listed" id="${anime.mal_id}"> <h3 class="anime-subtitle">${anime.title}</h3>
            <div class="favorites-header"><img class= "anime-image-favorites" src="${anime.images.jpg.image_url}" alt="${anime.titles[0].title}">
            <button class= "js-remove-anime remove-button" data-id="${anime.mal_id}">❌</button></div>
        </div>
        </div>
`;
ulFavorites.appendChild(li); // agrego con DOM avanzado el li
}
localStorage.setItem("favoritesAnimes", JSON.stringify(favoritesAnimes)); 

if (favoritesAnimes.length > 0) { // si hay favoritos, se agrega el botón de reset
    const resetButton = document.createElement("button");
    resetButton.classList.add("js-favorite-reset-button", "favorites-reset-button");
    resetButton.textContent = "🗑 Borrar todos los favoritos";
    ulFavorites.appendChild(resetButton);
}

ulFavorites.removeEventListener("click", handleFavoritesClick); // antes de añadir un nuevo evento de clic, eliminamos cualquier evento previo
addResetListener(); // agrega el evento de clic a ulFavorites
}

function handleFavoritesClick(event) { // maneja el evento de click
    if (event.target.classList.contains("js-remove-anime")) {
        removeFavorite(event);
    } else if (event.target.classList.contains("js-favorite-reset-button")) {
        resetFavorites(event);
    }
}

function addRemoveListeners() { // agrega los listeners de remove en cada botón
    const removeButtons = document.querySelectorAll(".js-remove-anime")
    for (const button of removeButtons) {
        button.removeEventListener("click", removeFavorite); // evita listeners duplicados
        button.addEventListener("click", removeFavorite); 
    }

}

function removeFavorite(event) { // filtra y elimina los elementos que han sido clicados en la x
    event.preventDefault();
    const idAnimeToRemove = parseInt(event.target.dataset.id);
    favoritesAnimes = favoritesAnimes.filter(anime => anime.mal_id !== idAnimeToRemove);
    localStorage.setItem("favoritesAnimes", JSON.stringify(favoritesAnimes));
    renderFavorites();
}

function searchAnime (event) {
    event.preventDefault(event);
    const value = searchInput.value;
    fetch("https://api.jikan.moe/v4/anime?q=" + value) //aquí debo agregar lo que busca la usuaria para construir la URL
    .then(response => response.json()) //fetch me devuelve response, necesito transformarlo a json
    .then(data => { //aquí accedo a lo que me contesta el servidor
    animeData = data.data; //es data.data porque no es data solamente T.T
    for (const anime of animeData) {
        const title = anime.titles[0].title;
        let imageURL = anime.images.jpg.image_url;
        if (imageURL === "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png") {
            imageURL = "https://cdn-icons-png.flaticon.com/512/5219/5219070.png";
        }  
        renderAnimes(animeData);
       }
    })
    .catch(error => console.error("Error al obtener datos de la API:", error));
}
    searchButton.addEventListener("click", searchAnime);

    function renderAnimes(animes) {
        ulResults.innerHTML = ""; //Limpio mi lista
        for (const anime of animes) {
            const isFavorite = favoritesAnimes.some(fav => fav.mal_id === anime.mal_id);
            let content = ""
            content += `
            <li class= "anime-item ${isFavorite ? "favorite-anime-highlight" : ""}" id="${anime.mal_id}">
                <h3 class="anime-subtitle">${anime.title}</h3>
                <div class="anime js-anime-listed" id="${anime.mal_id}" data-id="${anime.mal_id}">
                    <img class="anime_image" src="${anime.images.jpg.image_url}" alt="${anime.titles[0].title}">
                </div>
            </li>
        `;
        ulResults.innerHTML += content;
        }


        const animesHTML = document.querySelectorAll(".js-anime-listed"); // Escuho el click en cadaa elemento de la lista en el HTML
        for (const animeHTML of animesHTML) {
        animeHTML.addEventListener("click", handleClickAnime);
        const idAnime = parseInt(animeHTML.parentElement.id); //Defino el id de su padre al darle click
        const isFavorite = favoritesAnimes.find(fav => fav.mal_id === idAnime); //Determino si es favorito
        if (isFavorite) {
            animeHTML.parentElement.classList.add("favorite-anime-highlight"); //Determino si es favorito
        }
    }
    }
    searchButton.addEventListener("click", searchAnime); // busca el anime al darle click a 
    function addResetListener() {
        const resetButton = document.querySelector(".js-favorite-reset-button");
        if (resetButton) {
            resetButton.addEventListener("click", resetFavorites);
        }
    }
    
    function resetFavorites(event) { // Eliminamos todo en favoritos
        event.preventDefault(event);
        favoritesAnimes = []; // conviértelo en un array vacío
        localStorage.removeItem("favoritesAnimes"); // quítalo del localStorage
        ulFavorites.innerHTML = ""; 
        searchInput.value = ""; 
        renderFavorites(); // vuelve a llamar a render favorites
    }
    document.addEventListener("DOMContentLoaded", () => {
        renderFavorites();
    });


    function resetAll(click) { // Eliminamos todo en la página
        favoritesAnimes = []; // conviértelo en un array vacío
        localStorage.removeItem("favoritesAnimes"); // quítalo del localStorage
        ulFavorites.innerHTML = ""; // limpia el favoritos
        ulResults.innerHTML = ""; //limpia resultados
        searchInput.value = ""; //limpia el input
        renderFavorites(); // vuelve a llamar a render favorites
    }

    resetButtonAll.addEventListener("click", resetAll);