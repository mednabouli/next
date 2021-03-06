"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
var abstractions_1 = require("../abstractions");
var SubscriptionStepBody = (function (_super) {
    __extends(SubscriptionStepBody, _super);
    function SubscriptionStepBody() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SubscriptionStepBody.prototype.run = function (context) {
        return models_1.ExecutionResult.next();
    };
    return SubscriptionStepBody;
}(abstractions_1.StepBody));
exports.SubscriptionStepBody = SubscriptionStepBody;
//# sourceMappingURL=subscription-step-body.js.map