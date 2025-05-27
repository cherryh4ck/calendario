meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
fechas = new Map();
feriados = new Map();

// fechas específicas que incluye año - mes - dia
fechas.set("2025-5-11", "Evento Especial");


// fechas aplicables para todos los años osea mes - dia
feriados.set("1-1", "Año Nuevo");
feriados.set("12-25", "Navidad");
feriados.set("2-14", "San Valentín");

let fecha = new Date();
let mesActual = fecha.getMonth();
let añoActual = fecha.getFullYear();

// elementos
let FechaTexto = document.getElementById("Fecha");
let Anterior = document.getElementById("Anterior");
let Siguiente = document.getElementById("Siguiente");

let VentanaEventos = document.getElementById("VentanaEventos");
let ListaDias = document.getElementById("ListaDias");
let ListaEventos = document.getElementById("ListaEventos");

FechaTexto.textContent = meses[mesActual] + " " + añoActual;
añadirDias();

function añadirDias(){
    let contadorEventos = 0;
    dias = new Date(añoActual, mesActual + 1, 0).getDate();
    ListaDias.replaceChildren("");
    ListaEventos.replaceChildren("");
    document.getElementById("sinEventos")?.remove();
    diaInicial();
    console.log(dias);
    for (let i = 1; i <= dias; i++) {
        let dia = document.createElement("li");
        dia.textContent = i;
        if (fechas.has(`${añoActual}-${mesActual + 1}-${i}`) || feriados.has(`${mesActual + 1}-${i}`)){
            let tipo;
            if (feriados.has(`${mesActual + 1}-${i}`)){
                tipo = "feriado";
            }
            else{
                tipo = "evento";
            }
            dia.style.color = "rgb(231, 68, 68)";
            añadirEvento(i, tipo);
            contadorEventos++;
        }
        ListaDias.appendChild(dia);
    }
    if (contadorEventos == 0) {
        let sinEventos = document.createElement("p");
        sinEventos.textContent = "No hay eventos para este mes";
        sinEventos.style.color = "rgb(92, 89, 89)";
        sinEventos.id = "sinEventos";
        VentanaEventos.appendChild(sinEventos);
    }
}

function añadirEvento(dia, tipo){
    let elemento = document.createElement("li");
    if (tipo == "feriado") {
        elemento.textContent = dia + " - " + feriados.get(`${mesActual + 1}-${dia}`);
    }
    else{
        elemento.textContent = dia + " - " + fechas.get(`${añoActual}-${mesActual + 1}-${dia}`);
    }
    ListaEventos.appendChild(elemento);
}

function diaInicial(){
    let primerDia = new Date(añoActual, mesActual, 1).getDay();
    let diasz = new Date(añoActual, mesActual, 0).getDate();
    diasz -= primerDia;
    for (let i = 0; i <= primerDia; i++) {
        let espacio = document.createElement("li");
        espacio.textContent = diasz + i;
        espacio.style.color = "rgb(92, 89, 89)";
        ListaDias.appendChild(espacio);
    }
}

Anterior.addEventListener("click", () => {
    if (mesActual == 0) {
        mesActual = 11;
        añoActual--;
    } else {
        mesActual--;
    }
    FechaTexto.textContent = meses[mesActual] + " " + añoActual;
    añadirDias();
});

Siguiente.addEventListener("click", () => {
    if (mesActual == 11) {
        mesActual = 0;
        añoActual++;
    } else {
        mesActual++;
    }
    FechaTexto.textContent = meses[mesActual] + " " + añoActual;
    añadirDias();
});

