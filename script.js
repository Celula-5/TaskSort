let ListaTareas = []

function mostrarFormulario() {
    const contenedor = document.getElementById("formContainer");
    contenedor.style.display =
        contenedor.style.display === "none" ? "block" : "none";
}

function agregarTarea() {
    const titulo = document.getElementById("titulo").value
    const descripcion = document.getElementById("descripcion").value
    const prioridad = document.getElementById("prioridad").value

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


function crearTarjeta(tarea) {
    const contenedor = document.getElementById("contenedorTareas")

    const col = document.createElement("div")
    col.className = "col-12 col-md-6 col-lg-4"

    const tarjeta = document.createElement("article")
    tarjeta.className = "card h-100 p-3"
    tarjeta.dataset.prioridad = tarea.prioridad

    tarjeta.innerHTML = `
        <h5>${tarea.titulo}</h5>
        <p>${tarea.descripcion}</p>
        <strong>Prioridad: ${tarea.prioridad}</strong>
        <br><br>
        <select class="form-select mb-2">
            <option>Pendiente</option>
            <option>En proceso</option>
            <option>Completada</option>
        </select>
    `

    const btnEliminar = document.createElement("button")
    btnEliminar.textContent = "Eliminar"
    btnEliminar.className = "btn btn-danger btn-sm"

    btnEliminar.onclick = () => {
        ListaTareas = ListaTareas.filter(t => t !== tarea)
        guardarTareas()
        actualizarContadores()
        col.remove()
    }

    tarjeta.appendChild(btnEliminar)
    col.appendChild(tarjeta)
    contenedor.appendChild(col)
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
 