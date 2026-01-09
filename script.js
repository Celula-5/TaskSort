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
    aplicarFiltro()
    esconderTarjetas(tarea)
    filtroTarea(tarea)
    alert("tarea agregada")
    
    document.getElementById("formTarea").style.display = "none";
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

        tarjeta.dataset.prioridad = tarea.prioridad

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.style.marginTop = "10px";
    btnEliminar.addEventListener("click", () => {
        tarjeta.remove(); 
    });

    tarjeta.appendChild(btnEliminar);

    contenedor.appendChild(tarjeta)
}

let isVisible = false;
const btnToogle = document.getElementById("toggleTasks");
const textVisibility = document.getElementById("Text-visibility");
const container = document.getElementById("Taskcontainer");

function toggleTasks(){

    isVisible = !isVisible;

    if (isVisible){
        textVisibility.textContent = "Hide tasks";
        btnToogle.classList.add("active");
        container.classList.style = "none";
    }
    else{
        textVisibility.textContent = "Show tasks";
        btnToogle.classList.add("active");
        container.classList.style = "block";
    }
}

if(btnToogle){
    btnToogle.addEventListener("click", toggleTasks)
}



function filtroTarea(){
    const filter = document.getElementById("Priority-filter")
    filter.addEventListener("change", aplicarFiltro)
}

function aplicarFiltro() {
    const filter = document.getElementById("Priority-filter")
    const priority = filtro.value.toUpperCase()
    const cards = document.querySelectorAll("#contenedorTareas article")

    cards.forEach(card => {
        const priorityCard = card.dataset.prioridad

        if (!priority|| priorityCard === priority) {
            card.style.display = "inline-block"
        } else {
            card.style.display = "none"
        }
    })
}