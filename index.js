let conRecipe = document.getElementById("con-recipe")
let conDescription = document.getElementById("con-description")
let conRecipe1 = document.getElementById("con-recipe1")
let searchRecipe = document.getElementById("searchKey")

searchRecipe.addEventListener("keyup", loadItem = (event) => {
    if(event.keyCode === 13){
        conRecipe.innerHTML=""
        conDescription.innerHTML=""
        conRecipe1.innerHTML=""
        fetch ("https://api.spoonacular.com/recipes/complexSearch?apiKey=442c7b86d4654240b4bb8bacf587f3de&query=" + event.target.value, {
            "method" : "GET",
        })
        .then(response => response.json())
        .then(dataRecipe => {
            var recipeDetails = dataRecipe.results
            recipeDetails.forEach((element) => {
                var createRecipeEl = document.createElement("div")
                var recipeContent = `
                <div class="itemList">
                <h3> ${element.title} </h3>
                <img src=" ${element.image} ">
                <button class"btnDetails" data-detailsUrl="https://api.spoonacular.com/recipes/${element.id}/information?includeNutrition=false&apiKey=442c7b86d4654240b4bb8bacf587f3de"> Check Details </button>
                </div
                `
                createRecipeEl.innerHTML = recipeContent
                conRecipe.append(createRecipeEl)
            })
            let detailsItem = document.querySelector(".btnDetails")
            document.addEventListener("click", getDetails)
        })
    }
})

function getDetails (event) {
    if(event.target.dataset.detailsurl != undefined){
        fetch(event.target.dataset.detailsurl, {
            "method" : "GET",
        })
        .then(response => response.json())
        .then(dataDetails => {
            conRecipe.innerHTML=""
            var recipeDetContent = `
                <div class="recipeTitle"> ${dataDetails.title} </div>
                <div class="recipeSummary"> ${dataDetails.summary} </div>
                
            `
            document.getElementById('con-description').innerHTML = recipeDetContent
            conRecipe1.innerHTML="<h3>Ingredients: </h3>"    
            var dataDetailsRecipe = dataDetails.extendedIngredients
            dataDetailsRecipe.forEach((element) => {
                var createRecipeDetEl1 = document.createElement("ul")
                createRecipeDetEl1.className= "ingList"
                var recipeDetContent1 = `
                    <li> ${element.name} - ${element.amount} </li>
                `
                createRecipeDetEl1.innerHTML = recipeDetContent1
                conRecipe1.append(createRecipeDetEl1)
            })
        })
    }
}