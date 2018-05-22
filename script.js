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

    var resultat = comptableOfForm.calculTauxInteret() // On calcul le taux

    document.getElementById('resultat').innerHTML = '=> ' + resultat + ' par mois pendant ' + data['duree'] + ' an(s)'; // On affiche le résultat

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