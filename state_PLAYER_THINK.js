import { WorldFSM, STATE } from "./WorldFSM.js";
import { setScene, setUpCommonLights, drawLine, shoot, updateTurnText, setShootAngle, clearObjects, updateForceBar, toggleForceBar } from "./Utils.js";

const TOSIA_MAX_FORCE = 120;
const TOSIA_MIN_FORCE = 10;
const FORCE_SCALE = 2;
const FORCE_ADD = 10;
const TOSIA_MAX_ANGLE = 80;
const TOSIA_MIN_ANGLE = 5;

let prevLine;
let mousePressed = false;

let funcClick;
let funcMouseMove;

/* Initialises the level */
export function s_PLAYER_THINK_init(world) {
    clearObjects(world, world.scene);
    setScene(world.scene, world.levelObjects[world.currentLevel], world.worldObjects);
    setScene(world.scene, world.levelObjects[0], world.worldObjects); //common objects
    setUpCommonLights(world.scene);

    toggleForceBar(world);

    world.mouse.x = 0;
    world.mouse.y = 0;
    world.angle = 0;

    funcMouseMove = function(event) { s_PLAYER_THINK_onMouseMove(event, world) };
    funcClick = function(event) { s_PLAYER_THINK_onClick(event, world) };

    document.addEventListener('mousemove', funcMouseMove, false);
    document.addEventListener('click', funcClick, false);

    mousePressed = false;
    updateTurnText("Player");
}



export function s_PLAYER_THINK_update(world) {
    /* For testing debug functionality */
    if (world.gameEngine.debug == true) {
        let proj = world.getObjectByName("PROJECTING_PLANE");
        if (proj != null) {
            proj.mesh.material.visible = true;
            proj.mesh.material.wireframe = true;
        }
        drawMouseToDog(world); //to help debug shoot direction
    }

    updateShootAngle(world);
    updateShootForce(world);
    updateForceBar(world);

    /* Shoot the dog out */
    if (mousePressed == true) {
        mousePressed = false;
        s_PLAYER_THINK_cleanup(world);
        let dog = world.getMeshByName("TOSIA");

        shoot(dog, world.force, world.angle);
        return STATE.SIMULATE;
    }
    return null;
}


/* Proceed to leave the state */
export function s_PLAYER_THINK_cleanup(world) {
    document.removeEventListener('mousemove', funcMouseMove, false);
    document.removeEventListener('click', funcClick, false);
}

/* Update mouse coords for further calculations */
export function s_PLAYER_THINK_onMouseMove(event, world) {
    world.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    world.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}


/* Register the shoot command */
function s_PLAYER_THINK_onClick(event, world) {
        mousePressed = true;
}


/* Draw the line between mouse pointer and the dog (used in debugging) */
function drawMouseToDog(world) {
    /* Setting current angle of Tosia */
    let tosia = world.getMeshByName("TOSIA");
    if (tosia != null) {
        if (prevLine != null) {
            world.scene.remove(prevLine);
        }
        let pos = getMouseVector(world);
        prevLine = drawLine({x: pos.x, y: pos.y, z : pos.z},
                    { x: tosia.position.x, y: tosia.position.y, z: tosia.position.z},
                    0x000000, world.scene);
    }
}

/* Translates mouse position from screen coords to world coords */
function getMouseVector(world) {
    let vector = new THREE.Vector3(world.mouse.x, world.mouse.y, -3);
    vector.unproject(world.camera);
    let direction = vector.sub(world.camera.position).normalize();
    let dist = - world.camera.position.z / vector.z;
    let pos = world.camera.position.clone().add(vector.multiplyScalar(dist));

    return pos;
}

/* Updates the angle of the dog + the angle to shoot at */
function updateShootAngle(world) {
    let tosia = world.getMeshByName("TOSIA");
    let vector = getMouseVector(world);
    let x =  vector.x - tosia.position.x;
    let y = vector.y - tosia.position.y;


    if (x != 0) {
        let oldAngle = world.angle;
        let angleDeg, diff;
        /* TOA */
        world.angle = Math.atan(y/Math.abs(x));
        angleDeg = world.angle * (180 / Math.PI); //easier to use deg for comparison


        /* Correct according to minimums/maximums */
        if (angleDeg > TOSIA_MAX_ANGLE) {
            world.angle = TOSIA_MAX_ANGLE * (Math.PI / 180); //convert limit in deg to rads
        } else if (angleDeg < TOSIA_MIN_ANGLE) {
            world.angle = TOSIA_MIN_ANGLE * (Math.PI / 180);
        }
        diff = world.angle - oldAngle;
        setShootAngle(tosia, tosia.rotation.z + diff); //update mesh's rotation

    }
}

/* Update force based on the distance of the mouse to the dog */
function updateShootForce(world) {
    let tosia = world.getMeshByName("TOSIA");
    let vector = getMouseVector(world);
    let x = vector.x - tosia.position.x;
    let y = vector.y - tosia.position.y;
    world.force = Math.sqrt((x * x) + (y * y));

    /* Scale up */
    world.force += FORCE_ADD;
    world.force *= FORCE_SCALE;

    /* Correct according to minimums/maximums */
    if (world.force > TOSIA_MAX_FORCE) {
        world.force = TOSIA_MAX_FORCE;
    } else if (world.force < TOSIA_MIN_FORCE) {
        world.force = TOSIA_MIN_FORCE;
    }

}
