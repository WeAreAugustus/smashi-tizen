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

var currentLocale = sessionStorage.getItem("locale");
if (currentLocale == 'ar') {
    swiper.changeLanguageDirection('rtl');
    swiperNext.classList.add("rotate180");
    swiperPrev.classList.remove("rotate180");
}

function slide(value) {
    swiper.activeIndex += value;
    swiper.slideTo(swiper.activeIndex);
}

function bannerSwipe(e) {
    switch (e.keyCode) {
        case tvKey.LEFT:
            if (currentLocale == 'ar') {
                slide(1);
            } else {
                slide(-1)
                if (swiper.activeIndex == 0) {
					SpatialNavigation.resume();
				}
            }
            break;
        case tvKey.RIGHT:
            if (currentLocale == 'ar') {
            	if (swiper.activeIndex == 0) {
            		SpatialNavigation.resume();
            	}
                slide(-1);
            } else {
                slide(1)
            }
            break;
        case tvKey.ENTER:
            let clickEvent = new MouseEvent("click", {
                bubbles: true,
                cancelable: true
            });
            swiper.slides[swiper.activeIndex].dispatchEvent(clickEvent);
    }
}

swiperElement.addEventListener('focus', SpatialNavigation.pause);
swiperElement.addEventListener('focus', scrollToTop);
swiperElement.addEventListener('keydown', bannerSwipe);

require(["router"], function(router) {
    router.showSideBar();
});

if (sessionStorage.getItem("token")) {
    document.getElementById('loginicon').setAttribute("name", "newaccount");
    document.getElementsByClassName('sidebartext')[1].setAttribute("lang-value", "account");
    } 
else {
    document.getElementById('loginicon').setAttribute("name", "newlogin");
    document.getElementsByClassName('sidebartext')[1].setAttribute("lang-value", "loginsignup");
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
        case VK_UP:
        case VK_DOWN:
            SpatialNavigation.resume();
            break;
        case tvKey.ENTER:
        case VK_ENTER:
            var focusedElement = document.activeElement;
            var clickEvent = new MouseEvent("click", {
                bubbles: true,
                cancelable: true
            });
            focusedElement.dispatchEvent(clickEvent);
            break;
        case tvKey.RETURN:
        case VK_BACK:
        case VK_BACK_SPACE: 
        	e.preventDefault();
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
//function virtualKeys(e) {
//	switch (e.keyCode) {
//	// prevent keyPress events keys from being interpreted by platform browser
//	case tvKey.LEFT:
//	case tvKey.RIGHT:
//	case tvKey.DOWN:
//	case tvKey.UP:
//	case tvKey.ENTER:
//	case tvKey.RETURN:
//	case tvKey.MediaPlay:
//	case tvKey.MediaPause:
//	case tvKey.MediaPlayPause:
//		e.preventDefault();
//		break;
//	}
//}
document.onkeydown = handleRemoteButtons;
document.addEventListener("keypress", ignoreKeyPress, true);