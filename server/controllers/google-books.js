const request = require('request');
const fs = require('fs');
var API_KEY = '';

var readApiKey = (file, callback) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if(err) console.log(err)
        callback(data)
    })
}
readApiKey('./key.txt', (data)=>{
    API_KEY = data;
})

exports.searchGoogleBooks = (req,res) => {
    request({
        uri: 'https://www.googleapis.com/books/v1/volumes',
        qs: {
            q: req.params.q,
            key: API_KEY
        }
    }).pipe(res)
}