
//YOUTUBE API SECTION

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
//possible strt for search bar to connect to api? not sure if right way ===caleb
const searchBox = document.querySelector(".input-group input-group-lg")
// const searchbtn = document.querySelector() wasnt sure about the search button(seems connected to the text input bar?) ==caleb


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
