define(function () {

    var myLanguage = sessionStorage.getItem("locale");
    if (!myLanguage) {
        myLanguage = 'en';
    }

    function getUserLanguage() {
        var lang = myLanguage;
        if (lang.includes('en')) {
            return 'en';
        }
        document.getElementById("mainBody").style.direction = "rtl";
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
            document
                .querySelectorAll("[lang-value]")
                .forEach((el) => trans(el));
            // });
        }
    }
})




























