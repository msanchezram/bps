function carga(){
    var clave=window.localStorage.clave;
    if (!clave){
        window.location.href="./login.html";
    }
    
}

