var idfollowed=""; //esta variable servira para guardar el id del registro por si hay que activar/desactivar el check de superfollower
var issuperfollower=""; //esta variable sirve para saber en la pagina si el follower seleccionado es super o no
function carga(){
   
    
    var optionver=window.localStorage.veropcionfollowersplayer;

    //carga de followers
    var players = window.localStorage.players;
    if (players==null){
        //deberiamos ir a cargar los jugadores       
        //window.location.href="./login.html";
        //console.log("vamos al login players null");
        loadPlayersFB(claveuser,"./players.html")
        
    }else{
        if (optionver=='L'){
            //venimos de Likes
            document.getElementById("titulo").innerHTML="Likes al partido <img id='cargando' class='imgIcono4' style='float:right;cursor:pointer' src='./images/loading.gif'>";
            var idpartido = window.localStorage.verLikesIdPartido;
            cargaPartidosPlayersSeguidosByAttributesFB("idpartido",idpartido,1000000000);

        }else{
            document.getElementById("titulo").innerHTML="Mis Seguidores/as <img id='cargando' class='imgIcono4' style='float:right;cursor:pointer' src='./images/loading.gif'>";
            var numplayer=window.localStorage.verfollowersplayer;
            //venimos de players
            players= JSON.parse(window.localStorage.players);
            //mostrarToast('Mostramos los datos', 3000);
            //var players = JSON.parse(window.localStorage.players);
            //cargarTablaPlayers(players);
            var idplayer=players[numplayer].idplayer;
            loadFollowedPlayersFB(idplayer,"./verfollowers.html","idplayer")
        }
        //celdaCargando("tablefollowers");
    }  
    
}

function salir(){
    var optionver=window.localStorage.veropcionfollowersplayer;
    if (optionver=='L'){
        //venimos de Likes
        window.localStorage.removeItem("veropcionfollowersplayer");
        window.localStorage.removeItem("verLikesIdPartido");
        window.location.href="./estadisticasglobales.html";
    }else{
        window.location.href="./players.html";
    }
    

}

//metodo retorno de FB con la lista de registros
function filtrarInformacion(arrpartidosseguidos){

    cargarTablaFollowers(arrpartidosseguidos);
    
}

function cargarTablaFollowers(followers){
    var obj;
    var linea="";
    var row;
    //var estado="";

    //limpiar tabla de resultados util.js
    //limpiarTablaResultados("tablefollowers");
    //utils.js
    inhabilitarIconoCargando("cargando");

    if (followers.length==0){
        mostrarToast("No hay datos disponibles :(",3000);
    }else{
        var optionver=window.localStorage.veropcionfollowersplayer;
        
        for (var i=0;i<followers.length;i++){
            //console.log(followers[i]);
            obj=followers[i];
            if (optionver=="L" ){
                if ( followers[i].like ==1){
                    linea="<td>";
                    //linea+="<a href='javascript:editplayer("+i+");'>";
                    linea+="<table class='table_test'>";
                    linea+="<tr><td><font style='font-weight: bold;font-size:24px;color: rgb(65, 203, 254)'>"+obj.apodofollower+"</font>";   
    
                    linea+="</td></tr>";
                    //linea+="<tr><td><font style='font-weight: bold;font-size:24px;color: rgb(65, 203, 254)'>"+obj.nombre+"</font> <span  style='float:right;cursor:pointer;text-align:right;color:#FFFFFF;font-size:16px;font-weight: bold;'>"+obj.followers+"<img class='imgIcono4' style='vertical-align:bottom;' src='./images/followers.png'></span></td></tr>";
                    linea+="<tr><td><font style='font-size:14px;color: #FFFFFF'>"+obj.fechafollow+"</font></td></tr>";
                    //linea+="<tr><td><font style='font-size:14px;'>"+obj.categoria+" Nivel "+obj.nivel+"</font><font style='font-size:12px;'> ("+estado+")</font></td></tr>";
                    linea+="</table>";
                    //linea+="</a>";
                    linea+="</td>";
                    row = document.getElementById("tablefollowers").insertRow(0);
                    row.innerHTML = linea;
                }
                

            } else{

                linea="<td>";
                //linea+="<a href='javascript:editplayer("+i+");'>";
                linea+="<table class='table_test'>";
                linea+="<tr><td><font style='font-weight: bold;font-size:24px;color: rgb(65, 203, 254)'>"+obj.apodofollower+"</font>";   
               
                linea+="<a href=\"javascript:putstar('"+obj.idusuario+"',"+obj.super+",'"+obj.apodofollower+"','"+obj.idfollowed+"')\">"
                linea+="<img id='verall' class='imgIcono4' style='float:right;cursor:pointer' src='./images/estrella";
                if (obj.super==0){ //si no es estrella le ponemos el sufijo de gris a la imagen
                        linea+="-gris";
                }
                linea+=".png'>";
                linea+="</td></tr>";
                
                linea+="<tr><td><font style='font-size:14px;color: #FFFFFF'>"+obj.fechafollow+"</font></td></tr>";
                //linea+="<tr><td><font style='font-size:14px;'>"+obj.categoria+" Nivel "+obj.nivel+"</font><font style='font-size:12px;'> ("+estado+")</font></td></tr>";
                linea+="</table>";
                //linea+="</a>";
                linea+="</td>";
                linea+="</a>";   
                row = document.getElementById("tablefollowers").insertRow(0);
                row.innerHTML = linea;             
            }
           
            //mostrarToast(players[i].nombre, 1000);
            

            //console.log("super->"+obj.super);
            //console.log(obj.nombre);
            
              
        }
    }
}

function putstar(idfollower,star, apodo, anIdfollowed){

    issuperfollower=star;
    idfollowed=anIdfollowed;
    var titulo="Estar seguro de ";
    if (star==0){
        titulo+="hacer superfollower a "+apodo+"?<br> Podra ver todos tus partidos";
    }else{
        titulo+="quitar los permisos de superfollower a "+apodo+"?";
    }
    
    document.getElementById("titulo-modal").innerHTML=titulo;
    openModal();
}

function aceptar(){
    if (issuperfollower==1){
        console.log('le quito el flag de super '+idfollowed);
        updateSuperFollowedFB(idfollowed, 0);
    }else{
        console.log('le pongo el flag de super '+idfollowed);
        updateSuperFollowedFB(idfollowed, 1);
    }
    salir();
}

var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
function openModal() {
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