## Simple Game Engine

The engine is in ``` src/engine/ ```  directory. It provides basic utilities of the game.

#### Engine Structure
1. Utilities

    1) ```collision.js``` - simple collision detection functionality.
    
    2) ```shape.js``` - a collection of shapes(Box, Polygon and Circle)
    
    3) ```timer.js``` - a timer providing start, stop, pause and resume.
    
    4) ```utility.js``` - helper functions
    
    5) ```vector.js``` - vector object and operations

2. ```input.js``` - encapsulations of document mouse and keys events
3. ```graphics.js``` - encapsulations of HTML 2D Canvas drawing
4. ```engine.js``` - main file of the engine, controlling initializations of other sub-systems and the game loop.

## A Simple Arcade Game: ESL Suite Rocket Adventure Game

ESL Suite Rocket Adventure Game - A game used to kill time for users who are directed to 404 page accidentally.

The game is in ```src/game``` directory and the distribution version is in ```dist/```.

If you want to try it yourself, remember to write:
```javascript
Game.init(YourCanvasId);
```
The parameter ```YourCanvasId``` is the canvas the game will be shown on. The size of the canvas'd better be 1000 x 400 and the height should be no larger than 500.

**Created By Andy Zhou**

Actually the game is too simple to explain anything LOL. It's a simple project for learning and practicing JavaScript. Anyway, have some fun!
