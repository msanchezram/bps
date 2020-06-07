var firebaseConfig = {
    apiKey: "AIzaSyAqCapvT9IeJ2grEJnPOXNYSiNgGWs_vXk",
    authDomain: "testbps-f9198.firebaseapp.com",
    databaseURL: "https://testbps-f9198.firebaseio.com",
    projectId: "testbps-f9198",
    storageBucket: "testbps-f9198.appspot.com",
    messagingSenderId: "536759306978",
    appId: "1:536759306978:web:81ea9d31340003a658ecbb"
  };
  // Initialize Firebase
  //firebase.initializeApp(firebaseConfig);

  function saveUserFB(mail, fnac){
    if (!firebase.apps.length) {
        //ver si está inicializado
        //console.log("inicializo");
        firebase.initializeApp(firebaseConfig);
    }
    var matchsref = firebase.database().ref("usuarios");

    matchsref.push ({
        mail: mail,
        fechanacimiento: fnac
    });
    //console.log("fin del push")

    matchsref.once("value", function(snap) {
        mostrarToast("datos guardados!!",3000);
    });
    //alert('Datos guardados')
  }

  function loadUserFB(mail, fnac, altausuario){
    if (!firebase.apps.length) {
        //ver si está inicializado
        //console.log("inicializo");
        firebase.initializeApp(firebaseConfig);
    }
    var usersref = firebase.database().ref("usuarios");
    //var tmpmail="";
    var tmpfechanac="";
    var clave="";
    var count=0;
    
    usersref.orderByChild("mail").equalTo(mail).on("child_added", function(data) {
        count++;
        //console.log("Equal to filter: " + data.val().mail+" - "+data.val().fechanacimiento+"-"+data.key);
        tmpfechanac=data.val().fechanacimiento;

        if (tmpfechanac==fnac){
            //usuario encontrado, guardamos su key
            clave=data.key;                
        }
        
        //TO DO: cargar players?
        if (clave.length>0){
            //tenemos usuario
            console.log("vamos a buscar jugadores");
            window.localStorage.clave=clave;             

        }else{
            mostrarToast("usuario "+mail+" con fecha nacimiento "+fnac+" no existe!",3000);
        }
       
    }); 
    var jugador;
    usersref.once("value", function(snap) {
        //console.log("initial data loaded!", snap.numChildren() === count);
        //console.log("initial data loaded! "+ count);
        if (altausuario && count==0){
            //console.log("alta de usuario");
            //si es un alta lo agregamos
            saveUserFB(mail, fnac);            
        } else if (altausuario && count>0){
            //error el usuario ya existe
            mostrarToast("error en el alta, el usuario "+mail+" ya existe!",3000);
        } else if(count>0 && clave.length>0 && !altausuario){
            var arrplayers = [];
            var players = firebase.database().ref("jugadores");
            players.orderByChild("idusuario").equalTo(clave).on("child_added", function(data2) {
                //console.log("Equal to filter: " + data2.val().nombre+" - "+data2.val().categoria+"-"+data2.key);
                //console.log("Equal to filter: " + data2);
                jugador=playerDTO(data2);
                //console.log("Equal to filter: " + jugador.nombre+" - "+jugador.categoria+"-"+data2.key);
                arrplayers.push(jugador);
            });

            players.once("value",function(snap2){
                window.localStorage.players=JSON.stringify(arrplayers);
                mostrarToast(arrplayers.length+" jugadores/as cargados",3000);                
            });
        }else if(!altausuario && count==0){
            //console.log("0 filas ");
            mostrarToast("usuario "+mail+" no existe!",3000);
        }
      });

    }

function loadPlayersFB(idusuario, retorno){
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    var arrplayers = [];
    var players = firebase.database().ref("jugadores");
    var jugador;
    players.orderByChild("idusuario").equalTo(idusuario).on("child_added", function(data2) {
        jugador=playerDTO(data2);            
        arrplayers.push(jugador);
    });
    players.once("value",function(snap2){
        window.localStorage.players=JSON.stringify(arrplayers);  
        if (retorno!=null){
            if (retorno=="./players.html"){
                cargarTablaPlayers(arrplayers);  
            }else if (retorno=="./serarchfollower.html"){
                mostrarToast(arrplayers.length+" jugadores/as cargados",3000);
                activarBotonBuscar();
            }
        }                  
    });
}

