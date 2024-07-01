/*
 * Autor: Luis Felipe Nieves.
 * Fecha: 28/06/2024
 * Descripción: Logica para encriptador de texto challenge Alura
*/

/*
* Variables --------------------------------------------------------------------------------------------
*/

//Optenemos la instancia de los botones y elementos de html con los que vamos a trabajar
const SPAN_MENSAJE     = document.querySelector("#span_mensaje");
const INPUT_TEXTO      = document.querySelector("#input_texto");
const INPUT_RESULTADO  = document.querySelector("#input_resultado");
const BTN_ENCRIPTAR    = document.querySelector("#btn_encriptar");
const BTN_DESENCRIPTAR = document.querySelector("#btn_desencriptar");
const BTN_COPIAR       = document.querySelector("#btn_copiar");
const BTN_LIMPIAR      = document.querySelector("#btn_limpiar");

//Guarda en variable si el usuario cumple con los requisitos de validacion
//no espacios en blancos, no mayusculas, no caracteres especiales
let validacion_correcta= true;

/*
* Funciones ------------------------------------------------------------------------------------------
*/

/*
* restablecerFormulario
* Limpia el fomulario y lo devuelve a su valor original
* @void
*/
function restablecerFormulario()
{
    validacion_correcta= true;

    //Limpiamos los campos de texto
    mostrarMensaje('');
    INPUT_TEXTO.value     = '';
    INPUT_RESULTADO.value = '';

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
* textoVacio
* Valida que la entrada de texto no exte vacia
* @return : boolean
*/
function textoVacio(texto)
{   
   return (texto != '') ? false: true;
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

/*
* esCaracterEspecial
* @param : caracter => char
* @return boolean
*/
function esCaracterEspecial(caracter)
{
    return /[^a-zA-Z0-9 ]/.test(caracter);
}

/*
* validarCaracteresPermitidos
* Valida cada caracter para definir si es especial o no, 
* ya que caracteres especiales no son permitidos
* @void
*/
function validarCaracteresPermitidos()
{
    cambiarEstadoBotones(true);
    cambiarEstadoBotonCopiar(true);
    mostrarMensaje('');
    INPUT_RESULTADO.value = '';

    //Obtenemos el texto a encriptar
    let texto = INPUT_TEXTO.value.trim().toLowerCase();
    
    //Validamos campo no este vacio
    if(!textoVacio(texto))
    {
       //Obtenemos el ultimo caracter escrito
        const ULTIMO_CARACTER = INPUT_TEXTO.value.charAt(INPUT_TEXTO.value.length -1);
        
        //Comprobamos que no sea caracter especial
        if(!esCaracterEspecial(ULTIMO_CARACTER))
        {
            validacion_correcta = true;
            //Activamos los botones
            cambiarEstadoBotones(false)
        }
        else
        {
            validacion_correcta = false;
            mostrarMensaje('No se permiten caracteres especiales.');
            INPUT_TEXTO.value = texto.slice(0, -1);
        }
    }
    else
    {
        validacion_correcta = false;
        INPUT_TEXTO.value = '';
    }
}

/*
* comprobarTextoYaEncriptado
* valida si el texto posiblemente esta encritado
* @param : texto => cadena
* @return boolean
*/
function comprobarTextoYaEncriptado(texto)
{
    //Establecemos las palabras clave
    let palabras_clave = ['ai', 'enter', 'imes', 'ober', 'ufat'];
    let contador = 0;

    //recorremos las palabras clave
    palabras_clave.forEach(palabra_clave => 
    {
        //comprobamos que este incluida en una palabra del texto
        if(texto.includes(palabra_clave))
        {
            contador++;
        }
    });
    
    return (contador > 0) ? true : false;
}

/*
* encriptarTexto
* 
* @param : texto => cadena
* @return cadena
*/
function encriptarTexto(texto)
{
    let texto_encriptado = '';
    for(i = 0; i < texto.length; i++)
    {
        switch(texto[i]) 
        {
            case 'a' :
                texto_encriptado += 'ai';
            break;
            case 'e' :
                texto_encriptado += 'enter';
            break;
            case 'i' :
                texto_encriptado += 'imes';
            break;
            case 'o' :
                texto_encriptado += 'ober';
            break;
            case 'u' :
                texto_encriptado += 'ufat';
            break;
            default :
                texto_encriptado += texto[i];
            break;
        }
    }
    return texto_encriptado;
}

/*
* desencriptarTexto
* 
* @param : texto => cadena
* @return cadena
*/
function desencriptarTexto(texto)
{
    //Establecemos las palabras clave
    let palabras_clave = [['a', 'ai'], ['e', 'enter'], ['i', 'imes'], ['o', 'ober'], ['u', 'ufat']];

    //Remplazamos las palabras clave por sus letras correspondientes
    palabras_clave.forEach(palabra_clave => 
    {
        texto = texto.replace(new RegExp(palabra_clave[1], 'g'), palabra_clave[0]);
    });
    return texto;
}

/*
* mostrarResultado
* 
* @param : texto => cadena
* @void
*/
function mostrarResultado(texto)
{
    INPUT_RESULTADO.value = texto;
    if(!textoVacio(texto))
    {
        cambiarEstadoBotonCopiar(false);
    }
}

/*
* encriptar
* @void
*/
function encriptar()
{
    if(validacion_correcta)
    {
        //Obtenemos el texto a encriptar
        let texto = INPUT_TEXTO.value.trim().toLowerCase();
        if(!comprobarTextoYaEncriptado(texto))
        {
            mostrarResultado(encriptarTexto(texto));
        }
        else
        {
            let confirmado = confirm(
                `Parece que el texto esta ya encriptado.\n¿Desea continuar?`);
            if(confirmado)
            {
                mostrarResultado(encriptarTexto(texto));
            }
        }
    }
    else
    {
        mostrarMensaje('No se superaron las validaciones.');
    }
}

/*
* desencriptar
* @void
*/
function desencriptar()
{
    if(validacion_correcta)
    {
        //Obtenemos el texto a encriptar
        let texto = INPUT_TEXTO.value.trim().toLowerCase();
        if(comprobarTextoYaEncriptado(texto))
        {
            mostrarResultado(desencriptarTexto(texto));
        }
        else
        {
            let confirmado = confirm(
                `Parece que el texto no esta encriptado.\n¿Desea continuar?`);
            if(confirmado)
            {
                mostrarResultado(desencriptarTexto(texto));
            }
        }
    }
    else
    {
        mostrarMensaje('No se superaron las validaciones.');
    }
}

/*
* copiar
* @void
*/
function copiar()
{
    let texto = INPUT_RESULTADO.value.trim().toLowerCase();
    if(!textoVacio(texto))
    {
        navigator.clipboard.writeText(texto)
        .then(
        () => 
        {
            console.log('Contenido copiado al portapapeles');
            /* Resuelto - texto copiado al portapapeles con éxito */
        },
        () => 
        {
            console.error('Error al copiar');
            /* Rechazado - fallo al copiar el texto al portapapeles */
        });
    }
}

/*
* Eventos --------------------------------------------------------------------------------------------
*/

//Evento al escribir en el campo
INPUT_TEXTO.addEventListener('keyup', () => 
{
    validarCaracteresPermitidos();
});

//Evento click en boton encriptar
BTN_ENCRIPTAR.addEventListener('click', () => 
{
    encriptar();
});

//Evento click en boton desencriptar
BTN_DESENCRIPTAR.addEventListener('click', () => 
{
    desencriptar();
});

//Evento click en boton copiar
BTN_COPIAR.addEventListener('click', () => 
{
    copiar();
});

//Evento click en boton copiar
BTN_LIMPIAR.addEventListener('click', () => 
{
    restablecerFormulario();
});

