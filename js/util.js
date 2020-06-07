function mostrarToast(mensaje,tiempo){
    var x = document.getElementById("snackbar");
    x.innerHTML=mensaje;
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, tiempo);
}

//
function getValoracionJugador(datosLinea,periodo){
    var valor = 0;

    switch (periodo) {
        case 1:
            valor = getValoracion(periodo, datosLinea);
            break;
        case 2:
            valor = getValoracion(periodo, datosLinea);
            break;
        case 3:
            valor = getValoracion(periodo, datosLinea);
            break;
        case 4:
            valor = getValoracion(periodo, datosLinea);
            break;
        default: //valoracion total
        valor = getValoracion(1, datosLinea);
        valor += getValoracion(2, datosLinea);
        valor += getValoracion(3, datosLinea);
        valor += getValoracion(4, datosLinea);
            break;
    }
    return valor;
}

function getValoracion(periodo, datosLinea){
    
    var posInicio=5;
    posInicio+=periodo;   
    // PTS + ASIS + REB + TAPF + BR + FR + T1C + T2C + T3C – BP – TAPC – FP – T1I – T2I – T3I
    var valor=0;
    valor+=Number(datosLinea[posInicio])*2; //tiros de 1 + puntos
    //console.log(datosLinea);    
    posInicio+=4;
    valor-=Number(datosLinea[posInicio]); //tiros de 1 intentadas
    posInicio+=4;
    valor+=Number(datosLinea[posInicio])*2+Number(datosLinea[posInicio]); //tiros de 2 + puntos
    posInicio+=4;
    valor-=Number(datosLinea[posInicio]); //tiros de 2 intentadas
    posInicio+=4;
    valor+=Number(datosLinea[posInicio])*3+Number(datosLinea[posInicio]); //tiros de 3 + puntos
    posInicio+=4;
    valor-=Number(datosLinea[posInicio]); //tiros de 3 intentadas
    posInicio+=4;
    valor+=Number(datosLinea[posInicio])*2+Number(datosLinea[posInicio]); //tiros de entradas + puntos
    posInicio+=4;
    valor-=Number(datosLinea[posInicio]); //tiros de entradas intentadas
    posInicio+=4;
    valor-=Number(datosLinea[posInicio]); //faltas realizadas
    posInicio+=4;
    valor+=Number(datosLinea[posInicio]); //faltas recibidas
    posInicio+=4;
    valor+=Number(datosLinea[posInicio]); //asistencias
    posInicio+=4;
    valor+=Number(datosLinea[posInicio]); //tapones a favor
    posInicio+=4;
    valor+=Number(datosLinea[posInicio]); //rebotes of
    posInicio+=4;
    valor+=Number(datosLinea[posInicio]); //rebotes def
    posInicio+=4;
    valor-=Number(datosLinea[posInicio]); //balones perdidos
    posInicio+=4;
    valor+=Number(datosLinea[posInicio]); //balones recuperados
    
    posInicio+=4;
    valor-=Number(datosLinea[posInicio]); //tapones en contra
    //console.log("periodo "+ periodo+" - datosLinea["+posInicio+"] "+datosLinea[posInicio]+" - valor "+valor);
    return valor;
}

function sleep (miliseconds) {
    setTimeout(function(){ console.log("fin sleep");},miliseconds);
}


