import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
import {PIECES} from './pieces.js';
import {blackPieceMaterial} from "./materials.js";


async function loadGlb(url = "assets/all_glb/allin.glb") {
    return new GLTFLoader().loadAsync(
        url,
        (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        }
    );
}


export async function getPiecesMap() {
    const gltf = await loadGlb();
    const pieces_map = {}

    gltf.scene.children.forEach((child) => {
        child.castShadow = true
        switch (child.name) {
            case 'elephant__0': {
                child.name = 'rook_w'
                pieces_map[PIECES.WHITE.ROOK] = child
                child.scale.set(0.8, 0.8, 0.8)
                // change color and add for black
                const black = child.clone()
                black.name = 'rook_b'
                black.material = blackPieceMaterial
                pieces_map[PIECES.BLACK.ROOK] = black
                break
            }
            case 'horsh__0': {
                child.name = 'knight_w'
                pieces_map[PIECES.WHITE.KNIGHT] = child
                child.scale.set(0.47, 0.47, 0.47)
                const black = child.clone()
                black.name = 'knight_b'
                black.rotateZ(Math.PI)
                black.material = blackPieceMaterial
                pieces_map[PIECES.BLACK.KNIGHT] = black
                break
            }
            case 'chief__0': {
                child.name = 'bishop_w'
                pieces_map[PIECES.WHITE.BISHOP] = child
                child.scale.set(0.8, 0.8, 0.8)
                const black = child.clone()
                black.name = 'bishop_b'
                black.material = blackPieceMaterial
                pieces_map[PIECES.BLACK.BISHOP] = black
                break
            }
            case 'queen__0': {
                child.name = 'queen_w'
                pieces_map[PIECES.WHITE.QUEEN] = child
                child.scale.set(0.8, 0.8, 0.8)
                const black = child.clone()
                black.name = 'queen_b'
                black.material = blackPieceMaterial
                pieces_map[PIECES.BLACK.QUEEN] = black
                break
            }
            case 'king__0': {
                child.name = 'king_w'
                pieces_map[PIECES.WHITE.KING] = child
                child.scale.set(0.8, 0.8, 0.8)
                const black = child.clone()
                black.name = 'king_b'
                black.material = blackPieceMaterial
                pieces_map[PIECES.BLACK.KING] = black
                break
            }
            case 'soldier__0': {
                child.name = 'pawn_w'
                pieces_map[PIECES.WHITE.PAWN] = child
                child.scale.set(0.8, 0.8, 0.8)
                const black = child.clone()
                black.name = 'pawn_b'
                black.material = blackPieceMaterial
                pieces_map[PIECES.BLACK.PAWN] = black
                break
            }
            default: {
                console.error('No match found')
            }
        }
    })
    return pieces_map
}