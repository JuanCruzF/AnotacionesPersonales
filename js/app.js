//Variables
const formulario = document.querySelector('#formulario')
const listaAgenda = document.querySelector('#lista-agenda')
let notas = [];


//Event Listeners
eventListeners();
function eventListeners(){
    formulario.addEventListener('submit', agregarNota);

    document.addEventListener('DOMContentLoaded', () => {
        notas = JSON.parse(localStorage.getItem('notas')) || [] //Si es null lo pone como array vacio
        crearHTML();
    });
}


//Funciones
function agregarNota(e){
    e.preventDefault();

    const nota = document.querySelector('#nota').value;
    if(nota === ''){
        mostrarError('Una nota no puede estar vacia');
        return;
    }

    const notasObj = {
        id: Date.now(),
        nota
    }

    //Cargar notas al arreglo
    notas = [...notas, notasObj];
    //Agregar HTML
    crearHTML();

    //Reset form
    formulario.reset();
}

function mostrarError(error) {
    // Verificar si ya existe un mensaje de error
    const errorExistente = document.querySelector('.error');
    if (!errorExistente) {
        const msjError = document.createElement('p');
        msjError.textContent = error;
        msjError.classList.add('error');
        const contenido = document.querySelector('#contenido');
        contenido.appendChild(msjError);

        // Remover el mensaje de error después de 1 segundo
        setTimeout(() => {
            msjError.remove();
        }, 2000);
    }
}

function crearHTML(){
    limpiarHTML()
    if(notas.length > 0){
        notas.forEach(nota => {
            const btnSupr = document.createElement('a');
            btnSupr.classList.add('borrar-nota');
            btnSupr.innerHTML = 'X';

            //Funcion eliminar
            btnSupr.onclick = () =>{
                eliminarNota(nota.id);
            };

            //HTML
            const li = document.createElement('li');

            //Añadimos notas
            li.innerText = nota.nota;

            //Añadimos btnSupr
            li.appendChild(btnSupr);
            listaAgenda.appendChild(li);


        });
    }
    almacenarSotrage();
}

function almacenarSotrage(){
    localStorage.setItem('notas', JSON.stringify(notas));
}

function eliminarNota(id){
    //Trae todos excepto al que le di click
    notas = notas.filter(notas => notas.id !== id);
    crearHTML();
}

function limpiarHTML(){
    while(listaAgenda.firstChild){
        listaAgenda.removeChild(listaAgenda.firstChild);
    }
}

