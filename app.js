const foodSection = document.querySelector('.food-section');
const foodCard = document.querySelector('.food-card');
const hamburgerMenuBtn = document.querySelector('.hamburger-menu-button');
const likeBtn = document.createElement('i');
const nextMealBtn = document.createElement('i');
const prevMealBtn = document.createElement('i');
const mealIds = [];
const newIds = [];
let counter = 0;
let currentId;

async function getMeals() {

    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await response.json();
    console.log(data);
    const {strMealThumb, strMeal, idMeal} = data.meals[0];
    mealIds.push(idMeal);
    console.log(mealIds);
    currentId = idMeal;
    createHtmlElements(strMealThumb, strMeal);
    console.log(counter);
};

async function getPrevMeal(id) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    const {strMealThumb, strMeal} = data.meals[0];
    createHtmlElements(strMealThumb, strMeal);
}

const createHtmlElements = (strMealThumb, strMeal) => {

    const foodImg = document.createElement('img');
    const foodName = document.createElement('span');
    const foodCardBottom = document.createElement('div');
    likeBtn.className = 'fas fa-heart';
    nextMealBtn.className = 'fas fa-arrow-right';
    prevMealBtn.className = 'fas fa-arrow-left';

    nextMealBtn.classList.add('next-meal-button');
    prevMealBtn.classList.add('prev-meal-button');


    foodImg.src = strMealThumb+'/preview';
    foodName.textContent = strMeal;
    foodName.classList.add('food-name');
    foodImg.classList.add('food-img');
    foodCardBottom.classList.add('food-card-bottom');

    foodCard.append(foodImg);
    foodCardBottom.append(foodName);
    foodCardBottom.append(likeBtn);
    foodCard.append(foodCardBottom);
    foodSection.append(nextMealBtn);
    foodSection.append(prevMealBtn);

//   appendHtmlElements(foodImg, foodName, likeBtn, foodCard);
    
};

// const appendHtmlElements = (foodImg, foodName, likeBtn, foodCardBottom) => {

   
// }

hamburgerMenuBtn.addEventListener('click', () => {
const hamburgerMenu = document.querySelector('.hamburger-menu');
const hamburgerMenuLists = document.querySelector('.hamburger-menu-lists');
// hamburgerMenu.style.opacity = '1';
// hamburgerMenu.style.width = '20rem';
hamburgerMenu.classList.toggle('active');
hamburgerMenuLists.classList.toggle('active-lists');
hamburgerMenuBtn.classList.toggle('active-menu-button');

});

likeBtn.addEventListener('click', () => {
    likeBtn.style.color = '#e33f3f';
    newIds.push(currentId);
    
    localStorage.setItem('mealId', JSON.stringify(newIds));

});

nextMealBtn.addEventListener('click', () => {
    likeBtn.style.color= '#b6aeae';
    counter++;
    foodCard.innerHTML = '';
    getMeals();
});

prevMealBtn.addEventListener('click', () => {
    if(counter < 1) {
        return;
    }
    
    for (const i of newIds) {
        if(currentId ==! i) {
            likeBtn.style.color= '#b6aeae';
        }
    }

    foodCard.innerHTML = '';
    if(counter >= 1){
        counter--;
        console.log(counter);
        currentId = mealIds[counter]
        getPrevMeal(currentId);
        console.log(currentId);
    }
});

getMeals();