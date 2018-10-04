// JSON is a popular and agreed upon format for sending, receiving and storing data
let pageCounter = 1;
const btn = document.getElementById('btn');

function renderHTML(data) {
    const animalContainer = document.getElementById('animal-info');
    let htmlContent = "";
    for(var i = 0; i < data.length; i++)
    {
        htmlContent += `<p> ${data[i].name} is a ${data[i].species} that likes to eat `
        const foodLikes = data[i].foods.likes;
        for (var ii = 0; ii < foodLikes.length; ii++)
        {
            // console.log(ii);
            if (ii === 0)
            {
                htmlContent += foodLikes[ii];
            } 
            else 
            {
                htmlContent += " and " + foodLikes[ii];
            }
        }
        
        htmlContent += " and dislikes ";
        const foodDislikes = data[i].foods.dislikes;
        for (var ii = 0; ii < foodDislikes.length; ii++) 
        {
            if (ii === 0) 
            {
                htmlContent += foodDislikes[ii];
            }
            else 
            {
                htmlContent += " and " + foodDislikes[ii];
            }
        }
        
        htmlContent += ".</p>";
    }
    animalContainer.insertAdjacentHTML('beforeend', htmlContent);
}


btn.addEventListener('click', function () {

    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', `https://learnwebcode.github.io/json-example/animals-${pageCounter}.json`);
    
    ourRequest.onload = function() {
        if (ourRequest.status >= 200 && ourRequest < 400)
        {            
            // when our browser goes to the URL and downloads the data, it doesn't know to interpret it as JSON data
            var ourData = JSON.parse(ourRequest.responseText);
            renderHTML(ourData);
        }
        else 
        {
            console.log("We connected to the server but it returned an error.);
            
        }
    };
    ourRequest.onerror = function () {
        console.log("Connection Error")
    }
    ourRequest.send();
    pageCounter++;
    if (pageCounter > 3) 
    {
        btn.disabled = true;
        btn.classList.add("hide-me");
    }
});
