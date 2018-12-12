import { textures, ResourceManager } from "./ResourceManager.js";

/* Levels/scenes are stored here
 * An editor with the ability to expand/retract lists recommended */


export let menuObjects = [
    {
        name: "BACKGROUND", //name of the mesh
        mesh: '', //placeholder for the mesh
        geometry: '', //placeholder for the geometry
        material: "", //placeholder for the material
        texture: true, //uses texture?
        materialParam: "MENU_BACKGROUND", //texture/color
        geometry: "PLANE", //geometry type
        gParam1: 600, //geometry parameters (dimensions)
        gParam2: 200, //geometry parameters (dimensions)
        gParam3: 0, //geometry parameters (dimensions)
        rotation: { p: 0, r: 0, y: 0}, //initial rotation (applied in order left->right as defined here)
        position: { x: 0, y: 3, z: -60}, //initial position
        children: [], //children objects (following same structure as this one)
        params: {castShadow: false, receiveShadow: false, realWeight: 0 }, //additional parameters (optionals)
        weight: 0 //physijs weight
    },
    {
        name: "GROUND",
        mesh: '',
        geometry: '',
        material: "LAMBERT",
        texture: true,
        materialParam: "GRASS",
        geometry: "BOX",
        gParam1: 200,
        gParam2: 3,
        gParam3: 19,
        rotation: { p: 0, r: 0, y: 0},
        position: { x: 0, y: -15, z: 5},
        children: [],
        params: {castShadow: true, receiveShadow: true, bumpMap: "GRASS_BMAP", realWeight: 0 },
        weight: 0
    },
    {
        name: "TOSIA_BODY",
        mesh: '',
        geometry: '',
        material: "LAMBERT",
        texture: true,
        materialParam: "TOSIA_BODY",
        geometry: "BOX",
        gParam1: 10,
        gParam2: 3,
        gParam3: 3,
        rotation: { p: 0, r: 0, y: 0},
        position: { x: -45, y: -9, z: 3},
        children: [
            {
                name: "TOSIA_HEAD",
                mesh: '',
                geometry: '',
                material: "LAMBERT",
                texture: true,
                materialParam: "HEAD",
                geometry: "BOX",
                gParam1: 6,
                gParam2: 6,
                gParam3: 6,
                rotation: { p: 0, r: 0, y: 25},
                position: { x: 7, y: 0, z: -2},
                children: [],
                params: {castShadow: true, receiveShadow: true, realWeight: 0 },
                weight: 0
            },
            {
                name: "TOSIA_KASK",
                mesh: '',
                geometry: '',
                material: "LAMBERT",
                texture: false,
                materialParam: 0xffA0A0,
                geometry: "BOX",
                gParam1: 5.9,
                gParam2: 2,
                gParam3: 5.9,
                rotation: { p: 0, r: 0, y: 25},
                position: { x: 7, y: 3, z: -2},
                children: [
                    {
                        name: "TOSIA_KASK2",
                        mesh: '',
                        geometry: '',
                        material: "LAMBERT",
                        texture: false,
                        materialParam: 0xffA0A0,
                        geometry: "SPHERE",
                        gParam1: 3,
                        gParam2: 2,
                        gParam3: 2,
                        rotation: { p: 0, r: 0, y: 0},
                        position: { x: 0, y: 0.8, z: -1},
                        children: [
                            {
                                name: "TOSIA_KASK3",
                                mesh: '',
                                geometry: '',
                                material: "LAMBERT",
                                texture: false,
                                materialParam: 0xffA0A0,
                                geometry: "SPHERE",
                                gParam1: 1,
                                gParam2: 1,
                                gParam3: 15,
                                rotation: { p: 0, r: 0, y: 0},
                                position: { x: 0, y: 3, z: 0},
                                children: [

                                ],
                                params: {castShadow: true, receiveShadow: true, bumpMap: "COTTON_BMAP", realWeight: 0 },
                                weight: 0
                            },
                        ],
                        params: {castShadow: true, receiveShadow: true, bumpMap: "COTTON_BMAP", realWeight: 0 },
                        weight: 0
                    },
                ],
                params: {castShadow: true, receiveShadow: true, bumpMap: "COTTON_BMAP", realWeight: 0 },
                weight: 0
            },
            {
                name: "TOSIA_LEG1",
                mesh: '',
                geometry: '',
                material: "LAMBERT",
                texture: true,
                materialParam: "HAIR",
                geometry: "CYLINDER",
                gParam1: 1,
                gParam2: 1,
                gParam3: 3,
                rotation: { p: 0, r: 0, y: 0},
                position: { x: -3, y: -3, z: -2},
                children: [],
                params: {castShadow: true, receiveShadow: true, bumpMap: "HAIR_BMAP", realWeight: 0 },
                weight: 0
            },
            {
                name: "TOSIA_LEG2",
                mesh: '',
                geometry: '',
                material: "LAMBERT",
                texture: true,
                materialParam: "HAIR",
                geometry: "CYLINDER",
                gParam1: 1,
                gParam2: 0.7,
                gParam3: 3,
                rotation: { p: 0, r: 0, y: 0},
                position: { x: -3, y: -3, z: 0.6},
                children: [],
                params: {castShadow: true, receiveShadow: true, bumpMap: "HAIR_BMAP", realWeight: 0 },
                weight: 0
            },
            {
                name: "TOSIA_LEG3",
                mesh: '',
                geometry: '',
                material: "LAMBERT",
                texture: true,
                materialParam: "HAIR",
                geometry: "CYLINDER",
                gParam1: 1,
                gParam2: 0.7,
                gParam3: 3,
                rotation: { p: 0, r: 0, y: 0},
                position: { x: 2, y: -3, z: 0.6},
                children: [],
                params: {castShadow: true, receiveShadow: true, bumpMap: "HAIR_BMAP", realWeight: 0 },
                weight: 0
            },
            {
                name: "TOSIA_LEG4",
                mesh: '',
                geometry: '',
                material: "LAMBERT",
                texture: true,
                materialParam: "HAIR",
                geometry: "CYLINDER",
                gParam1: 1,
                gParam2: 0.7,
                gParam3: 3,
                rotation: { p: 0, r: 0, y: 0},
                position: { x: 2, y: -3, z: -2},
                children: [],
                params: {castShadow: true, receiveShadow: true, bumpMap: "HAIR_BMAP", realWeight: 0 },
                weight: 0
            },
            {
                name: "TOSIA_TAIL",
                mesh: '',
                geometry: '',
                material: "LAMBERT",
                texture: true,
                materialParam: "HAIR",
                geometry: "BOX",
                gParam1: 4,
                gParam2: 1,
                gParam3: 1,
                rotation: { p: 0, r: 0, y: 0},
                position: { x: -7, y: 0, z: 0},
                children: [],
                params: {castShadow: true, receiveShadow: true, bumpMap: "HAIR_BMAP", realWeight: 0 },
                weight: 0
            },

        ],
        params: {castShadow: true, receiveShadow: true, realWeight: 0 },
        weight: 0
    },

];

