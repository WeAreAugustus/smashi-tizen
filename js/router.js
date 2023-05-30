define(['js/shared/language.js'], function(language) {
    removeTabIfSubbed();
    var backButtonCounter = 0;
    var pages = ['home'];
    
    var sidebaricons = document.getElementsByClassName("sidebaricon");
    for(let i = 0; i < sidebaricons.length; i++){
    	let svgs = sidebaricons[i].children;
    	if(sidebaricons[i].getAttribute("name") == 'home'){
    		sidebaricons[i].style.borderInlineEndWidth = "7.5px";
    		svgs[0].style.opacity = "0";
    		svgs[1].style.opacity = "1";
    		sidebaricons[i].focus();
    	}
    }
    var changeScreen = function(screenName) {
        removeTabIfSubbed();
        backButtonCounter = 0;
        for(let i = 0; i < sidebaricons.length; i++){
        	let svgs = sidebaricons[i].children;
        	if(sidebaricons[i].getAttribute("name") == screenName){
        		sidebaricons[i].style.borderInlineEndWidth = "7.5px";
        		svgs[0].style.opacity = "0";
        		svgs[1].style.opacity = "1";
        		sidebaricons[i].focus();
        	}
        	else{
        		sidebaricons[i].style.borderInlineEndWidth = "0px";
        		svgs[0].style.opacity = "1";
        		svgs[1].style.opacity = "0";
        	}
        }
        let sideBarEl = document.getElementsByName(screenName);
        $("<div>").load("components/screens/" + screenName + ".html", function() {
            $("#screen").empty();
            $("#screen").append($(this).html());
        });
        setTimeout(function() {
            language.init()
        }, 100);
        if (pages[pages.length - 1] != screenName) {
            pages.push(screenName);
        }
    }

    function removeTabIfSubbed() {
        let premTab = document.getElementsByName("premium");
        var hasSubscription = sessionStorage.getItem("hasSubscription");
        if (hasSubscription == "true") {
            premTab[0].style.display = "none";
        } else {
            premTab[0].style.display = "block";
        }
    }

    function startVideoGlobal(video_url, checker, isLive) {
        sessionStorage.setItem("video_url", video_url);
        if (checker == 1 && isLive == 1) {
            changeScreen('player');
            console.log("first cond");
        } else if (checker == 0 && isLive == 0) {
            alert("The event is not live yet");
            console.log("second cond");
        } else if (checker == 0) {
            var hasSubscription = sessionStorage.getItem("hasSubscription");
            console.log("third cond");
            console.log("subbed: " + hasSubscription);
            if (hasSubscription == "true") {
                changeScreen('player');
                console.log("third cond subbed");
            } else {
                let isLogged = sessionStorage.getItem("token");
                if (isLogged) {
                    changeScreen('premium');
                } else {
                    changeScreen('newlogin');
                }
            }
        } else {
            console.log("Undef");
        }
    }

    function exitApplication() {
        backButtonCounter++;
        if (backButtonCounter == 3) {
        	var retVal = null;
        	if(myLanguage == 'ar'){
        		retVal = confirm("هل تريد الخروج؟");
        	}
        	else{
        		retVal = confirm("Are you sure you want to exit?");
        	}
            if(retVal == true) {
            	tizen.application.getCurrentApplication().exit();
            	return true;
            }
            else {
            	return false;
            }
        }
    }

    function showSideBar() {
        document.getElementById("newSideBar").style.display = "block";
        document.getElementById("screen").style.width = "95%";
    }

    function hideSideBar() {
        document.getElementById("newSideBar").style.display = "none";
        document.getElementById("screen").style.width = "100%";
    }

    function removeMessage() {
        setTimeout(function() {
            document.getElementById("alertMessage").style.display = "none";
        }, 3000);
    }

    function back() {
        if (pages.length == 1 && pages[0] == 'home') {
            console.log("Only the home page is here");
            return;
        }
        if (pages.length > 0) {
            pages.pop();
            let currentPage = pages[pages.length - 1];
            changeScreen(currentPage)
            setTimeout(function() {
                language.init()
            }, 20);
        } else {
            console.log("No pages to go back to");
        }
    }


    return {
        changeScreen: changeScreen,
        showSideBar: showSideBar,
        hideSideBar: hideSideBar,
        startVideoGlobal: startVideoGlobal,
        back: back,
        exitApplication: exitApplication,
        navigator: function() {
            var myLanguage = sessionStorage.getItem("locale");
            if (!myLanguage) {
                myLanguage = 'en';
            }
        }
    }
})