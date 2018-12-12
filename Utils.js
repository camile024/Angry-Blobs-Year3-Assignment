import { textures } from "./ResourceManager.js";

/* Sets the 'scene' with the objects in the 'objects' array and adds them to the given
 * world.worlObjects array
 * Note - the objects are NOT meshes, they're JSON objects with format as in worldObjects.js */
export function setScene(scene, objects, worldObjectArray) {
    for (let object of objects) {
        let mesh = createMesh(object);
        object.mesh = mesh;
        worldObjectArray.push(object);
        scene.add(mesh);

        /* Objects with mass 0 might become dynamic later on, rather than initialise them with 0 mass,
         * set their factors to 0 instead, so they can be reactivated later */
         /* Has to be done AFTER mesh is added to the scene */
        if (object.weight == 0 && (object.weight != object.params.realWeight) && mesh instanceof Physijs.Mesh) {
            mesh.setAngularFactor(new THREE.Vector3(0,0,0));
            mesh.setLinearFactor(new THREE.Vector3(0,0,0));
            mesh.setLinearVelocity(new THREE.Vector3(0,0,0));
            mesh.setAngularVelocity(new THREE.Vector3(0,0,0));
        }
    }

}

/* Creates a mesh for the given object (JSON) */
export function createMesh(object) {
    let geometry, mesh, material, weight;

    /* So the outside function can detect the difference */
    if (object.weight == 0) {
        weight = object.params.realWeight;
    }

    material = getMaterial(object);

    switch (object.geometry) {
        case "SPHERE":
            geometry = new THREE.SphereGeometry(object.gParam1,object.gParam2,object.gParam3);
            mesh = new Physijs.SphereMesh(geometry, material, weight);
        break;
        case "PLANE":
            geometry = new THREE.PlaneGeometry(object.gParam1,object.gParam2);
            mesh = new Physijs.BoxMesh(geometry, material, weight);
        break;
        case "PLANE_NO_PHYS":
            geometry = new THREE.PlaneGeometry(object.gParam1,object.gParam2);
            mesh = new THREE.Mesh(geometry, material);
        break;
        case "BOX":
            geometry = new THREE.CubeGeometry(object.gParam1,object.gParam2, object.gParam3);
            mesh = new Physijs.BoxMesh(geometry, material, weight);
        break;
        case "CIRCLE":
            geometry = new THREE.CircleGeometry(object.gParam1,object.gParam2);
            mesh = new Physijs.SphereMesh(geometry, material, weight);
        break;
        case "CYLINDER":
            geometry = new THREE.CylinderGeometry(object.gParam1,object.gParam2, object.gParam3, 30);
            mesh = new Physijs.CylinderMesh(geometry, material, weight);
        break;

    }


    mesh.name = object.name;
    mesh.position.set(object.position.x, object.position.y, object.position.z);
    rotate(mesh, object);
    applyParams(mesh, object);

    for (let child of object.children) {
        let childMesh = createMesh(child); //recursive call
        mesh.add(childMesh);
        child.mesh = childMesh;
    }

    return mesh;
}

/* Creates material for the given JSON object */
export function getMaterial(object) {
    let material;
    let parameter;

    /* Refresh reference in worldObjects if texture needed */
    if (object.texture == true) {
        parameter = { map: textures[object.materialParam].texture };
    } else {
        parameter = { color: object.materialParam, side: THREE.DoubleSide };
    }
    switch (object.material) {
        case "BASIC":
            material = new THREE.MeshStandardMaterial(parameter);
            break;
        case "LAMBERT":
            material = new Physijs.createMaterial(new THREE.MeshPhongMaterial(parameter,0.1));
            break;
        default:
            material = new THREE.MeshBasicMaterial(parameter);
            break;
    }
    return material;
}

export function rotate(mesh, object) {
    mesh.rotateX(THREE.Math.degToRad(object.rotation.p));
    mesh.rotateY(THREE.Math.degToRad(object.rotation.y));
    mesh.rotateZ(THREE.Math.degToRad(object.rotation.r));
}

/* Checks for extra/optional parameters present in the game and applies shading */
export function applyParams(mesh, object) {
    if (object.params.castShadow == true) {
        mesh.castShadow = true;
    }
    if (object.params.receiveShadow == true) {
        mesh.receiveShadow = true;
    }
    if (object.params.bumpMap != null) {
        mesh.material.bumpMap = textures[object.params.bumpMap].texture;
    }
    if (object.params.visible != null) {
        mesh.material.visible = object.params.visible;
    }

    mesh.geometry.computeVertexNormals();
    mesh.material.shading = THREE.SmoothShading;
}

