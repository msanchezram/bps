var separador=";";
var selectedtofollowed=0;

function carga(){
   
    //borramos los datos por si el usuario decide hacer un volver desde navegador y no desde
    //el botón de atrás
    window.sessionStorage.removeItem("seguidosidpartido");
    window.localStorage.removeItem("seguidospartido");
    window.sessionStorage.removeItem("idfollowed");

    //carga de usuarios
    var claveuser=window.localStorage.clave;
    //borramos el atributo followpartidosFromIndex ya que si lo tenemos en memoria lo borramos
    //porque no iriamos desde index
    window.sessionStorage.removeItem("followpartidosFromIndex");
    //console.log("clave="+claveuser);
    if(claveuser==null){
        //si la clave no existe lo mandamos a cargar
        //console.log("vamos al login claveuser null");
        window.location.href="./login.html";
    }
    var players = window.sessionStorage.followedplayers;
    if (players==null){
        //deberiamos ir a cargar los jugadores       
        //window.location.href="./login.html";
        //console.log("players es null carga FB");
        mostrarToast("cargando información ...", 3000)
        loadFollowedPlayersFB(claveuser,"./followers.html","idusuario")
        
    }else{    
        console.log("players no es null carga local");
        players= JSON.parse(players);
        //mostrarToast('Mostramos los datos', 3000);
        //var players = JSON.parse(window.localStorage.players);
        cargarTablaPlayers(players,"unfollow.png", "unfollow"); //util.js
    }    
    
}

function unfollow(numplayer){
    //alert('unfollow');
    var playersfollowed= JSON.parse(window.sessionStorage.followedplayers);
    document.getElementById("msgFollow").innerHTML= "Seguro que quieres dejar de seguir a "+playersfollowed[numplayer].nombre+" del "+playersfollowed[numplayer].categoria+"?";
    selectedtofollowed=numplayer;
    modal.style.display = "block";
}

function salir (){
    window.sessionStorage.removeItem("followedplayers");
    window.location.href='./index.html';
}
function deletefollow(){
    //alert('borramos todos');
    //cerramos la ventana
    modal.style.display = "none";
    mostrarToast("dejamos de seguir ...", 4000)

    var playersfollowed= JSON.parse(window.sessionStorage.followedplayers);
    var idplayeridusuario = playersfollowed[selectedtofollowed].idplayer+playersfollowed[selectedtofollowed].idusuario;
    var idfollowed=playersfollowed[selectedtofollowed].idfollowed;
    //console.log(playersfollowed[selectedtofollowed].idfollowed);
    //console.log(idplayeridusuario);
    unfollowplayerFB(idfollowed, idplayeridusuario)
}

function selectedplayer(numplayer){
    //alert('editplayer');
    
    var playersfollowed= JSON.parse(window.sessionStorage.followedplayers);
    //console.log("super->"+playersfollowed[numplayer].super);
    window.sessionStorage.idfollowed = playersfollowed[numplayer].idplayer+separador+playersfollowed[numplayer].nombre+separador+playersfollowed[numplayer].super;
    window.location.href="./followedpartidos.html";
}

function createfollowed(){
    //alert('createfollowed');
    //window.localStorage.removeItem("playercrud");
    window.location.href="./searchfollower.html";
}
function retunfollowplayer(){
    //console.log("estamos retunfollowplayer()");
    //hay que restar 1 en followers del DTO players
    restarFollower();
}

function restarFollower(){
    
    var playersfollowed= JSON.parse(window.sessionStorage.followedplayers);
    var idplayer = playersfollowed[selectedtofollowed].idplayer;
    //console.log("estamos restarFollower() "+idplayer);
    agregarFollowerPlayerFB(idplayer, 0); // el parametro 0 indica que vamos a restar
}

function retornoFollow(){
    //console.log("estamos retornoFollow() y volvemos a index");
    window.sessionStorage.removeItem("followedplayers"); //borramos el listado de followed players
    //recargamos la página
    location.reload();
    //window.location.href="./index.html";
}

var modal = document.getElementById("myModal");
// Get the button that opens the modal
//var tn = document.getElementById("myBtnFin");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks the button, open the modal 

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