document.addEventListener("DOMContentLoaded", function() {

    const myInput = document.getElementById("search-bar");
    if(myInput.value!=null)
        myInput.addEventListener("keydown", onClickButton);
    
});

function onClickButton (event) {

    if (event.keyCode === 13) {  //ENTER PRESSED

        localStorage.setItem('name',document.getElementById("search-bar").value);
        window.location.href = '/html/resultpg.html';
     }
}

function lupa()
{
    const myInput = document.getElementById("search-bar");
    if(myInput.value!=null)
    {
        localStorage.setItem('name',myInput.value);
        window.location.href = '/html/resultpg.html';
    }
}