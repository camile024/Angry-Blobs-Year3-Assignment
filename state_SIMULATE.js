import { WorldFSM, STATE } from "./WorldFSM.js";
import { updateScores, toggleForceBar } from "./Utils.js";

const POINTS_PER_HIT = 3;
const SIMULATION_TIMEOUT = 8000;

let framesPassed = 0;
let scoreFunc;
let startTime = 0;

/* Initialises the level */
export function s_SIMULATE_init(world) {
    scoreFunc = function(other_object) { addScore(world, other_object); };
    let tosia = world.getMeshByName("TOSIA");
    tosia.addEventListener( 'collision', scoreFunc);
    if (world.playerTurn == true) {
        toggleForceBar(world);
    }
    framesPassed = 0;
    startTime = new Date().getTime();
}

export function s_SIMULATE_update(world) {
    let currentTime = new Date().getTime();
    let timePassed = currentTime - startTime;
    /* wait until at least 100 frames have passed (to let the dog get velocity) */
    if (framesPassed++ >= 100) {
        let tosia = world.getMeshByName("TOSIA");
        let velocity = tosia.getLinearVelocity();
        let allStatic = true;

        /* Check if nothing's moving [too much] */
        for (let object of world.worldObjects) {
            if (object instanceof Physijs.Mesh) {
                let linearV = object.getLinearVelocity();
                if (linearV.x != 0 || linearV.y != 0 || linearV.z == 0) {
                    allStatic = false;
                }
            }
        }

        /* Finish simulating when either everything static or sufficient time has passed */
        if ( (velocity.x == 0 && velocity.y == 0 && allStatic == true) || timePassed > SIMULATION_TIMEOUT) {
            framesPassed = 0;
            tosia.removeEventListener( 'collision', scoreFunc);
            return STATE.EVALUATE;
        }
    }
    return null;
}

/* Add some score for each collision with the target */
function addScore(world, other_object) {
    let obj = world.getObjectByName(other_object.name);
    if(obj.params.target == true) {
        if (world.playerTurn == true) {
            world.scores[world.currentLevel] += POINTS_PER_HIT;
            world.scores[0] += POINTS_PER_HIT;
        } else {
            world.scoresAI[world.currentLevel] += POINTS_PER_HIT;
            world.scoresAI[0] += POINTS_PER_HIT;
        }
        updateScores(world);
    }
}
