var Screen = function () {
    "use strict";
};

Screen.prototype.displayGameScreen = function () {
    "use strict";

    $("#gameScreen").show();
    $("#dialogBoxes").hide();
    $("#messages").html("");
    $("#enterLetterButton").show();
    $("#newGameButton").hide();
};