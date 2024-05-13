// Board Base
import * as THREE from "three";
import {backGroundMaterial, darkSquareMatirial, lightSquareMatirial} from "./materials.js";


function getBoardBase() {
    const boardBaseGeo = new THREE.BoxGeometry(17, 0.3, 17);
    const boardBaseMat = new THREE.MeshBasicMaterial({
            color: "#4b2424"
        }
    );
    const boardBase = new THREE.Mesh(boardBaseGeo, boardBaseMat);
    boardBase.position.set(0, -0.3, 0)
    return boardBase;
}

function createSquare(x, y, name, color) {
    const geometry = new THREE.PlaneGeometry(2, 2)
    const plane = new THREE.Mesh(geometry, color)
    plane.rotateX(Math.PI / 2)
    plane.position.set(x, 0, y)
    plane.name = name
    return plane
}

export function getBoardGroup(){
    const board = new THREE.Group();
    const boardBase = getBoardBase();
    board.add(boardBase);
    for (let i = -7; i < 9; i += 2) {
        for (let j = -7; j < 9; j += 2) {
            const box = createSquare(
                i, j, `square_${(i+7)/2}_${(j+7)/2}`,(i + j) % 4 === 0 ? darkSquareMatirial : lightSquareMatirial
            )
            box.receiveShadow = true
            board.add(box)
        }
    }
    return board;
}

export function getLight() {
    const light = new THREE.PointLight(0xffffff, 1500, 100);
    light.position.set(0, 10, 4);
    light.castShadow = true;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 40;
    return light;
}

export function getBackgroundSphere(){
    const  sphere = new THREE.SphereGeometry(50, 64, 64);
    return  new THREE.Mesh(sphere, backGroundMaterial)
}

export function getImageBackground(){
    const backgroundTexture = new THREE.TextureLoader()
        .load('./background.jpg', (texture) =>
            texture.encoding = THREE.ReinhardToneMapping
        )
    const sphereGeo = new THREE.SphereGeometry(100, 60, 60); // Adjust size as needed
    const sphereMaterial = new THREE.MeshBasicMaterial({map: backgroundTexture, side: THREE.DoubleSide});
    return  new THREE.Mesh(sphereGeo, sphereMaterial);
}

export function createRenderer(canvas){
    const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true})
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setPixelRatio(2)
    return renderer;
}

export function createCamera(){
    return new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 300)
}