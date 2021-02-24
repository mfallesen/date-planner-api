const express = require('express');
const Cors = require('cors')

const PORT = process.env.PORT || 3002;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(Cors({
    origin: ["http://localhost:3000" , 'https://date-plannerly.herokuapp.com']
}))
app.use(require('./routes/api.js'));

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
})