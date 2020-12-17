const axios = require('axios');
const router = require("express").Router();
require('dotenv').config();

const ZOMATO = process.env.ZOMATO_API

// Temp variable
const city = 'Seattle'

// Call for city id
const query_url_city = `https://developers.zomato.com/api/v2.1/locations?query=${city}&apikey=${ZOMATO}`
// const query_url_rest = `https://developers.zomato.com/api/v2.1/search?lat=${lat}&lon=${lon}&sort=rating&order=dec&apikey=${zomatoKey}`;

// axios.get(query_url_city)
//     .then( (res) => {
//         console.log(res)
//     });

 router.get("/api/call", () =>{
    console.log("call made!");
    async function testCall() {
        try {
          const response = await axios.get(`https://developers.zomato.com/api/v2.1/locations?query=${city}&apikey=${ZOMATO}`);
          console.log(response.data);
        } catch (error) {
          console.error('wrong');
        }
      }

    
    // axios({
    //     method: 'get',
    //     url: `https://developers.zomato.com/api/v2.1/locations?query=${city}&apikey=${ZOMATO}`,
    //     responseType: 'json' 
    // })
    // .then( (res) => {
    //     console.log(res.data)
    // });
    testCall();
})


module.exports = router;