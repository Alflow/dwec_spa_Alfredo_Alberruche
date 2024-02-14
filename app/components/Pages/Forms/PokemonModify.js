import config_db from "../../../helpers/config_db.js";
import { envio } from "../../../helpers/peticion.js";
export default function EntrenadoresInsert() {
  const $form = document.createElement("form");

  $form.setAttribute("id", "form-modificar-pokemon");

  $form.innerHTML = `
  <div class="mb-3">
  <label for="id" class="form-label">ID del pokemon</label>
  <input type="text" class="form-control" name="id" id="id">
  
</div>
<div class="mb-3">
  <label for="name" class="form-label">Nombre del Pokemon</label>
  <input type="text" class="form-control" name="name" id="name">
</div>

</div>
<div class="mb-3">
  <label for="location" class="form-label">Localización del Pokemon</label>
  <input type="text" class="form-control" name="location" id="location">
</div> 

<div class="mb-3">
  <label for="type" class="form-label">Tipo del Pokemon</label>
  <input type="text" class="form-control" name="type" id="type">
</div>
<div class="mb-3">
  <label for="description" class="form-label">Descripción del pokemon</label>
  <input type="text" class="form-control" name="description" id="description">
</div> 
<div class="mb-3">
  <label for="img" class="form-label">URL de la Imagen</label>
  <input type="text" class="form-control" name="img" id="img">
</div> 

<button type="submit" class="btn btn-primary">Enviar</button>

`;
  $form.addEventListener("submit", (e) => {
    // console.log(e);
    e.preventDefault();
    let form = new FormData($form);

    let modifiedPokemon = Object.fromEntries(form);

    envio({
      url: `${config_db.POKEMON}/${modifiedPokemon.id}`,
      method: "PUT",
      datos: JSON.stringify(modifiedPokemon),
      cbSuccess: (data) => {
        console.log(data);
      },
    });
  });

  return $form;
}