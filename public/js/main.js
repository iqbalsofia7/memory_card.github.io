let timer = document.querySelector('#timer')
let temps = 0 //temps initial
let playButton = document.querySelector('#play') //bouton play
let timerId;
let carteRetournées = 0; //Max 2 cartes
let arrayOfCards = []; //Push les noms des ID pour vérifier leur match
let matchCounter = 0;
let monPseudo = document.querySelector('#pseudo')
let input = document.querySelector('input')
let inputBtn = document.querySelectorAll('input')[1]
let joueur = {
    pseudo : input.value,
    score : timer.innerHTML
}
let playAgainButton = document.querySelector('#playAgain');
//! TIMER__________________________________________________________________
function startTimer() {
    timerId = setTimeout(changeTime, 1000);
}
function changeTime() {
    timer.innerHTML = '00.' + temps + 's'
    temps++;
    if (matchCounter < 4) {
        timerId = setTimeout(changeTime, 1000);
    } else {
        clearTimeout(timerId);
        console.log(joueur);
    }
}
playButton.addEventListener('click', startTimer);
//! CHOIX DU PSEUDO__________________________________________________________
inputBtn.addEventListener('click', ()=>{
    monPseudo.innerHTML += input.value
    input.remove()
    inputBtn.remove() 
})
//!JEUX______________________________________________________________________
let playDiv = document.querySelector('#playDiv') //div contenant le bouton play
let allCarte = document.querySelectorAll('.carte');
let allId = ['carte1', 'carte2', 'carte3', 'carte1', 'carte2', 'carte3', 'carte4', 'carte4']; 
let addIdToCard =()=>{
    allCarte.forEach((element, index) => {
        let randomOfAllId = Math.floor(Math.random()*allId.length);
        element.id = allId[randomOfAllId]; //ID Random attribués aux cartes
        allId.splice(randomOfAllId, 1); //Suppression de l'id du tableau
        playDiv.remove()
    });
}
playButton.addEventListener('click', addIdToCard);
//! Clique sur une carte__________________________________________________________
for (let index = 0; index < allCarte.length; index++) {
    allCarte[index].addEventListener('click', ()=>{
        if (matchCounter < 4) { //fix to match only when 6 pairs are found
            let currentId = allCarte[index].id;
            if (currentId === 'carte1' || currentId === 'carte2' || currentId === 'carte3' || currentId === 'carte4') { //fix to check for only the allowed ids
                currentId = currentId + currentId[currentId.length-1]; // carte3 = carte3 + 3
                allCarte[index].id = currentId; //carte face visible
                arrayOfCards.push(currentId);
                carteRetournées++;
                if (carteRetournées === 2) { //Si 2 cartes sont rétournées
                    checkForMatch(); //On vérifié si elles matchent
                    carteRetournées = 0;
                }
            }
        }
    });
}
//! Vérification des matchs entre 2 cartes________________________________________
function checkForMatch() {
    if (arrayOfCards[0] == arrayOfCards[1]) {
        allCarte.forEach((element) => {
            if(element.id === arrayOfCards[0]){
                setTimeout(() => {
                    element.remove(); //Si les cartes sont identiques, on les retire du jeu
                }, 500);
            }
        });
        matchCounter++; //Nombre de pairs
        console.log(matchCounter);
        arrayOfCards = []; //Retour à 0
    }
    else {
        setTimeout(() => { //Délai pour qu'on puisse voir les cartes retournées
            allCarte.forEach((element) => {
                if (element.id === 'carte11' || element.id === 'carte22' || element.id === 'carte33' || element.id === 'carte44') {
                    element.id = element.id.substring(0, element.id.length-1) //so l'id est carte33  : alors on lui enleve le denrier caractère
                }
            })
            arrayOfCards = [];
        }, 700)
    }
}
//! Bouton Rejouer
playAgainButton.addEventListener('click', ()=> {
    location.reload()
});