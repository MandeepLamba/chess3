import * as THREE from 'three';
import './style.css';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {PIECES} from './pieces.js';
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const canvas = document.querySelector('.webgl')

// scene.add(new THREE.AxesHelper(5))

// Board Base
const boardBaseGeo = new THREE.BoxGeometry(17, 0.3, 17);
const boardBaseMat = new THREE.MeshBasicMaterial({
        color: "#4b2424"
    }
);
const boardBase = new THREE.Mesh(boardBaseGeo, boardBaseMat);
boardBase.position.set(0, -0.3, 0)
scene.add(boardBase);

// black pieces material
const blackMat = new THREE.MeshStandardMaterial({
    color: "#101010",
    roughness: 0.4,
    side: THREE.DoubleSide
})


const loader = new GLTFLoader();

var pieces_map = {}

loader.load(
    // resource URL
    'assets/all_glb/allin.glb',
    // called when the resource is loaded
    function (gltf) {
        gltf.scene.children.forEach((child) => {
            console.log(child.name)
            if (child.name.startsWith('elephant')) {
                pieces_map[PIECES.WHITE.ROOK] = child
                // change color and add for black
                const black = child.clone()
                black.material = blackMat
                pieces_map[PIECES.BLACK.ROOK] = black

            } else if (child.name.startsWith('horsh')) {
                pieces_map[PIECES.WHITE.KNIGHT] = child
                const black = child.clone()
                black.material = blackMat
                pieces_map[PIECES.BLACK.KNIGHT] = black
            } else if (child.name.startsWith('chief')) {
                pieces_map[PIECES.WHITE.BISHOP] = child
                const black = child.clone()
                black.material = blackMat
                pieces_map[PIECES.BLACK.BISHOP] = black
            } else if (child.name.startsWith('queen')) {
                pieces_map[PIECES.WHITE.QUEEN] = child
                const black = child.clone()
                black.material = blackMat
                pieces_map[PIECES.BLACK.QUEEN] = black
            } else if (child.name.startsWith('king')) {
                pieces_map[PIECES.WHITE.KING] = child
                const black = child.clone()
                black.material = blackMat
                pieces_map[PIECES.BLACK.KING] = black
            } else if (child.name.startsWith('soldier')) {
                pieces_map[PIECES.WHITE.PAWN] = child
                const black = child.clone()
                black.material = blackMat
                pieces_map[PIECES.BLACK.PAWN] = black
            }
        })
        const rook1 = pieces_map[PIECES.WHITE.ROOK].clone()
        rook1.position.set(-7, 0, 7)
        rook1.scale.set(0.8, 0.8, 0.8)
        scene.add(rook1)
        const rook2 = pieces_map[PIECES.WHITE.ROOK].clone()
        rook2.position.set(7, 0, 7)
        rook2.scale.set(0.8, 0.8, 0.8)
        scene.add(rook2)

        const rook3 = pieces_map[PIECES.BLACK.ROOK].clone()
        rook3.position.set(-7, 0, -7)
        rook3.scale.set(0.8, 0.8, 0.8)
        scene.add(rook3)

        const rook4 = pieces_map[PIECES.BLACK.ROOK].clone()
        rook4.position.set(7, 0, -7)
        rook4.scale.set(0.8, 0.8, 0.8)
        scene.add(rook4)

        const knight1 = pieces_map[PIECES.WHITE.KNIGHT].clone()
        knight1.position.set(-5, 0, 7)
        knight1.scale.set(0.45, 0.45, 0.45)
        scene.add(knight1)
        const knight2 = pieces_map[PIECES.WHITE.KNIGHT].clone()
        knight2.position.set(5, 0, 7)
        knight2.scale.set(0.45, 0.45, 0.45)
        scene.add(knight2)

        const knight3 = pieces_map[PIECES.BLACK.KNIGHT].clone()
        knight3.position.set(-5, 0, -7)
        knight3.scale.set(0.45, 0.45, 0.45)
        knight3.rotation.z = Math.PI
        scene.add(knight3)

        const knight4 = pieces_map[PIECES.BLACK.KNIGHT].clone()
        knight4.position.set(5, 0, -7)
        knight4.scale.set(0.45, 0.45, 0.45)
        knight4.rotation.z = Math.PI
        scene.add(knight4)

        const bishop1 = pieces_map[PIECES.WHITE.BISHOP].clone()
        bishop1.position.set(-3, 0, 7)
        bishop1.scale.set(0.8, 0.8, 0.8)
        scene.add(bishop1)
        const bishop2 = pieces_map[PIECES.WHITE.BISHOP].clone()
        bishop2.position.set(3, 0, 7)
        bishop2.scale.set(0.8, 0.8, 0.8)
        scene.add(bishop2)

        const bishop3 = pieces_map[PIECES.BLACK.BISHOP].clone()
        bishop3.position.set(-3, 0, -7)
        bishop3.scale.set(0.8, 0.8, 0.8)
        scene.add(bishop3)

        const bishop4 = pieces_map[PIECES.BLACK.BISHOP].clone()
        bishop4.position.set(3, 0, -7)
        bishop4.scale.set(0.8, 0.8, 0.8)
        scene.add(bishop4)

        const king = pieces_map[PIECES.WHITE.KING].clone()
        king.position.set(1, 0, 7)
        king.scale.set(0.8, 0.8, 0.8)
        scene.add(king)
        const queen = pieces_map[PIECES.WHITE.QUEEN].clone()
        queen.position.set(-1, 0, 7)
        queen.scale.set(0.8, 0.8, 0.8)
        queen.dropShadow = true
        scene.add(queen)

        const king2 = pieces_map[PIECES.BLACK.KING].clone()
        king2.position.set(1, 0, -7)
        king2.scale.set(0.8, 0.8, 0.8)
        scene.add(king2)

        const queen2 = pieces_map[PIECES.BLACK.QUEEN].clone()
        queen2.position.set(-1, 0, -7)
        queen2.scale.set(0.8, 0.8, 0.8)
        scene.add(queen2)

        for (let i = -7; i < 9; i += 2) {
            const pawn = pieces_map[PIECES.WHITE.PAWN].clone()
            pawn.position.set(i, 0, 5)
            pawn.scale.set(0.8, 0.8, 0.8)
            scene.add(pawn)

        }
        for (let i = -7; i < 9; i += 2) {
            const pawn = pieces_map[PIECES.BLACK.PAWN].clone()
            pawn.position.set(i, 0, -5)
            pawn.scale.set(0.8, 0.8, 0.8)
            scene.add(pawn)

        }


    },

    // called while loading is progressing
    function (xhr) {

        console.log((xhr.loaded / xhr.total * 100) + '% loaded');

    },
    // called when loading has errors
    function (error) {

        console.log('An error happened', error);

    }
);

