require(["router"], function(router) {
    router.hideSideBar();
});

var vid = document.getElementById("my-video");
var url = sessionStorage.getItem('video_url');
var playIcon = document.querySelector('.play-icon');
//Short link: https://d2e4d5wa6eo6z0.cloudfront.net/media-convert/Smashi+Crypto/Smashi+Crypto_05_29_2023/vertical/default/hls/Bitcoin+US+Debts+(1080+×+1920px).m3u8
//Video Link: https://d2e4d5wa6eo6z0.cloudfront.net/media-convert/Smashi+Sports/Smashi+Sports_02_28_2023/horizontal/default/hls/Padel+club+d2.m3u8
//Live url = 'https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8';
//var url = 'https://d2e4d5wa6eo6z0.cloudfront.net/media-convert/Smashi+Crypto/Smashi+Crypto_05_29_2023/vertical/default/hls/Bitcoin+US+Debts+(1080+×+1920px).m3u8';
if (Hls.isSupported()) {
    var hls = new Hls();
    hls.loadSource(url);
    hls.attachMedia(vid);
    hls.on(Hls.Events.MEDIA_ATTACHED, function () {
    	vid.play();
    });
}

function playpause() {
    if (vid.paused) {
    	setTimeout(function() {
        	console.log(vid.play());
        }, 10);
        console.log('playing');
    } else if(!vid.paused && vid.currentTime > 0 && !vid.ended){
    	setTimeout(function() {
        	console.log(vid.pause());
        }, 10);
        console.log('paused');
    }
}

function seekForwards(value)
{
    let seekToTime = vid.currentTime + value;
	if(seekToTime < 0){
		vid.currentTime = 0;
		return
	} 
	else if(seekToTime > vid.duration){
		vid.currentTime = vid.duration;
		return
	}
    vid.currentTime = seekToTime;
}
function seekBackwards(value)
{
	let seekToTime = vid.currentTime - value;
	if(seekToTime < 0){
		vid.currentTime = 0;
		return
	} 
	else if(seekToTime > vid.duration){
		vid.currentTime = vid.duration;
		return
	}
	vid.currentTime = seekToTime;
}

vid.focus();
vid.addEventListener('pause', function(e){
	playIcon.style.opacity = "1";
})
vid.addEventListener('play', function(e){
	playIcon.style.opacity = "0";
})
vid.addEventListener('keydown', function(e) {
	var value = 10;
    switch (e.keyCode) {
        case tvKey.LEFT:
        	seekBackwards(value);
            console.log("Video Left");
            break;
        case tvKey.RIGHT:
        	seekForwards(value);
            console.log("Video Right");
            break;
        case tvKey.ENTER:
            playpause();
            console.log("Video Enter");
            break;
        case tvKey.MediaPlayPause:
        	playpause();
        	console.log("Video PlayPause");
        	break;
        case tvKey.MediaPlay:
            vid.play();
            console.log('Video playing');
            break;
        case tvKey.MediaPause:
            vid.pause();
            console.log('Video paused');
            break;
    }
});