function getPuntosUtil(datosLines){
    var totalpuntos = 0;
    totalpuntos+=sumaDatosUtil(6, 10, datosLines);
    totalpuntos+=sumaDatosUtil(14, 18, datosLines)*2;
    totalpuntos+=sumaDatosUtil(22, 26, datosLines)*3;
    totalpuntos+=sumaDatosUtil(30, 34, datosLines)*2;
    return totalpuntos;
}
function sumaDatosUtil(posDesde, posHasta, datosLines){
    var sumadatos=0;
    for (x = posDesde; x < posHasta; x++) {
        sumadatos+=Number(datosLines[x]);
    }
    return sumadatos;
}
function getValoracionUtil(datosLines){
    var valor=0;

    valor+=getPuntosUtil(datosLines); //puntos
    valor+=sumaDatosUtil(46, 50, datosLines); //asistencias
    valor+=sumaDatosUtil(54, 62, datosLines); //rebotes
    valor+=sumaDatosUtil(50, 54, datosLines); //tapones 
    valor+=sumaDatosUtil(66, 70, datosLines); //balones recuperados 
    valor+=sumaDatosUtil(42, 46, datosLines); //faltas recibidas 
    valor+= getDatosTotalTirosInUtil(datosLines); //tiros acertados

    valor -=sumaDatosUtil(62, 66, datosLines); //balones perdidos 
    valor -=sumaDatosUtil(38, 42, datosLines); //faltas personales
    valor -=getDatosTotalTirosAllUtil(datosLines); // tiros

    return valor;
}
function getDatosTotalTirosInUtil(datosLines){
    var totalIn=0;
    totalIn=sumaDatosUtil(6, 10, datosLines)+sumaDatosUtil(14, 18, datosLines)+sumaDatosUtil(22, 26, datosLines)+sumaDatosUtil(30, 34, datosLines);
    return totalIn;
}

function getDatosTotalTirosAllUtil(datosLines){
    
    var totalTry=0;
    totalTry=sumaDatosUtil(10, 14, datosLines)+sumaDatosUtil(18, 22, datosLines)+sumaDatosUtil(26, 30, datosLines)+sumaDatosUtil(34, 38, datosLines);
    return totalTry;
}

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panelacordeon = this.nextElementSibling;
    if (panelacordeon.style.display === "block") {
        panelacordeon.style.display = "none";
    } else {
        panelacordeon.style.display = "block";
    }
  });
}

//metodo que muestra la lista de players de las paginas
//followers.html y searchfollowers.html
//variable unfollow indica si debemos mostrar el icono de dejar de seguir
function cargarTablaPlayers(players, icon, iconMethod){
    var obj;
    var linea="";
    var estado="";
    for (var i=0;i<players.length;i++){
        //mostrarToast(players[i].nombre, 1000);
        obj=players[i];
        /*
        if (obj.activo==1){
            estado="activo";
        }else{
            estado="inactivo";
        }
        */
        //console.log(obj.nombre);  <img class="imgIcono2" style="float:right;cursor:pointer" src="./images/menu.png">
        linea="<td>";
        //linea+="<a href='javascript:selectedplayer("+i+");'>";
        if (icon!=null && icon.length>0){ //si tenemos icono informado los mostramos
            linea+="<table class='table_test'>";
            linea+="<tr><td><font style='font-weight: bold;font-size:24px;color: rgb(65, 203, 254)'>"+obj.nombre+"</font><img class='imgIcono2' onclick='"+iconMethod+"("+i+")' style='float:right;cursor:pointer' src='./images/"+icon+"'></td></tr>";
            linea+="</table>";
            linea+="<a href='javascript:selectedplayer("+i+");'>";
            linea+="<table class='table_test'>";
        }else{
            linea+="<a href='javascript:selectedplayer("+i+");'>";
            linea+="<table class='table_test'>";
            linea+="<tr><td><font style='font-weight: bold;font-size:24px;color: rgb(65, 203, 254)'>"+obj.nombre+"</font></td></tr>";
        }
        
        
        linea+="<tr><td><font style='font-size:14px;color: #FFFFFF'>"+obj.equipo+" "+obj.temporada+"</font></td></tr>";
        linea+="<tr><td><font style='font-size:14px;'>"+obj.categoria+"</font></td></tr>";//<font style='font-size:12px;'> ("+estado+")</font>";
        linea+="</table>";
        linea+="</a>";
        linea+="</td>";
        //console.log(linea);
        var row = document.getElementById("tablefollowedplayers").insertRow(0);
        row.innerHTML = linea;  
    }
}

function limpiarTablaResultados(nombreTabla){

    for(var i=document.getElementById(nombreTabla).rows.length;i>0;i--) {
        document.getElementById(nombreTabla).deleteRow(i-1);
    }
}

function cerrarModal(){
    modal.style.display = "none";
}