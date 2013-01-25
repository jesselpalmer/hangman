var Hangman = function () {
    "use strict";
    
    this.canvasWidth = $("#myCanvas").width();
    this.canvasHeight = $("#myCanvas").height();
    this.context = $("#myCanvas")[0].getContext("2d");
    this.HANGMAN_COLOR = "#fff";
    this.context.fillStyle = this.HANGMAN_COLOR;
    this.padding = this.canvasWidth * 0.10;

    // post
    this.POST_X = this.padding;
    this.POST_Y = this.padding;
    this.POST_HEIGHT = this.canvasHeight - (this.padding * 2);
    this.POST_WIDTH = this.canvasWidth / 20;

    // branch
    this.BRANCH_X = this.padding + this.POST_WIDTH;
    this.BRANCH_Y = this.padding;
    this.BRANCH_WIDTH = this.POST_WIDTH;
    this.BRANCH_LENGTH = (this.canvasWidth / 2) - this.padding - 
            (this.POST_WIDTH / 2);

    // noose
    this.NOOSE_X = (this.canvasWidth / 2) - (this.POST_WIDTH / 2);
    this.NOOSE_Y = this.padding + this.BRANCH_WIDTH;
    this.NOOSE_WIDTH = this.POST_WIDTH;
    this.NOOSE_HEIGHT = this.canvasHeight / 10;

    // head
    this.HEAD_RADIUS = this.canvasWidth / 10;
    this.HEAD_Y_OFFSET = 1;
    this.HEAD_X = this.canvasWidth / 2;
    this.HEAD_Y = this.padding + this.HEAD_RADIUS + this.NOOSE_HEIGHT + 
            this.BRANCH_WIDTH - this.HEAD_Y_OFFSET;

    // body
    this.BODY_Y_OFFSET = 2;
    this.BODY_PART_WIDTH = this.canvasWidth / 20;
    this.BODY_X = (this.canvasWidth / 2) - (this.BODY_PART_WIDTH / 2);
    this.BODY_Y = this.HEAD_RADIUS + this.padding + this.HEAD_RADIUS + 
            this.NOOSE_HEIGHT + this.BRANCH_WIDTH - this.BODY_Y_OFFSET;
    this.BODY_HEIGHT = this.canvasHeight / 3.5;

    // arms
    this.UPPER_ARM_LENGTH = this.canvasWidth / 7;
    this.FOREARM_LENGTH = this.canvasHeight / 12;
    
    // hips
    this.HIPS_LENGTH = this.UPPER_ARM_LENGTH;
    this.HIPS_WIDTH = this.BODY_PART_WIDTH;

    // lower legs
    this.LOWER_LEG_LENGTH = this.canvasHeight / 6;
    this.LOWER_LEG_WIDTH = this.BODY_PART_WIDTH;
    
    // feet
    this.FEET_LENGTH = this.HIPS_LENGTH / 2;
    this.FEET_WIDTH = this.BODY_PART_WIDTH;

    this.stage = 0;
};

Hangman.prototype.getStage = function () {
    return this.stage;
};

Hangman.prototype.setStage = function (stage) {
    this.stage = stage;
};

Hangman.prototype.getContext = function () {
    return this.context;
};

Hangman.prototype.setContext = function (context) {
    this.context = context;
};

Hangman.prototype.drawPost = function () {
    this.context.fillRect(this.POST_X, this.POST_Y, this.POST_WIDTH, 
            this.POST_HEIGHT);
};

Hangman.prototype.drawBranch = function () {
    this.context.fillRect(this.BRANCH_X, this.BRANCH_Y, this.BRANCH_LENGTH,
            this.BRANCH_WIDTH);
};

Hangman.prototype.drawNoose = function () {
    this.context.fillRect(this.NOOSE_X, this.NOOSE_Y, this.NOOSE_WIDTH, 
            this.NOOSE_HEIGHT);
};

Hangman.prototype.drawHead = function () {
    this.context.beginPath();
    this.context.arc(this.HEAD_X, this.HEAD_Y, this.HEAD_RADIUS, 0, Math.PI * 2,
            true);
    this.context.closePath();
    this.context.fill();
};

Hangman.prototype.drawBody = function () {
    this.context.fillRect(this.BODY_X, this.BODY_Y, this.BODY_PART_WIDTH, 
            this.BODY_HEIGHT);
};

