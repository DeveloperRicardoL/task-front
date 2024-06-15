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
  const lista = document.createElement("ol");
  tareas.forEach((tarea) => {
    const item = document.createElement("li");
    item.textContent = `ID: ${tarea.id}, Título: ${tarea.titulo}, Completada: ${tarea.completada}`;
    lista.appendChild(item);
    console.log(lista.appendChild(item));
  });
  imprimir.appendChild(lista);
};
