var valoracion=0;
var val1=0;
var val2=0;
var val3=0;
var val4=0;

var myElement = document.getElementById('mytouch');

// create a simple instance
// by default, it only adds horizontal recognizers
var mc = new Hammer(mytouch);

// listen to events...
mc.on("panleft panright tap press", function(ev) {
    //myElement.textContent = ev.type +" gesture detected.";
    //alert(ev.type);
    if(ev.type=="panright"){
      //window.parent.cambiarlink(2);
      //window.parent.$('#atb').click();
      window.sessionStorage.setItem("pantalla",3);
      top.location.href = 'plantillapartido.html';
    }
});

function carga(){
    //cambiar datos del jugador/a
    //alert("carga");
    var totalPuntos=0;

    //var datosplayer=window.sessionStorage.nombre+" - "+ window.sessionStorage.categoria + "- "+ window.sessionStorage.team;
    var datosplayer=window.sessionStorage.nombre+" - "+ window.sessionStorage.team;
    document.getElementById("player").innerHTML = datosplayer;
    document.getElementById("categoria").innerHTML = window.sessionStorage.categoria;
    //document.getElementById("team").innerHTML=window.sessionStorage.team;
    //document.getElementById("nombre").innerHTML=window.sessionStorage.nombre;
    //document.getElementById("categoria").innerHTML=window.sessionStorage.categoria;    
    document.getElementById("rival").innerHTML=window.sessionStorage.rival+ " ("+window.sessionStorage.complejidad+")";
    //document.getElementById("complejidad").innerHTML=window.sessionStorage.complejidad;
    document.getElementById("fecha").innerHTML=window.sessionStorage.fecha;
    //printamos datos de los tiros
    
    printDatosTiros();

    var total=0;
    //faltas 
    document.getElementById("frea-1").innerHTML=getDatosPorPeriodo(1,"frea");
    val1-=getDatosPorPeriodo(1,"frea");
    document.getElementById("frea-2").innerHTML=getDatosPorPeriodo(2,"frea");
    val2-=getDatosPorPeriodo(2,"frea");
    document.getElementById("frea-3").innerHTML=getDatosPorPeriodo(3,"frea");
    val3-=getDatosPorPeriodo(3,"frea");
    document.getElementById("frea-4").innerHTML=getDatosPorPeriodo(4,"frea");
    val4-=getDatosPorPeriodo(4,"frea");
    total=getDatosPorPeriodo(1,"frea")+getDatosPorPeriodo(2,"frea")+getDatosPorPeriodo(3,"frea")+getDatosPorPeriodo(4,"frea");
    document.getElementById("frea-total").innerHTML=total;
    valoracion-=total//faltas realizadas 

    document.getElementById("frec-1").innerHTML=getDatosPorPeriodo(1,"frec");
    val1+=getDatosPorPeriodo(1,"frec");
    document.getElementById("frec-2").innerHTML=getDatosPorPeriodo(2,"frec");
    val2+=getDatosPorPeriodo(2,"frec");
    document.getElementById("frec-3").innerHTML=getDatosPorPeriodo(3,"frec");
    val3+=getDatosPorPeriodo(3,"frec");
    document.getElementById("frec-4").innerHTML=getDatosPorPeriodo(4,"frec");
    val4+=getDatosPorPeriodo(4,"frec");
    total=getDatosPorPeriodo(1,"frec")+getDatosPorPeriodo(2,"frec")+getDatosPorPeriodo(3,"frec")+getDatosPorPeriodo(4,"frec");
    document.getElementById("frec-total").innerHTML=total;
    valoracion+=total//faltas recibidas 

    //asistencias
    document.getElementById("asi-1").innerHTML=getDatosPorPeriodo(1,"asi");
    val1+=getDatosPorPeriodo(1,"asi");
    document.getElementById("asi-2").innerHTML=getDatosPorPeriodo(2,"asi");
    val2+=getDatosPorPeriodo(2,"asi");
    document.getElementById("asi-3").innerHTML=getDatosPorPeriodo(3,"asi");
    val3+=getDatosPorPeriodo(3,"asi");
    document.getElementById("asi-4").innerHTML=getDatosPorPeriodo(4,"asi");
    val4+=getDatosPorPeriodo(4,"asi");
    total=getDatosPorPeriodo(1,"asi")+getDatosPorPeriodo(2,"asi")+getDatosPorPeriodo(3,"asi")+getDatosPorPeriodo(4,"asi");
    document.getElementById("asi-total").innerHTML=total;
    valoracion+=total//asistencias

    //tapones
    document.getElementById("tap-1").innerHTML=getDatosPorPeriodo(1,"tap");
    val1+=getDatosPorPeriodo(1,"tap");
    document.getElementById("tap-2").innerHTML=getDatosPorPeriodo(2,"tap");
    val2+=getDatosPorPeriodo(2,"tap");
    document.getElementById("tap-3").innerHTML=getDatosPorPeriodo(3,"tap");
    val3+=getDatosPorPeriodo(3,"tap");
    document.getElementById("tap-4").innerHTML=getDatosPorPeriodo(4,"tap");
    val4+=getDatosPorPeriodo(4,"tap");
    total=getDatosPorPeriodo(1,"tap")+getDatosPorPeriodo(2,"tap")+getDatosPorPeriodo(3,"tap")+getDatosPorPeriodo(4,"tap");
    document.getElementById("tap-total").innerHTML=total;
    valoracion+=total//tapones realizados 

    //rebotes
    document.getElementById("reo-1").innerHTML=getDatosPorPeriodo(1,"reo");
    val1+=getDatosPorPeriodo(1,"reo");
    document.getElementById("reo-2").innerHTML=getDatosPorPeriodo(2,"reo");
    val2+=getDatosPorPeriodo(2,"reo");
    document.getElementById("reo-3").innerHTML=getDatosPorPeriodo(3,"reo");
    val3+=getDatosPorPeriodo(3,"reo");
    document.getElementById("reo-4").innerHTML=getDatosPorPeriodo(4,"reo");
    val4+=getDatosPorPeriodo(4,"reo");
    total=getDatosPorPeriodo(1,"reo")+getDatosPorPeriodo(2,"reo")+getDatosPorPeriodo(3,"reo")+getDatosPorPeriodo(4,"reo");
    document.getElementById("reo-total").innerHTML=total;
    valoracion+=total//rebotes

    /*
    document.getElementById("red-1").innerHTML=getDatosPorPeriodo(1,"red");
    val1+=getDatosPorPeriodo(1,"red");
    document.getElementById("red-2").innerHTML=getDatosPorPeriodo(2,"red");
    val2+=getDatosPorPeriodo(2,"red");
    document.getElementById("red-3").innerHTML=getDatosPorPeriodo(3,"red");
    val3+=getDatosPorPeriodo(3,"red");
    document.getElementById("red-4").innerHTML=getDatosPorPeriodo(4,"red");
    val4+=getDatosPorPeriodo(4,"red");
    total=getDatosPorPeriodo(1,"red")+getDatosPorPeriodo(2,"red")+getDatosPorPeriodo(3,"red")+getDatosPorPeriodo(4,"red");
    document.getElementById("red-total").innerHTML=total;
    valoracion+=total//rebotes
    */

    //balones recuperados y perdidos
    document.getElementById("bap-1").innerHTML=getDatosPorPeriodo(1,"bap");
    val1-=getDatosPorPeriodo(1,"bap");
    document.getElementById("bap-2").innerHTML=getDatosPorPeriodo(2,"bap");
    val2-=getDatosPorPeriodo(2,"bap");
    document.getElementById("bap-3").innerHTML=getDatosPorPeriodo(3,"bap");
    val3-=getDatosPorPeriodo(3,"bap");
    document.getElementById("bap-4").innerHTML=getDatosPorPeriodo(4,"bap");
    val4-=getDatosPorPeriodo(4,"bap");
    total=getDatosPorPeriodo(1,"bap")+getDatosPorPeriodo(2,"bap")+getDatosPorPeriodo(3,"bap")+getDatosPorPeriodo(4,"bap");
    document.getElementById("bap-total").innerHTML=total;
    valoracion-=total//balones perdidos

    document.getElementById("bar-1").innerHTML=getDatosPorPeriodo(1,"bar");
    val1+=getDatosPorPeriodo(1,"bar");
    document.getElementById("bar-2").innerHTML=getDatosPorPeriodo(2,"bar");
    val2+=getDatosPorPeriodo(2,"bar");
    document.getElementById("bar-3").innerHTML=getDatosPorPeriodo(3,"bar");
    val3+=getDatosPorPeriodo(3,"bar");
    document.getElementById("bar-4").innerHTML=getDatosPorPeriodo(4,"bar");
    val4+=getDatosPorPeriodo(4,"bar");
    total=getDatosPorPeriodo(1,"bar")+getDatosPorPeriodo(2,"bar")+getDatosPorPeriodo(3,"bar")+getDatosPorPeriodo(4,"bar");
    document.getElementById("bar-total").innerHTML=total;
    valoracion+=total//balones recuperados

    document.getElementById("tapc-1").innerHTML=getDatosPorPeriodo(1,"tapc");
    //console.log(val1);
    val1-=getDatosPorPeriodo(1,"tapc");
    document.getElementById("tapc-2").innerHTML=getDatosPorPeriodo(2,"tapc");
    val2-=getDatosPorPeriodo(2,"tapc");
    //console.log(val2);
    document.getElementById("tapc-3").innerHTML=getDatosPorPeriodo(3,"tapc");
    val3-=getDatosPorPeriodo(3,"tapc");
    //console.log(val3);
    document.getElementById("tapc-4").innerHTML=getDatosPorPeriodo(4,"tapc");
    val4-=getDatosPorPeriodo(4,"tapc");
    //console.log(val4);
    total=getDatosPorPeriodo(1,"tapc")+getDatosPorPeriodo(2,"tapc")+getDatosPorPeriodo(3,"tapc")+getDatosPorPeriodo(4,"tapc");
    document.getElementById("tapc-total").innerHTML=total;
    //console.log(total);
    valoracion-=total//tapones en contra

    document.getElementById("val-1").innerHTML=val1;
    document.getElementById("val-2").innerHTML=val2;
    document.getElementById("val-3").innerHTML=val3;
    document.getElementById("val-4").innerHTML=val4;
    document.getElementById("val-total").innerHTML=valoracion;
}

