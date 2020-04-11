function crearPartido(){
    //alert("Crear partido!!");
    window.sessionStorage.team =document.getElementById("fteam").value;
    window.sessionStorage.nombre =document.getElementById("fname").value;
    window.sessionStorage.categoria =document.getElementById("lcategoria").value;
    window.sessionStorage.fecha=document.getElementById("lfecha").value;
    window.sessionStorage.rival=document.getElementById("lrival").value;
    window.sessionStorage.complejidad=document.getElementById("complejidad").value;

    //alert(window.sessionStorage.nombre+window.sessionStorage.fecha+window.sessionStorage.rival+window.sessionStorage.complejidad);

    window.location.href = './plantillapartido.html';
}

function carga(){

    if (window.sessionStorage.modificadatospartido==1){
        document.getElementById("fteam").value=window.sessionStorage.team;
        document.getElementById("fname").value=window.sessionStorage.nombre ;
        document.getElementById("lcategoria").value=window.sessionStorage.categoria;
        document.getElementById("lfecha").value=window.sessionStorage.fecha;
        document.getElementById("lrival").value=window.sessionStorage.rival;
        document.getElementById("complejidad").value=window.sessionStorage.complejidad;
        
        document.getElementById("creapartido").value="Modificar datos del partido";
    }
    

}