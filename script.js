let ListaTareas = []

function mostrarFormulario() {
    const contenedor = document.getElementById("formContainer");
    contenedor.style.display =
        contenedor.style.display === "none" ? "block" : "none";
}

function agregarTarea() {
    const titulo = document.getElementById("titulo").value.trim()
    const descripcion = document.getElementById("descripcion").value.trim()
    const prioridad = document.getElementById("prioridad").value.trim()
    if (!titulo) {
        alert("Debe ingresar un título válido")
        return false
    }
    
    if (!descripcion) {
        alert("Debe ingresar una descripción válida")
        return false
    }

    const tarea = { titulo, descripcion, prioridad }

    ListaTareas.push(tarea)
    guardarTareas()

    crearTarjeta(tarea)
    aplicarFiltro()
    actualizarContadores()

    document.getElementById("formContainer").style.display = "none"
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
        ListaTareas = ListaTareas.filter(t => t !== tarea);

        guardarTareas();

        actualizarContadores();
    });

    tarjeta.appendChild(btnEliminar);

    contenedor.appendChild(tarjeta)
}


function actualizarContadores() {
    const filtro = document.getElementById("filtroPrioridad")

    const total = ListaTareas.length
    const altas = ListaTareas.filter(t => t.prioridad === "ALTA").length
    const medias = ListaTareas.filter(t => t.prioridad === "MEDIA").length
    const bajas = ListaTareas.filter(t => t.prioridad === "BAJA").length

    filtro.querySelector("option[value='']").textContent = `Todas (${total})`
    filtro.querySelector("option[value='ALTA']").textContent = `Alta (${altas})`
    filtro.querySelector("option[value='MEDIA']").textContent = `Media (${medias})`
    filtro.querySelector("option[value='BAJA']").textContent = `Baja (${bajas})`
}


function esconderTarjetas() {
    const btn = document.getElementById("toggleTareas")
    const contenedor = document.getElementById("contenedorTareas")

    btn.addEventListener("click", () => {
        contenedor.classList.toggle("oculto")
    })
}

function filtroTarea() {
    document.getElementById("filtroPrioridad")
        .addEventListener("change", aplicarFiltro)
}

function guardarTareas() {
    localStorage.setItem("tareas", JSON.stringify(ListaTareas))
}

function cargarTareas() {
    const tareasGuardadas = localStorage.getItem("tareas")

    if (tareasGuardadas) {
        ListaTareas = JSON.parse(tareasGuardadas)

        ListaTareas.forEach(tarea => {
            crearTarjeta(tarea)
        })

        actualizarContadores()
        aplicarFiltro()
    }
}


function aplicarFiltro() {
    const prioridad = document.getElementById("filtroPrioridad").value
    const tarjetas = document.querySelectorAll("#contenedorTareas article")

    tarjetas.forEach(tarjeta => {
        tarjeta.style.display =
            !prioridad || tarjeta.dataset.prioridad === prioridad
                ? "block"
                : "none"
    })
}

document.addEventListener("DOMContentLoaded", () => {
    esconderTarjetas()
    filtroTarea()
    actualizarContadores()
    cargarTareas()

})