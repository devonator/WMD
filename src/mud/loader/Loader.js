// local includes
require("../../lib/Object");
require("../../lib/Array");
var _ = require("../../../i18n");
var Logger = require("../../util/Logger");
var RaceLoader = require("../loader/RaceLoader");
var ClassLoader = require("../loader/ClassLoader");
var ChannelLoader = require("../loader/ChannelLoader");
var CharacterLoader = require("../loader/CharacterLoader");
var CommandLoader = require("../loader/CommandLoader");
var TemplateLoader = require("../loader/TemplateLoader");
var ModelLoader = require("../loader/ModelLoader");
var MapLoader = require("../loader/MapLoader");

// full database loader
module.exports = function(callback){

	// specify loaders in the order they should be run
	var loaders = [RaceLoader, ClassLoader, TemplateLoader, ModelLoader, ChannelLoader, CommandLoader, MapLoader, CharacterLoader];

	// create a "loader iterator" that propagates callbacks
	var i = 0;
	function loadNext(){
		if(!loaders.length){
			callback();
			return;
		}

		var next = loaders.shift();
		next(loadNext); // call each loader with the master loader
	}

	// start iterator
	loadNext();
};
