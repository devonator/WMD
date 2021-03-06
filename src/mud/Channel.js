// node includes
var EventEmitter = require("events");

// local includes
var Communicate = require("./Communicate");
var MessageCategory = require("./MessageCategory");

/**
 * Controls communication avenues.
 */
class Channel extends EventEmitter{
    /**
     * Construct a Channel.
     * @param {ChannelConstructorOptions} options 
     */
    constructor(options){
        super();
        this._participants = [];

        if(options){
            if(options.id != null) this.id = options.id;
            if(options.name != null) this.name = options.name;
        }
    }

    get participants(){
        return this._participants;
    }

    transmit(speaker, message, target, filter){
        var fields = {message:message, directObject:target}
        for(var listener of this._participants){
            // participant filtered out
            if(filter && !filter(speaker, listener, fields)) continue;

            // process string
            var processed;
            if(listener == speaker) processed = Channel.transmitFieldCodeReplace(this.format.firstPerson, speaker, fields);
            else if(listener == fields.directObject) processed = Channel.transmitFieldCodeReplace(this.format.secondPerson, speaker, fields);
            else processed = Channel.transmitFieldCodeReplace(this.format.thirdPerson, speaker, fields);

            // send message
            listener.sendMessage(processed, MessageCategory.CHAT);
        }
    }

    add(player){
        if(this._participants.indexOf(player) != -1) return; // already participating
        this._participants.push(player);
        player.joinChannel(this);
    }

    remove(player){
        var pos = this._participants.indexOf(player);
        if(pos == -1) return; // already not participating
        this._participants.splice(pos, 1);
        player.leaveChannel(this);
    }

    isParticipating(player){
        return this._participants.indexOf(player) != -1;
    }

    /**
     * Replace act field codes with field values.
     * @param {string} string
     * @param {Mob} speaker
     * @param {Object} fields 
     */
    static transmitFieldCodeReplace(string, speaker, fields){
        return string.replace(/\$(.)/g, function(full, code){
            switch(code){
                case "n": return speaker.mob.name;
                case "N": return fields.directObject ? fields.directObject.mob.name : "(unknown)";
                case "m": return fields.message ? fields.message : "(unknown)";
                default:
                    Logger.error(_("BAD ACT CODE: %s", code));
                    return "???";
            }
        });
    }

    static filterSpeakerTargetOnly(speaker, listener, fields){
        if(listener == speaker) return true;
        if(listener == fields.directObject) return true;
        return false;
    }
}

/**
 * Is this channel joined automatically?
 */
Channel.prototype.default = false;

/**
 * The message format for this channel.
 */
Channel.prototype.format = {
    firstPerson: "You: %s",
    thirdPerson: "%s: %s"
}

/**
 * List of players participating in this channel.
 * @alias Channel#participants
 */
Channel.prototype._participants = null;

/**
 * This channel's name.
 */
Channel.prototype.name = null;

module.exports = Channel;

/**
 * Sole valid argument for `new Channel()`.
 * @typedef {Object} ChannelConstructorOptions
 * @property {number} id
 * @property {string} name
 */
