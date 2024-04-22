class SocketManager {
    constructor() {
        console.log("Waiting for Peer connection");

        this.socket = io();
        this.conn = null;
        this.id = null;
    };

    connect(id) {
        if(this.conn !== null) return false;

        this.conn = this.socket;
        this.id = id;

        var scope = this;

        this.socket.on('connect', function () {
            console.log("Socket.io connected");

            scope.socket.on('controllerDataIn', function (data) {
                scope.data(data, scope);
            });
        });

        return true;
    };

    data(data, scope) {
        if(this.conn == null) return false;

        console.log("Data recieved: " + data);
        return true;
    };

    send(data) {
        if(this.conn == null) return false;

        this.socket.emit('controllerDataOut', this.id, data);
        return true;
    };
};

export { SocketManager };