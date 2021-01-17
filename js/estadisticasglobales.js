function carga(){
    //cargalocal()
    //console.log("detallepartido->"+window.sessionStorage.detallepartido);
    //borramos variable por limpieza
    window.localStorage.removeItem("veropcionfollowersplayer");
    window.localStorage.removeItem("verLikesIdPartido");
    if (window.sessionStorage.detallepartido!=null){    
        console.log("carga local");
        //miramos si venimos de detalle partido para que restaure la información que ya había
        //var partidoselected = window.sessionStorage.detallepartido;
        window.sessionStorage.removeItem("detallepartido");
         //si no hacemos la carga local
         //cargalocal(partidoselected);
         //console.log("cargalocal");
         cargalocal();
    }else{
       //si no hay nada cargado se trae la info de la bd en el cloud
       cargaFirebase();
    }
}
function salirestadisticas(){
    //limpiar datos memoria
    window.localStorage.removeItem("playerselected");
    window.localStorage.removeItem("playerpartidos");
    window.sessionStorage.removeItem("detalleidpartido");
    window.sessionStorage.removeItem("detallepartido");
    
    window.location.href="./index.html";
}
//function cargalocal(playerselected){
function cargalocal(){

  //carga del select y asignación
  var player=window.localStorage.playerselected;
  var players = window.localStorage.players;
  players= JSON.parse(players);
  cargaselectplayer(players);
  document.getElementById("fplayer").value = player;
  var all=false;
  if (player=="0"){
    all=true;
  }
  //console.log("cargalocal "+player);
  //carga lista partidos
  if (window.sessionStorage.detalleidpartido!=null){
        //si tenemos el idpartido informado no hemos borrado el partido
        //console.log("tenemos el idpartido recargamos desde memoria");
        window.sessionStorage.removeItem("detalleidpartido");
        var arr = JSON.parse(window.localStorage.playerpartidos);    
        printInformacion(arr,";",all);
  }else{
      //console.log("no tenemos el idpartido recargamos de fire partidos");
      //si está borrado es que hemos borrado el partido y debemos volver a cargar los demas partidos
        onchangeplayer();
  }
  
}


function cargaFirebase(){


   var claveuser=window.localStorage.clave;
   if(!claveuser){
       //si la clave no existe lo mandamos a cargar
       window.location.href="./login.html";
   }
   var players = window.localStorage.players;
   
   if (!players){      
       window.location.href="./login.html";
       
   }else{ 
        
        players= JSON.parse(players);

        if (players.length>0){
                cargaselectplayer(players);
        }
        if (players.length==1){
            onchangeplayer();
        }
   } 
}

function onchangeplayer(){
    var idplayer = document.getElementById("fplayer").value;
    
    //limpiar tabla de resultados util.js
    limpiarTablaResultados("tablepartidos");

    if (idplayer == "0"){
        //cargar todos los partidos
        var email = window.localStorage.mail;
        cargaPartidosPorAtributoFB("mail",email); //metodo Firebase
    }else if (idplayer.length > 0){
        //cargamos los partidos del jugador seleccionado
        cargaPartidosPorAtributoFB("player",idplayer);
    }
}

function retCargaPartidosPorAtributo(arrpartidos){
    //Volvemos a limpiar antes de volver a cargar
    limpiarTablaResultados("tablepartidos");

    window.localStorage.playerpartidos=JSON.stringify(arrpartidos);
    var idplayer = document.getElementById("fplayer").value;
    var all=false;
    if (idplayer == "0"){
        all=true;
    }
    
    printInformacion(arrpartidos, ";", all);   //metodo de estadisticasglobales.js 
}

function cargaselectplayer(players){

    var text="";
    //var count=0;

    if (players.length>0){
        var x = document.getElementById("fplayer");
        var option = document.createElement("option");
        var listaInactivos=[];

        if (players.length>1){
            option.text = "Selecciona jugador/a"; //primero blanco para que no lo cargue todo
            option.value="";
            x.add(option);        
        }

        //ponemos a principio de lista los inactivos
        for(var i=0;i<players.length;i++){        
            
            //x = document.getElementById("fplayer");
            option = document.createElement("option");
            text=players[i].nombre+" - "+ players[i].categoria + "- "+ players[i].equipo + " - "+ players[i].temporada;            
            option.text = text;
            option.value=players[i].idplayer;
            //console.log(text +" activo="+players[i].activo);
            if (players[i].activo==1){
                //si es activo a principio de lista
                //option.style.color='#41cbfe';
                x.add(option);
            }else{
                option.style.color='#808080';
                listaInactivos.push(option);
            }
        }
        //insertamos en la select los inactivos
        for (var j=0;j<listaInactivos.length;j++){
            x.add(listaInactivos[j]);
        }

        if (players.length>1){
            x = document.getElementById("fplayer");
            option = document.createElement("option");
    
            option.text = "Todos/as"; //opción de que nos traiga todos lo partidos de todos los jugadores
            option.value="0";
            x.add(option);
        }        
    }else{
        //no hay players activos
        mostrarToast('no hay jugadores/as ...',3000);
    }
}

