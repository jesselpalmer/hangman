var Screen = function () {
    "use strict";
};

Screen.prototype.displayWelcomeScreen = function () {
    "use strict";

    // i commented these options out during testing
    //$("#welcomeScreen").show();
    //$("#userDataScreen").hide();
    //$("#gameScreen").hide();
    
     $("#welcomeScreen").hide();
     $("#userDataScreen").hide();
     $("#gameScreen").show();
     $("#dialogBoxes").hide();
};

Screen.prototype.displayUserScreen = function () {
    "use strict";

    $("#welcomeScreen").hide();
    $("#userDataScreen").show();
    $("#gameScreen").hide();
    $("#dialogBoxes").hide();
};

Screen.prototype.displayGameScreen = function () {
    "use strict";

    //$("#welcomeScreen").hide();
    //$("#userDataScreen").hide();
    $("#gameScreen").show();
    $("#dialogBoxes").hide();
};