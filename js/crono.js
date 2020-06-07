function cargaCrono(){
    if (!sessionStorage.periodo){
        sessionStorage.periodo = 0;
    }else{
        //alert(sessionStorage.periodo);
        if(sessionStorage.periodo>0)
          buttonSelected(sessionStorage.periodo);
    }
}
function buttonSelected(idboton){
    //cambiar style al boton seleccionado a tipo button2
    document.getElementById("1").style="background-color: #121212;color: white;border: 1px solid rgb(148, 148, 148);"
    document.getElementById("2").style="background-color: #121212;color: white;border: 1px solid rgb(148, 148, 148);"
    document.getElementById("3").style="background-color: #121212;color: white;border: 1px solid rgb(148, 148, 148);"
    document.getElementById("4").style="background-color: #121212;color: white;border: 1px solid rgb(148, 148, 148);"

    document.getElementById(idboton).style="background-color: #41cbfe;color: black;border: 1px solid black);"
    //alert(idboton);
    window.sessionStorage.setItem("periodo",idboton);

    //alert(sessionStorage.periodo);    
}

function modificaDatosPartido(){
    //activamos el flag para que se modifiquen los datos del partido
    window.sessionStorage.modificadatospartido=1;
    
    window.top.location.href = "./crearpartido.html";

}
function finPartido(guardar){

    if(guardar==1){     
      
      grabarDatosBaseDatosCloud();
      //desactivar boton guardar
      document.getElementById("btnsave").style.opacity="0.6"; 
      document.getElementById("btnsave").style.cursor ="not-allowed";
      
      //guardar el mail
      //var mail =window.localStorage.getItem("mail");
      //window.localStorage.clear();
      //window.localStorage.setItem("mail",mail);

    }else{
      //alert(' no guardo');
      window.sessionStorage.clear();
      window.top.location.href = "./index.html";
    }
    //alert(localStorage.estadisticasglobales);
}



var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtnFin");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
  window.document.getElementById("lteam").innerHTML=window.sessionStorage.team;
  window.document.getElementById("lrival").innerHTML=window.sessionStorage.rival;
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

document.write("<"+"script type='text/javascript' src='./js/estadisticas.js'><"+"/script>")

