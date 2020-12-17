const express = require('express');

const PORT = process.env.PORT || 3002;

const app = express();

// app.use(express.urlencoded({extended: true}));
// app.use(express.json());

// app.use(require('./routes/api.js'));

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
})