let dice
let diceTotal = 1;
let innocentsKilled = 0;
let karma = 0;
let food = 2;

let wholeQuestions = [];
let btnAnswers = document.querySelectorAll('.answers');
let btnArrays = Array.from(btnAnswers);

init();

let gamePath = 
{
    path1: [1, ['1. The journey has begun', 'hunt for food', 'slap your mother', 'do pushups and gain strength']], 
    path2: [2, ['2. nothing dangerous here', 'hunt for food', 'kick homeless man', 'work for money']],
    path3: [3, ['3. you notice a kid begging for food', 'give him food', 'let him starve', 'kill him']], 
    path4: [4, ['4. you notice a kid begging for food', 'give him food', 'let him starve', 'kill him']],
    path5: [5, ['5. you notice a kid begging for food', 'give him food', 'let him starve', 'kill him']],
    path6: [6, ['6. nothing dangerous here', 'hunt for food', 'kick homeless man', 'work for money']],
    path7: [7, ['7. nothing dangerous here', 'hunt for food', 'kick homeless man', 'work for money']],
    path8: [8, ['8. nothing dangerous here', 'hunt for food', 'kick homeless man', 'work for money']],
    path9: [9, ['9. you notice a kid begging for food', 'give him food', 'let him starve', 'kill him']],
    path10: [10, ['10. nothing dangerous here', 'give him food', 'kick homeless man', 'work for money']],
    path11: [11, ['11. nothing dangerous here', 'give him food', 'kick homeless man', 'work for money']],
}

console.log('gamePath: ', gamePath);

document.querySelector('.question-asked').textContent = gamePath.path1[1][0]
for (let i = 0; i < btnArrays.length; i++) {

    btnArrays[i].textContent = gamePath.path1[1][i + 1];
}


//targets the dice-roll button. When clicked random dice rolls and targets gamepath
document.querySelector('.btn-roll').addEventListener('click', () => {
    //random dice and change the dom
    dice = Math.floor(Math.random() * 5) + 1;
    document.querySelector('.dice-output').textContent = `Dice Roll: ${dice}`;

    //target gamepath to manipulate data and to know which gamepath you are on.
    diceTotal += dice
    document.querySelector('.dice-total').textContent = `Dice Total/GamePath: ${diceTotal}`;

    let diceImg = document.querySelector('.dice');
    diceImg.style.display = 'block';
    diceImg.src = `img/dice-${dice}.png`

    let gamePic = document.querySelector('.gamepath');
    gamePic.style.display = 'block'
    gamePic.src = 'img/dice-' + gamePath['path' + diceTotal][0] + '.png'

    //testing/targeting gamepath object
    let targetAnswers = gamePath['path' + diceTotal][1]
    
    //making the targetAnswers equal to a global current questions array.
    wholeQuestions = targetAnswers

    //puts the question asked in the DOM
    document.querySelector('.question-asked').textContent = wholeQuestions[0]

    //changes the answers on each dice roll in the DOM
    for (let i = 0; i < btnArrays.length; i++) {

        btnArrays[i].textContent = wholeQuestions[i + 1];
    }
})


document.querySelector('.btn-reset').addEventListener('click', init);


//resets game completely
function init() {
    dice = 1
    diceTotal = 1;
    innocentsKilled = 0;
    karma = 0;
    food = 0;

    wholeQuestions = [];
    document.querySelector('.dice-output').textContent = 'Dice Roll:';
    document.querySelector('.dice-total').textContent = `Dice Total/GamePath: ${diceTotal}`;
    document.querySelector('.question-asked').textContent = ""
    btnArrays.forEach(cur => cur.textContent = "")

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.gamepath').style.display = 'none';
}