var songID = '';
var height = '';
var width = '';
var pic = '';
var iframe = document.getElementById('player');

function btnClick() {
    $("#inputGroup-sizing-lg").click(function(){
        var userSong = $("#userSong").val();
        console.log(userSong);
        APIcall();
    });

}


//YOUTUBE API SECTION

function APIcall() {
    var userSong = $("#userSong").val();
    var url = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet%2C%20id&maxResults=1&q=';
    var APIKey = '&videoEmbeddable=any&key=AIzaSyC-AUJX5gMJ-aKoHP0yZz3Sl0Q0-k6-92o';
    var queryURL = url + userSong + APIKey;
    // var newURL = 'https://www.youtube.com/watch?v=';
     
    fetch(queryURL).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                songID = data.items[0].id.videoId;
                height = data.items[0].snippet.thumbnails.high.height;
                width = data.items[0].snippet.thumbnails.high.width;
                pic = data.items[0].snippet.thumbnails.high.url;
                console.log(songID);
                console.log(height);
                console.log(width);
                $('#player').attr('src', 'https://www.youtube.com/embed/' + songID + '?autoplay=1?enablejsapi=1');
                // $('#player').attr('src', pic);
                $('#player').attr('width', width);
                // $('#player').attr('height', height);
                // newURL += songID;
            })
        }
    })
    
}


btnClick();


// MUSICXMACH API SECTION


// to do items
// get search query from search bar

// use it to make a request to the api server
// function to call the server


// looking to get track name, lyrics, and artist name