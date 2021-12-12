//          ////////////////////////////
//         ////     SNAKE GAME     ////
//        ////    Created By      ////
//       ////   Jaya Jaya Team   ////
//      ////////////////////////////

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