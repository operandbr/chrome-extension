(function(window, document) {

	var clearStorage = document.getElementById('clearStorage');
	clearStorage.addEventListener("click", function() {
		chrome.storage.local.clear();
	});

	var notification = document.getElementById('notification');
	notification.addEventListener("change", function() {
		chrome.storage.local.set({'option': {'notification': notification.checked}});
	});

})(window, document);