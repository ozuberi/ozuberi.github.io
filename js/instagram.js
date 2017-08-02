
console.log("instagram script loaded");

var token = '174151369.c36b1f9.e5bd6664f66944198ea8030a4012c03b',
    num_photos = 6;
 
$.ajax({
    url: 'https://api.instagram.com/v1/users/self/media/recent',
    dataType: 'jsonp',
    type: 'GET',
    data: { access_token: token, count: num_photos },
    success: function (data ) {
        console.log(data);
        for (x in data.data) {
            $('#instafeed').append('<li><img src="'+data.data[x].images.standard_resolution.url+'"></li>');
        }
    },
    error: function(data){
        console.log(data);
    }
});



