let dice    
let diceTotal = 0;



let gamePath = []

//this is the length of the gamePath
for (var i = 0; i < 20; i++) {
    gamePath[i] = i + 1
}



var buttonRoll = document.querySelector('.btn-roll').textContent;
console.log(buttonRoll)

//targets the dice-roll button. When clicked random dice rolls and targets gamepath
document.querySelector('.btn-roll').addEventListener('click', () => {
    //random dice
    dice = Math.floor(Math.random() * 5) + 1;
    document.querySelector('.dice-output').textContent = `Dice Roll: ${dice}`;

    //target gamepath
    diceTotal += dice
    document.querySelector('.dice-total').textContent = `Dice Total: ${diceTotal}`;

    //test
    gamePath[diceTotal - 1] = 'hello'
    console.log(gamePath);
})
console.log(gamePath)
