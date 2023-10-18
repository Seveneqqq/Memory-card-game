const iconsTab = 
[
"./assets/briefcase.gif",
"./assets/building.gif",
"./assets/coffee-cup.gif",
"./assets/idea.gif",
"./assets/like.gif",
"./assets/money-bag.gif",
"./assets/mouse.gif",
"./assets/notebook.gif",
"./assets/phone.gif",
"./assets/rocket.gif",
"./assets/share.gif",
"./assets/shopping-cart.gif",
"./assets/social-media.gif",
"./assets/video.gif",
"./assets/workplace.gif",
"./assets/goal.gif"
];

const colorsTab = [
    "green",
    "blue",
    "cadetblue",
    "red", 
    "darkmagenta",
    "yellow",
    "tomato",
    "crimson",
    "brown",
    "violet",
    "purple",
    "orange",
    "pink",
    "seagreen",//
    "darkgreen"
];

const setRangeValue = () => {

    document.getElementById('rangeValueInput').value = 4;
    document.getElementById('rangeValue').innerText = `4 x 4`;

}

const showRangeValue = (sizeOfGame) => {

    document.getElementById('rangeValue').innerText = `${sizeOfGame} x ${sizeOfGame}`;

}

const createGame = (sizeOfGame) => {

    document.getElementById('menu').style.display = "none";
    let game = document.createElement("div");
    game.setAttribute("id","gameInfo");
    game.innerText = `${sizeOfGame} x ${sizeOfGame}`;
    document.body.appendChild(game);

    //stworzenie licznika

    let counter = document.createElement("div");
    counter.setAttribute("id","counterDiv");
    document.body.appendChild(counter);
    let pCounter = document.createElement("p");
    pCounter.setAttribute("id","counterP");
    counter.appendChild(pCounter);
    pCounter.innerText = "Licznik par : 5";
    //Stworzenie planszy na podstawie ilosci sizeOfGame

    let cardsBoard = document.createElement("div");
    cardsBoard.setAttribute("id","cardsBoard");
    document.body.appendChild(cardsBoard);

    for(let i=0;i<sizeOfGame*sizeOfGame;i++){
        let card = document.createElement("div");
        card.setAttribute(`id`,`card${i}`);
        card.setAttribute(`class`,`cards`);
        card.style.float="left";

        if(i%sizeOfGame==0){
            card.style.clear="both";
        }

        card.style.height = `${88/sizeOfGame}vh`;
        card.style.width = `${99/sizeOfGame}vw`;
        card.style.borderRadius = `25px`;
        card.style.margin = `auto`;
        cardsBoard.appendChild(card);

    }
    settingCards();
}

const settingCards = () => {

    shuffleArray(colorsTab);
    shuffleArray(iconsTab);
    shuffleArray(colorsTab);
    shuffleArray(iconsTab);

    let cardsTab = Array.from(document.getElementsByClassName("cards"));
    const numberOfCards = document.getElementsByClassName("cards").length;

        let finalColorsTab = [];
        let finalIconsTab = [];
        let numberOfColors = 0;
        let numbersOfIcons = 0;
        let kindsOfIcons = 0;
        let numberOfSetsIcons = 0;
        let numberOfSetsColors = 0;

        if(numberOfCards==16){
            numbersOfIcons = 8;
            numberOfColors = 2;
        }
        else if(numberOfCards==36){
            numbersOfIcons = 18;
            numberOfColors = 2;
        }
        else if(numberOfCards==64){
            numbersOfIcons = 16;
            numberOfColors = 4;
        }
        else if(numberOfCards==100){
            numbersOfIcons = 20;
            numberOfColors = 5;
        }
        else if(numberOfCards==144){
            numbersOfIcons = 12;
            numberOfColors = 12;
        }
        else{
            numbersOfIcons = 14;
            numberOfColors = 14;
        }

        kindsOfIcons = numbersOfIcons/2;
        numberOfSetsIcons = numberOfColors*2;
        numberOfSetsColors = numbersOfIcons;

        for(let i=0;i<kindsOfIcons;i++){
            for(let j=0;j<numberOfSetsIcons;j++){
                finalIconsTab.push(iconsTab[i]); //dziala poprawnie
            }
        }
        console.log(finalIconsTab);

        for(let i=0;i<numberOfColors;i++){
            for(let j=0;j<numberOfSetsColors;j++){
                finalColorsTab.push(colorsTab[i]); //dziala poprawnie
            }
        }

                console.log(finalIconsTab);
                console.log(finalColorsTab);

        let iterator = 0
        do{

            let rand = Math.floor(Math.random() * cardsTab.length);
            let cardImage = document.createElement("img");
            cardImage.setAttribute("class","images");
            cardImage.setAttribute("id",`img${iterator}`);
            cardImage.src = finalIconsTab[iterator];
            cardsTab[rand].appendChild(cardImage);  
            cardsTab[rand].style.backgroundColor = finalColorsTab[iterator];
            cardsTab.splice(rand,1);
            iterator++;

        }while(cardsTab.length != 0);

        hideCards();
}


const hideCards = () => {
    let cardImgs = Array.from(document.getElementsByClassName("images"));
    let cardsTab = Array.from(document.getElementsByClassName("cards"));
    for(let i=0;i<cardsTab.length;i++){
        cardsTab[i].classList.add("hidden");
        cardImgs[i].style.display = "none";
    }
}


//sprawdzenie czy dziala aktualizacja


const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
