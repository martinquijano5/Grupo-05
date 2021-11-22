//traer detalle de peliculas dinamicamente
// peliculas https://api.themoviedb.org/3/movie/{movie_id}  


let secciones = document.querySelectorAll ("section")
let queryString = location.search;
let queryStringObj = new URLSearchParams(queryString);
let q = queryStringObj.get('q');
console.log(q);

fetch (`https://api.themoviedb.org/3/movie/${q}?api_key=66374e925f9ce0061d8e10191732f374`)
.then(function(response) {
    return response.json();
})

.then(function (data) {

console.log(data)
console.log(secciones) 
let generos="todavia no le asignamos generos" ; 
for(let i = 0; i < data.genres.length; i++){
    if(i == 0){
        generos= `<a href="detail-genres.html?q=${data.genres[i].id}&t=movie">${data.genres[i].name}</a>`;
    } else { generos += `, <a href="detail-genres.html?q=${data.genres[i].id}&t=movie">${data.genres[i].name}</a>`;}
}

secciones[0].innerHTML= `
<div class="foto-contenido">
<img src="${ "https://image.tmdb.org/t/p/original" + data.poster_path}"alt="banner ${data.name}">
<div class="contenido">
   <div class="titulo-fav">
      <h1 class="genero-peli">${data.title}</h1>
      <button>
        <i class="icon-star-empty icon-2"></i>
      </button>
   </div>
   <p>Fecha de estreno: ${data.release_date}</p>
   <p>Generos: ${generos}</p>
   <p>Satus: ${data.status}</p>
</div>
</div>

`

secciones[1].innerHTML= `

<div class="sinopsis-reviews">
               <div class="sinopsis">
                  <p>${data.overview}</p>
               </div>
               <div>
               </div>
               <div class="reviews">
                  <h2>Reviews</h2>
                  <div class="reviews-fotos">
                     <div class="logo-rating">
                        <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" alt="logo dMovie data base" class="img-rating">
                        <p class="rating-text">Valoracion: ${data.vote_average}</p>
                     </div>
                     <div class="logo-rating">
                        <img src="https://media.istockphoto.com/vectors/people-icon-in-flat-style-group-of-people-symbol-for-your-web-site-vector-id1136653100?k=20&m=1136653100&s=170667a&w=0&h=ExivHgBvO-2xTO10MaXx7gP7mqEBNUpa-ov9hN_nBaY=" alt="logo popularidad" class="img-rating">
                        <p class="rating-text">Popularity: ${data.popularity}</p>
                     </div>
                  </div>
               </div>
            </div>

`
let tagline = '';
tagline = data.tagline;
if(tagline != '' && tagline != null){
    secciones[2].innerHTML += `
<div class="datos-un-detalle">
    <h2>Tagline:</h2>
    <h3>${tagline}</h3>
</div>
`
}

let productores = '';
for (i=0; i< data.production_companies.length ; i++ ) {
    if(i == 0){
        productores= `${data.production_companies[i]. name}`;
    } else { productores += `, ${data.production_companies[i]. name}`;
    }
}
console.log(productores);
if(productores != '' && productores != null){
    secciones[2].innerHTML += `
    <div class="datos-un-detalle">
    <h2>Productora: </h2>
    <h3>${productores}</h3>
    `
}
let presupuesto = '';
presupuesto = data.budget;
if(presupuesto != '' && presupuesto != null){
    secciones[2].innerHTML += `
<div class="datos-un-detalle">
    <h2>Presupuesto:</h2>
    <h3>$us ${presupuesto}</h3>
</div>
`
}

let ganancias = '';
ganancias = data.revenue;
if(ganancias != ''){
    secciones[2].innerHTML += `
<div class="datos-un-detalle">
    <h2>Ganancias:</h2>
    <h3>$us ${ganancias}</h3>
</div>
`
}
//favoritos
let boton = document.querySelectorAll('button')[1];
console.log(boton);
let listaFavoritos = [];

if(localStorage.getItem('favoritos_movie') && localStorage.getItem('favoritos_movie') != null){
    listaFavoritos = JSON.parse(localStorage.getItem('favoritos_movie'));
}
if(listaFavoritos.includes(q)){
    boton.innerHTML = `<i class="icon-star icon-2"></i>`
}
})

.catch(function (error) {
    console.log('el error fue ' + error);
})  

boton.addEventListener('click', function(e){
    if(listaFavoritos.includes(q)){
        listaFavoritos.splice(listaFavoritos.indexOf(q), 1);
        boton.innerHTML = `<i class="icon-star-empty icon-2"></i>`
        console.log(listaFavoritos);
    } else {
        listaFavoritos.push(q);
        boton.innerHTML = `<i class="icon-star icon-2"></i>`
        console.log(listaFavoritos);
    }
    let guardarLocal = JSON.stringify(listaFavoritos);
    localStorage.setItem("favoritos_movie", guardarLocal);
    console.log(localStorage);
    })