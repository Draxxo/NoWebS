/* First exemple *
var toto = {};
var toto = {
	"couleur" : "rouge",
	"taille"  : 22
};

document.write(toto.couleur);
document.write(toto['couleur']);  //Suffixe de chaine


var titi;
//console.log(titi.tamere); // -> undefined

var x = toto['couleur'] || "erreur";

var vol;
//vol.horaire // -> undefined
//vol.horaire.siege // -> TypeError
//var truc = vol.horaire && vol.horaire.siege // -> undefined

toto.couleur = 'jaune';
toto.jambon = "Truc con";

var x = toto;
x.prenom = "Jacky";
var machin = toto.prenom;*/


/* Second exemple *
if(typeof Object.create !== 'function') {
	Object.create = function(truc) {
		var F = function() {};
		F.prototype = truc;
		return new F();
	}
}

var machin = Object.create('bordel');

//Notion de réflèxion
typeof vol.toString(); // 'function'
typeof vol.constructor(); // 'function'

vol.hasOwnProperty('couleur'); // true
vol.hasOwnProperty('constructor'); // false*/

function Voiture(modele) {
	this.modele = modele;
}

var tuning = new Voiture('Fabou');
console.log(tuning.modele);

Voiture.prototype.demarrer = function() {
	alert("Ma " + this.modele + " fait Vroum !");
}

Voiture.prototype.roues = true;

function VoitureTuning() {
	Voiture.apply(this);
}