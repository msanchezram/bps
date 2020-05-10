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


