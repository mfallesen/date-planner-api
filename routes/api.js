const axios = require('axios');
const router = require("express").Router();
const moment = require('moment')
require('dotenv').config();

const ZOMATO = process.env.ZOMATO_API


// Date and time stuff
const preFormatDate = moment.utc()
preFormatDate.local();
const dateAndTime = preFormatDate.format('YYYY-MM-DDTHH:mm:ss')


// Temp variable
// const city = 'New York'

// Call for city id
// const query_url_city = `https://developers.zomato.com/api/v2.1/locations?query=${city}&apikey=${ZOMATO}`

// TODO: Take User input from the screen  for the search. 
// TODO: IMplement Fuse.js ????? maybe nopt possible since im pulling from a data set i dont control
// TODO: Remove call to ticketmaster and use either fandango or rotten tomatoes api for movie suggestions


router.get("/api/call", (req, res) =>{
  
  // console.log(Object.keys(req));
  // console.log(req.body);
  const city = req.body.city
    console.log("call made!");
    async function testCall(city) {

      console.log(city)

        try {
          const response = await axios.get(`https://developers.zomato.com/api/v2.1/locations?query=${city}&apikey=${ZOMATO}`);
          
          // console.log(response.data);
          if (response.data.location_suggestions.length === 0) {

            // this needs to show to the user.
              console.log("Please enter a valid city");
          }

          console.log(response.data);

          // These must be put before any of the other calls requiring lat and lon
          let lat = response.data.location_suggestions[0].latitude
          let lon = response.data.location_suggestions[0].longitude


          // This calls the API tor get the restaurant

          const query_url_rest = `https://developers.zomato.com/api/v2.1/search?lat=${lat}&lon=${lon}&apikey=${ZOMATO}`;
          
          //   chain call here and return entire response
          const results = await axios.get(query_url_rest)
          let i = Math.floor(Math.random() * 21);
          let zipcode = parseInt(results.data.restaurants[i].restaurant.location.zipcode)

          // TODO: something with the call
          console.log('Call results ', results.data.restaurants[i]);
          
          

          // TODO: Weather API call goes here
          // const WEATHER = process.env.WEATHER_API;
          // const query_url_weather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER}`
          // const weather = await axios.get(query_url_weather);
          // console.log(weather.data);
          
          
          
          
          
          
          
          
          
          //Ticketmaster call only if checked
          const EVENT = process.env.EVENT_API
          const query_url_event = `https://app.ticketmaster.com/discovery/v2/events.json?localStartDateTime=${dateAndTime}&postalCode=${zipcode}&apikey=${EVENT}`
          
          
          // TODO: REMOVE
          let event_checked = true;
          // TODO: REMOVE
          
          
          // if (event_checked === true ) {
          //   const event_suggestion = await axios.get(query_url_event);
          //   let j = Math.floor(Math.random() * (event_suggestion.data._embedded.events.length+ 1))
          //   const event_time = event_suggestion.data._embedded.events[j].dates.start.dateTime;
          
          
          //   // Moment.js implementation? '
          // console.log(moment(event_time).format('LLLL'));

          //   // console.log(event_suggestion.data._embedded.events[j]);
          // }

          // console.log('local time is:',dateAndTime);

          res.send(results.data.restaurants[i])
          
        } catch (error) {
          console.error('Ooops something went wrong:',error);
          res.json(error)
        }
      }
      testCall(city);
})


module.exports = router;