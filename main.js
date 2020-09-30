class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }
    type() {
        const current = this.wordIndex % this.words.length;

        const fullTxt = this.words[current];

        if (this.isDeleting) {
            //Remove Char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        }
        else {
            //Add Char
            this.txt = fullTxt.substring(0, this.txt.length + 1)
        }

        //Insert txt into element
        this.txtElement.innerHTML = `<span class='txt'>${this.txt}</span>`;

        //Type Speed
        let typeSpeed = 300;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        //Word is complete
        if (!this.isDeleting && this.txt == fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        }
        else if (this.isDeleting && this.txt == '') {
            this.isDeleting = false;
            this.wordIndex++;
            //Pause before start typing
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed)
    }
}


//init on DOM Load
document.addEventListener('DOMContentLoaded', init);

//App init
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    new TypeWriter(txtElement, words, wait)
}
