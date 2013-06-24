setinterval
===========

An override to JavaScript's default setInterval() function that behaves better when in a background tab/window.

I've noticed that in some browsers, when a window running a repetetive event implemented with setInterval() is switched to the background and then brought back to the foreground, the browser will freeze as it rushes to run all of the setInterval() events that should have been run while the window was in the background. For whatever reason, this issue does not seem to occur when setTimeout() is used instead and called recursively.

To fix this, I've writting this override function which replaces setInterval and clearInterval with custom functions that use recursive calls to setTimeout to create repetetive actions.
