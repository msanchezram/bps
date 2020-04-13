function carga(){

    //cargas en un array las estadísticas totales
    var arr = localStorage.estadisticasglobales.split("#");
    var datosLinea="";
    if (arr && arr.length > 0){
        
        for (i = 0; i < arr.length; i++) {
            datosLinea = arr[i].split(";");
            //alert(arr[i]);
            agregarFila(datosLinea, i);
            //alert(datosLinea);
        }
    }
    
    

}
function getPartidoSelected(lineselected){
    //alert(lineselected);
    window.sessionStorage.detallepartido=lineselected;
    location.href='./detallepartido.html';
}

/*
        <th>Nombre</th>
        <th>Fecha</th>
        <th>Rival (Compl)</th>
        <th>Tiros</th>
        <th>Punt</th>
        <th>Asis</th>
        <th>Valor</th>
*/

function agregarFila(datosLines, id){
    var nombre=datosLines[1];
    var fecha=datosLines[3].split("/");
    fecha = fecha[0]+"/"+fecha[1]+"/ "+fecha[2];
    var rival=datosLines[4]+" ("+datosLines[5]+")";

    /*
    var t1=getDatoTotal(1, datosLines);
    var t2=getDatoTotal(2, datosLines);
    var t3=getDatoTotal(3, datosLines);
    var te=getDatoTotal('e', datosLines);
    */
    var valoracion=getValoracion(datosLines);
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
    var row = document.getElementById("tablaestadisticas").insertRow(-1);
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

/*
function getDatoTiros(tipoTiro,datosLines){
    var dato="";
    
    switch(tipoTiro){
        case 1:
            dato= sumaDatos(6, 10, datosLines)+"/"+sumaDatos(10, 14, datosLines);
            break;
        case 2:
            dato= sumaDatos(14, 18, datosLines)+"/"+sumaDatos(18, 22, datosLines);
            break;
        case 3:
            dato= sumaDatos(22, 26, datosLines)+"/"+sumaDatos(26, 30, datosLines);
            break;
        default: //son entradas
            dato= sumaDatos(30, 34, datosLines)+"/"+sumaDatos(34, 38, datosLines);
            break;
    }
    return dato;
}
*/
function sumaDatos(posDesde, posHasta, datosLines){
    var sumadatos=0;
    for (x = posDesde; x < posHasta; x++) {
        sumadatos+=Number(datosLines[x]);
    }
    return sumadatos;
}

