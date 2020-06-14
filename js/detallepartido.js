var playerdata;
var datosLineaFollowed;
var datosLinea
var publicado;

//charts
var enti=0,enta=0, t1i=0,t1a=0, t2i=0,t2a=0, t3i=0,t3a=0;
var asi=0,reb=0,fc=0,fp=0,tf=0,tc=0,per=0,rec=0;

function carga(){
    var arr;
    var lineselected;

    datosLinea="";
    var separador=";"
    playerdata=0;
    

    //console.log("window.sessionStorage.detallepartido ->"+window.sessionStorage.detallepartido);
    //console.log("window.sessionStorage.seguidosidpartido ->"+window.sessionStorage.seguidosidpartido);
    if (window.sessionStorage.detallepartido!=null){
        //venimos de estadisticasglobales
        arr = JSON.parse(window.localStorage.playerpartidos);
        lineselected = window.sessionStorage.detallepartido;

       

        datosLinea = arr[lineselected].registro.split(separador);
        playerdata = arr[lineselected].player;
        publicado  = arr[lineselected].publico;

        if (publicado==1){
            document.getElementById("myBtnPub").value="DESPUBLICAR"
        }else{
             //en caso de publicar el partido guardamos el formato adecuado para guardar en BD
            datosLineaFollowed=arr[lineselected].registro;
        }

    }else if(window.sessionStorage.seguidosidpartido!=null){
        //venimos de followedpartidos
        arr = JSON.parse(window.localStorage.seguidospartido);
        lineselected = window.sessionStorage.seguidosidpartido;
        
        datosLinea = arr[lineselected].registropartido.split(separador);
        playerdata = null;
        publicado = 0; //para seguidores esta variable no la necesitamos
        //ocultamos los botones de borrar y publicar
        document.getElementById("myBtnPub").style.display = "none";
        document.getElementById("myBtnFin").style.display = "none";
    }

    

    //console.log(arr);
    //cargaEstadisticasGlobales(arr,lineselected);
    cargarDatosPartido(datosLinea,playerdata);
    

}

function salir(){
    if (window.sessionStorage.detallepartido!=null){
        //venimos de estadisticasglobalesç
        //console.log("volvemos a estadisticasglobales");
        window.location.href="./estadisticasglobales.html";
    }else if(window.sessionStorage.seguidosidpartido!=null){
        //venimos de followed o index
        if (window.sessionStorage.followpartidosFromIndex){
            //si venimos de index
            //console.log("volvemos a index");
            window.sessionStorage.removeItem("followpartidosFromIndex"); //limpiamos la variable
            window.location.href="./index.html";
        }else{
            //console.log("volvemos a followed");
            window.location.href="./followedpartidos.html";
        }
        
    }
}


function cargarDatosPartido(datosLinea, playerdata){

    //document.getElementById("team").innerHTML=datosLinea[0];
    var player;
    var playerSt="";
    var categoriaSt="";
    
    playerSt= datosLinea[1]+" - "+datosLinea[0];
    categoriaSt=datosLinea[2];
    /*
    //no nos podemos fiar de los datos actuales del player
    //debemos tirar de los datos registrados en el partido
    if (playerdata!=null){
        player = getDatosPlayer(playerdata);
        playerSt += " - "+player.temporada;
        categoriaSt+= " ("+player.nivel+")";
    }
    */
    
    //console.log(player);
    document.getElementById("player").innerHTML=playerSt;
    document.getElementById("categoria").innerHTML=categoriaSt;
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
    
    //llamada al chart
    //enti=0,enta=0, t1i=0,t1a=0, t2i=0,t2a=0, t3i=0,t3a=0
    //asi=0,reb=0,fc=0,fp=0,tf=0,tc=0,per=0,rec=0;
    //google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart(asi,reb,fc,fp,tf,tc,per,rec));
   

    printarValoraciones(datosLinea);
    
    google.charts.setOnLoadCallback(drawAnnotations(enti,enta, t1i,t1a, t2i,t2a, t3i,t3a));
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

    //informamos las variables que después irán a los gráficos
    switch (tipoTiro) {
        case 't1': t1a=aciertos;t1i=intentos;
            break;
        case 't2':t2a=aciertos;t2i=intentos;
            break;
        case 't3':t3a=aciertos;t3i=intentos;
            break;
        case 'te':enta=aciertos;enti=intentos;
            //console.log("enta-"+enta+" enti-"+enti);
            break;
        default:
    }

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
    
    //actualizamos los valores globales de las graficas
    switch (accion) {
        case 'frea': fp=total;
            break;
        case 'frec': fc=total;
            break;
        case 'asi': asi=total;
            break;
        case 'tap': tf=total;
            break;
        case 'reo': reb=total;
            break;
        case 'bap': per=total;
            break;
        case 'bar': rec=total;
            break;
        case 'tapc': tc=total;
            break;
        
        default:
    }
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
    deleteMatchesFollowedByIdPartidoFB(idpartidodelete,null, false);
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

function publicarPartido(){
    //var arr = JSON.parse(window.localStorage.playerpartidos);
    
    var idpartido=window.sessionStorage.detalleidpartido;
    console.log("El valor de publicado="+publicado);
    if (publicado==1){        
         //hay que borrar la publicación
        //console.log("idplayer="+playerdata);
        //console.log("datosLinea="+datosLinea);    
        mostrarToast("borrando publicación...",3000);    
        console.log("despublicar idpartido="+idpartido);
        deleteMatchesFollowedByIdPartidoFB(idpartido, "./estadisticasglobales.html", true);
    }else{
       //hay que publicar
        mostrarToast("publicando el partido...",3000);
        console.log("publicar idpartido="+idpartido);
        //console.log("datosLineaFollowed="+datosLinea);
        processMatchFollowedByPlayerFB(playerdata,idpartido,datosLineaFollowed,"./estadisticasglobales.html", false);
    }
    
    
}
