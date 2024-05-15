import {PIECES} from "./pieces.js";
import * as THREE from "three";
import {
    blackPieceMaterial,
    highlightMaterial,
    lightPieceMaterial,
} from "./materials.js";

export class Player {
    constructor(name) {
        this.name = name;
    }
}

export class GameManager {
    static createGame(
        pieces_map,
        player1 = new Player('player1'),
        player2 = new Player('player2')
    ) {
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

    isValidMove(position) {
        const board_size = 8; // Assuming an 8x8 chessboard
        const x = position[0];
        const y = position[1];
        return (x >= 0 && x < board_size) && (y >= 0 && y < board_size);
    }

    isEnemyPiece(piece) {
        if (piece) {
            if (this.currentPlayer === this.playerWhite && piece.material === blackPieceMaterial) {
                return true; // Black piece is an enemy for White player
            } else if (this.currentPlayer === this.playerBlack && piece.material === lightPieceMaterial) {
                return true; // White piece is an enemy for Black player
            }
        }
        return false; // No enemy piece at potentialMove
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
        if (item.name.startsWith('rook')) {
            const board_index = this.convertPositionToIndex(item.position);
            const moves = [];

            const directions = [
                [0, 1], // Right
                [0, -1], // Left
                [1, 0], // Up
                [-1, 0] // Down
            ];

            directions.forEach(([dx, dy]) => {
                let [x, y] = board_index;
                while (true) {
                    x += dx;
                    y += dy;
                    const potentialMove = [x, y];
                    if (this.isValidMove(potentialMove)) {
                        const loc = this.convertIndexToPosition(potentialMove)
                        if (this.board[x][y] === null) {
                            moves.push(loc);
                        } else if (this.isEnemyPiece(this.board[x][y])){
                            moves.push(loc)
                            break;
                        }
                    } else {
                        break;
                    }
                }
            });

            return moves;
        }
        if (item.name.startsWith('bishop')) {
            const board_index = this.convertPositionToIndex(item.position);
            const moves = [];

            const directions = [
                [1, 1], // Up-Right
                [1, -1], // Down-Right
                [-1, 1], // Up-Left
                [-1, -1] // Down-Left
            ];

            directions.forEach(([dx, dy]) => {
                let [x, y] = board_index;
                while (true) {
                    x += dx;
                    y += dy;
                    const potentialMove = [x, y];
                    if (this.isValidMove(potentialMove)) {
                        const piece = this.convertIndexToPosition(potentialMove);
                        if (this.board[x][y] === null && !this.isEnemyPiece(piece)) {
                            moves.push(piece);
                        } else {
                            break;
                        }
                    } else {
                        break;
                    }
                }
            });

            return moves;
        }

        if (item.name.startsWith('knight')) {
            const board_index = this.convertPositionToIndex(item.position);
            const moves = [];

            const knightMoves = [
                [-2, -1], [-1, -2], [1, -2], [2, -1], // Up-Left
                [2, 1], [1, 2], [-1, 2], [-2, 1] // Down-Right
            ];

            knightMoves.forEach(([dx, dy]) => {
                const [x, y] = board_index;
                const potentialMove = [x + dx, y + dy];
                if (this.isValidMove(potentialMove)) {
                    const piece = this.convertIndexToPosition(potentialMove);
                    if (this.board[potentialMove[0]][potentialMove[1]] === null || !this.isEnemyPiece(piece)) {
                        moves.push(piece);
                    }
                }
            });

            return moves;
        }

        if (item.name.startsWith('queen')) {
            const board_index = this.convertPositionToIndex(item.position);
            const moves = [];

            const directions = [
                [0, 1], [0, -1], [1, 0], [-1, 0], // Rook moves
                [1, 1], [1, -1], [-1, 1], [-1, -1] // Bishop moves
            ];

            directions.forEach(([dx, dy]) => {
                let [x, y] = board_index;
                while (true) {
                    x += dx;
                    y += dy;
                    const potentialMove = [x, y];
                    if (this.isValidMove(potentialMove)) {
                        const piece = this.convertIndexToPosition(potentialMove);
                        if (this.board[x][y] === null || this.isEnemyPiece(piece)) {
                            moves.push(piece);
                            if (this.board[x][y] !== null) {
                                break; // Stop if an enemy piece is encountered
                            }
                        } else {
                            break;
                        }
                    } else {
                        break;
                    }
                }
            });

            return moves;
        }
        if (item.name.startsWith('king')) {
            const board_index = this.convertPositionToIndex(item.position);
            const moves = [];

            const kingMoves = [
                [0, 1], [0, -1], [1, 0], [-1, 0], // Horizontal and Vertical
                [1, 1], [1, -1], [-1, 1], [-1, -1] // Diagonal
            ];

            kingMoves.forEach(([dx, dy]) => {
                const [x, y] = board_index;
                const potentialMove = [x + dx, y + dy];
                if (this.isValidMove(potentialMove)) {
                    const piece = this.convertIndexToPosition(potentialMove);
                    if (this.board[potentialMove[0]][potentialMove[1]] === null || this.isEnemyPiece(piece)) {
                        moves.push(piece);
                    }
                }
            });
            return moves;
        }

        return [
            item.position
        ]

    }


    highlightPossibleMoves(piece) {
        const possibleMoves = this.getPossibleMoves(piece);
        const group = new THREE.Group();
        possibleMoves.forEach((position) => {
            const geometry = new THREE.PlaneGeometry(2, 2);
            const plane = new THREE.Mesh(geometry, highlightMaterial);
            plane.rotateX(Math.PI / 2)
            plane.position.set(position.x, 0.01, position.z); // 0.01 to avoid z-fighting
            group.add(plane);
        });
        return group;
    }

    movePiece(from, to) {
        this.board[to[0]][to[1]] = this.board[from[0]][from[1]]
        this.board[from[0]][from[1]] = null
    }
}
