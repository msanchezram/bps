function carga(){
    //cambiar datos del jugador/a
    //alert("carga");
    var totalPuntos=0;
    document.getElementById("team").innerHTML=window.sessionStorage.team;
    document.getElementById("nombre").innerHTML=window.sessionStorage.nombre;
    document.getElementById("categoria").innerHTML=window.sessionStorage.categoria;
    document.getElementById("fecha").innerHTML=window.sessionStorage.fecha;
    document.getElementById("rival").innerHTML=window.sessionStorage.rival;
    document.getElementById("complejidad").innerHTML=window.sessionStorage.complejidad;

    //printamos datos de los tiros
    
    printDatosTiros();

    var total=0;
    //faltas 
    document.getElementById("frea-1").innerHTML=getDatosPorPeriodo(1,"frea");
    document.getElementById("frea-2").innerHTML=getDatosPorPeriodo(2,"frea");
    document.getElementById("frea-3").innerHTML=getDatosPorPeriodo(3,"frea");
    document.getElementById("frea-4").innerHTML=getDatosPorPeriodo(4,"frea");
    total=getDatosPorPeriodo(1,"frea")+getDatosPorPeriodo(2,"frea")+getDatosPorPeriodo(3,"frea")+getDatosPorPeriodo(4,"frea");
    document.getElementById("frea-total").innerHTML=total;

    document.getElementById("frec-1").innerHTML=getDatosPorPeriodo(1,"frec");
    document.getElementById("frec-2").innerHTML=getDatosPorPeriodo(2,"frec");
    document.getElementById("frec-3").innerHTML=getDatosPorPeriodo(3,"frec");
    document.getElementById("frec-4").innerHTML=getDatosPorPeriodo(4,"frec");
    total=getDatosPorPeriodo(1,"frec")+getDatosPorPeriodo(2,"frec")+getDatosPorPeriodo(3,"frec")+getDatosPorPeriodo(4,"frec");
    document.getElementById("frec-total").innerHTML=total;

    //asistencias
    document.getElementById("asi-1").innerHTML=getDatosPorPeriodo(1,"asi");
    document.getElementById("asi-2").innerHTML=getDatosPorPeriodo(2,"asi");
    document.getElementById("asi-3").innerHTML=getDatosPorPeriodo(3,"asi");
    document.getElementById("asi-4").innerHTML=getDatosPorPeriodo(4,"asi");
    total=getDatosPorPeriodo(1,"asi")+getDatosPorPeriodo(2,"asi")+getDatosPorPeriodo(3,"asi")+getDatosPorPeriodo(4,"asi");
    document.getElementById("asi-total").innerHTML=total;

    //tapones
    document.getElementById("tap-1").innerHTML=getDatosPorPeriodo(1,"tap");
    document.getElementById("tap-2").innerHTML=getDatosPorPeriodo(2,"tap");
    document.getElementById("tap-3").innerHTML=getDatosPorPeriodo(3,"tap");
    document.getElementById("tap-4").innerHTML=getDatosPorPeriodo(4,"tap");
    total=getDatosPorPeriodo(1,"tap")+getDatosPorPeriodo(2,"tap")+getDatosPorPeriodo(3,"tap")+getDatosPorPeriodo(4,"tap");
    document.getElementById("tap-total").innerHTML=total;

    //rebotes
    document.getElementById("reo-1").innerHTML=getDatosPorPeriodo(1,"reo");
    document.getElementById("reo-2").innerHTML=getDatosPorPeriodo(2,"reo");
    document.getElementById("reo-3").innerHTML=getDatosPorPeriodo(3,"reo");
    document.getElementById("reo-4").innerHTML=getDatosPorPeriodo(4,"reo");
    total=getDatosPorPeriodo(1,"reo")+getDatosPorPeriodo(2,"reo")+getDatosPorPeriodo(3,"reo")+getDatosPorPeriodo(4,"reo");
    document.getElementById("reo-total").innerHTML=total;

    document.getElementById("red-1").innerHTML=getDatosPorPeriodo(1,"red");
    document.getElementById("red-2").innerHTML=getDatosPorPeriodo(2,"red");
    document.getElementById("red-3").innerHTML=getDatosPorPeriodo(3,"red");
    document.getElementById("red-4").innerHTML=getDatosPorPeriodo(4,"red");
    total=getDatosPorPeriodo(1,"red")+getDatosPorPeriodo(2,"red")+getDatosPorPeriodo(3,"red")+getDatosPorPeriodo(4,"red");
    document.getElementById("red-total").innerHTML=total;

    //balones recuperados y perdidos
    document.getElementById("bap-1").innerHTML=getDatosPorPeriodo(1,"bap");
    document.getElementById("bap-2").innerHTML=getDatosPorPeriodo(2,"bap");
    document.getElementById("bap-3").innerHTML=getDatosPorPeriodo(3,"bap");
    document.getElementById("bap-4").innerHTML=getDatosPorPeriodo(4,"bap");
    total=getDatosPorPeriodo(1,"bap")+getDatosPorPeriodo(2,"bap")+getDatosPorPeriodo(3,"bap")+getDatosPorPeriodo(4,"bap");
    document.getElementById("bap-total").innerHTML=total;

    document.getElementById("bar-1").innerHTML=getDatosPorPeriodo(1,"bar");
    document.getElementById("bar-2").innerHTML=getDatosPorPeriodo(2,"bar");
    document.getElementById("bar-3").innerHTML=getDatosPorPeriodo(3,"bar");
    document.getElementById("bar-4").innerHTML=getDatosPorPeriodo(4,"bar");
    total=getDatosPorPeriodo(1,"bar")+getDatosPorPeriodo(2,"bar")+getDatosPorPeriodo(3,"bar")+getDatosPorPeriodo(4,"bar");
    document.getElementById("bar-total").innerHTML=total;
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
    document.getElementById("t1-2").innerHTML=getDatosAciertosPorPeriodo(2,1)+"/"+getDatosIntentosPorPeriodo(2,1);
    document.getElementById("t1-3").innerHTML=getDatosAciertosPorPeriodo(3,1)+"/"+getDatosIntentosPorPeriodo(3,1);
    document.getElementById("t1-4").innerHTML=getDatosAciertosPorPeriodo(4,1)+"/"+getDatosIntentosPorPeriodo(4,1);
    var totalIn = getDatosAciertosPorPeriodo(1,1)+getDatosAciertosPorPeriodo(2,1)+getDatosAciertosPorPeriodo(3,1)+getDatosAciertosPorPeriodo(4,1);    
    var totalTry= getDatosIntentosPorPeriodo(1,1)+getDatosIntentosPorPeriodo(2,1)+getDatosIntentosPorPeriodo(3,1)+getDatosIntentosPorPeriodo(4,1);
    document.getElementById("t1-total").innerHTML=totalIn+"/"+totalTry;
    document.getElementById("t1-puntos").innerHTML=totalIn; 
    if (totalTry==0)totalTry=1; //evitar dividir por 0
    var porcentaje = totalIn*100/totalTry;
    document.getElementById("t1-porcentaje").innerHTML=Math.round(porcentaje);
    totalPuntos=totalIn;
    //alert(totalPuntos);
    //tiros 2
    document.getElementById("t2-1").innerHTML=getDatosAciertosPorPeriodo(1,2)+"/"+getDatosIntentosPorPeriodo(1,2);
    document.getElementById("t2-2").innerHTML=getDatosAciertosPorPeriodo(2,2)+"/"+getDatosIntentosPorPeriodo(2,2);
    document.getElementById("t2-3").innerHTML=getDatosAciertosPorPeriodo(3,2)+"/"+getDatosIntentosPorPeriodo(3,2);
    document.getElementById("t2-4").innerHTML=getDatosAciertosPorPeriodo(4,2)+"/"+getDatosIntentosPorPeriodo(4,2);
    var totalIn = getDatosAciertosPorPeriodo(1,2)+getDatosAciertosPorPeriodo(2,2)+getDatosAciertosPorPeriodo(3,2)+getDatosAciertosPorPeriodo(4,2);    
    var totalTry= getDatosIntentosPorPeriodo(1,2)+getDatosIntentosPorPeriodo(2,2)+getDatosIntentosPorPeriodo(3,2)+getDatosIntentosPorPeriodo(4,2);
    document.getElementById("t2-total").innerHTML=totalIn+"/"+totalTry;
    document.getElementById("t2-puntos").innerHTML=totalIn*2; 
    if (totalTry==0)totalTry=1; //evitar dividir por 0
    var porcentaje = totalIn*100/totalTry;
    document.getElementById("t2-porcentaje").innerHTML=Math.round(porcentaje);
    totalPuntos+=totalIn*2;
    //alert(totalPuntos);
    //tiros 3
    document.getElementById("t3-1").innerHTML=getDatosAciertosPorPeriodo(1,3)+"/"+getDatosIntentosPorPeriodo(1,3);
    document.getElementById("t3-2").innerHTML=getDatosAciertosPorPeriodo(2,3)+"/"+getDatosIntentosPorPeriodo(2,3);
    document.getElementById("t3-3").innerHTML=getDatosAciertosPorPeriodo(3,3)+"/"+getDatosIntentosPorPeriodo(3,3);
    document.getElementById("t3-4").innerHTML=getDatosAciertosPorPeriodo(4,3)+"/"+getDatosIntentosPorPeriodo(4,3);
    var totalIn = getDatosAciertosPorPeriodo(1,3)+getDatosAciertosPorPeriodo(2,3)+getDatosAciertosPorPeriodo(3,3)+getDatosAciertosPorPeriodo(4,3);    
    var totalTry= getDatosIntentosPorPeriodo(1,3)+getDatosIntentosPorPeriodo(2,3)+getDatosIntentosPorPeriodo(3,3)+getDatosIntentosPorPeriodo(4,3);
    document.getElementById("t3-total").innerHTML=totalIn+"/"+totalTry;
    document.getElementById("t3-puntos").innerHTML=totalIn*3;  //evitar dividir por 0
    if (totalTry==0)totalTry=1;
    var porcentaje = totalIn*100/totalTry;
    document.getElementById("t3-porcentaje").innerHTML=Math.round(porcentaje);
    totalPuntos+=totalIn*3;
    //puntos del partido
    

    //entradas
    document.getElementById("te-1").innerHTML=getDatosAciertosPorPeriodo(1,'e')+"/"+getDatosIntentosPorPeriodo(1,'e');
    document.getElementById("te-2").innerHTML=getDatosAciertosPorPeriodo(2,'e')+"/"+getDatosIntentosPorPeriodo(2,'e');
    document.getElementById("te-3").innerHTML=getDatosAciertosPorPeriodo(3,'e')+"/"+getDatosIntentosPorPeriodo(3,'e');
    document.getElementById("te-4").innerHTML=getDatosAciertosPorPeriodo(4,'e')+"/"+getDatosIntentosPorPeriodo(4,'e');
    var totalIn = getDatosAciertosPorPeriodo(1,'e')+getDatosAciertosPorPeriodo(2,'e')+getDatosAciertosPorPeriodo(3,'e')+getDatosAciertosPorPeriodo(4,'e');    
    var totalTry= getDatosIntentosPorPeriodo(1,'e')+getDatosIntentosPorPeriodo(2,'e')+getDatosIntentosPorPeriodo(3,'e')+getDatosIntentosPorPeriodo(4,'e');
    document.getElementById("te-total").innerHTML=totalIn+"/"+totalTry;
    document.getElementById("te-puntos").innerHTML=totalIn*2; 
    if (totalTry==0)totalTry=1; //evitar dividir por 0
    var porcentaje = totalIn*100/totalTry;
    document.getElementById("te-porcentaje").innerHTML=Math.round(porcentaje);
    totalPuntos+=totalIn*2;
    
    //total puntos partido
    document.getElementById("puntos").innerHTML=totalPuntos;
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
