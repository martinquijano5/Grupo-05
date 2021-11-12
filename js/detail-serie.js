//traer detalle de series dinamicamente
//serie https://api.themoviedb.org/3/tv/{tv_id}  


let secciones = document.querySelectorAll ("section")
let queryString = location.search;
let queryStringObj = new URLSearchParams(queryString);
let q = queryStringObj.get('q');
console.log(q);

fetch (`https://api.themoviedb.org/3/tv/${q}?api_key=66374e925f9ce0061d8e10191732f374`)
.then(function(response) {
    return response.json();
})

.then(function (data) {

console.log(data)
console.log(secciones)

})

.catch(function (error) {
    console.log('el error fue ' + error);
})