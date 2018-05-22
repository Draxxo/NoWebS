/* Formulaire - Simulateur de prêt */

var button = document.getElementById('submit');

// Ce déclenche au click du button
button.onclick = function() {

	var data = serializeForm(); //On serialize

    var resultat = calculTauxInteret(data['montant'], data['duree'], data['taux']); // On calcul le taux

    document.getElementById('resultat').innerHTML = '=> ' + resultat; // On affiche le résultat

    return false;
};

//Calcul du taux d'intêret 
function calculTauxInteret(montant, duree, taux) {
	var resultat = "Erreur";

	var tauxMensuel = taux/100/12;
	resultat = (montant * (tauxMensuel)) / (1 - Math.pow(1+tauxMensuel, duree*12)); //duree en mois

	return resultat;
}

//Serialization de mon formulaire
function serializeForm() {
	var data = [];
	var inputs = document.getElementsByTagName("input"); 
	for (var i = 0; i < inputs.length-1; i++) { 
	    data[inputs[i].name] = inputs[i].value;
	}
	return data;
}