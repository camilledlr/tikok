// import service from "./api";

const input = document.getElementById('search-bar');
const button = document.getElementById('search-button');
const form = document.getElementById('search-form');
const container = document.getElementById('main-home')

function displayResults(results) {
    if (results.data.length == 0) {
        container.innerHTML = `<div class="no-result">No shops yet !</div>`
    } else {
    container.innerHTML ='<h2>Ces commerçants vendent ce que vous recherchez ...<h2>';
    const newGrid = document.createElement('div');
    container.appendChild(newGrid);
    newGrid.classList.add('grid-container')
    console.log(results)
    results.data.forEach(result => {
        newGrid.innerHTML += `<a href="/shopping/shop/${result.id_shop._id}">
        <div class="shop-block">
            <img class="image-shop" alt="shop" src="${result.id_shop.image}" width="300">
            <h3>${result.id_shop.name}</h3>
            <p class="description">${result.id_shop.description}</p>
        </div>
        </a>`})
    }
}

form.onsubmit = function (evt) {
    evt.preventDefault();
    console.log (input)
    axios.get('/shopping/search?q='+input.value)
    .then (dbRes => displayResults(dbRes))
    .catch
}
