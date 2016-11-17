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
            var keyPressedCode = e.keyCode;
            var keyPressedSymbol = String.fromCharCode(e.keyCode);

            if (keyPressedCode >= 48 && keyPressedCode <= 57) {

                digitHandler(keyPressedSymbol);

            } else if (keyPressedCode === 42 || keyPressedCode === 43 || keyPressedCode === 45 || keyPressedCode === 47) {

                operationHandler(keyPressedSymbol);

            } else if (keyPressedCode === 13) {

                resultHandler();

            } else if (keyPressedCode === 46) {

                dotHandler(keyPressedSymbol);

            } else if (keyPressedCode === 99) {

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
                    throw Error("Error");
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