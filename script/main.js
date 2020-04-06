/**
 * Esercizio di oggi: campo minato
 * Descrizione
 * Il computer deve generare 16 numeri casuali tra 1 e 100 (numeri vietati).
 * In seguito deve chiedere all’utente di inserire un numero alla volta, sempre compreso tra 1 e 100. L’utente non può inserire più volte lo stesso numero.
 * Se il numero è presente nella lista dei numeri generati (numeri vietati), la partita termina, altrimenti si continua chiedendo all’utente un altro numero.
 * La partita termina quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti.
 * Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.
 * BONUS:
 * All’inizio il software richiede anche una difficoltà all’utente che cambia il range di numeri casuali:
 * con difficoltà 0 => tra 1 e 100
 * con difficoltà 1 =>  tra 1 e 80
 * con difficoltà 2=> tra 1 e 50
 * 
 * 
 */

var level = chooseLevel();
var x = possibilities(level);
var mines = 16;
var computerNumbers = playGenerator(mines, x);
play(computerNumbers, x);

function chooseLevel() {
    var level;
    while(isNaN(level) || (level < 0 && level > 3)) {
        level = parseInt(prompt('Scegli il livello di difficoltà:\n 0 (Facile)\n 1 (Medio)\n 2 (Difficile)'));
    }
    return level;
}

function possibilities(level) {
    var x = 0;
    switch ( level ) {
        case 1: 
            x = 80; 
            break;
        case 2: 
            x = 50; 
            break;
        default: 
            x = 100;
    }
    return x;
}

function getRandomInt(min, max) {
    var temp = Math.floor(Math.random() * (max - min + 1)) + min;
    return temp;
}

function playGenerator(mines, x) {
    var array = [];
    var tempNum = 0;
    for ( i = 0 ; i < mines; i++ ) {
        while( tempNum <= 0 || array.includes(tempNum) === true ) {
            tempNum = getRandomInt(1, x);
        }
        array.push(tempNum);
    }
    console.table(array);
    return array;
}

function play(computerNumbers, x) {
    var userPoints = 0;
    var userNumbers = [];
    var defeat = false;
    var inputNum = 0;

    while( defeat === false && userPoints < mines ) {
        while ((userNumbers.includes(inputNum) === true) || (isNaN(inputNum) || inputNum < 1 || inputNum > x)) {   
            inputNum = parseInt(prompt('Tentativo n°' + (userPoints+1) + '\nInserisci un numero tra 1 e ' + x + ', vediamo se becchi la mina...' ));
        } 
        userNumbers[userPoints] = inputNum;
        
        if ( computerNumbers.includes(userNumbers[userPoints]) === true ) {
            defeat = true;
        } else {
            userPoints++;
            //alert('Finora ti è andata bene!\nNumero di inserimenti da effettuare: ' + (mines-userPoints));
        } 
    } 

    if(!defeat) {
        alert('Hai vinto, sei più forte di un computer, vallo a dire a tutti i tuoi amici!\nPunteggio totalizzato ' + userPoints + ', ovvero il massimo consentito.');
    } else {
        alert('Hai perso clamorosamente e sei esploso/a! Per punizione ora devi formattare tutto senza fare backup. Sei comunque riuscito ad effettuare ' + userPoints + ' tentativi');
    }
};