// Background
// const backgroundTexture = new THREE.TextureLoader()
//     .load('./background.jpg', (texture) =>
//         texture.encoding = THREE.ReinhardToneMapping
//     )
// const sphereGeo = new THREE.SphereGeometry(100, 60, 60); // Adjust size as needed
// const sphereMaterial = new THREE.MeshBasicMaterial({map: backgroundTexture, side: THREE.DoubleSide});
// const sphere = new THREE.Mesh(sphereGeo, sphereMaterial);
// scene.add(sphere);


// Board
const colorDark = new THREE.MeshStandardMaterial({
    color: "#480000",
    roughness: 0.4,
    side: THREE.DoubleSide
})
const colorLight = new THREE.MeshStandardMaterial({
    color: "#fff9f1",
    roughness: 0.4,
    side: THREE.DoubleSide
})

function createSquare(x, y, color) {
    const geometry = new THREE.PlaneGeometry(2, 2)
    const plane = new THREE.Mesh(geometry, color)
    plane.rotateX(Math.PI / 2)
    plane.position.set(x, 0, y)
    return plane
}

for (let i = -7; i < 9; i += 2) {
    for (let j = -7; j < 9; j += 2) {
        const box = createSquare(i, j, (i + j) % 4 === 0 ? colorDark : colorLight)
        box.receiveShadow = true
        // box.dropShadow = true
        scene.add(box)
    }
}

// Ball
const geometry = new THREE.SphereGeometry(50, 64, 64);
const material = new THREE.MeshStandardMaterial({
    color: "#00ff83",
    roughness: 0.3,
    side: THREE.DoubleSide
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)


// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


// Lights
const light = new THREE.PointLight(0xffffff, 2000, 100)
light.position.set(15, 15, 15)
light.castShadow = true
light.shadow.mapSize.width = 2048;// default
light.shadow.mapSize.height = 2048; // default
light.shadow.camera.near = 0.5; // default
// light.shadow.camera.far = 40;
scene.add(light)

const light2 = new THREE.PointLight(0xffffff, 2000, 100)
light2.position.set(-15, 15, -15)
light2.castShadow = true
light2.shadow.mapSize.width = 2048;// default
light2.shadow.mapSize.height = 2048; // default
light2.shadow.camera.near = 0.5; // default
// light.shadow.camera.far = 40;
scene.add(light2)


// const sun = new THREE.PointLight(0xffffff, 2000, 200)
// sun.position.set(0, 50, 80)
// scene.add(sun)

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 300)
camera.position.set(0, 10, 20);
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({canvas})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)


// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
// controls.enableZoom = false
// controls.autoRotate = true
controls.rotateSpeed = 1


// Resize
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.render(scene, camera)
})

function animate() {
    requestAnimationFrame(animate);

    // Update controls
    controls.update();

    renderer.render(scene, camera);
}

animate();