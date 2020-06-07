var separador=";";


function carga(){
    //cargalocal()
    var max=25;
    var idplayerfollow=window.sessionStorage.idfollowed;
    console.log("carga ->"+window.sessionStorage.followpartidosFromIndex);

    if (window.sessionStorage.seguidosidpartido!=null){        
        //miramos si venimos de detalle partido para que restaure la información que ya había
        //var partidoselected = window.sessionStorage.detallepartido;
        console.log("carga -> seguidosidpartido carga local");
        window.sessionStorage.removeItem("seguidosidpartido");
         //si no hacemos la carga local  
         
         if (idplayerfollow!=null){
            console.log("carga -> seguidosidpartido + idplayerfollow carga local");
            
             //si veníamos de followers cambiamos el titulo
             var playerfollowed=idplayerfollow.split(separador);
             document.getElementById("titulo").innerHTML="Partidos publicados de "+playerfollowed[1];
         }else{
            window.sessionStorage.followpartidosFromIndex=true;
            console.log(window.sessionStorage.followpartidosFromIndex);
         }

         cargalocal();
    }else if (idplayerfollow!=null){
        //venimos de followers
        
        var playerfollowed=idplayerfollow.split(separador);
        console.log("venimos de followers idplayerfollow="+idplayerfollow);
        document.getElementById("titulo").innerHTML="Partidos publicados de "+playerfollowed[1];
        max=10000000; // no ponemos límite a los partidos a visualizar
        cargaFirebase(max, playerfollowed[0]);
        
    }else{
        //si no hay nada cargado se trae la info de la bd en el cloud
        //no veminos de followers
        //ocultarCabeceras();
        window.sessionStorage.followpartidosFromIndex=true;
        console.log(window.sessionStorage.followpartidosFromIndex);
        console.log("venimos de index carga firebase");
        
        cargaFirebase(max, null); //cargamos máximo 25 últimos partidos
        //mostrarCabeceras();
    }
}


function salir(){
    //limpiar datos memoria
    //window.localStorage.removeItem("playerselected");
    //window.localStorage.removeItem("playerpartidos");
    //window.sessionStorage.removeItem("detalleidpartido");
    //window.sessionStorage.removeItem("detallepartido");
    
    //var retorno="./index.html";

    window.sessionStorage.removeItem("seguidosidpartido");
    window.localStorage.removeItem("seguidospartido");
    //if (window.sessionStorage.idfollowed !=null){
    retorno="./followers.html";
    //}
    window.sessionStorage.removeItem("idfollowed");

    window.location.href=retorno;
}
function cargalocal(playerselected){
    var arr = JSON.parse(window.localStorage.seguidospartido);
    printInformacion(arr, separador)
  
}


function cargaFirebase(max, idplayerfollow){


   var claveuser=window.localStorage.clave;
   if(!claveuser){
       //si la clave no existe lo mandamos a cargar
       window.location.href="./login.html";
   }
   var label="";
   var value="";
   if (idplayerfollow!=null){
       //venimos de followers de ver los partidos de los players que sigo
        label="idplayeridusuario";
        value=idplayerfollow+claveuser;
   }else{
       //venimos de ver los últimos partidos de los jugadores que sigo
        label="idusuario";
        value=claveuser;
   }
   
   cargaPartidosPlayersSeguidosByAttributesFB(label, value,max); 

}

function filtrarInformacion(arr){
        
    printInformacion(arr, separador);
    
}


function printInformacion(arr, separador){
    
    var datosLinea="";
    if (arr && arr.length > 0){
        
        for (i = 0; i < arr.length; i++) {
            //console.log( arr[i]);
            datosLinea = arr[i].registropartido.split(separador);
            //alert(datosLinea);
            agregarFila(datosLinea, i,  arr[i].idpartido ,arr[i].idseguidosregistro, arr[i].like);
            //alert(datosLinea);
        }
    }else{
        mostrarToast("no hay partidos registrados...",3000);
    }
}

