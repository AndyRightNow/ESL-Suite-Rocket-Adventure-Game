# ESL Suite Rocket Adventure Game
ESL Suite Rocket Adventure Game - A game used to kill time for users who are directed to 404 page accidentally.

**Created By Andy Zhou**

##Engine Introduction:

**Overview:**

It's not a general purpose engine but actually a game prototype. This 
engine can only make this kind of game (Simple Arcade Game) with limited functionalities. For the sake of easier maintainence I make a engine instead of dumping codes around plainly in the file. The horizontal lines in the diagram mean there is data communication between and vertical lines denote its 
calling hierarchy.

**Components:**

1. Engine Main

   It's the body of the engine as well as the body of the game, responsible for initializing and shutting down all the subsystems and components, and of course the main process of the game.
2. Utilities

   Responsible for game record calculation and miscellaneous utilities.
3. GraphicsClass

   Responsible for drawing the scene, including background, barriers, sprite, .etc.
4. InputClass

   Responsible for getting user's input(mouse movements).
5. Physics

   Responsible for collision detection using SAT(Separating Axis Theorem).
6. Gameplay

   Gameplay scripting and objects.


#Game Page:

http://andyrightnow.github.io