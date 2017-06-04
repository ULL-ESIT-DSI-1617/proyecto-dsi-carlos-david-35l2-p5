$(document).ready(function()
 {
    var database = firebase.database();

    // Fijarse que la ruta de partida ahora es la colección post:
    var referencia=database.ref("post");

    var post={};
    referencia.on('value',function(datos)
    {
        post=datos.val();

        // Recorremos los post y los mostramos
        $.each(post, function(indice,valor)
        {
            var prevProducto='<div class="row">';
              prevProducto+='<div class="col s7 offset-m4">';
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
