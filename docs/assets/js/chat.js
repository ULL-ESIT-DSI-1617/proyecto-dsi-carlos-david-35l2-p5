var myDataRef = new Firebase('https://chatanonymous-e1017.firebaseio.com/');

$('#mensajeInput').keypress(function (e) {

    if (e.keyCode == 13) {
    var name = $('#nombreInput').val();
    var text = $('#mensajeInput').val();
    myDataRef.push({name: name, text: text});
    $('#mensajeInput').val('');
    }

});

myDataRef.on('child_added', function(snapshot) {
    var message = snapshot.val();
    displayChatMessage(message.name, message.text);
});

function displayChatMessage(name, text) {
  console.log("name: " + text)
    $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#mensaje'));
    $('#mensaje')[0].scrollTop = $('#mensaje')[0].scrollHeight;
};
