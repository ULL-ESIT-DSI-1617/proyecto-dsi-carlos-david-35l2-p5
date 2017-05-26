//JavaScript Document

//alert("Llamada al archivo js exitoso")

function validacion() {
    var pass2 = document.getElementById("password2").value;
    var pass1 = document.getElementById("password").value;

    console.log("Entro en la validacion")

    if (pass1 != pass2){
        alert("Las contraseñas no coinciden");
        return false;
    }

}
