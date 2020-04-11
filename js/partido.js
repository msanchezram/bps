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
        alert("Es necesario activar un periodo para registrar los datos");
    }

}

function buttonDeshacer(){
    //alert(window.sessionStorage.deshacer);
    var seleccion = window.sessionStorage.deshacer;
    //alert(seleccion);
    if (seleccion && seleccion.length>0 ){
        valor = Number(window.sessionStorage.getItem(seleccion))-1;
        //alert(window.sessionStorage.deshacer);
        window.sessionStorage.setItem(window.sessionStorage.deshacer, valor);
        seleccion=seleccion.substring(0,seleccion.length-2);
        var mensaje = descrifrarMensajeToast(seleccion);
        //alert(mensaje);
        startToast("Deshacer: "+ mensaje);
    }else {
        startToast("No hay nada por deshacer");
    }
}

function startToast(mensaje) {
    var x = document.getElementById("snackbar");
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
        case 'tap' : retorno="Tapón";break;
        case 'red' : retorno="Rebote defensivo";break;
        case 'reo' : retorno="Rebote ofensivo";break;
        case 'bar' : retorno="Balón recuperado";break;
        case 'bap' : retorno="Balón perdido";break;
        default:retorno=mensaje;
    }
    return retorno;
}
  