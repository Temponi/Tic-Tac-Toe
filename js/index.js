var table = [
    ['#', '#', '#'],
    ['#', '#', '#'],
    ['#', '#', '#']
];
var singlePlayer = true;
var playerTurn = true;
var scorePlayer = 0;
var scoreComputer = 0;
var turn = 0;
var lastPlayerTurn = [];
var wait = false;
var playerTwo = 'Computer: ';

//Choose Multiplayer or Singleplayer
$(document).ready(function() {
    singlePlayer = confirm("Press OK for Singleplayer and Cancel for Multiplayer");
    game();
});

function game() {
    if (singlePlayer === true && wait == false) {
        //In case of Singleplayer
        if (playerTurn) {
            playerInput();
            checkWinner();
        } else {
            computerInput();
        }
    } else if (singlePlayer === false) {
        playerTwo = "Player2: ";
        if (playerTurn) {
            playerInput();
            checkWinner();
        } else {
            playerInput();
            checkWinner();
        }
    }
}

//Player Input
function playerInput() {
    $("#tl").click(function() {
        setTable('#tl', 0, 0);
    });
    $("#tc").click(function() {
        setTable('#tc', 0, 1);
    });
    $("#tr").click(function() {
        setTable('#tr', 0, 2);
    });
    $("#cl").click(function() {
        setTable('#cl', 1, 0);
    });
    $("#cc").click(function() {
        setTable('#cc', 1, 1);
    });
    $("#cr").click(function() {
        setTable('#cr', 1, 2);
    });
    $("#bl").click(function() {
        setTable('#bl', 2, 0);
    });
    $("#bc").click(function() {
        setTable('#bc', 2, 1);
    });
    $("#br").click(function() {
        setTable('#br', 2, 2);
    });
}

//Set X or 0 in table
function setTable(id, firstIndex, lastIndex) {
    if (table[firstIndex][lastIndex] == '#') {
        if (playerTurn === true) {
            table[firstIndex][lastIndex] = 'X';
            lastPlayerTurn = [firstIndex, lastIndex];
            $(id).html("X");
            playerTurn = false;
            turn++;
            checkWinner();
            game();
        } else {
            if (singlePlayer == false) {
                table[firstIndex][lastIndex] = '0';
                $(id).html("0");
                playerTurn = true;
                checkWinner();
                game();
            }
        }
    }
}

//Check if Someone wins
function checkWinner() {
    if (table[0][0] == 'X' && table[0][1] == 'X' && table[0][2] == 'X') {
        wins(1);
    } else if (table[1][0] == 'X' && table[1][1] == 'X' && table[1][2] == 'X') {
        wins(1);
    } else if (table[2][0] == 'X' && table[2][1] == 'X' && table[2][2] == 'X') {
        wins(1);
    } else if (table[0][0] == 'X' && table[1][0] == 'X' && table[2][0] == 'X') {
        wins(1);
    } else if (table[0][1] == 'X' && table[1][1] == 'X' && table[2][1] == 'X') {
        wins(1);
    } else if (table[0][2] == 'X' && table[1][2] == 'X' && table[2][2] == 'X') {
        wins(1);
    } else if (table[0][0] == 'X' && table[1][1] == 'X' && table[2][2] == 'X') {
        wins(1);
    } else if (table[0][2] == 'X' && table[1][1] == 'X' && table[2][0] == 'X') {
        wins(1);
    } else if (table[0][0] == '0' && table[0][1] == '0' && table[0][2] == '0') {
        wins(0);
    } else if (table[1][0] == '0' && table[1][1] == '0' && table[1][2] == '0') {
        wins(0);
    } else if (table[2][0] == '0' && table[2][1] == '0' && table[2][2] == '0') {
        wins(0);
    } else if (table[0][0] == '0' && table[1][0] == '0' && table[2][0] == '0') {
        wins(0);
    } else if (table[0][1] == '0' && table[1][1] == '0' && table[2][1] == '0') {
        wins(0);
    } else if (table[0][2] == '0' && table[1][2] == '0' && table[2][2] == '0') {
        wins(0);
    } else if (table[0][0] == '0' && table[1][1] == '0' && table[2][2] == '0') {
        wins(0);
    } else if (table[0][2] == '0' && table[1][1] == '0' && table[2][0] == '0') {
        wins(0);
    } else if (table[0][0] != '#' && table[0][1] != '#' && table[0][2] != '#' && table[1][0] != '#' && table[1][1] != '#' && table[1][2] != '#' && table[2][0] != '#' && table[2][1] != '#' && table[2][2] != '#') {
        wins(2)
    } else if (wait == true) {
        wins(undefined);
    }


}

