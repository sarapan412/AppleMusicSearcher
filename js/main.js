
import fetchJsonp from 'fetch-jsonp';

//import validation and showAlert
import {showAlert, isEmpty} from './validation'

//get searchform element
const searchForm = document.querySelector("#search-form");

//submit searchform
searchForm.addEventListener("submit",fetchMusic);

//fetch music data from apple music API
function fetchMusic(e) {
    e.preventDefault();

    const searchText = document.querySelector("#search-text").value;


    // if(isEmpty(searchText)) {
    //     showAlert("Please search something.", 'warning');
    //     return;
    // }

    const fetchUrl = `http://itunes.apple.com/search?term=${searchText}`;

    fetchJsonp(fetchUrl)
        .then(res => res.json())
        .then(data => showMusic(data.results))
        .catch(err => console.log(err));
}

//show each music in card
function showMusic(musics){

    console.log(musics);
    const results = document.querySelector('#results');


    //clear first
    results.innerHTML = "";


    for(let i = 0; i < musics.length; i++) {
        const music = musics[i];

        if (music.kind != 'song') {
            continue;
        }

        const div = document.createElement('div');
        div.classList.add('row');
        div.innerHTML = `
            <img class = "card-img-top" src=${music.artworkUrl100} alt="Album Image">
            <div class="card-body">
                <h5 class="card-title">${music.trackName}</h5>
                <p class="card-text">${music.artistName}</p>
            </div>

            <ul>

                <li class = "list-group list-group-flush">${music.collectionName}</li>
                <li class = "list-group-item">${music.primaryGenreName} · ${music.releaseDate.split('-',1)}</li>

                <li class = "list-group-item">
                    Sample: <br>
                    <audio src=${music.previewUrl} controls = 'controls'></audio>
                </li>
            </ul>

            <div class="card-body">
                <a href = ${music.trackViewUrl} class = "card-link">Shown in Apple Music</a>

            </div>
`;


        results.appendChild(div);
    }


}



