$(document).ready(function()
 {


    var database = firebase.database();

    // Fijarse que la ruta de partida ahora es la colección post:
    var referencia=database.ref("post");

    var post={};

    /*
    Evento: value

    The value event is used to read a static snapshot of the contents at a given database path,
    as they existed at the time of the read event. It is triggered once with the initial data and again every time the data changes.
    The event callback is passed a snapshot containing all data at that location, including child data. In our code example above,
    value returned all of the blog posts in our app. Everytime a new blog post is added, the callback function will return all of the posts.
    */

    referencia.on('value',function(datos)
    {
        post=datos.val();
        // Recorremos los productos y los mostramos
        $.each(post, function(indice,valor)
        {
            var prevProducto='<div class="row">';
              prevProducto+='<div class="col s7 offset-s4">';
                prevProducto+='<div class="card">';
                  prevProducto+='<div class="card-image waves-effect waves-block waves-light">';
                    if (valor.imagen=='NONE')
                      prevProducto+='<img alt="Sin Fotografía"/>';
                    else
                      prevProducto+='<img class="activator"  src="'+valor.imagen+'"/>';
                  prevProducto+='</div>';
                  prevProducto+='<div class="card-content">';
                    prevProducto+='<span class="card-title activator grey-text text-darken-4">'+valor.titulo+'<i class="material-icons right">more_vert</i></span>';
                    prevProducto+='<p>'+valor.fecha+'</p>';
                  prevProducto+='</div>';
                prevProducto+='</div>';
              prevProducto+='</div>';
            prevProducto+='</div>';
            $(prevProducto).appendTo('#listado');
        });

    },function(objetoError){
        console.log('Error de lectura:'+objetoError.code);
    });

});
