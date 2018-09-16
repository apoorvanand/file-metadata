'use strict';

var express = require('express');
var cors = require('cors');
var mult=require('multer');
var storage =mult.memoryStorage();
 var upload = mult({storage:storage});

// require and use "multer"...

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});
app.post('/api', upload.single('file-upload'),function(req,res){
if(req.file){
  res.status(200).json({
    filename: req.file.originalname,
    size: req.file.size,
    type: req.file.mimetype
  });
}
  else
  { res.status(500).json({error: `No file chosen to upload in 'data' field `});}
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
