const searchInput = document.getElementById('searchInput');
const searchCountry = document.getElementById('searchCountry');
const randomMeal = document.getElementById('randomMeal');
const results = document.getElementById('results');
const listMeal = document.getElementById('listMeal');
let urlSearch ='';

const fetchSearch = async(url)=>{
    meals = await fetch(`https://www.themealdb.com/api/json/v1/1/${url}`).then(res => res.json()).then(res => res.meals);
    console.log(meals);

}

const searchDisplay = async()=>{
    await fetchSearch(urlSearch);

    if(meals == null){
        results.innerHTML = '<span class="noResult">Aucun resultats</span>';
    }

    else{
        results.innerHTML = (meals.map(meal =>(
                  
      `
      <div class="searchContainer">
        <h2>${meal.strMeal}</h2>
        <div class="infos">
          <div>origin : ${meal.strArea}</div>
          <div>category : ${meal.strCategory}</div>
        </div>
        <img src='${meal.strMealThumb}' /></br>
        <a href="${meal.strYoutube}" target="_blank"><i class="fab fa-youtube"></i></a>
      </div>
      `
        )).join('')
        );

    }
}

const randomMealDisplay = async()=>{
    await fetchSearch('random.php');
    results.innerHTML = (meals.map(meal=>(
        `
        <div class="randomContainer">
          <h2>${meal.strMeal}</h2>
          <div class="infos">
            <div>origin : ${meal.strArea}</div>
            <div>catégory : ${meal.strCategory}</div>
          </div>
          <img src='${meal.strMealThumb}' />
          <p>${meal.strInstructions}</p>
          <a href="${meal.strYoutube}" target="_blank"><i class="fab fa-youtube"></i></a>
        </div>
      `
    ))
    );
};

const listDisplay = async()=>{
    await fetchSearch('list.php?a=list');

    
        results.innerHTML = (meals.map(meal =>(
                  
      `
      <div class="searchContainer">
       
        <div class="infos">
          <div>origin : ${meal.strArea}</div>
          
        </div>
        
      </div>
      `
        ))
        );

    
};

searchCountry.addEventListener('input',(e)=>{
    urlSearch=`filter.php?a=${e.target.value}`;
    searchDisplay();
})

searchInput.addEventListener('input',(e)=>{
    urlSearch = `search.php?s=${e.target.value}`;
    searchDisplay();
});
randomMeal.addEventListener('click',randomMealDisplay);
randomMealDisplay();

listMeal.addEventListener('click',listDisplay);


