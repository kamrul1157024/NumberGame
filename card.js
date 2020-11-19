class Card {
    constructor(base, number_of_cards) {
        this.base = base;
        this.number_of_cards = number_of_cards;
        this.cards = [];

        for (let i = 0; i < number_of_cards; i++) this.cards[i] = new Array();

        this.maxlimit = Math.pow(base, number_of_cards);
        this.makeCards();
    }


    makeCards() {
        for (let current_number = 1; current_number < this.maxlimit; current_number++) {
            let temp = current_number;
            for (let j = 0; j < this.number_of_cards; j++) {
                if (((temp >> j) & 1) === 1) {
                    this.cards[j].push(current_number);
                }
            }
        }
    }

    getCard() {
        return this.cards;
    }

    guessNumber(cards) {
        let number = 0;
        for (let i = 0; i < cards.length; i++) {
            number += Math.pow(this.base, cards[i]);
        }

        return number;
    }

}

class CardGui {
    constructor(card) {
        this.color = ["warning", "success", "primary", "dark"]
        this.cards_array = card.getCard();
        this.singleCard = "";
        this.allCard = "";
        this.row = 6;
        this.rowwidth=this.row*53;
        this.col = (this.cards_array[0].length / this.row) + (this.cards_array[0].length % this.row === 0);
        this.addAll();
    }

    addAll() {
        let random = Math.floor(Math.random() * 10) % this.color.length;
        for (let i = 0; i < card.number_of_cards; i++) {
            random %= this.color.length;
            this.addTopping(this.color[random], i);
            this.addRows(this.cards_array[i]);
            this.addBottom();
            random++;
        }
        this.allCard += '<div class="container">\n';
        this.allCard += '<div class="card-columns">\n';
        this.allCard += this.singleCard;
        this.allCard += '</div>\n';
        this.allCard += '</div>\n';
    }

    addRows(single_array) {
        let j = 0;
        for (let i = 0; i < single_array.length; i++, j++) {
            if (j % this.row === 0) {
                if (i !== 0) this.singleCard += "</tr>\n";
                this.singleCard += "<tr>\n";
            }

            this.singleCard += "<td><h5>" + single_array[i] + "</h5></td>\n";

        }

        this.singleCard += '</tr>\n';
    }

    addTopping(color, id) {
        this.singleCard += '<div id="' + id + '" class="card bg-' + color + ' shadow-lg " style="width:'+this.rowwidth+'px">\n';
        this.singleCard += '<table class="table table-borderless text-white">\n';
    }

    addBottom() {
        this.singleCard += '</table>\n';
        this.singleCard += '</div>\n';
    }

    getHTML() {
        return this.allCard;
    }



}

max_number_limit = 70;
minimum_number_of_card = 4;
base =2;
number_of_cards = Math.max(minimum_number_of_card, Math.floor(Math.log(max_number_limit) / Math.log(base)));
console.log(number_of_cards);
let card = new Card(base, number_of_cards);
let html = new CardGui(card);


console.log(card.getCard()[0]);
// console.log(html.getHTML());


window.addEventListener('DOMContentLoaded', function () {
    document.getElementById("game_div").innerHTML = html.getHTML();
    selectedCards = [];
    for (let i = 0; i < number_of_cards; i++) {
        document.getElementById(i).addEventListener("click", function () {
            document.getElementById(i).classList.toggle("shadow-lg");
            document.getElementById(i).classList.toggle("border-dark");
            let currentHtml = document.getElementById(i).innerHTML;
            let addingSelected = '<span class="badge badge-light">Selected</span>';

            console.log(currentHtml.substring(0, currentHtml.length - addingSelected.length));

            if (currentHtml.substring(currentHtml.length - 5, currentHtml.length - 1) === 'span') {


                if (selectedCards.length != 0) selectedCards.pop();

                document.getElementById(i).innerHTML = currentHtml.substring(0, currentHtml.length - addingSelected.length);

            }
            else {

                selectedCards.push(i);

                document.getElementById(i).innerHTML += addingSelected;

            }
        })
    }

    document.getElementById("getNumber").addEventListener("click", function () {

        if (selectedCards.length == 0) {
            document.getElementById("showResult").innerHTML = "Why you are being so mysterious!,Give Me some Hint!";
        }
        else {
            document.getElementById("showResult").innerHTML = card.guessNumber(selectedCards);

            console.log("Number is -> " + card.guessNumber(selectedCards));
        }

        //to show toast from Bootstrap



    });




});

