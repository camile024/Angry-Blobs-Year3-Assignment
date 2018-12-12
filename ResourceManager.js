const texturesPath = "resources/textures/";
const imagesPath = "resources/images/";

/* Bump maps generated from: http://cpetry.github.io/NormalMap-Online/
 * Although they're not really bump maps (as I fed the generator the texture images) they can pass
 * for the visual effect */
export const textures = {
    "HEAD" : {
                filename: texturesPath + "tosia.jpg",
                name: "sun",
                texture: {},
                wrapS: THREE.RepeatWrapping,
                wrapT: THREE.RepeatWrapping,
                repeat: [1,1]
    },
    "HAIR" : {
                filename: texturesPath + "tosia_hair.jpg",
                name: "hair",
                texture: {},
                wrapS: THREE.RepeatWrapping,
                wrapT: THREE.RepeatWrapping,
                repeat: [1,1]
    },
    "MENU_BACKGROUND" : {
                filename: imagesPath + "menu_bg.png",
                name: "menu_background",
                texture: {},
                wrapS: THREE.ClampToEdgeWrapping,
                wrapT: THREE.ClampToEdgeWrapping,
                repeat: [1,1]
    },
    "TOSIA_BODY" : {
                filename: texturesPath + "tosia_body.jpg",
                name: "tosia_body",
                texture: {},
                wrapS: THREE.ClampToEdgeWrapping,
                wrapT: THREE.ClampToEdgeWrapping,
                repeat: [1,1]
    },
    "GRASS" : {
                filename: texturesPath + "grass.png",
                name: "grass",
                texture: {},
                wrapS: THREE.RepeatWrapping,
                wrapT: THREE.RepeatWrapping,
                repeat: [15,1]
    },
    "WOOD" : {
                filename: texturesPath + "wood.png",
                name: "wood",
                texture: {},
                wrapS: THREE.RepeatWrapping,
                wrapT: THREE.RepeatWrapping,
                repeat: [2,1]
    },
    "FORCE" : {
                filename: texturesPath + "force.jpg",
                name: "force",
                texture: {},
                wrapS: THREE.RepeatWrapping,
                wrapT: THREE.RepeatWrapping,
                repeat: [1,1]
    },
    "GRASS_BMAP" : {
                filename: texturesPath + "grass_bmap.jpg",
                name: "grass_bmap",
                texture: {},
                wrapS: THREE.RepeatWrapping,
                wrapT: THREE.RepeatWrapping,
                repeat: [40,2]
    },
    "HAIR_BMAP" : {
                filename: texturesPath + "hair_bmap.jpg",
                name: "hair_bmap",
                texture: {},
                wrapS: THREE.RepeatWrapping,
                wrapT: THREE.RepeatWrapping,
                repeat: [3,3]
    },
    "TOSIA_BODY_BMAP" : {
                filename: texturesPath + "tosia_body_bmap.jpg",
                name: "body_bmap",
                texture: {},
                wrapS: THREE.RepeatWrapping,
                wrapT: THREE.RepeatWrapping,
                repeat: [1,1]
    },
    "TOSIA_HEAD_BMAP" : {
                filename: texturesPath + "tosia_head_bmap.jpg",
                name: "head_bmap",
                texture: {},
                wrapS: THREE.RepeatWrapping,
                wrapT: THREE.RepeatWrapping,
                repeat: [10,10]
    },
    "COTTON_BMAP" : {
                filename: texturesPath + "cotton_bmap.jpg",
                name: "cotton_bmap",
                texture: {},
                wrapS: THREE.ClampToEdgeWrapping,
                wrapT: THREE.ClampToEdgeWrapping,
                repeat: [1,1]
    }
};

export class ResourceManager {
    constructor() {

    }

    /*
     * Initialises all the resources, loading textures and assigning them in the array
     *
     * self - current ResourceManager instance - used as a reference during promises (as 'this'
     * keyword changes context when promise is entered)
     *
     * Returns promises that are resolved after all textures are loaded
     */
    initialise() {
        let textureLoader = new THREE.TextureLoader();
        let promises = [];
        let self = this;
        for (let object of Object.values(textures)) {
            promises.push(new Promise(function(resolve, reject){
                textureLoader.load(object.filename, function( texture ) {
                    texture.wrapS = object.wrapS;
                    texture.wrapT = object.wrapT;
                    texture.repeat.set(object.repeat[0], object.repeat[1]);
                    texture.name = object.name;
                    object.texture = texture;
                    resolve();
                });
            }));

        }
        return promises;
    }
}
