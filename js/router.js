define(['js/shared/language.js'], function(language) {
    removeTabIfSubbed();
    var backButtonCounter = 0;
    var tvKey = window.tvKey;
    var pages = ['home'];

    //    fetch("https://api.jsonbin.io/v3/b/6465ccfeb89b1e22999fd85b")
    //    .then(response => {
    //        console.log(response);
    //    })
    //    .catch(error => {
    //    	console.log(error);
    //    });
    //    
    var tizenKeys = tizen.tvinputdevice.getSupportedKeys();

    var changeScreen = function(screenName) {
        removeTabIfSubbed();
        backButtonCounter = 0;
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
            $('#alert').html('<div id="alertMessage" style="text-align: center;" class="alert alert-danger" role="alert">Press Back again to Exit</div>');
            removeMessage();
        }
        if (backButtonCounter == 4) {
            tizen.application.getCurrentApplication().exit();
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
            $("<div>").load("components/screens/" + currentPage + ".html", function() {
                $("#screen").empty();
                $("#screen").append($(this).html());

            });
            setTimeout(function() {
                language.init()
            }, 20);
            console.log("Pages in back: " + pages);
        } else {
            console.log("No pages to go back to");
        }
    }


    return {
        changeScreen: changeScreen,
        showSideBar: showSideBar,
        hideSideBar: hideSideBar,
        startVideoGlobal: startVideoGlobal,
        navigator: function() {

            var myLanguage = sessionStorage.getItem("locale");
            if (!myLanguage) {
                myLanguage = 'en';
            }

            document.addEventListener('keydown', function(e) {
                var vid = document.getElementById("my-video");
                switch (e.keyCode) {
                    case tvKey.RED:
                        SpatialNavigation.move('up');
                        console.log("RED");
                        break;
                    case tvKey.GREEN:
                        SpatialNavigation.move('down');
                        console.log("GREEN");
                        break;
                    case tvKey.YELLOW:
                        SpatialNavigation.move('left');
                        console.log("YELLOW");
                        break;
                    case tvKey.BLUE:
                        SpatialNavigation.move('right');
                        console.log("BLUE");
                        break;
                    case tvKey.CH_DOWN:
                    	SpatialNavigation.focus('#testsubject');
                    	console.log("CH DOWN");
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
                        back();
                        if (pages.length == 1) {
                            exitApplication();
                        }
                }

            });
        }
    }
})