import axios from 'axios';

const apiUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/';

export const getRandomRecipe = async (number = 1) => {
  try {
    const { data } = await axios.get(`${apiUrl}/recipes/random`, {
      headers: {
        'content-type': 'application/json',
        'x-rapidapi-host': process.env.REACT_APP_RAPID_API_HOST,
        'x-rapidapi-key': process.env.REACT_APP_RAPID_API_SECRET_KEY,
      },
      params: { number },
    });
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const searchRecipes = async (keyword, number = 10, offset = 0) => {
  try {
    const { data } = await axios.get(`${apiUrl}/recipes/search`, {
      headers: {
        'content-type': 'application/json',
        'x-rapidapi-host': process.env.REACT_APP_RAPID_API_HOST,
        'x-rapidapi-key': process.env.REACT_APP_RAPID_API_SECRET_KEY,
      },
      params: {
        query: keyword,
        number,
        offset,
      },
    
    });
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};
export const getRecipeById = async (id) => {
  try {
    const { data } = await axios.get(`${apiUrl}/recipes/${id}/information`, {
      headers: {
        'content-type': 'application/json',
        'x-rapidapi-host': process.env.REACT_APP_RAPID_API_HOST,
        'x-rapidapi-key': process.env.REACT_APP_RAPID_API_SECRET_KEY,
      },
      params: { includeNutrition: 'true' },
    });
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};

const configExample = {
  headers: {
    'content-type': 'application/json',
    'x-rapidapi-host': process.env.REACT_APP_RAPID_API_HOST,
    'x-rapidapi-key': process.env.RAPID_API_SECRET_KEY,
  },
  params: {
    number: 5,
  },
};
