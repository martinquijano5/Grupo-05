let form = document.querySelector('form');
form.addEventListener('submit', function(e){
    let q = document.querySelector('input').value;
    e.preventDefault();
    console.log(q);
    console.log(q.length);
    if(q == ''){
        alert('la busqueda no puede estar vacia')
        } 
    else if(q.length < 3){
      alert('la busqueda no puede tener menos de 3 caracteres')
    }
    else{
        window.location.href = `search-result.html?q=${q}`;
    }
})