function printInformacion(arr, separador, all){
    //var arr = arr.split("#");
    var datosLinea="";
    if (arr && arr.length > 0){
        var tmpIdPlayer="";
        
        for (i = 0; i < arr.length; i++) {
            //console.log( arr[i]);
            tmpIdPlayer=arr[i].player;
            datosLinea = arr[i].registro.split(separador);
            //alert(datosLinea);
            agregarFila(datosLinea, i, all, arr[i].idpartido, arr[i].publico, arr[i].likes );
            //alert(datosLinea);
        }
        if(!all){
            agregarFilaEstadisticas(tmpIdPlayer);
        }
    }else{
        mostrarToast("no hay partidos registrados...",3000);
    }
}

function getPartidoSelected(lineselected, idpartido){
    //alert(lineselected);
    //console.log(idpartido);
    window.localStorage.playerselected=document.getElementById("fplayer").value;
    window.sessionStorage.detallepartido=lineselected;
    window.sessionStorage.detalleidpartido=idpartido;
    location.href='./detallepartido.html';
}
function gotoestadisticasgenerales(idplayer){
    window.localStorage.playerselected=document.getElementById("fplayer").value;
    window.sessionStorage.detallepartido=0; //informamos estas variables sólo para que el retorno haga una carga local
    window.sessionStorage.detalleidpartido=0; 
    window.location.href='./detalleestadisticasgenerales.html';
}

function agregarFilaEstadisticas(idplayer){
    var linea="<td>";
    linea+="<a href=\"javascript:gotoestadisticasgenerales('"+idplayer+"')\">";
    linea+="<table class='table_test'>";
    linea+="<tr><td style='text-align: center;'>'<font style='color:#41cbfe;'>Estadísticas generales</font></td></tr>";
    linea+="</table>";
    linea+="</a>";
    linea+="</td>";
    var row = document.getElementById("tablepartidos").insertRow(0);
    row.innerHTML = linea; 
}

function agregarFila(datosLines, id, all, idpartido, publicado, likes){
    //console.log(datosLines);
    var nombre=datosLines[1];
    var categoria=datosLines[2];
    var fecha=datosLines[3];
    var rival=datosLines[4];

    var tiros = getDatosTotalTirosIn(datosLines)+"/"+getDatosTotalTirosAll(datosLines);
    var puntos=getPuntos(datosLines);
    var asistencias=sumaDatos(46, 50, datosLines);
    var valoracion=getValoracion(datosLines);
    var puntuacionEquipo=datosLines[datosLines.length-2];
    var puntuacionRival=datosLines[datosLines.length-1];

 
    linea="<td>";
    //linea+="<a href=\"javascript:getPartidoSelected("+id+",'"+idpartido+"');\">";
    linea+="<table class='table_test'>";
    //linea+="<tr><td  colspan='8' width='91%'><font style='font-weight: bold;font-size:20px;color:#41cbfe;'>"+rival+"</font>";
    linea+="<tr><td  colspan='9'<font style='font-weight: bold;font-size:20px;color:#41cbfe;'>"+rival+"</font>";
    if(!(Number(puntuacionEquipo) == 0 && Number(puntuacionRival) ==0)){            
        linea+="&nbsp;<font style='font-size:18px;'>"+puntuacionEquipo+"-"+puntuacionRival+"</font>";        
    }        
    if (Number(puntuacionEquipo) > Number(puntuacionRival)){ //en caso que haya un resultado se muestra
        linea+="&nbsp;<img id='cr' class='imgIcono4' src='./images/win.png'>";
    }    
    //linea+="<span style='float:right;cursor:pointer'>";
    if (Number(likes) > 0){
        linea+="<font style='color:#41cbfe;font-size:14px;font-weight: bold;float:right;cursor:pointer'><a href=\"javascript:verlikes("+id+",'"+idpartido+"')\">"+likes+"<img id='cr' class='imgIcono4' style='vertical-align:bottom;float:right;cursor:pointer' src='./images/like-on.png'/></a></font>";
    }
    if (publicado==1){
        linea+="<img id='cr' class='imgIcono4' style='float:right;cursor:pointer' src='./images/publicado.png'>";
    }
    //if (likes > 0){
    //    linea+="<td width='9%'><span style='width:100%;text-align:right;color:#41cbfe;font-size:14px;font-weight: bold;'>"+likes+"<img id='cr' class='imgIcono4' style='vertical-align:bottom;' src='./images/like-on.png'/></span></td>";
    //}else{
    //    linea+="<td width='1%'>&nbsp</td>";
    //}
    //linea+="</span>";
    linea+="</td></tr>";
    linea+="</table>";
    linea+="<a href=\"javascript:getPartidoSelected("+id+",'"+idpartido+"');\">";
    linea+="<table class='table_test'>";
    if (all){
        //linea+="<tr><td colspan='9'><font style='font-size:16px;color:#FFFFFF'>"+nombre+" - "+categoria+"</font></td></tr>";
        linea+="<tr><td colspan='9'><font style='font-size:16px;color:#FFFFFF'>"+nombre+" - "+categoria+"</font></td></tr>";
    }
    
    //linea+="</td></tr>";
    //linea+="</table>";
    //linea+="<table class='table_test'>"
    linea+="<tr><td>"+fecha+"</td><td>tir</td><td style='font-weight: bold;font-size:14px;color: #FFFFFF;'>"+tiros+"</td>";
    linea+="<td>pts</td><td style='font-weight: bold;font-size:14px;color: #FFFFFF;'>"+puntos+"</td>";
    linea+="<td>asi</td><td style='font-weight: bold;font-size:14px;color: #FFFFFF;'>"+asistencias+"</td>";
    linea+="<td>val</td><td style='font-weight: bold;font-size:14px;color: #FFFFFF;'>"+valoracion+"</td></tr>";
    linea+="</table>";
    
    linea+="</a>";
    linea+="</td>";
    var row = document.getElementById("tablepartidos").insertRow(0);
    row.innerHTML = linea; 
    //console.log(puntuacionEquipo+"-"+puntuacionRival);
}
/*
function agregarFilaOld(datosLines, id){
    var nombre=datosLines[1];
    var fecha=datosLines[3].split("/");
    fecha = fecha[0]+"/"+fecha[1]+"/ "+fecha[2];
    var rival=datosLines[4]+" ("+datosLines[5]+")";

  
    var valoracion= getValoracionJugador(datosLines, null);
    var tiros = getDatosTotalTirosIn(datosLines)+"/"+getDatosTotalTirosAll(datosLines);
    var puntos=getPuntos(datosLines);
    var asistencias=sumaDatos(46, 50, datosLines);

    //<a href='javascript:getPartidoSelected("+id+")></a>";

    var lineatabla="";
    
    //lineatabla+="<td><a href='javascript:getPartidoSelected("+id+")'>"+nombre+"</a></td><td>"+fecha+"</td><td>"+rival+"</td>";
    
    lineatabla+=crearCelda(nombre,id)+crearCelda(fecha,id)+crearCelda(rival,id);
    lineatabla+="<td>"+tiros+"</td><td>"+puntos+"</td><td>"+asistencias+"</td><td>"+valoracion+"</td>"
       
    //lineatabla+=crearCelda(t1,id)+crearCelda(t2,id)+crearCelda(t3,id)+crearCelda(te,id)+crearCelda(puntos,id)+crearCelda(asistencias,id);

    //alert(lineatabla);
    var row = document.getElementById("tablaestadisticas").insertRow(1);
    row.innerHTML = lineatabla;   
}
*/
function verlikes(lineselected,idpartido){
    //dejamos estos datos para que luego nos haga la cargalocal
    window.localStorage.playerselected=document.getElementById("fplayer").value;
    window.sessionStorage.detallepartido=lineselected;
    window.sessionStorage.detalleidpartido=idpartido;
    
    //indicamos que venimos de Likes
    window.localStorage.veropcionfollowersplayer="L";
    window.localStorage.verLikesIdPartido=idpartido;
    location.href='./verfollowers.html';
}
function crearCelda(variable, id){
    return "<td><a href='javascript:getPartidoSelected("+id+")'>"+variable+"</a></td>";
}

