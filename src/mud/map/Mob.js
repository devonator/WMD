// node includes
var util = require("util");

// local includes
var _ = require("../../../i18n");
var Logger = require("../../util/Logger");
var ChannelManager = require("../manager/ChannelManager");
var Direction = require("../Direction");
var Movable = require("./Movable");
var Tile = require("../map/Tile");
var RaceManager = require("../manager/RaceManager");
var Race = require("../Race");
var ClassManager = require("../manager/ClassManager");
var Class = require("../Class");
var MessageCategory = require("../MessageCategory");
var Attributes = require("../Attributes");
var WearLocation = require("../WearLocation");

/**
 * Represents an animate creature on the map.
 * @extends Movable
 */
class Mob extends Movable{
	/**
	 * Construct a Mob.
	 * @param {MobConstructorOptions} options 
	 */
	constructor(options){
		super(options);
		this._channels = [];
		this.wearLocation = {
			HEAD: null,
			NECK: null,
			SHOULDER: null,
			ARMS: null,
			HANDS: null,
			FINGER_A: null,
			FINGER_B: null,
			TORSO: null,
			WAIST: null,
			LEGS: null,
			FEET: null,
			HAND_OFF: null,
			HAND_PRIMARY: null
		};
	}

	toString(){
		if(this.name) return this.name;
		return util.format("{Mob@%s}", Movable.toString.call(this));
	}

	get rawStrength(){
		var strength = 0;
		strength += this._race.getStrengthByLevel(this.level);
		strength += this._class.getStrengthByLevel(this.level);
		return Math.floor(strength);
	}

	get strength(){
		var strength = 0;
		strength += this._race.getStrengthByLevel(this.level);
		strength += this._class.getStrengthByLevel(this.level);
		return Math.floor(strength);
	}

	get rawAttackPower(){
		var attackPower = 0;
		attackPower += this._race.getAttackPowerByLevel(this.level);
		attackPower += this._class.getAttackPowerByLevel(this.level);
		return Math.floor(attackPower);
	}

	get attackPower(){
		var attackPower = this.strength;
		attackPower += this._race.getAttackPowerByLevel(this.level);
		attackPower += this._class.getAttackPowerByLevel(this.level);
		return Math.floor(attackPower);
	}

	get rawDefense(){
		var defense = 0;
		defense += this._race.getDefenseByLevel(this.level);
		defense += this._class.getDefenseByLevel(this.level);
		return Math.floor(defense);
	}

	get defense(){
		var defense = this.strength;
		defense += this._race.getDefenseByLevel(this.level);
		defense += this._class.getDefenseByLevel(this.level);
		return Math.floor(defense);
	}

	get rawVitality(){
		var vitality = 0;
		vitality += this._race.getVitalityByLevel(this.level);
		vitality += this._class.getVitalityByLevel(this.level);
		return Math.floor(vitality);
	}

	get vitality(){
		var vitality = this.strength;
		vitality += this._race.getVitalityByLevel(this.level);
		vitality += this._class.getVitalityByLevel(this.level);
		return Math.floor(vitality);
	}

	get rawMaxHealth(){
		var health = 0;
		health += this._race.getHealthByLevel(this.level);
		health += this._class.getHealthByLevel(this.level);
		return Math.floor(health);
	}

	get maxHealth(){
		var health = this.vitality;
		health += this._race.getHealthByLevel(this.level);
		health += this._class.getHealthByLevel(this.level);
		return Math.floor(health);
	}

	get rawAgility(){
		var agility = 0;
		agility += this._race.getAgilityByLevel(this.level);
		agility += this._class.getAgilityByLevel(this.level);
		return Math.floor(agility);
	}

	get agility(){
		var agility = 0;
		agility += this._race.getAgilityByLevel(this.level);
		agility += this._class.getAgilityByLevel(this.level);
		return Math.floor(agility);
	}

	get rawSpeed(){
		var speed = 0;
		speed += this._race.getSpeedByLevel(this.level);
		speed += this._class.getSpeedByLevel(this.level);
		return Math.floor(speed);
	}

	get speed(){
		var speed = this.agility;
		speed += this._race.getSpeedByLevel(this.level);
		speed += this._class.getSpeedByLevel(this.level);
		return Math.floor(speed);
	}

	get rawEvasion(){
		var evasion = 0;
		evasion += this._race.getEvasionByLevel(this.level);
		evasion += this._class.getEvasionByLevel(this.level);
		return Math.floor(evasion);
	}

	get evasion(){
		var evasion = this.agility;
		evasion += this._race.getEvasionByLevel(this.level);
		evasion += this._class.getEvasionByLevel(this.level);
		return Math.floor(evasion);
	}

