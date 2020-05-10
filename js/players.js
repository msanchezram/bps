function carga(){
   
    //carga de usuarios
    var claveuser=window.localStorage.clave;
    //console.log("clave="+claveuser);
    if(claveuser==null){
        //si la clave no existe lo mandamos a cargar
        //console.log("vamos al login claveuser null");
        window.location.href="./login.html";
    }
    var players = window.localStorage.players;
    if (players==null){
        //deberiamos ir a cargar los jugadores       
        //window.location.href="./login.html";
        //console.log("vamos al login players null");
        loadPlayersFB(claveuser,"./players.html")
        
    }else{    
        players= JSON.parse(window.localStorage.players);
        //mostrarToast('Mostramos los datos', 3000);
        //var players = JSON.parse(window.localStorage.players);
        cargarTablaPlayers(players);
    }    
}

function cargarTablaPlayers(players){
    var obj;
    var linea="";
    var estado="";
    for (var i=0;i<players.length;i++){
        //mostrarToast(players[i].nombre, 1000);
        obj=players[i];
        if (obj.activo==1){
            estado="activo";
        }else{
            estado="inactivo";
        }
        //console.log(obj.nombre);
        linea="<td>";
        linea+="<a href='javascript:editplayer("+i+");'>";
        linea+="<table class='table_test'>";
        linea+="<tr><td><font style='font-weight: bold;font-size:24px;color: rgb(65, 203, 254)'>"+obj.nombre+"</font></td></tr>";
        linea+="<tr><td><font style='font-size:14px;color: #FFFFFF'>"+obj.equipo+" "+obj.temporada+"</font></td></tr>";
        linea+="<tr><td><font style='font-size:14px;'>"+obj.categoria+" Nivel "+obj.nivel+"</font><font style='font-size:12px;'> ("+estado+")</font></td></tr>";
        linea+="</table>";
        linea+="</a>";
        linea+="</td>";
        var row = document.getElementById("tableplayers").insertRow(0);
        row.innerHTML = linea;  
    }
}
function editplayer(numplayer){
    window.localStorage.playercrud=numplayer;
    window.location.href="./playercrud.html";
}

function createplayer(){
    window.localStorage.removeItem("playercrud");
    window.location.href="./playercrud.html";
}