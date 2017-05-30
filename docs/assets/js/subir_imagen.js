$(document).ready(function()
 {
     // Initialize Firebase
     var config = {
       apiKey: "AIzaSyDdH-zhpOW74udvkDOoxpFNVXAw3TRUVSU",
       authDomain: "anonymous-pictures.firebaseapp.com",
       databaseURL: "https://anonymous-pictures.firebaseio.com",
       projectId: "anonymous-pictures",
       storageBucket: "anonymous-pictures.appspot.com",
       messagingSenderId: "378170930361"
     };
     firebase.initializeApp(config);

    var database = firebase.database();
    var id;
    var fecha;
    var titulo;
    var imagen;

    //fecha de publicacion de la foto
    const timeStamp = () => {
      let options = {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute:'2-digit'
      };
      let now = new Date().toLocaleString('es', options);
      return now;
    };

    $("#imagen").change(function()
    {
        var descriptor=new FileReader();
        descriptor.readAsDataURL(this.files[0]);

        descriptor.onloadend = function()
        {
            imagen=descriptor.result;
        };
    });


    $("#formulario_new_picture").change(function()
    {
        titulo=$("#titulo").val();

        if (titulo)
        {
            $("#botonGuardar").prop("disabled",false);
        }
        else
        {
            $("#botonGuardar").prop("disabled",true);
        }

    });


    $("#botonGuardar").click(function()
    {
        var f = new Date();
        titulo=$("#titulo").val();
        //id=new Date().getUTCMilliseconds();
        id = ((f.getFullYear()).toString()).concat(((f.getMonth() +1).toString()).concat(((f.getDate()).toString()).concat((f.getUTCMilliseconds().toString()))));
        if (!imagen)
        {
            imagen="NONE";
        }

        // Indicamos que la referencia base de nuestra base de datos es post (algo así como el padre)
        // del que colgarán el resto de nodos hijos.
        /*
        var usersRef = new Firebase('https://samplechat.firebaseio-demo.com/users');
        var fredRef = usersRef.child('fred');
        var fredFirstNameRef = fredRef.child('name/first');
        */
        var referencia=database.ref("post");


        // De la siguiente forma el método sobreescribe los datos
    /*
        referencia.set(
        {
            titulo: titulo,
            imagen: imagen
        });
        */

        // Ahora estamos poniendo el titulo como clave en la colección
        // De esta manera podremos añadir nuevos titulos o actualizar uno ya existente.


        referencia.child(id).set(
        {
          titulo: titulo,
          fecha: timeStamp(),
          imagen: imagen
        },function()
        {
            alert('Su foto se a subido correctamente');
        });

        // Si queremos permitir que hayas artículos con nombres duplicados entonces tendremos
        // que decirle a Firebase que utilice otra clave en lugar del nombre del titulo.
        // Usaremos el método push en lugar de set
      /*  referencia.push(
        {
            id: new Date().getUTCMilliseconds(),
            titulo: titulo,
            fecha: timeStamp(),
            imagen: imagen
        },function()
        {
            alert('Su foto se a subido correctamente');
        });
        */
    });

});
