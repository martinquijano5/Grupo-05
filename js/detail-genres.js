//detalle de un genero
//https://api.themoviedb.org/3/discover/movie?api_key=<<api_key>>&sort_by=popularity.desc&with_genres=<<id_genre>>

let seccion = document.querySelector ("#resultados");
let queryString = location.search;
let queryStringObj = new URLSearchParams(queryString);
let q = queryStringObj.get('q');
let t = queryStringObj.get('t');
console.log(q);
console.log(t);
let titulo = 'Faltan parametros o incorrectos. recorda que solo se puede ingresar a esta pagina a traves de la navegacion'; // 
document.querySelector('.titulo-section').innerHTML = titulo;

if(t == "movie"){
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=66374e925f9ce0061d8e10191732f374`)
    .then(function(response) {
        return response.json();
     })
     .then(function(genMovies){
        for(let i = 0; i < genMovies.genres.length; i++){
            if(genMovies.genres[i].id == q){
                titulo = `Peliculas pertenecientes al genero ${genMovies.genres[i].name}`;
                
                document.querySelector('.titulo-section').innerHTML = titulo;
            }
        }
     })
     .catch(function(error){
         console.log('el error es ' + error);
     })
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=66374e925f9ce0061d8e10191732f374&sort_by=popularity.desc&page=1&with_genres=${q}`)
        .then(function(response) {
            return response.json();
         })
         .then(function (data) {
            console.log(data)
            for(let i = 0;i<data.results.length;i++){
                // llamado al endpoint de detalle para obtener los generos
                let generosHTML = 'a esta pelicula no se le asignaron generos';
                fetch(`https://api.themoviedb.org/3/movie/${data.results[i].id}?api_key=66374e925f9ce0061d8e10191732f374`)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function (masData) {
                        //console.log(masData);
                        //for de logica de comas, para el primer elemento no pone coma, para el resto si
                        for(let e = 0; e < masData.genres.length; e++){
                            if(e == 0){
                                generosHTML = `<a href="detail-genres.html?q=${masData.genres[e].id}">${masData.genres[e].name}</a>`;
                            } else { generosHTML += `, <a href="genres-movie.html?q=${masData.genres[e].id}">${masData.genres[e].name}</a>`;}
                        }
                        seccion.innerHTML += `
                        <article class="un-resultado">
                        <a href="detail-movie.html?q=${data.results[i].id}"><img src="${ "https://image.tmdb.org/t/p/original" + data.results[i].poster_path}" alt="banner ${data.results[i].title}" class="foto-un-resultado">     </a>
                        <div class="datos-un-resultado">
                        <span class="titulo-favorito">
                            <a href="detail-movie.html?q=${data.results[i].id}">
                                <h2 class="titulo-una-busqueda">${data.results[i].title}</h2>
                            </a>
                        </span>
                        <p>Fecha de salida: ${data.results[i].release_date}</p>
                        <p>Generos: ${generosHTML} </p>
                        <p>Rating: ${data.results[i].vote_average}</p>
                        <p>Sinopsis: ${data.results[i].overview}</p>
                    </article>
                    `
                    }
                    )
                    .catch(function (error) {
                        console.log('el error fue ' + error);
                    })
            }
         })
         .catch(function (error) {
            console.log('el error fue ' + error);
        })
}
if(t == "tv"){
    fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=66374e925f9ce0061d8e10191732f374`)
    .then(function(response) {
        return response.json();
     })
     .then(function(genMovies){
        for(let i = 0; i < genMovies.genres.length; i++){
            if(genMovies.genres[i].id == q){
                titulo = `Series pertenecientes al genero ${genMovies.genres[i].name}`;
                
                document.querySelector('.titulo-section').innerHTML = titulo;
            }
        }
     })
    fetch(`https://api.themoviedb.org/3/discover/tv?api_key=66374e925f9ce0061d8e10191732f374&sort_by=popularity.desc&page=1&with_genres=${q}`)
        .then(function(response) {
            return response.json();
         })
         .then(function (data) {
            //console.log(data)
            for(let i = 0;i<data.results.length;i++){
                // llamado al endpoint de detalle para obtener los generos
                let generosHTML = 'a esta pelicula no se le asignaron generos';
                fetch(`https://api.themoviedb.org/3/tv/${data.results[i].id}?api_key=66374e925f9ce0061d8e10191732f374`)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function (masData) {
                        console.log(masData);
                        //for de logica de comas, para el primer elemento no pone coma, para el resto si
                        for(let e = 0; e < masData.genres.length; e++){
                            if(e == 0){
                                generosHTML = `<a href="detail-genres.html?q=${masData.genres[e].id}">${masData.genres[e].name}</a>`;
                            } else { generosHTML += `, <a href="genres-movie.html?q=${masData.genres[e].id}">${masData.genres[e].name}</a>`;}
                        }
                        seccion.innerHTML += `
                        <article class="un-resultado">
                        <a href="detail-serie.html?q=${data.results[i].id}"><img src="${ "https://image.tmdb.org/t/p/original" + data.results[i].poster_path}" alt="banner ${data.results[i].name}" class="foto-un-resultado">     </a>
                        <div class="datos-un-resultado">
                        <span class="titulo-favorito">
                            <a href="detail-serie.html?q=${data.results[i].id}">
                                <h2 class="titulo-una-busqueda">${data.results[i].name}</h2>
                            </a>
                        </span>
                        <p>Fecha de salida: ${data.results[i].first_air_date}</p>
                        <p>Generos: ${generosHTML} </p>
                        <p>Rating: ${data.results[i].vote_average}</p>
                        <p>Sinopsis: ${data.results[i].overview}</p>
                    </article>
                    `
                    }
                    )
                    .catch(function (error) {
                        console.log('el error fue ' + error);
                    })
            }
         })
         .catch(function (error) {
            console.log('el error fue ' + error);
        })
}