/* Lights same for each scene */
export function setUpCommonLights(scene) {
    let light = new THREE.HemisphereLight( 0xffffff, 0x000000, 0.3 );
    let light2 = new THREE.AmbientLight(0xffffff, 0.3);
    let light3 = new THREE.PointLight(0xf6ffce, 0.4, 0);
    light3.castShadow = true;
    light.shadowCameraVisible = true;
    light3.shadowCameraVisible = true;
    light.position.set( 1, 1, 0 ).normalize();
    light3.position.set( -50, 25, 13);
    scene.add(light);
    scene.add(light2);
    scene.add(light3);
}

/* Updates text inside the 'debug' div based on multiple data */
export function setDebugElement(initialise, world) {
    let str = "Current state: " + world.worldFSM.currentState + "<br/>world.advanceState: " + initialise + "<br/>";
    str += "Current level: " + world.currentLevel + "<br/>";
    str += "Mouse: (" + world.mouse.x + ", " + world.mouse.y + ") <br />";
    str += "Force:" + world.force + ", Angle: " + world.angle + "<br />";
    let tosia = world.getObjectByName("TOSIA");
    if (tosia != null) {
        str += "Tosia position: " + "[" + tosia.mesh.position.x + ", " + tosia.mesh.position.y + ", " + tosia.mesh.position.z + "]<br / >";
        str += "Ang. Velocity: [" + tosia.mesh.getAngularVelocity().x + ", " + tosia.mesh.getAngularVelocity().y + ", " + tosia.mesh.getAngularVelocity().z + "], Lin. Velocity: ["
            + tosia.mesh.getLinearVelocity().x + ", " + tosia.mesh.getLinearVelocity().y + ", " + tosia.mesh.getLinearVelocity().z + "]<br />";
        str += "Weight: " + tosia.weight + "<br />";
    }
    str += "Input delay: " + world.worldFSM.t_input_disable + "<br />";
    document.getElementById("debugContainer").innerHTML = str;
    document.getElementById("debugContainer").style.display = "block";
}

/* Draws the line (only used for the mouse<->dog in debug mode) */
export function drawLine(from, to, col, scene) {
    let material = new THREE.LineBasicMaterial({color: col});
    let geometry = new THREE.Geometry();
    let line;
    geometry.vertices.push(new THREE.Vector3(from.x, from.y, from.z),
                            new THREE.Vector3(to.x, to.y, to.z));
    line = new THREE.Line(geometry, material);
    scene.add(line);
    return line;
}

/* Updates dog's angle */
export function setShootAngle(object, angle) {
    object.rotation.z = angle;
    object.__dirtyRotation = true;
}

/* Sets the velocity and factors of the dog */
export function shoot(object, force, angle) {
    object.setAngularFactor(new THREE.Vector3(1,1,1));
    object.setLinearFactor(new THREE.Vector3(2,1,0));
    object.setAngularVelocity(new THREE.Vector3(15,10,0));
    object.setLinearVelocity(new THREE.Vector3(force * 0.5 + 15, angle * force * 0.4 + 5, 0));
}

/* Updates HTML */
export function updateTurnText(string) {
    document.getElementById("turnDiv").innerHTML = "<p id='turnContainer' class='turnText'>Current Turn: <font color='red'>" + string +"</font></p>";
}

/* Clears the scene + worldObjects array */
export function clearObjects(world) {
    while(world.scene.children.length > 0){
        world.scene.remove(world.scene.children[0]);
    }
    world.worldObjects.length = 0;
}

/* Updates HTML */
export function updateScores(world) {
    document.getElementById("scoresDiv").innerHTML = "<p id='scoresContainer' class='scoresText'>Score (Player): " + world.scores[0] + " <br/> Score (AI): " + world.scoresAI[0] + "</p>";
}

/* Updates the force bar size next to the dog */
export function updateForceBar(world) {
    let bar = world.getMeshByName("FORCE_INDICATOR");
    bar.scale.set(1, world.force / 100, 1);
}

/* Switches the force bar on/off */
export function toggleForceBar(world) {
    let bar = world.getMeshByName("FORCE_INDICATOR");
    bar.material.visible = !bar.material.visible;
}
