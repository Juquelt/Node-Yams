console.log('Jeu front-end Yams')

//Fonction qui génère un nombre aléatoire
const rollDice = function () {
    const decimalNumber = (Math.random() * 6) + 1
    const number = Math.trunc(decimalNumber)

    return number
}

const clickButton = function (){
    //Récupère l'image
    const images = document.querySelectorAll('.dices > img')

    const diceFullRoll = []

    images.forEach(image => {
        const dice = rollDice()
        diceFullRoll.push((dice))
        image.src=`/static/asset/dice${dice}.png`;
    })

    console.log('Lancé actuel', diceFullRoll)

    //Création d'un jeu yams avec les dés
    const yams = function (){
        const brelan = ('')
        const carre = ('')
        const full = ('')

        if( diceFullRoll === brelan ){

            return 'Vous avez gagner une pâtisserie'

        } if (diceFullRoll === carre){

            return 'Vous avez gagner deux pâtisseries'

        } if (diceFullRoll === full){

            return 'Vous avez gagner trois pâtisseries'

        }else{

            return 'Perdu !'
        }
    }
}

//Lier un bouton
const buttonRollDices = document.getElementById("buttonDices")

//Exécuter le lancer de dé
buttonRollDices.addEventListener('click', clickButton)