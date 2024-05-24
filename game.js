export class Player {
    constructor(name) {
        this.name = name;
    }
}
    static createGame(
        pieces_map,
        player1 = new Player('player1'),
        player2 = new Player('player2')
    ) {
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

            const plane = new THREE.Mesh(geometry, highlightMaterial);
