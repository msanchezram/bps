var playerdata;
var datosLineaFollowed;
var datosLinea
var publicado;
var separador=";"

//charts
var enti=0,enta=0, t1i=0,t1a=0, t2i=0,t2a=0, t3i=0,t3a=0;
var asi=0,reb=0,fc=0,fp=0,tf=0,tc=0,per=0,rec=0;

function carga(){

    var arrpartidos;
    var tipo;

    if(window.sessionStorage.seguidosidpartido!=null){ //si venimos de seguidores
        //lista de partidos del jugador
        tipo=2
        arrpartidos=JSON.parse(window.localStorage.seguidospartido);
        //console.log(arrpartidos[0]);
        putdatosplayer(arrpartidos[0].idplayer,tipo);
    }else{ //si no venimos de estadisticasglobales
        tipo=1;
        //lista de partidos del jugador
        arrpartidos=JSON.parse(window.localStorage.playerpartidos);
        putdatosplayer(arrpartidos[0].player,tipo);
    }
    
    //console.log(arrpartidos[0]);
  
    
    document.getElementById("numpartidos").innerHTML=arrpartidos.length;
    var datosLinea=generardatosglobales(arrpartidos, tipo);
    datosPartido(datosLinea,1,"");//cargamos los datos globales
    datosPartido(datosLinea,arrpartidos.length,"m-");//cargamos los valores medios por partido

  
}

function putdatosplayer(idplayer, tipo){
    console.log(idplayer);
    //var players = window.localStorage.players;
    var players;
    if (tipo==1){ //si venimos de estadisticasglobales
        players= JSON.parse(window.localStorage.players);
    }else{ // == 2 por tanto venimos de followedpartido
        players= JSON.parse(window.sessionStorage.followedplayers);
    }


    //players[i].nombre+" - "+ players[i].categoria + "- "+ players[i].equipo + " - "+ players[i].temporada;
    for(var i=0;i<players.length;i++){
        //console.log(players[i]);
        if(players[i].idplayer==idplayer){
            document.getElementById("player").innerHTML=players[i].nombre+" - "+players[i].equipo;
            document.getElementById("categoria").innerHTML=players[i].categoria;
        }
    }
}

function generardatosglobales(arrpartidos, tipo){
    var datoslineassumm;
    if (tipo==1){
        datoslineassumm=arrpartidos[0].registro.split(separador);
    }else{ //==2 venimos de followed partidos
        datoslineassumm=arrpartidos[0].registropartido.split(separador);
    }
    //registropartido
    //var datoslineassumm=arrpartidos[0].registro.split(separador);
    var datoslineas;
    for(var i=1;i<arrpartidos.length;i++){
        if (tipo==1){
            datoslineas=arrpartidos[i].registro.split(separador);
        }else{
            datoslineas=arrpartidos[i].registropartido.split(separador);
        }
        
        for (var j=5;j<datoslineas.length;j++){
            datoslineassumm[j]=Number(datoslineassumm[j])+Number(datoslineas[j]);
        }
    }
    return datoslineassumm;

}
function salir(){
   
    
    if (window.sessionStorage.detallepartido!=null){
        //venimos de estadisticasglobalesç
        window.location.href='./estadisticasglobales.html';
    }else if(window.sessionStorage.seguidosidpartido!=null){
        //console.log("volvemos a followed");
        window.location.href="./followedpartidos.html";        
    }
    
}


function datosPartido(datosLinea, partidosjugados,prefijo){

    var totalpuntos1=printDatosPuntosPartido(prefijo+'t1',datosLinea,6,1, partidosjugados);
    document.getElementById(prefijo+"t1-puntos").innerHTML=totalpuntos1; 
    var totalpuntos2=printDatosPuntosPartido(prefijo+'t2',datosLinea,14,2, partidosjugados);
    document.getElementById(prefijo+"t2-puntos").innerHTML=totalpuntos2;
    var totalpuntos3=printDatosPuntosPartido(prefijo+'t3',datosLinea,22,3, partidosjugados);
    document.getElementById(prefijo+"t3-puntos").innerHTML=totalpuntos3;
    var totalpuntose=printDatosPuntosPartido(prefijo+'te',datosLinea,30,2, partidosjugados);
    document.getElementById(prefijo+"t3-puntos").innerHTML=totalpuntose;

    var totalpuntos=totalpuntos1+totalpuntos2+totalpuntos3+totalpuntose;
    //if (totalpuntos-parseInt(totalpuntos)>0){
        //console.log(totalpuntos);
    //    totalpuntos=totalpuntos.toFixed(2);
        //console.log(totalpuntos);
    //}
    document.getElementById(prefijo+"puntos").innerHTML=getNumeroDecimal(totalpuntos,2);
    
    //faltas realizadas
    printarDatosAccionesPartido(prefijo+'frea',datosLinea,38,partidosjugados);
    //faltas recibidas
    printarDatosAccionesPartido(prefijo+'frec',datosLinea,42,partidosjugados);    
    //asistencias
    printarDatosAccionesPartido(prefijo+'asi',datosLinea,46,partidosjugados);
    //tapones a favor
    printarDatosAccionesPartido(prefijo+'tap',datosLinea,50,partidosjugados);
    //rebotes ofensivos
    printarDatosAccionesPartido(prefijo+'reo',datosLinea,54,partidosjugados);
    //rebotes defensivos no se printan
    //printarDatosAccionesPartido('red',datosLinea,58);
    //balones perdidos
    printarDatosAccionesPartido(prefijo+'bap',datosLinea,62,partidosjugados);
    //balones recuperados
    printarDatosAccionesPartido(prefijo+'bar',datosLinea,66,partidosjugados);
    //tapones en contra
    printarDatosAccionesPartido(prefijo+'tapc',datosLinea,70,partidosjugados);
    
    //llamada al chart
    //enti=0,enta=0, t1i=0,t1a=0, t2i=0,t2a=0, t3i=0,t3a=0
    //asi=0,reb=0,fc=0,fp=0,tf=0,tc=0,per=0,rec=0;
    //google.charts.load('current', {'packages':['corechart']});
    
    google.charts.setOnLoadCallback(drawChart(asi,reb,fc,fp,tf,tc,per,rec));
   
    //No se printan valoraciones globales
    printarValoraciones(datosLinea, partidosjugados);
    
    google.charts.setOnLoadCallback(drawAnnotations(enti,enta, t1i,t1a, t2i,t2a, t3i,t3a));

    
    //google.charts.setOnLoadCallback(drawChartLine());
}

