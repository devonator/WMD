// node includes
var util = require("util");

// local includes
require("../../lib/Math");
var _ = require("../../../i18n");
var Command = require("../Command");
var CommandSpecificity = require("../CommandSpecificity");
var WearSlot = require("../WearSlot");

class Remove extends Command{
	exec(mob, keywords){
		var worn = [];
		for(var slot in mob.worn) if(mob.worn[slot]) worn.push(mob.worn[slot]);
		var obj = worn.search(keywords);
		if(!obj){
			mob.sendLine(_("You aren't wearing anything like that."));
			return;
		}

		var result = mob.unequip(obj);
		if(!result) mob.sendLine(_("You can't take that off."));
		else {
			switch(result){
				case WearSlot.slot.HAND_PRIMARY:
				case WearSlot.slot.HAND_OFF:
					var slot = WearSlot.display[result];
					mob.sendLine(_("You take %s out of your %s and remove it.", obj.display, slot));
					break;

				default:
					var slot = WearSlot.display[result];
					mob.sendLine(_("You take %s off of your %s and remove it.", obj.display, slot));
					break;
			}
		}
	}
}

Remove.prototype.rule = /^(?:r|re|rem|remo|remov|remove|u|un|une|uneq|unequ|unequi|unequip) (.+)\b/;
Remove.prototype.plain = "remove|unequip";
Remove.prototype.specificity = CommandSpecificity.FIRST;

module.exports = Remove;
