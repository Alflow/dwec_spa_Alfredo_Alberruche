import Header from "./components/Header/Header.js";
import Main from "./components/Main.js";
import Router from "./components/Router.js";
import config_db from "./helpers/config_db.js";
import { envioLogin } from "./helpers/peticion.js";

export default function App() {
  const $root = document.getElementById("root");

  $root.innerHTML = "";

  // Importamos header
  $root.appendChild(Header());
  if (localStorage.getItem("authToken")) {
    document.getElementById("gestion_pokemon").classList.remove("d-none");
    document.getElementById("logInBtn").classList.add("d-none");
    document.getElementById("logOutBtn").classList.remove("d-none");
  } else {
    document.getElementById("gestion_pokemon").classList.add("d-none");
    document.getElementById("logInBtn").classList.remove("d-none");
    document.getElementById("logOutBtn").classList.add("d-none");
  }
  // EN PRUEBAS...
  document.body.addEventListener("submit", function (e) {
    if (e.target && e.target.id === "loginForm") {
      e.preventDefault();
      const form = new FormData(e.target);
      let datos = {};
      form.forEach((value, key) => {
        datos[key] = value;
      });

      // Aquí va la lógica de envío de datos, como la llamada a envioLogin
      envioLogin({
        url: config_db.LOGIN,
        method: "POST",
        datos: JSON.stringify(datos),
        cbSuccess: (response) => {
          if (response.error) {
            // manejar el error
            console.error(response.error);
            alert(
              "Error al iniciar sesión. Por favor, verifica las credenciales."
            );
          } else {
            // GUARDAR LA COOKIE
            localStorage.setItem("authToken", response.data.token);
            document
              .getElementById("gestion_pokemon")
              .classList.remove("d-none");

            alert(`Bienvenido ${response.message}`);
            console.log(response.data.token); // DESCOMENTAR PARA ENTREGA FINAL
            document.getElementById("logInBtn").classList.add("d-none");
            document.getElementById("logOutBtn").classList.remove("d-none");

            // document.body.classList.remove("modal-open");
            const $modalDelete = document.getElementsByClassName(
              "modal-backdrop fade show"
            );
            $modalDelete[0].remove();
            window.location.reload();
          }
        },
      });
    }
  });

  const $botonLogout = document.getElementById("logOutBtn");
  $botonLogout.addEventListener("click", () => {
    localStorage.removeItem("authToken");
    document.getElementById("logInBtn").classList.remove("d-none");
    document.getElementById("logOutBtn").classList.add("d-none");
    window.location.hash = "#";
  });
  $root.appendChild(Main());
  Router();
}