function playerDTO(obj){
    var player = {};
    
    player.activo=obj.val().activo;
    player.categoria=obj.val().categoria;
    player.equipo=obj.val().equipo;
    player.genero= obj.val().genero;
    player.idusuario=obj.val().idusuario;
    player.mail=obj.val().mail;
    player.nivel=obj.val().nivel;
    player.nombre=obj.val().nombre;
    player.temporada=obj.val().temporada;
    if (obj.val().followers!=null){
        player.followers=obj.val().followers;
    }else{
        player.followers=0;
    }
    player.idplayer=obj.key;

    return player;
}

function savePlayerFB(player){
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    var accion="";
    if (player.idplayer.length>0){ //actualizar datos player
        accion="jugadores/"+player.idplayer;
    }else{ //nuevo player
        accion="jugadores";
    }
    var playersref = firebase.database().ref(accion);
    if (player.idplayer.length>0){
        //console.log("set");
        playersref.set({
            activo:player.activo,
            categoria:player.categoria,
            equipo:player.equipo,
            genero:player.genero,
            idusuario:player.idusuario,
            mail:player.mail,
            nivel:player.nivel,
            nombre:player.nombre,
            temporada:player.temporada
        });

        //console.log("fin del update");
    }else{
        //console.log("push");
        playersref.push ({
            activo:player.activo,
            categoria:player.categoria,
            equipo:player.equipo,
            genero:player.genero,
            idusuario:player.idusuario,
            mail:player.mail,
            nivel:player.nivel,
            nombre:player.nombre,
            temporada:player.temporada
        });
        //console.log("fin del push de alta");
    }


    playersref.once("value", function(snap) {
        //una vez actualizado el nuevo borramos para que vuelva a cargar
        mostrarToast("jugador/a registrado/a!!",2000);
        window.localStorage.removeItem("players"); 
        //loadPlayersFB(player.idusuario);  
        //console.log("savePlayerFB");          
        //window.location.href="./players.html";
    });   
}

    function saveMatchFB(email, idplayer, datamatch, publico){
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        var matchsref = firebase.database().ref("registros");
        console.log("guardamos partido");
        var resul = matchsref.push ({
            mail: email,
            player: idplayer,
            registro: datamatch,
            publico: publico
        }).key;
        //console.log("fin "+res);

        return resul;

        /*
        matchsref.once("value", function(snap) {
            //una vez actualizado el nuevo borramos para que vuelva a cargar            
            console.log("partido guardado");
             window.localStorage.removeItem("playerpartidos");                           
             window.sessionStorage.clear();                                     
             //window.top.location.href = "./index.html";
         }); 
         */
        /*
        matchsref.on('child_added', function(data) {
            //addCommentElement(postElement, data.key, data.val().text, data.val().author);
            //console.log("match key: " + resul);
            window.localStorage.removeItem("playerpartidos");                           
            window.sessionStorage.clear();                                     
            //window.top.location.href = "./index.html";
            //console.log("match datos: " + data.val().registro);
        });
        */

    }

    //este método nos permitirá buscar por cualquier campo de la tabla registro
    // label -> "player" value -> "idplayer"
    function cargaPartidosPorAtributoFB(label, value){ 
        if (!firebase.apps.length) {                
            firebase.initializeApp(firebaseConfig);
        }

        var arrpartidos = [];
        var partidosref = firebase.database().ref("registros");
        var partido;
        partidosref.orderByChild(label).equalTo(value).on("child_added", function(data2) {
            partido=registroDTO(data2);  
            //console.log(partido.registro);          
            arrpartidos.push(partido);
        });
        partidosref.once("value",function(snap2){
            //window.localStorage.playerpartidos=JSON.stringify(arrpartidos);   
            //console.log("llamar printInformacion");  
            retCargaPartidosPorAtributo(arrpartidos); //metodo de estadisticasglobales.js 
            //printInformacion(arrpartidos, ";", all);   //metodo de estadisticasglobales.js        
            //console.log("fin partidosref"); 
        });

    }


    function registroDTO(obj){
        var partido = {};
        
        partido.mail=obj.val().mail;
        partido.player=obj.val().player;
        partido.registro=obj.val().registro;
        if (obj.val().publico !=null){            
            partido.publico = obj.val().publico;
        }else{            
            obj.val().publico = 0;
        }
        if (obj.val().likes !=null){            
            partido.likes = obj.val().likes;
        }else{            
            partido.likes = 0;
        }
        partido.idpartido=obj.key;
       
        return partido;
    }

    function deletePartidoFB(key, retorno){
        if (!firebase.apps.length) {                
            firebase.initializeApp(firebaseConfig);
        } 

       //console.log("Vamos a borrar");
        var partidosdeleteref = firebase.database().ref("registros/"+key);
        partidosdeleteref.remove()
            .then(function() {
                //console.log("Remove "+key+" succeeded.");
                window.sessionStorage.removeItem("detalleidpartido");
                mostrarToast("partido borrado..", 3000);
                if(retorno==null){
                    //si la variable retorno no está informada que vuelva a estadisticas
                    window.location.href="./estadisticasglobales.html"
                }           
                
            })
            .catch(function(error) {                
                console.log("Remove "+key+" failed: " + error.message);
                mostrarToast("Remove "+key+" failed: " + error.message, 5000);
            });       
    }

    function deleteByIdPlayerFB(idplayer,retorno){
        if (!firebase.apps.length) {                
            firebase.initializeApp(firebaseConfig);
        } 
        console.log("vamos a borrar los partidos de "+idplayer);
        
        var players = firebase.database().ref("registros");
        players.orderByChild("player").equalTo(idplayer).on("child_added", function(data2) {
                mostrarToast("borrando partidos ...", 2000);
                //console.log("borro "+data2.key);
                deletePartidoFB(data2.key,"");
                //doc.ref.delete();
            
        });
        players.once("value",function(snap2){
            //console.log("he acabado de borrar los partidos ");     
            var player = firebase.database().ref("jugadores/"+idplayer); 
            player.remove()
            .then(function() {               
                mostrarToast("jugador/a borrado/a..", 2000);
                //como hemos borrado un player, se debe volver a cargar los players del usuario
                window.localStorage.removeItem("players");
                if(retorno==null){
                    //si la variable retorno no está informada que vuelva a estadisticas
                    //window.location.href="./players.html";
                    retdeleteByIdPlayer();
                }                           
            })
            .catch(function(error) {                
                console.log("Remove "+key+" failed: " + error.message);
                mostrarToast("Remove "+key+" failed: " + error.message, 5000);
            });
        });
    }

