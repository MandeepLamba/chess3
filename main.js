
import {highlightMaterial} from "./materials.js";
    // new THREE.AxesHelper(25), // Axes helper
let highlight = new THREE.Group();
let selectedPiece = null;
let currentPositions = null;
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
    }
currentPositions = game.updatePositions()
scene.add(currentPositions)