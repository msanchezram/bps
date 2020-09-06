var arrplayers=[];
var selectedtofollowuser=0;

function carga(){

    //document.getElementById("loading").style.visibility = "hidden"; // ocultar , "block" mostrar
    var claveuser=window.localStorage.clave;
    //window.localStorage.removeItem("players");
   
    var players = window.localStorage.players;
    if (players==null){
        //cargamos los jugadores
        mostrarToast("vamos a buscar nuestros jugadores/as...");          
        loadPlayersFB(claveuser,"./serarchfollower.html");
        document.getElementById("btnbuscar").value="En espera ...";
        
    }else{
        document.getElementById("btnbuscar").disabled=false;
    } 
   
}

function activarBotonBuscar(){
    document.getElementById("btnbuscar").value="Buscar";
    document.getElementById("btnbuscar").disabled=false;
}

function searchPlayers(){
    //console.log("click on searchPlayers");
    document.getElementById("panelacordeon").style.display = "none";
    document.getElementById("botonacordeon").innerHTML="Buscando jugadores/as ... <img class='imgIcono4' style='float:right;cursor:pointer' src='./images/loading.gif' >";    

    limpiarTablaResultados("tablefollowedplayers"); //util.js
    var datosbusqueda= getDatosFiltroJugador();
    //console.log(datosbusqueda);
    getPlayersByFiltrosBusquedaFB(datosbusqueda); 

}

function filtrarResultadoUsuarios(arrListaUsuarios, filtrosbusqueda){
    
    arrplayers= [];
    if (arrListaUsuarios.length > 0){
        //obtengo mis jugadores
        var arrmisjugadores = JSON.parse(window.localStorage.players);
        //console.log("arrmisjugadores ="+arrmisjugadores.length);
        //obtengo los que ya sigo
        var arrmisfollowedplayers = window.sessionStorage.followedplayers;  
        if (arrmisfollowedplayers!=null)       {
            arrmisfollowedplayers= JSON.parse(window.sessionStorage.followedplayers);
        }else{
            //si no seguimos a nadie inicializamos a 0 el array
            arrmisfollowedplayers= [];
        }
        
        var i=0;
        console.log("accedemos arrListaUsuarios");
        for (i=0;i<arrListaUsuarios.length;i++){
            //console.log(i+" ->"+arrListaUsuarios[i].nombre);
            if (isPlayerOk(arrListaUsuarios[i], filtrosbusqueda, arrmisjugadores, arrmisfollowedplayers)){
                //console.log("Push "+i+" ->"+arrListaUsuarios[i].nombre);
                arrplayers.push(arrListaUsuarios[i]);
            }
        }
    }
    //console.log("arrListaUsuarios ="+arrListaUsuarios.length);
    //console.log("arrplayers ="+arrplayers.length);
    document.getElementById("botonacordeon").innerHTML="Buscar jugador/a filtros... <img class='imgIcono2' style='float:right;cursor:pointer' src='./images/menu.png'>";
    
    if(arrplayers.length==0){
        //console.log("mostrarToast");
        mostrarToast("no hay registros ...",3000);
    }else{
        cargarTablaPlayers(arrplayers); //util.js
    }
    
    
}

function isPlayerOk(player, filtrosbusqueda, arrmisjugadores, arrmisfollowedplayers){

    //hay que controlar que no sea jugador mio
    if (player.activo==0){
        //console.log("activo");
        return false;
    }
    if (esJugadorQueSigo(player, arrmisfollowedplayers)){
        //console.log("jugador quke ya sigo");
        return false;
    }
    if (esJugadorMio(player, arrmisjugadores)){
        //console.log("jugador mio");
        return false;
    }    
    if (filtrosbusqueda.categoria.length>0 && player.categoria.toUpperCase().trim().indexOf(filtrosbusqueda.categoria)<0){
        //console.log("categoria");
        return false;
    }
    if (filtrosbusqueda.equipo.length>0 && player.equipo.toUpperCase().trim().indexOf(filtrosbusqueda.equipo)<0){  //}  --filtrosbusqueda.equipo.indexOf(player.equipo)<0){
        //console.log("equipo ->"+player.equipo.toUpperCase().trim().indexOf(filtrosbusqueda.equipo));
        return false;
    }
    if (filtrosbusqueda.genero.length>0 && player.genero.indexOf(filtrosbusqueda.genero)<0){
        //console.log("genero");
        return false;
    }
    if (filtrosbusqueda.nombre.length>0 && player.nombre.toUpperCase().trim().indexOf(filtrosbusqueda.nombre)<0){
        //console.log("nombre ->" + filtrosbusqueda.nombre.toUpperCase().trim().indexOf(player.nombre));
        return false;
    }
    if (filtrosbusqueda.temporada.length>0 && player.temporada.toUpperCase().trim().indexOf(filtrosbusqueda.temporada)<0){
        //console.log("temporada");
        return false;
    }
    /*
        activo:player.activo,
        categoria:player.categoria,
        equipo:player.equipo,
        genero:player.genero,
        idusuario:player.idusuario,
        mail:player.mail,
        nivel:player.nivel,
        nombre:player.nombre,
        temporada:player.temporada
        player.idplayer=obj.key;
    */
    return true;
}

