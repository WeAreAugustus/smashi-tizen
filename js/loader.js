//loading the sidebar
$("<div>").load("components/shared/newSideBar.html", function(){
    $("#newSideBar").append($(this).html());
});

$("<div>").load("components/screens/home.html", function(){
    $("#screen").append($(this).html());
});
// loading the notificaiton
$("<div>").load("components/shared/notification.html", function(){
    $("#notification").append($(this).html());
});
//loading the router, translator , middleware
require(["router"], function(router){
    router.navigator()
});
require(["js/shared/language.js"], function (lang) {
	setTimeout(function(){
        lang.init();
    }, 50);
});