Hangman.prototype.drawLeftUpperArm = function () {
    var x = (this.canvasWidth / 2)  - (this.BODY_PART_WIDTH / 2) 
                - this.UPPER_ARM_LENGTH,
        y = 210;

   this.context.fillRect(x, y, this.UPPER_ARM_LENGTH, this.BODY_PART_WIDTH);
};

Hangman.prototype.drawLeftForearm = function () {
    var x = (this.canvasWidth / 2)  - (this.BODY_PART_WIDTH / 2) 
                - this.UPPER_ARM_LENGTH,
        y = 230;
 
   this.context.fillRect(x, y, this.BODY_PART_WIDTH, this.FOREARM_LENGTH);
};

Hangman.prototype.drawLeftArm = function () {
    this.drawLeftUpperArm();
    this.drawLeftForearm();
};

Hangman.prototype.drawRightUpperArm = function () {
    var x = (this.canvasWidth / 2) + (this.BODY_PART_WIDTH / 2),
        y = 210;

   this.context.fillRect(x, y, this.UPPER_ARM_LENGTH, this.BODY_PART_WIDTH);
};

Hangman.prototype.drawRightForearm = function () {
    var x = (this.canvasWidth / 2) + (this.BODY_PART_WIDTH / 2) +
            this.UPPER_ARM_LENGTH - this.BODY_PART_WIDTH,
        y = 230;
 
   this.context.fillRect(x, y, this.BODY_PART_WIDTH, this.FOREARM_LENGTH);
};

Hangman.prototype.drawRightArm = function () {
    this.drawRightUpperArm();
    this.drawRightForearm();
};

Hangman.prototype.drawLeftHip = function () {
    var x = 133,
        y = 311;

    this.context.fillRect(x, y, this.HIPS_LENGTH, this.HIPS_WIDTH);
};

Hangman.prototype.drawLeftLowerLeg = function () {
    var x = 133,
        y = 331;

    this.context.fillRect(x, y, this.LOWER_LEG_WIDTH, this.LOWER_LEG_LENGTH);
};

Hangman.prototype.drawLeftLeg = function () {
    this.drawLeftHip();
    this.drawLeftLowerLeg();
};

Hangman.prototype.drawRightHip = function () {
    var x = 209,
        y = 311;

    this.context.fillRect(x, y, this.HIPS_LENGTH, this.HIPS_WIDTH);
};

Hangman.prototype.drawRightLowerLeg = function () {
    var x = 246,
        y = 331;

    this.context.fillRect(x, y, this.LOWER_LEG_WIDTH, this.LOWER_LEG_LENGTH);
};

Hangman.prototype.drawRightLeg = function () {
    this.drawRightHip();
    this.drawRightLowerLeg();
};

Hangman.prototype.drawStageZero = function () {
    this.context.clearRect(0, 0, 400, 500);
};

Hangman.prototype.drawStageOne = function () {
    this.drawStageZero();
    this.drawPost();
};

Hangman.prototype.drawStageTwo = function () {
    this.drawStageOne();
    this.drawBranch();
};

Hangman.prototype.drawStageThree = function () {
    this.drawStageTwo();
    this.drawNoose();
};

Hangman.prototype.drawStageFour = function () {
    this.drawStageThree();
    this.drawHead();
};

Hangman.prototype.drawStageFive = function () {
    this.drawStageFour();
    this.drawBody();
};

Hangman.prototype.drawStageSix = function () {
    this.drawStageFive();
    this.drawLeftArm();
};

Hangman.prototype.drawStageSeven = function () {
    this.drawStageSix();
    this.drawRightArm();
};

Hangman.prototype.drawStageEight = function () {
    this.drawStageSeven();
    this.drawLeftLeg();
};

Hangman.prototype.drawStageNine = function () {
    this.drawStageEight();
    this.drawRightLeg();
};

Hangman.prototype.incorrectGuess = function () {
    this.stage += 1;
    
    switch(this.stage) {
        case 1:
            this.drawStageOne();
            break;
        case 2:
            this.drawStageTwo();
            break;
        case 3:
            this.drawStageThree();
            break;
        case 4:
            this.drawStageFour();
            break;
        case 5:
            this.drawStageFive();
            break;
        case 6:
            this.drawStageSix();
            break;
        case 7:
            this.drawStageSeven();
            break;
        case 8:
            this.drawStageEight();
            break;
        case 9:
            this.drawStageNine();
            break;
        default:
            break;
    }
};