function esJugadorMio(player, arrmisjugadores){

    if (arrmisjugadores.length > 0){
        var i;
        for (i=0;i<arrmisjugadores.length;i++){
            if (player.idplayer==arrmisjugadores[i].idplayer){
                return true;
            }
        }
    }
    return false;
}

function esJugadorQueSigo(player, arrfollowedPlayers){
    if (arrfollowedPlayers.length > 0){
        var i;
        for (i=0;i<arrfollowedPlayers.length;i++){
            if (player.idplayer==arrfollowedPlayers[i].idplayer){
                return true;
            }
        }
    }
    return false;
}

function getDatosFiltroJugador(){
    var jugador=new Object();
      
    jugador.categoria=document.getElementById("fcategoria").value.toUpperCase().trim();
    jugador.equipo=document.getElementById("fequipo").value.toUpperCase().trim();
    jugador.genero= document.getElementById("fgenero").value;
    
    jugador.mail=document.getElementById("fmailuser").value.trim(); //quitamos espacios por la derecha
    
    jugador.nombre=document.getElementById("fnombre").value.toUpperCase().trim();
    jugador.temporada=document.getElementById("ftemporada").value.toUpperCase().trim();
    
    return jugador;
}

function selectedplayer(i){
    //alert("selectedPlayer ->"+arrplayers[i].nombre);
    //activamos la ventana modal
    document.getElementById("msgFollow").innerHTML="Estás seguro de seguir a "+arrplayers[i].nombre+" del "+arrplayers[i].equipo+"?"
    selectedtofollowuser=i;
    modal.style.display = "block";
}

function follow(){
    //console.log("follow ->"+selectedtofollowuser);
    //console.log(arrplayers[selectedtofollowuser]);
    var tmpFecha=new Date();
    var tmpDia=""+tmpFecha.getDate();
    var tmpMes=""+(tmpFecha.getMonth()+1);
    if(tmpDia.length==1){
        tmpDia="0"+tmpDia;
    }
    if(tmpMes.length==1){
        tmpMes="0"+tmpMes;
    }
    
    var tmpFechaSt=tmpDia+"/"+tmpMes+"/"+tmpFecha.getFullYear();
    //creamos el objeto a serializar
    var playerfollow = {};
    playerfollow.categoria=arrplayers[selectedtofollowuser].categoria;
    playerfollow.equipo=arrplayers[selectedtofollowuser].equipo;    
    playerfollow.idplayer=arrplayers[selectedtofollowuser].idplayer;
    playerfollow.idusuario=window.localStorage.clave; //ponemos nuestra clave de usuario de búsqueda    
    playerfollow.nombre=arrplayers[selectedtofollowuser].nombre;   
    playerfollow.temporada=arrplayers[selectedtofollowuser].temporada; 
    playerfollow.apodofollower=window.localStorage.apodo;
    playerfollow.fechafollow=tmpFechaSt;

    var keyreturn = saveFollowedFB(playerfollow);
    agregarFollowerPlayerFB(arrplayers[selectedtofollowuser].idplayer);
    //console.log("followed creado"+keyreturn);
    
}

function retornoFollow(){
    //retorno del metodo de FB
    //procedemos a generar la publicación de partidos
    var label = "player";
    var value=arrplayers[selectedtofollowuser].idplayer;
    console.log("vamos a cargaPartidosPorAtributoFB de "+value);
    cargaPartidosPorAtributoFB(label, value);
}

function retCargaPartidosPorAtributo(arrpartidos){
    console.log("estamos en retCargaPartidosPorAtributo y tenemos partidos "+arrpartidos.length);
    var claveuser=window.localStorage.clave;
    for(var i=0;i<arrpartidos.length;i++){
        if (arrpartidos[i].publico == 1){
            //generar partido
            saveMatchFollowedByPlayerFB(arrpartidos[i].player, claveuser, arrpartidos[i].idpartido, arrpartidos[i].registro);
            //console.log("saveMatchFollowedByPlayerFB ("+arrpartidos[i].player+" - "+ claveuser +" - "+ arrpartidos[i].idpartido +" - "+ arrpartidos[i].registro);
        }
    }
    salir();
}

function salir(){
    window.sessionStorage.removeItem("followedplayers");
    window.document.location.href="./followers.html";
    //console.log("volvemos a followers");
}


var modal = document.getElementById("myModal");
// Get the button that opens the modal
//var tn = document.getElementById("myBtnFin");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks the button, open the modal 

/*
btn.onclick = function() {
  modal.style.display = "block";
}
*/

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

