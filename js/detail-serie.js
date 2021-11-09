//traer detalle de series dinamicamente
//serie https://api.themoviedb.org/3/tv/{tv_id}  


//let section = document.querySelectorAll 
let queryString = location.search;
let queryStringObj = new URLSearchParams(queryString);
let q = queryStringObj.get('q');
console.log(q);