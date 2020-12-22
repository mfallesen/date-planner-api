const axios = require('axios');
const router = require("express").Router();
require('dotenv').config();

const ZOMATO = process.env.ZOMATO_API

// Temp variable
const city = 'Seattle'

// Call for city id
const query_url_city = `https://developers.zomato.com/api/v2.1/locations?query=${city}&apikey=${ZOMATO}`




 router.get("/api/call", (req, res) =>{
    console.log("call made!");
    async function testCall() {
        try {
          const response = await axios.get(`https://developers.zomato.com/api/v2.1/locations?query=${city}&apikey=${ZOMATO}`);
          console.log(response.data);
          if (response.data.location_suggestions.length === 0) {

            // this needs to show to the user.
              console.log("Please enter a valid city");
          }
          let lat = response.data.location_suggestions[0].latitude
          let lon = response.data.location_suggestions[0].longitude

          const query_url_rest = `https://developers.zomato.com/api/v2.1/search?lat=${lat}&lon=${lon}&apikey=${ZOMATO}`;
        //   chain call here and return entire response
          const results = await axios.get (query_url_rest)
          let i = Math.floor(Math.random() * 21);
          console.log('Call results ', results.data.restaurants[i]);
          
          
          
          res.send(response.data)
        } catch (error) {
          console.error(error, 'wrong');
        }
      }
    testCall();
})


module.exports = router;