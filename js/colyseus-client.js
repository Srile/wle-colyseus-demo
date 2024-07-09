WL.registerComponent('colyseus-client', {
    sphere: {type: WL.Type.Object },
    box: {type: WL.Type.Object },
    cone: {type: WL.Type.Object },
}, {
    init: function() {
      this.client = new Colyseus.Client('wss://colyseus.constructarca.de/');
      document.client = this.client;
      document.addEventListener('keypress', this.onKeyPress.bind(this));
    },
    onKeyPress: function(e){
      switch(e.code) {
        case 'KeyJ':
          this.client.joinOrCreate("my_room").then(function(room) {
              this.setupRoom(room);
              console.log(room.sessionId, "joined", room.name);
            }.bind(this)).catch(function(e) {
              console.log("JOIN ERROR", e);
            });
          break;
        case 'KeyK':
          this.room.send("test", { object: 'box'});
          break;
        }
    },
    setupRoom: function(room) {
      this.room = room;
      this.newPosBox = {};
      this.newPosCone = {};
      this.newPosSphere = {};
      room.state.box.onChange = function(changes) {
        changes.forEach(function(change) {
            this.newPosBox[change.field] = change.value;
        }.bind(this));
        this.box.setTranslationWorld([this.newPosBox.x, this.newPosBox.y, this.newPosBox.z]);
      }.bind(this);

      room.state.cone.onChange = function(changes) {
        changes.forEach(function(change) {
            this.newPosCone[change.field] = change.value;
        }.bind(this));
        this.cone.setTranslationWorld([this.newPosCone.x, this.newPosCone.y, this.newPosCone.z]);
      }.bind(this);

      room.state.sphere.onChange = function(changes) {
        changes.forEach(function(change) {
            this.newPosSphere[change.field] = change.value;
        }.bind(this));
        this.sphere.setTranslationWorld([this.newPosSphere.x, this.newPosSphere.y, this.newPosSphere.z]);
      }.bind(this);
    }
});
