function carga(){
   
    var mail =window.localStorage.getItem("mail");
    var fechanac=window.localStorage.getItem("fnac");
    //alert(fechanac);
    if (mail!=null && mail.length>0){
        document.getElementById("fmail").value=mail;
        document.getElementById("fnac").value=fechanac;
    }
    document.getElementById("tr-cu").style.visibility = "hidden";
    
    document.getElementById("is").style="background-color: #41cbfe;color: black";
    window.sessionStorage.optionlogin="is";
    
}
function selAction(id){


    
    document.getElementById("is").style="background-color: rgb(86, 86, 86);color: FFFFFF;";
    document.getElementById("cu").style="background-color: rgb(86, 86, 86);color: FFFFFF;";

    document.getElementById(id).style="background-color: #41cbfe;color: black;";
    window.sessionStorage.optionlogin=id;
    if (id=="cu"){
        document.getElementById("tr-cu").style.visibility = "visible";
       
    }else{
        document.getElementById("tr-cu").style.visibility = "hidden";
        
    }
}

function accept(){
    var op = window.sessionStorage.optionlogin;
    console.log("entramos accept "+op);
    if (op=='is'){
        //loaduser
        loadUser();
    }else{
        //saveuser
        saveUser();
    }
}

function saveUser(){
    var mail = document.getElementById("fmail").value;
    var fechanac=document.getElementById("fnac").value;
    var apodo=document.getElementById("apodo").value;
   
    if (mail.trim().length >0 && fechanac.trim().length>0 ){
        window.localStorage.setItem("mail",mail);
        window.localStorage.setItem("fnac",fechanac);
        window.localStorage.setItem("apodo",fechanac);
        loadUserFB(mail, fechanac, true, apodo);
        //guardar en cloud
        //mostrarToast("datos guardados!!",3000); //mostramos 3 segundos
        //alert(mail+ " Datos guardados!!");
    }else{
        mostrarToast("es necesario informar mail, fecha de nacimiento y apodo!",3000);
        //alert('Es necesario informar tanto mail como fecha de nacimiento');
    }
}

function loadUser(){
    //guardamos el email antes de borrarlo todo
    //console.log("entramos");
    mostrarToast("cargando información!!",6000);
    var mail = document.getElementById("fmail").value;
    var fechanac=document.getElementById("fnac").value;
    window.localStorage.setItem("mail",mail);
    window.localStorage.setItem("fnac",fechanac);
    loadUserFB(mail, fechanac, false);
    //
    //console.log("salimos");
}