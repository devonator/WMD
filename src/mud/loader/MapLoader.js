// node includes
var fs = require("fs");

// local includes
var _ = require("../../../i18n");
var Logger = require("../../util/Logger");
var ObjectFactory = require("../factory/MapObjectFactory");
var MapManager = require("../manager/MapManager");
var Map = require("../map/Map");

// map loader
module.exports = function(callback){
	Logger.info(_("> Loading map..."));
	fs.access("./data/map/map.json", function(err){
		if(err) throw err;
		var json = require("../../../data/map/map.json");
		MapManager.map = new Map(json.proportions);
		MapManager.map.generate();
		for(var z=0;z<json.proportions.levels;z++){
			for(var y=0;y<json.proportions.height;y++){
				for(var x=0;x<json.proportions.width;x++){
					var char = json.map.tiles[z][y][x];
					var tileJSON = json.materials[char];
					var tile = ObjectFactory.loadFromJSON(tileJSON.tile);
					MapManager.map.setTile(tile, x, y, z);
				}
			}
		}	
	});

	callback();
};
