# COVIDGame
my attempt at making a covid themed 2D platformer while in covid quarantine

# How to run game
In a terminal window (command prompt in Windows) opened on your project folder, run this command:
```npm install```
In the same terminal window (command prompt in Windows) run this command:

```npm start```

Wait a second and index.html is loaded and displayed in your default browser served by your local web server!

The local web server address is:
http://localhost:10001

CTRL+C to exit

## Game Idea
* You have a character trying to get around outside while staying 6 ft away from everyone else
* You have a time limit to get to the end of the level where you have to wash your hands
* You can get more time by using hand sanitizer
* You have to prevent yourself from touching your face where you will get random "urges" where you will have to hit a space to remember not to touch your face
* Move using arrow keys including jumping
* You lose time if someone gets into your 6ft bubble

![GameIdeaPic](https://github.com/shepkeira/COVID19-Game/blob/master/README_photos/GameIdeaPic.JPG)

## Game Structure
* Start Screne
   * Welcome
   * Click to start
      * Goes to level 1
* Levels
   * Level 1
      * Character 
      * Move forward and backward (left right arrows)
      * show circle around them (moves with character)
      * just jump along platforms
      * show timer (count down)
   * Level 1 Feedback
      * Gravity is too slow (gravity changed from 200 to 400)
      * After gravity is changed jumping not right (jump speed set to 330)
   * Level 2
      * Enemy
      * Health
      * When enemy in bubble health lowered
      * If health reach 0 Game Over

## Game Status
* Intro level with no enemies created
* Basic physics implemented
* Character, background, and platforms created
* Enemy created 
* When enemy proimity detected
* Health removed because of enemy

