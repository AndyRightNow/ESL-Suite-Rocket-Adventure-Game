# ESL Suite Rocket Adventure Game
ESL Suite Rocket Adventure Game - A game used to kill time for users who are directed to 404 page accidentally.

**Created By Andy Zhou**

Engine Structure:

								Engine Main
									 |
									 |
									 |
					----------------------------------------
					|				 |					   |
					|				 |					   |
					|				 |					   |
					|				 |					   |
				Utillities--------GraphicsClass---------InputClass
	   	               	          (HTML5 Canvas)			


##Engine Introduction:

**Overview:**

It's not a general purpose engine but actually a game prototype. This 
engine can only make this kind of game with limited functionalities. 
For the sake of easier maintainence I make a engine instead of dumping
codes around plainly in the file. The horizontal lines in the diagram 
mean there is data communication between and vertical lines denote it's 
funtionality.

**Components:**

1. Engine Main

   It's the body of the engine, responsible for initializing and shutting down all the subsystems and components, and of course the main process of the game.
2. Utilities

   Responsible for game record calculation and collision detection of objects and so forth.
3. GraphicsClass

   Responsible for drawing the scene, including background, barriers, sprite, .etc.
4. InputClass

   Responsible for getting user's input(mouse movements) and sending the command to the GraphicsClass to animate the scene.


Still Under Development.