export let level1Objects = [
    {
        name: "BLOCK1",
        mesh: '',
        geometry: '',
        material: "LAMBERT",
        texture: true,
        materialParam: "WOOD",
        geometry: "BOX",
        gParam1: 1.5,
        gParam2: 8,
        gParam3: 1.5,
        rotation: { p: 0, r: 0, y: 0},
        position: { x: 19, y: -9.5, z: 3},
        params: {castShadow: true, receiveShadow: true, bumpMap: "GRASS_BMAP", target: true}, //target is used to evaluate score (only takes "targets" into account)
        weight: 1,
        children: []
    },
    {
        name: "BLOCK2",
        mesh: '',
        geometry: '',
        material: "LAMBERT",
        texture: true,
        materialParam: "WOOD",
        geometry: "BOX",
        gParam1: 1.5,
        gParam2: 8,
        gParam3: 1.5,
        rotation: { p: 0, r: 0, y: 0},
        position: { x: 27, y: -9.5, z: 3},
        params: {castShadow: true, receiveShadow: true, bumpMap: "GRASS_BMAP", target: true},
        weight: 1,
        children: []
    },
    {
        name: "BLOCK3",
        mesh: '',
        geometry: '',
        material: "LAMBERT",
        texture: true,
        materialParam: "WOOD",
        geometry: "BOX",
        gParam1: 1.5,
        gParam2: 10,
        gParam3: 1.5,
        rotation: { p: 0, r: 90, y: 0},
        position: { x: 23, y: -4.75, z: 3},
        params: {castShadow: true, receiveShadow: true, bumpMap: "GRASS_BMAP", target: true},
        weight: 1,
        children: []
    },
    {
        name: "BLOCK3.5",
        mesh: '',
        geometry: '',
        material: "LAMBERT",
        texture: true,
        materialParam: "WOOD",
        geometry: "BOX",
        gParam1: 1.5,
        gParam2: 10,
        gParam3: 1.5,
        rotation: { p: 0, r: 90, y: 0},
        position: { x: 23, y: 4.75, z: 3},
        params: {castShadow: true, receiveShadow: true, bumpMap: "GRASS_BMAP", target: true},
        weight: 1,
        children: []
    },
    {
        name: "BLOCK4",
        mesh: '',
        geometry: '',
        material: "LAMBERT",
        texture: true,
        materialParam: "WOOD",
        geometry: "BOX",
        gParam1: 1.5,
        gParam2: 8,
        gParam3: 1.5,
        rotation: { p: 0, r: 0, y: 0},
        position: { x: 19, y: 0, z: 3},
        params: {castShadow: true, receiveShadow: true, bumpMap: "GRASS_BMAP", target: true},
        weight: 1,
        children: []
    },
    {
        name: "BLOCK5",
        mesh: '',
        geometry: '',
        material: "LAMBERT",
        texture: true,
        materialParam: "WOOD",
        geometry: "BOX",
        gParam1: 1.5,
        gParam2: 8,
        gParam3: 1.5,
        rotation: { p: 0, r: 0, y: 0},
        position: { x: 23, y: 0, z: 3},
        params: {castShadow: true, receiveShadow: true, bumpMap: "GRASS_BMAP", target: true},
        weight: 1,
        children: []
    },
    {
        name: "BLOCK6",
        mesh: '',
        geometry: '',
        material: "LAMBERT",
        texture: true,
        materialParam: "WOOD",
        geometry: "BOX",
        gParam1: 1.5,
        gParam2: 8,
        gParam3: 1.5,
        rotation: { p: 0, r: 0, y: 0},
        position: { x: 27, y: 0, z: 3},
        params: {castShadow: true, receiveShadow: true, bumpMap: "GRASS_BMAP", target: true},
        weight: 1,
        children: []
    }
];