function wins(val) {
    wait = true;
    setTimeout(function() {
        wait = false;
        game();
        table = [
            ['#', '#', '#'],
            ['#', '#', '#'],
            ['#', '#', '#']
        ];
        turn = 0;
        $("#tl").html("#");
        $("#tc").html("#");
        $("#tr").html("#");
        $("#cl").html("#");
        $("#cc").html("#");
        $("#cr").html("#");
        $("#bl").html("#");
        $("#bc").html("#");
        $("#br").html("#");
        lastPlayerTurn = [];
        game();
        if (val === 1) {
            scorePlayer++;
            $("#scoreP").html("Player: " + (scorePlayer / 3));
            playerTurn = false;
        } else if (val === 0) {
            scoreComputer++;
            if (singlePlayer == true) {
                $("#scoreC").html(playerTwo + (scoreComputer / 2));
            } else {
                $("#scoreC").html(playerTwo + (scoreComputer / 3));
            }
            playerTurn = true;
        } else {}
    }, 500);
}

//Computer AI
function computerInput() {
    switch (turn) {
        case 0:
            table[1][1] = '0';
            set(1, 1);
            break;

        case 1:
            if (table[0][0] == 'X') {
                table[0][2] = '0';
                set(0, 2);
            } else if (table[0][2] == 'X') {
                table[0][0] = '0';
                set(0, 0);
            } else if (table[2][0] == 'X') {
                table[2][2] = '0';
                set(2, 2);
            } else if (table[2][2] == 'X') {
                table[2][0] = '0';
                set(2, 0);
            } else if (table[1][1] == 'X') {
                table[0][2] = '0';
                set(0, 2);
            } else {
                if (lastPlayerTurn[0] == 1) {
                    table[0][lastPlayerTurn[1]] = '0';
                    set(0, lastPlayerTurn[1]);
                } else {
                    table[lastPlayerTurn[0]][2] = '0';
                    set(lastPlayerTurn[0], 2);
                }
            }
            break;

        case 2:
            if ((lastPlayerTurn[0] == 0 || lastPlayerTurn[0] == 2) && lastPlayerTurn[1] == 0) {
                table[lastPlayerTurn[0]][2] = '0';
                set(lastPlayerTurn[0], 2);
            } else {
                table[2][0] = '0';
                set(2, 0);
            }
            break;

        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
            let val = checkIfWin('0');
            if (val[0]) {
                table[val[1]][val[2]] = '0';
                set(val[1], val[2]);
            } else {
                let x = checkIfWin('X');
                if (x[0]) {
                    table[x[1]][x[2]] = '0';
                    set(x[1], x[2]);
                } else {
                    computerMove();
                }
            }
    }
    turn++;
    playerTurn = true;
    checkWinner();
    game();
}

//Set Computer move on table
function set(index1, index2) {
    if (index1 == 0 && index2 == 0) {
        $("#tl").html('0');
    }
    if (index1 == 0 && index2 == 1) {
        $("#tc").html('0');
    }
    if (index1 == 0 && index2 == 2) {
        $("#tr").html('0');
    }
    if (index1 == 1 && index2 == 0) {
        $("#cl").html('0');
    }
    if (index1 == 1 && index2 == 1) {
        $("#cc").html('0');
    }
    if (index1 == 1 && index2 == 2) {
        $("#cr").html('0');
    }
    if (index1 == 2 && index2 == 0) {
        $("#bl").html('0');
    }
    if (index1 == 2 && index2 == 1) {
        $("#bc").html('0');
    }
    if (index1 == 2 && index2 == 2) {
        $("#br").html('0');
    }
}

