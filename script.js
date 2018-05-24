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


//Comptable
var button = document.getElementById('submit');

// Ce déclenche au click du button du formulaire
button.onclick = function() {

	var data = serializeForm('form'); //On serialize

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


//AJAX
var buttonAjax = document.getElementById('submitAjax');

// Ce déclenche au click du button du formulaire
buttonAjax.onclick = function() {

	let martineTenteUneConnexionEnAjax = null;
	martineTenteUneConnexionEnAjax = getXMLHttpRequest();

	martineTenteUneConnexionEnAjax.onreadystatechange = function() {
		if(martineTenteUneConnexionEnAjax.readyState == 4 && martineTenteUneConnexionEnAjax.status == 200) {
			alert(this.responseText);
		}
	};

	let formData = new FormData(document.forms[1]);	
	console.log(formData);

	martineTenteUneConnexionEnAjax.open('POST', 'ajax.php', true);
	martineTenteUneConnexionEnAjax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	martineTenteUneConnexionEnAjax.send(formData);

	return false;
}

//Local storage
var buttonStorage = document.getElementById('submitStorage');

// Ce déclenche au click du button du formulaire
buttonStorage.onclick = function() {
	let datas = serializeForm('formStorage');

	for (var test in datas) {
		sessionStorage.setItem(test, datas[test]);
	}

	console.log(sessionStorage);

	return false;
}


//lOCAL STORAGE && AJAX for connexion
var buttonStorageAjax = document.getElementById('submitStorageAjax');

// Ce déclenche au click du button du formulaire
buttonStorageAjax.onclick = function() {
	let datas = serializeForm('formStorage');

	if(connectionExist()) { //ajax

	}
	else { //local storage 
		for (var test in datas) {
			sessionStorage.setItem(test, datas[test]);
		}
		console.log(sessionStorage);
	}

	console.log(connectionExist().statusText);

	return false;
}

//Tester la conenxion
function connectionExist() {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', 'http://localhost/NoWebS/'); //penser à couper le server WAMP
    xhr.onreadystatechange = function(){     
        if (xhr.readyState == 4 && xhr.status == 200) {
            return true;
        } else if(xhr.readyState == 4) {
            return false;
        }
    };
    xhr.send(null);
    return xhr;
}

//Serialization du formulaire
function serializeForm(idForm) {
	var form = document.getElementById(idForm);
	var data = [];
	var inputs = form.getElementsByTagName("input"); 
	for (var i = 0; i < inputs.length-1; i++) { 
	    data[inputs[i].name] = inputs[i].value;
	}
	return data;
}

//Function pour ce co à de l'ajax si c'est possible !
function getXMLHttpRequest() {
	var totoalaplace = null;

	if(window.XMLHttpRequest || window.ActiveXObject) {
		if(window.ActiveXObject) {
			try {
				totoalaplace = new ActiveXObject('Msxml2.XMLHTTP');
			}
			catch(e) {
				totoalaplace = new ActiveXObject('Microsoft.XMLHTTP');
			}
		}
		else {
			totoalaplace = new XMLHttpRequest();
		}

		return totoalaplace;
	}
	else {
		return false;
	}
}


//Tuning body 
function changeBody() {
	var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";
	document.body.style.background = bgColor;
}