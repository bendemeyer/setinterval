//override the default window.setInterval() function
window.setInterval = function (func, time) {
	//window.setInterval.count is used to assign a unique intervalId to each interval created
	//these IDs are used by the custom clearInterval() function
	var intervalId = window.setInterval.count ? ++window.setInterval.count : window.setInterval.count = 1;
	//store the arguments as a local variable so they can be used inside other functions
	var args = arguments;
	//create a property on the window.setInterval object for the current intervalId
	//this property will be a function that is called recursively with setTimeout()
	window.setInterval[intervalId] = function () {
		//check if the current interval is still active
		//this will be true unless clearInterval() has been called on this interval
		if (window.setInterval[intervalId].active) {
			//handle all three possible cases of arguments passed to setInterval
			//if a string is passed instead of a function, use eval() to run the string
			if (typeof func == "string") {
				eval(func);
			}
			//if arguments for the function are passed in addition to the function and time delay
			//call the function with the specified arguments
			else if (args.length > 2) {
				//the apply() method allows passing an array as different arguments to a function
				//create an array out of the original arguments after the time delay argument, and pass that array to apply()
				func.apply(this, Array.prototype.slice.call(args, 2));
			}
			//if neither special case applies, call the function directly
			else {
				func();
			}
			//call this function again after the specified time delay has passed
			setTimeout(window.setInterval[intervalId], time);
		}
	}
	//set the current interval to active
	window.setInterval[intervalId].active = true;
	//call the current interval after the specified time delay
	setTimeout(window.setInterval[intervalId], time);
	//return an object with the current intervalId, use it to clear this interval using clearInterval()
	return {intervalId: intervalId};
}
//override the default clearInterval() function so it works with the custom setInterval()
window.clearInterval = function (obj) {
	//set the active status of the interval associated with the passed object to false
	window.setInterval[obj.intervalId].active = false;
}