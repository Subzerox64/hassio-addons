const express = require('express');
const app = express();
const port = process.env.PORT || 5908;

app.get('/', (req, res) => {
    res.send('<h1>Hello from Node.js!</h1>');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`App listening at http://localhost:${port}`);
});
