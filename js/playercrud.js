function carga(){
   var numplayer=window.localStorage.playercrud;

   if (!numplayer){
    //alta de player
    document.getElementById("titulo").innerHTML="Alta de jugador/a";
    document.getElementById("factivo").checked=true;
    document.getElementById("tr-modif").style.display = "none";
   }else{
    //editar player
    var jugadores = JSON.parse(window.localStorage.players);
    document.getElementById("titulo").innerHTML="Modificar jugador/a";
    
    mapearinformacion(jugadores[numplayer]);
    document.getElementById("tr-alta").style.display = "none";
   }
      
}


function savedatos(op){
    //console.log("guardo");
    mostrarToast("Procesando ...",2000);
    var numplayer=window.localStorage.playercrud;
    var datosjugador=getDatosJugador(numplayer);
    //console.log("datosjugador.activo = "+datosjugador.activo);
    //actualizar datos
    savePlayerFB(datosjugador);
}

function deleteplayer(){
    mostrarToast("Procesando ...",2000);
    //console.log("Borramos jugador y sus partidos");
    var numplayer=window.localStorage.playercrud;
    var datosjugador=getDatosJugador(numplayer);
    deleteByIdPlayerFB(datosjugador.idplayer);
}

function getDatosJugador(numplayer){
    var jugador=new Object();
    if(document.getElementById("factivo").checked){
        jugador.activo=1;
    }else{
        jugador.activo=0;
    }    
    jugador.categoria=document.getElementById("fcategoria").value;
    jugador.equipo=document.getElementById("fequipo").value;
    jugador.genero= document.getElementById("fgenero").value;
    jugador.idusuario=window.localStorage.clave;
    jugador.mail=window.localStorage.mail;
    jugador.nivel=document.getElementById("fnivel").value;
    jugador.nombre=document.getElementById("fnombre").value;
    jugador.temporada=document.getElementById("ftemporada").value;
    if (numplayer){
        jugador.idplayer=JSON.parse(window.localStorage.players)[numplayer].idplayer; 
    }else{
        jugador.idplayer="";
    }  
    return jugador;
}

function mapearinformacion(jugador){
    document.getElementById("fcategoria").value=jugador.categoria;
    document.getElementById("fequipo").value=jugador.equipo;
    document.getElementById("fgenero").value=jugador.genero;
    document.getElementById("fnivel").value=jugador.nivel;
    document.getElementById("fnombre").value=jugador.nombre;
    document.getElementById("ftemporada").value=jugador.temporada;
    if(jugador.activo==1){
        document.getElementById("factivo").checked=true;
    }else{
        document.getElementById("factivo").checked=false;
    }
}



var modal = document.getElementById("myModal");
// Get the button that opens the modal
var btn = document.getElementById("myBtnFin");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";    
  }
}
function cerrarModal(){
    modal.style.display = "none";
}
