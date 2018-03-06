// Create a list that holds all of your cards
 
const cards= ["c1","c2","c3","c4","c5","c6","c7","c8","c9","c10","c11","c12","c13","c14","c15","c16"]
const mgs = ["fa-diamond", "fa-paper-plane-o", "fa-anchor","fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];


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

//takes list of card ids, suffles them and alocates random card icons to them
function display(cards){
	console.log("shuffled");
	cards = shuffle(cards);
	for (let i=0; i < cards.length; i++){
		const card = document.getElementById(cards[i]);
		card.classList = "fa"
		card.classList.toggle(imgs[i%8]);
	}
}

//takes an array of size 2 of cards and untoggeles the 'match' class, afet that checks if the game is won
function match(array){
	for (let i = 0; i < 2; i ++){
	    array[i].classList.toggle("match");
	}
	score +=1
	setTimeout(won, 800);
	
}

//checks if the game is won, displays end game alert
function won(){
	if (score === 8){
		const starRating = "* ".repeat(stars)
		if (confirm(`star rating: ${starRating} You won in ${cnt} moves and it took you ${time} seconds\n play again?`)){
			location.reload()
		}
}}

//takes an array of 2 cards, runs animation andhides the icons of cards
function hide(array){

	for (let i = 0; i < 2; i ++){
		array[i].classList.toggle("shake");
		array[i].classList.toggle("disabled");
		array[i].style.backgroundColor = 'red';
		setTimeout(function() { array[i].classList.toggle("open"); }, 800);
    	setTimeout(function() { array[i].classList.toggle("show"); }, 800);
    	setTimeout(function() { array[i].classList.toggle("shake"); }, 800);
    	setTimeout(function() { array[i].style.backgroundColor = ''; }, 800);
    }
}

//Increases the move count and sets the star rating, starts the clock
function increase_cnt(){
	if (cnt === 0){
		start = Date.now();
		update_clock();
	}

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


//showes the clicked card and checks if two cards are of the same type
function clicked(e){
	increase_cnt();
	time = (Date.now() - start )/1000
    e.target.classList.toggle('open');
    e.target.classList.toggle('show');
    e.target.classList.toggle("disabled");
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

//updates the content of clock element
function update_clock(){
	document.getElementById("clock").textContent = (Date.now() - start )/1000;
	setTimeout(update_clock, 100);
}


//***********************************************************************


display(cards);
let stars = 3;
console.log("*"*stars)
let card = "";
let open = [];
let start = 0;
let time = 0;
score = 0;
let cnt = Number(document.getElementById("cnt").textContent);

//set a click event at each card

for (let i = 0; i< cards.length; i++){
document.getElementsByClassName("card")[i].addEventListener("click", function(e){
	clicked(e);
  })}

//resteart the game if the button is clicked
document.getElementsByClassName("restart")[0].addEventListener("click", function(){
	location.reload()
})
//END///

