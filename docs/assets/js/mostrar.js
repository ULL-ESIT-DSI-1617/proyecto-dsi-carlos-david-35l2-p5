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
            var prevImagen='<div class="row">';
              prevImagen+='<div class="col s7 offset-m4">';
                prevImagen+='<div class="card">';
                  prevImagen+='<div class="card-image waves-effect waves-block waves-light">';
                    if (valor.imagen=='NONE')
                      prevImagen+='<img alt="Sin Fotografía"/>';
                    else
                      prevImagen+='<img class="activator"  src="'+valor.imagen+'"/>';
                  prevImagen+='</div>';
                  prevImagen+='<div class="card-content">';
                    prevImagen+='<span class="card-title activator grey-text text-darken-4">'+valor.titulo+'<i class="material-icons right">more_vert</i></span>';
                    prevImagen+='<p>'+valor.fecha+'</p>';
                  prevImagen+='</div>';
                prevImagen+='</div>';
              prevImagen+='</div>';
            prevImagen+='</div>';
            $(prevImagen).appendTo('#listado');
        });

    },function(objetoError){
        console.log('Error de lectura:'+objetoError.code);
    });

});
