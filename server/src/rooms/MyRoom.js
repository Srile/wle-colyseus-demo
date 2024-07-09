const colyseus = require('colyseus');
const SceneObjects = require('./schema/SceneObjects').SceneObjects;

exports.MyRoom = class extends colyseus.Room {

  onCreate (options) {
    this.setState(new SceneObjects());

    this.onMessage("test", (client, message) => {
      console.log("msg: ", message);
      //
      // handle "type" message.
      //
    });

    this.onMessage("move", (client, message) => {
      this.state[message.object].move(message.x, message.z);
      // this.state[message.object].set(message.x, message.y, message.z);
    });

  }

  onJoin (client, options) {

  }

  onLeave (client, consented) {
  }

  onDispose() {
  }

}
