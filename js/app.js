/*
 * Create a list that holds all of your cards
 */
cards= ["c1","c2","c3","c4","c5","c6","c7","c8","c9","c10","c11","c12","c13","c14","c15","c16"]
imgs = ["fa-diamond", "fa-paper-plane-o", "fa-anchor","fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function display(cards){
	console.log("shuffled");
	cards = shuffle(cards);
	for (let i=0; i < cards.length; i++){
		const card = document.getElementById(cards[i]);
		card.classList = "fa"
		card.classList.toggle(imgs[i%8]);
	}
}

function match(array){
	for (let i = 0; i < 2; i ++){
	    array[i].classList.toggle("match");
	}
	score +=1
	setTimeout(won, 800);
	
}

function won(){
	if (score === 8){
		if (confirm("star rating: "+"* ".repeat(stars)+`You won in ${cnt} moves!, play again?`)){
			location.reload()
		}
}}

function hide(array){

	for (let i = 0; i < 2; i ++){
		array[i].classList.toggle("shake");
		array[i].style.backgroundColor = 'red';
		setTimeout(function() { array[i].classList.toggle("open"); }, 800);
    	setTimeout(function() { array[i].classList.toggle("show"); }, 800);
    	setTimeout(function() { array[i].classList.toggle("shake"); }, 800);
    	setTimeout(function() { array[i].style.backgroundColor = ''; }, 800);
    }
}


function increase_cnt(){
	cnt = Number(document.getElementById("cnt").textContent);
	cnt +=1;
	document.getElementById("cnt").textContent = cnt;
	if (cnt > 22 && cnt < 30){
		document.getElementById("star1").style.visibility = "hidden";
		stars = 2;
	}
	if (cnt > 30){
		stars = 1;
		document.getElementById("star2").style.visibility = "hidden";
	}
}



function clicked(e){
	increase_cnt();
    e.target.classList.toggle('open');
    e.target.classList.toggle('show');
    card = e.target;
    open.push(card);

	if (open.length === 2){

    	if (open[0].firstElementChild.classList[1] === open[1].firstElementChild.classList[1]){
    		match(open);
    	}
    	else {
    		hide(open);
    	}
    	open =[]

    }
}



//LOGIC//

display(cards);
let stars = 3;
console.log("*"*stars)
let card = "";
let open = [];
score = 0;

for (let i = 0; i< cards.length; i++){
document.getElementsByClassName("card")[i].addEventListener("click", function(e){
	clicked(e);
  })}

document.getElementsByClassName("restart")[0].addEventListener("click", function(){
	location.reload()
})

//END///

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
