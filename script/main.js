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

var computerNums = [];
var userNums = [];
var difficultyIndex;
var x = 100;
var tempNum;

while(isNaN(difficultyIndex) || (difficultyIndex < 0 && difficultyIndex > 3)) {
    difficultyIndex = parseInt(prompt('Scegli il livello di difficoltà:\n 0 (Facile)\n 1 (Medio)\n 2 (Difficile)'));
}

switch ( difficultyIndex ) {
    case 0: 
        x = 100; 
        break;
    case 1: 
        x = 80; 
        break;
    case 2: 
        x = 50; 
        break;
    default: 
        x = false;
}

for ( i = 0 ; i < 16; i++ ) {
    do {
        tempNum = Math.ceil( Math.random() * x );
    } while( computerNums.includes(tempNum) === true );

    computerNums[i] = tempNum;
}

console.table(computerNums);

var userPoints = 0;
var defeat = false;

while( defeat === false && userPoints < 16 ) {
    do {   
        inputNum = parseInt(prompt('Tentativo n°' + (userPoints+1) + '\nInserisci un numero tra 1 e ' + x + ', vediamo se becchi la mina...' ));
    } while ( isNaN(inputNum) || inputNum < 1 || inputNum > x );

    userNums[userPoints] = inputNum;
    
    if ( computerNums.includes(userNums[userPoints]) == true ) {
        defeat = true;
        alert('Hai perso clamorosamente e sei esploso/a! Per punizione ora devi formattare tutto senza fare backup. Sei comunque riuscito ad effettuare ' + userPoints + ' tentativi');
    } else {
        userPoints++;
        alert('Finora ti è andata bene!\nNumero di inserimenti da effettuare: ' + (16-userPoints));
    }    
} 

if(!defeat) {
    alert('Hai vinto, sei più forte di un computer, vallo a dire a tutti i tuoi amici!\nPunteggio totalizzato ' + userPoints + ', ovvero il massimo consentito.');
}