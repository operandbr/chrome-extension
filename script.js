(function(window, document) {

    window.onload = function() {
        refresh();
    };

    setInterval(function() {
        refresh();
    }, 100000);

    var linkUrl = 'https://app2.agenciasys.com/';
    var refresh = function() {
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                updateCount(JSON.parse(xhttp.responseText));
            }
        };
        xhttp.open("GET", linkUrl + "componentes/header/getTasks", true);
        xhttp.send();
    };

    var updateCount = function(json) {
        chrome.browserAction.setBadgeText({
            text: json.length.toString()
        });
    };

    var notifyMe = function(sTitle, sBody, sTag) {
        if ("Notification" in window) {
            if (Notification.permission === "granted") {
                var notification =  new Notification(sTitle, {
                        icon: 'img/favicon-96.png',
                        body: sBody,
                        tag: sTag
                    });
                
            }
        }
    }

})(window, document);