function cargaPartidosPlayersSeguidosByAttributesFB(label, value, max){
    if (!firebase.apps.length) {                
        firebase.initializeApp(firebaseConfig);
    } 
    //console.log("vamos a cargar los partidos de players seguidos por "+idclaveusuario);
    //var i=0;
    var arrpartidosseguidos = [];
    var partidosplayers = firebase.database().ref("seguidosregistros").limitToLast(max);//nos traemos los max últimos partidos
    partidosplayers.orderByChild(label).equalTo(value).on("child_added", function(data2) {
            
        //console.log("cargo -> "+data2.key);
        partidoseguido=seguidosregistrosDTO(data2);               
        arrpartidosseguidos.push(partidoseguido); 
        
        //agregarFila(data2.val().registropartido, i, data2.val().idpartido, data2.val().like);
        //i++;
        
    });
    
    partidosplayers.once("value",function(snap2){
        window.localStorage.seguidospartido=JSON.stringify(arrpartidosseguidos);   
        //console.log("llamar printInformacion");            
        //printInformacion(arrpartidosseguidos, ";");   //metodo de followedpartidos.js        
        filtrarInformacion(arrpartidosseguidos);
        //console.log("fin partidosref "+i); 
        //i++;
    });
    
}

function seguidosregistrosDTO(obj){

    var seguidosregistro = {};
        
    seguidosregistro.idpartido=obj.val().idpartido;
    seguidosregistro.registropartido=obj.val().registropartido;
    seguidosregistro.idplayer=obj.val().idplayer;

    seguidosregistro.idusuario=obj.val().idusuario;
    seguidosregistro.like=obj.val().like;
    seguidosregistro.idseguidosregistro=obj.key;
       
    return seguidosregistro;
}

