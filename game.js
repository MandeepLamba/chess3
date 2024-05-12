import {PIECES} from "./pieces.js";
import * as THREE from "three";


export class GameManager {
    static createGame(pieces_map, player1 = 'player1', player2 = 'player2') {
        return new Game(pieces_map, player1, player2);
    }
}

class Game {
    constructor(piece_map, playerWhite, playerBlack) {
        this.playerBlack = playerBlack
        this.playerWhite = playerWhite
        this.currentPlayer = playerWhite;
        // add pawns with index appended to their name
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

    updatePositions() {
        const group = new THREE.Group();
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (this.board[i][j] !== null) {
                    this.board[i][j].position.set((i * 2) - 7, 0, (j * 2) - 7)
                    group.add(this.board[i][j])
                }
            }
        }
        return group
    }

    convertPositionToIndex(position){
        return [(position.x + 7) / 2, (position.z + 7) / 2]
    }

    convertIndexToPosition(index){
        return new THREE.Vector3((index[0] * 2) - 7,0, (index[1] * 2) - 7)
    }

    getPossibleMoves(item) {
        if (item.name.startsWith('square')) {
            console.log("it's a square")
            const board_index = this.convertPositionToIndex(item.position)
            const piece = this.board[board_index[0]][board_index[1]];
            console.log('found piece: ', piece)
            if (piece) {
                return this.getPossibleMoves(piece);
            }
            return [
                item.position
            ]
        }
        if (item.name.startsWith('pawn_w')) {
            const board_index = this.convertPositionToIndex(item.position)
            console.log("it's a white pawn at", board_index)
            if (board_index[0] === 6) {
                console.log('first move')
                return [
                    this.convertIndexToPosition([board_index[0] - 1, board_index[1]]),
                    this.convertIndexToPosition([board_index[0] - 2, board_index[1]])
                ]
            } else {
                return [
                    this.convertIndexToPosition([board_index[0] - 1, board_index[1]])
                ]
            }
            // TODO: add attack moves
        }
        if (item.name.startsWith('pawn_b')) {
            const board_index = this.convertPositionToIndex(item.position)
            console.log("it's a black pawn at", board_index)
            if (board_index[0] === 1) {
                console.log('first move')
                return [
                    this.convertIndexToPosition([board_index[0] + 1, board_index[1]]),
                    this.convertIndexToPosition([board_index[0] + 2, board_index[1]])
                ]
            } else {
                return [
                    this.convertIndexToPosition([board_index[0] + 1, board_index[1]])
                ]
            }
            // TODO: add attack moves
        }
        return [
            item.position
        ]

    }


    highlightPossibleMoves(piece) {
        const possibleMoves = this.getPossibleMoves(piece);
        const group = new THREE.Group();
        console.log('possibleMoves: ', possibleMoves)
        possibleMoves.forEach((position) => {
            const geometry = new THREE.PlaneGeometry(2, 2);
            const material = new THREE.MeshBasicMaterial({
                color: 0xffff00,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.5
            });
            const plane = new THREE.Mesh(geometry, material);
            plane.rotateX(Math.PI / 2)
            plane.position.set(position.x, 0.01, position.z); // 0.01 to avoid z-fighting
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
