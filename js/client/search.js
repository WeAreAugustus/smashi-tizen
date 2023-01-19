define(['client/shared','js/cdn/paginationmin.js'], function(shared){
    return {
        getSearchResults: function () {
                        var myLanguage = sessionStorage.getItem("locale");
            if(!myLanguage){
                myLanguage = 'en';
            }
            // var searchKeyword = document.getElementById("searchKeyword").value;
            var searchKeyword = document.getElementsByClassName("form-control")[0].value;
            var dataHtml = ``;
            dataHtml += `<h1 lang-value="searchresultsfor">"${searchKeyword}"</h1>`;
            let container = $('#pagination');
            container.pagination({
                dataSource: 'https://smashi.tv/api/video/search?q='+searchKeyword,
                locator: 'data',
                totalNumber: 12,
                ajax: {
                    beforeSend: function (xhr) {
                        // xhr.setRequestHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT"); 
                        // xhr.setRequestHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"); 
                        // xhr.setRequestHeader("Access-Control-Allow-Origin", "localhost:5500");
                        xhr.setRequestHeader("Accept", "application/json");
                        xhr.setRequestHeader("X-localization",myLanguage);
                        // xhr.overrideMimeType("X-localisation","en");
                    },
                },
                cors: true,
                showPageNumbers: true,
                
                callback: function (data, pagination) {
                    console.log(data);

                    // var row_vendor = []; // empty array
                    $.each(data, function (index, item) {
                        id = shared.zeroPad(index + 1, 4);
                        dataHtml += `
                    <script type="text/javascript">
                    
                    document.getElementsByName("video")[0].src = "${item.video_link}";
                    document.getElementsByName("searchVideoTitle")[0].innerHTML = "${item.title}";

                        function omak(vendor, cute){


                            var video = document.querySelector('#videoID');
                            if (Hls.isSupported()) {
                                var hls = new Hls();
                                hls.loadSource(vendor);
                                hls.attachMedia(video);
                                hls.on(Hls.Events.MANIFEST_PARSED,function() {
                                video.play();
                                });
                            }


                            document.getElementById("searchVideoWatch").style.display = "";
                            document.getElementById("searchVideoTitle").style.display = "";
                            




                            document.getElementsByName("searchVideoTitle")[0].innerHTML = cute;
                            

                        }
                    </script>
                    <div  id="`+ item.video_link + `" onkeypress="omak(this.id, this.textContent);" style="cursor: pointer !important;" class="item">
                        <div class="card" id="${id}0005" tabindex="1">
                            <img style="width: 100%;height: 214px;object-fit: contain;" class="img-fluid" alt="100%x280" src="${item.poster_url}">
                            <div>
                                <h4>${item.title}</h4> 
                            </div> 
                        </div>
                    </div>
                    `;
                    });
                    $("#getSearchResults").html(dataHtml);
                }
            });
        },
        searchVideoWatch: function(){
            var dataHtml = "";
            dataHtml += `    
            <style>

            .subButtonMain:focus{
              background-color: #ffffffd4 !important;
            }

            :root {
              --accent: #00C6F2;
            /* 	--accent: #d7577e; */
              
              --main: #ffffff;
            }
            body {
              width: 100%;
              height: 100%;
              background: #ff578e;
            }
            html {
              display: flex;
              justify-content: center;
              font-family: Comfortaa;
              font-style: normal;
              font-weight: normal;
              line-height: normal;
              font-size: 16px;
              color: var(--main);
            }
            .player-container {
              padding: 40px;
              max-width: -webkit-fill-available;
              margin: auto;
            }
            .player {
              width: 100%;
              height: 0;
              padding-bottom: 56.25%;
              box-shadow: 0px 10px 0px -3px rgba(0, 0, 0, 0.2);
              position: relative;
              overflow: hidden;
              background: #000000;
            }
            .player:fullscreen {
              padding-bottom: 100vh;
            }
            .player:-webkit-full-screen {
              padding-bottom: 100vh;
            }
            .player:-moz-full-screen {
              padding-bottom: 100vh;
            }
            .player:-ms-fullscreen  {
              padding-bottom: 100vh;
            }
            .player video {
              width: 100%;
              height: auto;
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
            }
            .controls {
              padding: 0;
              position: absolute;
              bottom: -80px;
              width: 100%;
              height: 48px;
              box-sizing: border-box;
              background: linear-gradient(
                180deg,
                rgba(37, 37, 37, 0) 10%,
                rgba(37, 37, 37, 0.6) 80%
              );
              transition: all 0.2s ease-in 5s;
            }
            .player:hover .controls {
              bottom: 0;
              transition: all 0.2s ease-out;
            }
            .time {
              position: absolute;
              right: 30px;
              bottom: 100%;
              padding-bottom: 14px;
            }
            .controls-main {
              width: calc(100% - 40px);
              margin: auto;
              height: 100%;
              display: flex;
              justify-content: space-between;
            }
            .controls-left,
            .controls-right {
              flex: 1;
              display: flex;
              align-items: center;
              overflow: hidden;
            }
            .controls-left {
              margin-left: 10px;
            }
            .controls-right {
              margin-right: 10px;
              justify-content: flex-end;
            }
            .volume {
              display: flex;
              align-items: center;
            }
            .volume-btn {
              margin-right: 10px;
            }
            .volume-btn #volume-off, .volume-btn #volume-high {
              opacity: 0;
            }
            .volume-btn.loud #volume-high{
              opacity: 1;
            }
            .volume-btn.muted #volume-off {
              opacity: 1;
            }
            .volume-btn.muted #volume-high, .volume-btn.muted #volume-low {
              opacity: 0;
            }
            .volume-slider {
              height: 8px;
              width: 80px;
              background: rgba(60, 60, 60, 0.6);;
              border-radius: 6px;
              position: relative;
            }
            .volume-filled {
              background: var(--main);
              width: 100%;
              height: 100%;
              border-radius: 6px;
              transition: width 0.2s ease-in-out;
            }
            .volume-filled:hover, .play-btn:hover.play-btn:before, .play-btn:hover.play-btn:after{
              background: var(--accent);
            }
            button {

              border: none;
              background-color: transparent;

            }
            .play-btn {
              width: 30px;
              height: 30px;
              position: relative;
              margin: auto;
              transform: rotate(-90deg) scale(0.8);
              transition: -webkit-clip-path 0.3s ease-in 0.1s, shape-inside 0.3s ease-in 0.1s,
                transform 0.8s cubic-bezier(0.85, -0.25, 0.25, 1.425);
            }
            .play-btn.paused {
              transform: rotate(0deg);
            }
            .play-btn:before,
            .play-btn:after {
              content: "";
              position: absolute;
              background: white;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              transition: inherit;
            }
            .play-btn:before {
              -webkit-clip-path: polygon(0 10%, 100% 10%, 100% 40%, 0 40%);
              shape-inside: polygon(0 10%, 100% 10%, 100% 40%, 0 40%);
            }
            .play-btn:after {
              -webkit-clip-path: polygon(0 60%, 100% 60%, 100% 90%, 0 90%);
              shape-inside: polygon(0 60%, 100% 60%, 100% 90%, 0 90%);
            }
            .play-btn.paused:before {
              -webkit-clip-path: polygon(10% 0, 90% 51%, 90% 51%, 10% 51%);
              shape-inside: polygon(0 0, 100% 51%, 100% 51%, 0 51%);
            }
            .play-btn.paused:after {
              -webkit-clip-path: polygon(10% 49.5%, 80% 49.5%, 90% 49.5%, 10% 100%);
              shape-inside: polygon(10% 49.5%, 80% 49.5%, 90% 49.5%, 10% 100%);
            }
            button:focus {
              outline: none;
              outline-style: none;
            }
            .speed-list {
              list-style: none;
              margin: 0;
              padding: 0;
              display: flex;
              margin-right: 20px;
              text-align: center;
            }
            .speed-list li {
              color: var(--main);
              padding: 5px;
              cursor: default;
            }
            .speed-list li:hover,
            .speed-list li.active {
              color: var(--accent);
              font-weight: bold;
            }
            .fullscreen {
              display: flex;
              justify-content: center;
            }

            button:focus {
              background-color: #eb7f4e;
              border: 4px solid #eb7f4e;
              outline-style: none;
          }

          .dot{
            height: 25px;
            width: 25px;
            background-color: #ff0000;
            border-radius: 50%;
            display: inline-block;
            margin-right: 10px;
            
          }
            
            

            </style>     
            <div class="row">
            <div class="col-4"></div>
                <div class="col-4">
                    
                    <div id="liveVideoPlayer" style="color:white !important;" class='player'>
                    
                    <video id='videoID' name="video" autoplay playsinline></video>

        <div class='play-btn-big'></div>
        <div id="controlsView" style="  position: absolute;" class='controls'>

            <div class='controls-main'>
                <div class='controls-left'>
                    <div class='volume'>
                        <button id="00010006" class='volume-btn loud'>
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
                <button id="00020006" class='play-btn'></button>
                <div class="controls-right">
                    <div class='speed'>
                        <ul class='speed-list'>
                            <li class='speed-item' data-speed='0.5'>0.5x</li>
                            <li class='speed-item' data-speed='0.75'>0.75x</li>
                            <li class='speed-item' data-speed='1' class='active'>1x</li>
                            <li class='speed-item' data-speed='1.5'>1.5x</li>
                            <li class='speed-item' data-speed='2'>2x</li>
                        </ul>
                    </div>
                    <button id="00030006" class='fullscreen'>
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
</div>
                </div>
                <div class="col">
                    <p style="text-align: center;"></p>
                    <a>
                        <i class="bi-bookmark"></i>
                    </a>
                </div>
                <div class="col-4"></div>
            </div>
            
            <script>
            var tvKey = window.tvKey;
            tizen.tvinputdevice.registerKey('MediaPlay');
            tizen.tvinputdevice.registerKey('MediaPause');
            var video = document.querySelector('#video');
            
            document.addEventListener('keydown', function(e) {
                                
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
            var video = document.querySelector('#videoID');
            var playBtn = document.querySelector('.play-btn');
            var volumeBtn = document.querySelector('.volume-btn');
            var volumeSlider = document.querySelector('.volume-slider');
            var volumeFill = document.querySelector('.volume-filled');
            var progressSlider = document.querySelector('.progress');
            var progressFill = document.querySelector('.progress-filled');
            var textCurrent = document.querySelector('.time-current');
            var textTotal = document.querySelector('.time-total');
            var speedBtns = document.querySelectorAll('.speed-item');
            var fullscreenBtn =document.querySelector('.fullscreen'); 
            
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
                if(video.volume) {
                    lastVolume = video.volume;
                    video.volume = 0;
                    volumeBtn.classList.add('muted');
                    volumeFill.style.width = 0;
                } else {
                    video.volume = lastVolume;
                    volumeBtn.classList.remove('muted');
                    volumeFill.style.width = lastVolume*100;
                }
            }
            
            
            function launchIntoFullscreen(element) {
              if(element.requestFullscreen) {
                element.requestFullscreen();
              } else if(element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
              } else if(element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
              } else if(element.msRequestFullscreen) {
                element.msRequestFullscreen();
              }
            }
            function exitFullscreen() {
              if(document.exitFullscreen) {
                document.exitFullscreen();
              } else if(document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
              } else if(document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
              }
            }
            var fullscreen = false;
            function toggleFullscreen() {
                fullscreen? exitFullscreen() : launchIntoFullscreen(player)
                fullscreen = !fullscreen;
            }
            function setSpeed(e) {
                console.log(parseFloat(this.dataset.speed));
                video.playbackRate = this.dataset.speed;
                speedBtns.forEach(speedBtn =>	speedBtn.classList.remove('active'));
                this.classList.add('active');
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
            `;
            $("#searchVideoWatch").html(dataHtml);
        }
    }

});


// function fullScreen(){

//     $box4 = $('box_2');

//   $('.box').click(function() {
//   $(this).addClass('box_full');
//       //$(this).addClass('fade_me');

//   $(this).siblings().addClass("fade_me");
//   setTimeout(function() {
//   $(".is_hidden").addClass("is_visible").removeClass("is_hidden");
//   }, 500);
//   });
  
//   $('button[name="exitFullScreen"]').click(function() {
//   event.stopPropagation();
//   $(".is_visible").addClass("is_hidden").removeClass("is_visible");
//   $(this).closest('.box').removeClass('box_full');
//   $(".box").not(this).removeClass("fade_me");
//   element = document.getElementsByName("full_screen")[0];
//   element.focus();
//   });

//   $(document).ready(function() {
//       $('#fullpage').fullpage();
//   });
  
// }