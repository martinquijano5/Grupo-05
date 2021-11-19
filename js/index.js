//traer listados de peliculas y series para mostrar dinamicamente
//peliculas populares  https://api.themoviedb.org/3/movie/popular
//peliculas top rated y valoradas https://api.themoviedb.org/3/movie/top_rated
//series populares https://api.themoviedb.org/3/tv/popular  

let divs= document.querySelectorAll('.articulos')
console.log(divs)

fetch ('https://api.themoviedb.org/3/movie/popular?api_key=66374e925f9ce0061d8e10191732f374')
.then(function(response) {
    return response.json();
})

.then(function (data) {

    console.log(data)
    for (let i=0; i<5; i++){

        let generosHTML = 'a esta pelicula no se le asignaron generos';
        fetch(`https://api.themoviedb.org/3/movie/${data.results[i].id}?api_key=66374e925f9ce0061d8e10191732f374`)
            .then(function(response) {
                return response.json();
            })
            .then(function (masData) {
                console.log(masData);
                //for de logica de comas, para el primer elemento no pone coma, para el resto si
                for(let e = 0; e < masData.genres.length; e++){
                    if(e == 0){
                        generosHTML = `<a href="detail-genres.html?q=${masData.genres[e].id}&t=movie">${masData.genres[e].name}</a>`;
                    } else { generosHTML += `, <a href="detail-genres.html?q=${masData.genres[e].id}&t=movie">${masData.genres[e].name}</a>`;}
                }
                //console.log(generosHTML);
                divs[0].innerHTML += `
                <article class="una-peli">
                  <a href="detail-movie.html?q=${masData.id}">
                     <h3 class="titulo-peli">${masData.title}</h3>
                  </a>
                  <a href="detail-movie.html?q=${masData.id}" class="una-peli-img"><img src=${ "https://image.tmdb.org/t/p/original" + masData.poster_path} alt="banner ${masData.title}"></a>
                  <div class="fecha-div">
                     <h4>${masData.release_date}</h4>
                     <div class="genero-fav">
                        <h4 class="genero-peli"> ${generosHTML} </h4>
                     </div>
                  </div>
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
});

fetch ('https://api.themoviedb.org/3/movie/top_rated?api_key=66374e925f9ce0061d8e10191732f374')
.then(function(response) {
    return response.json();
})

.then(function (data) {

    console.log(data)
    for (let i=0; i<5; i++){

        let generosHTML = 'a esta pelicula no se le asignaron generos';
        fetch(`https://api.themoviedb.org/3/movie/${data.results[i].id}?api_key=66374e925f9ce0061d8e10191732f374`)
            .then(function(response) {
                return response.json();
            })
            .then(function (masData) {
                console.log(masData);
                //for de logica de comas, para el primer elemento no pone coma, para el resto si
                for(let e = 0; e < masData.genres.length; e++){
                    if(e == 0){
                        generosHTML = `<a href="detail-genres.html?q=${masData.genres[e].id}&t=movie">${masData.genres[e].name}</a>`;
                    } else { generosHTML += `, <a href="detail-genres.html?q=${masData.genres[e].id}&t=movie">${masData.genres[e].name}</a>`;}
                }
                //console.log(generosHTML);
                divs[1].innerHTML += `
                <article class="una-peli">
                  <a href="detail-movie.html?q=${masData.id}">
                     <h3 class="titulo-peli">${masData.title}</h3>
                  </a>
                  <a href="detail-movie.html?q=${masData.id}" class="una-peli-img"><img src=${ "https://image.tmdb.org/t/p/original" + masData.poster_path} alt="banner ${masData.title}"></a>
                  <div class="fecha-div">
                     <h4>${masData.release_date}</h4>
                     <div class="genero-fav">
                        <h4 class="genero-peli"> ${generosHTML} </h4>
                     </div>
                  </div>
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
});

fetch ('https://api.themoviedb.org/3/tv/popular?api_key=66374e925f9ce0061d8e10191732f374')
.then(function(response) {
    return response.json();
})

.then(function (data) {

    console.log(data)
    for (let i=0; i<5; i++){

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
                        generosHTML = `<a href="detail-genres.html?q=${masData.genres[e].id}&t=tv">${masData.genres[e].name}</a>`;
                    } else { generosHTML += `, <a href="detail-genres.html?q=${masData.genres[e].id}&t=tv">${masData.genres[e].name}</a>`;}
                }
                //console.log(generosHTML);
                divs[2].innerHTML += `
                <article class="una-peli">
                  <a href="detail-serie.html?q=${masData.id}">
                     <h3 class="titulo-peli">${masData.name}</h3>
                  </a>
                  <a href="detail-serie.html?q=${masData.id}" class="una-peli-img"><img src=${ "https://image.tmdb.org/t/p/original" + masData.poster_path} alt="banner ${masData.name}"></a>
                  <div class="fecha-div">
                     <h4>${masData.first_air_date}</h4>
                     <div class="genero-fav">
                        <h4 class="genero-peli"> ${generosHTML} </h4>
                     </div>
                  </div>
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
});