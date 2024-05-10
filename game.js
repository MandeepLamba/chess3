import {PIECES} from "./pieces.js";
import * as THREE from "three";


export class GameManager {
    static createGame(pieces_map, player1 = 'player1', player2='player2') {
        return new Game(pieces_map, player1, player2);
    }
}

class Game {
    constructor(piece_map, playerWhite, playerBlack) {
        this.playerBlack = playerBlack
        this.playerWhite = playerWhite
        this.currentPlayer = playerWhite;
        // add pawns with index appended to there name
        const white_pawns = [...Array(8)].map((_, i) => {
            const pawn = piece_map[PIECES.WHITE.PAWN].clone()
            pawn.name = `pawn_w_${i}`
            return pawn
        })
        const black_pawns = [...Array(8)].map((_, i) => {
            const pawn = piece_map[PIECES.BLACK.PAWN].clone()
            pawn.name = `pawn_b_${i}`
            return pawn
        })
        this.board = [
            [piece_map[PIECES.BLACK.ROOK].clone(), piece_map[PIECES.BLACK.KNIGHT].clone(), piece_map[PIECES.BLACK.BISHOP].clone(), piece_map[PIECES.BLACK.QUEEN], piece_map[PIECES.BLACK.KING], piece_map[PIECES.BLACK.BISHOP], piece_map[PIECES.BLACK.KNIGHT], piece_map[PIECES.BLACK.ROOK]],
            black_pawns,
            [...Array(8)].map(() => null),
            [...Array(8)].map(() => null),
            [...Array(8)].map(() => null),
            [...Array(8)].map(() => null),
            white_pawns,
            [piece_map[PIECES.WHITE.ROOK].clone(), piece_map[PIECES.WHITE.KNIGHT].clone(), piece_map[PIECES.WHITE.BISHOP].clone(), piece_map[PIECES.WHITE.QUEEN], piece_map[PIECES.WHITE.KING], piece_map[PIECES.WHITE.BISHOP], piece_map[PIECES.WHITE.KNIGHT], piece_map[PIECES.WHITE.ROOK]],
        ];
    }

    updatePositions(){
        const group = new THREE.Group();
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (this.board[i][j] !== null) {
                    this.board[i][j].position.set((j*2)-7, 0, (i*2)-7)
                    group.add(this.board[i][j])
                }
            }
        }
        return group
    }

    getPossibleMoves(piece) {
        // TODO: Implement this method.
        return piece.position
        // This is just a placeholder. Replace this with your actual logic for calculating possible moves.
    }

    highlightPossibleMoves(piece) {
        const possibleMoves = this.getPossibleMoves(piece);
        const group =  new THREE.Group();

        possibleMoves.forEach(([x, z]) => {
            const geometry = new THREE.PlaneGeometry(2, 2);
            const material = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide, transparent: true, opacity: 0.5});
            const plane = new THREE.Mesh(geometry, material);
            plane.rotateX(Math.PI / 2)
            plane.position.set(x, 0.01, z); // 0.01 to avoid z-fighting
            group.add(plane);
        });
        return group;
    }

    movePiece(from, to) {
        this.board[to[0]][to[1]] = this.board[from[0]][from[1]]
        this.board[from[0]][from[1]] = null
        this.updatePositions()
    }
}
