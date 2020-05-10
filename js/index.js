const apiUrl = "https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72";
const staysCards = document.getElementsByClassName("stays-cards");

async function getStays() {
    return await fetch(apiUrl)
    .then(async (response) => await response.json());
}

function createCard(stay){
    let cardItem = document.createElement('div');
    cardItem.className = 'card-item';

    cardItem.innerHTML = `
        <div class="card">
            <div class="image-container">
                <img class="stay-image" src="${stay.photo}" alt="apartment photo">
            </div>
            <p class="apartment-type">${stay.property_type}</p>
            <p class="apartment-description">${stay.name}</p>
            <p class="apartment-price"><strong>R$${stay.price}</strong>/noite</p>
        </div>
    `;

    return cardItem;
}


function pushCards(){
    getStays().then(array => array.forEach((stay) => {
        let newCard = createCard(stay);
        staysCards[0].appendChild(newCard);
    }));
}

pushCards();

//dados = getStays().then(array => array.map(pushingCards));


