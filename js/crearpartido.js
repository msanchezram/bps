function carga(){

    var players;

    if (window.sessionStorage.modificadatospartido==1){
        
        document.getElementById("titulo").innerHTML="Modificar datos del partido";
        players= JSON.parse(window.localStorage.players);
        cargaselectplayer(players);
        document.getElementById("fplayer").value=window.sessionStorage.posplayer;
        //document.getElementById("fteam").value=window.sessionStorage.team;
        //document.getElementById("fname").value=window.sessionStorage.nombre ;
        //document.getElementById("lcategoria").value=window.sessionStorage.categoria;
        document.getElementById("lfecha").value=window.sessionStorage.fecha;
        document.getElementById("lrival").value=window.sessionStorage.rival;
        document.getElementById("complejidad").value=window.sessionStorage.complejidad;        
        
        document.getElementById("salir").style.visibility="hidden";
    }else{
        //crea partido
        var claveuser=window.localStorage.clave;
        if(!claveuser){
            //si la clave no existe lo mandamos a cargar
            window.location.href="./login.html";
        }
        players = window.localStorage.players;
        if (!players){
            //deberiamos ir a cargar los jugadores
            //var mail=window.localStorage.mail;
            //var fnac=window.localStorage.fnac;
            //loadUserFB(mail, fnac, false);
            window.location.href="./players.html";
            
        }else{ 
            players= JSON.parse(window.localStorage.players);
            console.log("player -> "+players.length);
            if(players.length==0){
                mostrarToast("no hay jugadores ...",3000);
                document.getElementById("acc").disabled=true;
            }else{
                
                //mostrarToast('Mostramos los datos', 3000);
                //var players = JSON.parse(window.localStorage.players);
                if (players.length>0){
                    cargaselectplayer(players);
                } 
            }
                      
        }  
    }
}

function cargaselectplayer(players){

    var text="";
    var count=0;
    for(i=0;i<players.length;i++){
        if (players[i].activo==1){
            //sólo podemos crear partido con los players activos
            text=players[i].nombre+" - "+ players[i].categoria + "- "+ players[i].equipo + " - "+ players[i].temporada;
            var x = document.getElementById("fplayer");
            var option = document.createElement("option");
            option.text = text;
            option.value=i;//players[i].idplayer;
            x.add(option);
            count++;
        }        
    }
    if (count==0){
        //no hay players activos
        mostrarToast('no hay jugadores/as activos...',3000);
        document.getElementById("acc").disabled=true;
        document.getElementById("acc").style="opacity: 0.3;cursor: not-allowed;";
    }else{
        var d = new Date();
        var dia="0";
        var mes ="0";
        if (d.getDate()<10){
            dia+=d.getDate();
        }else{
            dia=d.getDate();
        }
        if (d.getMonth()<9){
            mes+=d.getMonth()+1;
        }else{
            mes=d.getMonth()+1;
        }
        var fechatext=dia+"/"+mes+"/"+d.getFullYear();
        console.log(fechatext);
        document.getElementById("lfecha").value=fechatext;

    }

}

function crearPartido(){
    //alert("Crear partido!!");
    var players = JSON.parse(window.localStorage.players);
    var posplayer = document.getElementById("fplayer").value;
    window.sessionStorage.posplayer = posplayer;
    //alert(posplayer+" -" + players.length);
    window.sessionStorage.nombre = players[posplayer].nombre;
    window.sessionStorage.categoria =  players[posplayer].categoria+" ("+players[posplayer].nivel+")";
    window.sessionStorage.team = players[posplayer].equipo;
    window.sessionStorage.idplayer = players[posplayer].idplayer;
    window.sessionStorage.fecha=document.getElementById("lfecha").value;
    window.sessionStorage.rival=document.getElementById("lrival").value;
    window.sessionStorage.complejidad=document.getElementById("complejidad").value;

    window.location.href = './plantillapartido.html';
    
}

