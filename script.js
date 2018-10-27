let dice, gameOver, selectedReplyButtonIndex
let yourReply = [];
let diceTotal = 1;
let innocentsKilled = 0;
let karma = 0;
let food = 2;
let imgReplyScreen = false;

//this is a global array so that current question can be pushed into it
let wholeQuestionReplies = [];

let DOMstrings = {
    btnRollDOM: '.btn-roll',
    btnReset: '.btn-reset',
    btnRepliesDOM: '.replies',
    btnNexTDOM: '.btn-next',
    diceOutputDOM: '.dice-output',
    diceTotalDOM: '.dice-total',
    diceDOM: '.dice',
    gamePathDOM: '.gamepath',
    questionsDivDOM: '.questions',
    questionAskedDOM: '.question-asked', 
    imgReplyDOM: '.img-reply',
    diceDisplayDOM: '.dice-display',
    gamepathDisplayDOM: '.gamepath-display',
    repliedScreenDOM: '.replied-screen',
    replyReactionDOM: '.reply-reaction',
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
    replies1: ['You hunted and acquired some food', 'You slapped your mother then she gave you a spanking', 'your workout gave you +1 strength!'],
    replies2: ['You hunted and acquired some food', 'Before you was able to kick the homeless man you was ambushed by a mob of thugs', 'You found a sign looking for work polishing shoes and then you gained 5 gold'],
    replies3: ['you gave the poor kid whom was a actually a small dwarf food then he ran', 'You let the small kid starve but after further inspecting the corpse he was actually a small dwarf', 'You spit on the little kid and jabbed him with a sword. Karma deducted for your terrible deed.'],
    replies4: ['you gave the poor kid whom was a actually a small dwarf food then he ran', 'You let the small kid starve but after further inspecting the corpse he was actually a small dwarf', 'You spit on the little kid and jabbed him with a sword. Karma deducted for your terrible deed.'],
    replies5: ['you gave the poor kid whom was a actually a small dwarf food then he ran', 'You let the small kid starve but after further inspecting the corpse he was actually a small dwarf', 'You spit on the little kid and jabbed him with a sword. Karma deducted for your terrible deed.'],
    replies6: ['You hunted and acquired some food', 'Before you was able to kick the homeless man you was ambushed by a mob of thugs', 'You found a sign looking for work polishing shoes and then you gained 5 gold'],
    replies7: ['You hunted and acquired some food', 'Before you was able to kick the homeless man you was ambushed by a mob of thugs', 'You found a sign looking for work polishing shoes and then you gained 5 gold'],
    replies8: ['You hunted and acquired some food', 'Before you was able to kick the homeless man you was ambushed by a mob of thugs', 'You found a sign looking for work polishing shoes and then you gained 5 gold'],
    replies9: ['you gave the poor kid whom was a actually a small dwarf food then he ran', 'You let the small kid starve but after further inspecting the corpse he was actually a small dwarf', 'You spit on the little kid and jabbed him with a sword. Karma deducted for your terrible deed.'],
    replies10: ['You hunted and acquired some food', 'Before you was able to kick the homeless man you was ambushed by a mob of thugs', 'You found a sign looking for work polishing shoes and then you gained 5 gold'],
    replies11: ['You hunted and acquired some food', 'Before you was able to kick the homeless man you was ambushed by a mob of thugs', 'You found a sign looking for work polishing shoes and then you gained 5 gold']
}

//gets the length of the object
var gamePathSize = Object.keys(gamePath).length;
console.log('gamePathSize: ', gamePathSize);
console.log('gamePath: ', gamePath);


//these are the buttons for the replies in the DOM.
let btnReplyNodes = document.querySelectorAll(DOMstrings.btnRepliesDOM);
let btnRepliesArr = Array.from(btnReplyNodes);

//these are anything related to the dice for easier transitioning
let diceRelatedNodes = document.querySelectorAll(DOMstrings.diceDisplayDOM);
let diceRelatedArr = Array.from(diceRelatedNodes);

//these are anything related to questionsDiv for easier targeting
let questionDivNodes = document.querySelectorAll(DOMstrings.questionsDivDOM);
let questionDivArr = Array.from(questionDivNodes);

//these are anything related to gamepath aside from the dice total/gamepath number
let gamepathDisplayNodes = document.querySelectorAll(DOMstrings.gamepathDisplayDOM);
let gamepathDisplayArr = Array.from(gamepathDisplayNodes);

let repliedScreenNodes = document.querySelectorAll(DOMstrings.repliedScreenDOM);
let repliedScreenArr = Array.from(repliedScreenNodes);


init()