function processMatchFollowedByPlayerFB(idplayer, idpartido, datamatch, retorno,top){
    if (!firebase.apps.length) {                
        firebase.initializeApp(firebaseConfig);
    } 
    //console.log("vamos a guardar el partido para seguidores de "+idplayer);

    //var arrfollowed = [];
    var idusuariofollowed="";
    var followedplayers = firebase.database().ref("followed");
    var total=0;
    followedplayers.orderByChild("idplayer").equalTo(idplayer).on("child_added", function(data2) {
        //followed=followedDTO(data2);            
        //arrfollowed.push(followed);
        idusuariofollowed = data2.val().idusuario;
        //console.log("el user "+idusuariofollowed+ " es seguidor");
        saveMatchFollowedByPlayerFB(idplayer, idusuariofollowed, idpartido, datamatch);
        total++;
    });
    followedplayers.once("value",function(snap2){
        //window.localStorage.players=JSON.stringify(arrplayers);  
        //console.log("partido followed guardado");
        if(total>0){
            mostrarToast("partido publicado...",3000);
            updateRegistroByAtributoFB(idpartido,"publico",1, retorno, top);
        }else{
            mostrarToast("no hay seguidores...",3000);           
            updateRegistroByAtributoFB(idpartido,"publico",0, retorno, top);            
            
        }
        
    });
}

function saveMatchFollowedByPlayerFB(idplayer, idusuario, idpartido, registro){
    if (!firebase.apps.length) {                
        firebase.initializeApp(firebaseConfig);
    }
    console.log("save el partido "+idpartido+" para seguidor de "+idusuario);
    var idplayeridusuarioFK=idplayer+idusuario;

    var followedmatchsref = firebase.database().ref("seguidosregistros");
    console.log("guardamos partido");
    followedmatchsref.push ({
        idpartido:idpartido,
        idplayer:idplayer,
        idusuario:idusuario,    
        idplayeridusuario:idplayeridusuarioFK,
        like: 0,
        registropartido: registro
    });
}

function deleteMatchesFollowedByIdPartidoFB(idpartido, retorno, updatePartido){
    if (!firebase.apps.length) {                
        firebase.initializeApp(firebaseConfig);
    }
    //console.log("borrar el partido follwers "+idpartido);
    var total=0;
    var idSeguidosPartido;
    var delmatchfollowed = firebase.database().ref("seguidosregistros");

    delmatchfollowed.orderByChild("idpartido").equalTo(idpartido).on("child_added", function(data2) {
        
        idSeguidosPartido = data2.key;
        //console.log("vamos a borrar "+idSeguidosPartido);
        //console.log("vamos a deleteMatchFollowedByIdSeguidosRegistrosFB");
        total++;
        deleteMatchFollowedByIdSeguidosRegistrosFB(idSeguidosPartido);        
        //console.log("volvemos a deleteMatchFollowedByIdSeguidosRegistrosFB y total es "+total);
        
    });

    delmatchfollowed.once("value",function(snap2){
        //window.localStorage.players=JSON.stringify(arrplayers);  
        //console.log("fin deleteMatchesFollowedByIdPartidoFB total="+total);
        if(total>0){
            //console.log("vamos a actualizar  "+idpartido+" publico a "+0);
            mostrarToast("publicación eliminada...",3000);
            if (updatePartido){
                updateRegistroByAtributoFB(idpartido, "publico", 0, retorno,false);
            }
        }else{
            mostrarToast("no hay seguidores...",3000);
        }
        
    });

}

function deleteMatchFollowedByIdSeguidosRegistrosFB(IdIdSeguidosRegistros){
    if (!firebase.apps.length) {                
        firebase.initializeApp(firebaseConfig);
    }
    console.log("estamos en deleteMatchFollowedByIdSeguidosRegistrosFB");
    var partidosFollowedDeleteref = firebase.database().ref("seguidosregistros/"+IdIdSeguidosRegistros);
    partidosFollowedDeleteref.remove();
 
}

