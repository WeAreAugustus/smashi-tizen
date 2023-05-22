require(["router"], function(router) {
    router.hideSideBar();
});

var vid = document.getElementById("my-video");
var url = sessionStorage.getItem('video_url');
//var url = 'https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8';
if (Hls.isSupported()) {
    var hls = new Hls();
    hls.loadSource(url);
    hls.attachMedia(vid);
}

function playpause() {
    if (vid.paused) {
        vid.play();
        console.log('!pause');
    } else if(!vid.paused && vid.currentTime > 0 && !vid.ended){
        vid.pause();
        console.log('else');
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
vid.addEventListener('click', playpause);
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
//        case tvKey.ENTER:
//            playpause();
//            console.log("Video Enter");
//            break;
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