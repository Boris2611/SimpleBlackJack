//----------------------------------------------------
//---------S-I-M-P-L-E---B-L-A-C-K-J-A-C-K------------
//----------------------------------------------------

const flipSound = new Audio("flip.mp3");
const winSound = new Audio("win.wav");
const loseSound = new Audio("lose.wav")
const startSound = new Audio("start.wav")
const chipSound = new Audio("chip.wav")

let decks = 2;                   // Decks
let cards = decks * 52;         //Cards

let array = [];               //       List of all cards
let flip;                    //        Interval
let cardNum = 0;            //         Index in array
let index = 0;             //          Z Index
let counter = cards;      //           Counter To Show
let counter2 = cards;    //            Real Counter
let classs;
let turn = 1;

let myHand = 0;           // SUM OF PLAYERS CARDS
let dealerHand = 0;      //  SUM OF DEALERS CARDS

let dealersTurn = 0;
let playersTurn = 1;

let money = 1000;
let chip = 0;
let chipSum = 0;





// ------  GENERATING VALUES  -------------------

let values = [0];
for (c = 1; c <= decks * 4; c++) {
    for (i = 1; i < 15; i++) {
        if (i != 11) {
            values.push(i);
        }
    }
}
// ----------------------------------------------


// -----  GENERATING NUMBERS ( 1 - 52 )  --------

for (i = 1; i < 53; i++) {
    array.push(i);
}
// ----------------------------------------------



// ----------  CALLING SHUFFLE / RESETING  -------

const shuffle = () => {
    startSound.play()

    if (turn == 1 || counter < 15) {
        cardNum = 0;                                                  //  Setting index to 0 (+1)
        counter = cards;                                                //   Setting counter to 52 (-1)
        shuffleArray(array)                                         //     Calling Shuffle Function
        for (let i = 1; i <= array.length; i++) {
            id = "card" + i;
            document.getElementById(id).className = "";             // Puting Cards Back in deck
            document.getElementById(id).className = "card";
            console.log(id)
        }
        alert("Deck Shuffled")
    }

    for (let i = 1; i < 5; i++) {
        id = "chip" + i;
        document.getElementById(id).style.visibility = "hidden";
    }


    counter2 = cards;
    document.getElementById("butt").style.visibility = "hidden"; 
    document.getElementById("clear").style.visibility = "hidden"; 
    index = 0;                                                  //    Setting Z-Index back to 0 (+1)
    flip = setInterval(flipC,700)                              //      Flipping Card Time

    money = money - chipSum;
    document.getElementById("money").innerHTML = "Money: " + money;
};
// -----------------------------------------------



// ---------------  SHUFFLE  ---------------------

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    console.log("Shuffled!")
}
// ----------------------------------------------


// Flipping Cards
let played = []; // Getting Played Cards
let hand = 0;   // For Showing Cards Propertly
function flipC() {
        flipSound.play()

        counter2 -= 1;  
        counter -= 1;                    // Counting cards from 52 to 0 (-1)
        index += 1;                     //  Z Index
        id = "card" + array[cardNum];  //   Making ID
        cardNum += 1;                 //     Index (+1)

        hand += 1;                                           // 4 starting Cards
        classs = "hand" + hand;                             //
        document.getElementById(id).className = classs;    //
        document.getElementById(id).style.zIndex = index; //
        document.getElementById(id).style.visibility = "visible";   // Showing new cards after first shuffle


        if (counter2 == cards - 2) {
            document.getElementById("back2").style.visibility = "visible";
        }
    

        if (playersTurn == 1) {
             // -------- FIRST FOUR ---------------
        if (counter2 == cards - 4) {

            clearInterval(flip);  // Stops Flipping Interval

            myHand = values[array[cardNum - 4]] + values[array[cardNum - 2]]; // Calculating Players Hands
            // CHECKING IF STARTING HAND IS OVER 20
            if (myHand >= 21) {
                myHand = 20;
            }

            dealerHand = values[array[cardNum - 3]] + values[array[cardNum - 1]]; // Calculating Dealers Hands
            // CHECKING IF STARTING HAND IS OVER 20
            if (dealerHand >= 21) {
                dealerHand = 20;
            }

            // SHOWING SUM OF BOTH HANDS
            document.getElementById("myHand").innerHTML = myHand;
            document.getElementById("dealerHand").innerHTML = values[array[cardNum - 1]];
            document.getElementById("myHand").style.visibility = "visible";
            document.getElementById("dealerHand").style.visibility = "visible";

            // SHOWING CHECK OR STAY BUTTONS
            document.getElementById("check").style.visibility = "visible";
            document.getElementById("stay").style.visibility = "visible";
        }


        // ----------- FIRST CHECK ------------------
        if (counter2 < cards - 4) {
            console.log("CHECK")
            
            myHand += values[array[cardNum - 1]]; 
            if (myHand > 21) {
                myHand = 'X';
                lose()
            }
            document.getElementById("myHand").innerHTML = myHand;
        }
        played.push(id)               //    Saving Played Cards

        }

        var hand2 = 0;
        // ------------------------------------------------------------------ DEALERS TURN ------------------------------ !!!
        if (dealersTurn == 1) {

            hand2 += 1;
            let class2 = "hand" + hand2 + hand2;
            console.log(class2)
            
            document.getElementById(id).className = class2;

            dealerHand += values[array[cardNum - 1]]; 
    
            if (dealerHand > 21) {
                dealerHand = "X";
                win()
            }
            document.getElementById("dealerHand").innerHTML = dealerHand;
            played.push(id)               //    Saving Played Cards
            stay()
        }

        document.getElementById("counter").innerHTML = "Cards Left: " + counter + " -- Decks: " + decks + " -- Turn: " + turn;

} 



