import { WorldFSM } from "./WorldFSM.js";

import { default as Stats } from "./lib/Stats.js";
import { levelCommonObjects, level1Objects, level2Objects, level3Objects } from "./worldObjects.js";
import { updateScores } from "./Utils.js";

let currentWorld;

export class World {

    /* Huge constructor - this gets used by GameEngine a bit, the FSM and all the states/util functions
     * as a point of reference, the 'World' is passed in the state functions so they always influence the correct
     * (although only a single one) instance of the World */
    constructor(gameEngine, scene, camera, renderer, resourceManager, aiParams) {
        this.FORCE_MAX = 60;
        this.FORCE_MIN = 10;
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.resourceManager = resourceManager;
        this.worldObjects = []; //objects as defined in worldObjects.js. Additionally each has a reference to its own mesh
        this.worldFSM; //gets run repeatedly and sorts the game logic out
        this.gameEngine = gameEngine; //reference to the owner gameEngine
        this.levelObjects = [ levelCommonObjects, level1Objects, level2Objects, level3Objects ]; //references to the arrays with objects in worldObjects.js
        this.currentLevel = 0; //used by plaing states
        this.advanceState = false //a helper used by playing states (usually)
        this.stats = new Stats(); //FPS meter library
        this.stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
        this.scores = [0, 0, 0, 0]; //scores start from index 1, sum at index 0
        this.scoresAI = [0, 0, 0, 0]; //scores start from index 1, sum at index 0
        this.engineFired = false; //to ensure setInterval isn't fired more than once when the world is run
        this.playerTurn = true; //to differentiate between turns
        this.aiParams = aiParams; //force/angle values to be used by the AI for each level
        document.body.appendChild( this.stats.dom ); //fps
		currentWorld = this; //'this' keyword changes context often, there's only one world anyway so file-based global is OK

        /* PLAYER/AI_THINK variables */
        this.angle = 0;
        this.force = 0;

        /* Mouse coords */
        this.mouse = {
            x: 0,
            y: 0
        };
    }


    /* Let there be angry dogs */
    create() {
        this.initialiseMenuState();
    }

    /* Start running the world */
    run() {
        currentWorld.stats.begin();
        currentWorld.renderer.render(currentWorld.scene, currentWorld.camera); //run renderer as fast as possible
        currentWorld.stats.end();

        /* Interval for updating/simulating physics, set once on the first run and forget */
        if (currentWorld.engineFired == false) {
            setInterval(function() {
                currentWorld.worldFSM.run();
            }, 2);
            currentWorld.engineFired = true;
        }

        /* loop around */
        requestAnimationFrame(function() { currentWorld.run(currentWorld) });

    }

    /* Initialises the FSM with the starting state, from which further states are derived */
    initialiseMenuState() {
        let self = this;
        self.worldObjects = [];
        self.worldFSM = new WorldFSM(self);
    }



    /* Returns object based on name given */
    getObjectByName(id) {
        let returnval = null;
        for (let object of this.worldObjects) {
            if (object.name == id) {
                returnval = object;
            }
        }
        return returnval;
    }

    /* Returns mesh based on name given */
    getMeshByName(name) {
        let self = this;
        return self.getObjectByName(name).mesh;
    }

    /* "Play Again" handler */
	reset() {
		this.currentLevel = 1;
		this.worldObjects = [];
		this.scores = [0, 0, 0, 0];
		this.scoresAI = [0, 0, 0, 0];
		this.mouse.x = 0;
		this.mouse.y = 0;
		updateScores(currentWorld);
		this.playerTurn = true;
	}




}
