require(["router"], function(router) {
    router.hideSideBar();
});

var vid = document.getElementById("my-video");
var url = sessionStorage.getItem('video_url');
var playIcon = document.querySelector('.play-icon');
var backIcon = document.querySelector('.video-container svg:nth-child(2)');
var forwardIcon = document.querySelector('.video-container svg:nth-child(4)');
//Short link: https://d2e4d5wa6eo6z0.cloudfront.net/media-convert/Smashi+Crypto/Smashi+Crypto_05_29_2023/vertical/default/hls/Bitcoin+US+Debts+(1080+×+1920px).m3u8
//Video Link: https://d2e4d5wa6eo6z0.cloudfront.net/media-convert/Smashi+Sports/Smashi+Sports_02_28_2023/horizontal/default/hls/Padel+club+d2.m3u8
//var url = 'https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8';
//var url = 'https://d2e4d5wa6eo6z0.cloudfront.net/media-convert/Smashi+Crypto/Smashi+Crypto_05_29_2023/vertical/default/hls/Bitcoin+US+Debts+(1080+×+1920px).m3u8';
var player = videojs('my-video', {
	fluid: false
});
player.src({
    src: url,
    type: 'application/x-mpegURL'
});
player.play();


function playpause() {
    if (vid.paused) {
        setTimeout(function() {
            console.log(vid.play());
        }, 10);
        console.log('playing');
    } else if (!vid.paused && vid.currentTime > 0 && !vid.ended) {
        setTimeout(function() {
            console.log(vid.pause());
        }, 10);
        console.log('paused');
    }
}

function show(icon) {
    if (icon == "forward") {
        forwardIcon.style.opacity = "1";
    } else {
        backIcon.style.opacity = "1";
    }
}
function hide(icon){
	if (icon == "forward") {
        forwardIcon.style.opacity = "0";
    } else {
        backIcon.style.opacity = "0";
    }
}

function seekForwards(value) {
    let seekToTime = vid.currentTime + value;
    if (seekToTime < 0) {
        vid.currentTime = 0;
        return
    } else if (seekToTime > vid.duration) {
        vid.currentTime = vid.duration;
        return
    }
    vid.currentTime = seekToTime;
    show("forward");
    setTimeout(function() {
    	hide("forward");
    }, 300);
}

function seekBackwards(value) {
    let seekToTime = vid.currentTime - value;
    if (seekToTime < 0) {
        vid.currentTime = 0;
        return
    } else if (seekToTime > vid.duration) {
        vid.currentTime = vid.duration;
        return
    }
    vid.currentTime = seekToTime;
    vid.currentTime = seekToTime;
    show("back");
    setTimeout(function() {
    	hide("back");
    }, 300);
}

vid.focus();
vid.addEventListener('pause', function(e) {
    playIcon.style.opacity = "1";
})
vid.addEventListener('play', function(e) {
    playIcon.style.opacity = "0";
})

vid.addEventListener('keydown', function(e) {
    var value = 10;
    switch (e.keyCode) {
        case tvKey.LEFT:
        case VK_LEFT:
        case VK_REWIND:
            seekBackwards(value);
            console.log("Video Left");
            break;
        case tvKey.RIGHT:
        case VK_RIGHT:
        case VK_FAST_FWD:
            seekForwards(value);
            console.log("Video Right");
            break;
        case tvKey.ENTER:
        case VK_ENTER:
            playpause();
            console.log("Video Enter");
            break;
        case tvKey.MediaPlayPause:
        case VK_PLAY_PAUSE:
            playpause();
            console.log("Video PlayPause");
            break;
        case tvKey.MediaPlay:
        case VK_PLAY:
            vid.play();
            console.log('Video playing');
            break;
        case tvKey.MediaPause:
        case VK_PAUSE:
        case VK_STOP:
            vid.pause();
            console.log('Video paused');
            break;
        case tvKey.RETURN:
        case VK_BACK:
        case VK_BACK_SPACE: 
        	e.preventDefault();
            player.dispose();
            console.log("player removed")
            break;
    }
});