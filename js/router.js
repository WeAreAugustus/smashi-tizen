backButtonCOunter = 0;
upScrollCounter = 0;
define(['js/shared/language.js'], function (language) {
    var tvKey = window.tvKey;

    function zeroPad(num, totalLength) {
        return String(num).padStart(totalLength, '0');
    }
    function getElementPosition(focusedItemId) {
        return {
            col: parseInt(focusedItemId.substring(0, 4)),
            row: parseInt(focusedItemId.substring(4, 8))
        }
    }

    var changeScreen = function (screenName) {

        // console.log("we are here after open nav")


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

    function left() {
        var focusedItemId = document.activeElement.id
        var { col, row } = getElementPosition(focusedItemId);

        if (!document.getElementById(`${zeroPad(col - 1, 4)}${zeroPad(row, 4)}`)) return;
        document.getElementById(focusedItemId).blur();
        setTimeout(function () {
            document.getElementById(`${zeroPad(col - 1, 4)}${zeroPad(row, 4)}`).scrollIntoViewIfNeeded();
        }, 50);
        document.getElementById(`${zeroPad(col - 1, 4)}${zeroPad(row, 4)}`).focus();
    }


    function right() {
        var focusedItemId = document.activeElement.id
        var { col, row } = getElementPosition(focusedItemId);

        if (!document.getElementById(`${zeroPad(col + 1, 4)}${zeroPad(row, 4)}`)) return;
        document.getElementById(focusedItemId).blur();
        setTimeout(function () {
            document.getElementById(`${zeroPad(col + 1, 4)}${zeroPad(row, 4)}`).scrollIntoViewIfNeeded();
        }, 50);
        document.getElementById(`${zeroPad(col + 1, 4)}${zeroPad(row, 4)}`).focus();
    }


    function up() {
        var focusedItemId = document.activeElement.id
        var { col, row } = getElementPosition(focusedItemId);

        if (!document.getElementById(`${zeroPad(col, 4)}${zeroPad(row - 1, 4)}`)) return;
        document.getElementById(focusedItemId).blur();
        setTimeout(function () {
            document.getElementById(`${zeroPad(col, 4)}${zeroPad(row - 1, 4)}`).scrollIntoViewIfNeeded();
        }, 50);
        document.getElementById(`${zeroPad(col, 4)}${zeroPad(row - 1, 4)}`).focus();
    }


    function down() {
        var focusedItemId = document.activeElement.id
        var { col, row } = getElementPosition(focusedItemId);

        if (!document.getElementById(`${zeroPad(col, 4)}${zeroPad(row + 1, 4)}`)) return;
        document.getElementById(focusedItemId).blur();
        setTimeout(function () {
            document.getElementById(`${zeroPad(col, 4)}${zeroPad(row + 1, 4)}`).scrollIntoViewIfNeeded();
        }, 50);
        document.getElementById(`${zeroPad(col, 4)}${zeroPad(row + 1, 4)}`).focus();
    }



    function openNav() {
        if (document.getElementById("mySidenav")) {
            document.getElementById("mySidenav").style.width = "100%";
            // document.getElementById("screen").style.marginLeft = "250px";
            document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
        }
    }

    function closeNav() {
        if (document.getElementById("mySidenav")) {
            document.getElementById("mySidenav").style.width = "0";
            document.getElementById("screen").style.marginLeft = "0";
            document.body.style.backgroundColor = "white";
        }
    }



    function backToHome() {
        removeMessage();
        backButtonCOunter++;
        console.log(backButtonCOunter);
        if (backButtonCOunter == 2) {
            $('#alert').html('<div id="alertMessage" style="    text-align: center;" class="alert alert-danger" role="alert">Press Back again to Exit</div>');
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
        });
    }


    return {
        changeScreen: changeScreen,
        navigator: function () {
            // backButtonCounter == 0
            firstElement = document.getElementById("00000001");

            // tizen.tvinputdevice.registerKey('MediaPlayPause');



            changeScreen(firstElement.getAttribute('name'));
            firstElement.focus();

            var myLanguage = sessionStorage.getItem("locale");
            if (!myLanguage) {
                myLanguage = 'en';
            }
            if (!myLanguage) {
                myLanguage = 'en';
            }
            document.addEventListener('keydown', function (e) {
            	
            	if (event.keyCode === 13) {
            	    var dummy = document.activeElement;
            	    var clickEvent = new MouseEvent("click", {
            	      bubbles: true,
            	      cancelable: true
            	    });
            	    dummy.dispatchEvent(clickEvent);
            	  }

//                if (myLanguage == 'en') {
//                    switch (e.keyCode) {
//                        case tvKey.LEFT:
//                            console.log("LEFT")
//                            backButtonCOunter = 0;
//                            left()
//                            console.log("We are here: " + document.activeElement.id)
//                            if (document.activeElement.id == 'mainBody') {
//                                document.getElementById("00020001").focus();
//                            }
//                            break;
//                        case tvKey.UP:
//                            document.body.scrollTop = 0; // For Safari
//                            document.documentElement.scrollTop = 0;
//                            console.log("UPUPUPUP")
//                            backButtonCOunter = 0;
//                            up()
//                            console.log(document.activeElement.id)
//                            if (document.activeElement.id == 'mainBody') {
//                                firstElement.focus();
//                            }
//                            break;
//                        case tvKey.RIGHT:
//                            console.log("RIGHT")
//                            backButtonCOunter = 0;
//                            console.log(backButtonCOunter);
//                            right()
//                            console.log(document.activeElement.id)
//                            if (document.activeElement.id == 'mainBody') {
//                                firstElement.focus();
//                            }
//                            break;
//                        case tvKey.DOWN:
//                            console.log("DOWN")
//                            backButtonCOunter = 0;
//                            down()
//                            console.log(document.activeElement.id)
//                            if (document.activeElement.id == 'mainBody') {
//                                firstElement.focus();
//                            }
//                            break;
//                        case tvKey.RETURN:
//                            console.log("BACK")
//                            backToHome()
//                            backToHomeScreen()
//                            console.log(document.activeElement.id)
//                            break;
//                        case tvKey.ENTER:
//                        	console.log("Enter key works!");
//                        	var clickEvent = new MouseEvent("click", {
//                        	    "view": window,
//                        	    "bubbles": true,
//                        	    "cancelable": false
//                        	});
//                        	break;
//                        	
//                        // case tvKey.MediaPlayPause:
//                        //     console.log("PLAYPAUSE")
//                        //     break;
//                        // case tvKey.MediaPlay:
//                        //     console.log("Play")
//                        //     break;
//                        // case tvKey.MediaPause:
//                        //     console.log("Pause")
//                        //     break;
//
//
//                    }
//                } else {
//                    switch (e.keyCode) {
//                        case tvKey.LEFT:
//                            console.log("RIGHT ARABIC")
//                            backButtonCOunter = 0;
//                            right()
//                            console.log("We are here: " + document.activeElement.id)
//                            if (document.activeElement.id == 'mainBody') {
//                                document.getElementById("00020001").focus();
//                            }
//                            break;
//                        case tvKey.UP:
//                            console.log("UPUPUPUP")
//                            backButtonCOunter = 0;
//                            up()
//                            console.log(document.activeElement.id)
//                            if (document.activeElement.id == 'mainBody') {
//                                firstElement.focus();
//                            }
//                            break;
//                        case tvKey.RIGHT:
//                            console.log("LEFT ARABIC")
//                            backButtonCOunter = 0;
//                            left()
//                            console.log(document.activeElement.id)
//                            if (document.activeElement.id == 'mainBody') {
//                                firstElement.focus();
//                            }
//                            break;
//                        case tvKey.DOWN:
//                            console.log("DOWN")
//                            backButtonCOunter = 0;
//                            down()
//                            console.log(document.activeElement.id)
//                            if (document.activeElement.id == 'mainBody') {
//                                firstElement.focus();
//                            }
//                            break;
//                        case tvKey.RETURN:
//                            console.log("BACK")
//                            backToHome()
//                            backToHomeScreen()
//                            console.log(document.activeElement.id)
//                            break;
//                    }
//                }
            })
        }
    }
})


