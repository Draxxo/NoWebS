/* Formulaire - Simulateur de prêt */

//Comptable qui va faire les comptes !
var comptableOfForm;
function comptable(montant, duree, taux) {
	this.montant = montant;
	this.duree   = duree;
	this.taux    = taux;
}
//Calcul du taux d'intêret 
comptable.prototype.calculTauxInteret = function() {
	var resultat = "Erreur";

	var tauxMensuel = this.taux/100/12;
	resultat = (this.montant * (tauxMensuel)) / (1 - Math.pow(1+tauxMensuel, this.duree*-12)); //duree en mois

	return resultat.toFixed(2);
}

var button = document.getElementById('submit');

// Ce déclenche au click du button du formulaire
button.onclick = function() {

	var data = serializeForm(); //On serialize

	comptableOfForm = new comptable(data['montant'], data['duree'], data['taux']);

	var resultat = parseFloat(comptableOfForm.calculTauxInteret()); // On calcul le taux
	var affichageResultat = document.getElementById('resultat');

	//Vérification des données & affichage du résultat
	if(comptableOfForm.montant < 500 || comptableOfForm.montant > 1000000) {
		affichageResultat.innerHTML = '=> Erreur, vous devez avoir un montant entre 500 & 1.000.000 d\'euros'; 
	}
	else if(comptableOfForm.duree < 1 || comptableOfForm.duree > 25 ) {
		affichageResultat.innerHTML = '=> Erreur, vous devez choisir une durée compris entre 1an et 25ans';
	}
	else if(comptableOfForm.taux < 1 || comptableOfForm.taux > 15) {
		affichageResultat.innerHTML = '=> Erreur, vous devez choisir un taux compris entre 1% et 15% (taux à revoir avec nous)';
	}
	else if(resultat < 0) {
		affichageResultat.innerHTML = '=> Erreur, vérifier bien les informations envoyées.'; 
	}
    else // On affiche le résultat
    	affichageResultat.innerHTML = '=> ' + resultat + ' euros par mois pendant ' + data['duree'] + ' an(s)';
    	
    return false;
};

//Serialization du formulaire
function serializeForm() {
	var data = [];
	var inputs = document.getElementsByTagName("input"); 
	for (var i = 0; i < inputs.length-1; i++) { 
	    data[inputs[i].name] = inputs[i].value;
	}
	return data;
}