$(document).ready(function () {
    //check if search is clicked
    $('#btn').click(function (event) {
        event.preventDefault(); //prevents default form behavior

        //get the value of search
        const drinkName = $('#search').val().trim();

        if (!drinkName) {
            alert('Please enter a cocktail name');
            return; //exit
        }

        //make search blank
        $('#search').val('');

        //fetch the drink
        $.ajax({
            type: 'GET',
            url:
                'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' +
                drinkName,
            dataType: 'json',

            success: function (response) {
                const drinks = response.drinks;
                //check if drink is in coktails
                if (!drinks || drinks.length === 0) {
                    //Drink not found
                    console.log('Error!! No drinks found of the search name');
                    $('.cocktail-info')
                        .html(
                            '<p class="no-drink">No cocktail Found, Please try a different name</p>'
                        )
                        .show();
                    return; //exit
                }

                //empty any info in the div box
                $('.cocktail-info').empty();

                //fetch ingredients and the instruction
                const currDrink = drinks[0];
                let ingredients = [];
                let instruction;

                let i = 1;
                while (currDrink['strIngredient' + i] !== null) {
                    //strIngredient1, strIngredient2...
                    ingredients.push(currDrink['strIngredient' + i]);
                    i++;
                }

                //fetch instruction
                instruction = currDrink['strInstructions'];

                //display
                const drinkDetails = `
                        <div class="drinkDetails">
                            <div class="drinkName">
                            <h2>${currDrink.strDrink}</h2>
                            <img src="${currDrink.strDrinkThumb}" alt="${
                    currDrink.strDrink
                }"/>
                            </div>
                        <div class="ingredients">
                            <h3> Ingredients</h3>
                            <ul>
                                ${ingredients
                                    .map(
                                        (ingredient) => `<li>${ingredient}</li>`
                                    )
                                    .join('')}
                            </ul>
                        </div>
                        <div class="instructions">
                            <h3> Instructions</h3>
                            <p>${instruction}</p>
                        </div>
                    `;
                //add to cocktail-info page
                $('.cocktail-info').append(drinkDetails);
                $('.cocktail-info').show();
            },

            //catch any error thrown while fetching
            error: (errorThrown) => {
                console.log('Error!! Error thrown :', errorThrown);
                $('.cocktail-info')
                    .html(
                        '<p class="no-drink">Error occurred when fetching information from API</p>'
                    )
                    .show();
            },
        });
    });
});
