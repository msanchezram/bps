function carga(){

    var arr = JSON.parse(window.localStorage.playerpartidos);
    var datosLinea="";
    var separador=";"
    var playerdata=0;
    
    if (arr && arr.length > 0){
        var lineselected = window.sessionStorage.detallepartido;
        //console.log(arr[lineselected]);
        //console.log(lineselected);
        datosLinea = arr[lineselected].registro.split(separador);  
        playerdata = arr[lineselected].player;
        //console.log(playerdata);
        cargarDatosPartido(datosLinea,playerdata);
        //alert(datosLinea);        
    }

}

function cargarDatosPartido(datosLinea, playerdata){

    //document.getElementById("team").innerHTML=datosLinea[0];
    var player = getDatosPlayer(playerdata);
    //console.log(player);
    document.getElementById("player").innerHTML=datosLinea[1]+" - "+datosLinea[0]+" - "+player.temporada;
    document.getElementById("categoria").innerHTML=datosLinea[2]+" ("+player.nivel+")";
    document.getElementById("fecha").innerHTML=datosLinea[3];
    document.getElementById("rival").innerHTML=datosLinea[4]+" ("+datosLinea[5]+")";
    //document.getElementById("complejidad").innerHTML=datosLinea[5];

    datosPartido(datosLinea);
}

function getDatosPlayer(playerdata){
    var players = window.localStorage.players;
    players= JSON.parse(players);

    for (var i=0;i<players.length;i++){
        //console.log(players[i].idplayer);
        if (players[i].idplayer==playerdata){
            return players[i];
        }
    }
}

function datosPartido(datosLinea){

    var totalpuntos1=printDatosPuntosPartido('t1',datosLinea,6,1);
    document.getElementById("t1-puntos").innerHTML=totalpuntos1; 
    var totalpuntos2=printDatosPuntosPartido('t2',datosLinea,14,2);
    document.getElementById("t2-puntos").innerHTML=totalpuntos2;
    var totalpuntos3=printDatosPuntosPartido('t3',datosLinea,22,3);
    document.getElementById("t3-puntos").innerHTML=totalpuntos3;
    var totalpuntose=printDatosPuntosPartido('te',datosLinea,30,2);
    document.getElementById("t3-puntos").innerHTML=totalpuntose;

    document.getElementById("puntos").innerHTML=totalpuntos1+totalpuntos2+totalpuntos3+totalpuntose;
    
    //faltas realizadas
    printarDatosAccionesPartido('frea',datosLinea,38);
    //faltas recibidas
    printarDatosAccionesPartido('frec',datosLinea,42);    
    //asistencias
    printarDatosAccionesPartido('asi',datosLinea,46);
    //tapones a favor
    printarDatosAccionesPartido('tap',datosLinea,50);
    //rebotes ofensivos
    printarDatosAccionesPartido('reo',datosLinea,54);
    //rebotes defensivos no se printan
    //printarDatosAccionesPartido('red',datosLinea,58);
    //balones perdidos
    printarDatosAccionesPartido('bap',datosLinea,62);
    //balones recuperados
    printarDatosAccionesPartido('bar',datosLinea,66);
    //tapones en contra
    printarDatosAccionesPartido('tapc',datosLinea,70);
    
    printarValoraciones(datosLinea);
}

function printDatosPuntosPartido(tipoTiro,datosLinea,posInicio,factormultiplicador){
    var label = tipoTiro+'-';
    var aciertos=0;
    var intentos=0;
    for (i=1;i<5;i++){
        aciertos+=Number(datosLinea[posInicio]);
        intentos+=Number(datosLinea[posInicio+4]);
        //printamos aciertos e intentos
        document.getElementById(label+i).innerHTML=datosLinea[posInicio]+"/"+datosLinea[posInicio+4];
        posInicio++;
    }
    document.getElementById(tipoTiro+"-total").innerHTML=aciertos+"/"+intentos;
    document.getElementById(tipoTiro+"-puntos").innerHTML=aciertos*factormultiplicador; 
    if (intentos==0)intentos=1;
    var porcentaje = aciertos*100/intentos;
    document.getElementById(tipoTiro+"-porcentaje").innerHTML=Math.round(porcentaje);
    
    //retornamos el total de puntos
    return aciertos*factormultiplicador;
}

function printarDatosAccionesPartido(accion,datosLinea,posInicio){
    var total=0;
    for(x=posInicio;x<posInicio+4;x++){
        total+=Number(datosLinea[x]);
        //console.log(accion+"-"+(x-posInicio+1)+"  "+total);
        document.getElementById(accion+"-"+(x-posInicio+1)).innerHTML=datosLinea[x];
    }
    document.getElementById(accion+"-total").innerHTML=total;
}

function printarValoraciones(datosLinea){

    var valorTotal=0;
    var valor=0;
    valor = getValoracion(1, datosLinea);
    valorTotal+=valor;
    document.getElementById("val-1").innerHTML=valor;
    valor = getValoracion(2, datosLinea);
    valorTotal+=valor;
    document.getElementById("val-2").innerHTML=valor;
    valor = getValoracion(3, datosLinea);
    valorTotal+=valor;
    document.getElementById("val-3").innerHTML=valor;
    valor = getValoracion(4, datosLinea);
    valorTotal+=valor;
    document.getElementById("val-4").innerHTML=valor;

    document.getElementById("val-total").innerHTML=valorTotal;
}

function getValoracion(periodo, datosLinea){

    var valor=0;
    var posInicio=5;
    posInicio+=periodo;
    valor=getTotalValoracionPosicion(datosLinea, posInicio);
    return valor;
}

function getTotalValoracionPosicion(datosLinea, posInicio){
// PTS + ASIS + REB + TAPF + BR + FR + T1C + T2C + T3C – BP – TAPC – FP – T1I – T2I – T3I
    var valor=0;
    valor+=Number(datosLinea[posInicio])*2; //tiros de 1 + puntos
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
    valor+=Number(datosLinea[posInicio]); //tapones
    posInicio+=4;
    valor+=Number(datosLinea[posInicio]); //rebotes of
    posInicio+=4;
    valor+=Number(datosLinea[posInicio]); //rebotes def
    posInicio+=4;
    valor-=Number(datosLinea[posInicio]); //balones perdidos
    posInicio+=4;
    valor+=Number(datosLinea[posInicio]); //balones recuperados

    return valor;
}

function deletePartido(){
    var idpartidodelete= window.sessionStorage.detalleidpartido;
    //console.log("borrar partido "+idpartidodelete);
    mostrarToast("borrando partido...",2000);
    
    deletePartidoFB(idpartidodelete);
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
