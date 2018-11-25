// local includes
var Classification = require("./Classification");

/**
 * Basic race classifier.
 * Tends to offer base stats and TNL.
 */
class Class extends Classification{
}

// base primary attributes
Class.prototype.strengthBase = 10;
Class.prototype.intelligenceBase = 10;
Class.prototype.agilityBase = 10;

// primary attributes per level
Class.prototype.strengthPerLevel = 2;
Class.prototype.intelligencePerLevel = 2;
Class.prototype.agilityPerLevel = 2;

module.exports = Class;