function getDatosPorPeriodo(periodo,base){
    var texto = "";
    //texto = sessionStorage.getItem("t"+tipoTiro+"inp"+periodo);
    if (!sessionStorage.getItem(base+"p"+periodo)){
        texto=0
    }else{
        texto=sessionStorage.getItem(base+"p"+periodo);
    }
    
    //alert(texto);
    return Number(texto);
}

function printDatosTiros(){
//datos de puntos del partido



    //tiros 1
    document.getElementById("t1-1").innerHTML=getDatosAciertosPorPeriodo(1,1)+"/"+getDatosIntentosPorPeriodo(1,1);
    val1+=getDatosAciertosPorPeriodo(1,1)-getDatosIntentosPorPeriodo(1,1); //valoracion por periodo
    document.getElementById("t1-2").innerHTML=getDatosAciertosPorPeriodo(2,1)+"/"+getDatosIntentosPorPeriodo(2,1);
    val2+=getDatosAciertosPorPeriodo(2,1)-getDatosIntentosPorPeriodo(2,1); //valoracion por periodo    
    document.getElementById("t1-3").innerHTML=getDatosAciertosPorPeriodo(3,1)+"/"+getDatosIntentosPorPeriodo(3,1);
    val3+=getDatosAciertosPorPeriodo(3,1)-getDatosIntentosPorPeriodo(3,1); //valoracion por periodo
    document.getElementById("t1-4").innerHTML=getDatosAciertosPorPeriodo(4,1)+"/"+getDatosIntentosPorPeriodo(4,1);
    val4+=getDatosAciertosPorPeriodo(4,1)-getDatosIntentosPorPeriodo(4,1); //valoracion por periodo
    var totalIn = getDatosAciertosPorPeriodo(1,1)+getDatosAciertosPorPeriodo(2,1)+getDatosAciertosPorPeriodo(3,1)+getDatosAciertosPorPeriodo(4,1);    
    var totalTry= getDatosIntentosPorPeriodo(1,1)+getDatosIntentosPorPeriodo(2,1)+getDatosIntentosPorPeriodo(3,1)+getDatosIntentosPorPeriodo(4,1);
    document.getElementById("t1-total").innerHTML=totalIn+"/"+totalTry;
    document.getElementById("t1-puntos").innerHTML=totalIn;
    valoracion+=totalIn-totalTry;//aciertos - intentos  
    if (totalTry==0)totalTry=1; //evitar dividir por 0
    var porcentaje = totalIn*100/totalTry;
    document.getElementById("t1-porcentaje").innerHTML=Math.round(porcentaje);
    totalPuntos=totalIn;
    //console.log("val1 "+val1);
    //console.log("val2 "+val2);
    //console.log("val3 "+val3);
    //console.log("val4 "+val4);
    //alert(totalPuntos);
    //tiros 2
    document.getElementById("t2-1").innerHTML=getDatosAciertosPorPeriodo(1,2)+"/"+getDatosIntentosPorPeriodo(1,2);
    val1+=(getDatosAciertosPorPeriodo(1,2)*2)+getDatosAciertosPorPeriodo(1,2)-getDatosIntentosPorPeriodo(1,2); //valoracion por periodo
    document.getElementById("t2-2").innerHTML=getDatosAciertosPorPeriodo(2,2)+"/"+getDatosIntentosPorPeriodo(2,2);
    val2+=(getDatosAciertosPorPeriodo(2,2)*2)+getDatosAciertosPorPeriodo(2,2)-getDatosIntentosPorPeriodo(2,2); //valoracion por periodo
    document.getElementById("t2-3").innerHTML=getDatosAciertosPorPeriodo(3,2)+"/"+getDatosIntentosPorPeriodo(3,2);
    val3+=(getDatosAciertosPorPeriodo(3,2)*2)+getDatosAciertosPorPeriodo(3,2)-getDatosIntentosPorPeriodo(3,2); //valoracion por periodo
    document.getElementById("t2-4").innerHTML=getDatosAciertosPorPeriodo(4,2)+"/"+getDatosIntentosPorPeriodo(4,2);
    val4+=(getDatosAciertosPorPeriodo(4,2)*2)+getDatosAciertosPorPeriodo(4,2)-getDatosIntentosPorPeriodo(4,2); //valoracion por periodo
    var totalIn = getDatosAciertosPorPeriodo(1,2)+getDatosAciertosPorPeriodo(2,2)+getDatosAciertosPorPeriodo(3,2)+getDatosAciertosPorPeriodo(4,2);    
    var totalTry= getDatosIntentosPorPeriodo(1,2)+getDatosIntentosPorPeriodo(2,2)+getDatosIntentosPorPeriodo(3,2)+getDatosIntentosPorPeriodo(4,2);
    document.getElementById("t2-total").innerHTML=totalIn+"/"+totalTry;
    document.getElementById("t2-puntos").innerHTML=totalIn*2; 
    valoracion+=totalIn-totalTry;//aciertos - intentos 
    if (totalTry==0)totalTry=1; //evitar dividir por 0
    var porcentaje = totalIn*100/totalTry;
    document.getElementById("t2-porcentaje").innerHTML=Math.round(porcentaje);
    totalPuntos+=totalIn*2;
    
    //alert(totalPuntos);
    //tiros 3
    document.getElementById("t3-1").innerHTML=getDatosAciertosPorPeriodo(1,3)+"/"+getDatosIntentosPorPeriodo(1,3);
    val1+=(getDatosAciertosPorPeriodo(1,3)*3)+getDatosAciertosPorPeriodo(1,3)-getDatosIntentosPorPeriodo(1,3); //valoracion por periodo
    document.getElementById("t3-2").innerHTML=getDatosAciertosPorPeriodo(2,3)+"/"+getDatosIntentosPorPeriodo(2,3);
    val2+=(getDatosAciertosPorPeriodo(2,3)*3)+getDatosAciertosPorPeriodo(2,3)-getDatosIntentosPorPeriodo(2,3); //valoracion por periodo
    document.getElementById("t3-3").innerHTML=getDatosAciertosPorPeriodo(3,3)+"/"+getDatosIntentosPorPeriodo(3,3);
    val3+=(getDatosAciertosPorPeriodo(3,3)*3)+getDatosAciertosPorPeriodo(3,3)-getDatosIntentosPorPeriodo(3,3); //valoracion por periodo
    document.getElementById("t3-4").innerHTML=getDatosAciertosPorPeriodo(4,3)+"/"+getDatosIntentosPorPeriodo(4,3);
    val4+=(getDatosAciertosPorPeriodo(4,3)*3)+getDatosAciertosPorPeriodo(4,3)-getDatosIntentosPorPeriodo(4,3); //valoracion por periodo
    var totalIn = getDatosAciertosPorPeriodo(1,3)+getDatosAciertosPorPeriodo(2,3)+getDatosAciertosPorPeriodo(3,3)+getDatosAciertosPorPeriodo(4,3);    
    var totalTry= getDatosIntentosPorPeriodo(1,3)+getDatosIntentosPorPeriodo(2,3)+getDatosIntentosPorPeriodo(3,3)+getDatosIntentosPorPeriodo(4,3);
    document.getElementById("t3-total").innerHTML=totalIn+"/"+totalTry;
    document.getElementById("t3-puntos").innerHTML=totalIn*3;  
    valoracion+=totalIn-totalTry;//aciertos - intentos 
    //evitar dividir por 0
    if (totalTry==0)totalTry=1;
    var porcentaje = totalIn*100/totalTry;
    document.getElementById("t3-porcentaje").innerHTML=Math.round(porcentaje);
    totalPuntos+=totalIn*3;  

    //entradas
    document.getElementById("te-1").innerHTML=getDatosAciertosPorPeriodo(1,'e')+"/"+getDatosIntentosPorPeriodo(1,'e');
    val1+=(getDatosAciertosPorPeriodo(1,'e')*2)+getDatosAciertosPorPeriodo(1,'e')-getDatosIntentosPorPeriodo(1,'e'); //valoracion por periodo
    document.getElementById("te-2").innerHTML=getDatosAciertosPorPeriodo(2,'e')+"/"+getDatosIntentosPorPeriodo(2,'e');
    val2+=(getDatosAciertosPorPeriodo(2,'e')*2)+getDatosAciertosPorPeriodo(2,'e')-getDatosIntentosPorPeriodo(2,'e'); //valoracion por periodo
    document.getElementById("te-3").innerHTML=getDatosAciertosPorPeriodo(3,'e')+"/"+getDatosIntentosPorPeriodo(3,'e');
    val3+=(getDatosAciertosPorPeriodo(3,'e')*2)+getDatosAciertosPorPeriodo(3,'e')-getDatosIntentosPorPeriodo(3,'e'); //valoracion por periodo
    document.getElementById("te-4").innerHTML=getDatosAciertosPorPeriodo(4,'e')+"/"+getDatosIntentosPorPeriodo(4,'e');
    val4+=(getDatosAciertosPorPeriodo(4,'e')*2)+getDatosAciertosPorPeriodo(4,'e')-getDatosIntentosPorPeriodo(4,'e'); //valoracion por periodo
    var totalIn = getDatosAciertosPorPeriodo(1,'e')+getDatosAciertosPorPeriodo(2,'e')+getDatosAciertosPorPeriodo(3,'e')+getDatosAciertosPorPeriodo(4,'e');    
    var totalTry= getDatosIntentosPorPeriodo(1,'e')+getDatosIntentosPorPeriodo(2,'e')+getDatosIntentosPorPeriodo(3,'e')+getDatosIntentosPorPeriodo(4,'e');
    document.getElementById("te-total").innerHTML=totalIn+"/"+totalTry;
    document.getElementById("te-puntos").innerHTML=totalIn*2; 
    valoracion+=totalIn-totalTry;//aciertos - intentos 
    if (totalTry==0)totalTry=1; //evitar dividir por 0
    var porcentaje = totalIn*100/totalTry;
    document.getElementById("te-porcentaje").innerHTML=Math.round(porcentaje);
    totalPuntos+=totalIn*2;
    
    //total puntos partido
    document.getElementById("puntos").innerHTML=totalPuntos;
    valoracion+=totalPuntos;//sumamos los puntos totales realizados
}

