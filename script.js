let dice
let diceTotal = 1;
let innocentsKilled = 0;
let karma = 0;
let food = 2;
let wholeQuestions = [];

init();

let gamePath = 
{
    path1: [1, ['The journey has begun', 'hunt for food', 'slap your mother', 'do pushups and gain strength']], 
    path2: [2, ['nothing dangerous here', 'hunt for food', 'kick homeless man', 'work for money']],
    path3: [3, ['you notice a kid begging for food', 'give him food', 'let him starve', 'kill him']], 
    path4: [4, ['you notice a kid begging for food', 'give him food', 'let him starve', 'kill him']],
    path5: [5, ['you notice a kid begging for food', 'give him food', 'let him starve', 'kill him']],
    path6: [6, ['nothing dangerous here', 'hunt for food', 'kick homeless man', 'work for money']],
    path7: [7, ['nothing dangerous here', 'hunt for food', 'kick homeless man', 'work for money']],
    path8: [8, ['nothing dangerous here', 'hunt for food', 'kick homeless man', 'work for money']],
    path9: [9, ['you notice a kid begging for food', 'give him food', 'let him starve', 'kill him']],
    path10: [10, ['nothing dangerous here', 'give him food', 'kick homeless man', 'work for money']],
    path11: [11, ['nothing dangerous here', 'give him food', 'kick homeless man', 'work for money']],

}

let gamePath2 = 
{
    center: [],
    north: [],
    west: [],
    east: [],
    south: [] 
}


console.log(gamePath);
console.log('dice total: ' + diceTotal);

//array data structure************* NOT USED
// let gamePath = []
// //How many paths can be taken
// gameEnd = 20
// //this is the length of the gamePath
// for (var i = 0; i < gameEnd; i++) {
//     gamePath[i] = i + 1
// }

//targets the dice-roll button. When clicked random dice rolls and targets gamepath
document.querySelector('.btn-roll').addEventListener('click', () => {
    //random dice and change the dom
    dice = Math.floor(Math.random() * 5) + 1;
    document.querySelector('.dice-output').textContent = `Dice Roll: ${dice}`;

    //target gamepath to manipulate data and to know which gamepath you are on.
    diceTotal += dice
    document.querySelector('.dice-total').textContent = `Dice Total: ${diceTotal}`;

    let diceImg = document.querySelector('.dice');
    diceImg.style.display = 'block';
    diceImg.src = `img/dice-${dice}.png`
    console.log('dice roll: ' + dice)
    console.log('dice total: ' + diceTotal);

    let gamePic = document.querySelector('.gamepath');
    gamePic.style.display = 'block'
    gamePic.src = 'img/dice-' + gamePath['path' + diceTotal][0] + '.png'

    //testing/targeting gamepath object
    var targetAnswers = gamePath['path' + diceTotal][1]
    
    wholeQuestions = targetAnswers

    console.log(targetAnswers)

    for (var i = 0; i < targetAnswers.length; i++) {
        if (targetAnswers[i] !== targetAnswers[0]) {
            var btn = document.createElement("button");
            var t = document.createTextNode(targetAnswers[i]);
            btn.appendChild(t);
            document.querySelector('.questions').appendChild(btn);
        }
    }
})

console.log(wholeQuestions);

document.querySelector('.btn-reset').addEventListener('click', init);

// var poop =['LEXUS','AUDI','MAYBACK','FERRARI','TOYOTA'];   
// function printBtn() {
// for (var i = 0; i < target.length; i++) {

//         var btn = document.createElement("button");
//         var t = document.createTextNode(target[i]);
//         btn.appendChild(t);
//         document.body.appendChild(btn);
//     }
// }

// window.onload = printBtn();

function init() {
    dice
    diceTotal = 1;
    innocentsKilled = 0;
    karma = 0;
    food = 0;
    console.log('init dice total: ' + diceTotal);
    

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.gamepath').style.display = 'none';
}