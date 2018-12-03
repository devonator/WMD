// node includes
var util = require("util");

// local includes
require("../../lib/Math");
var _ = require("../../../i18n");
var Database = require("../core/Database");
var Command = require("../Command");
var CommandSpecificity = require("../CommandSpecificity");
var Item = require("../map/Item");

class Inventory extends Command{
	exec(mob){
		var msg = _("You are carrying:");
		if(mob.contents.length){
			for(var obj of mob.contents){
				msg += "\r\n" + _("    %s", obj.name);
			}
		} else {
			msg += "\r\n" + "    nothing";
		}

		mob.sendLine(msg);
	}
}

Inventory.prototype.rule = /^(?:i|in|inv|inve|inven|invent|invento|inventor|inventory)\b/;
Inventory.prototype.plain = "inventory";
Inventory.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Inventory;
