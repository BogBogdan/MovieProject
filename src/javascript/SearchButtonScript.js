import { TMDB_URL, TMDB_IMG, VIDEO_MOV_URL,VIDEO_TV_URL } from "/constants.js";
import { onLoad } from './LoadMoviesScript.js';
async function loaddata(movieName)
{
    const apiKey = await fetch('/api-key')
    .then(response => response.json())
    .then(data => {
        return data.apiKey;
      
    });
let res=[];
const [result1, result2] = await Promise.all([loadtv(movieName,apiKey), loadmovie(movieName,apiKey)])

for (const json of result1) {
    json.seasons=await getNumSeasons(json.id, apiKey);
}
res=result1.concat(result2);
const firstComponent = document.getElementById('loading');
const secondComponent = document.getElementById('page');

firstComponent.style.display = 'none';
secondComponent.style.display = 'block';

onLoad(res);
}
async function loadmovie(movieName, apiKey)
{

// construct the API URL with the movie name and API key
const apiUrl = `${TMDB_URL}search/movie?query=${movieName}&api_key=${apiKey}`;

// make a request to the API
const res = await fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        let result=[];
       data.results.forEach((d) => {
            const json={
                "id":d.id,
                "isMovie":true,
                "title":d.title,
                "src": TMDB_IMG+d.poster_path,
                "popularity": d.popularity,
                "opis":d.overview,
                "date":d.release_date,
            }      
            json.link=VIDEO_MOV_URL+d.id;         
            const hasNullUndefined = Object.keys(json).some(key => json[key] === null || json[key] === undefined);
            if(!hasNullUndefined && json.src!=TMDB_IMG+'null')
                result.push(json);
       })
        return result;
    })
    .catch(error => {
        // handle any errors
        console.error(error);
    });

return res;
}

async function loadtv(movieName, apiKey)
{

// construct the API URL with the movie name and API key
const apiUrl = `${TMDB_URL}search/tv?query=${movieName}&api_key=${apiKey}`;

// make a request to the API
const res = await fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        let result=[];
       data.results.forEach((d) => {
            console.log(d)
            const json={
                "id":d.id,
                "isMovie":false,
                "title":d.name,
                "src": TMDB_IMG+d.poster_path,
                "popularity": d.popularity,
                "opis":d.overview,
                "date":d.first_air_date
            }      
            json.link=VIDEO_TV_URL+d.id+"-1-1";     
            const hasNullUndefined = Object.keys(json).some(key => json[key] === null || json[key] === undefined);
            if(!hasNullUndefined && json.src!=TMDB_IMG+'null')
                result.push(json);
       })
        return result;
    })
    .catch(error => {
        // handle any errors
        console.error(error);
    });
return res;
}
async function getNumSeasons(tvId, apiKey) {

const url = `${TMDB_URL}tv/${tvId}?api_key=${apiKey}`;
const response = await fetch(url);
const data = await response.json();
const seasons = data.seasons
.filter(season => season.name !== "Specials")
.map(season => ({
seasonNumber: season.season_number,
numEpisodes: season.episode_count,
name: season.name
}));
return seasons;
}

window.onload=loaddata(localStorage.name)