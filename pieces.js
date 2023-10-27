import { ajoutListenersAvis } from "./avis.js";
const pieces = await fetch("http://localhost:8081/pieces").then(pieces=>pieces.json());





function genererPieces(pieces){
    for (let i = 0 ; i < pieces.length ;i++){

        const pieceElement = document.createElement("article");
    
        const imageElement = document.createElement("img");
        imageElement.src = pieces[i].image;
        pieceElement.appendChild(imageElement);
    
        const nomElement = document.createElement("h2");
        nomElement.innerText = pieces[i].nom;
        pieceElement.appendChild(nomElement);
    
        const prixElement = document.createElement("p");
        prixElement.innerText = `Prix: ${pieces[i].prix} € (${pieces[i].prix < 35 ? "€" : "€€€"})`;
        pieceElement.appendChild(prixElement);
    
        const categorieElement = document.createElement("p");
        categorieElement.innerText = pieces[i].categorie ?? "(aucune catégorie)";
        pieceElement.appendChild(categorieElement);
    
        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = pieces[i].descriptionElement ?? "pas de description pour le moment";
        pieceElement.appendChild(descriptionElement);
    
        const dispoElement  = document.createElement("p");
        dispoElement.innerText = pieces[i].disponibilite == true ? "(En stock)" : "(repture de stock)";
        pieceElement.appendChild(dispoElement);
    
        const avisBouton = document.createElement("button");
        avisBouton.dataset.id = pieces[i].id;
        avisBouton.textContent = "Afficher les avis";
        pieceElement.appendChild(avisBouton);

        document.querySelector(".fiches").appendChild(pieceElement);
    }
    ajoutListenersAvis();
}
genererPieces(pieces);

const boutonTrierCrois = document.querySelector(".btn-trier-crois")
boutonTrierCrois.addEventListener("click",function(){
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function(a,b){
        return a.prix - b.prix;
    });
    document.querySelector(".fiches").innerHTML = '';
    genererPieces(piecesOrdonnees);
});
const boutonTrierDecrois = document.querySelector(".btn-trier-decrois")
boutonTrierDecrois.addEventListener("click",function(){
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function(a,b){
        return b.prix - a.prix;
    });
    document.querySelector(".fiches").innerHTML = '';
    genererPieces(piecesOrdonnees);
});

const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click",function(){
    const piecesFiltrees = pieces.filter(function(piece){
        return piece.disponibilite == true;
    });
    document.querySelector(".fiches").innerHTML = '';
    genererPieces(piecesFiltrees);
});


const inputPrixMAx = document.querySelector("#prix-max");

inputPrixMAx.addEventListener('input',function(){
    const piecesFiltrees = pieces.filter(function(piece){
        return piece.prix <= inputPrixMAx.value;
    });
    document.querySelector(".fiches").innerHTML = '';
    genererPieces(piecesFiltrees);
});














