import "./style.css";

const form = document.getElementById("tareaForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  //capturar datos

  const titulo = document.getElementById("titulo").value;
  const completada = document.getElementById("completada").checked;

  const tarea = {
    titulo: titulo,
    completada: completada,
  };
  try {
    const response = await fetch("http://localhost:3000/tareas", {
      method: "POST",
      body: JSON.stringify(tarea),
    });

    if (response.ok) {
      form.reset();
      cargarTarea();
    }
  } catch (error) {
    console.log("ERROR!!!");
  }
});

const imprimir = document.getElementById("mostrar");

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
    const fila = document.createElement("tr");
    const idColum = document.createElement("td");

    idColum.textContent = tarea.id;
    fila.appendChild(idColum);

    const tituColum = document.createElement("td");

    tituColum.textContent = tarea.titulo;
    fila.appendChild(tituColum);

    const compleColum = document.createElement("td");

    compleColum.textContent = tarea.completada;
    fila.appendChild(compleColum);
    imprimir.appendChild(fila);
  });
};
