define(function(){var a={base:"https://smashi.tv/api/",login:"api/v2/login",register:"api_register",emailChecker:"check/email",getProfile:"details",live:"live-video",latest:"video",trending:"video/trending",tvShows:"video/shows",schedule:"schedule/list",search:"video/search",savedVideos:"saved/video/list",channels:"video/shows/channel"};return{url:a,responseSuccessHandler:function(b){console.log("success",b);return b;},responseErrorHandler:function(b){console.log("error",b);return b.responseJSON;},zeroPad:function(b,c){return String(b).padStart(c,"0");}};});