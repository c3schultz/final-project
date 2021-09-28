const myApiKey = "api_key=82f75eb80c8f9c7918027fd2798270bc";
const imgBaseUrl = 'https://image.tmdb.org/t/p/w500/'
const baseUrlMov = "https://api.themoviedb.org/3";
const searchUrl = baseUrlMov + "/search/movie?" + myApiKey;
const popularMovApi = baseUrlMov + "/discover/movie?sort_by=popularity.desc&" + myApiKey;
const newReleaseApi = baseUrlMov + "/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&" + myApiKey;
const form = document.getElementById('form');
const search = document.getElementById('search');


const popBtn = document.getElementById('popMovieBtn');
const mainPop = document.getElementById('mainPop');
popBtn.onclick=function(){
  if (mainPop.style.display !== 'none'){
    mainPop.style.display = 'none';
  } else {
    mainPop.style.display = 'block';
  }
};

const newBtn = document.getElementById('newMovieBtn'); 
const mainNew = document.getElementById('mainNew');
newBtn.onclick=function(){
  if (mainNew.style.display !== 'none'){
    mainNew.style.display = 'none';
  } else {
    mainNew.style.display = 'block';
  }
};

openMov(popularMovApi);

function openMov(url) {
  fetch(url).then(res => res.json()).then(data =>{
    showMovies(data.results)
  })
};

function showMovies(data){
  const mainPop = document.getElementById('mainPop');
  mainPop.innerHTML = '';

  data.forEach(movie => {
    const {title, poster_path, vote_average, overview} = movie;
    const movElement = document.createElement('div');
    movElement.classList.add('movie');
    movElement.innerHTML =`
    <img src="${imgBaseUrl+poster_path}" alt="${title}">
        <div class="movie-info">
          <h4>${title}</h4>
          <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          ${overview}
        </div>
    `
    mainPop.appendChild(movElement);
  });
};

function getColor(vote){
  if (vote >= 7){
    return 'green';
  } else if (vote >= 5){
    return 'yellow';
  } else if (vote >=3){
    return 'orange'
  } {
    return 'red';
  }
};

openNewMov(newReleaseApi);

function openNewMov(url) {
  fetch(url).then(res => res.json()).then(data =>{
    showNewMovies(data.results)
  })
};

function showNewMovies(data){
  const mainNew = document.getElementById('mainNew');
  mainNew.innerHTML = '';

  data.forEach(movie => {
    const {title, poster_path, vote_average, overview} = movie;
    const newMovElement = document.createElement('div');
    newMovElement.classList.add('movie');
    newMovElement.innerHTML =`
    <img src="${imgBaseUrl+poster_path}" alt="${title}">
        <div class="movie-info">
          <h4>${title}</h4>
          <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          ${overview}
        </div>
    `
    mainNew.appendChild(newMovElement);
  });
};

form.addEventListener('submit', (e)=> {
  e.preventDefault();
  const searchTerm = search.value;

  if (searchTerm){
    openMov(searchUrl+"&query="+searchTerm);
  } else{
    openMov(popularMovApi);
  }

  if (searchTerm){
    openNewMov(searchUrl+"&query="+searchTerm);
  } else{
    openNewMov(newReleaseApi);
  }
})