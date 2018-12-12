import { STATE } from "./WorldFSM.js";
import { menuObjects } from "./worldObjects.js";
import { setScene, setUpCommonLights } from "./Utils.js";

let objectHighlighted = null;
let mouse = {
    x: 0,
    y: 0
}

export function s_MENU_init(world) {
    setScene(world.scene, menuObjects, world.worldObjects);
    setUpCommonLights(world.scene);
}

export function s_MENU_update(world) {
    /* For testing debug functionality */
    if (world.gameEngine.debug == true) {
        for (let object of world.worldObjects) {
            object.mesh.material.wireframe = true;
        }
    } else {
        for (let object of world.worldObjects) {
            object.mesh.material.wireframe = false;
        }
    }

    /* When initialisation set, perform setup for first level and PLAYER_THINK state */
    if (world.advanceState == true) {
        world.currentLevel = 1;
        return STATE.PLAYER_THINK;
    }

    return null;
}
