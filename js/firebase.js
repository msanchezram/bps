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
        players.orderByChild("idusuario").equalTo(idusuario).on("child_added", function(data2) {
            jugador=playerDTO(data2);            
            arrplayers.push(jugador);
        });
        players.once("value",function(snap2){
            window.localStorage.players=JSON.stringify(arrplayers);  
            if (retorno!=null){
                if (retorno=="./players.html"){
                    cargarTablaPlayers(arrplayers);  
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

    function saveMatchFB(email, idplayer, datamatch){
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        var matchsref = firebase.database().ref("registros");
  
        //var ref = new Firebase('https://testbps-f9198.firebaseio.com');

        //var matchsref = ref.child("registros");
        //console.log("inicio del push")
        matchsref.push ({
            mail: email,
            player: idplayer,
            registro: datamatch
        });


        matchsref.once("value", function(snap) {
            //una vez actualizado el nuevo borramos para que vuelva a cargar
            
             window.localStorage.removeItem("playerpartidos");                           
             window.sessionStorage.clear();                                     
             window.top.location.href = "./index.html";
         }); 
    }

    //este método nos permitirá buscar por cualquier campo de la tabla registro
    // label -> "player" value -> "idplayer"
    function cargaPartidosPorAtributo(label, value, all){ 
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
            window.localStorage.playerpartidos=JSON.stringify(arrpartidos);   
            //console.log("llamar printInformacion");            
            printInformacion(arrpartidos, ";", all);   //metodo de estadisticasglobales.js        
            //console.log("fin partidosref"); 
        });

    }


    function registroDTO(obj){
        var partido = {};
        
        partido.mail=obj.val().mail;
        partido.player=obj.val().player;
        partido.registro=obj.val().registro;
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
                console.log("borro "+data2.key);
                deletePartidoFB(data2.key,"");
                //doc.ref.delete();
            
        });
        players.once("value",function(snap2){
            console.log("he acabado de borrar los partidos ");     
            var player = firebase.database().ref("jugadores/"+idplayer); 
            player.remove()
            .then(function() {               
                mostrarToast("jugador/a borrado/a..", 2000);
                //como hemos borrado un player, se debe volver a cargar los players del usuario
                window.localStorage.removeItem("players");
                if(retorno==null){
                    //si la variable retorno no está informada que vuelva a estadisticas
                    window.location.href="./players.html"
                }                           
            })
            .catch(function(error) {                
                console.log("Remove "+key+" failed: " + error.message);
                mostrarToast("Remove "+key+" failed: " + error.message, 5000);
            });
        });
    }


