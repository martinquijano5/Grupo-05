//dos listados de generos, uno de peliculas y uno de series
// peliculas https://api.themoviedb.org/3/genre/movie/list
// series https://api.themoviedb.org/3/genre/tv/list 
let secciones = document.querySelectorAll('.todos-generos');

fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=66374e925f9ce0061d8e10191732f374`)
    .then(function(response) {
        return response.json();
     })
     .then(function(data){
        //console.log(data);
        for(let i = 0; data.genres.length; i++){
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=66374e925f9ce0061d8e10191732f374&sort_by=popularity.desc&page=1&with_genres=${data.genres[i].id}`)
            .then(function(response) {
                return response.json();
            })
            .then(function (pelis) {
               //console.log(pelis);
               let url = '';
               url = "https://image.tmdb.org/t/p/original" + pelis.results[0].poster_path;
               secciones[0].innerHTML += `
                <article class="un-genero" id="genero-peli-${data.genres[i].id}">
                <a href="detail-genres.html?q=${data.genres[i].id}&t=movie">
                   <h3>${data.genres[i].name}</h3>
                </a>
             </article>
                `
                document.querySelector(`#genero-peli-${data.genres[i].id}`).style.backgroundImage = `url('${url}')`
            })
            .catch(function (error) {
                console.log('el error fue ' + error);
            })
        }
     })
     .catch(function(error){
         console.log('el error es ' + error);
     })

//series

fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=66374e925f9ce0061d8e10191732f374`)
    .then(function(response) {
        return response.json();
     })
     .then(function(data){
        console.log(data);
        for(let i = 0; data.genres.length; i++){
            fetch(`https://api.themoviedb.org/3/discover/tv?api_key=66374e925f9ce0061d8e10191732f374&sort_by=popularity.desc&page=1&with_genres=${data.genres[i].id}`)
            .then(function(response) {
                return response.json();
            })
            .then(function (pelis) {
               console.log(pelis);
               let url = '';
               url = "https://image.tmdb.org/t/p/original" + pelis.results[0].poster_path;
               secciones[1].innerHTML += `
                <article class="un-genero" id="genero-serie-${data.genres[i].id}">
                <a href="detail-genres.html?q=${data.genres[i].id}&t=tv">
                   <h3>${data.genres[i].name}</h3>
                </a>
             </article>
                `
                document.querySelector(`#genero-serie-${data.genres[i].id}`).style.backgroundImage = `url('${url}')`
            })
            .catch(function (error) {
                console.log('el error fue ' + error);
            })
        }
     })
     .catch(function(error){
         console.log('el error es ' + error);
     })
