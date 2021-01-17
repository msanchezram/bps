var myElement = document.getElementById('mytouch');

// create a simple instance
// by default, it only adds horizontal recognizers
var mc = new Hammer(mytouch);

// listen to events...
mc.on("panleft panright tap press", function(ev) {
    //myElement.textContent = ev.type +" gesture detected.";
    //alert(ev.type + ", estoy en pantalla " + window.sessionStorage.pantalla);
    if(ev.type=="panleft"){
      //window.parent.cambiarlink(2);
      //window.parent.$('#atb').click();

        //switch (Number(window.sessionStorage.pantalla)){       
        //    case 2:  //estoy en pantalla
        //        alert(1);
        //        window.sessionStorage.setItem("pantalla",3);        
        //        break;
            //case 3: cambiarlink(3);break;
        //    default: //si no estoy en pantalla2
        //        alert(2);
                window.sessionStorage.setItem("pantalla",4);
        //}      
        top.location.href = 'plantillapartido.html';
    }
    if(ev.type=="panright"){
        //switch (Number(window.sessionStorage.pantalla)){       
            //case 2:  //estoy en pantalla
            //    window.sessionStorage.setItem("pantalla",1);
            //    break;
            //case 3: cambiarlink(3);break;
            //default: //si no estoy en pantalla2
                window.sessionStorage.setItem("pantalla",2);
        //}        
        top.location.href = 'plantillapartido.html';
    }
});


function carga(){
   
    /*
     //inicializar todas las variables a auditar
    if (!sessionStorage.t2) sessionStorage.t2 = 0;
    if (!sessionStorage.t2in) sessionStorage.t2in = 0;

    if (!sessionStorage.t3) sessionStorage.t3 = 0;
    if (!sessionStorage.t3in) sessionStorage.t3in = 0;
    
    if (!sessionStorage.t1) sessionStorage.t1 = 0;
    if (!sessionStorage.t1in) sessionStorage.t1in = 0;
    */
    window.sessionStorage.deshacer="";

}
function buttonSelected(seleccion){
    //necesario que hay un periodo activo
    //alert(sessionStorage.periodo);
    if (sessionStorage.periodo && Number(sessionStorage.periodo)>0){
        var periodo="p"+sessionStorage.periodo;
        var valor = 1;
        if (sessionStorage.getItem(seleccion+periodo)){
            //si existe la variable incrementamos
            valor = Number(window.sessionStorage.getItem(seleccion+periodo))+valor;            
        }
        window.sessionStorage.setItem(seleccion+periodo, valor);
            
        window.sessionStorage.deshacer=seleccion+periodo;
        //alert(seleccion+periodo+"-"+window.sessionStorage.getItem(seleccion+periodo));
        var mensaje = descrifrarMensajeToast(seleccion);
        startToast(mensaje);

    }else{
        startToast("Error : Es necesario activar un periodo para registrar los datos");
    }

}

function buttonDeshacer(){
    //alert(window.sessionStorage.deshacer);
    var seleccion = window.sessionStorage.deshacer;
    //alert(seleccion);
    if (sessionStorage.periodo && Number(sessionStorage.periodo)>0){
        if (seleccion && seleccion.length>0 ){
            valor = Number(window.sessionStorage.getItem(seleccion))-1;
            //alert(window.sessionStorage.deshacer);
            if (valor < 0){
                valor=0;
            }
            window.sessionStorage.setItem(window.sessionStorage.deshacer, valor);
            seleccion=seleccion.substring(0,seleccion.length-2);
            var mensaje = descrifrarMensajeToast(seleccion);
            //alert(mensaje);
            startToast("Deshacer: "+ mensaje);
        }else {
            startToast("No hay nada por deshacer");
        }
    } else {
        startToast("Error : Es necesario activar un periodo para registrar los datos");
    }    
}

function startToast(mensaje) {
    var x = document.getElementById("snackbar");
    if (mensaje.indexOf("Error")>= 0 ){
        x.style.backgroundColor="red";
        x.style.color="white";
        x.style.left="35%";
    }    
    x.innerHTML=mensaje;
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

function descrifrarMensajeToast(mensaje){
    var retorno="";
    switch(mensaje) {
        case "te": retorno="Entrada";break;
        case "tein":retorno="Entrada +2";break;
        case 't2': retorno="Tiro de 2";break;
        case 't2in':retorno="Tiro +2";break;
        case 't1': retorno="Tiro de 1";break;
        case 't1in':retorno="Tiro +1";break;
        case 't3': retorno="Tiro de 3";break;
        case 't3in':retorno="Tiro +3";break;
        case 'frea' : retorno="Falta realizada";break;
        case 'frec'	: retorno="Falta recibida";break;
        case 'asi'	: retorno="Asistencia";break;
        case 'tap' : retorno="Tapón a favor";break;
        case 'red' : retorno="Rebote defensivo";break;
        case 'reo' : retorno="Rebote";break;
        case 'bar' : retorno="Balón recuperado";break;
        case 'bap' : retorno="Balón perdido";break;
        case 'tapc' : retorno="Tapón en contra";break;
        default:retorno=mensaje;
    }
    return retorno;
}
  