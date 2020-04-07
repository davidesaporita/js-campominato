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
 */

//var level = chooseLevel();
level = 0;                        // DEBUG
var x = possibilities(level);       
var mines = 16;
var computerNumbers = playGenerator(mines, x);
play(computerNumbers, x);

function playGenerator(mines, x) {
    var array = [];
    var tempNum = 0;
    for ( i = 0 ; i < mines; i++ ) {
        while( tempNum <= 0 || array.includes(tempNum) === true ) {
            tempNum = getRandomInt(1, x);
        }
        array.push(tempNum);
    }

    var campo = document.getElementById('boxlist');
    for ( i = 1; i <= x; i++ ) {
        if ( array.includes(i) == true ) {
            content = '<li id="Box-' + i + '" class="boxBottom mine"><button id="Button-' + i + '" class="btn show"></button></li>';
        } else {
            content = '<li id="Box-' + i + '" class="boxBottom ok"><button id="Button-' + i + '" class="btn show"></button></li>';
        }
        campo.innerHTML += content;
    }
    return array;
}

function play(computerNumbers, x) {
    var userPoints = 0;
    var userNumbers = [];
    var defeat = false;
    var inputNum = 0;

    for ( i = 1 ; i <= x ; i++ ) {
        box = document.getElementById('Box-' + i);
        button = document.getElementById('Button-' + i);
        button.addEventListener('click', checkMine);
        userNumbers[i] = i;
        userPoints++;
    }
}

function checkMine() {
    var id = parseInt(this.id.slice(7)); 
    if ( computerNumbers.includes(id) ) {
        this.classList.add('mine','red');
        for ( var i = 0 ; i < computerNumbers.length ; i++ ) {
            document.getElementById('Button-' + computerNumbers[i]).classList.add('mine');
        }
        for ( var i = 1 ; i <= x; i++ ) {
            if ( computerNumbers.includes(i) == false ) {
                // document.getElementById('Button-' + (i)).classList.remove('show');
                // document.getElementById('Button-' + (i)).classList.add('hidden');
            }
        }
        
    } else {
        this.classList.remove('show');
        this.classList.add('hidden');
    }
}

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