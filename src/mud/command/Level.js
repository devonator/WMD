var util = require("util");

// local includes
var _ = require("../../../i18n");
var Command = require("../Command");
var CommandSpecificity = require("../CommandSpecificity");
var TemplateManager = require("../manager/TemplateManager");

class Level extends Command{
	exec(mob){
		mob.levelup();
	}
}

Level.prototype.rule = /^(?:l|le|lev|leve|level)\b/;
Level.prototype.plain = "level";
Level.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Level;
