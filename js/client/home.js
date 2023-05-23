var tvKey = window.tvKey;
document.activeElement = document.getElementById("starterEl");
require(["router"], function(router) {
    router.showSideBar();
});

function startVideo(video_url, checker, isLive) {
    require(["router"], function(router) {
        router.startVideoGlobal(video_url, checker, isLive);
    });
}

function goBack() {
    require(["router"], function(router) {
        router.back();
    });
}

function changeScreenGlobal(screenName) {
    require(["router"], function(router) {
        router.changeScreen(screenName);
    });
}

function handleRemoteButtons(e) {
	console.log("Keycode: " + e.keyCode);
    switch (e.keyCode) {
        case tvKey.ENTER:
            var focusedElement = document.activeElement;
            var clickEvent = new MouseEvent("click", {
                bubbles: true,
                cancelable: true
            });
            focusedElement.dispatchEvent(clickEvent);
            break;
        case tvKey.RETURN:
            goBack();
            break;
    }
}

function ignoreKeyPress(e) {
    switch (e.keyCode) {
        // prevent keyPress events keys from being interpreted by platform browser
        case tvKey.LEFT:
        case tvKey.RIGHT:
        case tvKey.DOWN:
        case tvKey.UP:
        case tvKey.ENTER:
        case tvKey.RETURN:
        case tvKey.MediaPlay:
        case tvKey.MediaPause:
        case tvKey.MediaPlayPause:
            e.preventDefault();
            break;
    }
}
document.onkeydown = handleRemoteButtons;
document.addEventListener("keypress", ignoreKeyPress, true);