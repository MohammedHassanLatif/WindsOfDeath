//scrolls to top of page when clicked
function upWeGo() {
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Chrome, Firefox, IE & Opera
}

//takes you to a random page after removing current page from possible destinations
function anypage()
{
    const array = ["index.html", "play.html", "team.html", "design.html"] //array of strings indicating pages

    var path = window.location.pathname; //gets current file path
    var page = path.split("/").pop(); //cuts it off at the first forward slash
    var thePage = page.toString(); //puts the resulting name into a string (possibly unnecessary?)

/*
    alert(thePage); //shows current page on screen
*/

    const index = array.indexOf(thePage); //goes to array location matching current page string
    if (index > -1)
    {
        if (index > -1) {
            array.splice(index, 1); //removes current page string
        }
    }
    console.log(array);
    const randomElement = array[Math.floor(Math.random() * array.length)]; //picks a string from the altered array

/*
    alert(array); //shows remaining strings on screen
*/

    switch (randomElement) //switch statement containing cases for each string
    {
        case "index.html":
            window.open("../html/index.html","_self");
            break;
        case "play.html":
            window.open("../html/play.html","_self");
            break;
        case "team.html":
            window.open("../html/team.html","_self");
            break;
        case "design.html":
            window.open("../html/design.html","_self");
            break;
        default:
            alert("RUH ROH RAGGY A RERROR"); //you should never have to see this
            break;
    }
}