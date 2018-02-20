const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.get('/books', (req, res) => {
    res.send(
        [
            {
                id: 1,
                title: "Lord of the Flies",
                description: "A book about kids that kill each other",
                author: "",
                rating: 8
            },
            {
                id: 2,
                title: "Of Mice and Men",
                description: "Good book. Read it in high school",
                author: "John Steinbeck",
                rating: 10
            }
        ]
    )
})

app.listen(process.env.PORT || 8081)