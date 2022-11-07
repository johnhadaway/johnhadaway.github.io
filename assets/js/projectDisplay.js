var plusOpenDescriptions = document.getElementsByClassName("txt-open-description");
var imgOpenDescriptions = document.getElementsByClassName("img-open-description");

for (var i = 0; i < plusOpenDescriptions.length; i++) {
    plusOpenDescriptions[i].addEventListener("click", function() {
        if (this.children[0].innerHTML == "(+)") {
            this.children[0].innerHTML = "(-)";
        } else {
            this.children[0].innerHTML = "(+)";
        }
        var description = this.parentElement.nextElementSibling;
        if (description.style.display === "block") {
            description.style.display = "none";
        } else {
            description.style.display = "block";
        }
    });
}

for (var i = 0; i < imgOpenDescriptions.length; i++) {
    imgOpenDescriptions[i].addEventListener("click", function() {
        var plusOpenDescription = this.nextElementSibling.children[0].children[0];
        if (plusOpenDescription.innerHTML == "(+)") {
            plusOpenDescription.innerHTML = "(-)";
        } else {
            plusOpenDescription.innerHTML = "(+)";
        }
        var description = this.nextElementSibling.nextElementSibling;
        if (description.style.display === "block") {
            description.style.display = "none";
        } else {
            description.style.display = "block";
        }
    });
}