/*
var myElement = document.getElementById('mytouch');

// create a simple instance
// by default, it only adds horizontal recognizers
var mc = new Hammer(mytouch);

// listen to events...
mc.on("panleft panright tap press", function(ev) {
    //myElement.textContent = ev.type +" gesture detected.";
    alert(ev.type);
    if(ev.type=="panleft"){
      cambiarlink(2);
    }
});
*/

function carga(){
    var mostrar= window.sessionStorage.pantalla;
    //alert(mostrar);

    if (mostrar==null){
        //alert("si "+mostrar);
        var frame = document.getElementById("iframe_a");
        frame.src="crono.html";
    }else{
        console.log("plantillapartido voy a pantalla "+window.sessionStorage.pantalla);
        //if (window.sessionStorage.pantalla =="tr"){
            switch (Number(window.sessionStorage.pantalla)){
                case 1: cambiarlink(1);break;
                case 2: cambiarlink(2);break;
                case 3: cambiarlink(3);break;
                default:
                        cambiarlink(4);
            }
            
        //}
        //cambiarlink(window.sessionStorage.pantalla)
    }
    
}

function selecOption(op){

    document.getElementById("cr").src="./images/crono-off.png";
    document.getElementById("tb").src="./images/tablero-off.png";
    document.getElementById("ba").src="./images/ball-off.png";
    document.getElementById("ca").src="./images/cancha-off.png";
    switch (op){
        case 1:document.getElementById("cr").src="./images/crono-on.png";
            //alert("selecOption c1");
            break;
        case 2:document.getElementById("tb").src="./images/tablero-on.png";
            //alert("selecOption c2");
            break;
        case 3:document.getElementById("ba").src="./images/ball-on.png";
        //alert("selecOption c3");
            break;
        default://si no es 4
        document.getElementById("ca").src="./images/cancha-on.png";
        //alert("selecOption c4");
    }
 
}
function cambiarlink(op){
    //alert('mytouch opcion '+op);
    selecOption(op);

    //target="iframe_a"
    switch (op){
        case 1:
            //window.location.href="./crono.html";
            window.open('./crono.html', 'iframe_a');
            break;
        case 2://window.location.href="./partido.html";
            window.open('./partido.html', 'iframe_a');
            break;
        case 3://window.location.href="./partido2.html";
            window.open('./partido2.html', 'iframe_a');
            break;
        default://si no es 4
            //window.location.href="./estadisticas.html";
            window.open('./estadisticas.html', 'iframe_a');
    }

}