	get rawStamina(){
		var stamina = 0;
		stamina += this._race.getStaminaByLevel(this.level);
		stamina += this._class.getStaminaByLevel(this.level);
		return Math.floor(stamina);
	}

	get stamina(){
		var stamina = this.agility;
		stamina += this._race.getStaminaByLevel(this.level);
		stamina += this._class.getStaminaByLevel(this.level);
		return Math.floor(stamina);
	}

	get rawMaxEnergy(){
		var energy = 0;
		energy += this._race.getEnergyByLevel(this.level);
		energy += this._class.getEnergyByLevel(this.level);
		return Math.floor(energy);
	}

	get maxEnergy(){
		var energy = this.stamina;
		energy += this._race.getEnergyByLevel(this.level);
		energy += this._class.getEnergyByLevel(this.level);
		return Math.floor(energy);
	}

	get rawIntelligence(){
		var intelligence = 0;
		intelligence += this._race.getIntelligenceByLevel(this.level);
		intelligence += this._class.getIntelligenceByLevel(this.level);
		return Math.floor(intelligence);
	}

	get intelligence(){
		var intelligence = 0;
		intelligence += this._race.getIntelligenceByLevel(this.level);
		intelligence += this._class.getIntelligenceByLevel(this.level);
		return Math.floor(intelligence);
	}

	get rawMagicPower(){
		var magicPower = 0;
		magicPower += this._race.getMagicPowerByLevel(this.level);
		magicPower += this._class.getMagicPowerByLevel(this.level);
		return Math.floor(magicPower);
	}

	get magicPower(){
		var magicPower = this.intelligence;
		magicPower += this._race.getMagicPowerByLevel(this.level);
		magicPower += this._class.getMagicPowerByLevel(this.level);
		return Math.floor(magicPower);
	}

	get rawResilience(){
		var resilience = 0;
		resilience += this._race.getResilienceByLevel(this.level);
		resilience += this._class.getResilienceByLevel(this.level);
		return Math.floor(resilience);
	}

	get resilience(){
		var resilience = this.intelligence;
		resilience += this._race.getResilienceByLevel(this.level);
		resilience += this._class.getResilienceByLevel(this.level);
		return Math.floor(resilience);
	}

	get rawWisdom(){
		var wisdom = 0;
		wisdom += this._race.getWisdomByLevel(this.level);
		wisdom += this._class.getWisdomByLevel(this.level);
		return Math.floor(wisdom);
	}

	get wisdom(){
		var wisdom = this.intelligence;
		wisdom += this._race.getWisdomByLevel(this.level);
		wisdom += this._class.getWisdomByLevel(this.level);
		return Math.floor(wisdom);
	}

	get rawMaxMana(){
		var mana = 0;
		mana += this._race.getManaByLevel(this.level);
		mana += this._class.getManaByLevel(this.level);
		return Math.floor(mana);
	}

	get maxMana(){
		var mana = this.wisdom;
		mana += this._race.getManaByLevel(this.level);
		mana += this._class.getManaByLevel(this.level);
		return Math.floor(mana);
	}

	get toNextLevel(){
		var tnl = 0;
		tnl += this._race.getToNextLevelByLevel(this.level);
		tnl += this._class.getToNextLevelByLevel(this.level);
		return Math.floor(tnl);
	}

	get tnl(){
		return this.toNextLevel;
	}

	get player(){
		return this._player;
	}

	set player(player){
		if(this._player === player) return;

		var oplayer;
		if(this._player) {
			this.logout();
			oplayer = this._player;
			this._player = null;
		}

		if(oplayer) {
			oplayer.mob = null;
		}

		if(player){
			this._player = player;
			player.mob = this;
			this.login();
		}
	}

	set race(race){
		this._race = race;
		this.health = this.maxHealth;
		this.energy = this.maxEnergy;
		this.mana = this.maxMana;
	}

	get race(){
		return this._race;
	}

	set class(cLass){
		this._class = cLass;
		this.health = this.maxHealth;
		this.energy = this.maxEnergy;
		this.mana = this.maxMana;
	}

	get class(){
		return this._class;
	}

	__JSONWrite(key, value, json){
		switch(key){
			case "loc":
				if(value instanceof Tile) json.loc = {x:value.x, y:value.y, z:value.z};
				break;

			case "race": json.race = value.name; break;
			case "class": json.class = value.name; break;
			case "wearLocation": break;
			default: super.__JSONWrite(key, value, json); break;
		}
	}

	__JSONRead(key, value){
		switch(key){
			case "loc":
				this._loc = value;
				break;

			case "race":
				var race = RaceManager.getRaceByName(value);
				if(!race) Logger.error(_("BAD RACE: '%s'", value));
				this._race = race;
				break;

			case "class":
				var cLass = ClassManager.getClassByName(value);
				if(!cLass) Logger.error(_("BAD CLASS: '%s'", value));
				this._class = cLass;
				break;

			case "wearLocation": break;
			default: super.__JSONRead(key, value); break;
		}
	}

