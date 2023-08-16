// Récupération des pièces depuis le fichier JSON
const reponse = await fetch('pieces-autos.json');
const pieces = await reponse.json();

// Fonction qui génère toute la page web
function genererPieces(pieces){
    for (let i = 0; i < pieces.length; i++) {

        const article = pieces[i];
        // Récupération de l'élément du DOM qui accueillera les fiches
        const sectionFiches = document.querySelector(".fiches");
        // Création d’une balise dédiée à une pièce automobile
        const pieceElement = document.createElement("article");
        // Création des balises 
        const imageElement = document.createElement("img");
        imageElement.src = article.image;
        const nomElement = document.createElement("h2");
        nomElement.innerText = article.nom;
        const prixElement = document.createElement("p");
        prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
        const categorieElement = document.createElement("p");
        categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";
        const stockElement = document.createElement("p");
        stockElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";
        
        // On rattache la balise article a la section Fiches
        sectionFiches.appendChild(pieceElement);
        // On rattache l’image à pieceElement (la balise article)
        pieceElement.appendChild(imageElement);
        pieceElement.appendChild(nomElement);
        pieceElement.appendChild(prixElement);
        pieceElement.appendChild(categorieElement);
        //Ajout des éléments au DOM pour l'exercice
        pieceElement.appendChild(descriptionElement);
        pieceElement.appendChild(stockElement);
    
     }
}

// Premier affichage de la page
genererPieces(pieces);

// Bouton pour trier par prix croissant
const boutonTrier = document.querySelector(".btn-trier-croissant");
boutonTrier.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b) {
        return a.prix - b.prix;
        }
    );
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnees);
    }
);

// Bouton pour trier par prix décroissant
const boutonTrierDecroissant = document.querySelector(".btn-trier-décroissant");
boutonTrierDecroissant.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b) {
        return b.prix - a.prix;
        }
    );
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnees);
    }
);

const value = document.querySelector("#value");
const input = document.querySelector("#price");
value.textContent = input.value + "€";
input.addEventListener("input", (event) => {
    value.textContent = event.target.value + "€";
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.prix <= event.target.value;
        }
    );
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
    }
);

// Bouton pour afficher pièces aux prix inférieurs à 35e
const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.prix <= 35;
        }
    );
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
    }
);

// Bouton pour afficher pièces uniquement avec description
const boutonDescription = document.querySelector(".btn-description");
boutonDescription.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.description;
        }
    );
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
    }
);

// Affichage pièces abordables (prix < 35e)

const noms = pieces.map(piece => piece.nom);
for(let i = pieces.length -1 ; i >= 0; i--){
    if(pieces[i].prix > 35){
        noms.splice(i,1)
    }
}

const abordablesElements = document.createElement('ul');

for(let i=0; i < noms.length ; i++){
    const nomElement = document.createElement('li');
    nomElement.innerText = noms[i];
    abordablesElements.appendChild(nomElement);
}

document.querySelector('.abordables')
.appendChild(abordablesElements)

// Affichage des pièces disponibles

const nomPiècesDispos = pieces.map(piece => piece.nom);
const prixPiècesDispo = pieces.map(piece => piece.prix);
for(let i = pieces.length -1 ; i >= 0 ; i--){
    if(pieces[i].disponibilite == false){
        nomPiècesDispos.splice(i,1);
        prixPiècesDispo.splice(i,1);
    }
}

const dispoElements = document.createElement('ul');
for (let i=0; i < nomPiècesDispos.length ; i++){
    const nomElement = document.createElement('li');
    nomElement.innerText = `${nomPiècesDispos[i]} - ${prixPiècesDispo[i]} €`;
    dispoElements.appendChild(nomElement);
}

document.querySelector('.disponibles')
.appendChild(dispoElements)