function generateLineSave(){

  var texto=window.sessionStorage.team+";";
  texto+=window.sessionStorage.nombre+";";
  texto+=window.sessionStorage.categoria+";";
  texto+=window.sessionStorage.fecha+";";
  texto+=window.sessionStorage.rival+";";
  texto+=window.sessionStorage.complejidad+";";

  //tiros
  texto+=getDatosAciertosPorPeriodo(1,1)+";"; //pos 6
  texto+=getDatosAciertosPorPeriodo(2,1)+";";
  texto+=getDatosAciertosPorPeriodo(3,1)+";";
  texto+=getDatosAciertosPorPeriodo(4,1)+";";
  texto+=getDatosIntentosPorPeriodo(1,1)+";";//pos 10
  texto+=getDatosIntentosPorPeriodo(2,1)+";";
  texto+=getDatosIntentosPorPeriodo(3,1)+";";
  texto+=getDatosIntentosPorPeriodo(4,1)+";";

  texto+=getDatosAciertosPorPeriodo(1,2)+";"; //pos 14
  texto+=getDatosAciertosPorPeriodo(2,2)+";";
  texto+=getDatosAciertosPorPeriodo(3,2)+";";
  texto+=getDatosAciertosPorPeriodo(4,2)+";";
  texto+=getDatosIntentosPorPeriodo(1,2)+";";
  texto+=getDatosIntentosPorPeriodo(2,2)+";";
  texto+=getDatosIntentosPorPeriodo(3,2)+";";
  texto+=getDatosIntentosPorPeriodo(4,2)+";";
  
  texto+=getDatosAciertosPorPeriodo(1,3)+";"; //pos 22
  texto+=getDatosAciertosPorPeriodo(2,3)+";";
  texto+=getDatosAciertosPorPeriodo(3,3)+";";
  texto+=getDatosAciertosPorPeriodo(4,3)+";";
  texto+=getDatosIntentosPorPeriodo(1,3)+";";
  texto+=getDatosIntentosPorPeriodo(2,3)+";";
  texto+=getDatosIntentosPorPeriodo(3,3)+";";
  texto+=getDatosIntentosPorPeriodo(4,3)+";";
  
  //entradas
  texto+=getDatosAciertosPorPeriodo(1,'e')+";"; // pos30
  texto+=getDatosAciertosPorPeriodo(2,'e')+";";
  texto+=getDatosAciertosPorPeriodo(3,'e')+";";
  texto+=getDatosAciertosPorPeriodo(4,'e')+";";
  texto+=getDatosIntentosPorPeriodo(1,'e')+";";
  texto+=getDatosIntentosPorPeriodo(2,'e')+";";
  texto+=getDatosIntentosPorPeriodo(3,'e')+";";
  texto+=getDatosIntentosPorPeriodo(4,'e')+";"; //pos 37

  //faltas realizadas
  texto+=getDatosPorPeriodo(1,"frea")+";";
  texto+=getDatosPorPeriodo(2,"frea")+";";
  texto+=getDatosPorPeriodo(3,"frea")+";";
  texto+=getDatosPorPeriodo(4,"frea")+";"; //pos 41
  
  //faltas recibidas
  texto+=getDatosPorPeriodo(1,"frec")+";";
  texto+=getDatosPorPeriodo(2,"frec")+";";
  texto+=getDatosPorPeriodo(3,"frec")+";";
  texto+=getDatosPorPeriodo(4,"frec")+";"; //pos 45
  
  //asistencias
  texto+=getDatosPorPeriodo(1,"asi")+";";
  texto+=getDatosPorPeriodo(2,"asi")+";";
  texto+=getDatosPorPeriodo(3,"asi")+";";
  texto+=getDatosPorPeriodo(4,"asi")+";"; //pos 49
  
  //tapones a favor
  texto+=getDatosPorPeriodo(1,"tap")+";";
  texto+=getDatosPorPeriodo(2,"tap")+";";
  texto+=getDatosPorPeriodo(3,"tap")+";";
  texto+=getDatosPorPeriodo(4,"tap")+";"; //pos 53
  
  //rebotes ofensivos
  texto+=getDatosPorPeriodo(1,"reo")+";";
  texto+=getDatosPorPeriodo(2,"reo")+";";
  texto+=getDatosPorPeriodo(3,"reo")+";";
  texto+=getDatosPorPeriodo(4,"reo")+";"; //pos 57
  
  //rebotes defensivos
  texto+=getDatosPorPeriodo(1,"red")+";";
  texto+=getDatosPorPeriodo(2,"red")+";";
  texto+=getDatosPorPeriodo(3,"red")+";";
  texto+=getDatosPorPeriodo(4,"red")+";"; //pos 61
  
  //balones perdidos
  texto+=getDatosPorPeriodo(1,"bap")+";";
  texto+=getDatosPorPeriodo(2,"bap")+";";
  texto+=getDatosPorPeriodo(3,"bap")+";";
  texto+=getDatosPorPeriodo(4,"bap")+";"; //pos 65
  //balones recuperados
  texto+=getDatosPorPeriodo(1,"bar")+";";
  texto+=getDatosPorPeriodo(2,"bar")+";";
  texto+=getDatosPorPeriodo(3,"bar")+";";
  texto+=getDatosPorPeriodo(4,"bar")+";";     //pos 69

  //tapones en contra
  texto+=getDatosPorPeriodo(1,"tapc")+";";//pos 70
  texto+=getDatosPorPeriodo(2,"tapc")+";";
  texto+=getDatosPorPeriodo(3,"tapc")+";";
  texto+=getDatosPorPeriodo(4,"tapc");    //pos 73
  return texto;
}

function grabarDatosBaseDatosCloud(){

  var email = window.localStorage.getItem("mail");
  var idplayer= window.sessionStorage.idplayer;
  var genRegistro = generateLineSave();
  //console.log("1 "+genRegistro);
  var linealista=genRegistro.split(";");
  var publico=0;
  if(document.getElementById("fpublicar").checked){
    publico=1;
  }  
  //añadir valoracion
  var valoraciontotal=0;
  var valoraciontotalGlobal=0;
  valoraciontotal=getValoracionJugador(linealista,1);
  valoraciontotalGlobal+=valoraciontotal;
  genRegistro+=";"+valoraciontotal+";";
  valoraciontotal=getValoracionJugador(linealista,2);
  valoraciontotalGlobal+=valoraciontotal;
  genRegistro+=valoraciontotal+";";
  valoraciontotal=getValoracionJugador(linealista,3);
  valoraciontotalGlobal+=valoraciontotal;
  genRegistro+=valoraciontotal+";";
  valoraciontotal=getValoracionJugador(linealista,4);
  valoraciontotalGlobal+=valoraciontotal;
  genRegistro+=valoraciontotal+";";
  genRegistro+=valoraciontotalGlobal+";";
  //console.log("2 "+genRegistro);
  var iteam=0;
  var irival=0;
  if(document.getElementById("iteam").value.length>0)
    iteam=document.getElementById("iteam").value;
  if(document.getElementById("irival").value.length > 0)
    irival=document.getElementById("irival").value;
  //añadir resultado
  genRegistro+=iteam+";"+irival;

  //console.log("3 "+genRegistro);
  mostrarToast("registrando los datos!!",1000); 
  //saveMatchFB(email,idplayer,genRegistro);
  var res = saveMatchFB(email,idplayer,genRegistro, publico);

  //console.log("Idplayer "+idplayer);
  //console.log("Key partido "+res);
  //console.log("genregistro "+genRegistro);
  if (publico==1){
    processMatchFollowedByPlayerFB(idplayer,res,genRegistro,"./index.html",true);
  }else{
    window.top.location.href="./index.html";
  }
  
  //console.log("fin grabarDatosBaseDatosCloud");

}
