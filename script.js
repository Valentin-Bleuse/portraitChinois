document.addEventListener("DOMContentLoaded", function () {
    // instructions Javascript exécutées après chargement du DOM

    fetch('data.json').then(function (response) {
        response.json().then(function (data) {
            console.log(data);
            var numCase = 0;
            var bloc = document.querySelector(".etagere")

            function createCard(cardId) {//fonction permettant de créer une carte
                var newCard = document.createElement('div');
                newCard.classList.add('card-complete');
                newCard.innerHTML = '<div class="card"><div class=disk ></div><div class= "card-inner card-inner-visible"><div class="card-front"><img src="' + data[cardId]['image'] + '" alt="image de boite de DVD"></img></div><div class="card-back"><div class="bio"><img class="attaches" src="images/attaches.png" alt=""><h3>Si j\'étais ' + data[cardId]['genre'] + ', je serais: ' + data[cardId]['title'] + '</h3>' + data[cardId]['explication'] + '</div></div></div></div></div>';
                bloc.appendChild(newCard);
                document.querySelectorAll('.disk')[cardId].style.backgroundImage = 'url(' + data[cardId].image2 + ')';
            }

            data.forEach(function afficheElement(element) {
                //Création grâce au fichier data.js des pochettes de DVD
                if (numCase == data.length - 1) { //pour que la dernière case affiche le formulaire
                    bloc.innerHTML = bloc.innerHTML + '<div class="card-complete"><div class= "card"><div class=disk></div><div class= "card-inner card-inner-visible"><div class="card-front"><img src="' + data[numCase]['image'] + '" alt="image de boite de DVD"></img></div><div class="card-back"><div class="bio"><img class="attaches" src="images/attaches.png" alt=""><form><label for="typeOfMovie">Type<br></label><input type="text" name="typeOfMovie" id="typeOfMovie"><br><label for="nameOfMovie">Nom de l\'oeuvre<br></label><input type="text" name="nameOfMovie" id="nameOfMovie"><br><label for="justification">Parce que...</label><br><textarea name="justification" id="justification" cols="20" rows="10"></textarea><label for="url1">url image pochette<br><input type="url" name="url1" id="url1"></label><label for="url2">url image disque<br><input type="url" name="url2" id="url2"></label><label for="email">votre adresse e-mail:</label><input type="email" id="email"><input type="button" class="send" value="Soumettre la proposition"></form></div></div></div></div></div></div>';
                }
                else {//pour les autres cases
                    createCard(numCase);
                }

                numCase += 1;
                if ((numCase % 4) == 0) { //affichage des traits après 4 cases, pour donner un effet étagère
                    bloc.innerHTML = bloc.innerHTML + '<div class="trait"></div>'
                }

            });
            numCase = 0;

            function cardTestPosition(cardId) {//fonction plaçant les cartes trompe l'oeil par dessus les vrais cartes
                //Création grâce au fichier data.js des pochettes de DVD
                //On récupère les coordonées de la classe card-complete
                var gauche = document.querySelectorAll(".card-complete")[cardId].offsetLeft - 225;
                var haut = document.querySelectorAll(".card-complete")[cardId].offsetTop;
                // A l'aide des données, on créer des pochettes de DVD identiques et on les superpose en leur associant les coordonnées
                if (cardId == 7) {// si l'ID vaut 7, on a à faire au formulaire
                    var cardCompleteTest = document.createElement('div');//création des cartes trompe l'oeil
                    cardCompleteTest.classList.add('card-complete-test');
                    cardCompleteTest.classList.add('card-complete-final');
                    cardCompleteTest.innerHTML = '<div class="card-back-test"><div class="biot"><img class="attachest" src="images/attaches.png" alt=""><h3></h3><form class="formt"><label for="typeOfMovieT">Si j\'étais...<br></label><input type="text" name="typeOfMovieT" id="typeOfMovieT"><br><label for="nameOfMovieT">Je serais...<br></label><input type="text" name="nameOfMovieT" id="nameOfMovieT"><br><label for="justificationT">Parce que...</label><textarea name="justificationT" id="justificationT" cols="20" rows="10"></textarea><br><label for="url1T">url image pochette</label><input type="url" name="url1T" id="url1T"><br><label for="url2T">url image disque</label><input type="url" name="url2T" id="url2T"><br><label for="emailT">votre adresse e-mail:</label><input type="email" id="emailT"><input type="button" class="send" value="Soumettre la proposition"><div id="messageApresEnvoie"></div></form></div></div><div class="card-front-test"><div class="exit"><img class="exitImg" src="images/exit.png" alt="fermer le DVD"></div><div class=diskt ></div></div>';
                    bloc.appendChild(cardCompleteTest);//ajoute la carte trompe l'oeil qui vient d'être créer à la page en tant que nouvel enfant
                }
                else {
                    var cardCompleteTest = document.createElement('div');//création des cartes trompe l'oeil
                    cardCompleteTest.classList.add('card-complete-test');
                    cardCompleteTest.classList.add('card-complete-final');
                    cardCompleteTest.innerHTML = '<div class="card-back-test"><div class="biot"><img class="attachest" src="images/attaches.png" alt=""><h3>Si j\'étais ' + data[cardId]['genre'] + ', je serais: ' + data[cardId]['title'] + '</h3>' + data[cardId]['explication'] + '</div></div><div class="card-front-test"><div class="exit"><img class="exitImg" src="images/exit.png" alt="fermer le DVD"></div><div class=diskt ></div></div>';
                    bloc.appendChild(cardCompleteTest);//ajoute la carte trompe l'oeil qui vient d'être créer à la page en tant que nouvel enfant
                }

                document.querySelectorAll(".card-complete-test")[cardId].style.top = haut + 'px';
                document.querySelectorAll(".card-complete-test")[cardId].style.left = gauche + 'px';
                document.querySelectorAll(".card-complete-test")[cardId].style.display = "none";
                document.querySelectorAll('.diskt')[cardId].style.backgroundImage = 'url(' + data[cardId].image2 + ')';
            };

            data.forEach(function afficheElement(element) {
                cardTestPosition(numCase);//appelle la fonction cardTEstPosition à chaque nouveau tour de boucle en prenant la valeur de numCase commme paramètre
                numCase += 1;
            });

            function onClickOpen(cardId, event) {//Fonction d'ouverture de bôite
                //ouverture de la boite
                if (event.target.parentElement.parentElement.classList.contains('card-inner-visible')) {
                    var card = event.target.parentElement;
                    //la carte se tourne
                    card.style.opacity = "0";
                    card.firstElementChild.style.opacity = "1";
                    card.classList.add('card-inner-visible');
                    card.parentElement.style.transform = "rotateY(-180deg)";
                    card.parentElement.style.transformOrigin = "left";
                    card.parentElement.classList.remove('card-inner-visible');
                    //Les valeurs des animates sont bloqués après grâce au SetTimeout
                    setTimeout(function () {
                        //remplacement de la case ouverte de départ par la fausse case ouverte
                        console.log(cardId)
                        document.querySelectorAll(".card-complete-test")[cardId].style.visibility = "visible";
                        document.querySelectorAll(".card-complete-test")[cardId].style.display = "flex"//On affiche la case de remplacement
                        document.querySelectorAll(".card")[cardId].style.visibility = "hidden";
                        document.body.scrollTop = 0;
                        document.documentElement.scrollTop = 0;//On masque la case de départ
                        document.querySelectorAll(".card-complete-test")[cardId].animate({ width: "67.5%", height: "90%", }, 500);
                        document.querySelectorAll(".biot")[cardId].animate({ fontSize: "1.7rem", }, 500);
                        document.querySelectorAll(".biot h3")[cardId].animate({ fontSize: "1.8rem", }, 500);
                        document.querySelectorAll(".biot")[cardId].animate({ padding: "5px", }, 500);
                        hautt = document.querySelectorAll(".card-complete-test")[cardId].offsetTop;
                        gauchet = document.querySelectorAll(".card-complete-test")[cardId].offsetLeft;
                        console.log('haut=', hautt, 'droite=', gauchet);
                        document.querySelectorAll(".card-complete-test")[cardId].animate({ "top": "50px", "left": "250px" }, 500);
                        document.querySelectorAll(".attachest")[cardId].animate({ width: "504.717px", height: "668px" }, 500);
                        document.querySelectorAll(".diskt")[cardId].animate({ height: "432.91px", width: "432.91px" }, 500);
                        document.querySelectorAll(".exit")[cardId].animate({ height: "68.75px", width: "68.75px" }, 500);
                    }, 300);
                    //Les valeurs des animates sont bloqués après grâce au SetTimeout
                    setTimeout(function () {
                        console.log(document.querySelectorAll(".card-complete-test")[cardId])
                        document.querySelectorAll(".card-complete-test")[cardId].style.width = "67.5%";
                        document.querySelectorAll(".card-complete-test")[cardId].style.height = "90%";
                        document.querySelectorAll(".card-complete-test")[cardId].style.top = "50px";
                        document.querySelectorAll(".card-complete-test")[cardId].style.left = "250px";
                        document.querySelectorAll(".biot")[cardId].style.fontSize = "1.7rem";
                        document.querySelectorAll(".biot h3")[cardId].style.fontSize = "1.8rem";
                        document.querySelectorAll(".attachest")[cardId].style.width = "504.717px";
                        document.querySelectorAll(".attachest")[cardId].style.height = "668px";
                        document.querySelectorAll(".biot")[cardId].style.minWidth = "90%";
                        document.querySelectorAll(".biot")[cardId].style.maxWidth = "90%";
                        document.querySelectorAll(".diskt")[cardId].style.height = "432.91px";
                        document.querySelectorAll(".diskt")[cardId].style.width = "432.91px";
                        document.querySelectorAll(".exit")[cardId].style.width = "68.75px";
                        document.querySelectorAll(".exit")[cardId].style.height = "68.75px";
                    }, 800);
                }
            }

            numCase = 0;
            document.querySelectorAll(".card .card-inner").forEach(function (element) {
                element.addEventListener('click', onClickOpen.bind(this, numCase));//appelle la fonction onCLickOpen à chaque nouveau tour de boucle en prenant la valeur de numCase commme paramètre
                numCase++;
            });


            function onClickClose(cardId, event) {//fonction qui gère la fermeture d'un DVD
                console.log("fermeture DVD");
                document.querySelectorAll(".card-complete-test")[cardId].animate({ width: "450px", height: "300px", }, 500);
                document.querySelectorAll(".biot")[cardId].animate({ fontSize: "0.76rem", }, 500);
                document.querySelectorAll(".biot h3")[cardId].animate({ fontSize: "0.80rem", }, 500);
                document.querySelectorAll(".card-complete-test")[cardId].animate({ "top": hautt + "px", "left": gauchet + "px" }, 500);
                document.querySelectorAll(".attachest")[cardId].animate({ width: "225px", height: "300px" }, 500);
                document.querySelectorAll(".diskt")[cardId].animate({ height: "190px", width: "190px" }, 500);
                document.querySelectorAll(".exit")[cardId].animate({ height: "30.169px", width: "30.169px" }, 500);
                //Les valeurs des animates sont bloqués après grâce au SetTimeout
                setTimeout(function () {//réduit la fenètre
                    document.querySelectorAll(".card-complete-test")[cardId].style.width = "450px";
                    document.querySelectorAll(".card-complete-test")[cardId].style.height = "300px";
                    document.querySelectorAll(".card-complete-test")[cardId].style.top = hautt + "px";
                    document.querySelectorAll(".card-complete-test")[cardId].style.left = gauchet + "px";
                    document.querySelectorAll(".biot")[cardId].style.fontSize = "0.76rem";
                    document.querySelectorAll(".biot h3")[cardId].style.fontSize = "0.80rem";
                    document.querySelectorAll(".attachest")[cardId].style.width = "225px";
                    document.querySelectorAll(".attachest")[cardId].style.height = "300px";
                    document.querySelectorAll(".biot")[cardId].style.minWidth = "90%";
                    document.querySelectorAll(".biot")[cardId].style.maxWidth = "90%";
                    document.querySelectorAll(".diskt")[cardId].style.height = "190px";
                    document.querySelectorAll(".diskt")[cardId].style.width = "190px";
                    document.querySelectorAll(".exit")[cardId].style.width = "30.169px";
                    document.querySelectorAll(".exit")[cardId].style.height = "30.169px";
                    document.querySelectorAll(".card-complete-test")[cardId].style.visibility = "hidden";
                    document.querySelectorAll(".card")[cardId].style.visibility = "visible";
                    //fermeture de la boîte				
                    document.querySelectorAll(".card-front")[cardId].parentElement.style.transform = "rotateY(0deg)";
                    document.querySelectorAll(".card-front")[cardId].parentElement.style.transformOrigin = "left";
                    document.querySelectorAll(".card-front")[cardId].style.opacity = "1";
                    document.querySelectorAll(".card-front")[cardId].parentElement.firstElementChild.style.opacity = "1";
                    document.querySelectorAll(".card-front")[cardId].parentElement.classList.add('card-inner-visible');
                }.bind(this), 500);
            };

            numCase = 0;
            //rétrecissement puis disparition lorsque l'on clique en haut à droite de la boîte
            document.querySelectorAll(".exit").forEach(function (element) {
                element.addEventListener('click', onClickClose.bind(this, numCase))
                numCase++;
            }.bind(this));

            //récupération des données du formulaire
            document.querySelectorAll('.send')[1].addEventListener('click', function (e) {
                var newCardId = data.length;
                data.push({ 'genre': document.querySelector('#typeOfMovieT').value, 'title': document.querySelector("#nameOfMovieT").value, 'explication': document.querySelector("#justificationT").value, 'image': document.querySelector("#url1T").value, 'image2': document.querySelector("#url2T").value })
                console.log(data)
                var urlVisitee = "https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=valentin.bleuse&courriel="+document.querySelector("#emailT").value+"&message=Si j'étais ... " + document.querySelector("#typeOfMovieT").value + " je serais " + document.querySelector("#nameOfMovieT").value +"." + document.querySelector("#justificationT").value;
                fetch(urlVisitee).then(function (response) {
                    response.json().then(function (data) {
                        if (data.status == "success") {
                            document.querySelector("#messageApresEnvoi").innerHTML = "Votre message a bien été reçu";
                            
                        } else {
                            document.querySelector("#messageApresEnvoi").innerHTML = "Problème : votre message n'a pas été reçu";
                        }
                    })
                })
            createCard(newCardId);//création d'une nouvelle carte à partir de la fonction CreateCard
            cardTestPosition(newCardId);//Positionnement de la nouvelle carte factice à partir de la fonction cardTestPosition
            document.querySelectorAll(".card .card-inner")[newCardId].addEventListener('click', onClickOpen.bind(this, newCardId));//appelle de la fonction gérant l'ouverture afin que l'on puisse ouvrir le nouveau dvd
            document.querySelectorAll(".exit")[newCardId].addEventListener('click', onClickClose.bind(this, newCardId));
        });
    });
});

//footer
document.querySelector("footer").addEventListener('click', function (event) {
    console.log('je suis réveillé')
    if (document.querySelector("footer").firstElementChild.classList.contains("volet-invisible")) {
        document.querySelector('.volet-invisible').classList.replace('volet-invisible', 'volet-visible');
    }
    else {
        document.querySelector('.volet-visible').classList.replace('volet-visible', 'volet-invisible');
    }
});
})



//https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=valentin.bleuse&courriel=philippe.gambette@u-pem.fr&message=""
//1025.450x