"use strict";

var options = {
	"keepCommand": true
}

var socket;
$(document).ready(function(){
	addMessage("Connecting to "+mud_meta.name+" v"+mud_meta.version+"...", "debug");
	socket = io.connect({
		reconnectionAttempts:5
	});
	configureSocket(socket);

	// focus the input immediately
	$("#command").focus();

	// start listening for enter keys
	$("#command").keydown(function(event) {
		if (event.keyCode === 13) {
			var line = $("#command").val();

			// keepCommand
			if(options.keepCommand){
				$("#command")[0].select();
			} else {
				$("#command").val(null);
			}

			addMessage(line, "echo");
			command(line);
		}
	});
});