function getValoracion(datosLines){
    var valor=0;

    valor+=getPuntos(datosLines); //puntos
    valor+=sumaDatos(46, 50, datosLines); //asistencias
    valor+=sumaDatos(54, 62, datosLines); //rebotes
    valor+=sumaDatos(50, 54, datosLines); //tapones 
    valor+=sumaDatos(66, 70, datosLines); //balones recuperados 
    valor+=sumaDatos(42, 46, datosLines); //faltas recibidas 
    valor+= getDatosTotalTirosIn(datosLines); //tiros acertados

    valor -=sumaDatos(62, 66, datosLines); //balones perdidos 
    valor -=sumaDatos(38, 42, datosLines); //faltas personales
    valor -=getDatosTotalTirosAll(datosLines); // tiros

    return valor;
}

function getPuntos(datosLines){
    var totalpuntos = 0;
    totalpuntos+=sumaDatos(6, 10, datosLines);
    totalpuntos+=sumaDatos(14, 18, datosLines)*2;
    totalpuntos+=sumaDatos(22, 26, datosLines)*3;
    totalpuntos+=sumaDatos(30, 34, datosLines)*2;
    return totalpuntos;
}

function getDatosTotalTirosIn(datosLines){
    var totalIn=0;
   

    totalIn=sumaDatos(6, 10, datosLines)+sumaDatos(14, 18, datosLines)+sumaDatos(22, 26, datosLines)+sumaDatos(30, 34, datosLines);
    

    return totalIn;
}

function getDatosTotalTirosAll(datosLines){
    
    var totalTry=0;
    
    totalTry=sumaDatos(10, 14, datosLines)+sumaDatos(18, 22, datosLines)+sumaDatos(26, 30, datosLines)+sumaDatos(34, 38, datosLines);

    return totalTry;
}


function sumaDatos(posDesde, posHasta, datosLines){
    var sumadatos=0;
    for (x = posDesde; x < posHasta; x++) {
        sumadatos+=Number(datosLines[x]);
    }
    return sumadatos;
}

