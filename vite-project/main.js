import "./style.css";

async function getMovie(searchText, apiKey, plot) {
  console.log(apiKey);
  const URL = `http://www.omdbapi.com/?s=${searchText}&apikey=${apiKey}`;
  const resp = await fetch(`${URL}`);
  const responseJson = await resp.json();
  console.log(responseJson);
  
  const data = responseJson.Search;
  for (let i = 0; i < data.length; i++) {
    let plotUrl = `https://www.omdbapi.com/?t=${data[i].Title}&plot=${plot}&apikey=${apiKey}`;
    const getPlot = await fetch(`${plotUrl}`);
    const plotData = await getPlot.json();

    //create div for each card 
    let column = document.getElementById("row");
    let columndiv = document.createElement("div");
    columndiv.className = "column";
    columndiv.id = "searchResults";
    //create card element
    let searchResults = document.getElementById("searchResults");
    let card = document.createElement("div");
    card.className = "card";
    card.id = "card";
    

    // get title and OMDb ID number
   
    let info = document.createElement("p");
    info.textContent = `${responseJson.Search[i].Title} - OMDb ID#: ${responseJson.Search[i].imdbID}`;

    //get year and rating
    let movieYear = document.createElement("p");
    movieYear.textContent = `Year Released: ${responseJson.Search[i].Year} - Rating: ${plotData.Ratings[i].Value} `;
    console.log(responseJson.Search[i].Year);

    //get plot description
    let plotDesc = document.createElement("p");
    plotDesc.textContent = `${plotData.Plot}`;
    console.log(responseJson.Search[i].imdbID);

    //get poster

    let moviePoster = document.createElement("img");
    moviePoster.src = `${responseJson.Search[i].Poster}`;
    moviePoster.style.objectFit = "scale-down";
    
    //append everything to the DOM 
    card.appendChild(moviePoster);
    column.appendChild(card);
    card.appendChild(info);
    card.appendChild(movieYear);
    card.appendChild(plotDesc);

   
  }
}
//create event listener when submit button is clicked 
const button = document.getElementById("button");
button.addEventListener("click", function (e) {
  e.preventDefault();
  const searchText = document.getElementById("text").value;
  const apiKey = document.getElementById("api").value;
  const plot = document.querySelector('input[name="plot"]:checked')?.value;
  getMovie(searchText, apiKey, plot);
  console.log(plot);
});
