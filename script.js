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
    crearTarjeta(tarea)
    esconderTarjetas(tarea)
    alert("tarea agregada")
    

    document.getElementById("formTarea").reset()
    return false

}

function crearTarjeta(tarea){
    const contenedor = document.getElementById("contenedorTareas")

    const tarjeta = document.createElement("article")
    tarjeta.style.textAlign = ("center")
    tarjeta.style.border = "1px solid #000"
    tarjeta.style.padding = "10px"
    tarjeta.style.margin = ("10px 0")
    tarjeta.style.marginLeft = ("10px")
    tarjeta.style.maxWidth = "auto"
    tarjeta.style.display = "inline-block"

    tarjeta.innerHTML = 
        "<h3>" + tarea.titulo + "</h3> " +
        "<p>" + tarea.descripcion + "</p>" +
        "<strong>prioridad:" + tarea.prioridad + "</strong>" +
        "<br><br>" +
        "<label>Estado: </label>" +
        "<select>" +
            "<option value='pendiente'>Pendiente</option>" +
            "<option value='en_proceso'>En proceso</option>" +
            "<option value='completada'>Completada</option>" +
        "</select>"
        

    contenedor.appendChild(tarjeta)
}

function esconderTarjetas(){
    const btnToogle = document.getElementById("toggleTareas")
    const contenedor = document.getElementById("contenedorTareas")

    btnToogle.addEventListener("click", () => {
        contenedor.classList.toggle("oculto")
    })
}