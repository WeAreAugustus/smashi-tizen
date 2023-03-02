define(['js/shared/language.js'], function (language) {
	var backButtonCounter = 0;
    var tvKey = window.tvKey;
    var pages = ['home'];
    
    
    var changeScreen = function (screenName) {
    	backButtonCounter = 0;
    	let sideBarEl = document.getElementsByName(screenName);
//    	border-right: solid;
//    	border-color: #FB8044;
//    	border-color-width: 10px;
        $("<div>").load("components/screens/" + screenName + ".html", function () {
            $("#screen").empty();
            $("#screen").append($(this).html());
        });
        setTimeout(function () {
            language.init()
        }, 20);
        if (pages[pages.length - 1] != screenName){
        	pages.push(screenName);
        }
    	console.log("Pages in changeScreen: " + pages);
    }
    
    function startVideoGlobal(video_url, checker) {
    	sessionStorage.setItem("video_url", video_url);
    		if (checker == 1){
    			changeScreen('player');
    		}
    		else if (checker == 0){
    			let hasSubscription = sessionStorage.getItem("hasSubscription");
    			if (hasSubscription){
    				changeScreen('player');	
    			}
    			else{
    				changeScreen('profile');	
    			}
    		}
    		else{
    			console.log("Undef");
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
    
    function showSideBar(){
    	document.getElementById("newSideBar").style.display = "block";
        document.getElementById("screen").style.width = "95%";
    }
    
    function hideSideBar(){
    	document.getElementById("newSideBar").style.display = "none";
        document.getElementById("screen").style.width = "100%";
    }
    
    function removeMessage() {
        setTimeout(function () {
            document.getElementById("alertMessage").style.display = "none";
        }, 3000);
    }

    function back(){
    	if (pages.length == 1 && pages[0] == 'home'){
    		console.log("Only the home page is here");
    		return;
    	}
    	
    	if (pages.length > 0){
    		pages.pop();
    		let currentPage = pages[pages.length - 1];
    		$("<div>").load("components/screens/" + currentPage + ".html", function () {
                $("#screen").empty();
                $("#screen").append($(this).html());
                
            });
            setTimeout(function () {
                language.init()
            }, 20);
            console.log("Pages in back: " + pages);
    	}
    	else {
    		console.log("No pages to go back to");
    	}
    }


    return {
        changeScreen: changeScreen,
        showSideBar: showSideBar,
        hideSideBar: hideSideBar,
        startVideoGlobal: startVideoGlobal,
        navigator: function () {

            var myLanguage = sessionStorage.getItem("locale");
            if (!myLanguage) {
                myLanguage = 'en';
            }
            document.addEventListener('keydown', function (e) {
            	var vid = document.getElementById("my-video");
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
                case tvKey.ENTER:
            	    var focusedElement = document.activeElement;
            	    var clickEvent = new MouseEvent("click", {
            	      bubbles: true,
            	      cancelable: true
            	    });
            	    focusedElement.dispatchEvent(clickEvent);
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
            	
            });
        }
    }
})


