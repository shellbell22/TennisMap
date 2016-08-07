var token;

var apiKey = AIzaSyAw4baZsaSAhJJeGsVDTxZ2Cs3Y5ZlB8dU;

$(function() {
    $('#search-term').submit(function(event) {
        event.preventDefault();
        var searchTerm = $('#query').val();
        $('#search-results').empty();
        getRequest(searchTerm);

    });

    $('#nextpage').click(function () {
        var searchTerm = $('#query').val();

        getRequest(searchTerm, token);

    });

});

function getRequest(searchTerm, tokenInput) {
	var params = {
		part:'snippet',
    key: 'AIzaSyA3_pbYGu7QwIGraJ7MwH0eM09KZR9U2yA',
    q: searchTerm,
    pageToken: tokenInput
	};
	url = 'https://www.googleapis.com/youtube/v3/search';

	$.getJSON(url, params, function(data) {
      console.log(data);
      token = data.nextPageToken;
		showResults(data.items);
	});
}


function showResults(results) {
    var html = "";
    $.each(results, function(index, value) {
        var thumbnailimage = value.snippet.thumbnails.medium.url;
        var largethumbnailimage = value.snippet.thumbnails.high.url;
        var channellink = 'https://www.youtube.com/channel/' + value.snippet.channelId;
        var channelname = value.snippet.channelTitle;
        var link = 'https://www.youtube.com/watch?v=' +  value.id.videoId;
        html += '<li><a target="_new" href="'+link+'"><h1>'+ value.snippet.title +'</h1></a><a target="_new" href="' + channellink + '"><h2>' + channelname + '</h2></a><a  data-lightbox="' + largethumbnailimage + '" href="' + largethumbnailimage + '"><img src="' + thumbnailimage + '"></a></li>';
    });
    $('#search-results').append(html);
}
