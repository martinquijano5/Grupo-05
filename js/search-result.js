//resultado de busqueda del usuario
//peliculas  https://api.themoviedb.org/3/search/movie  
//series https://api.themoviedb.org/3/search/tv 
//multiple https://api.themoviedb.org/3/search/multi


let seccion = document.querySelector('#resultados');
console.log(seccion);
let queryString = location.search;
let queryStringObj = new URLSearchParams(queryString);
let q = queryStringObj.get('q');
let urlId = "";
console.log(q);

fetch(`https://api.themoviedb.org/3/search/multi?api_key=66374e925f9ce0061d8e10191732f374&query=${q}`)
    .then(function(response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data.results.lengt);
        if(data.results.length > 0) {

        document.querySelector('.titulo-section').innerHTML = `Resultados de busqueda para: "${q}"`
        for(let i = 0;i<data.results.length;i++){
            console.log(data.results[i]);
            if(data.results[i].media_type =="movie"){
                urlId = `detail-movie.html?q=${data.results[i].id}`;
                seccion.innerHTML += `
                <article class="un-resultado">
                <a href="${urlId}"><img src="${ "https://image.tmdb.org/t/p/original" + data.results[i].poster_path}" alt="banner ${data.results[i].title}" class="foto-un-resultado">     </a>
                <div class="datos-un-resultado">
                   <span class="titulo-favorito">
                      <a href="${urlId}">
                         <h2 class="titulo-una-busqueda">${data.results[i].title}</h2>
                      </a>
                      <i class="icon-star-empty icon-2 icon-resultado"></i>
                   </span>
                   <p>Fecha de salida: ${data.results[i].release_date}</p>
                   <p><a href="">Animation</a>, <a href="">Adventure</a>, <a href="detail-genres.html">Comedy</a></p>
                   <p>Rating: ${data.results[i].vote_average}</p>
                   <p>Sinopsis: ${data.results[i].overview}</p>
             </article>
             `
            }
            if(data.results[i].media_type =="tv"){
                urlId = `detail-serie.html?q=${data.results[i].id}`;
                seccion.innerHTML += `
                <article class="un-resultado">
                <a href="${urlId}"><img src="${ "https://image.tmdb.org/t/p/original" + data.results[i].poster_path}" alt="banner ${data.results[i].name}" class="foto-un-resultado">     </a>
                <div class="datos-un-resultado">
                   <span class="titulo-favorito">
                      <a href="${urlId}">
                         <h2 class="titulo-una-busqueda">${data.results[i].name}</h2>
                      </a>
                      <i class="icon-star-empty icon-2 icon-resultado"></i>
                   </span>
                   <p>Fecha de salida: ${data.results[i].release_date}</p>
                   <p><a href="">Animation</a>, <a href="">Adventure</a>, <a href="detail-genres.html">Comedy</a></p>
                   <p>Rating: ${data.results[i].vote_average}</p>
                   <p>Sinopsis: ${data.results[i].overview}</p>
             </article>
             `
            }

        }
    }
    else {
        document.querySelectorAll(".titulo-section")[0].style.display = "none";
        document.querySelectorAll(".titulo-section")[1].style.display = "block";
    }
    })
    .catch(function (error) {
        console.log('el error fue ' + error);
    })