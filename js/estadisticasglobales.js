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
 <th>Jugador/a</th>
        <th>Fecha</th>
        <th>Rival (Compl)</th>
        <th>Tiros 1</th>
        <th>Tiros 2</th>
        <th>Tiros 3</th>
        <th>Puntos</th>
        <th>Asist</th>
*/

function agregarFila(datosLines, id){
    var nombre=datosLines[1];
    var fecha=datosLines[3];
    var rival=datosLines[4]+" ("+datosLines[5]+")";

    var t1=getDatoTotal(1, datosLines);
    var t2=getDatoTotal(2, datosLines);
    var t3=getDatoTotal(3, datosLines);
    var te=getDatoTotal('e', datosLines);
    var puntos=getPuntos(datosLines);
    var asistencias=sumaDatos(46, 50, datosLines);

//<a href='javascript:getPartidoSelected("+id+")></a>";

    var lineatabla="";
    
    //lineatabla+="<td><a href='javascript:getPartidoSelected("+id+")'>"+nombre+"</a></td><td>"+fecha+"</td><td>"+rival+"</td>";
    
    lineatabla+=crearCelda(nombre,id)+crearCelda(fecha,id)+crearCelda(rival,id);
    lineatabla+="<td>"+t1+"</td><td>"+t2+"</td><td>"+t3+"</td>"+"</td><td>"+te+"</td>"+"</td><td>"+puntos+"</td>"+"</td><td>"+asistencias+"</td>";
       
    //lineatabla+=crearCelda(t1,id)+crearCelda(t2,id)+crearCelda(t3,id)+crearCelda(te,id)+crearCelda(puntos,id)+crearCelda(asistencias,id);

    //alert(lineatabla);
    var row = document.getElementById("tablaestadisticas").insertRow(-1);
    row.innerHTML = lineatabla;
    
   
}

function crearCelda(variable, id){
    return "<td><a href='javascript:getPartidoSelected("+id+")'>"+variable+"</a></td>";
}

function getPuntos(datosLines){
    var totalpuntos = 0;
    totalpuntos+=sumaDatos(6, 10, datosLines);
    totalpuntos+=sumaDatos(14, 18, datosLines)*2;
    totalpuntos+=sumaDatos(22, 26, datosLines)*3;
    totalpuntos+=sumaDatos(30, 34, datosLines)*2;
    return totalpuntos;
}
function getDatoTotal(tipoTiro, datosLines){
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

function sumaDatos(posDesde, posHasta, datosLines){
    var sumadatos=0;
    for (x = posDesde; x < posHasta; x++) {
        sumadatos+=Number(datosLines[x]);
    }
    return sumadatos;
}


/*
texto=window.sessionStorage.team+";";
  texto+=window.sessionStorage.nombre+";";
  texto+=window.sessionStorage.categoria+";";
  texto+=window.sessionStorage.fecha+";";
  texto+=window.sessionStorage.rival+";";
  texto+=window.sessionStorage.complejidad+";";

  //tiros
  texto+=getDatosAciertosPorPeriodo(1,1)+";";
  texto+=getDatosAciertosPorPeriodo(2,1)+";";
  texto+=getDatosAciertosPorPeriodo(3,1)+";";
  texto+=getDatosAciertosPorPeriodo(4,1)+";";
  texto+=getDatosIntentosPorPeriodo(1,1)+";";
  texto+=getDatosIntentosPorPeriodo(2,1)+";";
  texto+=getDatosIntentosPorPeriodo(3,1)+";";
  texto+=getDatosIntentosPorPeriodo(4,1)+";";

  texto+=getDatosAciertosPorPeriodo(1,2)+";";
  texto+=getDatosAciertosPorPeriodo(2,2)+";";
  texto+=getDatosAciertosPorPeriodo(3,2)+";";
  texto+=getDatosAciertosPorPeriodo(4,2)+";";
  texto+=getDatosIntentosPorPeriodo(1,2)+";";
  texto+=getDatosIntentosPorPeriodo(2,2)+";";
  texto+=getDatosIntentosPorPeriodo(3,2)+";";
  texto+=getDatosIntentosPorPeriodo(4,2)+";";
  
  texto+=getDatosAciertosPorPeriodo(1,3)+";";
  texto+=getDatosAciertosPorPeriodo(2,3)+";";
  texto+=getDatosAciertosPorPeriodo(3,3)+";";
  texto+=getDatosAciertosPorPeriodo(4,3)+";";
  texto+=getDatosIntentosPorPeriodo(1,3)+";";
  texto+=getDatosIntentosPorPeriodo(2,3)+";";
  texto+=getDatosIntentosPorPeriodo(3,3)+";";
  texto+=getDatosIntentosPorPeriodo(4,3)+";";
  
  //entradas
  texto+=getDatosAciertosPorPeriodo(1,'e')+";";
  texto+=getDatosAciertosPorPeriodo(2,'e')+";";
  texto+=getDatosAciertosPorPeriodo(3,'e')+";";
  texto+=getDatosAciertosPorPeriodo(4,'e')+";";
  texto+=getDatosIntentosPorPeriodo(1,'e')+";";
  texto+=getDatosIntentosPorPeriodo(2,'e')+";";
  texto+=getDatosIntentosPorPeriodo(3,'e')+";";
  texto+=getDatosIntentosPorPeriodo(4,'e')+";";
*/
