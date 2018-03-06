// Create a list that holds all of your cards
 
const cards= ["c1","c2","c3","c4","c5","c6","c7","c8","c9","c10","c11","c12","c13","c14","c15","c16"]
const imgs = ["fa-diamond", "fa-paper-plane-o", "fa-anchor","fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];


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
		stop = true;

		time = (Date.now() - start )/1000;

		for (let i = 0; i < cards.length; i++){
			document.getElementsByClassName("card")[0].remove();
		}

		const starRating = "* ".repeat(stars);


		const deck = document.getElementsByClassName("deck")[0];

		let win_div = document.createElement("div");
		win_div.setAttribute("class", "win_message");

		let win_message = document.createElement("p");
		const ms1 = `star rating: ${starRating}`
		const ms2 = `You won in ${cnt} moves and it took you ${time} seconds`
		const ms3 = "play again?"
		win_message.innerHTML = ms1+"<br/>"+ms2+"<br/>"+ms3

		let win_button = document.createElement("button");
		win_button.setAttribute("id", "win_button");
		win_button.textContent = "Yes!";

		deck.appendChild(win_div);
		win_div.appendChild(win_message);
		win_div.appendChild(win_button);

		document.getElementById("win_button").addEventListener("click", function(){
			location.reload()
		})
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
	if (on === true){
		on = false;
		cnt = Number(document.getElementById("cnt").textContent);
		cnt +=1;
		document.getElementById("cnt").textContent = cnt;
		if (cnt > 12 && cnt < 16){
			document.getElementById("star1").style.visibility = "hidden";
			stars = 2;
		}
		if (cnt > 16){
			stars = 1;
			document.getElementById("star2").style.visibility = "hidden";
		}
	} else {
		on = true;
	}
}


//showes the clicked card and checks if two cards are of the same type
function clicked(e){
	increase_cnt();
	
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
	if (stop === false){
		document.getElementById("clock").textContent = (Date.now() - start )/1000;
		setTimeout(update_clock, 50);
	}
}


//***********************************************************************


display(cards);
let stars = 3;
console.log("*"*stars)
let card = "";
let open = [];
let start = 0;
let time = 0;
let score = 0;
let on = false;
let cnt = Number(document.getElementById("cnt").textContent);
let stop = false;

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

