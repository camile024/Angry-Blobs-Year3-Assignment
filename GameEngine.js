import { ResourceManager } from "./ResourceManager.js";
import { World } from "./World.js";
import { AiEvo } from "./AiEvo.js";

const MAX_NUM_GENERATIONS = 7;
const GENERATIONS_STEP = 2;
const MIN_NUM_GENERATIONS = 1;

export class GameEngine {
    constructor() {
        this.scene;
        this.camera = '';
        this.renderer = '';
        this.resourceManager = '';
        this.world;
        this.debug = 0;
        this.aiEvo;
        this.aiParams = [120, 0.239, 120, 0.249, 47.53, 1.235] ;
		this.perfParams = [120, 0.239, 120, 0.249, 47.53, 1.235]
    }

    /*
     * This function initialises the first scene shown to user and all the important variables
     * for further use
     */
    initialise() {
        let self = this;

        /* Init AI simulator */
        this.aiEvo = new AiEvo(this.perfParams, MIN_NUM_GENERATIONS - GENERATIONS_STEP);

        /* Create all the graphics instances */
        this.scene = new Physijs.Scene();
        this.renderer = new THREE.WebGLRenderer( {antialias: true});
        this.camera = new THREE.PerspectiveCamera(80, window.innerWidth/window.innerHeight + 0.5, 0.1, 100);

        /* Set up initial camera pos */
        this.camera.position.x = -14;
        this.camera.position.y = 3;
        this.camera.position.z = 40;

        /* Set up shadows */
        this.renderer.shadowMapEnabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.shadowCameraNear = 0.1;
        this.renderer.shadowCameraFar = this.camera.far;

        this.renderer.shadowMapBias = 0.0039;
        this.renderer.shadowMapDarkness = 0.5;
        this.renderer.shadowMapWidth = 1024;
        this.renderer.shadowMapHeight = 1024;

        /* Load resources (textures/images) */
        this.resourceManager = new ResourceManager();
        let promises = this.resourceManager.initialise(this.resourceManager);

        /* Initialise the menu scene */
        Promise.all(promises).then(function() {
            self.initMenuWorld();
        });



        return promises;
    }

    /* Sets the renderer and World up */
    initMenuWorld() {
        let self = this;
        self.renderer.setSize( window.innerWidth, window.innerHeight );
        self.renderer.setClearColor(0xffffff);


        document.body.appendChild( self.renderer.domElement );

        self.world = new World(self, self.scene, self.camera, self.renderer, self.resourceManager, self.aiParams);
        self.world.create();
    }


    /*
     * Infinite loop once everything's set up
     */
    main() {
            this.world.run(); //pass over to newly created world
    }

/* BUTTON HANDLERS */
    toggleDebug() {
        this.debug = -this.debug + 1;
    }

    toggleGenerations() {
        this.aiEvo.generations = this.aiEvo.generations + GENERATIONS_STEP;
        if (this.aiEvo.generations > MAX_NUM_GENERATIONS) {
            this.aiEvo.generations = MIN_NUM_GENERATIONS;
        }

        return this.aiEvo.generations;
    }

    startGame() {
        this.world.advanceState = true; //currently in menu - advance to next state
        this.aiParams = this.aiEvo.train();
    }


}
