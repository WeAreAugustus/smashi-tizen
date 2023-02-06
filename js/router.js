backButtonCOunter = 0;
upScrollCounter = 0;
define(['js/shared/language.js'], function (language) {
    var tvKey = window.tvKey;

    var changeScreen = function (screenName) {
        $("<div>").load("components/screens/" + screenName + ".html", function () {
            $("#screen").empty();
            $("#screen").append($(this).html());
            document.getElementById("screen").style.backgroundImage = "";
            console.log("we are here change screen after closenav")
        });
        setTimeout(function () {
            language.init()
        }, 500);
    }


    function openNav() {
        if (document.getElementById("sideBar")) {
            document.getElementById("sideBar").style.width = "100%";
            // document.getElementById("screen").style.marginLeft = "250px";
            document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
        }
    }

    function closeNav() {
        if (document.getElementById("sideBar")) {
            document.getElementById("sideBar").style.width = "0";
            document.getElementById("sideBar").style.marginLeft = "0";
            document.body.style.backgroundColor = "white";
        }
    }

    function backToHome() {
        removeMessage();
        backButtonCOunter++;
        console.log(backButtonCOunter);
        if (backButtonCOunter == 2) {
            $('#alert').html('<div id="alertMessage" style="text-align: center;" class="alert alert-danger" role="alert">Press Back again to Exit</div>');
        }
        if (backButtonCOunter == 3) {
            tizen.application.getCurrentApplication().exit();
        }
    }

    function removeMessage() {
        setTimeout(function () {
            document.getElementById("alertMessage").style.display = "none";
        }, 5000);
    }



    function backToHomeScreen() {
        $("<div>").load("components/screens/home.html", function () {
            firstElement = document.getElementById("00000001")
            firstElement.focus()
            $("#screen").empty();
            $("#screen").append($(this).html());
            setTimeout(function () {
                language.init()
            }, 500);
        });
    }


    return {
        changeScreen: changeScreen,
        navigator: function () {
        	
            firstElement = document.getElementById("00000001");
            changeScreen(firstElement.getAttribute('name'));
            firstElement.focus();

            var myLanguage = sessionStorage.getItem("locale");
            if (!myLanguage) {
                myLanguage = 'en';
            }
            document.addEventListener('keydown', function (e) {
            	var vid = document.getElementById("my-video");
            	if (e.keyCode === 13) {
            	    var dummy = document.activeElement;
            	    var clickEvent = new MouseEvent("click", {
            	      bubbles: true,
            	      cancelable: true
            	    });
            	    dummy.dispatchEvent(clickEvent);
            	  }
            	if (e.keyCode === 10009){
            		backToHomeScreen();
            	}
            	
            	switch (e.keyCode) {
                case tvKey.MediaPlayPause:
                	if (!vid.paused){
                		console.log('Video playing');
                		vid.pause();
                	}
                	else{
                		console.log('Video paused');
                		vid.play();
                	}
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

// if (myLanguage == 'en') {
// switch (e.keyCode) {
// case tvKey.LEFT:
// console.log("LEFT")
// backButtonCOunter = 0;
// left()
// console.log("We are here: " + document.activeElement.id)
// if (document.activeElement.id == 'mainBody') {
// document.getElementById("00020001").focus();
// }
// break;
// case tvKey.UP:
// document.body.scrollTop = 0; // For Safari
// document.documentElement.scrollTop = 0;
// console.log("UPUPUPUP")
// backButtonCOunter = 0;
// up()
// console.log(document.activeElement.id)
// if (document.activeElement.id == 'mainBody') {
// firstElement.focus();
// }
// break;
// case tvKey.RIGHT:
// console.log("RIGHT")
// backButtonCOunter = 0;
// console.log(backButtonCOunter);
// right()
// console.log(document.activeElement.id)
// if (document.activeElement.id == 'mainBody') {
// firstElement.focus();
// }
// break;
// case tvKey.DOWN:
// console.log("DOWN")
// backButtonCOunter = 0;
// down()
// console.log(document.activeElement.id)
// if (document.activeElement.id == 'mainBody') {
// firstElement.focus();
// }
// break;
// case tvKey.RETURN:
// console.log("BACK")
// backToHome()
// backToHomeScreen()
// console.log(document.activeElement.id)
// break;
// case tvKey.ENTER:
// console.log("Enter key works!");
// var clickEvent = new MouseEvent("click", {
// "view": window,
// "bubbles": true,
// "cancelable": false
// });
// break;
//                        	
// // case tvKey.MediaPlayPause:
// // console.log("PLAYPAUSE")
// // break;
// // case tvKey.MediaPlay:
// // console.log("Play")
// // break;
// // case tvKey.MediaPause:
// // console.log("Pause")
// // break;
//
//
// }
// } else {
// switch (e.keyCode) {
// case tvKey.LEFT:
// console.log("RIGHT ARABIC")
// backButtonCOunter = 0;
// right()
// console.log("We are here: " + document.activeElement.id)
// if (document.activeElement.id == 'mainBody') {
// document.getElementById("00020001").focus();
// }
// break;
// case tvKey.UP:
// console.log("UPUPUPUP")
// backButtonCOunter = 0;
// up()
// console.log(document.activeElement.id)
// if (document.activeElement.id == 'mainBody') {
// firstElement.focus();
// }
// break;
// case tvKey.RIGHT:
// console.log("LEFT ARABIC")
// backButtonCOunter = 0;
// left()
// console.log(document.activeElement.id)
// if (document.activeElement.id == 'mainBody') {
// firstElement.focus();
// }
// break;
// case tvKey.DOWN:
// console.log("DOWN")
// backButtonCOunter = 0;
// down()
// console.log(document.activeElement.id)
// if (document.activeElement.id == 'mainBody') {
// firstElement.focus();
// }
// break;
// case tvKey.RETURN:
// console.log("BACK")
// backToHome()
// backToHomeScreen()
// console.log(document.activeElement.id)
// break;
// }
// }
            })
        }
    }
})


