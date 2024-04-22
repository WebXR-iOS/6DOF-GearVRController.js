/**
 * @author crazyh / https://github.com/crazyh2
 */

import { ControllerBluetoothInterface } from "../lib/ControllerBluetoothInterface.js";

class RotationalTracking {
    constructor(root) {
        this.root = root;
        var scope = this;

        this.dataUpdate = false;

        this.controllerBluetoothInterface = new ControllerBluetoothInterface((e) => {
            scope.data(scope, e);
        });

        this.start();
    };

    async start() {
        await this.controllerBluetoothInterface.pair();

        var scope = this;

        setInterval(() => {
            this.tick(scope)
        }, 1000);
    };

    async tick(scope) {
        if(scope.dataUpdate == false) {
            await this.controllerBluetoothInterface.runCommand(ControllerBluetoothInterface.CMD_VR_MODE);
            await this.controllerBluetoothInterface.runCommand(ControllerBluetoothInterface.CMD_SENSOR);
        } else {
            scope.dataUpdate = false;
        };
    };

    data(scope, event) {
        scope.dataUpdate = true;

        scope.root.rotation = event;

        //console.log(event);
    };
};

export { RotationalTracking };
