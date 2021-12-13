# CG FP Snake_Game

### Jaya Jaya Team Members:

1. 05111942000010 – Agustinus Aldi Irawan Rahardja

2. 05111942000025 – Gilbert Kurniawan Haryanto
 
3. 05111942000026 – Julius Adetya Eka Bhaswara

4. 05111942000023 – Khairi Wiryawan

5. 05111942000007 – Salsabila Irbah

6. 05111942000014 - Muhammad Rafi Hayla

## Overview

We want to create one of our childhood games which is still popular until now. 

We are going to use a 3d perspective instead of the usual 2d perspective. 

We also wanted to add additional features like the lighting and debuffing food instead of power up food.

More unique features will be added as we progress in creating the game

## 3D Environment Sketch

![image](https://user-images.githubusercontent.com/61174498/145721726-2b99fc71-d6e2-4e13-a2d7-8f0ae9b11fec.png)

Because this is the snake game, as we know the purpose of this game is to gain points by arranging the snake to “eat” the points and not make the snake crash the obstacle / wall. Because when the snake crashes the wall, the game is over. The differences between this game and the original one is in the lighting sources. When the snake moves, the line of sight of the snake also moves along with the snake. There will also be food with debuffs like blind which make the line of sight very small, thus making the game more challenging.

## Interaction and Technology

A.) Input

1. Keyboard

2. Mouse

B.) Output

1. Monitor

2. Speaker

## Object Dynamic

### Local Variable

1. Three.js library

### External Variable

1. We haven’t think of any API that we will use, but we might use one during development process like in three.js documentation.

https://threejs.org/docs/#manual/en/buildTools/Testing-with-NPM

## Github Interaction (Commit and Push)

These are the steps-by-steps method:

1.) Install Git

2.) Remember to have .md files (can be void)

3.) Move to the folder of the files using command prompt

4.) Initialize git

```
git init
```

5.) You can check status using 

```
git status
```

6.) Add all files

```
git add .
```

7.) Commit using 

```
git commit -m "Commit Message" .
```

8.) Add origin

```
git remote add origin "https://github.com/cg2021iup/final-project-jaya-jaya-jaya-team"
```

9.) Push

```
git push -u origin master
```

10.) Check that all the files have been uploaded in repository

## Steps:

### 1 Creating the board, a still snake, some lighting, and the skeleton

### Board

index.html

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>SNAKE TRIAL</title>

    <style>
        body {
            margin: 0%;
            background-color: grey;
        }

        canvas {
            width: 100%;
            height: 100%;
            display: block;
        }
    </style>

</head>

<body>

    <script src="js/libraries/three/build/three.min.js"></script>

    <script src="js/setup.js"></script>

    <script src="js/controller.js"></script>
    <script src="js/player.js"></script>

    <script src="js/game.js"></script>
</body>

</html>
```

game.js
```
//// ////
let raycaster;
let mouse;

let world = {
    width: 60,
    height: 60
}

/**
 * backgroundPlane
 */
let backgroundPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(world.width, world.height, 1, 1),
    new THREE.MeshPhongMaterial({
        color: 0xFFFFFF
    })
);
backgroundPlane.position.z = -1;
backgroundPlane.receiveShadow = true;
scene.add(backgroundPlane);
////    ////    ////
///    ////    ////
//    ////    ////
```

setup.js
```
//// ////
/**
 * Create a WebGLRenderer with shadows in the renderer
 */
const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
////    ////    ////
///    ////    ////
//    ////    ////

/**
 * This is the scene
 */
const scene = new THREE.Scene();
////    ////    ////
///    ////    ////
//    ////    ////

/**
 * This is the camera
 */
const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    10000
);
camera.position.z = 50;

// onWindowResize
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;
    renderer.setSize(canvasWidth, canvasHeight);
    camera.aspect = canvasWidth / canvasHeight;
    camera.updateProjectionMatrix();
}
```

controller.js
```
//// ////
/**
 * @class - Controller class for handling all Controller input
 */
class Controller {
    constructor() {

        this.mouseRaycaster = new THREE.Raycaster();
        this.htmlmouse = new THREE.Vector2();
        this.mouse = new THREE.Vector3();

        let spriteMap = new THREE.TextureLoader().load("./assets/images/pointer.png");

        let spriteMaterial = new THREE.SpriteMaterial({
            map: spriteMap,
            color: 0xffffff
        });
        this.mouseSprite = new THREE.Sprite(spriteMaterial);
        scene.add(this.mouseSprite);
    }

    /**
     * @function - Controller update function, Called for each keyup and keydown
     */
    update() {

    }

    /**
     * @function - Controller setup function
     */
    setup() {
        //// mousemove ////
        window.addEventListener('mousemove', onMouseMove, false);

    }

}

function onMouseMove(event) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    controller.htmlmouse.setX((event.clientX / window.innerWidth) * 2 - 1);
    controller.htmlmouse.setY(-(event.clientY / window.innerHeight) * 2 + 1);
}
```

### Snake

game.js
```
/**
 * player
 */
let player = new Player();
////    ////    ////
///    ////    ////
//    ////    ////
```

player.js
```
//// ////
class Player {
    constructor() {
        this.pos = new THREE.Vector2(0, 0);
        this.vel = new THREE.Vector2(0, 0);
        this.acc = new THREE.Vector2(0, 0);

        this.snakeLen = 5;

        this.head = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshLambertMaterial({
                color: 0x00ff00
            })
        );
        scene.add(this.head);


        this.pointLight = new THREE.PointLight(0x00ff00, 1, 20);
        scene.add(this.pointLight);


    }

    update() {

    }

}
```

### Lighting

game.js
```
/**
 * ambientLight
 */
let ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight); //
////    ////    ////
///    ////    ////
//    ////    ////

/**
 * directionalLight 
 */
var directionalLight = new THREE.PointLight(0xffffff, 1, 500, 0.01);
directionalLight.castShadow = true; // default false

//Set up shadow properties for the light
directionalLight.shadow.mapSize.width = 5120; // default 512
directionalLight.shadow.mapSize.height = 5120; // default 512
directionalLight.shadow.camera.near = 0; // default
directionalLight.shadow.camera.far = 1000
// default
scene.add(directionalLight);
```

### Skeleton

game.js
```
/**
 * Game controller for all user input
 */
let controller = new Controller();
controller.setup();
////    ////    ////
///    ////    ////
//    ////    ////

/**
 * Time Keeper
 */
let clock = new THREE.Clock(true);
////    ////    ////
///    ////    ////
//    ////    ////

////    ////    ////
///    ////    ////
//    ////    ////
function setup() {
    
}


let deltaTime;
let then = 0;
let frameCount = 0;
/**
 * @description Master Function for running the game   
 * requestAnimationFrame(gameLoop);  
 * update();  
 * render();  
 */
function gameLoop(now) {

    now *= 0.001; // make it seconds

    deltaTime = now - then;
    then = now;

    requestAnimationFrame(gameLoop);
    frameCount++;

    if (frameCount > 10) {
        update();
        render();
    }

}
////    ////    ////
///    ////    ////
//    ////    ////

/**
 * update
 */
function update() {

    controller.update();

}
////    ////    ////
///    ////    ////
//    ////    ////

/**
 * render
 */
function render() {
    renderer.render(scene, camera);
}
////    ////    ////
///    ////    ////
//    ////    ////

setup();
gameLoop();

////////////////////////////////////
```
