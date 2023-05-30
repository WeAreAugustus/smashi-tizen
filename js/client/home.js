var tvKey = window.tvKey;

var swiper = new Swiper('.swiper', {
    pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
        //        bulletActiveClass: 'swiper-pagination-bullet-active-new',
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
var swiperElement = document.querySelector("#banner");
var swiperNext = document.querySelector(".swiper-button-next");
var swiperPrev = document.querySelector(".swiper-button-prev");
var slides = document.getElementsByClassName("swiper-slide");

var currentLocale = sessionStorage.getItem("locale");
if (currentLocale == 'ar') {
    swiper.changeLanguageDirection('rtl');
    swiperNext.classList.add("rotate180");
    swiperPrev.classList.remove("rotate180");
}

function pauseNavigation() {
    SpatialNavigation.pause();
    console.log("Navigation Paused");
}

function resumeNavigation() {
    SpatialNavigation.resume();
    console.log("Navigation playing");
}

function slideNext() {
    swiper.activeIndex++;
    swiper.slideTo(swiper.activeIndex);
}

function slidePrev() {
    swiper.activeIndex--;
    swiper.slideTo(swiper.activeIndex);
}

function bannerSwipe(e) {
	console.log(slides[swiper.activeIndex]);
    if (currentLocale == 'ar') {
        switch (e.keyCode) {
            case tvKey.LEFT:
                slideNext();
                break;
            case tvKey.RIGHT:
                if (swiper.activeIndex == 0) {
                    resumeNavigation();
                }
                slidePrev();
                break;
        }
    } else {
        switch (e.keyCode) {
            case tvKey.LEFT:
                if (swiper.activeIndex == 0) {
                    resumeNavigation();
                }
                slidePrev();
                break;
            case tvKey.RIGHT:
                slideNext();
                break;
        }
    }
}
swiperElement.addEventListener('focus', pauseNavigation);
swiperElement.addEventListener('focus', scrollToTop);
swiperElement.addEventListener('focus', console.log("Banner Focused"));
swiperElement.addEventListener('keydown', bannerSwipe);

require(["router"], function(router) {
    router.showSideBar();
});

if (sessionStorage.getItem("token")) {
    document.getElementById('loginicon').setAttribute("name", "newaccount");
} else {
    document.getElementById('loginicon').setAttribute("name", "newlogin");
}

function startVideo(video_url, checker, isLive) {
    require(["router"], function(router) {
        router.startVideoGlobal(video_url, checker, isLive);
    });
}

function changeScreenGlobal(screenName) {
    require(["router"], function(router) {
        router.changeScreen(screenName);
    });
}

function goBack() {
    require(["router"], function(router) {
        router.back();
    });
}

function exitApp() {
    require(["router"], function(router) {
        router.exitApplication();
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    console.log("top");
}

function scrollToLeft() {
    window.scrollTo({
        left: 0,
        behavior: 'smooth'
    });
    console.log("left");
}
function scrollToRight() {
	window.scrollTo({
		right: 0,
		behavior: 'smooth'
	});
	console.log("right");
}
function navigateToChannel(channelId) {
	sessionStorage.setItem("ShowAndChannelId", channelId);
	changeScreenGlobal(showdetails);
}

function handleRemoteButtons(e) {
    console.log("Keycode: " + e.keyCode);
    switch (e.keyCode) {
        case tvKey.UP:
        case tvKey.DOWN:
            SpatialNavigation.resume();
            break;
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
            exitApp();
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