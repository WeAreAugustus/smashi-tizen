define(function(){
    //urls https://smashi.tv/api/video/shows/18/details
    var url = {
        // 'base' : 'http://644a-156-214-18-142.ngrok.io/api/',
        'base' : 'https://smashi.tv/api/',


        'login': 'api/v2/login',
        'register' : 'api_register',
        'emailChecker': 'check/email',
        'getProfile' : 'details',

        'live': 'live-video',
        'latest': 'video',
        'trending': 'video/trending',
        'tvShows': 'video/shows',
        'schedule': 'schedule/list',
        'search': 'video/search',
        'savedVideos': 'saved/video/list',
        'channels': 'video/shows/channel'
        
    }

    return {
        url: url,
        responseSuccessHandler: function(response){
            console.log("success", response)
            return response;
        },
        responseErrorHandler: function(response){
            console.log("error", response)
            return response.responseJSON;
        },
        zeroPad: function(num, totalLength) {
            return String(num).padStart(totalLength, '0');
        }
    }
})