	/**
	 * Runs after a Player is connected to this Mob.
	 */
	login(){
	}

	/**
	 * Runs before a Player is disconnected from this Mob.
	 */
	logout(){
	}

	/**
	 * Shortcut for `player.sendMessage(message, category)`.
	 * @param {string} message 
	 * @param {MessageCategory} category
	 */
	sendMessage(message, category){
		if(this.player) this.player.sendMessage(message, category);
	}

	/**
	 * Shortcut for `player.sendLine(line)`.
	 * @param {string} line 
	 */
	sendLine(line){
		this.sendMessage(line, MessageCategory.DEFAULT);
	}

	joinChannels(){
		for(var channel of ChannelManager.channels){
			this.joinChannel(channel);
		}
	}

	leaveChannels(){
		// this is annoying and gross
		var channel = this._channels[0];
		while(channel) {
			this.leaveChannel(channel);
			channel = this._channels[0];
		}
	}

	joinChannel(channel){
		if(this._channels.indexOf(channel) != -1) return; // already in channel
		this._channels.push(channel);
		channel.add(this);
	}

	leaveChannel(channel){
		var pos = this._channels.indexOf(channel);
		if(pos == -1) return // not in channel
		this._channels.splice(pos, 1);
		channel.remove(this);
	}

	showRoom(){
		if(!this.loc) {
			this.sendLine("You aren't anywhere!");
			return;
		}

		// default description
		var desc = util.format("{C%s\r\n    {c%s{x", this.loc.name, this.loc.description);

		// generate exits
		var exits = [];
		for(var name in Direction.flag){
			var step = this.getStep(Direction.flag[name]);
			if(step && this.canMove(step)) exits.push(Direction.long[name]);
		}

		desc += "\r\n\r\n" + _("{c[{CExits: {W%s{c]{x", exits.length ? exits.join(" ") : "none");

		// generate content descriptions
		for(var obj of this.loc.contents){
			desc += "\r\n" + util.format("    %s", obj.name);
		}

		this.sendLine(desc);
	}

	gainExperience(amount){
		this.experience += amount;
		if(this.experience >= this.toNextLevel) levelup();
	}

	levelup(quiet){
		var oRace, oClass, oRawAttributes;
		if(!quiet || !this.player){
			oRace = this._race;
			oClass = this._class;
			oRawAttributes = this.getRawAttributes();
		}

		this.experience = 0;

		// changes to race/class can happen here

		// create an anonymous status restoration function
		var restore = this.__restoreStatusF();

		// changes our level -- changes everything
		this.level++;

		// restore status based on previous %
		restore();

		// leveling up is done. don't bother creating a message.
		if(quiet || !this.player) return;

		// create levelup message
		var nRawAttributes = this.getRawAttributes();
		var nAttributes = this.getAttributes();
		var diffAttributes = {};
		for(var attribute in oRawAttributes){
			if(nRawAttributes[attribute] == oRawAttributes[attribute]) continue;
			diffAttributes[attribute] = nRawAttributes[attribute] - oRawAttributes[attribute];
		}

		var msg = _("You are now level {G%d{x!", this.level);
		for(var attribute in diffAttributes){
			var emphasis = diffAttributes[attribute] > 0 ? "G" : "R";
			var gain = diffAttributes[attribute] > 0;
			var word = gain ? "increased" : "decreased";
			msg += "\r\n" + _("Your {%s%s{x has {%s%s{x to {%s%d{x ({%s%s%d{x).",
								emphasis, Attributes.names[attribute],
								emphasis, word,
								emphasis, nAttributes[attribute],
								emphasis, gain ? "+" : "", diffAttributes[attribute]);
		}

		this.sendLine(msg);
	}

	wear(equipment){
		var slot = null;
		switch(equipment.wearLoc){
			case WearLocation.locations.FINGER:
				if(this.wearLocation.FINGER_A == null) {
					this.wearLocation.FINGER_A = equipment;
					slot = WearLocation.slots.FINGER_A;
				} else if(this.wearLocation.FINGER_B == null) {
					this.wearLocation.FINGER_B = equipment;
					slot = WearLocation.slots.FINGER_B;
				} else return false;
				break;

			case WearLocation.locations.HOLD:
				if(this.wearLocation.HAND_OFF == null) {
					this.wearLocation.HAND_OFF = equipment;
					slot = WearLocation.slots.HAND_OFF;
				} else return false;
				break;

			case WearLocation.locations.WEAPON:
				if(this.wearLocation.HAND_PRIMARY == null) {
					this.wearLocation.HAND_PRIMARY = equipment;
					slot = WearLocation.slots.HAND_PRIMARY;
				} else return false;
				break;

			default:
				if(!this.wearLocation.hasOwnProperty(equipment.wearLoc)) return false;
				if(this.wearLocation[equipment.wearLoc] != null) return false;
				this.wearLocation[equipment.wearLoc] = equipment;
				slot = equipment.wearLoc;
				break;
		}

		equipment.worn = true;
		return slot;
	}

