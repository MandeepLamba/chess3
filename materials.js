import * as THREE from "three";
import {Color} from "three";

export const highlightMaterial  = new THREE.MeshBasicMaterial({
    name:'highlightMaterial',
    color: 0xffff00,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.5
});

export const blackPieceMaterial = new THREE.MeshStandardMaterial({
    name: "blackPieceMaterial",
    color: "#101010",
    roughness: 0.4,
    side: THREE.DoubleSide
})

export const lightPieceMaterial = new THREE.MeshStandardMaterial({
    name: 'lightPieceMaterial',
    color: new Color( 0xffffff ),
    roughness: 1.0,
    side: THREE.DoubleSide
})

export const backGroundMaterial = new THREE.MeshStandardMaterial({
    color: "#00ff83",
    roughness: 0.3,
    side: THREE.DoubleSide
})

export const darkSquareMatirial = new THREE.MeshStandardMaterial({
    color: "#480000",
    roughness: 0.4,
    side: THREE.DoubleSide
})
export const lightSquareMatirial = new THREE.MeshStandardMaterial({
    color: "#fff9f1",
    roughness: 0.4,
    side: THREE.DoubleSide
})
