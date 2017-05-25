var http = require('http'),
    express = require('express'),
    app = express(),
    sqlite3 = require('sqlite3').verbose(),
    bodyParser = require('body-parser'),
    db = new sqlite3.Database('docs/anonymous.db');

app.use(express.static(__dirname + "/docs"));

// Indicamos a express que vamos a usar Jade para renderizas los templates
app.set('views', __dirname + '/docs/views');
app.engine('.html', require('jade').__express);

// Permitir a express recibir datos desde el post
app.use(bodyParser.urlencoded({
  extended: true
}));

// Database initialization
db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='t_usuarios'", function(err, rows) {
  if(err !== null) {
    console.log(err);
  }
  else if(rows === undefined) {
    db.run('CREATE TABLE "t_usuarios" ' +
           '("id" INTEGER PRIMARY KEY AUTOINCREMENT, ' +
           '"email" VARCHAR(50), ' +
           '"username" VARCHAR(25), ' +
           '"password" VARCHAR(50))', function(err) {
      if(err !== null) {
        console.log(err);
      }
      else {
        console.log("Creada la tabla t_usuarios");
      }
    });
  }
  else {
    console.log("Tabla t_usuarios ya está creada");
  }
});

// We render the templates with the data
app.get('/', function(req, res) {

  db.all('SELECT * FROM t_usuarios ORDER BY id', function(err, row) {
    if(err !== null) {
      res.status(500).send("Ocurrio el error: " + err)
    }
    else {
      console.log(row);
      res.render('index.jade', {title: 'index'});
    }
  });
});

app.get('/login', function(req, res) {

  res.render('login.jade', {title: "login"})
  res.send(200, html);
/*
  db.all('SELECT * FROM t_usuarios ORDER BY id', function(err, row) {
    if(err !== null) {
      res.status(500).send("Ocurrio el error: " + err)
    }
    else {
      console.log(row);
      res.render('login.jade', {t_usuarios: row}, function(err, html) {
        res.send(200, html);
      });
    }
  }); */
});

app.get('/registrarse', function(req, res) {

  db.all('SELECT * FROM t_usuarios ORDER BY id', function(err, row) {
    if(err !== null) {
      res.status(500).send("Ocurrio el error: " + err)
    }
    else {
      console.log(row);
      res.render('registrarse.jade', {t_usuarios: row}, function(err, html) {
        res.send(200, html);
      });
    }
  });
});

// Definimos una ruta para la creación de usuarios
app.post('/add', function(req, res) {
  console.log("Entro en el post/add")
  email = req.body.email;
  username = req.body.username;
  password = req.body.password;

  sqlRequest = "INSERT INTO 't_usuarios' (email, username, password) " +
               "VALUES('" + email + "', '" + username + "', '" + password + "')"
  db.run(sqlRequest, function(err) {
    if(err !== null) {
      //next(err);
      res.status(500).send("Ocurrio el error: " + err)
    }
    else {
      res.redirect('back');
    }
  });
});

// Definimos una ruta para hacer el login de usuarios
app.post('/login', function(req, res) {
  sqlUsername = db.prepare("SELECT username FROM t_usuarios WHERE username='" + req.body.username + "' and password='" + req.body.password + "'");
  sqlUsername.get(function(err, row){
      if(err)
          throw err;
      else
          if(row)
              res.render('index_login.jade', {title: "index_login"})
          else
            console.log("Usuario no encontrado")
            res.render('login_error.jade', {title: "login_error"})
      });
});

// We define another route that will handle bookmark deletion
app.get('/delete/:id', function(req, res, next) {
  db.run("DELETE FROM t_usuarios WHERE id='" + req.params.id + "'",
         function(err) {
    if(err !== null) {
      next(err);
    }
    else {
      res.redirect('back');
    }
  });
});

var port = process.env.PORT || 8081;
var host = process.env.HOST || "127.0.0.1";

app.listen(port, function() {
  console.log("La aplicación Node esta corriendo en el puerto:", host, port, app.get('env'));
});
