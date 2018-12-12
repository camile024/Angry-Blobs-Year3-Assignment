import { setDebugElement } from "./Utils.js";
import { s_MENU_init, s_MENU_update } from "./state_MENU.js";
import { s_PLAYER_THINK_init, s_PLAYER_THINK_update } from "./state_PLAYER_THINK.js";
import { s_AI_THINK_init, s_AI_THINK_update } from "./state_AI_THINK.js";
import { s_SIMULATE_init, s_SIMULATE_update } from "./state_SIMULATE.js";
import { s_EVALUATE_init, s_EVALUATE_update } from "./state_EVALUATE.js";
import { s_GAME_OVER_init, s_GAME_OVER_update } from "./state_GAME_OVER.js";

/* Main point of reference to possible states */
export const STATE = {
    MENU: 0,
    PLAYER_THINK: 1,
    SIMULATE: 2,
    AI_THINK: 3,
    EVALUATE: 4,
    GAME_OVER: 5
}



export class WorldFSM {

    constructor(world){
        this.world = world; //reference to the parenting world - can get anywhere from this
        this.date = new Date();
        this.update;
        this.currentState = STATE.MENU;

        s_MENU_init(world); //initialise menu
    }

    /*
     * Run one instance of this FSM
     */
    run() {
        let nextState = this.currentState;

        /* adjust camera if needed (window dimensions change) */
        this.adjustCamera();

        /* Ensure a function fit for the state is selected i.e. updating function
         * of the current state */
        this.updateSelectedFunction();


            /* Handle debug data */
            this.updateDebugMode();

            /* Update world */
            nextState = this.update(this.world); //can return new state


            /* Simulate physics */
            this.world.scene.simulate();


        /* Update state */
        this.updateCurrentState(nextState);
    }



    adjustCamera() {
        this.world.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    updateSelectedFunction() {
        switch (this.currentState) {
            case STATE.MENU:
                /* Menu should be initialised at this point, just assign usual function */
                this.update = s_MENU_update;
                break;
            case STATE.PLAYER_THINK:
                this.update = s_PLAYER_THINK_update;
                break;
            case STATE.AI_THINK:
                this.update = s_AI_THINK_update;
                break;
            case STATE.SIMULATE:
                this.update = s_SIMULATE_update;
                break;
            case STATE.EVALUATE:
                this.update = s_EVALUATE_update;
                break;
			case STATE.GAME_OVER:
				this.update = s_GAME_OVER_update;
			break;
        }
    }


    /* Handles transitions if a new stae was returned. Could be optimised as some states don't really
     * change their procedure no matter the previous one, but I believe this is more maintainable
     */
    updateCurrentState(state) {
        let current = this.currentState;

        /* MENU -> PLAYER_THINK */
        if (current == STATE.MENU && state == STATE.PLAYER_THINK) {
            s_PLAYER_THINK_init(this.world);
            this.currentState = state;
            this.world.advanceState = false;
        }

        /* PLAYER_THINK -> SIMULATE */
        if (current == STATE.PLAYER_THINK && state == STATE.SIMULATE) {
            s_SIMULATE_init(this.world);
            this.currentState = state;
            this.world.advanceState = false;
        }

        /* AI_THINK -> SIMULATE */
        if (current == STATE.AI_THINK && state == STATE.SIMULATE) {
            s_SIMULATE_init(this.world);
            this.currentState = state;
            this.world.advanceState = false;
        }

        /* SIMULATE -> EVALUATE */
        if (current == STATE.SIMULATE && state == STATE.EVALUATE) {
            s_EVALUATE_init(this.world);
            this.currentState = state;
            this.world.advanceState = false;
        }

        /* EVALUATE -> PLAYER_THINK */
        if (current == STATE.EVALUATE && state == STATE.PLAYER_THINK) {
            s_PLAYER_THINK_init(this.world);
            this.currentState = state;
            this.world.advanceState = false;
        }

        /* EVALUATE -> AI_THINK */
        if (current == STATE.EVALUATE && state == STATE.AI_THINK) {
            s_AI_THINK_init(this.world);
            this.currentState = state;
            this.world.advanceState = false;
        }

		/* EVALUATE -> GAME_OVER */
        if (current == STATE.EVALUATE && state == STATE.GAME_OVER) {
            s_GAME_OVER_init(this.world);
            this.currentState = state;
            this.world.advanceState = false;
        }

		/* GAME_OVER -> PLAYER_THINK */
        if (current == STATE.GAME_OVER && state == STATE.PLAYER_THINK) {
            this.world.reset();
			s_PLAYER_THINK_init(this.world);
            this.currentState = state;
            this.world.advanceState = false;
        }
    }


    updateDebugMode() {
        if (this.world.gameEngine.debug == true) {
            document.getElementById("debugDiv").style.display = "block";
        } else {
            document.getElementById("debugDiv").style.display = "none";
        }

        if (this.world.gameEngine.debug == true) {
            setDebugElement(this.world.advanceState, this.world);
        }
    }



}
