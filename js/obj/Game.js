var Game = function (randomWord) {
    "use strict";

    this.randomWord = randomWord.toLowerCase();
    this.score = 0;
    this.numGuesses = 0;
    this.numMissingChars = randomWord.length;
    this.remainingChars = randomWord.toLowerCase();
    this.guessedChars = "";
    this.incorrectChars = "";
    this.hangman = new Hangman();
    this.context = $("#wordCanvas")[0].getContext("2d");
};

Game.prototype.getRandomWord = function () {
    return this.randomWord;
};

Game.prototype.setRandomWord = function (randomWord) {
    this.randomWord = randomWord.toLowerCase();
};

Game.prototype.getScore = function () {
    return this.score;
};

Game.prototype.setScore = function (score) {
    this.score = score;
};

Game.prototype.getNumGuesses = function () {
    return this.numGuesses;
};

Game.prototype.setNumGuesses = function (guesses) {
    this.numGuesses = guesses;
};

Game.prototype.getRemainingChars = function () {
    return this.remainingChars;
};

Game.prototype.setRemainingChars = function (remainingChars) {
    this.remainingChars = remainingChars;
};

Game.prototype.getGuessedChars = function () {
    return this.guessedChars;
};

Game.prototype.setGuessedChars = function (guessedChars) {
    this.guessedChars = guessedChars;
};

Game.prototype.getContext = function () {
    return this.context;
};

Game.prototype.setContext = function (context) {
    this.context = context;
};

Game.prototype.getHangman = function () {
    return this.hangman;
};

Game.prototype.setHangman = function (hangman) {
    this.hangman = hangman;
};

Game.prototype.addGuessedChar = function (guessedChar) {
    var guessedChars = this.guessedChars;

    guessedChars = guessedChars + guessedChar;
    this.setGuessedChars(guessedChars);
};

Game.prototype.drawLettersGuessed = function () {
    var numIncorrectChars = this.incorrectChars.length,
        currentChar = "",
        i = 0,
        x = 5,
        y = 60;
        
    this.context.fillStyle = "#000";
    this.context.font = "14pt Arial";
    this.context.textAlign = "left";
    this.context.fillText("Incorrect guesses: ", x, y);
    x += 160;

    for (i = 0; i < numIncorrectChars; i += 1) {
        currentChar = this.incorrectChars[i];
        
        if (i !== numIncorrectChars - 1) {
            this.context.fillText(currentChar + ",", x, y);
        } else {
            this.context.fillText(currentChar, x, y);
        }
        x += 25;
    }
};

Game.prototype.drawGuessedChars = function () {
    var numRandomWordChars = this.randomWord.length,
        currentChar = ""
        this.numMissingChars = this.randomWord.length,
        i = 0,
        x = 10,
        y = 25;
        
    this.context.fillStyle = "Red";
    this.context.font = "bold 20pt Arial";
    this.context.textAlign = "center";
        
    for (i = 0; i < numRandomWordChars; i += 1) {
        currentChar = this.randomWord[i];

        if (this.guessedChars.indexOf(currentChar) !== -1) {
            this.numMissingChars = this.numMissingChars - 1;
            this.context.fillText(currentChar, x, y);
        }

        y += 7;
        this.context.fillText("_", x, y);
        x += 25;
        y -= 7;
    }
};

Game.prototype.updateWordCanvas = function () {
    this.context.clearRect(0, 0, 600, 150);
    this.drawGuessedChars();
    this.drawLettersGuessed();
};

Game.prototype.hasCharBeenGuessed = function (guessedChar) {
    var guessedChars = this.guessedChars;
    
    return guessedChars.search(guessedChar) !== -1;
};

Game.prototype.GameOverWinningSequence = function () {
    var code = "You win!";

    $("#messages").html(code)
                .removeClass("incorrectMsg").addClass("correctMsg");
    $("#enterLetterButton").hide();
    $("#newGameButton").show();
};

Game.prototype.GameOverLosingSequence = function () {
    var code = "Game Over! You Lose! The correct word was <u>" + 
            this.randomWord + "</u>.";

    $("#messages").html(code)
                .removeClass("correctMsg").addClass("incorrectMsg");
    $("#enterLetterButton").hide();
    $("#newGameButton").show();
};

Game.prototype.GameOverCheck = function () {
    
    if (this.hangman.getStage() === 9) {
        this.GameOverLosingSequence();
    } else if (this.numMissingChars === 0) {
        this.GameOverWinningSequence();
    }
};

Game.prototype.checkGuess = function () {
    var remainingChars = this.getRemainingChars(),
        newWord = "",
        guessedChar = $("#letterGuess").val().toLowerCase();

    if (guessedChar.length !== 1) {
        $("#messages").html("Invalid entry.  Please enter one letter.")
                .removeClass("correctMsg").addClass("incorrectMsg");
        return;
    } else if (this.hasCharBeenGuessed(guessedChar)) {
        $("#messages").html("This letter has already been guessed.  Try " +
                "again.").removeClass("correctMsg").addClass("incorrectMsg");
        return;
    }
    
    this.addGuessedChar(guessedChar);
    
    if (remainingChars.search(guessedChar) !== -1) {
        newWord = remainingChars.replace(guessedChar, "");
        this.setRemainingChars(newWord);
        $("#messages").html("Correct guess!").removeClass("incorrectMsg")
                .addClass("correctMsg");
    } else {
        this.incorrectChars = this.incorrectChars + guessedChar;
        this.hangman.incorrectGuess();
        $("#messages").html("Incorrect guess!").removeClass("correctMsg")
                .addClass("incorrectMsg");
    }
    
    this.updateWordCanvas();
    
    this.GameOverCheck();
};

Game.prototype.init = function () {
    this.updateWordCanvas();
    this.hangman.drawStageZero();
};