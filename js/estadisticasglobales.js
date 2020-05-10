function carga(){
    //cargalocal()
    if (window.sessionStorage.detallepartido!=null){        
        //miramos si venimos de detalle partido para que restaure la información que ya había
        var partidoselected = window.sessionStorage.detallepartido;
        window.sessionStorage.removeItem("detallepartido");
         //si no hacemos la carga local
         cargalocal(partidoselected);
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
function cargalocal(playerselected){

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
           
    for(var i=document.getElementById("tablepartidos").rows.length;i>0;i--) {
        document.getElementById("tablepartidos").deleteRow(i-1);
    }
    //console.log(idplayer);
    if (idplayer == "0"){
        //cargar todos los partidos
        var email = window.localStorage.mail;
        cargaPartidosPorAtributo("mail",email, true);
    }else if (idplayer.length > 0){
        //cargamos los partidos del jugador seleccionado
        cargaPartidosPorAtributo("player",idplayer, false);
    }
}

function cargaselectplayer(players){

    var text="";
    //var count=0;

    if (players.length>0){
        var x = document.getElementById("fplayer");
        var option = document.createElement("option");
        
        if (players.length>1){
            option.text = "Selecciona jugador/a"; //primero blanco para que no lo cargue todo
            option.value="";
            x.add(option);        
        }

        for(i=0;i<players.length;i++){        
            //sólo podemos crear partido con los players activos
            x = document.getElementById("fplayer");
            option = document.createElement("option");
            text=players[i].nombre+" - "+ players[i].categoria + "- "+ players[i].equipo + " - "+ players[i].temporada;            
            option.text = text;
            option.value=players[i].idplayer;
            x.add(option);
            //count++;               
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
        
        for (i = 0; i < arr.length; i++) {
            //console.log( arr[i]);
            datosLinea = arr[i].registro.split(separador);
            //alert(datosLinea);
            agregarFila(datosLinea, i, all, datosLinea = arr[i].idpartido);
            //alert(datosLinea);
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


function agregarFila(datosLines, id, all, idpartido){
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
    linea+="<a href=\"javascript:getPartidoSelected("+id+",'"+idpartido+"');\">";
    linea+="<table class='table_test'>";
    linea+="<tr><td  colspan='9'><font style='font-weight: bold;font-size:20px;color:#41cbfe;'>"+rival+"</font>";
    if(!(puntuacionEquipo == 0 && puntuacionRival ==0)){            
        linea+="&nbsp;<font style='font-size:18px;'>"+puntuacionEquipo+"-"+puntuacionRival+"</font>";        
    }
    if (all){
        linea+="&nbsp;<font style='font-size:14px;color:#FFFFFF'>("+nombre+" - "+categoria+")</font>";
    }
    if (puntuacionEquipo > puntuacionRival){ //en caso que haya un resultado se muestra
        linea+="&nbsp;<img id='cr' class='imgIcono4' src='./images/win.png'>";
    }
    
    linea+="</td></tr>";
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

