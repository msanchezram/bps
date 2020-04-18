function carga(){
   
    var mail =window.localStorage.getItem("mail");
    //alert(mail)
    if (mail.length>0){
        document.getElementById("fmail").value=mail;
    }
    
}

function saveConf(){
    var mail = document.getElementById("fmail").value;
   
    if (mail.trim().length>0){
        window.localStorage.setItem("mail",mail);
        alert(mail+ " guardado!!");
    }else{
        alert('Es necesario añadir un mail');
    }
}

function borrarDatosCache(){
    //guardamos el email antes de borrarlo todo
    var mail =window.localStorage.getItem("mail");
    window.localStorage.clear();
    window.localStorage.setItem("mail",mail);
}