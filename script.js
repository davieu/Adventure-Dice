let dice
let diceTotal = 1;
let innocentsKilled = 0;
let karma = 0;
let food = 2;

//this is a global array so that current question can be pushed into it
let wholeQuestions = [];
let btnArray = document.querySelectorAll('.answers');
let btnAnswers = Array.from(btnArray);

var DOMstrings = {
    btnRollDOM: '.btn-roll',
    diceOutputDOM: '.dice-output',
    diceTotalDOM: '.dice-total',
    diceDOM: '.dice',
    gamePathDOM: '.gamepath',
    questionAskedDOM: '.question-asked', 
    btnAnswersDOM: '.answers'
}

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

init();

console.log('gamePath: ', gamePath);

//these are the initial questions and answers printed to DOM
document.querySelector(DOMstrings.questionAskedDOM).textContent = gamePath.path1[1][0]
//these are the 3 replies for the first question. 
for (let i = 0; i < btnAnswers.length; i++) {
    btnAnswers[i].textContent = gamePath.path1[1][i + 1];
}

//targets the dice-roll button. When clicked random dice rolls and targets gamepath
document.querySelector(DOMstrings.btnRollDOM).addEventListener('click', () => {
    //random dice and change the dom
    dice = Math.floor(Math.random() * 5) + 1;
    document.querySelector(DOMstrings.diceOutputDOM).textContent = `Dice Roll: ${dice}`;

    //target gamepath to manipulate data and to know which gamepath you are on.
    diceTotal += dice
    document.querySelector(DOMstrings.diceTotalDOM).textContent = `Dice Total/GamePath: ${diceTotal}`;

    //deals with images  with type coercion
    let diceImg = document.querySelector(DOMstrings.diceDOM);
    diceImg.style.display = 'block';
    diceImg.src = `img/dice-${dice}.png`

    let gamePic = document.querySelector(DOMstrings.gamePathDOM);
    gamePic.style.display = 'block'
    gamePic.src = 'img/dice-' + gamePath['path' + diceTotal][0] + '.png'

    //testing/targeting gamepath object
    let targetAnswers = gamePath['path' + diceTotal][1]
    
    //making the targetAnswers equal to a global current questions array.
    wholeQuestions = targetAnswers

    //puts the question asked in the DOM
    document.querySelector(DOMstrings.questionAskedDOM).textContent = wholeQuestions[0]

    //changes the answers on each dice roll in the DOM
    for (let i = 0; i < btnAnswers.length; i++) {

        btnAnswers[i].textContent = wholeQuestions[i + 1];
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
    document.querySelector(DOMstrings.diceOutputDOM).textContent = 'Dice Roll:';
    document.querySelector(DOMstrings.diceTotalDOM).textContent = `Dice Total/GamePath: ${diceTotal}`;

    //resets the question and reply to the first
    document.querySelector(DOMstrings.questionAskedDOM).textContent = gamePath.path1[1][0]
    for (let i = 0; i < btnAnswers.length; i++) {
        btnAnswers[i].textContent = gamePath.path1[1][i + 1];
    }

    document.querySelector(DOMstrings.diceDOM).style.display = 'none';
    document.querySelector(DOMstrings.gamePathDOM).style.display = 'none';
}


//   var dataController = (function(){
    

// })();



// var uiController = (function(){


// })();



// var appController = (function(dataCtrl, uiCtrl){



// })(dataController, uiController);

// appController.init();