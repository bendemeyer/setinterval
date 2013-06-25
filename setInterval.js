window.setInterval = function (func, time) {
	var intervalId = window.setInterval.count ? ++window.setInterval.count : window.setInterval.count = 1;
	var args = arguments;
	window.setInterval[intervalId] = function () {
		if (window.setInterval[intervalId].active) {
			if (typeof func == "string") {
				eval(func);
			}
			else if (args.length > 2) {
				func.apply(this, Array.prototype.slice.call(args, 2));
			}
			else {
				func();
			}
			setTimeout(window.setInterval[intervalId], time);
		}
	}
	window.setInterval[intervalId].active = true;
	setTimeout(window.setInterval[intervalId], time);;
	return {intervalId: intervalId};
}
window.clearInterval = function (obj) {
	window.setInterval[obj.intervalId].active = false;
}