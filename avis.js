export function ajoutListenersAvis() {

    const piecesElements = document.querySelectorAll(".fiches article button");

    for(let i = 0; i < piecesElements.length; i++){

        piecesElements[i].addEventListener("click", async function(event){
            const id = event.target.dataset.id;
            const reponse = await fetch(`http://localhost:8081/pieces/${id}/avis`);
            const avis = await reponse.json();
            const pieceElement = event.target.parentElement;

            const avisElement = document.createElement("p");
            for(let j = 0; j < avis.length; j++){
                avisElement.innerHTML += `<b>${avis[j].utilisateur}:</b> ${avis[j].commentaire}<br>`;
                pieceElement.appendChild(avisElement);  
            }
            pieceElement.appendChild(avisElement);
        });
    }
}

export function ajoutListenersEnvoyerAvis(){
    const formulaireAvis = document.querySelector(".formulaire-avis");
    formulaireAvis.addEventListener("submit",function(event){
        event.preventDefault();
        const avis = {
            pieceId: parseInt(event.target.querySelector("[name=piece-id]").value),
            utilisateur: event.target.querySelector("[name=utilisateur]").value,
            commentaire: event.target.querySelector("[name=commentaire]").value,
        };
        const chargeUtile = JSON.stringify(avis);
        fetch("http://localhost:8081/avis",{
                method: "POST",
                headers:{"Content-Type": "application/json" },
                body: chargeUtile
            }
        );

    });
}

