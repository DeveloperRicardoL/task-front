import "./style.css";

const form = document.getElementById("tareaForm");
const imprimir = document.getElementById("mostrar");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  //capturar datos
  const id = document.getElementById("tareaId").value;
  const titulo = document.getElementById("titulo").value;
  const completada = document.getElementById("completada").checked;

  const tarea = {
    id: id,
    titulo: titulo,
    completada: completada,
  };
  if (!tarea.id) {
    await crearTareas(tarea);
  } else {
    await modificarDato(tarea);
  }
});

const crearTareas = async (tarea) => {
  try {
    const response = await fetch("http://localhost:3000/tareas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titulo: tarea.titulo,
        completada: tarea.completada,
      }),
    });

    if (response.ok) {
      form.reset();
      cargarTarea();
    } else {
      throw new Error("No se pudo crear la tarea");
    }
  } catch (error) {
    console.error(`Error!!!:  ${error}`);
  }
};

const cargarTarea = async () => {
  try {
    const response = await fetch("http://localhost:3000/tareas");
    if (response.ok) {
      const tareas = await response.json();
      imprimir.innerHTML = "";
      renderTarea(tareas);
    }
  } catch (error) {
    console.log("Error!!");
  }
};

const renderTarea = (tareas) => {
  tareas.forEach((tarea) => {
    // ses crean filas "tr" y columnas "td" de forma dinamica
    const fila = document.createElement("tr");

    const idColum = document.createElement("td");
    idColum.textContent = tarea.id;
    fila.appendChild(idColum);

    const tituColum = document.createElement("td");
    tituColum.textContent = tarea.titulo;
    fila.appendChild(tituColum);

    const compleColum = document.createElement("td");
    compleColum.textContent = tarea.completada; //?"si":"no";
    fila.appendChild(compleColum);

    const elimColum = document.createElement("td");
    const elimBoton = document.createElement("button");
    elimBoton.classList.add("btn-icon");

    const iconoElim = document.createElement("img");
    iconoElim.src = "./assets/img/icons8-eliminar-25.png";
    elimBoton.appendChild(iconoElim);

    elimBoton.addEventListener("click", () => eliminarDato(tarea.id));
    elimColum.appendChild(elimBoton);
    fila.appendChild(elimColum);

    const modifColum = document.createElement("td");
    const modifBoton = document.createElement("button");
    modifBoton.classList.add("btn-icon");

    const iconModif = document.createElement("img");
    iconModif.src = "./assets/img/icons8-editar-archivo-de-texto-25.png";
    modifBoton.appendChild(iconModif);
    modifBoton.addEventListener("click", () => setDatos(tarea));
    modifColum.appendChild(modifBoton);
    fila.appendChild(modifColum);

    imprimir.appendChild(fila);
  });
};

const eliminarDato = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/tareas/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      cargarTarea();
    }
  } catch (error) {
    console.error(`Error al eliminar la tarea con ID ${id}, ${error}`);
  }
};

const modificarDato = async (tarea) => {
  try {
    const response = await fetch(`http://localhost:3000/tareas/${tarea.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titulo: tarea.titulo,
        completada: tarea.completada,
      }),
    });
    if (response.ok) {
      form.reset();
      cargarTarea();
    }
  } catch (error) {
    console.error(`Error al modificar la tarea con ID ${tarea.id}, ${error}`);
  }
};

const setDatos = async (tarea) => {
  document.getElementById("tareaId").value = tarea.id;
  document.getElementById("titulo").value = tarea.titulo;
  document.getElementById("completada").value = tarea.completada;
};
