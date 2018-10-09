let dice    
let diceTotal = 0;



let gamePath = []

//this is the length of the gamePath
for (var i = 0; i < 20; i++) {
    gamePath[i] = i + 1
}



var buttonRoll = document.querySelector('.btn-roll').textContent;
console.log(buttonRoll)

document.querySelector('.btn-roll').addEventListener('click', () => {
    dice = Math.floor(Math.random() * 5) + 1;
document.querySelector('.dice-output').textContent = `Dice Roll: ${dice}`;

diceTotal += dice
document.querySelector('.dice-total').textContent = `Dice Total: ${diceTotal}`;

gamePath[diceTotal - 1] = 'hello'
console.log(gamePath);
})
console.log(gamePath)
