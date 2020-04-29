

function myKeyPress(e){

  /* TODO: retrieve the value from the text input */
  var mytextbox = document.getElementById('textinput').value;


  // TODO: set the value of the textbox with the formatted value

  var keyPressed;
  if(window.event) { // IE
    keyPressed = e.keyCode;
    var formattedNumber = mytextbox.replace(/[^0-9]+/g, "");
    textinput.value = formatPhoneNumber(formattedNumber);
  } else if(e.which){ // Netscape/Firefox/Opera
    keyPressed = e.which;
  }

  var x = String.fromCharCode(keyPressed);
  var y = formatPhoneNumber("7189515000");


  console.log("Key Pressed = " + x);
  console.log("  Formatted = " + y);



  // TODO: Add a condition to ignore entries beyond 10 digits

  //done in html

}

function formatPhoneNumber(value){

  /* TODO:  Use replace function to ignore extra - character */

  if(value.length > 3 && value.length <= 6)
    value = value.slice(0,3) + "-" + value.slice(3);
  else if(value.length > 6)
    value = value.slice(0,3) + "-" + value.slice(3,6) + "-" + value.slice(6);

  return value;
}