export let level2Objects = [
    {
        name: "BLOCK1",
        mesh: '',
        geometry: '',
        material: "LAMBERT",
        texture: true,
        materialParam: "WOOD",
        geometry: "BOX",
        gParam1: 1.5,
        gParam2: 8,
        gParam3: 1.5,
        rotation: { p: 0, r: 0, y: 0},
        position: { x: 19, y: -9.5, z: 3},
        params: {castShadow: true, receiveShadow: true, bumpMap: "GRASS_BMAP", target: true}, //target is used to evaluate score (only takes "targets" into account)
        weight: 1,
        children: []
    },
    {
        name: "BLOCK2",
        mesh: '',
        geometry: '',
        material: "LAMBERT",
        texture: true,
        materialParam: "WOOD",
        geometry: "BOX",
        gParam1: 1.5,
        gParam2: 8,
        gParam3: 1.5,
        rotation: { p: 0, r: 0, y: 0},
        position: { x: 27, y: -9.5, z: 3},
        params: {castShadow: true, receiveShadow: true, bumpMap: "GRASS_BMAP", target: true},
        weight: 1,
        children: []
    },
    {
        name: "BLOCK3",
        mesh: '',
        geometry: '',
        material: "LAMBERT",
        texture: true,
        materialParam: "WOOD",
        geometry: "BOX",
        gParam1: 1.5,
        gParam2: 10,
        gParam3: 1.5,
        rotation: { p: 0, r: 90, y: 0},
        position: { x: 23, y: -4.75, z: 3},
        params: {castShadow: true, receiveShadow: true, bumpMap: "GRASS_BMAP", target: true},
        weight: 1,
        children: []
    },
    {
        name: "BLOCK3.5",
        mesh: '',
        geometry: '',
        material: "LAMBERT",
        texture: true,
        materialParam: "WOOD",
        geometry: "BOX",
        gParam1: 1.5,
        gParam2: 10,
        gParam3: 1.5,
        rotation: { p: 0, r: 90, y: 0},
        position: { x: 23, y: 4.75, z: 3},
        params: {castShadow: true, receiveShadow: true, bumpMap: "GRASS_BMAP", target: true},
        weight: 1,
        children: []
    },
    {
        name: "BLOCK4",
        mesh: '',
        geometry: '',
        material: "LAMBERT",
        texture: true,
        materialParam: "WOOD",
        geometry: "BOX",
        gParam1: 1.5,
        gParam2: 8,
        gParam3: 1.5,
        rotation: { p: 0, r: 0, y: 0},
        position: { x: 19, y: 0, z: 3},
        params: {castShadow: true, receiveShadow: true, bumpMap: "GRASS_BMAP", target: true},
        weight: 1,
        children: []
    },
    {
        name: "BLOCK5",
        mesh: '',
        geometry: '',
        material: "LAMBERT",
        texture: true,
        materialParam: "WOOD",
        geometry: "BOX",
        gParam1: 1.5,
        gParam2: 8,
        gParam3: 1.5,
        rotation: { p: 0, r: -25, y: 0},
        position: { x: 20.6, y: 9.4, z: 3},
        params: {castShadow: true, receiveShadow: true, bumpMap: "GRASS_BMAP", target: true},
        weight: 1,
        children: []
    },
    {
        name: "BLOCK5.5",
        mesh: '',
        geometry: '',
        material: "LAMBERT",
        texture: true,
        materialParam: "WOOD",
        geometry: "BOX",
        gParam1: 1.5,
        gParam2: 8,
        gParam3: 1.5,
        rotation: { p: 0, r: 25, y: 0},
        position: { x: 25.4, y: 9.4, z: 3},
        params: {castShadow: true, receiveShadow: true, bumpMap: "GRASS_BMAP", target: true},
        weight: 10,
        children: []
    },
    {
        name: "BLOCK6",
        mesh: '',
        geometry: '',
        material: "LAMBERT",
        texture: true,
        materialParam: "WOOD",
        geometry: "BOX",
        gParam1: 1.5,
        gParam2: 8,
        gParam3: 1.5,
        rotation: { p: 0, r: 0, y: 0},
        position: { x: 27, y: 0, z: 3},
        params: {castShadow: true, receiveShadow: true, bumpMap: "GRASS_BMAP", target: true},
        weight: 1,
        children: []
    }
];

