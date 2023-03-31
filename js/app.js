import { valida } from "./validaciones.js";   //para jalar la info se coloca import, valida y enter .

const inputs = document.querySelectorAll("input");     //esta funcion va a agregar todos los input y le va a agregar el abs lainer del blur a la informacion de los codigos de abajo

inputs.forEach(( input )=> {
    input.addEventListener("blur", (input) => {
      valida(input.target);                      //cuando mande la funcion de arriba la info,el foco  va a mandar a esta funcion que es valida,va a revisar el input y lo revisara
    });
});