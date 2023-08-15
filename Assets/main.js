//Global Variables
var songID = '';
var height = '';
var width = '';
var pic = '';
var trackID = '';
var lyrics = '';
var artist = '';
var album = '';
var albumArt = '';
var iframe = document.getElementById('player');
var trackLyricsURL = '';


$(document).ready(function(e) {
    $('#videoSection').hide();
    $('#dataSection').hide();
    $('#recent-searches').hide();
});


//Click function
function btnClick() {
    $("#inputGroup-sizing-lg").click(function(){

        $('#videoSection').show();
        $('#dataSection').show();
        $('#recent-searches').show();

        var userSong = $("#userSong").val();
        console.log(userSong);
        APIcall();
        trackIDAPIcall();
    });

}


//Local Storage
document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById('inputGroup-sizing-lg');
    const searchInput = document.querySelector('.input-group input');
    const recentSearchesContainer = document.getElementById('recent-searches');
  
    searchButton.addEventListener('click', function () {
      const searchValue = searchInput.value.trim();
      if (searchValue !== '') {
        // Save the search value to local storage
        saveSearchToLocalStorage(searchValue);
        // Perform the search and update the video, lyrics, and song data section
      }
    });
  
    function saveSearchToLocalStorage(searchValue) {
      // Retrieve existing searches from local storage
      let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
  
      // Add the new search value to the list
      recentSearches.unshift(searchValue);
  
      // Keep only the latest 5 searches
      if (recentSearches.length > 5) {
        recentSearches.pop();
      }
  
      // Save the updated list back to local storage
      localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  
      // Display recent searches
      displayRecentSearches(recentSearches);
    }
  
    function displayRecentSearches(recentSearches) {
      recentSearchesContainer.innerHTML = ''; // Clear the container
      for (const search of recentSearches) {
        const searchItem = document.createElement('div');
        searchItem.textContent = search;
        recentSearchesContainer.appendChild(searchItem);
      }
    }
  
    // Display initial recent searches on page load
    displayRecentSearches(JSON.parse(localStorage.getItem('recentSearches')) || []);
  });


//Reload the page after every search
document.getElementById("clear").addEventListener("click", function() {
    location.reload();
});


//YOUTUBE API SECTION
//DON'T DELETE THIS!!!!!!
//This is commented out so that we don't go over
//  the alloted amount of API requests.
// There is a daily limit.

function APIcall() {
    var userSong = $("#userSong").val() + ' cover';
    var url = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet%2C%20id&maxResults=1&q=';
    var APIKey = '&videoEmbeddable=any&key=AIzaSyC-AUJX5gMJ-aKoHP0yZz3Sl0Q0-k6-92o';
    var queryURL = url + userSong + APIKey;
     
    fetch(queryURL).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                songID = data.items[0].id.videoId;
                height = data.items[0].snippet.thumbnails.high.height;
                width = data.items[0].snippet.thumbnails.high.width;
                console.log(songID);
                console.log(height);
                console.log(width);
                $('#player').attr('src', 'https://www.youtube.com/embed/' + songID + '?autoplay=1?enablejsapi=1');
                $('#player').attr('width', width);
                $('#player').attr('height', height);
            })
        }
    })
    
}


//API call to first get track ID and then, using that ID, 
// make another call to display the lyrics
async function trackIDAPIcall() {
    var userSong = $("#userSong").val();
    var trackIDURL = 'https://spotify23.p.rapidapi.com/search/?q=' + userSong + '&type=tracks&offset=0&limit=10&numberOfTopResults=5';

    fetch(trackIDURL, {method: 'GET', headers: {
        'X-RapidAPI-Key': '8a4e712e37mshb1ed90c6fc2827fp13454djsnb60e061840ac',
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'}
    }).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                //Adding to the data section in HTML 
                artist = data.tracks.items[0].data.artists.items[0].profile.name;
                $('#artistName').html(artist);
                album = data.tracks.items[0].data.albumOfTrack.name;
                $('#album').html(album);
                albumArt = data.tracks.items[0].data.albumOfTrack.coverArt.sources[0].url;
                $('#albumArt').attr("src", albumArt);


                trackID = data.tracks.items[0].data.id;
                // $('#trackID').text(trackID);
                trackLyricsURL = 'https://spotify23.p.rapidapi.com/track_lyrics/?id=' + trackID;

                fetch(trackLyricsURL, {method: 'GET', headers: {
                    'X-RapidAPI-Key': '8a4e712e37mshb1ed90c6fc2827fp13454djsnb60e061840ac',
                    'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
                }})
                .then(response => response.json())
                .then(data => {
                    if (data && data.lyrics && Array.isArray(data.lyrics.lines)) {
                        data.lyrics.lines.forEach(line => {
                            displayLyrics(line.words);
                        });
                    } else {
                        console.log('Lyrics data format is incorrect.');
                    }
                })
                .catch(error => {
                    console.error('Error fetching lyrics:', error);
                });
            })
        }
    })

}


//Creating container for lyrics
var lyricsContainer = document.getElementById('lyrics')
var displayLyrics = (lyrics) => {
    lyricsContainer.innerHTML += `
    <p>${lyrics}</p>
    `
}


//Call the functions
btnClick();