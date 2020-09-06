var separador=";";
var superfollower="";
var arraypartidossuperfollowed=null;
var max=25;

function carga(){
    //cargalocal()
    max=25;
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
             document.getElementById("titulo").innerHTML="Partidos publicados de "+playerfollowed[1]+" <img id='cargando' class='imgIcono4' style='float:right;cursor:pointer' src='./images/loading.gif' >";
         }else{
            window.sessionStorage.followpartidosFromIndex=true;
            console.log(window.sessionStorage.followpartidosFromIndex);
         }
         //habilitarIconoCargando("cargando");
         cargalocal();
    }else if (idplayerfollow!=null){
        //venimos de followers
        
        var playerfollowed=idplayerfollow.split(separador);
        console.log("venimos de followers idplayerfollow="+idplayerfollow);
        document.getElementById("titulo").innerHTML="Partidos publicados de "+playerfollowed[1]+" <img id='cargando' class='imgIcono4' style='float:right;cursor:pointer' src='./images/loading.gif' >";
        max=10000000; // no ponemos límite a los partidos a visualizar
        //habilitarIconoCargando("cargando");
        superfollower=playerfollowed[2];
        cargaFirebase(max, playerfollowed[0], superfollower);
        
    }else{
        //si no hay nada cargado se trae la info de la bd en el cloud
        //no veminos de followers
        //ocultarCabeceras();
        window.sessionStorage.followpartidosFromIndex=true;
        console.log(window.sessionStorage.followpartidosFromIndex);
        console.log("venimos de index carga firebase");
        //habilitarIconoCargando("cargando");
        cargaFirebase(max, null,null); //cargamos máximo 25 últimos partidos
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


function cargaFirebase(max, idplayerfollow, superfollower){


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
   if (superfollower!=null && superfollower==1){
        //es un superfollower cargamos todos los partidos del usuario
        label="player";
        value=idplayerfollow;
        cargaPartidosPorAtributoFB(label, value)
   }else{
       //cargarmos los partidos publicos
        cargaPartidosPlayersSeguidosByAttributesFB(label, value,max); 
   }

}

function filtrarInformacion(arr){
    if (arraypartidossuperfollowed!=null){
        console.log("es un superfollower arr de partidos publicos total="+arr.length);
        //el usuario es superfollower
        genarraysuperfollower(arr);
    }else{
        printInformacion(arr, separador);
    }    
}

function genarraysuperfollower(arraypublicos){
    console.log("genarraysuperfollower");

    var tmpFound=false;
    //recorremos la lista de todos los partidos
    for (var i=0;i<arraypartidossuperfollowed.length;i++){
        tmpFound=false;
       
        for (var j=0;j<arraypublicos.length && !tmpFound;j++){
            //console.log(arraypartidossuperfollowed[i].idpartido+" == "+arraypublicos[j].idpartido);
            if (arraypartidossuperfollowed[i].idpartido==arraypublicos[j].idpartido){
                //console.log("machacamos posición");
                //es un partido publicado
                //machacamos la posición
                arraypartidossuperfollowed[i]=arraypublicos[j];
                //salimos del bucle
                tmpFound=true;
                break;
            }
        }
        if (!tmpFound){
            //console.log("renombramos variables");
            //idpartido, idseguidosregistro ,like
            arraypartidossuperfollowed[i].like=-1;
            arraypartidossuperfollowed[i].idseguidosregistro="";            
            //en caso que esté publicado necesitamos el campo registro con los datos del partido;
            arraypartidossuperfollowed[i].registropartido=arraypartidossuperfollowed[i].registro;
        }
        //console.log(i+"->"+arraypartidossuperfollowed[i]);
    }
    //modificamos el array de memoria por el nuevo array calculado
    window.localStorage.seguidospartido=JSON.stringify(arraypartidossuperfollowed);
    printInformacion(arraypartidossuperfollowed,separador)
}



function retCargaPartidosPorAtributo(arrpartidos){
    var max=10000000;
    console.log("es un superfollower arr de partidos del usuario total="+arrpartidos.length);
    
    var idplayerfollow=window.sessionStorage.idfollowed;          
    var playerfollowed=idplayerfollow.split(separador);
    
    playerfollowed[0]
    //si estamos aqui es porque el usuario es un superfollower
    arraypartidossuperfollowed=arrpartidos;
    var claveuser=window.localStorage.clave;

    var label="idplayeridusuario";
    var value=playerfollowed[0]+claveuser;

    //console.log("value->"+value);
    //llamamos a los partidos publicados
    cargaPartidosPlayersSeguidosByAttributesFB(label, value,max); 
}

function printInformacion(arr, separador){
    inhabilitarIconoCargando("cargando");
    var datosLinea="";
    if (arr && arr.length > 0){
        
        for (i = 0; i < arr.length; i++) {
            //console.log( arr[i]);
            datosLinea = arr[i].registropartido.split(separador);
            //alert(datosLinea);
            agregarFila(datosLinea, i,  arr[i].idpartido ,arr[i].idseguidosregistro, arr[i].like);
            //alert(datosLinea);
        }
        if (max>25){
            //si max es mayor que 25 es que no estamos en el index 
            var idplayerfollow=window.sessionStorage.idfollowed;
            //seguidostablepartidos
            agregarFilaEstadisticas(idplayerfollow, "seguidostablepartidos");
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

function gotoestadisticasgenerales(idplayer){
    window.sessionStorage.seguidosidpartido = 0;//informamos estas variables sólo para que el retorno haga una carga local
    //window.sessionStorage.detallepartido=0; 
    //window.sessionStorage.detalleidpartido=0; 
    window.location.href='./detalleestadisticasgenerales.html';
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
    }else if(like>0){
        linea+="<td><img id='like-"+id+"' class='imgIcono4' src='./images/like-on.png'></td>";
    }else{
        linea+="<td>&nbsp;</td>";
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



