define(function () {

    var myLanguage = sessionStorage.getItem("locale");
    if (!myLanguage) {
        myLanguage = 'en';
    }



    function getUserLanguage() {


        var lang = myLanguage;


        if (lang.includes('en')) {
            // document.getElementById("masr").style.marginLeft = "10%";
            return 'en';
        }
        document.getElementById("mainBody").style.direction = "rtl";
        document.getElementById("benefitsBanner").src = "img/subsubar.png";

        console.log(lang);
        return 'ar';


    }







    function getElementLanguage(element) {
        return element.getAttribute("lang-value");

    }

    function trans(element) {
        const key = element.getAttribute("lang-value");
        element.innerText = __LANG[getUserLanguage()][getElementLanguage(element)];

    }







    return {
        init: function () {
            // window.addEventListener("DOMContentLoaded", () => {
            document
                // Find all elements that have the key attribute
                .querySelectorAll("[lang-value]")
                .forEach((el) => trans(el));
            // });
        }
    }

})




























