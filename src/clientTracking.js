/**
 * @author crazyh / https://github.com/crazyh2
 */

class ClientTracking {
    constructor(root, domElement) {
        this.root = root;
        var scope = this;

        this.cameraScale = 0.29;

        this.started = false;

        this.peerId = this.makeid(3) + "-" + this.makeid(3) + "-" + this.makeid(3);

        this.socket = io();

        var AHRS = require("ahrs");

        this.ahrs = new AHRS({

            sampleInterval: 68.84681583453657, // Madgwick is sensitive to this
            algorithm:      'Madgwick',
            beta:           0.8,

        });

        this.lastZeroQuaternion = null;

        this.driftCompensation = [0, 0, 0];
        this.lastTimestamp = 0;

        this.socket.on('connect', function() {
            scope.peerId = scope.socket.id;

            domElement.innerText = "Code: " + scope.peerId;

            scope.socket.on('controllerDataIn', function(data) {
                scope.data(scope, data);
            });
        });
    };

    makeid(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    };

    data(scope, res) {
        if(scope.started !== true) return;

        if(!res.position || !res.rotation) return;

        var position = res.position;
        var rotation = res.rotation;
        var posNotFound = false;

        if(position.error) {
            if(position.error == "Starting") return;
        };

        if(position.error) {
            if(rotation.error == "Starting") return;
        };

        if(position.error) {
            if(position.error == "Empty") posNotFound = true;
        };

        scope.update(scope, position, rotation, posNotFound);
    };

    update(scope, position, rotation, posNotFound) {
        // Position
        if(posNotFound == false) {
            var posx = (position.x + (position.width / 2));
            var posy = (position.y + (position.height / 2));
            var posz = position.z;

            var worldX = -((posx / position.cameraWidth) - 0.5) * 2;
            var worldY = (0.5 - (posy / position.cameraHeight)) * 2;

            this.root.render.scene.hand.position.set(worldX * scope.cameraScale, worldY * scope.cameraScale, posz);
        } else {
            this.root.render.scene.hand.position.set(0, -0.3, -0.2);
        };

        // Rotation
        var data = rotation;

        let deltaTimeSeconds = 0;

        if (scope.lastTimestamp) {
            deltaTimeSeconds = (data.timestamp - scope.lastTimestamp);

            scope.ahrs.update(
                data.gyro[0],
                data.gyro[1],
                data.gyro[2],
                data.accel[0],
                data.accel[1],
                data.accel[2],
                data.magX, data.magY, data.magZ,
                deltaTimeSeconds
            );
        };

        scope.lastTimestamp = data.timestamp;

        const {x, y, z, w} = scope.ahrs.getQuaternion();
        scope.root.render.scene.hand.quaternion.set(x, z, -y, w);

        if (data.homeButton) {
            scope.lastZeroQuaternion = scope.root.render.scene.hand.quaternion.clone().inverse();
            console.log(`Re-zeroed orientation! ${(new Date()).valueOf()}`);
        }

        if (scope.lastZeroQuaternion) {
            scope.root.render.scene.hand.quaternion.premultiply(scope.lastZeroQuaternion);
        }
    };

    launch(evt) {
        this.started = true;
    };
};

export { ClientTracking };