export let level3Objects = [
    {
        name: "BOX1",
        mesh: '',
        geometry: '',
        material: "LAMBERT",
        texture: true,
        materialParam: "WOOD",
        geometry: "BOX",
        gParam1: 8,
        gParam2: 8,
        gParam3: 3,
        rotation: { p: 0, r: 0, y: 0},
        position: { x: -5, y: -9.5, z: 3},
        params: {castShadow: true, receiveShadow: true, bumpMap: "GRASS_BMAP", target: false},
        weight: 10,
        children: []
    },
    {
        name: "BOX2",
        mesh: '',
        geometry: '',
        material: "LAMBERT",
        texture: true,
        materialParam: "WOOD",
        geometry: "BOX",
        gParam1: 8,
        gParam2: 8,
        gParam3: 3,
        rotation: { p: 0, r: 0, y: 0},
        position: { x: 3, y: -9.5, z: 3},
        params: {castShadow: true, receiveShadow: true, bumpMap: "GRASS_BMAP", target: false},
        weight: 10,
        children: []
    },
    {
        name: "BOX3",
        mesh: '',
        geometry: '',
        material: "LAMBERT",
        texture: true,
        materialParam: "WOOD",
        geometry: "BOX",
        gParam1: 8,
        gParam2: 8,
        gParam3: 3,
        rotation: { p: 0, r: 0, y: 0},
        position: { x: -1, y: -1.5, z: 3},
        params: {castShadow: true, receiveShadow: true, bumpMap: "GRASS_BMAP", target: false},
        weight: 10,
        children: []
    },
    {
        name: "BOX4",
        mesh: '',
        geometry: '',
        material: "LAMBERT",
        texture: true,
        materialParam: "WOOD",
        geometry: "BOX",
        gParam1: 8,
        gParam2: 8,
        gParam3: 3,
        rotation: { p: 0, r: 0, y: 0},
        position: { x: 13, y: -9.5, z: 3},
        params: {castShadow: true, receiveShadow: true, bumpMap: "GRASS_BMAP", target: false},
        weight: 10,
        children: []
    },
    {
        name: "BLOCK1",
        mesh: '',
        geometry: '',
        material: "LAMBERT",
        texture: true,
        materialParam: "WOOD",
        geometry: "BOX",
        gParam1: 1.5,
        gParam2: 8,
        gParam3: 1.5,
        rotation: { p: 0, r: 0, y: 0},
        position: { x: 23, y: -9.5, z: 3},
        params: {castShadow: true, receiveShadow: true, bumpMap: "GRASS_BMAP", target: true},
        weight: 1,
        children: []
    },
    {
        name: "BLOCK2",
        mesh: '',
        geometry: '',
        material: "LAMBERT",
        texture: true,
        materialParam: "WOOD",
        geometry: "BOX",
        gParam1: 1.5,
        gParam2: 8,
        gParam3: 1.5,
        rotation: { p: 0, r: 0, y: 0},
        position: { x: 27, y: -9.5, z: 3},
        params: {castShadow: true, receiveShadow: true, bumpMap: "GRASS_BMAP", target: true},
        weight: 1,
        children: []
    },
    {
        name: "BLOCK3",
        mesh: '',
        geometry: '',
        material: "LAMBERT",
        texture: true,
        materialParam: "WOOD",
        geometry: "BOX",
        gParam1: 1.5,
        gParam2: 8,
        gParam3: 1.5,
        rotation: { p: 0, r: 0, y: 0},
        position: { x: 23, y: -1.5, z: 3},
        params: {castShadow: true, receiveShadow: true, bumpMap: "GRASS_BMAP", target: true},
        weight: 1,
        children: []
    },
    {
        name: "BLOCK5",
        mesh: '',
        geometry: '',
        material: "LAMBERT",
        texture: true,
        materialParam: "WOOD",
        geometry: "BOX",
        gParam1: 1.5,
        gParam2: 8,
        gParam3: 1.5,
        rotation: { p: 0, r: 0, y: 0},
        position: { x: 27, y: -1.5, z: 3},
        params: {castShadow: true, receiveShadow: true, bumpMap: "GRASS_BMAP", target: true},
        weight: 1,
        children: []
    },
    {
        name: "BLOCK6",
        mesh: '',
        geometry: '',
        material: "LAMBERT",
        texture: true,
        materialParam: "WOOD",
        geometry: "BOX",
        gParam1: 1.5,
        gParam2: 8,
        gParam3: 1.5,
        rotation: { p: 0, r: 0, y: 0},
        position: { x: 23, y: 6.5, z: 3},
        params: {castShadow: true, receiveShadow: true, bumpMap: "GRASS_BMAP", target: true},
        weight: 10,
        children: []
    },
    {
        name: "BLOCK6",
        mesh: '',
        geometry: '',
        material: "LAMBERT",
        texture: true,
        materialParam: "WOOD",
        geometry: "BOX",
        gParam1: 1.5,
        gParam2: 8,
        gParam3: 1.5,
        rotation: { p: 0, r: 0, y: 0},
        position: { x: 27, y: 6.5, z: 3},
        params: {castShadow: true, receiveShadow: true, bumpMap: "GRASS_BMAP", target: true},
        weight: 1,
        children: []
    }
];

