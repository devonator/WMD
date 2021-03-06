// node includes
var util = require("util");

// local includes
var Movement = require("./Movement");
var Direction = require("../Direction");

class Northwest extends Movement{
}

Northwest.prototype.rule = /^(?:northw|northwe|northwes|northwest|nw)\b/;
Northwest.prototype.plain = "northwest|nw";
Northwest.prototype.direction = Direction.flag.NORTHWEST;

module.exports = Northwest;
