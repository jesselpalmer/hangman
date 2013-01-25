var User = function () {
    "use strict";

    var username = "",
        score = 0;
};

User.prototype.setUsername = function (username) {
    "use strict";

    this.username = username;
};

User.prototype.getUsername = function () {
    "use strict";

    return this.username;
};

User.prototype.getScore = function () {
    "use strict";

    return this.score;
};

User.prototype.setScore = function (score) {
    "use strict";

    this.score = score;
};