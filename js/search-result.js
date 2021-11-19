//resultado de busqueda del usuario
//multiple https://api.themoviedb.org/3/search/multi

window.addEventListener('load', function(){
    document.querySelector('#gif-loading').style.display = 'none';
    let seccion = document.querySelector('#resultados');
    let queryString = location.search;
    let queryStringObj = new URLSearchParams(queryString);
    let q = queryStringObj.get('q');
    
    fetch(`https://api.themoviedb.org/3/search/multi?api_key=66374e925f9ce0061d8e10191732f374&query=${q}`)
        .then(function(response) {
            return response.json();
        })
        .then(function (data) {
            //console.log(data.results.length);
            if(data.results.length > 0) {   //este if y el else de abajo sirven para cuando la busqueda no trae resultados
                document.querySelector('.titulo-section').innerHTML = `Resultados de busqueda para: "${q}"`
                //recorro todo el array
                console.log(data);
                for(let i = 0;i<data.results.length;i++){
                    //algunas cosas cambian dependiendo si el elemento es una serie o una pelicula, para simplificar hacemos dos ifs   
                    if(data.results[i].media_type =="movie"){
                        // llamado al endpoint de detalle para obtener los generos
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
                    if(data.results[i].media_type =="tv"){
                        // llamado al endpoint de detalle para obtener los generos
                        let generosHTML = 'A esta serie no se le asignaron generos';
                        fetch(`https://api.themoviedb.org/3/tv/${data.results[i].id}?api_key=66374e925f9ce0061d8e10191732f374`)
                            .then(function(response) {
                                return response.json();
                            })
                            .then(function (masData) {
                                //console.log(masData);
                                //for de logica de comas, para el primer elemento no pone coma, para el resto si
                                for(let e = 0; e < masData.genres.length; e++){
                                    if(e == 0){
                                        generosHTML = `<a href="detail-genres.html?q=${masData.genres[e].id}&t=tv">${masData.genres[e].name}</a>`;
                                    } else { generosHTML += `, <a href="detail-genres.html?q=${masData.genres[e].id}&t=tv">${masData.genres[e].name}</a>`;}
                                }
                                //console.log(generosHTML);
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
})