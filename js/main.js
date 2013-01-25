var runHangman = function () {
	"use strict";

    var screen = new Screen(),
        game = null,
        initGame = null,
        initButtons = null,
        findWords = null,
        generateRandomWord = null,
        setRandomWord = null,
        randomWord = "";

    initButtons = function () {
        $("input[type=submit], a, button").button();

        $("#menuStartButton").click(function (e) {
            screen.displayUserScreen();
            e.preventDefault();
    	});

    	$("#gameStartButton").click(function (e) {
            screen.displayGameScreen(user);
            game.start();
            e.preventDefault();
    	});

    	$("#enterLetterButton").click(function (e) {
            game.checkGuess();
            e.preventDefault();
    	});
        
        $("#newGameButton").click(function (e) {
            screen.displayGameScreen();
            generateRandomWord();
            game = new Game(randomWord);
            game.init();
            e.preventDefault();
    	});
    };
    
    setRandomWord = function (words) {
        var numWords = words.length,
            randomNum = 0;

        randomNum = Math.floor((Math.random() * numWords));
        randomWord = words[randomNum];
    };
    
    findWords = function () {
        var request = null;
	
	request = $.ajax({
            type: "GET",
            url: "data/words.txt",
            dataType: "text",
            async: false
	});
        
        request.done(function (response) {
            var words = response.split("\n")
            setRandomWord(words);
	});

	request.fail(function () {
            alert("Words not loaded. Check internet connection.");
	});
    };
    
    generateRandomWord = function () {
        findWords();
    };

    initGame = function () {
        initButtons();
        screen.displayGameScreen();
        generateRandomWord();
        game = new Game(randomWord);
        game.init();
    };

    initGame();
};

$(document).ready(function () {
    "use strict";

    if (Modernizr.canvas) {
        
        if (!Modernizr.applicationcache) {
            $("#noOffineDialog").dialog();
        }
        runHangman();
    } else {
        $("#noCanvasDialog").dialog();
    }
    
});