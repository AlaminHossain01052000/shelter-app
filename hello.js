const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition',
  params: {
    query: '1lb brisket with fries'
  },
  headers: {
    'X-RapidAPI-Key': '1d5a982298msh6ef75aa4aee0176p1bc512jsn5b39d28b00e7',
    'X-RapidAPI-Host': 'nutrition-by-api-ninjas.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}