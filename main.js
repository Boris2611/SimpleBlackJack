//----------------------------------------------------
//---------S-I-M-P-L-E---B-L-A-C-K-J-A-C-K------------
//----------------------------------------------------

const flipSound = new Audio("flip.mp3");

let array = [];               //       List of all cards
let flip;                    //        Interval
let cardNum = 0;            //         Index in array
let index = 0;             //          Z Index
let counter = 52;         //           Counter To Show
let counter2 = 52;       //            Real Counter
let classs;
let turn = 1;

let myHand = 0;           // SUM OF PLAYERS CARDS
let dealerHand = 0;      //  SUM OF DEALERS CARDS

let decks = 1;           // Decks
let cards = decks * 52; //Cards

let dealersTurn = 0;
let playersTurn = 1;


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
    if (turn == 1 || counter < 15) {
        cardNum = 0;                                                  //  Setting index to 0 (+1)
        counter = 52;                                                //   Setting counter to 52 (-1)
        shuffleArray(array)                                         //     Calling Shuffle Function
    }


    counter2 = 52;
    document.getElementById("butt").style.visibility = "hidden"; 
    index = 0;                                                  //    Setting Z-Index back to 0 (+1)
    flip = setInterval(flipC,700)                              //      Flipping Card Time
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
        cardNum += 1;                //     Index (+1)

        hand += 1;                                           // 4 starting Cards
        classs = "hand" + hand;                             //
        document.getElementById(id).className = classs;    //
        document.getElementById(id).style.zIndex = index; //


        if (counter2 == 50) {
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

    if (dealerHand <= 17 || dealerHand < myHand) {
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
    clearButtons()
    clear = setTimeout(clearTable,2000)
    console.log("YOU LOST !!!")
    document.getElementById("winlose").innerHTML = "LOSE";
}
// ----------------------------------------------

// -------------  WIN  --------------------------

function win() {
    clearButtons()
    clear = setTimeout(clearTable,2000)
    console.log("WIN")
    document.getElementById("winlose").innerHTML = "WIN";
}
// ----------------------------------------------

// -------------  SPLIT  ------------------------
function split() {
    clearButtons()
    clear = setTimeout(clearTable,2000)
    console.log("SPLIT")
    document.getElementById("winlose").innerHTML = "SPLIT";
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
    
    document.getElementById("winlose").innerHTML = "";
    document.getElementById("back2").style.visibility = "hidden";
    document.getElementById("butt").style.visibility = "visible"
    
    for (var i = 0; i < played.length; i++) {
        id = played[i];
        // Clearing Cards
        document.getElementById(id).style.visibility = "hidden";
        document.getElementById(id).className = "none";
        // Clearing Sums
        document.getElementById("myHand").style.visibility = "hidden";
        document.getElementById("dealerHand").style.visibility = "hidden";
    }
}


/* 


function backC() {
    counter += 1;
    document.getElementById("counter").innerHTML = "Cards Left: " + counter + " -- Decks: " + decks;
    cardNum -= 1;
    index += 1;
    
    if (counter == 52) {
        clearInterval(backInDeck)
        document.getElementById("butt").style.visibility = "visible";
        document.getElementById("back").style.visibility = "visible";
    }

    id = "card" + array[cardNum];
    console.log(id + " - Back")
    document.getElementById(id).style.top = "20px";
    document.getElementById(id).style.zIndex = index;

    

}


function flipC() {
        counter -= 1; 
        document.getElementById("counter").innerHTML = "Cards Left: " + counter; // Cards Left
        index += 1; // Z Index
        flipSound.play()
        id = "card" + array[cardNum];
        console.log(id + " - Flipped")
        cardNum += 1;
        document.getElementById(id).style.top = "400px";
        document.getElementById(id).style.zIndex = index;

        if (counter == 0) {
            clearInterval(flip);
            cardNum = 52; // Just to remove first card
            document.getElementById("back").style.visibility = "hidden";
            setTimeout(function() {
                backInDeck = setInterval(backC, 100)
            }, 1000)
            index = 0;

        }
}

*/