function updateRegistroByAtributoFB(idpartido, label, value, retorno, top){
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    var accion="registros/"+idpartido;
        
    var updateregistroref = firebase.database().ref(accion);
    switch (label){
        case "publico": 
            //console.log("actualizamos publico "+ value);
            updateregistroref.update({
                publico: value
            });
            break;
        case "likes":
            //console.log("actualizamos likes "+ value);
            updateregistroref.update({
                likes: value
            });
            break;
        default:
    } 
    

    updateregistroref.once("value",function(snap2){
        //window.localStorage.players=JSON.stringify(arrplayers);  
        //console.log("fin updateRegistroByAtributoFB");
        //borramos el detalleidpartido para forzar que recargue los partidos del usuario
        window.sessionStorage.removeItem("detalleidpartido");

        if(retorno!=null){
            //si la variable retorno no está informada que vuelva a estadisticas     
            if (top){
                window.top.location.href=retorno;
            }else{
                window.location.href=retorno;
            }            
        }
        
    });
}
/*
function cargaPartidoByKeyFB(idpartido){ 
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    var partidosref = firebase.database().ref("registros/"+idpartido);
    var partido;

    partidosref.once("value", function(data2) {
        partido=registroDTO(data2);  
        //console.log("carga partido "+partido.mail);
        return partido;
    });
}
*/
function agregarLikePartidoFB(idpartido){
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    //primero buscamos el partido
    //var partido = cargaPartidoByKeyFB(idpartido);
    //console.log("valorlikes "+valorlikes);
    //console.log("partido "+partido.idpartido+" mail "+partido.mail+" likes "+partido.likes);

    var partidosref = firebase.database().ref("registros/"+idpartido);
    var partido;

    partidosref.once("value", function(data2) {
        partido=registroDTO(data2);  
        var likescargados = partido.likes;
        //console.log("mail ="+partido.mail);
        //console.log("valor likes ="+likescargados);
        likescargados++;
        //console.log("valor likes +1 ="+likescargados);
        var updatelikepartidoref = firebase.database().ref("registros/"+idpartido);

        updatelikepartidoref.update({
            likes: likescargados
        });
        console.log("likes en partidos hecho");
    });    
}

function agregarLikeSeguidoPartidoFB(idseguidosregistro){
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    var updatelikeseguidospartidoref = firebase.database().ref("seguidosregistros/"+idseguidosregistro);

    updatelikeseguidospartidoref.update({
        like: 1
    });

    console.log("likes en seguidos hecho");
}

function loadFollowedPlayersFB(idusuario, retorno){
    if (!firebase.apps.length) {                
        firebase.initializeApp(firebaseConfig);
    } 
    //console.log("vamos a guardar el partido para seguidores de "+idplayer);

    //var arrfollowed = [];
    //var playerfollowed;
    var arrfollowedplayers = [];
    var followedplayers = firebase.database().ref("followed");
    //var total=0;
    followedplayers.orderByChild("idusuario").equalTo(idusuario).on("child_added", function(data2) {
        //followed=followedDTO(data2);            
        //arrfollowed.push(followed);
        //playerfollowed=followedDTO(data2);
        arrfollowedplayers.push(followedDTO(data2));
        //console.log("el user "+idusuariofollowed+ " es seguidor");
        
        //total++;
    });
    followedplayers.once("value",function(snap2){
        //window.localStorage.players=JSON.stringify(arrplayers);  
        //console.log("partido followed guardado");
        //if(total>0){  
        window.sessionStorage.followedplayers=JSON.stringify(arrfollowedplayers);       
        if (arrfollowedplayers.length>0){
           
            if (retorno=="./followers.html"){
                cargarTablaPlayers(arrfollowedplayers,"unfollow.png", "unfollow");  
            }
        }else{
            mostrarToast("no sigues a nadie :(",3000);    
        }        
    });
}

