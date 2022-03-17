// index.js is our API !!!!

// Creating a backend app with express 
const express = require('express');

// Using request-promise to make api requests
const request = require('request-promise');


// Initializing our application
const app = express();
// Creating ou PORT
const PORT = process.env.PORT || 5000;

//Creating our baseUrl but it requires everyone that use our api to get they're own apiKey and not use ours:

const generateScraperUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

//Allowing our application to parse json
app.use(express.json());

// Creating our express app's rout
app.get('/',(req,res) => {
    res.send('Welcome to Mezz01 amazon API !!! ');
});

// Getting Product Details :
app.get('/products/:productId', async(req,res) => {
    const { productId } = req.params;
    // getting the apikey of every API user
    const {apiKey} = req.query;
    try{
        // getting a response from scraperapi
        // using the generateScraperUrl function to get the API users scraper API 
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/dp/${productId}`);
        
        res.json(JSON.parse(response));
    
    }catch(error){
        res.json(error);
    }
});




// Getting Product Reviews :
app.get('/products/:productId/reviews', async(req,res) => {
    const { productId } = req.params;
      // getting the apikey of every API user
      const {apiKey} = req.query;
    try{
        // getting a response from scraperapi
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/product-reviews/${productId}`);
        
        res.json(JSON.parse(response));
    
    }catch(error){
        res.json(error);
    }
});   


// IMPORTANT: getting search results like on amazon search bar
// we change on app.get() !!!
app.get('/search/:searchQuery', async(req,res) => {
    // modifiying req.params
    const { searchQuery } = req.params;
      // getting the apikey of every API user
      const {apiKey} = req.query;
    try{
        // getting a response from scraperapi
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/s?k=${searchQuery}`);
        
        res.json(JSON.parse(response));
    
    }catch(error){
        res.json(error);
    }
}); 



// Starting our server :
// Making our application listen on the PORT
app.listen(PORT, () => console.log(`server running on port ${PORT}`)); 