//loading the sidebar
$("<div>").load("components/shared/sideBar.html", function(){
    $("#sideBar").append($(this).html());
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

    // setTimeout(function(){
    //     language.init()
    // }, 50);
    // global.authMiddleware()
});