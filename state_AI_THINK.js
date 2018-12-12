import { WorldFSM, STATE } from "./WorldFSM.js";
import { setScene, setUpCommonLights, shoot, updateTurnText, setShootAngle, clearObjects, updateForceBar } from "./Utils.js";

const THINKING_THRESHOLD = 2000;
const SHOOTING_THRESHOLD = 4000;
const ANGLE_STEP = 0.01

let lastTime = 0;

/* Initialise the level for AI in a similar manner as for player */
export function s_AI_THINK_init(world) {
    clearObjects(world, world.scene);
    setScene(world.scene, world.levelObjects[world.currentLevel], world.worldObjects); //level-specific
    setScene(world.scene, world.levelObjects[0], world.worldObjects); //common objects
    setUpCommonLights(world.scene);

    lastTime = new Date().getTime();

    updateTurnText("AI");

    /* Can set force already */
    world.force = world.gameEngine.aiParams[((world.currentLevel-1) * 2)]
}

export function s_AI_THINK_update(world) {
    let currentTime = new Date().getTime();
    let tosia = world.getMeshByName("TOSIA");
    let newAngle = tosia.rotation.z;

    /* Wait a bit before rotating the dog into position (AI "thinking")*/
    if (currentTime - lastTime >= THINKING_THRESHOLD) {
        if (tosia.rotation.z > world.gameEngine.aiParams[((world.currentLevel-1) * 2) + 1]) {
            newAngle -= ANGLE_STEP; //smoothly rotate
        } else if (tosia.rotation.z < world.gameEngine.aiParams[((world.currentLevel-1) * 2) + 1]){
            newAngle += ANGLE_STEP;
        }
        setShootAngle(tosia, newAngle); //update dog's rotation
        world.angle = newAngle;

        /* Wait a bit more before actually shooting the dog */
        if (currentTime - lastTime >= SHOOTING_THRESHOLD) {
            shoot(tosia, world.force, world.angle);
            return STATE.SIMULATE;
        }
    }
    return null;
}
