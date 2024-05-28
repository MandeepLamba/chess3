import {Color} from "three";

export const highlightMaterial  = new THREE.MeshBasicMaterial({
    name:'highlightMaterial',
    color: 0xffff00,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.5
});
    name: "blackPieceMaterial",
export const lightPieceMaterial = new THREE.MeshStandardMaterial({
    name: 'lightPieceMaterial',
    color: new Color( 0xffffff ),
    roughness: 1.0,
    side: THREE.DoubleSide
})

