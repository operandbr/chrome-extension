(function(window, document) {

    var linkUrl = 'https://app2.agenciasys.com/';

    window.onload = function() {

        var body = document.getElementById("body-content");
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                try {
                    createList(JSON.parse(xhttp.responseText));
                    chrome.browserAction.setBadgeBackgroundColor({color: "#FF0000"});
                } catch (err) {
                    body.innerHTML = loginTab();
                    chrome.browserAction.setBadgeText({
                        text: '!'
                    });
                    chrome.browserAction.setBadgeBackgroundColor({color: "#FF9800"});
                }
            }
        };
        xhttp.open("GET", linkUrl + "componentes/header/getTasks", true);
        xhttp.send();
    };

    var createList = function(json) {

        chrome.browserAction.setBadgeText({
            text: json.length.toString()
        });

        var list = document.getElementById("list");
        for (var i = 0; i < json.length; i++) {
            var item = document.createElement('div');
            var attr = document.createAttribute('data-url');
            var url = linkUrl + "job/" + json[i].Tasks.iDoc;
            attr.value = url;
            item.className = 'item';
            item.setAttributeNode(attr);

            item.innerHTML = '	<label class="title">' + json[i].Tasks.sTask + '</label><br />' +
                '	<label class="description">JOB:' + json[i].ViewCmpRelatedDocuments.iCampaign + '.' + json[i].ViewCmpRelatedDocuments.iItem + ' ' + json[i].ViewCmpRelatedDocuments.sDocument + '</label>';
            list.appendChild(item);
            item.onclick = function() {
                window.open(this.getAttributeNode('data-url').value);
            };
        }
    };

    var loginTab = function() {
        var html = '<header class="login-header">' +
            '	<div class="login-title">' +
            '		<span><b>Agência Sys <span class="version">2</span></b></span>' +
            '	</div>' +
            '</header>' +
            '<div class="login-description">' +
            '	<span>Você não está logado.</span><br /><br />' +
            '	<span><a href="' + linkUrl + '" target="blanq">Clique aqui</a> para logar e tente novamente.</span>' +
            '</div>';
        return html;
    };

})(window, document);