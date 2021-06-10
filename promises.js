/************************************
PART 1
*************************************/
// Uncomment the next two lines for all part 1 exercises.

// const numList = document.querySelector('#numbers');
// const NUMURL = 'http://numbersapi.com/';



// Exercise #1
//****************************** */
// axios.get(`${NUMURL}7`)
//     .then(resp => {
//         console.log(resp.data);
//     });


// Exercise #2
//****************************** */
// axios.get(`${NUMURL}7,13,42,69`)
//     .then(prom => {
//         for (num in prom.data) {
//             const newLI = document.createElement(`li`);
//             newLI.innerHTML = `${prom.data[num]}`;
//             numList.append(newLI);
//         }
//     });

// Exercise #2
//****************************** */
// const allFourFacts = [];
// for (let i = 0; i < 4; i++) {
//     allFourFacts[i] = axios.get(`${NUMURL}42`)
//         .then(resp => {
//             console.log(resp.data)
//             return resp.data;
//         });
// }

// Promise.all(allFourFacts)
//     .then(factArr => {
//         factArr.forEach((fact) => {
//             const newLI = document.createElement(`li`);
//             newLI.innerHTML = `${fact}`;
//             numList.append(newLI);
//         })
//     }
//     )

/************************************
PART 2
*************************************/
// Uncomment next two lines for all part 2 exercises.

const NEWDECKURL = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
document.body.style.backgroundColor = 'green';

// Exercise #1
//****************************** */

// axios.get(NEWDECKURL)
//     .then(resp => {
//         return resp.data['deck_id']
//     })
//     .then(deckID => {
//         axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
//             .then(resp => {
//                 let card = resp.data.cards[0];
//                 console.log(`My card is ${card.value} of ${card.suit}`)
//             })
//     })



// Exercise #2
//****************************** */
// const hand = [];
// axios.get(NEWDECKURL)
//     .then(resp => {
//         return resp.data['deck_id']
//     })
//     .then(deckID => {
//         axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
//             .then(resp => {
//                 hand.push(resp.data.cards[0]);
//                 return deckID;
//             })
//             .then(deckID => {
//                 axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
//                     .then(resp => {
//                         hand.push(resp.data.cards[0]);
//                         return hand;
//                     })
//                     .then(hand => {
//                         for (let i = 0; i < hand.length; i++) {
//                             const card = hand[i];
//                             console.log(`The card is ${card.value} of ${card.suit}`)
//                         }
//                     })
//             })
//     })
//     .catch(err => console.log("whoops", err));



// Exercise #3
//****************************** */
const cardPile = document.getElementById('card-pile')
let deckID;
let count = 0;
function shuffleDeck() {
    axios.get(NEWDECKURL)
        .then(resp => {
            deckID = resp.data['deck_id']
            cardPile.style.visibility = "visible";
            const cardButton = document.getElementById('draw-card');
            cardButton.addEventListener('click', (e) => {
                e.preventDefault();
                dealCard();
            });
        })
        .catch(err => console.log("shuffle error, ", err));


}

function dealCard() {

    if (!document.getElementById('card-frame')) {
        const cardFrame = document.createElement('img');
        cardFrame.setAttribute('id', 'card-frame');
        axios
            .get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
            .then(resp => {
                count = 1;
                cardFrame.setAttribute('src', resp.data.cards[0].image);
                cardPile.appendChild(cardFrame);
            })
            .catch(err => console.log('draw error, ', err))
    } else {
        axios
            .get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
            .then(resp => {
                count = count + 1;
                const cardFrame = document.getElementById('card-frame');
                cardFrame.setAttribute('src', resp.data.cards[0].image);
            })
            .catch(err => console.log('draw error, ', err))
    }

    if (count >= 52) {
        document.getElementById('draw-card').style.visibility = 'hidden';
    }
}




window.onload = () => {
    const drawCardBtn = document.createElement('button');
    drawCardBtn.setAttribute('id', 'draw-card')
    drawCardBtn.innerText = 'Draw a card!';
    document.body.appendChild(drawCardBtn);
    shuffleDeck();
};
