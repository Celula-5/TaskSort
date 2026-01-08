let ListaTareas = []

function mostrarFormulario() {
    document.getElementById("formTarea").style.display = "block";
}

function agregarTarea(){

    const titulo = document.getElementById("titulo").value
    const descripcion = document.getElementById("descripcion").value
    const prioridad = document.getElementById("prioridad").value
    const tarea = {
        titulo,
        descripcion,
        prioridad
    }

    ListaTareas.push(tarea)
    console.log(ListaTareas)
    alert("tarea agregada")
    

    document.getElementById("formTarea").reset()
    return false

}

