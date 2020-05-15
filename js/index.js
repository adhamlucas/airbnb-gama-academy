const staysCards = document.getElementsByClassName("stays-cards");
const API_URL = "https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72";

let currentPage = 1;

const ITEMS_PER_PAGE = 10;

const paginateData = (data) => {
    return data.reduce((total, current, index) => {
        const belongArrayIndex = Math.ceil((index + 1) / ITEMS_PER_PAGE) - 1;

        total[belongArrayIndex] ? total[belongArrayIndex].push(current) : total.push([current])

        return total;
    }, []);
}

const fetchAPI = async(url) => {
    let response = await fetch(url);
    const textResponse = await response.text();
    return JSON.parse(textResponse);
}

const changePage = (pageToBeRendered) => {
    currentPage = pageToBeRendered;
    renderPage();
}

const renderPaginationMenu = (paginateData) => {

    const paginationContainer = document.querySelector('.pagination');

    while (paginationContainer.firstChild) {
        paginationContainer.removeChild(paginationContainer.firstChild);
    }

    const previousPage = document.createElement('span');
    previousPage.className = 'page-changer';
    previousPage.innerHTML = '<';
    previousPage.addEventListener('click', 
        () => currentPage <= 1 ? () => { } : changePage(currentPage - 1));
    paginationContainer.appendChild(previousPage);

    paginateData.forEach((_, index) => {
        const pageButton = document.createElement('span');
        pageButton.innerHTML = index + 1;

        pageButton.addEventListener('click', 
            () => changePage(index + 1));

        if (currentPage === index + 1) {
            pageButton.className = 'active';
        }

        paginationContainer.appendChild(pageButton);
    });

    const nextPage = document.createElement('span');
    nextPage.className = 'page-changer';
    nextPage.innerHTML = '>';
    nextPage.addEventListener('click',
        () => currentPage >= paginateData.lenght ? () => { } : changePage(currentPage + 1));
    paginationContainer.appendChild(nextPage);
}

const renderPage = async () => {
    const apiData = await fetchAPI(API_URL);

    const paginatedData = paginateData(apiData);

    renderPaginationMenu(paginatedData);

    cardContainer = document.querySelector(".stays-cards");

    while (cardContainer.firstChild) {
        cardContainer.removeChild(cardContainer.firstChild);
    }

    paginatedData[currentPage - 1].forEach(property => {
        const { name, photo, price, property_type } = property;

        cardItem = document.createElement('div');
        cardItem.className = 'card-item';
        
        card = document.createElement('div');
        card.className = 'card';
        
        
        imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';
        cardImage = document.createElement('img');
        cardImage.className = 'property-image';
        cardImage.src = photo;
        
        cardInfo = document.createElement('div');
        
        propertyType = document.createElement('p');
        propertyType.className = 'property-type';
        propertyType.innerHTML = property_type;
        
        propertyDescription = document.createElement('p');
        propertyDescription.className = 'property-description';
        propertyDescription.innerHTML = name;

        propertyPrice = document.createElement('p');
        propertyPrice.className = 'property-price';
        propertyPrice.innerHTML = `R$<strong>${price}</strong>/noite`;

        cardContainer.appendChild(cardItem);
        cardItem.appendChild(card);
        card.appendChild(imageContainer);
        card.appendChild(cardInfo);
        imageContainer.appendChild(cardImage);
        cardInfo.appendChild(propertyType);
        cardInfo.appendChild(propertyDescription);
        cardInfo.appendChild(propertyPrice);

    });
}

renderPage();