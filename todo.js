function newtodo()
{
    //Muuttuja listan luomiseen
    var listi = document.createElement("li");
    //Muuttuja jolla haetaan inputin arvo (käyttäjän syöttämä)
    var inputti = document.getElementById("addtodo").value;
    //Muuttuja jolla annetaan listalle child arvoksi inputin arvo
    var todovalue = document.createTextNode(inputti);
    //Lisää käyttäjän syöte listan arvoksi
    listi.appendChild(todovalue)
    //Tulosta uusi lista
    document.getElementById("UL").appendChild(listi);


}