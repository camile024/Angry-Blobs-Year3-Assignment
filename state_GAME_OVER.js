import { STATE } from "./WorldFSM.js";

let clickFunc;

/* Initialises the level */
export function s_GAME_OVER_init(world) {
   let winner;

   if (world.scores[0] > world.scoresAI[0]) {
	   winner = "Player";
   } else if (world.scores[0] < world.scoresAI[0]) {
	   winner = "AI";
   } else {
	   winner = "IT'S A DRAW!";
   }



    /* Show the score and confirmation */
    document.getElementById("gameOverDiv").style.display = "block";
    document.getElementById("proceedDiv").style.display = "block";
	document.getElementById("turnDiv").style.display = "none";
    document.getElementById ("proceed").innerHTML  = "Play Again";
    document.getElementById("gameOverText").innerHTML = "Game Over! Winner:  <font color='red'>" + winner + " </font></p>";

    clickFunc = function() { proceedClick(world) };
    document.getElementById ("proceed").addEventListener ("click", clickFunc, false);
}


export function s_GAME_OVER_update(world) {
    /* Wait until button was pressed */
    if (world.advanceState == true) {
        /* Proceed to clean up */
        document.getElementById ("proceed").removeEventListener ("click", clickFunc, false);
		world.advanceState = false;
		document.getElementById ("proceed").innerHTML  = "Continue";
		document.getElementById("gameOverDiv").style.display = "none";
		document.getElementById("proceedDiv").style.display = "none";
		document.getElementById("turnDiv").style.display = "block";
        return STATE.PLAYER_THINK;

    }

    return null;
}


function proceedClick(world) {
    world.advanceState = true;
}