//Returns true if someone will win in the next turn
function checkIfWin(val) {
    if (table[0][0] == val && table[0][1] == val && table[0][2] == '#') {
        return [true, 0, 2];
    } else if (table[0][0] == val && table[0][2] == val && table[0][1] == '#') {
        return [true, 0, 1];
    } else if (table[0][2] == val && table[0][1] == val && table[0][0] == '#') {
        return [true, 0, 0];
    } else if (table[1][0] == val && table[1][1] == val && table[1][2] == '#') {
        return [true, 1, 2];
    } else if (table[1][0] == val && table[1][2] == val && table[1][1] == '#') {
        return [true, 1, 1];
    } else if (table[1][2] == val && table[1][1] == val && table[1][0] == '#') {
        return [true, 1, 0];
    } else if (table[2][0] == val && table[2][1] == val && table[2][2] == '#') {
        return [true, 2, 2];
    } else if (table[2][0] == val && table[2][2] == val && table[2][1] == '#') {
        return [true, 2, 1];
    } else if (table[2][2] == val && table[2][1] == val && table[2][0] == '#') {
        return [true, 2, 0];
    } else if (table[0][0] == val && table[1][0] == val && table[2][0] == '#') {
        return [true, 2, 0];
    } else if (table[0][0] == val && table[2][0] == val && table[1][0] == '#') {
        return [true, 1, 0];
    } else if (table[1][0] == val && table[2][0] == val && table[0][0] == '#') {
        return [true, 0, 0];
    } else if (table[0][1] == val && table[1][1] == val && table[2][1] == '#') {
        return [true, 2, 1];
    } else if (table[0][1] == val && table[2][1] == val && table[1][1] == '#') {
        return [true, 1, 1];
    } else if (table[1][1] == val && table[2][1] == val && table[0][1] == '#') {
        return [true, 0, 1];
    } else if (table[0][2] == val && table[1][2] == val && table[2][2] == '#') {
        return [true, 2, 2];
    } else if (table[0][2] == val && table[2][2] == val && table[1][2] == '#') {
        return [true, 1, 2];
    } else if (table[1][2] == val && table[2][2] == val && table[0][2] == '#') {
        return [true, 0, 2];
    } else if (table[0][0] == val && table[1][1] == val && table[2][2] == '#') {
        return [true, 2, 2];
    } else if (table[0][0] == val && table[2][2] == val && table[1][1] == '#') {
        return [true, 1, 1];
    } else if (table[2][2] == val && table[1][1] == val && table[0][0] == '#') {
        return [true, 0, 0];
    } else if (table[0][2] == val && table[1][1] == val && table[2][0] == '#') {
        return [true, 2, 0];
    } else if (table[2][0] == val && table[1][1] == val && table[0][2] == '#') {
        return [true, 0, 2];
    } else if (table[0][0] == val && table[2][0] == val && table[1][1] == '#') {
        return [true, 1, 1];
    } else {
        return [false];
    }
}

//Computer move
function computerMove() {
    if (table[1][1] == '#') {
        table[1][1] = '0';
        set(1, 1);
    } else {
        if (table[0][0] == '#') {
            table[0][0] = '0';
            set(0, 0);
        } else if (table[0][2] == '#') {
            table[0][2] = '0';
            set(0, 2);
        } else if (table[2][0] == '#') {
            table[2][0] = '0';
            set(2, 0);
        } else if (table[2][2] == '#') {
            table[2][2] = '0';
            set(2, 2);
        } else {
            if (table[0][1] == '#') {
                table[0][1] = '0';
                set(0, 1);
            } else if (table[1][0] == '#') {
                table[1][0] = '0';
                set(1, 0);
            } else if (table[1][2] == '#') {
                table[1][2] = '0';
                set(1, 2);
            } else {
                table[2][1] = '0';
                set(2, 1);
            }
        }
    }
}