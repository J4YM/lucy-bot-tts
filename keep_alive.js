const express = require('express');
const app = express();
const port = 2323;
app.get('/', (req, res) => res.send('Lucy is Up and Running'));

app.listen(port, () => console.log(`Lucy is online on http://localhost:${port}`));