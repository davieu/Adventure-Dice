let dice, gameOver, selectedReplyButtonIndex
let yourReply = [];
let diceTotal = 1;
let innocentsKilled = 0;
let karma = 0;
let food = 2;

//this is a global array so that current question can be pushed into it
let wholeQuestionReplies = [];

//these are the buttons for the replies in the DOM.
let btnArray = document.querySelectorAll('.replies');
let btnReplies = Array.from(btnArray);

let DOMstrings = {
    btnRollDOM: '.btn-roll',
    btnReset: '.btn-reset',
    btnRepliesDOM: '.replies',
    btnNexTDOM: '.btn-next',
    diceOutputDOM: '.dice-output',
    diceTotalDOM: '.dice-total',
    diceDOM: '.dice',
    gamePathDOM: '.gamepath',
    questionAskedDOM: '.question-asked', 
    imgReplyDOM: '.img-reply',
    IDreplyDivDOM: 'reply-div'
}

let DOMcolors = {
    targetColor: 'red',
    defaultColor: '#555'
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
    path10: [10, ['10. nothing dangerous here', 'hunt for food', 'kick homeless man', 'work for money']],
    path11: [11, ['11. nothing dangerous here', 'hunt for food', 'kick homeless man', 'work for money']],
}

let gameReplies = 
{
    replies1: [],
    replies2: [],
    replies3: [],
    replies4: [],
    replies6: [],
    replies7: [],
    replies8: [],
    replies9: [],
    replies10: [],
    replies11: []
}

//gets the length of the object
var gamePathSize = Object.keys(gamePath).length;
console.log('gamePathSize: ', gamePathSize);
console.log('gamePath: ', gamePath);

init()

//targets the dice-roll button. When clicked random dice rolls and targets gamepath
document.querySelector(DOMstrings.btnRollDOM).addEventListener('click', () => {
    if (diceTotal < gamePathSize && yourReply.length > 0) {
        //random dice and change the dom
        dice = Math.floor(Math.random() * 3) + 1;
        document.querySelector(DOMstrings.diceOutputDOM).textContent = `Dice Roll: ${dice}`;
        console.log(dice)
        
        //dicetotal will indicate which gamepath in the array you are at/question asked.
        diceTotal += dice
        if (diceTotal > gamePathSize) {
            diceTotal = gamePathSize
        }

        document.querySelector(DOMstrings.diceTotalDOM).textContent = `Dice Total/GamePath: ${diceTotal}`;
    
        //deals with dice images using type coercion- based on diceTotal
        let diceImg = document.querySelector(DOMstrings.diceDOM);
        diceImg.style.display = 'block';
        diceImg.src = `img-dice/dice-${dice}.png`;
    
        //deals with background images using type coercion- based on diceTotal
        let gamePic = document.querySelector(DOMstrings.gamePathDOM);
        gamePic.style.display = 'block'
        gamePic.src = 'gamePics/gamePic-' + gamePath['path' + diceTotal][0] + '.png'
        
        //targeting gamepath object so that it is equal to a global current questions array.
        wholeQuestionReplies = gamePath['path' + diceTotal][1];
    
        //puts the question asked in the DOM
        document.querySelector(DOMstrings.questionAskedDOM).textContent = wholeQuestionReplies[0];
    
        //changes the Replies based on the global  current wholeQuestionReplies array
        for (let i = 0; i < btnReplies.length; i++) {
            btnReplies[i].textContent = wholeQuestionReplies[i + 1];
        };
        
        //resets the target and reply picked
        yourReply = [];
        btnReplies.forEach(cur => cur.style.color = DOMcolors.defaultColor)
    };
});

//This was by far the trickiest to get to work. Basically a focus for the target reply chosen.
document.getElementById(DOMstrings.IDreplyDivDOM).addEventListener('click', (e) => {

    if (e.target !== document.getElementById(DOMstrings.IDreplyDivDOM)) {

        //sent to a global variable where I can acquire the index of the selected DOM reply button
        selectedReplyButtonIndex = btnReplies.indexOf(e.target);
        console.log('reply index: ', selectedReplyButtonIndex);

        yourReply[0] = e.target;
        yourReply[0].style.color = DOMcolors.targetColor;
        btnReplies.forEach(cur => {
            if (yourReply[0] !== cur) {cur.style.color = DOMcolors.defaultColor};
        });
    };
});

//function that when btn next is clicked it moves to next questions. 
//Figure out which array index was chosen as reply to specific portait image
//make dice total the data
document.querySelector(DOMstrings.btnNexTDOM).addEventListener('click', () => {

    let imgReply = document.querySelector(DOMstrings.imgReplyDOM);
    imgReply.style.display = 'block';
    imgReply.src = 'img-replies/img-reply-' + diceTotal + '/reply-' + [selectedReplyButtonIndex + 1] + '.png';
})

//callsback the init/reset function
document.querySelector(DOMstrings.btnReset).addEventListener('click', init);


//resets game completely
function init() {
    dice = 1;
    diceTotal = 1;
    innocentsKilled = 0;
    karma = 0;
    food = 0;
    yourReply = [];

    document.querySelector(DOMstrings.diceOutputDOM).textContent = 'Dice Roll:';
    document.querySelector(DOMstrings.diceTotalDOM).textContent = `Dice Total/GamePath: ${diceTotal}`;

    //make the wholeQuestionReplies array equal to the current question/answers
    wholeQuestionReplies = gamePath['path' + diceTotal][1];

    //resets the question to gamepath 1
    document.querySelector(DOMstrings.questionAskedDOM).textContent = gamePath.path1[1][0];
    //resets the replies to gamepath 1
    for (let i = 0; i < btnReplies.length; i++) {
        btnReplies[i].textContent = gamePath.path1[1][i + 1];
    };

    let gamePic = document.querySelector(DOMstrings.gamePathDOM);
    gamePic.style.display = 'block'
    gamePic.src = 'gamePics/gamePic-' + gamePath['path' + diceTotal][0] + '.png'

    document.querySelector(DOMstrings.diceDOM).style.display = 'none';
    btnReplies.forEach(cur => cur.style.color = DOMcolors.defaultColor)
};