// ----------------  CHECK  --------------------

function check() {
    flipC()
}
// ----------------------------------------------



// ------------------  STAY  --------------------
let show;
function showHidden() {
    document.getElementById("dealerHand").innerHTML = dealerHand;
    document.getElementById("check").style.visibility = "hidden";
    document.getElementById("stay").style.visibility = "hidden";
    document.getElementById("back2").style.visibility = "hidden";
    show = setTimeout(stay, 1000)
    flipSound.play()
}

function stay() {
    clearTimeout(show)
    console.log("Dealer's Turn")

    if (dealerHand < myHand) {
        dealersTurn = 1;
        playersTurn = 0;
        // DELAR PLAYING
        flipC()
    }

    else if (dealerHand > myHand) {
        lose()
    }

    else if (dealerHand < myHand) {
        win()
    }

    else if (dealerHand == myHand) {
        split()
    }
}
// ----------------------------------------------


let clear; // Clearing Table TimeOut
// -------------  LOSE  -------------------------

function lose() {
    loseSound.play()
    clearButtons()
    clear = setTimeout(clearTable,2000)
    console.log("YOU LOST !!!")
    document.getElementById("winlose").innerHTML = "LOSE";
    chipSum = 0;
}
// ----------------------------------------------

// -------------  WIN  --------------------------

function win() {
    winSound.play()
    clearButtons()
    money += chipSum * 2;
    clear = setTimeout(clearTable,2000)
    console.log("WIN")
    document.getElementById("winlose").innerHTML = "WIN: " + chipSum*2;
    chipSum = 0;
}
// ----------------------------------------------

// -------------  SPLIT  ------------------------
function split() {
    money += chipSum;
    clearButtons()
    clear = setTimeout(clearTable,2000)
    console.log("SPLIT")
    document.getElementById("winlose").innerHTML = "SPLIT: " + chipSum;
    chipSum = 0;
}
// ----------------------------------------------


function clearButtons(){
    // Clearing Buttons
    document.getElementById("check").style.visibility = "hidden";
    document.getElementById("stay").style.visibility = "hidden";
}


function clearTable() {

    dealersTurn = 0;
    playersTurn = 1;

    clearTimeout(clear)

    turn += 1;           //  +1 Turn
    hand = 0;
    hand2 = 0;
    
    document.getElementById("money").innerHTML = "Money: " + money;
    document.getElementById("winlose").innerHTML = "";
    document.getElementById("back2").style.visibility = "hidden";
    document.getElementById("butt").style.visibility = "visible";
    document.getElementById("clear").style.visibility = "visible";
    document.getElementById("bet").innerHTML = '';
    
    for (var i = 0; i < played.length; i++) {
        id = played[i];
        // Clearing Cards
        document.getElementById(id).style.visibility = "hidden";
        document.getElementById(id).className = "none";
        // Clearing Sums
        document.getElementById("myHand").style.visibility = "hidden";
        document.getElementById("dealerHand").style.visibility = "hidden";
    }

    for (let i = 1; i < 5; i++) {
        id = "chip" + i;
        document.getElementById(id).style.visibility = "visible";
    }
}



// ---------------- MONEY SYSTEM -------------------------------

function chip1() {
    chipSound.play()
    chip = 1;
    chipSum += chip;
    document.getElementById("bet").innerHTML = "Bet: " + chipSum;
}

function chip2() {
    chipSound.play()
    chip = 10;
    chipSum += chip;
    document.getElementById("bet").innerHTML = "Bet: " + chipSum;
}

function chip3() {
    chipSound.play()
    chip = 50;
    chipSum += chip;
    document.getElementById("bet").innerHTML = "Bet: " + chipSum;
}

function chip4() {
    chipSound.play()
    chip = 100;
    chipSum += chip;
    document.getElementById("bet").innerHTML = "Bet: " + chipSum;
}

function resetC() {
    chipSum = 0;
    chip = 0;
    document.getElementById("bet").innerHTML = "Bet: " + chipSum;

}



function deck1() {
    decks = 1;
    cards = decks * 52;
    turn = 1;
    counter = cards;  
    counter2 = cards; 
    document.getElementById("counter").innerHTML = "Cards Left: " + counter + " -- Decks: " + decks + " -- Turn: " + turn;
}

function deck2() {
    decks = 2;
    cards = decks * 52;
    turn = 1;
    counter = cards;  
    counter2 = cards; 
    document.getElementById("counter").innerHTML = "Cards Left: " + counter + " -- Decks: " + decks + " -- Turn: " + turn;
}

function deck3() {
    decks = 4;
    cards = decks * 52;
    turn = 1;
    counter = cards;  
    counter2 = cards; 
    document.getElementById("counter").innerHTML = "Cards Left: " + counter + " -- Decks: " + decks + " -- Turn: " + turn;
}

function deck4() {
    decks = 6;
    cards = decks * 52;
    turn = 1;
    counter = cards;  
    counter2 = cards; 
    document.getElementById("counter").innerHTML = "Cards Left: " + counter + " -- Decks: " + decks + " -- Turn: " + turn;
}

function deck5() {
    decks = 8;
    cards = decks * 52;
    turn = 1;
    counter = cards;  
    counter2 = cards; 
    document.getElementById("counter").innerHTML = "Cards Left: " + counter + " -- Decks: " + decks + " -- Turn: " + turn;
}