function getFollowedPartidoSelected(lineselected, idpartido){
    //alert("ver partido ->"+lineselected);
    window.sessionStorage.seguidosidpartido = lineselected;
    //console.log(idpartido);
    //window.localStorage.playerselected=document.getElementById("fplayer").value;
    //window.sessionStorage.detallepartido=lineselected;
    //window.sessionStorage.detalleidpartido=idpartido;
    if (window.sessionStorage.followpartidosFromIndex){
        //console.log("cargar en top");
        window.top.location.href='./detallepartido.html';
    }else{
        //console.log("carga normal");
        window.location.href='./detallepartido.html';
    }
    
}

function putLikeFollowedPartidoSelected(lineselected, idpartido, idseguidosregistro){
//añadir like al partido seleccionado
    console.log("idpartido "+idpartido);
    console.log("idseguidosregistro "+idseguidosregistro);
    //alert("Like partido ->"+lineselected);
    //var partido = cargaPartidoByKeyFB(idpartido);
    agregarLikePartidoFB(idpartido);
    agregarLikeSeguidoPartidoFB(idseguidosregistro);

    document.getElementById("like-"+lineselected).src="./images/like-on.png";    
    document.getElementById("link-"+lineselected).removeAttribute("href"); 

    //actualizamos el listado que tenemos cargado en memorai
    var arr = JSON.parse(window.localStorage.seguidospartido);
    arr[lineselected].like=1;
    window.localStorage.seguidospartido=JSON.stringify(arr);

    mostrarToast("Like ;)","3000");
    
}


function agregarFila(datosLines, id, idpartido, idseguidosregistro ,like){
    //console.log(datosLines);
    var equipo = datosLines[0];
    var nombre=datosLines[1];
    var categoria=datosLines[2];
    var fecha=datosLines[3];
    var rival=datosLines[4];

    //var tiros = getDatosTotalTirosIn(datosLines)+"/"+getDatosTotalTirosAll(datosLines);
    var puntos=getPuntosUtil(datosLines);
    var asistencias=sumaDatosUtil(46, 50, datosLines);
    var valoracion=getValoracionUtil(datosLines);
    var puntuacionEquipo=datosLines[datosLines.length-2];
    var puntuacionRival=datosLines[datosLines.length-1];
  
   
    linea="<td>";
    linea+="<table class='table_test' style='width: 100%;'>";
    linea+="<tr><td style='width: 99%;'>";
    linea+="<font style='font-weight: bold;font-size:20px;color: #41cbfe;'>"+nombre+"</font>&nbsp;"+categoria+"</td>";
    if (like==0){
        linea+="<td><a id ='link-"+id+"' href=\"javascript:putLikeFollowedPartidoSelected("+id+",'"+idpartido+"','"+idseguidosregistro+"');\"><img id='like-"+id+"' class='imgIcono4' src='./images/like-off.png'></a></td>";
    }else{
        linea+="<td><img id='like-"+id+"' class='imgIcono4' src='./images/like-on.png'></td>";
    }
    
    linea+="</tr></table>";

    linea+="<a href=\"javascript:getFollowedPartidoSelected("+id+",'"+idpartido+"');\">";
    linea+="<table class='table_test' style='width: 100%;'>";
    linea+="<tr><td colspan='7'><font style='color: #6d8bbd'>"+equipo+"&nbsp"+puntuacionEquipo+"&nbsp-&nbsp"+rival+"&nbsp"+puntuacionRival+"</font>";    
    
    linea+="</td></tr>";
    linea+="<tr><td>"+fecha+"</td>";
    //linea+="<td>tir</td><td style='font-weight: bold;font-size:14px;color: #FFFFFF;'>"+tiros+"</td>";
    linea+="<td>pts</td><td style='font-weight: bold;font-size:14px;color: #FFFFFF;'>"+puntos+"</td>";
    linea+="<td>asi</td><td style='font-weight: bold;font-size:14px;color: #FFFFFF;'>"+asistencias+"</td>";
    linea+="<td>val</td><td style='font-weight: bold;font-size:14px;color: #FFFFFF;'>"+valoracion+"</td></tr>";
    linea+="</table>";
    linea+="</a>";
    linea+="</td>";
    var row = document.getElementById("seguidostablepartidos").insertRow(0);
    row.innerHTML = linea; 
    //console.log(puntuacionEquipo+"-"+puntuacionRival);
}



