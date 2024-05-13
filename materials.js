import * as THREE from "three";

export const blackPieceMaterial = new THREE.MeshStandardMaterial({
    color: "#101010",
    roughness: 0.4,
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
