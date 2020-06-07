var menustate="";

function carga(){
    var clave=window.localStorage.clave;
    if (!clave){
        window.location.href="./login.html";
    }
    document.getElementById("menuorigen").style.display="none";        
}

function openNav() {
    if(menustate=="O"){
        closeNav();
       
    }else{
        document.getElementById("mySidenav").style.width = "80%";
        menustate="O";
    }
}
  
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    menustate="";
}


function myFunction(x) {
    openNav();
    x.classList.toggle("change");
}