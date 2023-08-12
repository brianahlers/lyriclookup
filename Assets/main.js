var songID = '';
var height = '';
var width = '';
var pic = '';
// var track_id;
var iframe = document.getElementById('player');

function btnClick() {
    $("#inputGroup-sizing-lg").click(function () {
        var userSong = $("#userSong").val();
        console.log(userSong);
        APIcall();
        trackIDAPIcall();
    });

}


//YOUTUBE API SECTION

function APIcall() {
    var userSong = $("#userSong").val() + " cover";
    var url = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet%2C%20id&maxResults=1&q=';
    var APIKey = '&videoEmbeddable=any&key=AIzaSyC-AUJX5gMJ-aKoHP0yZz3Sl0Q0-k6-92o';
    var queryURL = url + userSong + APIKey;
    // var newURL = 'https://www.youtube.com/watch?v=';

    fetch(queryURL).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
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


// MUSICXMATCH API SECTION

//THIRD ATTEMPT SAT 7PM-- GIVES US A 404 ERROR and UNEXPECTED TOKEN ON LINE 74
function trackIDAPIcall() {
    var userInput = $("#userSong").val();

    // Construct the URL for the request
    var url = 'http://api.musixmatch.com/ws/1.1/track.search?page_size=1&page=1&s_track_rating=desc';
    var APIKey = 'c31a3caa2fcc7a9c42c1363b7ce5ca85';
    var trackQuery = 'q_track=' + encodeURIComponent(userInput);
    var trackURL = url + '&apikey=' + APIKey + trackQuery;

    // Make a request to the server proxy
    fetch(`/getTrackInfo?userInput=${encodeURIComponent(trackURL)}`)
        .then(response => response.json())
        .then(data => {
            var track_id = data.message.body.track_list[0].track.track_id;
            $("#trackID").text(track_id);
            console.log(track_id);
        })
         .catch(error => {
             console.error("Error fetching track:", error);
         });
}


//BRIAN AND NYSAS REFACTORED CODE-- STILL HAS CORS AND FETCH ERROR 
// function trackIDAPIcall() {
//     var userInput = $("#userSong").val();
//     var url = 'http://api.musixmatch.com/ws/1.1/track.search?page_size=1&page=1&s_track_rating=desc';
//     var APIKey = '&apikey=c31a3caa2fcc7a9c42c1363b7ce5ca85&q_track=';
//     var trackURL = url + APIKey + userInput;
//     fetch(trackURL)
//         .then(response => response.json())
//         .then(data => {
//             var track_id = data.message.body.track_list[0].track.track_id;
//             $("#trackID").text(track_id);
//             data.forEach(track_id =>{
//             console.log(track_id);
//           })
           
//         })
// }

// CODE DANIEL WROTE- GOT A FETCH ERROR- AND CORS ERROR 
// function trackIDAPIcall() {
//     var userInput = $("#userSong").val();
//     var url = 'http://api.musixmatch.com/ws/1.1/track.search?page_size=1&page=1&s_track_rating=desc';
//     var APIKey = '&apikey=c31a3caa2fcc7a9c42c1363b7ce5ca85&q_track=';
//     var trackURL = url + APIKey +userInput; 

//     fetch(trackURL).then(function(response) {
//         if(response.ok) {
//             response.json().then(function(data) {
//                 track_id = data.message.body.track_list[0].track.track_id;
//                 $("#trackID").text() = track_id;
//                 console.log(track_id);
//             })
//         } 
//     })

//  }



// to do items
// get search query from search bar

// use it to make a request to the api server
// function to call the server


// looking to get track name, lyrics, and artist name



// to do items
// get search query from search bar

// use it to make a request to the api server
// function to call the server


// looking to get track name, lyrics, and artist name