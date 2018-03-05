# Memory Game Project

This is my project for udacity nanodegree. Is is a program simulation of popular guessing game.

program consists of 4 files:
1. index.html
2. app.css
3. app.js
4. geometry2.png

in app.js you can find following functions:
1. shuffle(array) from http://stackoverflow.com/a/2450976
2. display(cards) - takes list of card ids, suffles them and alocates random card icons to them
3. match(array) - takes an array of size 2 of cards and untoggeles the 'match' class, afet that checks if the game is won
4. won( )- checks if the game is won, displays end game alert
5. hide(array) - takes an array of 2 cards, runs animation andhides the icons of cards
6. increase_cnt( ) - increases the move count and sets the star rating
7. clicked( ) - showes the clicked card and checks if two cards are of the same type
