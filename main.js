import * as THREE from 'three';
import './style.css';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {reduceVertices} from "three/addons/utils/SceneUtils.js";

const scene = new THREE.Scene();
const canvas = document.querySelector('.webgl')

scene.add(new THREE.AxesHelper(5))

// Board Base
const boardBaseGeo = new THREE.BoxGeometry( 17, 0.3, 17);
const boardBaseMesh = new THREE.MeshBasicMaterial({
    color: "#4b2424"
}
);
const boardBase = new THREE.Mesh( boardBaseGeo, boardBaseMesh );
boardBase.position.set(0, -0.3, 0)
scene.add( boardBase );


// Pieces Loader
const loader = new GLTFLoader();
loader.load(
    // resource URL
    'assets/queen.glb',
    // called when the resource is loaded
    function ( gltf ) {

        const child = gltf.scene.children[0];
        child.castShadow = true
        console.log(child)
        // child.scale.set(5, 5, 5)
        // child.position.set(3.5, 0.5, 1.4)

        scene.add(child);

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object

    },
    // called while loading is progressing
    function ( xhr ) {

        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

    },
    // called when loading has errors
    function ( error ) {

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
    roughness: 0.3,
    side: THREE.DoubleSide
})
const colorLight = new THREE.MeshStandardMaterial({
    color: "#fff9f1",
    roughness: 0,
    side: THREE.DoubleSide
})

function createSquare(x, y, color) {
    const geometry = new THREE.PlaneGeometry(2, 2)
    const plane = new THREE.Mesh(geometry, color)
    plane.rotateX(Math.PI/2)
    plane.position.set(x, 0,y)
    return plane
}
for (let i = -7; i < 9; i+=2) {
    for (let j = -7; j < 9; j+=2) {
        console.log(i, j)
        const box = createSquare(i, j, (i + j) % 4 === 0 ? colorDark : colorLight)
        box.receiveShadow = true
        box.dropShadow = true
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
light.shadow.mapSize.width = 2048; ;// default
light.shadow.mapSize.height = 2048; // default
light.shadow.camera.near = 0.5; // default
// light.shadow.camera.far = 40;
scene.add(light)


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
controls.autoRotate = true


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