function carga(){

}

function selecOption(op){

    document.getElementById("cr").src="./images/crono-off.png";
    document.getElementById("tb").src="./images/tablero-off.png";
    document.getElementById("ba").src="./images/ball-off.png";
    document.getElementById("ca").src="./images/cancha-off.png";
    switch (op){
        case 1:document.getElementById("cr").src="./images/crono-on.png";
            break;
        case 2:document.getElementById("tb").src="./images/tablero-on.png";
            break;
        case 3:document.getElementById("ba").src="./images/ball-on.png";
            break;
        default://si no es 4
        document.getElementById("ca").src="./images/cancha-on.png";
    }
 
}
