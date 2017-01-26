var express = require('express');
var multer  = require('multer');
var ext = require('file-extension');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var expressSession = require('express-session')
var passport = require('passport')
var sertvveterinary = require('sertvveterinary-client')
var auth = require('./auth')

var config = require('./config')
var port = process.env.PORT || 5060

var client = sertvveterinary.createClient(config.client)

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(expressSession({
  secret: config.secret,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'pug');

app.use(express.static('public'));
passport.use(auth.localStrategy);
passport.deserializeUser(auth.deserializeUser);
passport.serializeUser(auth.serializeUser);

app.get('/', ensureAuth, function (req, res) {
  res.render('index', { title: 'Veterinaria' });
})

app.get('/client', function (req, res) {
  res.render('index', { title: 'Veterinaria - Clientes' });
})

app.get('/signup', function (req, res) {
  res.render('index', { title: 'Veterinaria - Signup' });
});

app.post('/signup', function (req, res) {
  var user = req.body;
  client.saveUser(user, function (err, usr) {
    if (err) return res.status(500).send(err.message)

    res.redirect('/')
  })
})

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/signin'
}));

app.get('/logout', function (req, res){
  req.logout();
  res.redirect('/signin');
});

app.get('/signup', function (req, res) {
  res.render('index', { title: 'Veterinaria - Signup' });
})

app.get('/signin', function (req, res) {
  res.render('index', { title: 'Veterinaria - Signin' });
})



app.get('/client', function (req, res) {
  res.render('index', { title: 'Veterianria - Client'})
})

//API's Section

//Client API's
app.post('/api/client', function (req, res) {
  var cl = req.body
  if (cl.id != undefined) {
    client.updateClient(cl, function (err, data){
      if(err) {
        return res.status(500).send(err.message)
      }    
      return res.status(201).send(data)
    })
  } else{
    client.saveClient(cl, function (err, data) {
      if (err) {
        return res.status(500).send(err.message)
      }

      return res.status(201).send(data)
    })  
  }
  
})

app.get('/api/client', function (req, res) {
  client.getClientList(function (err, data) {
    if (err) {
      res.status(500).send(err.message)
    }

    res.send(data)
  })
} )


app.post('/api/pictures', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.send(500, "Error uploading file");
    }
    res.send('File uploaded');
  })
})


app.get('/whoami', function (req, res) {
  if (req.isAuthenticated()) {
    return res.json(req.user)
  }

  res.json({ auth: false })
})

function ensureAuth (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  //res.status(401).send({ error: 'not authenticated' })
  res.redirect('/signin');
}

app.listen(port, function (err) {
  if (err) return console.log('Hubo un error'), process.exit(1);

  console.log(`Veterinaria escuchando en el puerto ${port}`);
})