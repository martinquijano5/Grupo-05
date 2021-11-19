//listado de peliculas que el usuario marco como favoritas
// peliculas favoritas https://api.themoviedb.org/3/movie/top_rated

let titulo = document.querySelector('h1');
let seccion = document.querySelector('#resultados');

let listaFavoritosMovie = [], listaFavoritosSerie = [];
if(localStorage.getItem('favoritos_movie') && localStorage.getItem('favoritos_movie') != null){
    listaFavoritosMovie = JSON.parse(localStorage.getItem('favoritos_movie'));
}
if(localStorage.getItem('favoritos_serie') && localStorage.getItem('favoritos_serie') != null){
    listaFavoritosSerie = JSON.parse(localStorage.getItem('favoritos_serie'));
}
console.log(listaFavoritosMovie.length);
console.log(listaFavoritosSerie.length);

if(listaFavoritosMovie.length === 0 && listaFavoritosSerie.length === 0) {
    titulo.innerText = 'No tiene peliculas ni series agregadas a favoritos'
}

for(let i = 0; i < listaFavoritosMovie.length; i++){
        // llamado al endpoint de detalle para obtener los generos
        let generosHTML = 'a esta pelicula no se le asignaron generos';
        console.log(i);
        console.log(listaFavoritosMovie[0]);
        fetch(`https://api.themoviedb.org/3/movie/${listaFavoritosMovie[i]}?api_key=66374e925f9ce0061d8e10191732f374`)
            .then(function(response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                //for de logica de comas, para el primer elemento no pone coma, para el resto si
                for(let e = 0; e < data.genres.length; e++){
                    if(e == 0){
                        generosHTML = `<a href="detail-genres.html?q=${data.genres[e].id}&t=movie">${data.genres[e].name}</a>`;
                    } else { generosHTML += `, <a href="detail-genres.html?q=${data.genres[e].id}&t=movie">${data.genres[e].name}</a>`;}
                }
                //console.log(generosHTML);
                seccion.innerHTML += `
                <article class="un-resultado">
                <a href="detail-movie.html?q=${data.id}"><img src="${ "https://image.tmdb.org/t/p/original" + data.poster_path}" alt="banner ${data.title}" class="foto-un-resultado">     </a>
                <div class="datos-un-resultado">
                <span class="titulo-favorito">
                    <a href="detail-movie.html?q=${data.id}">
                        <h2 class="titulo-una-busqueda">${data.title}</h2>
                    </a>
                </span>
                <p>Fecha de salida: ${data.release_date}</p>
                <p>Generos: ${generosHTML} </p>
                <p>Rating: ${data.vote_average}</p>
                <p>Sinopsis: ${data.overview}</p>
            </article>
            `
            }
            )
            .catch(function (error) {
                console.log('el error fue ' + error);
            })
    }
for(let i = 0; i < listaFavoritosSerie.length; i++){
        // llamado al endpoint de detalle para obtener los generos
        let generosHTML = 'a esta pelicula no se le asignaron generos';
        console.log(i);
        console.log(listaFavoritosMovie[0]);
        fetch(`https://api.themoviedb.org/3/tv/${listaFavoritosSerie[i]}?api_key=66374e925f9ce0061d8e10191732f374`)
            .then(function(response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                //for de logica de comas, para el primer elemento no pone coma, para el resto si
                for(let e = 0; e < data.genres.length; e++){
                    if(e == 0){
                        generosHTML = `<a href="detail-genres.html?q=${data.genres[e].id}&t=tv">${data.genres[e].name}</a>`;
                    } else { generosHTML += `, <a href="detail-genres.html?q=${data.genres[e].id}&t=tv">${data.genres[e].name}</a>`;}
                }
                //console.log(generosHTML);
                seccion.innerHTML += `
                <article class="un-resultado">
                <a href="detail-serie.html?q=${data.id}"><img src="${ "https://image.tmdb.org/t/p/original" + data.poster_path}" alt="banner ${data.name}" class="foto-un-resultado">     </a>
                <div class="datos-un-resultado">
                <span class="titulo-favorito">
                    <a href="detail-serie.html?q=${data.id}">
                        <h2 class="titulo-una-busqueda">${data.name}</h2>
                    </a>
                </span>
                <p>Fecha de salida: ${data.first_air_date}</p>
                <p>Generos: ${generosHTML} </p>
                <p>Rating: ${data.vote_average}</p>
                <p>Sinopsis: ${data.overview}</p>
            </article>
            `
            }
            )
            .catch(function (error) {
                console.log('el error fue ' + error);
            })
}