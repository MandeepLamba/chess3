import * as THREE from 'three';
import './style.css';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {
    getBackgroundSphere,
    getBoardGroup,
    getLight,
    createRenderer,
    createCamera
} from './items.js';
import {getPiecesMap} from "./glb_manager.js";
import {GameManager} from "./game.js";
import {highlightMaterial} from "./materials.js";

const scene = new THREE.Scene();
const canvas = document.querySelector('.webgl')
const camera = createCamera()
camera.position.set(10, 20, 0);

scene.add(
    getBoardGroup(),
    getBackgroundSphere(),
    // new THREE.AxesHelper(25), // Axes helper
)


const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let highlight = new THREE.Group();
let selectedPiece = null;
let currentPositions = null;

canvas.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
        const object = intersects[0].object;
        if (object.material === highlightMaterial) {
            console.log('clicked highlight:');

            game.movePiece(
                game.convertPositionToIndex(selectedPiece.position),
                game.convertPositionToIndex(object.position),
            )
            scene.remove(currentPositions)
            currentPositions = game.updatePositions()
            scene.add(currentPositions)
            scene.remove(highlight)
        } else {
            const loc = game.convertPositionToIndex(object.position)
            selectedPiece = game.board[loc[0]][loc[1]];
            console.log('selectedPiece: ', selectedPiece);
            scene.remove(highlight)
            highlight = game.highlightPossibleMoves(object)
            scene.add(highlight)
        }
    }
});


const renderer = createRenderer(canvas)
const pieces_map = await getPiecesMap()
const game = GameManager.createGame(pieces_map)
currentPositions = game.updatePositions()
scene.add(currentPositions)


// Lights
const light = getLight()
light.position.set(15, 15, 15)
scene.add(light)

const light2 = getLight()
light2.position.set(-15, 15, -15)
scene.add(light2)

renderer.render(scene, camera);



// Controls
const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true
// controls.dampingFactor = 0.25
controls.enablePan = false
// controls.enableZoom = false
controls.minZoom = 5
controls.maxZoom = 6
// controls.autoRotate = true
controls.rotateSpeed = 1
// controls.addEventListener('change', () => {
//     console.log('change')
//     renderer.render(scene, camera);
// })


// Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
})


let counter = 0
let start = Date.now()
function animate() {
    counter++;
    if (Date.now() - start >= 1000) {
        // console.log(`${counter} FPS`);
        counter = 0; // reset the counter
        start = Date.now(); // update the start time
    }
    requestAnimationFrame(animate);
    controls.update(); // add this line
    renderer.render(scene, camera);
}
animate();