	remove(equipment){
		var slot = null;
		switch(equipment.wearLoc){
			case WearLocation.locations.FINGER:
				if(this.wearLocation.FINGER_A == equipment) {
					this.wearLocation.FINGER_A = null;
					slot = WearLocation.slots.FINGER_A;
				} else if(this.wearLocation.FINGER_B == equipment) {
					this.wearLocation.FINGER_B = null;
					slot = WearLocation.slots.FINGER_B;
				} else return false;
				break;

			case WearLocation.locations.HOLD:
				if(this.wearLocation.HAND_OFF == equipment) {
					this.wearLocation.HAND_OFF = null;
					slot = WearLocation.slots.HAND_OFF;
				} else return false;
				break;

			case WearLocation.locations.WEAPON:
				if(this.wearLocation.HAND_PRIMARY == equipment) {
					this.wearLocation.HAND_PRIMARY = null;
					slot = WearLocation.slots.HAND_PRIMARY;
				} else return false;
				break;

			default:
				if(!this.wearLocation.hasOwnProperty(equipment.wearLoc)) return false;
				if(this.wearLocation[equipment.wearLoc] != equipment) return false;
				this.wearLocation[equipment.wearLoc] = null;
				slot = equipment.wearLoc;
				break;
		}

		equipment.worn = false;
		return slot;
	}

	__restoreStatusF(){
		// derive a percentage of our stats
		var healthP = this.health/this.maxHealth;
		var energyP = this.energy/this.maxEnergy;
		var manaP = this.mana/this.maxMana;

		// returns restoration function for later usage
		return function(){
			this.health = healthP * this.maxHealth;
			this.energy = energyP * this.maxEnergy;
			this.mana = manaP * this.maxMana;
		}.bind(this);
	}

	getAttributes(){
		return {
			STRENGTH: this.strength,
			ATTACK_POWER: this.attackPower,
			DEFENSE: this.defense,
			VITALITY: this.vitality,
			HEALTH: this.maxHealth,
			AGILITY: this.agility,
			SPEED: this.speed,
			EVASION: this.evasion,
			STAMINA: this.stamina,
			ENERGY: this.maxEnergy,
			INTELLIGENCE: this.intelligence,
			MAGIC_POWER: this.magicPower,
			RESILIENCE: this.resilience,
			WISDOM: this.wisdom,
			MANA: this.maxMana
		};
	}

	getRawAttributes(){
		return {
			STRENGTH: this.rawStrength,
			ATTACK_POWER: this.rawAttackPower,
			DEFENSE: this.rawDefense,
			VITALITY: this.rawVitality,
			HEALTH: this.rawMaxHealth,
			AGILITY: this.rawAgility,
			SPEED: this.rawSpeed,
			EVASION: this.rawEvasion,
			STAMINA: this.rawStamina,
			ENERGY: this.rawMaxEnergy,
			INTELLIGENCE: this.rawIntelligence,
			MAGIC_POWER: this.rawMagicPower,
			RESILIENCE: this.rawResilience,
			WISDOM: this.rawWisdom,
			MANA: this.rawMaxMana
		};
	}
}


/** @default "mob" */
Mob.prototype.keywords = "mob";

/** @default "Mob" */
Mob.prototype.display = "Mob";

/**
 * The player currently managing us.
 * @alias Mob#player
 * @type {?Player}
 */
Mob.prototype._player = null;

/** Channels this mob is participating in. */
Mob.prototype._channels = null;

/**
 * This mob's player data.
 */
Mob.prototype.characterData = null;

/**
 * This mob's race.
 * @type {?Race}
 */
Mob.prototype._race = new Race();

/**
 * This mob's class.
 * @type {?Class}
 */
Mob.prototype._class = new Class();

/**
 * This mob's experience level.
 * @type {!number}
 */
Mob.prototype.level = 1;

/**
 * This mob's experience points.
 * @type {!number}
 */
Mob.prototype.experience = 0;

Mob.prototype.health = 0;
Mob.prototype.energy = 0;
Mob.prototype.mana = 0;

Mob.prototype.wearLocation = null;

module.exports = Mob;

/**
 * Sole valid argument for `new Mob()`.
 * @typedef {Object} MobConstructorOptions
 * @property {MapObject} loc Location to move to.
 * @property {boolean} isCharacter Is this mob going to be used for a player's character?
 */