function getDatosAciertosPorPeriodo(periodo,tipoTiro){
    var texto = "";
    //texto = sessionStorage.getItem("t"+tipoTiro+"inp"+periodo);
    if (!sessionStorage.getItem("t"+tipoTiro+"inp"+periodo)){
        texto=0
    }else{
        texto=sessionStorage.getItem("t"+tipoTiro+"inp"+periodo);
    }
    
    //alert(texto);
    return Number(texto);
}
function getDatosIntentosPorPeriodo(periodo,tipoTiro){
    var texto = "";
    if (!sessionStorage.getItem("t"+tipoTiro+"p"+periodo)){
        texto=0;
    }else{
        texto +=sessionStorage.getItem("t"+tipoTiro+"p"+periodo);
    }
    return Number(texto);
}

/*
Valoración = PTS + ASIS + REB + TAPF + BR + FR + T1C + T2C + T3C – BP – TAPC – FP – T1I – T2I – T3I

PTS = PUNTOS, ASIS = ASISTENCIAS, REB = REBOTES, TAPF = TAPONES A FAVOR, BR = BALONES ROBADOS, FR = FALTAS RECIBIDAS, T1C = TIROS LIBRES CONVERTIDOS, T2C = TIROS DE 2 CONVERTIDOS, T3C = TRIPLES CONVERTIDOS, BP = BALONES PERDIDOS, TAPC = TAPONES EN CONTRA, FP = FALTAS PERSONALES, T1I = TIROS LIBRES INTENTADOS, T2I = TIROS DE 2 INTENTADOS, T3I = TRIPLES INTENTADOS
*/
