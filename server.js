var express = require('express');
var multer  = require('multer');
var ext = require('file-extension');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, +Date.now() + '.' + ext(file.originalname))
  }
})
 
var upload = multer({ storage: storage }).single('picture');

var app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index', { title: 'Veterinaria' });
})

app.get('/client', function (req, res) {
  res.render('index', { title: 'Veterinaria - Clientes' });
})

app.get('/signup', function (req, res) {
  res.render('index', { title: 'Veterinaria - Signup' });
})

app.get('/signin', function (req, res) {
  res.render('index', { title: 'Veterinaria - Signin' });
})

app.post('/api/pictures', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.send(500, "Error uploading file");
    }
    res.send('File uploaded');
  })
})

app.listen(3000, function (err) {
  if (err) return console.log('Hubo un error'), process.exit(1);

  console.log('Veterinaria escuchando en el puerto 3000');
})