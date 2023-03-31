export function valida(input) {       //este input es el que va a estar ligado al archivo que se vaya generando y el export no s permitira usarlo en otros lugares la informacion
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]) { 
      validadores[tipoDeInput](input);
    }

    if(input.validity.valid){                           // utilizamos este if si es valido o el validity si estrue quitar ala clse y si es false signifaca que no es valido y va a agregarla
        input.parentElement.classList.remove("input-container--invalid"); 
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }   else {
        input.parentElement.classList.add("input-container--invalid"); 
        input.parentElement.querySelector(".input-message-error").innerHTML = 
        mostrarMensajeDeError(tipoDeInput,input);
    }
}

const tipoDeErrores  = [
    "valueMissing",
    "typeMismatch",
    "patterMismatch",
    "customError"
]


const mensajesDeError ={         //cuando el ususario est ainteractuando, en caso de no ser valido aqui podremos checar en cada uno de los elementos si es valido o no, 
    nombre:{
        valueMissing: "El campo nombre no puede estar vacio",  //la ventaja de estos elementos se traen los errores en diferentes idiomas aquis se podan solucionar los valos si estan con esta organizacion
    },
    email:{
        valueMissing: "El campo  enail no puede estar vacio",
        typeMismatch: "El correo no es valido"
    },
    password: {
        valueMissing: "El campo password no puede estar vacio",
        patterMismatch: "Al menos 6 caracteres, maximo12, debe contener una letra minuscula, una letra mayuscula, un numero y no puede contener caracteres especiales.",
    },
    nacimiento:{
        valueMissing: "El campo nacimiento no puede estar vacio",
        customError: "Debes tener al menos 18 anos de edad",
    },
    numero:{
        valueMissing: "Este campo no puede estar vacio",
        patterMismatch: "Ele formato requerido es XXXXXXXXXX 10 numeros",
    },
    direccion:{
        valueMissing: "Este campo no puede estar vacio",
        patterMismatch: "La direccion debe contener entre 10 a 40 caracteres.",      
    },
    ciudad:{
        valueMissing: "Este campo no puede estar vacio",
        patterMismatch: "La direccion debe contener entre 10 a 40 caracteres.",      
    },
    estado:{
        valueMissing: "Este campo no puede estar vacio",
        patterMismatch: "La direccion debe contener entre 10 a 40 caracteres.",      
    },
};

const validadores ={
    nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeImput,input) {
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
      if (input.validity[error]) { 
        console.log(tipoDeInput, error);
        console.log(input.validity[error]);
        console.log(mensajesDeError[tipoDeInput][error]);
        mensaje = (mensajesDeError[tipoDeInput][error]);          
    }
  });
  return mensaje;
} 

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)) { 
       mensaje = "Debes tenes al menos 18 anos de edad";
    }
    
    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date(); 
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );  
    return diferenciaFechas <= fechaActual; //podemos invertir fechaActual<=diferenciafechas para cuando querramos saber si es menor, para no cambiar sigo <= u =>
}