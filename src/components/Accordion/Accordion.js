import React from 'react';
import { excludeTags } from '../../utils';
import Collapse from './Collapse';

const Accordion = (props) => {
  const recipe = {
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    veryHealthy: false,
    cheap: false,
    veryPopular: false,
    sustainable: false,
    weightWatcherSmartPoints: 15,
    gaps: 'no',
    lowFodmap: false,
    aggregateLikes: 33,
    spoonacularScore: 65.0,
    healthScore: 13.0,
    creditsText: 'Foodista.com – The Cooking Encyclopedia Everyone Can Edit',
    license: 'CC BY 3.0',
    sourceName: 'Foodista',
    pricePerServing: 296.32,
    extendedIngredients: [
      {
        id: 1001,
        aisle: 'Milk, Eggs, Other Dairy',
        image: 'butter-sliced.jpg',
        consistency: 'solid',
        name: 'butter',
        nameClean: 'butter',
        original: '2 tablespoons butter',
        originalString: '2 tablespoons butter',
        originalName: 'butter',
        amount: 2.0,
        unit: 'tablespoons',
        meta: [],
        metaInformation: [],
        measures: {
          us: {
            amount: 2.0,
            unitShort: 'Tbsps',
            unitLong: 'Tbsps',
          },
          metric: {
            amount: 2.0,
            unitShort: 'Tbsps',
            unitLong: 'Tbsps',
          },
        },
      },
      {
        id: 2049,
        aisle: 'Produce;Spices and Seasonings',
        image: 'thyme.jpg',
        consistency: 'solid',
        name: 'fresh thyme',
        nameClean: 'thyme',
        original: '1 tablespoon fresh thyme',
        originalString: '1 tablespoon fresh thyme',
        originalName: 'fresh thyme',
        amount: 1.0,
        unit: 'tablespoon',
        meta: ['fresh'],
        metaInformation: ['fresh'],
        measures: {
          us: {
            amount: 1.0,
            unitShort: 'Tbsp',
            unitLong: 'Tbsp',
          },
          metric: {
            amount: 1.0,
            unitShort: 'Tbsp',
            unitLong: 'Tbsp',
          },
        },
      },
      {
        id: 11215,
        aisle: 'Produce',
        image: 'garlic.png',
        consistency: 'solid',
        name: 'garlic cloves',
        nameClean: 'garlic',
        original: '2 garlic cloves (minced)',
        originalString: '2 garlic cloves (minced)',
        originalName: 'garlic cloves (minced)',
        amount: 2.0,
        unit: '',
        meta: ['minced', '()'],
        metaInformation: ['minced', '()'],
        measures: {
          us: {
            amount: 2.0,
            unitShort: '',
            unitLong: '',
          },
          metric: {
            amount: 2.0,
            unitShort: '',
            unitLong: '',
          },
        },
      },
      {
        id: 1053,
        aisle: 'Milk, Eggs, Other Dairy',
        image: 'fluid-cream.jpg',
        consistency: 'liquid',
        name: 'heavy whipping cream',
        nameClean: 'cream',
        original: '1/2 cup of heavy whipping cream',
        originalString: '1/2 cup of heavy whipping cream',
        originalName: 'heavy whipping cream',
        amount: 0.5,
        unit: 'cup',
        meta: [],
        metaInformation: [],
        measures: {
          us: {
            amount: 0.5,
            unitShort: 'cups',
            unitLong: 'cups',
          },
          metric: {
            amount: 118.294,
            unitShort: 'ml',
            unitLong: 'milliliters',
          },
        },
      },
      {
        id: 1077,
        aisle: 'Milk, Eggs, Other Dairy',
        image: 'milk.png',
        consistency: 'liquid',
        name: 'milk',
        nameClean: 'milk',
        original: '1/2 tablespoon milk',
        originalString: '1/2 tablespoon milk',
        originalName: 'milk',
        amount: 0.5,
        unit: 'tablespoon',
        meta: [],
        metaInformation: [],
        measures: {
          us: {
            amount: 0.5,
            unitShort: 'Tbsps',
            unitLong: 'Tbsps',
          },
          metric: {
            amount: 0.5,
            unitShort: 'Tbsps',
            unitLong: 'Tbsps',
          },
        },
      },
      {
        id: 11282,
        aisle: 'Produce',
        image: 'brown-onion.png',
        consistency: 'solid',
        name: 'onion',
        nameClean: 'onion',
        original: '2/3 cup onion, chopped',
        originalString: '2/3 cup onion, chopped',
        originalName: 'onion, chopped',
        amount: 0.6666666666666666,
        unit: 'cup',
        meta: ['chopped'],
        metaInformation: ['chopped'],
        measures: {
          us: {
            amount: 0.667,
            unitShort: 'cups',
            unitLong: 'cups',
          },
          metric: {
            amount: 157.725,
            unitShort: 'ml',
            unitLong: 'milliliters',
          },
        },
      },
      {
        id: 1033,
        aisle: 'Cheese',
        image: 'parmesan.jpg',
        consistency: 'solid',
        name: 'parmesan cheese',
        nameClean: 'parmesan',
        original: '1/4 cup Parmesan cheese',
        originalString: '1/4 cup Parmesan cheese',
        originalName: 'Parmesan cheese',
        amount: 0.25,
        unit: 'cup',
        meta: [],
        metaInformation: [],
        measures: {
          us: {
            amount: 0.25,
            unitShort: 'cups',
            unitLong: 'cups',
          },
          metric: {
            amount: 59.147,
            unitShort: 'ml',
            unitLong: 'milliliters',
          },
        },
      },
      {
        id: 11120420,
        aisle: 'Pasta and Rice',
        image: 'penne-pasta.jpg',
        consistency: 'solid',
        name: 'penne pasta',
        nameClean: 'penne',
        original: '2 cups of penne pasta (but you can use anything!!)',
        originalString: '2 cups of penne pasta (but you can use anything!!)',
        originalName: 'penne pasta (but you can use anything!!)',
        amount: 2.0,
        unit: 'cups',
        meta: ['canned', '(but you can use anything!!)'],
        metaInformation: ['canned', '(but you can use anything!!)'],
        measures: {
          us: {
            amount: 2.0,
            unitShort: 'cups',
            unitLong: 'cups',
          },
          metric: {
            amount: 473.176,
            unitShort: 'ml',
            unitLong: 'milliliters',
          },
        },
      },
      {
        id: 11821,
        aisle: 'Produce',
        image: 'red-pepper.jpg',
        consistency: 'solid',
        name: 'red bell pepper',
        nameClean: 'red pepper',
        original: '1/2 cup of finely chopped red pepper',
        originalString: '1/2 cup of finely chopped red pepper',
        originalName: 'finely chopped red pepper',
        amount: 0.5,
        unit: 'cup',
        meta: ['red', 'finely chopped'],
        metaInformation: ['red', 'finely chopped'],
        measures: {
          us: {
            amount: 0.5,
            unitShort: 'cups',
            unitLong: 'cups',
          },
          metric: {
            amount: 118.294,
            unitShort: 'ml',
            unitLong: 'milliliters',
          },
        },
      },
      {
        id: 1102047,
        aisle: 'Spices and Seasonings',
        image: 'salt-and-pepper.jpg',
        consistency: 'solid',
        name: 'salt and pepper',
        nameClean: 'salt and pepper',
        original: 'Salt and pepper to taste',
        originalString: 'Salt and pepper to taste',
        originalName: 'Salt and pepper to taste',
        amount: 4.0,
        unit: 'servings',
        meta: ['to taste'],
        metaInformation: ['to taste'],
        measures: {
          us: {
            amount: 4.0,
            unitShort: 'servings',
            unitLong: 'servings',
          },
          metric: {
            amount: 4.0,
            unitShort: 'servings',
            unitLong: 'servings',
          },
        },
      },
      {
        id: 15077,
        aisle: 'Seafood',
        image: 'smoked-salmon.png',
        consistency: 'solid',
        name: 'smoked salmon',
        nameClean: 'smoked salmon',
        original: '8 ounces smoked salmon',
        originalString: '8 ounces smoked salmon',
        originalName: 'smoked salmon',
        amount: 8.0,
        unit: 'ounces',
        meta: ['smoked'],
        metaInformation: ['smoked'],
        measures: {
          us: {
            amount: 8.0,
            unitShort: 'oz',
            unitLong: 'ounces',
          },
          metric: {
            amount: 226.796,
            unitShort: 'g',
            unitLong: 'grams',
          },
        },
      },
    ],
    id: 660382,
    title: 'Smoked Salmon Pasta',
    readyInMinutes: 45,
    servings: 4,
    sourceUrl: 'http://www.foodista.com/recipe/YFCWP7PB/smoked-salmon-pasta',
    image: 'https://spoonacular.com/recipeImages/660382-556x370.jpg',
    imageType: 'jpg',
    summary:
      'Smoked Salmon Pasta might be just the main course you are searching for. This recipe makes 4 servings with <b>474 calories</b>, <b>21g of protein</b>, and <b>22g of fat</b> each. For <b>$2.96 per serving</b>, this recipe <b>covers 21%</b> of your daily requirements of vitamins and minerals. If you have milk, salmon, salt and pepper, and a few other ingredients on hand, you can make it. To use up the milk you could follow this main course with the <a href="https://spoonacular.com/recipes/milky-way-brownie-bites-540544">Milky Way Brownie Bites</a> as a dessert. From preparation to the plate, this recipe takes around <b>45 minutes</b>. A couple people made this recipe, and 33 would say it hit the spot. It is a good option if you\'re following a <b>pescatarian</b> diet. All things considered, we decided this recipe <b>deserves a spoonacular score of 68%</b>. This score is solid. Try <a href="https://spoonacular.com/recipes/smoked-salmon-pasta-247226">Smoked Salmon Pasta</a>, <a href="https://spoonacular.com/recipes/smoked-salmon-pasta-87836">Smoked Salmon Pasta</a>, and <a href="https://spoonacular.com/recipes/pasta-with-smoked-salmon-270708">Pasta with Smoked Salmon</a> for similar recipes.',
    cuisines: [],
    dishTypes: ['lunch', 'main course', 'main dish', 'dinner'],
    diets: ['pescatarian'],
    occasions: [],
    instructions:
      "<ol><li>In saucepan, melt butter over medium heat. </li><li>Saute onion and red pepper about 1 minute. </li><li>Add garlic and saute for another minute or two. Add smoked salmon and saute 2 minutes. </li><li>Bring the temperature up a notch and add cream, milk, salt, pepper, thyme, and half of the Parmesan cheese. </li><li>Reduce to low. </li><li>Stir gently about 5 minutes until it thickens a bit. Don't let it boil. </li><li>Remove from heat and keep warm. </li><li>Cook pasta following package instructions until al dente. </li><li>Pour sauce over pasta. Sprinkle with more Parmesan cheese to serve.</li></ol>",
    analyzedInstructions: [
      {
        name: '',
        steps: [
          {
            number: 1,
            step: 'In saucepan, melt butter over medium heat.',
            ingredients: [
              {
                id: 1001,
                name: 'butter',
                localizedName: 'butter',
                image: 'butter-sliced.jpg',
              },
            ],
            equipment: [
              {
                id: 404669,
                name: 'sauce pan',
                localizedName: 'sauce pan',
                image: 'sauce-pan.jpg',
              },
            ],
          },
          {
            number: 2,
            step: 'Saute onion and red pepper about 1 minute.',
            ingredients: [
              {
                id: 11821,
                name: 'red pepper',
                localizedName: 'red pepper',
                image: 'red-pepper.jpg',
              },
              {
                id: 11282,
                name: 'onion',
                localizedName: 'onion',
                image: 'brown-onion.png',
              },
            ],
            equipment: [],
            length: {
              number: 1,
              unit: 'minutes',
            },
          },
          {
            number: 3,
            step: 'Add garlic and saute for another minute or two.',
            ingredients: [
              {
                id: 11215,
                name: 'garlic',
                localizedName: 'garlic',
                image: 'garlic.png',
              },
            ],
            equipment: [],
          },
          {
            number: 4,
            step: "Add smoked salmon and saute 2 minutes. Bring the temperature up a notch and add cream, milk, salt, pepper, thyme, and half of the Parmesan cheese. Reduce to low. Stir gently about 5 minutes until it thickens a bit. Don't let it boil.",
            ingredients: [
              {
                id: 1033,
                name: 'parmesan',
                localizedName: 'parmesan',
                image: 'parmesan.jpg',
              },
              {
                id: 15077,
                name: 'smoked salmon',
                localizedName: 'smoked salmon',
                image: 'smoked-salmon.png',
              },
              {
                id: 1002030,
                name: 'pepper',
                localizedName: 'pepper',
                image: 'pepper.jpg',
              },
              {
                id: 1053,
                name: 'cream',
                localizedName: 'cream',
                image: 'fluid-cream.jpg',
              },
              {
                id: 2049,
                name: 'thyme',
                localizedName: 'thyme',
                image: 'thyme.jpg',
              },
              {
                id: 1077,
                name: 'milk',
                localizedName: 'milk',
                image: 'milk.png',
              },
              {
                id: 2047,
                name: 'salt',
                localizedName: 'salt',
                image: 'salt.jpg',
              },
            ],
            equipment: [],
            length: {
              number: 7,
              unit: 'minutes',
            },
          },
          {
            number: 5,
            step: 'Remove from heat and keep warm. Cook pasta following package instructions until al dente.',
            ingredients: [
              {
                id: 20420,
                name: 'pasta',
                localizedName: 'pasta',
                image: 'fusilli.jpg',
              },
            ],
            equipment: [],
          },
          {
            number: 6,
            step: 'Pour sauce over pasta.',
            ingredients: [
              {
                id: 20420,
                name: 'pasta',
                localizedName: 'pasta',
                image: 'fusilli.jpg',
              },
              {
                id: 0,
                name: 'sauce',
                localizedName: 'sauce',
                image: '',
              },
            ],
            equipment: [],
          },
          {
            number: 7,
            step: 'Sprinkle with more Parmesan cheese to serve.',
            ingredients: [
              {
                id: 1033,
                name: 'parmesan',
                localizedName: 'parmesan',
                image: 'parmesan.jpg',
              },
            ],
            equipment: [],
          },
        ],
      },
    ],
    originalId: null,
    spoonacularSourceUrl: 'https://spoonacular.com/smoked-salmon-pasta-660382',
  };

  const recipeDetails = [
    {
      type: 'ingredients',
      data: recipe.extendedIngredients.map(
        (ingredient) => `${ingredient.nameClean} ${ingredient.amount} ${ingredient.measures.metric.unitShort}`,
      ),
    },
    {
      type: 'equipment',
      data: recipe.analyzedInstructions[0].steps.map((step) => step.equipment.map((equip) => equip.name).join('')),
    },
    { type: 'summary', data: [excludeTags(recipe.summary)] },
    { type: 'instructions', data: recipe.analyzedInstructions[0].steps.map((step) => step.step) },
  ];

  const recipiInfoItems = recipeDetails.map((recipeInfo, index) => (
    <Collapse key={index} heading={recipeInfo.type} content={recipeInfo.data} />
  ));

  return <ul>{recipiInfoItems}</ul>;
};

export default Accordion;
