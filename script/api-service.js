import {
    login, fetchGet
} from "./fetch.js";

const greenCheck = '✅';
const redX = '❌';

document.addEventListener('DOMContentLoaded', onDomLoaded);

async function onDomLoaded() {

    // Make API calls and assign values to variables
    const loginResponse = await login('http://localhost:8080/login', 'user', 'password');
    const token = loginResponse.body.token;
    
    const breweryResponse = await fetchGet('http://localhost:8080/breweries/1', token);
    const brewery = breweryResponse.body;
    
    const beersResponse = await fetchGet('http://localhost:8080/breweries/1/beers', token)
    const beers = beersResponse.body;

    console.log(breweryResponse.statusCode);
    console.log(beersResponse.body);
    console.log(loginResponse.body.token);


    // Call fns to add retrieved data to DOM
    setBreweryInfo();
    
    const beerList = document.getElementById('beer-list');
    beers.forEach(createBeerCard);




    function setBreweryInfo() {
        
        const breweryInfo = document.getElementById('brewery-info');

        // Set Brewery name
        const breweryName = document.createElement('h2');
        breweryName.setAttribute('id', 'brewery-name')
        breweryName.innerText = brewery.breweryName;
        breweryInfo.insertAdjacentElement('afterbegin', breweryName);

        // TODO go back to set links for external links

        // set brewery address
        const addressHtml = `<p>${brewery.address}</p><p>${brewery.city}, ${brewery.state} ${brewery.zip}`;
        const breweryAddress = document.getElementById('brewery-address');
        breweryAddress.innerHTML = addressHtml;

        // set about us section 
        const aboutUs = document.querySelector('#about-us > p')
        aboutUs.innerText = brewery.aboutUs;

        // Set boolean details
        const servesFood = document.getElementById('serves-food');
        brewery.servesFood ?
            servesFood.innerText += greenCheck :
            servesFood.innerText += redX;
        const foodTruck = document.getElementById('food-truck');
        brewery.hasFoodTrucks ? 
            foodTruck.innerText += greenCheck :
            foodTruck.innerText += redX;
        const kidFriendly = document.getElementById('kids');
        brewery.kidFriendly ? 
            kidFriendly.innerText += greenCheck :
            kidFriendly.innerText += redX;
        const dogFriendly = document.getElementById('dogs');
        brewery.dogFriendly ?
            dogFriendly.innerText += greenCheck :
            dogFriendly.innerText += redX
        const daysOpen = document.getElementById('days-open');
        const daysOpenStr = brewery.daysOpen.split(',').join(' ');
        daysOpen.innerText = `Open: ${daysOpenStr}`
        const hours = document.getElementById('hours');
        hours.innerText = `${brewery.openTime} - ${brewery.closeTime}`;
    }

    function createBeerCard(beer) {
        
        // create card
        const card = document.createElement('div');
        card.classList.add('beer-card');
        beerList.appendChild(card);

        // add name
        const beerName = document.createElement('h3');
        beerName.classList.add('beer-name')
        beerName.innerText = beer.beerName;
        card.appendChild(beerName);

        // add image
        const beerPic = document.createElement('img');
        beerPic.setAttribute('src', beer.imgUrl);
        beerPic.classList.add('beer-img');
        card.appendChild(beerPic);
        
        // add icons
        // TODO refactor to utilize other tables/endpts
        const beerButtons = document.createElement('ul');
        beerButtons.classList.add('beer-buttons');
        card.appendChild(beerButtons);

        const comment = document.createElement('li');
        comment.classList.add('comment');
        comment.innerHTML = '<i class="fa-regular fa-comment"></i>';
        beerButtons.appendChild(comment);

        const save = document.createElement('li');
        save.classList.add('save-beer');
        save.innerHTML = '<i class="fa-regular fa-heart"></i>';
        beerButtons.appendChild(save)
        
    }

}