function followedDTO(obj){
    var followed = {};
        
    followed.categoria=obj.val().categoria;
    followed.equipo=obj.val().equipo;    
    followed.idplayer=obj.val().idplayer;
    followed.idusuario=obj.val().idusuario;    
    followed.nombre=obj.val().nombre;   
    followed.temporada=obj.val().temporada;  
    followed.idfollowed=obj.key;
       
    return followed;
}

function getPlayersByFiltrosBusquedaFB(filtrosbusqueda){
    if (!firebase.apps.length) {                
        firebase.initializeApp(firebaseConfig);
    }

    var arrplayers = [];
    var label="";
    var value="";

    if (filtrosbusqueda.mail.length > 0){
        //si tenemos mail filtramos por mail del usuario
        label="mail";
        value=filtrosbusqueda.mail;
    }else{
        //si no filtramos por el genero del player
        label="genero";
        value=filtrosbusqueda.genero;
    }

    var playersrefs = firebase.database().ref("jugadores");
    //var total=0;
    playersrefs.orderByChild(label).equalTo(value).on("child_added", function(data2) {
       
        arrplayers.push(playerDTO(data2));
        
    });
    playersrefs.once("value",function(snap2){
        console.log("total arrplayers ="+arrplayers.length);
        filtrarResultadoUsuarios(arrplayers, filtrosbusqueda);      
    });
}

function saveFollowedFB(playerfollow){
    if (!firebase.apps.length) {                
        firebase.initializeApp(firebaseConfig);
    }

    
    var playerfollowref = firebase.database().ref("followed");
    console.log("guardamos partido");
    var resul=playerfollowref.push ({

        categoria:playerfollow.categoria,
        equipo:playerfollow.equipo,
        idplayer:playerfollow.idplayer,
        idusuario:playerfollow.idusuario,
        nombre:playerfollow.nombre,
        temporada:playerfollow.temporada

    }).key;    

    return  resul;

}

function agregarFollowerPlayerFB(idplayer, tipo){
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }    

    var playersref = firebase.database().ref("jugadores/"+idplayer);
    var jugador;

    playersref.once("value", function(data2) {
        
        jugador=playerDTO(data2);
        var seguidores = jugador.followers;
        
        //console.log("mail ="+partido.mail);
        //console.log("valor likes ="+likescargados);
        if (tipo==null){
            //sumamos followers
            seguidores++;
        }else if (tipo == 0 && seguidores>0){
            //restamos followers
            seguidores--;
        }
        
        //console.log("valor likes +1 ="+likescargados);
        var updateplayersref = firebase.database().ref("jugadores/"+idplayer);

        updateplayersref.update({
            followers: seguidores
        });
        retornoFollow();
        //console.log("followers en players hecho");
    });    
}

function unfollowplayerFB(idfollowed, idplayeridusuario){
    
    if (!firebase.apps.length) {                
        firebase.initializeApp(firebaseConfig);
    }
    //console.log("estamos en unfollowplayer borramos");
    var followedDeleteref = firebase.database().ref("followed/"+idfollowed);
    followedDeleteref.remove();
    //console.log("borrado "+idfollowed);

    followedDeleteref.once("value", function(data2) {
        //borramos los partidos publicados
        //console.log("borramos los partidos");
        var delmatchfollowed = firebase.database().ref("seguidosregistros");

        delmatchfollowed.orderByChild("idplayeridusuario").equalTo(idplayeridusuario).on("child_added", function(data2) {
            
            idSeguidosPartido = data2.key;
            //total++;
            //console.log("borro partido");
            deleteMatchFollowedByIdSeguidosRegistrosFB(idSeguidosPartido);        
            //console.log("volvemos a deleteMatchFollowedByIdSeguidosRegistrosFB y total es "+total);
            
        });

        delmatchfollowed.once("value", function(data2) {
            //console.log("volvemos a unfollowplayerFB");
            retunfollowplayer();
        });

    });

}

/*
function getPartidosByPlayerFB(idplayer, idusuario){

    if (!firebase.apps.length) {                
        firebase.initializeApp(firebaseConfig);
    }
    console.log("estamos en processMatchToFollowByPlayerFB");
    var partidosplayerref = firebase.database().ref("followed/"+idfollowed);
    
    followedDeleteref.once("value", function(data2) {


}
*/