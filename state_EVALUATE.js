import { WorldFSM, STATE } from "./WorldFSM.js";
import { updateScores } from "./Utils.js";

const SCORE_SCALE_FACTOR = 10;
const SCORE_Y_WEIGHT = 1.7;
const SCORE_X_WEIGHT = 0.9;
const SCORE_Z_WEIGHT = 0.1;


let clickFunc; //to store the 'continue' / 'play again' anonymous function to add/remove eventlisteners

/* Initialises the level */
export function s_EVALUATE_init(world) {
    let targetSumsFinal = {x: 0, y: 0, z: 0};
    let targetNum = 0;
    let targetAvg = {x: 0, y: 0, z: 0};
    let score = 0;
    let scoreToShow = 0; //separate from score, as score = deviation, to show = that + score from colliding

    for (let object of world.worldObjects) {
        if (object.params.target == true) {
            let posI = object.position; //initial
            let posC = object.mesh.position; //current
            /* Add difference of coords of the block */
            targetSumsFinal.x += Math.abs(posC.x - posI.x);
            targetSumsFinal.y += Math.abs(posC.y - posI.y);
            targetSumsFinal.z += Math.abs(posC.z - posI.z);
            /*Increase target number */
            targetNum++;
        }
    }
    /* average out the amount each block has moved */
    targetAvg.x = targetSumsFinal.x / targetNum;
    targetAvg.y = targetSumsFinal.y / targetNum;
    targetAvg.z = targetSumsFinal.z / targetNum;
    /* Sum each coefficient and scale score up */
    score = parseInt(SCORE_SCALE_FACTOR * (targetAvg.x * SCORE_X_WEIGHT + targetAvg.y * SCORE_Y_WEIGHT + targetAvg.z * SCORE_Z_WEIGHT));

    if (world.playerTurn == true) {
        scoreToShow = score + world.scores[world.currentLevel]; //add score from previous collisions
        world.scores[world.currentLevel] += score; //update scores array
        world.scores[0] += score;

    } else {
        scoreToShow = score + world.scoresAI[world.currentLevel];
        world.scoresAI[world.currentLevel] += score;
        world.scoresAI[0] += score;

    }

    /* Show the score and confirmation */
    document.getElementById("evalDiv").style.display = "block";
    document.getElementById("proceedDiv").style.display = "block";
    document.getElementById("evalDiv").innerHTML = "<p id='scoresContainer' class='scoresText'>Score gained: <font color='red'>" + scoreToShow + " </font></p>";
    updateScores(world); //update the HTML scoreboard element

    clickFunc = function() { proceedClick(world) }; //function for the button stored in a var so the eventListener can later be removed
    document.getElementById ("proceed").addEventListener ("click", clickFunc, false);
}

/* Wait for the click and advance state when that happens */
export function s_EVALUATE_update(world) {
    if (world.advanceState == true) {
        document.getElementById ("proceed").removeEventListener ("click", clickFunc, false);

        if (world.currentLevel <= 3) {
            let returnState = STATE.AI_THINK;

            /* proceed to AI's turn */
            if (world.playerTurn == true) {
                world.playerTurn = false;
            } else if (world.currentLevel < 3){
                /* Load next level */
                world.currentLevel++;
                world.playerTurn = true;
                returnState = STATE.PLAYER_THINK;
            } else {
                /* Load Game Over state */
				returnState = STATE.GAME_OVER;
			}
            world.advanceState = false; //reset the indicator

            /* HTML cleanup */
            document.getElementById("evalDiv").style.display = "none";
            document.getElementById("proceedDiv").style.display = "none";
            return returnState;

        }

    }

    return null;
}

function proceedClick(world) {
    world.advanceState = true; //indicate the button's been clicked
}
