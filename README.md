# Simple Calculator

Simple calculator project using VanillaJS. Project was created in educational purposes. Design was inspired by standard Calculator App on my Android phone.
But the way of execution all the calculations was replicated from usual desktop calculator. Live app is available on [CodePen](https://codepen.io/papkaos/full/aBBGNZ/).
### Main features
* Check calculation errors like division by zero. You'll never see something like `Infinity` on the screen. If you're interested try to search for similar projects on JS and check division by zero. You'll be surprised:) 
* You can use your keyboard to input values: numbers, operations. `Enter` to get result. Clear screen by `C` button.
* Simple click on the screen of calculator will select current value. In case you'll need to copy it somewhere.
* Also I tried to implement some security measures. If value on the screen will be changed with DevTools, still you won't see some unpredictable results like `NaN` by doing calculations.