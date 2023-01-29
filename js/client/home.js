define(['client/shared', 'js/shared/language.js', 'js/cdn/paginationmin.js', 'client/auth'], function (shared, language) {
    return {
        topSection: function (itemId) {
            var dataHtml = "";
            itemId = shared.zeroPad(itemId + 1, 4);
            dataHtml += `
            <style>
            .subButtonMain:focus {
                background-color: white !important;
            }
        </style> 
        <div class="row">
            <!-- Left Section -->
            <div style="margin-top: 6rem;" class="col-5">
                <div class="container-fluid">
                    <h2 style="font-weight: 700; font-size: 48px; margin-bottom: 2rem;" lang-value="intro"></h2>
                    <div style="margin-bottom: 3rem;">
                    	<img src="img/Live.svg" style="margin-bottom: 1rem">
                    	<h2 lang-value="morning" style="font-weight: 600; font-size:32px;"> </h2>
                    </div>
                    <div style="margin-bottom: 2rem;">
                    	<h2 lang-value="up" style="font-weight: 700; font-size:24px; margin-bottom: 1rem;"> </h2>
                    	<h2 style="font-weight: 600; font-size:32px;"> Tech Bel Araby </h2>
                    </div>
                    <button class="focusable newbutton watchlivebutton" onkeypress="toAccount()" onclick="toAccount()" id="DummyButton" lang-value="watch" style="font-weight: 700; font-size: 32px;">
                    </button>
                  <div id="full" style="display: block;">
	                	<button id="fsb" class="focusable fullbutton fullbuttonbefore" onclick="setToFullScreen()">
	                		<img src="img/fullbefore.svg">
	                	</button>
	                	<button class="focusable fullbutton fullbuttonafter" onclick="setToFullScreen()">
	            			<img src="img/fullafter.svg">
	            		</button> 
            		</div> 
                </div>
            </div>
            <!-- Right Section -->
            <div id="livePlayer" class="col-7">
            
                <div id="videoContainer" class="videoContainer">
                    <div  class='player-container'>
                    <div id="subscriptionText" style="display: none; text-align: center;position: absolute;z-index: 999;top: 14%;right: 12%;font-style: normal;font-weight: 600;font-size: 56px;line-height: 66px;">
	                        <p>Get Premium</p>
	                        <p>To Continue Watching</p>
	                        <a href="components/screens/profile.html>"
		                        <button lang-value="starttrial" style="margin-top: 1rem; font-size: 48px; font-weight: 600;" class="focusable newbutton starttrialbutton"
		                        onclick="testNav()">
	                        	</button>  
	                        </a>
                    </div>
                        <div id="liveVideoPlayer" style="filter: blur(0px);" class='player'>
                            <video id="video" playsinline pause></video>
                            <img src="img/Livepng.svg" style="position: inherit; margin-top: 1rem; margin-left: 2rem; top: 2rem;">
                            <div class='play-btn-big'>
                            </div>
                            <!-- <div id="controlsView" style="display: none;  position: absolute;" class='controls'>
                            	<div class='controls-main'>
                                    <div class='controls-left'>
                                        <div class='volume'>
                                            <button id="00020001" class='volume-btn loud'>
                                                <svg width="26" height="24" viewBox="0 0 26 24" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M6.75497 17.6928H2C0.89543 17.6928 0 16.7973 0 15.6928V8.30611C0 7.20152 0.895431 6.30611 2 6.30611H6.75504L13.9555 0.237289C14.6058 -0.310807 15.6 0.151473 15.6 1.00191V22.997C15.6 23.8475 14.6058 24.3098 13.9555 23.7617L6.75497 17.6928Z"
                                                        transform="translate(0 0.000518799)" fill="white" />
                                                    <path id="volume-low"
                                                        d="M0 9.87787C2.87188 9.87787 5.2 7.66663 5.2 4.93893C5.2 2.21124 2.87188 0 0 0V2C1.86563 2 3.2 3.41162 3.2 4.93893C3.2 6.46625 1.86563 7.87787 0 7.87787V9.87787Z"
                                                        transform="translate(17.3333 7.44955)" fill="white" />
        
                                                    <path id="volume-high"
                                                        d="M0 16.4631C4.78647 16.4631 8.66667 12.7777 8.66667 8.23157C8.66667 3.68539 4.78647 0 0 0V2C3.78022 2 6.66667 4.88577 6.66667 8.23157C6.66667 11.5773 3.78022 14.4631 0 14.4631V16.4631Z"
                                                        transform="translate(17.3333 4.15689)" fill="white" />
                                                    <path id="volume-off"
                                                        d="M1.22565 0L0 1.16412L3.06413 4.0744L0 6.98471L1.22565 8.14883L4.28978 5.23853L7.35391 8.14883L8.57956 6.98471L5.51544 4.0744L8.57956 1.16412L7.35391 0L4.28978 2.91031L1.22565 0Z"
                                                        transform="translate(17.3769 8.31403)" fill="white" />
                                                </svg>
        
                                            </button>
                                            <div class='volume-slider' style="display: none;">
                                                <div class='volume-filled'></div>
                                            </div>
                                        </div>
                                    </div>
                                    <button id="00030001" class='play-btn'></button> 
                                    <div class="controls-right">
        
                                        <button id="00020001" class='fullscreen'>
                                            <svg width="25" height="30" viewBox="0 0 30 22"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M0 0V-1.5H-1.5V0H0ZM0 18H-1.5V19.5H0V18ZM26 18V19.5H27.5V18H26ZM26 0H27.5V-1.5H26V0ZM1.5 6.54545V0H-1.5V6.54545H1.5ZM0 1.5H10.1111V-1.5H0V1.5ZM-1.5 11.4545V18H1.5V11.4545H-1.5ZM0 19.5H10.1111V16.5H0V19.5ZM24.5 11.4545V18H27.5V11.4545H24.5ZM26 16.5H15.8889V19.5H26V16.5ZM27.5 6.54545V0H24.5V6.54545H27.5ZM26 -1.5H15.8889V1.5H26V-1.5Z"
                                                    transform="translate(2 2)" fill="white" />
                                            </svg>
                                        </button>
                                    </div> 
                                </div>
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
        
        
        </div>
        <script>
        function setToFullScreen() {
          var video = document.getElementById("video");
          if (video.requestFullscreen) {
            video.requestFullscreen();
          } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen();
          } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
          } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
          }
        }
        </script>
        
        
        <script>
            var video = document.querySelector('#video');
            hasSubscription = sessionStorage.getItem("hasSubscription");
            if (Hls.isSupported()) {
                var hls = new Hls();
                hls.loadSource('https://d1ock1cbv8rr1i.cloudfront.net/hls/main.m3u8');
                hls.attachMedia(video);
                hls.on(Hls.Events.MANIFEST_PARSED, function () {
                	if (hasSubscription == null){
                    	video.pause();
                    }
                    else{
                    	video.play();
                    }
                });
            }
        
            var tvKey = window.tvKey;
            tizen.tvinputdevice.registerKey('MediaPlay');
            tizen.tvinputdevice.registerKey('MediaPause');
        
            document.addEventListener('keydown', function (e) {
        
                switch (e.keyCode) {
                    case tvKey.MediaPlayPause:
                        console.log("PLAYPAUSE")
                        break;
                    case tvKey.MediaPlay:
                        console.log("Play")
                        video.play();
                        break;
                    case tvKey.MediaPause:
                        console.log("Pause")
                        video.pause();
                        break;
        
        
                }
            })
        
        </script>
        
        <script>
        
            //ELEMENT SELECTORS
            var player = document.querySelector('.player');
            var video = document.querySelector('#video');
            var playBtn = document.querySelector('.play-btn');
            var volumeBtn = document.querySelector('.volume-btn');
            var volumeSlider = document.querySelector('.volume-slider');
            var volumeFill = document.querySelector('.volume-filled');
            var progressSlider = document.querySelector('.progress');
            var progressFill = document.querySelector('.progress-filled');
            var textCurrent = document.querySelector('.time-current');
            var textTotal = document.querySelector('.time-total');
            var speedBtns = document.querySelectorAll('.speed-item');
            var fullscreenBtn = document.querySelector('.fullscreen');
        
            //GLOBAL VARS
            var lastVolume = 1;
            var isMouseDown = false;
        
            //PLAYER FUNCTIONS
            function togglePlay() {
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
                playBtn.classList.toggle('paused');
            }
            function togglePlayBtn() {
                playBtn.classList.toggle('playing');
            }
        
            function toggleMute() {
                if (video.volume) {
                    lastVolume = video.volume;
                    video.volume = 0;
                    volumeBtn.classList.add('muted');
                    volumeFill.style.width = 0;
                } else {
                    video.volume = lastVolume;
                    volumeBtn.classList.remove('muted');
                    volumeFill.style.width = lastVolume * 100;
                }
            }
        
            //EVENT LISTENERS
            playBtn.addEventListener('click', togglePlay);
            video.addEventListener('click', togglePlay);
            video.addEventListener('play', togglePlayBtn);
            video.addEventListener('pause', togglePlayBtn);
            video.addEventListener('ended', togglePlayBtn);
            volumeBtn.addEventListener('click', toggleMute);
            window.addEventListener('mousedown', () => isMouseDown = true)
            window.addEventListener('mouseup', () => isMouseDown = false)
            fullscreenBtn.addEventListener('click', toggleFullscreen);
            speedBtns.forEach(speedBtn => {
                speedBtn.addEventListener('click', setSpeed);
            })
        
        
        
        </script>
        <script>


        	var video = document.getElementById("video");
            hasSubscription = sessionStorage.getItem("hasSubscription");
            if (hasSubscription == null) {
            	document.getElementById("subscriptionText").style.display = "";
            	document.getElementById("liveVideoPlayer").style.filter = "blur(15px)";
            	document.getElementById("full").style.display = "none";
            	video.pause();
            } 
            else {
            	document.getElementById('fsb').id = '00020001';
            	document.getElementById("full").style.display = "block";
                document.getElementById("controlsView").style.display = "";
                document.getElementById("banner").remove();
                document.getElementById("subscriptionText").remove();
                video.play();
            }
        	if (video.paused) {
      		  console.log('The video is paused');
      		} else {
      		  console.log('The video is playing');
      		}

        
            function toAccount() {
                $("<div>").load("components/screens/profile.html", function () {
                    firstElement = document.getElementById("00000001")
                    firstElement.focus()
                    $("#screen").empty();
                    $("#screen").append($(this).html());
                    closeNav();
                });
            }
            
//            function testNav() {
//            	window.location.href = "components/screens/profile.html";
//            }
        </script>             
                `
            $("#topSection").html(dataHtml);
        },
        watchSection: function (itemId) {
            var dataHtml = "";
            itemId = shared.zeroPad(itemId + 1, 4);
            dataHtml += `<div class="container">
            <div id="liveVideoPlayer" style="background-color: black;border-radius: 10px;" class='players'>
                <video id='home_video_player' autoplay style=" height: 500px;width: -webkit-fill-available;"></video>
                <div id="controlsView" class='controls' style="width:inherit;border-radius: 10px;background-color:black;">
        
                    <div class='controls-main'>
                        <div class='controls-left'>
                            <div class='volume'>
                                <button id="00010001" class='volume-btn loud' onkeypress="myVol()">
                                    <svg width="26" height="24" viewBox="0 0 26 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M6.75497 17.6928H2C0.89543 17.6928 0 16.7973 0 15.6928V8.30611C0 7.20152 0.895431 6.30611 2 6.30611H6.75504L13.9555 0.237289C14.6058 -0.310807 15.6 0.151473 15.6 1.00191V22.997C15.6 23.8475 14.6058 24.3098 13.9555 23.7617L6.75497 17.6928Z"
                                            transform="translate(0 0.000518799)" fill="white" />
                                        <path id="volume-low"
                                            d="M0 9.87787C2.87188 9.87787 5.2 7.66663 5.2 4.93893C5.2 2.21124 2.87188 0 0 0V2C1.86563 2 3.2 3.41162 3.2 4.93893C3.2 6.46625 1.86563 7.87787 0 7.87787V9.87787Z"
                                            transform="translate(17.3333 7.44955)" fill="white" />
        
                                        <path id="volume-high"
                                            d="M0 16.4631C4.78647 16.4631 8.66667 12.7777 8.66667 8.23157C8.66667 3.68539 4.78647 0 0 0V2C3.78022 2 6.66667 4.88577 6.66667 8.23157C6.66667 11.5773 3.78022 14.4631 0 14.4631V16.4631Z"
                                            transform="translate(17.3333 4.15689)" fill="white" />
                                        <path id="volume-off"
                                            d="M1.22565 0L0 1.16412L3.06413 4.0744L0 6.98471L1.22565 8.14883L4.28978 5.23853L7.35391 8.14883L8.57956 6.98471L5.51544 4.0744L8.57956 1.16412L7.35391 0L4.28978 2.91031L1.22565 0Z"
                                            transform="translate(17.3769 8.31403)" fill="white" />
                                    </svg>
        
                                </button>
                                <div class='volume-slider' style="display: none;">
                                    <div class='volume-filled'></div>
                                </div>
                            </div>
                        </div>
                        <button name="Playbtn" id="00020001" onkeypress="myPlay()" class='play-btn'></button>
                        <div class="controls-right">
        
                            <button id="00030001" class='fullscreen' onkeypress="toggleFullscreen()">
                                <svg width="30" height="22" viewBox="0 0 30 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M0 0V-1.5H-1.5V0H0ZM0 18H-1.5V19.5H0V18ZM26 18V19.5H27.5V18H26ZM26 0H27.5V-1.5H26V0ZM1.5 6.54545V0H-1.5V6.54545H1.5ZM0 1.5H10.1111V-1.5H0V1.5ZM-1.5 11.4545V18H1.5V11.4545H-1.5ZM0 19.5H10.1111V16.5H0V19.5ZM24.5 11.4545V18H27.5V11.4545H24.5ZM26 16.5H15.8889V19.5H26V16.5ZM27.5 6.54545V0H24.5V6.54545H27.5ZM26 -1.5H15.8889V1.5H26V-1.5Z"
                                        transform="translate(2 2)" fill="white" />
                                </svg>
        
                                </svg>
        
        
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        
        <script>
        	
            var players = document.querySelector('.players');

            function exitFullscreen() {
                if (document.exitFullscreen) {
                    document.getElementById("home_video_player").style.height = "500px";
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.getElementById("home_video_player").style.height = "500px";
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.getElementById("home_video_player").style.height = "500px";
                    document.webkitExitFullscreen();
                }
            }
        
            function launchIntoFullscreen(element) {
                if (element.requestFullscreen) {
                    document.getElementById("home_video_player").style.height = "95%";
                    element.requestFullscreen();
                } else if (element.mozRequestFullScreen) {
                    document.getElementById("home_video_player").style.height = "95%";
                    element.mozRequestFullScreen();
                } else if (element.webkitRequestFullscreen) {
                    document.getElementById("home_video_player").style.height = "95%";
                    element.webkitRequestFullscreen();
                } else if (element.msRequestFullscreen) {
                    document.getElementById("home_video_player").style.height = "95%";
                    element.msRequestFullscreen();
                }
                
            }
            var fullscreen = false;
            function toggleFullscreen() {
                fullscreen ? exitFullscreen() : launchIntoFullscreen(players)
                fullscreen = !fullscreen;
            }
        </script>
        
        <script>
            anotherVideo = document.querySelector('#home_video_player');
            var players = document.querySelector('.players');
        
            var lastVolume = 1;
        
            var tvKey = window.tvKey;
            tizen.tvinputdevice.registerKey('MediaPlay');
            tizen.tvinputdevice.registerKey('MediaPause');
            function myPlay() {
                if (anotherVideo.paused) {
                    anotherVideo.play();
                } else {
                    anotherVideo.pause();
                }
            }
        
            function myVol() {
                if (anotherVideo.volume) {
                    lastVolume = anotherVideo.volume;
                    anotherVideo.volume = 0;
                    volumeBtn.classList.add('muted');
                    volumeFill.style.width = 0;
                } else {
                    anotherVideo.volume = lastVolume;
                    volumeBtn.classList.remove('muted');
                    volumeFill.style.width = lastVolume * 100;
                }
            }
        
        
        
            document.addEventListener('keydown', function (e) {
        
                switch (e.keyCode) {
                    case tvKey.MediaPlayPause:
                        console.log("PLAYPAUSE")
                        break;
                    case tvKey.MediaPlay:
                        console.log("Play")
                        anotherVideo.play();
                        break;
                    case tvKey.MediaPause:
                        console.log("Pause")
                        anotherVideo.pause();
                        break;
        
        
                }
            })
        
        
        </script>
        
        <script>
            function toAccount() {
                $("<div>").load("components/screens/profile.html", function () {
                    firstElement = document.getElementById("00000005")
                    firstElement.focus()
                    $("#screen").empty();
                    $("#screen").append($(this).html());
                    closeNav();
                });
            }
        </script>
            `;
            $("#watchSection").html(dataHtml);

        },
        datacontainer: function (page, per_page) {

            var myLanguage = sessionStorage.getItem("locale");
            if (!myLanguage) {
                myLanguage = 'en';
            }
            if (!myLanguage) {
                myLanguage = 'en';
            }
            let container = $('#pagination');
            container.pagination({
                dataSource: 'https://smashi.tv/api/video',
                locator: 'data',
                totalNumber: 12,
                // headers: {
                //     'Access-Control-Allow-Origin': 'X-localisation',
                //                         // 'Accept-Language': 'en'
                // },
                ajax: {
                    beforeSend: function (xhr) {


                        xhr.setRequestHeader("Accept", "application/json");
                        xhr.setRequestHeader("X-localization", myLanguage);
                    },
                },
                data: {
                    page: page,
                    per_page: per_page,

                },
                cors: true,
                showPageNumbers: true,
                callback: function (data) {
                    var dataHtml = ``;
                    // var row_vendor = []; // empty array
                    dataHtml += ``;
                    $.each(data, function (index, item) {



                        id = shared.zeroPad(index + 1, 4);
                        dataHtml += `
                    <script type="text/javascript">
                    function myLatestVideo(row_vendor){
                        document.body.scrollTop = 0; // For Safari
                        document.documentElement.scrollTop = 0;

                        if(document.getElementById("topSection") !== null){
                            document.getElementById("topSection").remove();
                            document.getElementById("tvShowsMainSection").remove();
                        }
                        
                        document.getElementById("watchSection").style.display = "";
                        
                        newBackgroundColor (document.getElementById("screen"),"#78a3ff73", "#f97c3e00");

                        var found = getLatestVideoTitle(row_vendor);
                        if(document.getElementById("livePlayer") != null){
                            document.getElementById("livePlayer").remove();
                        }
                    }

                    function newBackgroundColor (element,color_1,color2) {
                        element.style.backgroundImage = "linear-gradient(to bottom, "+ color_1 +", "+ color2 +")";
                     }

                    function getLatestVideoTitle(id){
                                    var myLanguage = sessionStorage.getItem("locale");
            if(!myLanguage){
                myLanguage = 'en';
            }
                        fetch('https://smashi.tv/api/video', {
                            headers: {
                                'Accept': 'application/json',
                                'X-localization': myLanguage
                            }
                        })
                            .then((response) => {
                                return response.json();
                            })
                            .then((myJson) => {
                                var video = document.querySelector('#home_video_player');

                                for (var i = 0; i < myJson.data.length; i++){
                                    if (myJson.data[i].id == id){
                                        console.log(myJson.data[i].video_link);
                                        console.log(myJson.data[i].title);

      


                                        const element = document.getElementById("myListNew").children[0];

                                        // Create a new text node:
                                        const newNode = document.createTextNode(myJson.data[i].title);
                                        // Replace the text node:
                                        element.replaceChild(newNode, element.childNodes[0]);
                                        document.getElementById("myListNew").style.display = "";
                                        if (Hls.isSupported()) {



                                            var hls = new Hls();
                                            hls.loadSource(myJson.data[i].video_link);
                                            hls.attachMedia(video);
                                            hls.on(Hls.Events.MANIFEST_PARSED,function() {
                                                config.log(hls.startLevel)
                                              video.play();
                                            });
                                          }
                                        //   plyr.setup(video);
                                        
                                        

                                    }
                                }
                                var myData = myJson.data;
                            });
                    }
                     
                    
                    </script>
                    <div id="`+ item.id + `" onkeypress="myLatestVideo(this.id);" class="item">
                        <div style="position: static; padding: 8px;" class="card">
	                        <img class="focusable img-fluid card" alt="100%x280" src="${item.poster_url}" id="${id}0002" tabindex="1">
	                        <h4 style="padding-top: 1rem;">${item.title}</h4>
	                        <p style="font-size: 20px; margin-top:1rem;">${item.created_at}</p>                        
                        </div>
                    </div>
                    `;
                    });
                    $("#datacontainer").html(dataHtml);
                }
            });
        },
        trending: function (page, per_page) {
            var myLanguage = sessionStorage.getItem("locale");
            if (!myLanguage) {
                myLanguage = 'en';
            }

            let container = $('#pagination');

            container.pagination({
                dataSource: 'https://smashi.tv/api/video/trending',
                locator: 'data',
                totalNumber: 12,
                ajax: {
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Accept", "application/json");
                        xhr.setRequestHeader("X-localization", myLanguage);
                    },
                },
                data: {
                    page: page,
                    per_page: per_page
                },
                cors: true,
                showPageNumbers: true,
                callback: function (data, pagination) {
                    var dataHtml = "";
                    dataHtml += ``;
                    $.each(data, function (index, item) {
                        id = shared.zeroPad(index + 1, 4);
                        dataHtml += `
                    <script type="text/javascript">
                    function myTrendingVideo(row_vendor){
                        document.body.scrollTop = 0; // For Safari
                        document.documentElement.scrollTop = 0;

                        if(document.getElementById("topSection") == null){
                            //
                        }else{
                            document.getElementById("topSection").remove();
                            document.getElementById("tvShowsMainSection").remove();
                            
                        }
                        document.getElementById("watchSection").style.display = "";
                        // document.getElementById("topSection").style.display = "none";
                        newBackgroundColor (document.getElementById("screen"),"#78a3ff73", "#f97c3e00");

                        var found = getTrendingVideoTitle(row_vendor);
                        if(document.getElementById("livePlayer") != null){
                            document.getElementById("livePlayer").remove();
                        }

                    }

                    function newBackgroundColor (element,color_1,color2) {
                        element.style.backgroundImage = "linear-gradient(to bottom, "+ color_1 +", "+ color2 +")";
                     }

                     function getTrendingVideoTitle(id){
                                    var myLanguage = sessionStorage.getItem("locale");
            if(!myLanguage){
                myLanguage = 'en';
            }
                        fetch('https://smashi.tv/api/video/trending', {
                            headers: {
                                'Accept': 'application/json',
                                'X-localization': myLanguage
                            }
                        })
                            .then((response) => {
                                return response.json();
                            })
                            .then((myJson) => {
                                var video = document.querySelector('#home_video_player');

                                for (var i = 0; i < myJson.data.length; i++){
                                    if (myJson.data[i].id == id){
                                        console.log(myJson.data[i].video_link);
                                        console.log(myJson.data[i].title);




                                        const element = document.getElementById("myListNew").children[0];

                                        // Create a new text node:
                                        const newNode = document.createTextNode(myJson.data[i].title);
                                        // Replace the text node:
                                        element.replaceChild(newNode, element.childNodes[0]);
                                        document.getElementById("myListNew").style.display = "";
                                            if (Hls.isSupported()) {
                                            var hls = new Hls();
                                            hls.loadSource(myJson.data[i].video_link);
                                            hls.attachMedia(video);
                                            hls.on(Hls.Events.MANIFEST_PARSED,function() {
                                              video.play();
                                            });
                                          }
                                        //   plyr.setup(video);

                                    }
                                }
                                var myData = myJson.data;
                            });
                    }
                    </script>
                    <div id="`+ item.id + `" onkeypress="myTrendingVideo(this.id);" style="cursor: pointer !important;" class="item">
                        <div style="position: static; padding: 8px;" class="card" >
                            <img  class="focusable img-fluid card" alt="100%x280" src="${item.poster_url}" id="${id}0003" tabindex="1">
                            <h4 class="card-title" style="padding-top: 1rem;">${item.title}</h4> 
                            <p style="font-size: 20px; margin-top:1rem;">${item.created_at}</p>
                            
                        </div>
                    </div>
                    `;
                    });
                    $("#trending").html(dataHtml);
                }
            });

        },
    }
});