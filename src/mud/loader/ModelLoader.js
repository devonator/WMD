// node includes
var fs = require("fs");

// local includes
require("../../lib/Object");
var _ = require("../../../i18n");
var Logger = require("../../util/Logger");
var ModelManager = require("../manager/ModelManager");
var Model = require("../Model");

// deep file search
function deepSearch(directory, fileFun, callback){
	fs.readdir(directory, function(err, files){
		var waiting = files.length;
		function next() { waiting--; if(waiting === 0) callback(); }
		for(var file of files){
			var _file = directory+"/"+file;
			var stats = fs.lstatSync(_file);
			if(stats.isDirectory()) deepSearch(_file, fileFun, next);
			else fileFun(_file, next);
		}
	});
}

module.exports = function(callback){
	Logger.info(_("> Loading models..."));
	deepSearch("./data/model", function(file, next){
		var f = file.slice("./data/model".length); // cut off relative path from root
		var json = require("../../../data/model/"+f);
		Logger.info(_(">> Loading model for <%s>", json.name));
		var model = new Model();
		model.__fromJSON(json);
		ModelManager.add(model);
		next();
	}, callback);
};
