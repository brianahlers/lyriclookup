
//YOUTUBE API SECTION

//Local Storage
    const searchInput = document.querySelector('.form-control');
    const lyricsSection = document.querySelector('.lyrics');
    const songDataSection = document.querySelector('.data');

    // Function to save search input to local storage
    function saveSearchInput(inputValue) {
        localStorage.setItem('searchInput', inputValue);
    }

    // Function to load and display saved search input from local storage
    function loadSearchInput() {
        const savedInput = localStorage.getItem('searchInput');

        if (savedInput) {
            searchInput.value = savedInput;
        }
    }

    // Function to save lyrics and song data to local storage
    function saveSongData(lyrics, songData) {
        const data = { lyrics, songData };
        localStorage.setItem('songData', JSON.stringify(data));
    }

    // Function to load and display saved lyrics and song data from local storage
    function loadSongData() {
        const savedData = JSON.parse(localStorage.getItem('songData'));

        if (savedData) {
            lyricsSection.innerHTML = `<h5>Lyrics</h5><p>${savedData.lyrics}</p>`;
            songDataSection.innerHTML = `<h5>Song Data</h5><p>${savedData.songData}</p>`;
        }
    }

    // Event listener for search input
    searchInput.addEventListener('input', function() {
        const inputValue = event.target.value;
        saveSearchInput(inputValue);
    });

    // Call load functions to populate data when the page loads
    loadSearchInput();
    loadSongData();

//This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);




//This function creates an <iframe> (and YouTube player)
//after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'M7lc1UVf-VE',
    playerVars: {
    'playsinline': 1
    },
    events: {
    'onReady': onPlayerReady,
    'onStateChange': onPlayerStateChange
    }
});
}


//The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
  }


//The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
}
}


function stopVideo() {
player.stopVideo();
}


// MUSICXMACH API SECTION
