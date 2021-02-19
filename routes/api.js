const axios = require('axios');
const router = require("express").Router();
const moment = require('moment')
require('dotenv').config();

const ZOMATO = process.env.ZOMATO_API


// Date and time stuff
const preFormatDate = moment.utc()
preFormatDate.local();
// FOR FUTURE USE: will be required for future implementation
// const dateAndTime = preFormatDate.format('YYYY-MM-DDTHH:mm:ss')

// TODO: Take User input from the screen  for the search. 
// TODO: IMplement Fuse.js ????? maybe nopt possible since im pulling from a data set i dont control
// TODO: Remove call to ticketmaster and use either fandango or rotten tomatoes api for movie suggestions


router.post("/api/call", (req, res) =>{
  const city = req.body.city
    async function findDate(city) {
        try {
          const response = await axios.get(`https://developers.zomato.com/api/v2.1/locations?query=${city}&apikey=${ZOMATO}`);
          if (response.data.location_suggestions.length === 0) {

              console.log("Please enter a valid city");
          }

          // These must be put before any of the other calls requiring lat and lon
          let lat = response.data.location_suggestions[0].latitude
          let lon = response.data.location_suggestions[0].longitude
          
          // This calls the API for get the restaurant
          const query_url_rest = `https://developers.zomato.com/api/v2.1/search?lat=${lat}&lon=${lon}&apikey=${ZOMATO}`;
          const results = await axios.get(query_url_rest)
          let i = Math.floor(Math.random() * 21);

          const WEATHER = process.env.WEATHER_API;
          const query_url_weather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER}&units=imperial`
          const weather = await axios.get(query_url_weather);

          const weatherToReturn = weather.data

          const restToReturn = {...results.data.restaurants[i]};
          delete restToReturn.restaurant.apikey;

          const dateObj = [restToReturn, weatherToReturn]

          res.send(dateObj)
          
        } catch (error) {
          console.error('Ooops something went wrong:',error);
          res.json(error)
        }
      }
      findDate(city);
})


module.exports = router;