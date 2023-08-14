//Global Variables
var songID = '';
var height = '';
var width = '';
var pic = '';
var trackID = '';
var lyrics = '';
var iframe = document.getElementById('player');
var trackLyricsURL = '';


//Click function
function btnClick() {
    $("#inputGroup-sizing-lg").click(function(){
        var userSong = $("#userSong").val();
        console.log(userSong);
        APIcall();
        trackIDAPIcall();
    });

}


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
    // var userSong = $("#userSong").val() + ' cover';
    // var url = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet%2C%20id&maxResults=1&q=';
    // var APIKey = '&videoEmbeddable=any&key=AIzaSyC-AUJX5gMJ-aKoHP0yZz3Sl0Q0-k6-92o';
    // var queryURL = url + userSong + APIKey;
     
    // fetch(queryURL).then(function(response) {
    //     if(response.ok) {
    //         response.json().then(function(data) {
    //             songID = data.items[0].id.videoId;
    //             height = data.items[0].snippet.thumbnails.high.height;
    //             width = data.items[0].snippet.thumbnails.high.width;
    //             console.log(songID);
    //             console.log(height);
    //             console.log(width);
    //             $('#player').attr('src', 'https://www.youtube.com/embed/' + songID + '?autoplay=1?enablejsapi=1');
    //             $('#player').attr('width', width);
    //             $('#player').attr('height', height);
    //         })
    //     }
    // })
    
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