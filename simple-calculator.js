;(function () {
    function Calculator() {
        var lastValue = null;
        var lastOperation = null;
        var operationFlag = false;
        var resultFlag = false;
        var self = this;

        this.init = function (obj) {
            this.screenCalculator = document.getElementById(obj.screenCalculator);
            this.clearButton = document.querySelector(obj.clearButton);
            this.operationalButtons = document.querySelector(obj.operationalButtons);

            this.operationalButtons.addEventListener("click", buttonController);
            this.clearButton.addEventListener("click", buttonController);

            document.body.addEventListener("keypress", keyboardController);

            this.screenCalculator.addEventListener("click", copy);
        }

        function buttonController(e) {
            var clickedButton = e.target;
            var clickedButtonClasses = clickedButton.classList;
            var clickedButtonText = clickedButton.innerText;
            var screenText = self.screenCalculator;

            screenText.innerText = (isNumeric(screenText.innerText)) ? screenText.innerText : 0;

            if (clickedButtonClasses.contains("calc-button")) {

                if (clickedButtonClasses.contains("digit")) {

                    digitHandler(clickedButtonText);

                } else if (clickedButtonClasses.contains("operation")) {

                    operationHandler(clickedButtonText);

                } else if (clickedButtonClasses.contains("other-button")) {

                    if (clickedButtonClasses.contains("result-button")) {

                        resultHandler();

                    } else if (clickedButtonClasses.contains("dot-button")) {

                        dotHandler(clickedButtonText);

                    } else if (clickedButtonClasses.contains("clear-button-wrapper")) {

                        clear();
                    }
                }
            } else {
                return false;
            }
        }

        function keyboardController(e) {
            var ZERO_KEY_CODE = 48,
                NINE_KEY_CODE = 57,
                DIVISION_KEY_CODE = 47,
                MULTIPLY_KEY_CODE = 42,
                SUB_KEY_CODE = 45,
                ADD_KEY_CODE = 43,
                ENTER_KEY_CODE = 13,
                DOT_KEY_CODE = 46,
                C_KEY_CODE = 99;

            var keyPressedCode = e.keyCode;
            var keyPressedSymbol = String.fromCharCode(e.keyCode);

            if (keyPressedCode >= ZERO_KEY_CODE && keyPressedCode <= NINE_KEY_CODE) {

                digitHandler(keyPressedSymbol);

            } else if (keyPressedCode === DIVISION_KEY_CODE || keyPressedCode === MULTIPLY_KEY_CODE || keyPressedCode === SUB_KEY_CODE || keyPressedCode === ADD_KEY_CODE) {

                operationHandler(keyPressedSymbol);

            } else if (keyPressedCode === ENTER_KEY_CODE) {

                resultHandler();

            } else if (keyPressedCode === DOT_KEY_CODE) {

                dotHandler(keyPressedSymbol);

            } else if (keyPressedCode === C_KEY_CODE) {

                clear();
            }
        }

        function digitHandler(digitSymbol) {
            var screenText = self.screenCalculator;

            if (screenText.innerText === "0") {

                operationFlag = false;
                resultFlag = false;
                screenText.innerText = digitSymbol;

            } else if ( operationFlag === true || resultFlag === true ) {

                operationFlag = false;
                resultFlag = false;
                screenText.innerText = digitSymbol;

            } else {

                operationFlag = false;
                resultFlag = false;
                screenText.innerText += digitSymbol;
            }
        }

        function operationHandler(operationSymbol) {
            var screenText = self.screenCalculator;

            if (operationFlag === true) {
                lastOperation = operationSymbol;

            } else if (lastValue === null) {

                lastValue = screenText.innerText;
                lastOperation = operationSymbol;
                operationFlag = true;

            } else {

                screenText.innerText = calculate(lastValue, lastOperation, screenText.innerText);
                lastValue = screenText.innerText;
                lastOperation = operationSymbol;
                operationFlag = true;
            }
        }

        function resultHandler() {
            var screenText = self.screenCalculator;

            if (lastValue !== null && lastOperation !== null) {
                screenText.innerText = calculate(lastValue, lastOperation, screenText.innerText);
                resultFlag = true;
                lastValue = null;
                lastOperation = null;
            }
        }

        function dotHandler(dotSymbol) {
            var screenText = self.screenCalculator;

            if (screenText.innerText.indexOf(".") === -1) {
                screenText.innerText += dotSymbol;
            }
        }

        function clear() {
            var screenText = self.screenCalculator;

            lastValue = null;
            lastOperation = null;
            screenText.innerText = 0;
        }

        function calculate(firstValue, operation, secondValue) {
            try {
                var result = eval(+firstValue + operation + +secondValue);

                if (!isNumeric(result)) {
                    throw new Error("Error");
                }
            } catch (e) {
                result = e.message;
            }
            return result;
        }

        function copy(e) {
            var range = document.createRange();

            range.selectNode(self.screenCalculator);
            document.getSelection().addRange(range);
        }

        function isNumeric(value) {
            return !isNaN(parseFloat(value)) && isFinite(value);
        }

    }

    var calculator = new Calculator();
    calculator.init({
        screenCalculator: "results",
        clearButton: ".clear-button-wrapper",
        operationalButtons: ".operational-wrapper"
    });
}());