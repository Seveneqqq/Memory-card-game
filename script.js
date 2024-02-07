let licznik = 0;



let rangeValue = () => {
    let value = document.getElementById("gameSize").value;
    let gameSize = document.getElementById("game-size-h1");

    gameSize.innerText = `${value} x ${value}`;
}

let gameSize = () => {
    
    let value = document.getElementById("gameSize").value;
    var username = document.getElementById('username').value;
    console.log(username);
    var newURL = window.location.href + '?username=' + encodeURIComponent(username);
    window.history.pushState({ path: newURL }, '', newURL);
    document.body.innerHTML = "";

    let boardContainer = document.createElement("div");
    boardContainer.id = "boardContainer";
    document.body.appendChild(boardContainer);
    // Tworzenie kontenera na divy
    let header = document.createElement("div");
    header.id = "headerContainer";
    document.body.appendChild(header);

    let headerDiv1 = document.createElement("div");
    headerDiv1.className = "header-elems";
    header.appendChild(headerDiv1);

    let headerDiv2 = document.createElement("div");
    headerDiv2.className = "header-elems";
    header.appendChild(headerDiv2);

    headerDiv1.innerHTML = `<h1 class='header-elems-text'>${value} x ${value}</h1>`;
    headerDiv2.innerHTML = `<h1 class='header-elems-text' id="movesCount">0 Ruchów</h1>`;

    

    let colors = generateColors(value * value / 2); // Generowanie kolorów dla par kart

    // Generowanie divów
    for (let i = 0; i < value * value; i++) {
        let gameCell = document.createElement("div");
        gameCell.className = "cards";
        boardContainer.appendChild(gameCell);
        gameCell.id = `card${i}`;
        gameCell.dataset.color = colors[i % (value * value / 2)]; // Przypisanie koloru do atrybutu danych
        gameCell.addEventListener("click", () => flipCard(gameCell, value));
    }

    let cardsArr = document.getElementsByClassName('cards');
    let cardsArray = Array.prototype.slice.call(cardsArr);

    cardsArray.forEach(el => {
        el.classList.add("hiddenCard");
    });
}

let flippedCards = [];

let flipCard = (card, gridSize) => {
    
    if (flippedCards.length < 2 && !flippedCards.includes(card)) {
        card.style.backgroundColor = card.dataset.color; // Wyświetlenie koloru karty
        card.classList.remove("hiddenCard"); // Usunięcie klasy hiddenCard
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            setTimeout(() => checkMatch(gridSize), 1000);
        }
    }
}

let checkMatch = (gridSize) => {
    let [card1, card2] = flippedCards;

    if (card1.dataset.color === card2.dataset.color) {
        console.log(`Match! Cards with IDs ${card1.id} and ${card2.id} form a pair.`);
        card1.removeEventListener("click", () => flipCard(card1, gridSize));
        card2.removeEventListener("click", () => flipCard(card2, gridSize));
        card1.classList.add("win");
        card2.classList.add("win");

        card1.style.display = "none";
        card2.style.display = "none";
        licznik++;
        document.getElementById("movesCount").innerHTML = `${licznik} Ruchów`;

        if(document.getElementsByClassName("cards").length == document.getElementsByClassName('win').length){
            let x = confirm('wygrales, czy chcesz jeszcze raz ? ');

            if(x == true){
                window.location = "localhost/pbjsgra/index.html";
            }
            else{
                winFunction();
            }

            
        }

        
    } else {
        console.log(`No match. Cards with IDs ${card1.id} and ${card2.id} do not form a pair.`);
        setTimeout(() => coverCards(card1, card2), 600);
        licznik++;
        document.getElementById("movesCount").innerHTML = `${licznik} Ruchów`;

       
    }

    flippedCards = [];
}

let coverCards = (card1, card2) => {
    
    card1.classList.add("hiddenCard");
    card2.classList.add("hiddenCard");
}

let generateColors = (numPairs) => {
    let colors = [];
    for (let i = 0; i < numPairs; i++) {
        let color = getRandomColor();
        colors.push(color, color); // Każda para ma ten sam kolor
    }
    return shuffle(colors);
}

let getRandomColor = () => {
    // Funkcja zwracająca losowy kolor w formacie rgb
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

let shuffle = (array) => {
    // Funkcja tasująca elementy tablicy
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let winFunction = () => {
    console.log(`Your score: ${licznik}`);
    var params = new URLSearchParams(window.location.search);
    var username = params.get('username');
    // Zapisanie wyniku do local storage
    
    let scoreData = {
        username: username,
        moves: licznik
        
    };

    let scores = JSON.parse(localStorage.getItem('memoryGameScores')) || [];
    scores.push(scoreData);
    localStorage.setItem('memoryGameScores', JSON.stringify(scores));

    // Wyświetlanie posortowanej tablicy wyników w konsoli
    displaySortedScores();
};

let displaySortedScores = () => {
    let scores = JSON.parse(localStorage.getItem('memoryGameScores')) || [];

    // Sortowanie wyników według liczby ruchów (rosnąco)
    scores.sort((a, b) => a.moves - b.moves);

    console.log('Leaderboard:');
    scores.forEach((score, index) => {
        
        console.log(`Użytkownik : ${score.username}  #${index + 1}: Ruchy : ${score.moves}`);
    });
};
