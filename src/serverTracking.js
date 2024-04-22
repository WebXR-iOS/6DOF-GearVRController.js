/**
 * @author crazyh / https://github.com/crazyh2
 */

import { PositionalTracking  } from "./positionalTracking.js";
import { RotationalTracking } from "./rotationalTracking.js";
import { SocketManager } from "./socketScript.js";

class ServerTracking {
    constructor(code) {
        this.rotation = { error: "Empty" }; //"Starting" };
        this.position = { error: "Starting" };

        this.socket = new SocketManager();
        this.PositionalTracking = new PositionalTracking(this);
        this.RotationalTracking = new RotationalTracking(this);

        this.connect(code);
    };

    connect(id) {
        var scope = this;

        this.socket.connect(id);

        setInterval(() => {
            scope.send(scope);
        }, 3);
    };

    send(scope) {
        this.socket.send({
            position: scope.position,
            rotation: scope.rotation
        });

        console.log({
            position: scope.position,
            rotation: scope.rotation
        });
    };
};

export { ServerTracking };
