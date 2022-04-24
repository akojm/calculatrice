 // Variables globales
// Eléments mémoires et écran

const memoireElt = document.querySelector("#memoire");
const  ecranElt = document.querySelector("#ecran");
let pourcentElt= document.querySelector("#pourcent");

pourcentElt.addEventListener=('click',()=>{
    console.log("bravo");
})


// On stocke la valeur de l'écran "précédent"
let precedent = 0;

// On stocke l'affichage 
let affichage = "";

// on stocke l'opération 
let operation = null;

// On initialise la mémoire 
let memoire;


window.onload = ()=>{

// Ecouter les clics sur les touches
let touches = document.querySelectorAll('li');
for (let touche of touches ) {
    touche.addEventListener('click', clicTouches)  
}


// Récuperer la valeur de le stockage local
memoire = (localStorage.memoire) ? parseFloat(localStorage.memoire) : 0;
if(memoire != 0)memoireElt.style.display = "initial";

// fonction qui réagit au clic sur une touche

function clicTouches() {
let touche = this.innerText;

// vérification d'un fiffre ou un point (.).
if (parseFloat(touche) >=0 || touche === '.') {
   
    // On met la valeur d'affichage à jour et on affiche sur l'ecran
    affichage = (affichage === "") ? touche.toString() : affichage + touche.toString();
    ecranElt.innerText = affichage;
}else{
    switch (touche) {
        // Touche " C " réinitialise tout //
        case "C":
            precedent = 0;
            affichage= "";
            operation = null;
            ecranElt.innerText=0;
            break;
          
            // les calculs //
            case "+" :
            case "-" :
            case "*" :
            case "/" :
               
                
            // on calcule la valeur de l'étape précédente
                precedent = (precedent === 0) ? parseFloat(affichage) : 
                calculer(precedent, parseFloat(affichage), operation);
            
            // on met à jour l'écran    
                ecranElt.innerText = precedent;
             // on stock l'opération    
                operation = touche;
             // on réinitialise la variable d'affichage   
                affichage = "";
            break;
            case "=" :

            // on calcule la valeur de l'étape précédente
            precedent = (precedent === 0) ? parseFloat(affichage) : 
            calculer(precedent, parseFloat(affichage), operation);
        
         // on met à jour l'écran    
            ecranElt.innerText = precedent;
         // on stock l'opération    
            operation = touche;
         // on stock le résultat dans la variable d'affichage 
            affichage = precedent;
          // on réinitialise précédent
          precedent = 0;  
          break;
          // on gère la mémoire 
          case "M+" :
              // on stock en additionnant la valeur déja en mémoire
           localStorage.memoire = (localStorage.memoire) ? parseFloat(localStorage.memoire)
            + parseFloat(affichage) : parseFloat(affichage);
           break;
           // Gerer le M
           memoireElt.style.display = "initial";
           break;
           // Mémory clear
           case "MC" :
            localStorage.memoire = 0;
            // On efface le M
            memoireElt.style.display = "none";
            break;
            case "MR" :
            // on recupere la valeur stock
            memoire = (localStorage.memoire) ? parseFloat(localStorage.memoire) : 0; 
            // Mettre à jour l'affichage
            affichage = memoire;
            // Mettre à jour l'écran
            ecranElt.innerText = memoire;
            break;
           
    }
}

}

} 
/** 
 * Effectuer le calcul
 *  @param {number} nb1
 *  @param {number} nb2
 *  @param {string} operation
 *  @return float
 */

 function calculer (nb1, nb2, operation){
    nb1 = parseFloat(nb1);
    nb2 = parseFloat(nb2);
    if (operation === "+"){return nb1 + nb2}
    if (operation === "-"){return nb1 - nb2}
    if (operation === "*"){return nb1 * nb2}
    if (operation === "/"){return nb1 / nb2}
    
    }