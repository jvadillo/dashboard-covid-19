/**
 * ESTE FICHERO CONTINE FUNCIONES DE AYUDA
 * UTILIZADO POR EL RESTO DE JS
 *  
 */

function splitCsv(str) {
    return str.split(',').reduce((accum, curr) => {
        if (accum.isConcatting) {
            accum.soFar[accum.soFar.length - 1] += ',' + curr
        } else {
            accum.soFar.push(curr)
        }
        if (curr.split('"').length % 2 == 0) {
            accum.isConcatting = !accum.isConcatting
        }
        return accum;
    }, { soFar: [], isConcatting: false }).soFar
}

// Ejemplo de fecha formateada: 03-08-2020
// Se devuelve el dia anterior
function getDateStr(){
    let dateObj = new Date();
    let dia = String(dateObj.getDate()).padStart(2, '0');
    dia -= 1; // Se devuelve el dia anterior
    dia = dia < 10 ? '0'+dia : dia;
    let mes = dateObj.getMonth()+1;
    mes = mes < 10 ? '0'+mes : mes;
    let ano =  dateObj.getFullYear();
    return mes + "-" + dia + "-" + ano;
}