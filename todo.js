function newtodo()
{
    //Muuttuja listan luomiseen
    var li = document.createElement("li");
    //Muuttuja jolla haetaan inputin arvo (käyttäjän syöttämä)
    var inputti = document.getElementById("addtodo").value;
    //Muuttuja jolla annetaan listalle child arvo
    var todovalue = document.createTextNode(inputti);
    //Lisää käyttäjän syöte listan arvoksi
    li.appendChild(todovalue)
    //Tulosta uusi lista
    document.getElementById("UL").appendChild(li);

    document.getElementById("UL").value = "";
  
    /*for (i = 0; i < close.length; i++) {
      close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
      }
    }*/
}