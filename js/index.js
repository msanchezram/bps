function borrarhistorial(){
    if (confirm('Estás seguro de borrar todo el historial de partidos?')){
        window.localStorage.clear();
    }
}