// ==UserScript==
// @name         ChessComText2Speech
// @namespace    https://github.com/johnnyawesome
// @version      1.0
// @description  Reads the moves of games on chess.com out loud for practicing with a real chessboard (OTB)
// @author       JohnnyAwesome
// @match        https://www.chess.com/game/live/*
// @match        https://www.chess.com/play/computer*
// @grant        none
// @icon         https://raw.githubusercontent.com/johnnyawesome/MyLogo/master/MySkull32.ico
// @icon64		 https://raw.githubusercontent.com/johnnyawesome/MyLogo/master/MySkull64.ico
// @updateURL    https://github.com/johnnyawesome/ChessComText2Speech/raw/main/ChessComText2Speech.user.js
// @downloadURL  https://github.com/johnnyawesome/ChessComText2Speech/raw/main/ChessComText2Speech.user.js
// ==/UserScript==

'use strict';

let moves = [];

setInterval(speakMoves, 300);

function speakMoves() {
  let movesTemp = [];

  //Get all moves
  document.querySelectorAll(".move > div.white.node, .move > div.black.node").forEach(move => movesTemp.push(move.innerHTML));

  //Olny if there's a new move...
  if (movesTemp.length > moves.length) {
    let currentMove = movesTemp[movesTemp.length - 1];
    //Replace Chess-Notation with words
    currentMove = currentMove.replace("K", "King ")
      .replace("Q", "Queen ")
      .replace("R", "Rook ")
      .replace("N", "Knight ")
      .replace("B", "Bishop ")
      .replace("x", " Takes ")
      .replace("+", " Check")
      .replace("O-O", "Castles Kingside")
      .replace("O-O-O", "Castles Queenside")
      .replace("+", " Check")
      .replace("#", " Checkmate ")
      .replace("1-0", " White wins ")
      .replace("0-1", " Black wins ");
    if (currentMove[0] === "h") currentMove = currentMove.replace("h", "Harry the H pawn goes to h")

    //Speak the move
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(currentMove));
    //Store the new move
    moves = [...movesTemp];
  }
}

