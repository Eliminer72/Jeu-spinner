var globalVar = {
	currentScore:0,    //score courant
	currentLevel:1,    //niveau courant
	nextLevel:10,      //nombre de clics restant avant de passer au prochain niveau
	missClick:0,       //compteur de clics perdus
	timer:60,          //valeur du chronometre
	spinTime:2,        //periode de rotation du spinner en seconde
	spinDelay:2000,    //delai avant que le spinner bouge de place
    MAXLEVEL:2,
    divScore : document.getElementById("score"),
	divSpin : document.getElementById("spinner"),
	divChrono :document.getElementById("timer"),
	divCanvas : document.getElementById("canvas"),
	divMissClick : document.getElementById("missClick"),
	divNextLevel : document.getElementById("nextLevel"),
	divLevel:document.getElementById("level")
}

var globalFunc = {
	startGame : function ()  {
		globalVar.divSpin.style.animationDuration = globalVar.spinTime + "s";
		globalVar.divSpin.addEventListener("click",globalFunc.clicReussi);
		globalVar.divCanvas.addEventListener("click",globalFunc.clicPerdu);
		globalVar.divSpin.addEventListener("mouseover",globalFunc.moveSpinner);
	
		
        //on lance le chronometre
        var repeatChrono = setInterval(function () {
            //on teste si le chronometre est à zero
            if (globalVar.timer == 0) {
                //on arrete le chronometre
                clearInterval(repeatChrono);
                //on arrete le jeu et on remet les valeurs initiales dans le HTML
                globalFunc.arretJeu();
             } else {
                globalVar.timer -= 1;
                globalVar.divChrono.innerHTML = globalVar.timer;
            }
		},1000);
	},
	
	clicReussi : function () {
		/* 
        En cas de clic reussi, la méthode clicPerdu() est également automatiquement appelée car le spinner fait aussi parti du canvas
        Pour contrer cela, en cas de clic réussi:
              1- On rajoute au score courant l'equivalent du currentLevel pour contrer la décrémentation que l'on fait dans clicPerdu()
              2- On diminue le compteur de clics perdus d'une unité pour contrer l'incrémentation que l'on fait dans clicPerdu()
        */
		globalVar.currentScore +=10 * globalVar.currentLevel + globalVar.currentLevel;
		globalVar.divScore.innerHTML = globalVar.currentScore;
		
		globalVar.missClick -= 1;
		globalVar.divMissClick.innerHTML = globalVar.missClick;
		
        //Ayant réussi un clic, on decremente le nombre de clic restant avant le prochain niveau
		globalVar.nextLevel -= 1;
		globalVar.divNextLevel.innerHTML = globalVar.nextLevel;
		
         //Si le nombre de clics restant est égal à 0 (c'est à dire qu'on a terminé le niveau) et qu'on s'apprete à passer au niveau suivant
        if (globalVar.nextLevel ==0) {
			//si le niveau courant etait le dernier
			if (globalVar.currentLevel == globalVar.MAXLEVEL) {
				//on arrete le chronometre
                clearInterval(repeatChrono);
                //on arrete le jeu et on remet les valeurs initiales dans le HTML
                globalFunc.arretJeu();
			} else {	
				//on passe au niveau superieur
				globalFunc.passeNiveau();
			}
		}
	},
	
	clicPerdu : function () {
        //on décrémente la valeur du score équivalent au niveau dans lequel on se trouve
		globalVar.currentScore -= globalVar.currentLevel;
        //on met à jour la valeur du score
		globalVar.divScore.innerHTML = globalVar.currentScore;
        //on incrémente le nombre de clic perdu de 1
		globalVar.missClick += 1;
        //on met à jour le nombre de clics perdus
		globalVar.divMissClick.innerHTML = globalVar.missClick;
	},

	passeNiveau : function () {
		//on augmente de level d'une unité et on met à jour le nouveau level
		globalVar.currentLevel += 1;
		globalVar.divLevel.innerHTML = globalVar.currentLevel;
			
		//on accélere la vitesse du spinner et on met à jour l'attribut CSS
		globalVar.spinTime -= 0.25;
		globalVar.divSpin.style.animationDuration = globalVar.spinTime + "s";
			
		//on accelere le temps d'echappement du spinner
		globalVar.spinDelay -= 50;
			
		//on remet le nombre de clics restant à 10
		globalVar.nextLevel = 10;
		globalVar.divNextLevel.innerHTML = globalVar.nextLevel;
			
        //on augmente la valeur du timer et on met à jour
		globalVar.timer = 60 + (globalVar.currentLevel - 1) * 10;
        globalVar.divChrono.innerHTML = globalVar.timer;
	},

    arretJeu : function () {
        
        // initialisation de tous les parametres
        globalVar.currentLevel = 1;
        globalVar.nextLevel = 10;
        globalVar.missClick = 0;
        globalVar.timer = 60;
        globalVar.spinTime = 2;
        globalVar.spinDelay = 2000;
        globalVar.divSpin.style.top = 0;
        globalVar.divSpin.style.left = 0;

		//On supprime les listeners
		globalVar.divSpin.removeEventListener("click",globalFunc.clicReussi);
		globalVar.divCanvas.removeEventListener("click",globalFunc.clicPerdu);
		globalVar.divSpin.removeEventListener("mouseover",globalFunc.moveSpinner);
		
        //Mise à jour des valeurs dans le HTML
        globalVar.divLevel.innerHTML = globalVar.currentLevel;
        globalVar.divNextLevel.innerHTML = globalVar.nextLevel;
        globalVar.divMissClick.innerHTML = globalVar.missClick;
        globalVar.divChrono.innerHTML = globalVar.timer;
                
        //Arret de l'animation du spinner
        globalVar.divSpin.style.animationDuration = "0s";
        
        //Message d'alerte pour signifier la fin jeu et afficher les résultats
        window.alert("Fin du jeu\nVous avez marqué : " + globalVar.currentScore + " points");
        
        //Mise à jour des scores (à terminer en JSON)
        
     },
    
    moveSpinner : function () {
		var posX = Math.trunc(Math.random() * 1600);
		var posY = Math.trunc(Math.random() * 950);
		
		setTimeout(function () {
			globalVar.divSpin.style.left = posX + "px";
			globalVar.divSpin.style.top = posY + "px";
		},globalVar.spinDelay);
		
	}

}

/* questions

J'ai arreté le spinner dans arretJeu avant l'alerte mais c'est l'inverse qui se produit ? Pourquoi ? mettre la mise à 0,0 le spinner avec un setTimeOut à 150ms
Une fois le jeu arreté, le spinner continue de bouger tout seul. Pourquoi ?

Reste à implémenter le test de fin du 5eme niveau

*/

