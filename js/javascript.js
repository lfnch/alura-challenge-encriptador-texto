/*
*
*/

//Optenemos la instancia de los botones y elementos de html con los que vamos a trabajar
const SPAN_MENSAJE     = document.querySelector("#span_mensaje");
const INPUT_TEXTO      = document.querySelector("#input_texto");
const INPUT_RESULTADO  = document.querySelector("#input_resultado");
const BTN_ENCRIPTAR    = document.querySelector("#btn_encriptar");
const BTN_DESENCRIPTAR = document.querySelector("#btn_desencriptar");
const BTN_COPIAR       = document.querySelector("#btn_copiar");

/*
* restablecerFormulario
* Limpia el fomulario y lo devuelve a su valor original
* @void
*/
function restablecerFormulario()
{
    //Limpiamos los campos de texto
    mostrarMensaje('');
    INPUT_TEXTO.value     = "";
    INPUT_RESULTADO.value = "";

    //Restablecemos los botonos
    cambiarEstadoBotones(true);
    cambiarEstadoBotonCopiar(true);
}

/*
* mostrarMensaje
* Muestra en pantalla mensajes de alguna alerta de las validaciones
* @param : msj => cadena
* @void
*/
function mostrarMensaje(msj)
{
    SPAN_MENSAJE.innerHTML = msj;
}


/*
* inputEstaVacio
* Valida que la entrada de texto no exte vacia
* @return : boolean
*/
function inputEstaVacio()
{   
   return (INPUT_TEXTO.value.trim() != '') ? false: true;
}

/*
* cambiarEstadoBotones
* activa / desactiva botones, true para desactivado
* @param : estado => boolean
* @void
*/
function cambiarEstadoBotones(estado)
{
    BTN_ENCRIPTAR.disabled    = estado;
    BTN_DESENCRIPTAR.disabled = estado;
}

/*
* cambiarEstadoBotonCopiar
* activa / desactiva boton, true para desactivado
* @param : estado => boolean
* @void
*/
function cambiarEstadoBotonCopiar(estado)
{
    BTN_COPIAR.disabled = estado;
}

function esLetra(caracter)
{
    return /^[a-zA-Z]$/.test(caracter);
}

function esCaracterEspecial(caracter)
{
    return /[^a-zA-Z0-9]/.test(caracter);
}

function validar()
{
    cambiarEstadoBotones(true);
    mostrarMensaje('');
    if(!inputEstaVacio())
    {
        //Obtenemos el ultimo caracter escrito
        const ULTIMO_CARACTER = INPUT_TEXTO.value.charAt(INPUT_TEXTO.value.length -1);
        
        //Comprobamos que no sea caracter especial
        if(!esCaracterEspecial(ULTIMO_CARACTER))
        {
            INPUT_RESULTADO.value = ULTIMO_CARACTER;
        }
        else
        {
            mostrarMensaje('No se permiten caracteres especiales.');
        }
    }
}


restablecerFormulario();

/*
* Eventos
*/

//Evento al escribir en el campo
INPUT_TEXTO.addEventListener('keyup', () => 
{
    validar();
});

//Evento click en boton encriptar
BTN_ENCRIPTAR.addEventListener('click', () => 
{
   
});

//Evento click en boton desencriptar
BTN_DESENCRIPTAR.addEventListener('click', () => 
{
       
});

//Evento click en boton copiar
BTN_COPIAR.addEventListener('click', () => 
{
   
});