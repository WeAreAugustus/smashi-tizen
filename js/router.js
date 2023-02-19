var backButtonCounter = 0;
define(['js/shared/language.js'], function (language) {
    var tvKey = window.tvKey;
    var pages = [];
    
    var changeScreen = function (screenName) {
    	backButtonCounter = 0;
        $("<div>").load("components/screens/" + screenName + ".html", function () {
            $("#screen").empty();
            $("#screen").append($(this).html());
        });
        setTimeout(function () {
            language.init()
        }, 500);
    	pages.push(screenName);
    	console.log("Pages in changeScreen: " + pages);
    }


    function openNav() {
        if (document.getElementById("sideBar")) {
            document.getElementById("sideBar").style.width = "100%";
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

    function exitApplication() {
        removeMessage();
        backButtonCounter++;
        if (backButtonCounter == 3) {
            $('#alert').html('<div id="alertMessage" style="text-align: center;" class="alert alert-danger" role="alert">Press Back again to Exit</div>');
        }
        if (backButtonCounter == 4) {
            tizen.application.getCurrentApplication().exit();
        }
    }

    function removeMessage() {
        setTimeout(function () {
            document.getElementById("alertMessage").style.display = "none";
        }, 5000);
    }

    function back(){
    	if (pages.length == 1 && pages[0] == 'home'){
    		console.log("Only the home page is here");
    		return;
    	}
    	if (pages.length > 0){
    		pages.pop();
    		let currentPage = pages[pages.length - 1].toString();
    		$("<div>").load("components/screens/" + currentPage + ".html", function () {
                $("#screen").empty();
                $("#screen").append($(this).html());
            });
            setTimeout(function () {
                language.init()
            }, 500);
            console.log("Pages in back: " + pages);
    	}
    	else {
    		console.log("No pages to go back to");
    	}
    }

    function backToHomeScreen() {
    	changeScreen('home');
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
                case tvKey.RETURN:
                	back();
                	if (pages.length == 1){
                		exitApplication();
                	}
            	}
            	
            })
        }
    }
})