function printDatosPuntosPartido(tipoTiro,datosLinea,posInicio,factormultiplicador, partidosjugados){
    var label = tipoTiro+'-';
    var aciertos=0;
    var intentos=0;
    var valoraciertos=0;
    var valorintentos=0;
    var precision=1;
    for (i=1;i<5;i++){
        valoraciertos=Number(datosLinea[posInicio])/partidosjugados;
        valorintentos=Number(datosLinea[posInicio+4])/partidosjugados;

        aciertos+= valoraciertos;//Number(datosLinea[posInicio]);
        intentos+=valorintentos;//Number(datosLinea[posInicio+4]);
        //printamos aciertos e intentos

        //if (valoraciertos-parseInt(valoraciertos)>0){
        //    valoraciertos=valoraciertos.toPrecision(1);
        //}
        //if (valorintentos-parseInt(valorintentos)>0){
        //    valorintentos=valorintentos.toPrecision(1);
        //}
        
        document.getElementById(label+i).innerHTML=getNumeroDecimal(valoraciertos,precision)+"/"+getNumeroDecimal(valorintentos,precision);
        posInicio++;
    }
    if (partidosjugados>1){
        precision=2;
    }
    //console.log(intentos);
    //aciertos=getNumeroDecimal(aciertos);
    //if (aciertos-parseInt(aciertos)>0){
    //    aciertos=aciertos.toPrecision(precision);
    //}
    //if (intentos-parseInt(intentos)>0){
    //    intentos=intentos.toPrecision(precision);
    //}
    document.getElementById(tipoTiro+"-total").innerHTML=getNumeroDecimal(aciertos,precision)+"/"+getNumeroDecimal(intentos,precision);
    document.getElementById(tipoTiro+"-puntos").innerHTML=getNumeroDecimal(aciertos,precision)*factormultiplicador; 

    if (partidosjugados==1){ //este grafico es solo para valores globales
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
    }
    if (intentos==0)intentos=1;
    var porcentaje = aciertos*100/intentos;
    document.getElementById(tipoTiro+"-porcentaje").innerHTML=Math.round(porcentaje);
    
    //retornamos el total de puntos
    return getNumeroDecimal(aciertos,precision)*factormultiplicador;
}

function printarDatosAccionesPartido(accion,datosLinea,posInicio, partidosjugados){
    var total=0;
    var valoraccion=0;
    var precision=1;
    for(x=posInicio;x<posInicio+4;x++){
        valoraccion=Number(datosLinea[x])/partidosjugados;
        total+=valoraccion; //Number(datosLinea[x]);
        //console.log(accion+"-"+(x-posInicio+1)+"  "+total);
        document.getElementById(accion+"-"+(x-posInicio+1)).innerHTML=valoraccion.toPrecision(precision);
    }
    if (partidosjugados>1){
        precision=2;
    }
    //evitamos notaciones científicas (e)
    //if (total-parseInt(total)>0){
    //    total=total.toFixed(precision);
    //}

    document.getElementById(accion+"-total").innerHTML=getNumeroDecimal(total,precision);
    
    if (partidosjugados==1){
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
}

function printarValoraciones(datosLinea, partidosjugados){

    var valorTotal=0;
    var valor=0;
    valor = getValoracion(1, datosLinea)/partidosjugados;
    valorTotal+=valor;
    document.getElementById("val-1").innerHTML=getNumeroDecimal(valor,2);
    valor = getValoracion(2, datosLinea)/partidosjugados;
    valorTotal+=valor;
    document.getElementById("val-2").innerHTML=getNumeroDecimal(valor,2);
    valor = getValoracion(3, datosLinea)/partidosjugados;
    valorTotal+=valor;
    document.getElementById("val-3").innerHTML=getNumeroDecimal(valor,2);
    valor = getValoracion(4, datosLinea)/partidosjugados;
    valorTotal+=valor;
    document.getElementById("val-4").innerHTML=getNumeroDecimal(valor,2);

    document.getElementById("val-total").innerHTML=getNumeroDecimal(valorTotal,2);
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
