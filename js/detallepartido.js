function carga(){

    var arr = localStorage.estadisticasglobales.split("#");
    var datosLinea="";
    
    if (arr && arr.length > 0){
        var lineselected = window.sessionStorage.detallepartido;
        datosLinea = arr[lineselected].split(";");
        cargarDatosPartido(datosLinea);
        //alert(datosLinea);
    }

}

function cargarDatosPartido(datosLinea){

    document.getElementById("team").innerHTML=datosLinea[0];
    document.getElementById("nombre").innerHTML=datosLinea[1];
    document.getElementById("categoria").innerHTML=datosLinea[2];
    document.getElementById("fecha").innerHTML=datosLinea[3];
    document.getElementById("rival").innerHTML=datosLinea[4];
    document.getElementById("complejidad").innerHTML=datosLinea[5];

    datosPartido(datosLinea);
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
    //tapones
    printarDatosAccionesPartido('tap',datosLinea,50);
    //rebotes ofensivos
    printarDatosAccionesPartido('reo',datosLinea,54);
    //rebotes defensivos
    printarDatosAccionesPartido('red',datosLinea,58);
    //balones perdidos
    printarDatosAccionesPartido('bap',datosLinea,62);
    //balones recuperados
    printarDatosAccionesPartido('bar',datosLinea,66);
    
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
        //alert(accion+"-"+(x-posInicio+1)+"  "+total);
        document.getElementById(accion+"-"+(x-posInicio+1)).innerHTML=datosLinea[x];
    }
    document.getElementById(accion+"-total").innerHTML=total;
}
    