//targets the dice-roll button. When clicked random dice rolls and targets gamepath
document.querySelector(DOMstrings.btnRollDOM).addEventListener('click', () => {
    if (diceTotal < gamePathSize && yourReply.length > 0 && imgReplyScreen === true) {
        //random dice and change the dom
        dice = Math.floor(Math.random() * 3) + 1;
        document.querySelector(DOMstrings.diceOutputDOM).textContent = `Dice Roll: ${dice}`;
        console.log('dice roll: ', dice)
        
        //dicetotal will indicate which gamepath in the array you are at/question asked.
        diceTotal += dice
        if (diceTotal > gamePathSize) {
            diceTotal = gamePathSize
        }

        imgReplyScreen = false;

        screenTransitioning();

        document.querySelector(DOMstrings.diceTotalDOM).textContent = `Dice Total/GamePath: ${diceTotal}`;
    
        //deals with dice images using type coercion- based on diceTotal
        let diceImg = document.querySelector(DOMstrings.diceDOM);
        diceImg.src = `img-dice/dice-${dice}.png`;
    
        //deals with background images using type coercion- based on diceTotal
        let gamePic = document.querySelector(DOMstrings.gamePathDOM);
        gamePic.src = 'gamePics/gamePic-' + gamePath['path' + diceTotal][0] + '.png'
        
        //targeting gamepath object so that it is equal to a global current questions array.
        wholeQuestionReplies = gamePath['path' + diceTotal][1];
    
        //puts the question asked in the DOM
        document.querySelector(DOMstrings.questionAskedDOM).textContent = wholeQuestionReplies[0];
    
        //changes the Replies based on the global  current wholeQuestionReplies array
        for (let i = 0; i < btnRepliesArr.length; i++) {
            btnRepliesArr[i].textContent = wholeQuestionReplies[i + 1];
        };
        
        //resets the target and reply picked
        yourReply = [];
        selectedReplyButtonIndex = undefined;
        btnRepliesArr.forEach(cur => cur.style.color = DOMcolors.defaultColor)
    };
});

//This was by far the trickiest to get to work. Basically a focus for the target reply chosen.
document.getElementById(DOMstrings.IDreplyDivDOM).addEventListener('click', (e) => {

    if (e.target !== document.getElementById(DOMstrings.IDreplyDivDOM)) {

        //sent to a global variable where I can acquire the index of the selected DOM reply button
        selectedReplyButtonIndex = btnRepliesArr.indexOf(e.target);
        console.log('reply index: ', selectedReplyButtonIndex);

        yourReply[0] = e.target;
        yourReply[0].style.color = DOMcolors.targetColor;
        btnRepliesArr.forEach(cur => {
            if (yourReply[0] !== cur) {cur.style.color = DOMcolors.defaultColor};
        });
    };
});

//Figure out which array index was chosen as reply to specific portait image
//make dice total the data. need to figure out what data i need need to show in the dom
document.querySelector(DOMstrings.btnNexTDOM).addEventListener('click', () => {
    if(selectedReplyButtonIndex !== undefined) {
        imgReplyScreen = true;

        screenTransitioning();
        
        //changes the textcontent of the reply reaction dom
        document.querySelector(DOMstrings.replyReactionDOM).textContent = gameReplies['replies' + diceTotal][selectedReplyButtonIndex]
    
        let imgReply = document.querySelector(DOMstrings.imgReplyDOM);
        imgReply.style.display = 'block';
        imgReply.src = 'img-replies/img-reply-' + diceTotal + '/reply-' + [selectedReplyButtonIndex + 1] + '.png';
    };
});

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
    imgReplyScreen = false;

    screenTransitioning();

    document.querySelector(DOMstrings.diceOutputDOM).textContent = 'Dice Roll:';
    document.querySelector(DOMstrings.diceTotalDOM).textContent = `Dice Total/GamePath: ${diceTotal}`;

    //make the wholeQuestionReplies array equal to the current question/answers
    wholeQuestionReplies = gamePath['path' + diceTotal][1];

    //resets the question to gamepath 1
    document.querySelector(DOMstrings.questionAskedDOM).textContent = gamePath.path1[1][0];
    
    //resets the replies to gamepath 1
    for (let i = 0; i < btnRepliesArr.length; i++) {
        btnRepliesArr[i].textContent = gamePath.path1[1][i + 1];
    };

    //resets back to 1st gamepath pic
    let gamePic = document.querySelector(DOMstrings.gamePathDOM);
    gamePic.style.display = 'block';
    gamePic.src = 'gamePics/gamePic-' + gamePath['path' + diceTotal][0] + '.png';

    // hides anything related to dice
    diceRelatedArr.forEach(cur => cur.style.display = 'none');

    //sets all question replies to default color which is black. resets targeted reply
    btnRepliesArr.forEach(cur => cur.style.color = DOMcolors.defaultColor);
};

//helper function for transitioning screens from dice roll/gamepath pic to reply pic/reply. relies on imgReplyScreen boolean
function screenTransitioning() {
    if (imgReplyScreen === false) {
        //hides anything related to repled screen
        document.querySelector(DOMstrings.repliedScreenDOM).style.display = 'none';
        //makes anything question related visible
        questionDivArr.forEach(cur => cur.style.display = 'block')
        //makes anything dice related visible
        diceRelatedArr.forEach(cur => cur.style.display = 'block')
        //makes anything gamepath related aside from dice total/gamepath number visible.
        gamepathDisplayArr.forEach(cur => cur.style.display = 'block')

        document.querySelector(DOMstrings.btnRollDOM).style.visibility = 'hidden'
        document.querySelector(DOMstrings.btnNexTDOM).style.visibility = 'visible'
    } else {
        //makes anything related to replied screen visible
        document.querySelector(DOMstrings.repliedScreenDOM).style.display = 'block';
        //hides anything related to questions
        questionDivArr.forEach(cur => cur.style.display = 'none')
        //hides anything dice related visible
        diceRelatedArr.forEach(cur => cur.style.display = 'none')
        //hides anything gamepath related aside from dice total/gamepath number.
        gamepathDisplayArr.forEach(cur => cur.style.display = 'none')
    
        document.querySelector(DOMstrings.btnRollDOM).style.visibility = 'visible'
        document.querySelector(DOMstrings.btnNexTDOM).style.visibility = 'hidden'
    }
};