export let levelCommonObjects = [
    {
        name: "BACKGROUND", //name of the mesh
        mesh: '', //placeholder for the mesh
        geometry: '', //placeholder for the geometry
        material: "", //placeholder for the material
        texture: true, //uses texture?
        materialParam: "MENU_BACKGROUND", //texture/color
        geometry: "PLANE", //geometry type
        gParam1: 600, //geometry parameters (dimensions)
        gParam2: 200, //geometry parameters (dimensions)
        gParam3: 0, //geometry parameters (dimensions)
        rotation: { p: 0, r: 0, y: 0}, //initial rotation (applied in order left->right as defined here)
        position: { x: 0, y: 3, z: -60}, //initial position
        params: {castShadow: false, receiveShadow: false, realWeight: 0 }, //additional parameters (optionals)
        weight: 0, //physijs weight
        children: [] //children objects (following same structure as this one)
    },
    {
        name: "PROJECTING_PLANE", //name of the mesh
        mesh: '', //placeholder for the mesh
        geometry: '', //placeholder for the geometry
        material: "", //placeholder for the material
        texture: false, //uses texture?
        materialParam: 0, //texture/color
        geometry: "PLANE_NO_PHYS", //geometry type
        gParam1: 290, //geometry parameters (dimensions)
        gParam2: 138, //geometry parameters (dimensions)
        gParam3: 0, //geometry parameters (dimensions)
        rotation: { p: 0, r: 0, y: 0}, //initial rotation (applied in order left->right as defined here)
        position: { x: 0, y: 3, z: 3}, //initial position
        params: {castShadow: false, receiveShadow: false, visible: false, realWeight: 0 }, //additional parameters (optionals)
        weight: 0, //physijs weight
        children: [] //children objects (following same structure as this one)
    },
    {
        name: "BOUNDARY_PLANE", //name of the mesh
        mesh: '', //placeholder for the mesh
        geometry: '', //placeholder for the geometry
        material: "", //placeholder for the material
        texture: false, //uses texture?
        materialParam: 0, //texture/color
        geometry: "PLANE", //geometry type
        gParam1: 10000, //geometry parameters (dimensions)
        gParam2: 1380, //geometry parameters (dimensions)
        gParam3: 0, //geometry parameters (dimensions)
        rotation: { p: 0, r: 0, y: 0}, //initial rotation (applied in order left->right as defined here)
        position: { x: 0, y: 3, z: 0}, //initial position
        params: {castShadow: false, receiveShadow: false, visible: false, realWeight: 0 }, //additional parameters (optionals)
        weight: 0, //physijs weight
        children: [] //children objects (following same structure as this one)
    },
    {
        name: "BOUNDARY_PLANE2", //name of the mesh
        mesh: '', //placeholder for the mesh
        geometry: '', //placeholder for the geometry
        material: "", //placeholder for the material
        texture: false, //uses texture?
        materialParam: 0, //texture/color
        geometry: "PLANE", //geometry type
        gParam1: 80000, //geometry parameters (dimensions)
        gParam2: 10000, //geometry parameters (dimensions)
        gParam3: 0, //geometry parameters (dimensions)
        rotation: { p: 0, r: 0, y: 90}, //initial rotation (applied in order left->right as defined here)
        position: { x: 140, y: 3, z: 0.5}, //initial position
        params: {castShadow: false, receiveShadow: false, visible: false, realWeight: 0 }, //additional parameters (optionals)
        weight: 0, //physijs weight
        children: [] //children objects (following same structure as this one)
    },
    {
        name: "GROUND",
        mesh: '',
        geometry: '',
        material: "LAMBERT",
        texture: true,
        materialParam: "GRASS",
        geometry: "BOX",
        gParam1: 500,
        gParam2: 3,
        gParam3: 100,
        rotation: { p: 0, r: 0, y: 0},
        position: { x: 0, y: -15, z: 45},
        children: [],
        params: {castShadow: true, receiveShadow: true, bumpMap: "GRASS_BMAP", realWeight: 0 },
        weight: 0
    },
    {
        name: "FORCE_INDICATOR",
        mesh: '',
        geometry: '',
        material: "",
        texture: true,
        materialParam: "FORCE",
        geometry: "PLANE",
        gParam1: 3,
        gParam2: 8,
        gParam3: 1,
        rotation: { p: 0, r: 0, y: 0},
        position: { x: -65, y: -8, z: 4},
        children: [],
        params: {castShadow: false, receiveShadow: false, realWeight: 0, visible: false },
        weight: 0
    },
    {
        name: "TOSIA",
        mesh: '',
        geometry: '',
        material: "LAMBERT",
        texture: true,
        materialParam: "TOSIA_BODY",
        geometry: "BOX",
        gParam1: 5,
        gParam2: 1.7,
        gParam3: 1.7,
        rotation: { p: 0, r: 0, y: 0},
        position: { x: -60, y: -10, z: 3},
        params: {castShadow: true, receiveShadow: true, realWeight: 40 },
        weight: 0,
        children: [
            {
                name: "TOSIA_HEAD",
                mesh: '',
                geometry: '',
                material: "LAMBERT",
                texture: true,
                materialParam: "HEAD",
                geometry: "BOX",
                gParam1: 2.8,
                gParam2: 2.8,
                gParam3: 2,
                rotation: { p: 0, r: -90, y: 0},
                position: { x: 3.7, y: 0, z: 0.3},
                params: {castShadow: true, receiveShadow: true},
                weight: 1,
                children: [
                    {
                        name: "TOSIA_KASK",
                        mesh: '',
                        geometry: '',
                        material: "LAMBERT",
                        texture: false,
                        materialParam: 0xffA0A0,
                        geometry: "BOX",
                        gParam1: 3,
                        gParam2: 1.1,
                        gParam3: 2.1,
                        rotation: { p: 0, r: 0, y: 0},
                        position: { x: 0, y: 1.25, z: 0},
                        params: {castShadow: true, receiveShadow: true, bumpMap: "COTTON_BMAP"},
                        weight: 1,
                        children: [
                            {
                                name: "TOSIA_KASK2",
                                mesh: '',
                                geometry: '',
                                material: "LAMBERT",
                                texture: false,
                                materialParam: 0xffA0A0,
                                geometry: "SPHERE",
                                gParam1: 1,
                                gParam2: 1,
                                gParam3: 1,
                                rotation: { p: 0, r: 0, y: 0},
                                position: { x: 0, y: 0.5, z: 0},
                                params: {castShadow: true, receiveShadow: true, bumpMap: "COTTON_BMAP"},
                                weight: 1,
                                children: [
                                    {
                                        name: "TOSIA_KASK3",
                                        mesh: '',
                                        geometry: '',
                                        material: "LAMBERT",
                                        texture: false,
                                        materialParam: 0xffA0A0,
                                        geometry: "SPHERE",
                                        gParam1: 0.5,
                                        gParam2: 1,
                                        gParam3: 15,
                                        rotation: { p: 0, r: 0, y: 0},
                                        position: { x: 0, y: 1.2, z: 0},
                                        params: {castShadow: true, receiveShadow: true, bumpMap: "COTTON_BMAP"},
                                        weight: 1,
                                        children: []
                                    }
                                ]
                            },
                            {
                                name: "TOSIA_KASK_BOK1",
                                mesh: '',
                                geometry: '',
                                material: "LAMBERT",
                                texture: false,
                                materialParam: 0xffA0A0,
                                geometry: "BOX",
                                gParam1: 0.1,
                                gParam2: 2.3,
                                gParam3: 1.5,
                                rotation: { p: 0, r: 0, y: 0},
                                position: { x: 1.4, y: -1.5, z: 0},
                                params: {castShadow: true, receiveShadow: true, bumpMap: "COTTON_BMAP"},
                                weight: 1,
                                children: []
                            },
                            {
                                name: "TOSIA_KASK_BOK2",
                                mesh: '',
                                geometry: '',
                                material: "LAMBERT",
                                texture: false,
                                materialParam: 0xffA0A0,
                                geometry: "BOX",
                                gParam1: 0.1,
                                gParam2: 2.3,
                                gParam3: 1.5,
                                rotation: { p: 0, r: 0, y: 0},
                                position: { x: -1.5, y: -1.5, z: 0},
                                params: {castShadow: true, receiveShadow: true, bumpMap: "COTTON_BMAP"},
                                weight: 1,
                                children: []
                            }
                        ]
                    },
                ]
            },
            {
                name: "TOSIA_LEG1",
                mesh: '',
                geometry: '',
                material: "LAMBERT",
                texture: true,
                materialParam: "HAIR",
                geometry: "CYLINDER",
                gParam1: 0.50,
                gParam2: 0.25,
                gParam3: 1,
                rotation: { p: 20, r: -45, y: 0},
                position: { x: -1.5, y: -1, z: -0.4},
                params: {castShadow: true, receiveShadow: true, bumpMap: "HAIR_BMAP"},
                weight: 1,
                children: [],
            },
            {
                name: "TOSIA_LEG2",
                mesh: '',
                geometry: '',
                material: "LAMBERT",
                texture: true,
                materialParam: "HAIR",
                geometry: "CYLINDER",
                gParam1: 0.5,
                gParam2: 0.25,
                gParam3: 1,
                rotation: { p: -20, r: -45, y: 0},
                position: { x: -1.5, y: -1, z: 0.4},
                params: {castShadow: true, receiveShadow: true, bumpMap: "HAIR_BMAP"},
                weight: 1,
                children: [],
            },
            {
                name: "TOSIA_LEG3",
                mesh: '',
                geometry: '',
                material: "LAMBERT",
                texture: true,
                materialParam: "HAIR",
                geometry: "CYLINDER",
                gParam1: 0.5,
                gParam2: 0.25,
                gParam3: 1,
                rotation: { p: -20, r: -45, y: 0},
                position: { x: 2, y: -1, z: 0.4},
                params: {castShadow: true, receiveShadow: true, bumpMap: "HAIR_BMAP"},
                weight: 1,
                children: [],
            },
            {
                name: "TOSIA_LEG4",
                mesh: '',
                geometry: '',
                material: "LAMBERT",
                texture: true,
                materialParam: "HAIR",
                geometry: "CYLINDER",
                gParam1: 0.5,
                gParam2: 0.25,
                gParam3: 1,
                rotation: { p: 20, r: -45, y: 0},
                position: { x: 2, y: -1, z: -0.4},
                params: {castShadow: true, receiveShadow: true, bumpMap: "HAIR_BMAP"},
                weight: 1,
                children: [],
            },
            {
                name: "TOSIA_TAIL",
                mesh: '',
                geometry: '',
                material: "LAMBERT",
                texture: true,
                materialParam: "HAIR",
                geometry: "CYLINDER",
                gParam1: 0.25,
                gParam2: 0.25,
                gParam3: 3,
                rotation: { p: 0, r: 45, y: 0},
                position: { x: -3, y: 1, z: 0},
                params: {castShadow: true, receiveShadow: true, bumpMap: "HAIR_BMAP"},
                weight: 1,
                children: [],
            }
        ]
    }
]
