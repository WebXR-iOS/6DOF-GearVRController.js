/**
 * @author crazyh / https://github.com/crazyh2
 */

class PositionalTracking {
    constructor(root) {
        this.root = root;
        var scope = this;

        this.cameraWidth = 0;
        this.cameraHeight = 0;

        this.focalLength = 10000000; // Focal length of the camera in pixels (hypothetical value)
        this.trackedObjectWidth = 4; // Width of the object in cm
        this.trackedObjectHeight = 4; // Height of the object in cm

        navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode: "user" }}).then(function success(stream) {
            document.querySelector("#cameraFeed").srcObject = stream;

            scope.cameraWidth = stream.getTracks()[0].getSettings().width;
            scope.cameraHeight = stream.getTracks()[0].getSettings().height;

            scope.start();
        });
    };

    start() {
        var scope = this;

        /*tracking.ColorTracker.registerColor('theColor', function(r, g, b) {
            if (r > 185 && g > 115 && g < 135 && b < 40) {
              return true;
            }
            return false;
        });*/

        tracking.ColorTracker.registerColor('green', function(r, g, b) {
            if ((r < 200 && g > 230 && b < 200) || (r > 230 && g > 230 && b > 230 && g > (r + 10))) {
                return true;
            }
            return false;
        });

        tracking.ColorTracker.registerColor('red', function(r, g, b) {
            if ((r > 230 && g < 200 && b < 200) || (r > 230 && g > 230 && b > 230 && r > (g + 10))) {
                return true;
            }
            return false;
        });

        /*tracking.ColorTracker.registerColor('yellowgreen', function(r, g, b) {
            if (r > 150 && g > 150 && b < 80) {
                return true;
            }
            return false;
        });

        tracking.ColorTracker.registerColor('brightblue', function(r, g, b) {
            if (r < 60 && g < 185 && b > 215) {
                return true;
            }
            return false;
        });*/

        this.color = new tracking.ColorTracker(['green', 'red']);//'brightblue', 'yellowgreen', 
        this.color.setMinDimension(5);

        tracking.track('#cameraFeed', scope.color);

        this.color.on('track', (event) => {scope.data(scope, event)});
    };

    data(scope, event) {
        if (event.data.length === 0) {
            // No colors were detected in this frame.
            scope.notVisibleController(scope, event);
        } else {
            scope.update(scope, event);
        }
    };

    update(scope, event) {
        /*event.data.forEach(function(rect) {
            console.log(rect.x, rect.y, rect.height, rect.width, rect.color);
            // rect.x, rect.y, rect.height, rect.width, rect.color
        });*/
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');

        context.clearRect(0, 0, canvas.width, canvas.height);

        event.data.forEach(function(rect) {
          if (rect.color === 'custom') {
            rect.color = scope.color.customColor;
          }

          context.strokeStyle = rect.color;
          context.strokeRect(rect.x, rect.y, rect.width, rect.height);

          rect.z = scope.estimateDepth(scope.focalLength, scope.trackedObjectWidth, scope.trackedObjectHeight, rect.width, rect.height);
        });

        var output = {
            width: event.data[0].width,
            height: event.data[0].height,
            color: event.data[0].color,
            x: event.data[0].x,
            y: event.data[0].y,
            z: -0.3,
            cameraWidth: scope.cameraWidth,
            cameraHeight: scope.cameraHeight,
        };

        scope.root.position = output;//event.data[0].z

        //console.log(output);
    };

    notVisibleController(scope, event) {
        scope.root.position = { error: "Empty" };

        //console.log({ error: "Empty" });
    };

    estimateDepth(focalLength, objectWidth, objectHeight, imageWidth, imageHeight) {
        const distance = (focalLength * (objectWidth / 100)) / imageWidth;

        const correctedDistance = (distance * (objectHeight / 100)) / imageHeight;

        return correctedDistance;
    };
};

export { PositionalTracking };
