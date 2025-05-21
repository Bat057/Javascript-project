async function getWorks() {
    const reponse = await fetch("http://localhost:5678/api/works")
    const works = await reponse.json()
    
    return works
} 

function genererProjets(works){
    
    for (let i = 0; i < works.length; i++) {
        
        const projet = works[i];
        Categories.add(projet.category.name);
        const divGallery = document.querySelector(".gallery");
        const projetElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        const captionElement = document.createElement("figcaption");

        const figureProjet = divGallery.appendChild(projetElement);
        figureProjet.appendChild(imageElement);
        figureProjet.appendChild(captionElement);

        imageElement.src = projet.imageUrl;
        captionElement.innerText = projet.title;  
    }
}
    
function filtre(name) {
    const worksFiltre = works.filter(function (work) {
        
        return work.category.name === name;
    });

    document.querySelector(".gallery").innerHTML = "";
    genererProjets(worksFiltre);
};

function genererBtnCategories() {
    
    const sectionPortfolio = document.querySelector("#portfolio");
    const divCategories = document.createElement("div");
    divCategories.classList.add("button")
    const divGallery = document.querySelector(".gallery");
    sectionPortfolio.appendChild(divCategories);
    sectionPortfolio.insertBefore(divCategories, divGallery);

    const btnCategories = document.createElement("button"); 
    divCategories.appendChild(btnCategories);
    btnCategories.innerText = "Tous";
    btnCategories.dataset.category = "tous";

    const boutonTous = document.querySelector('[data-category="tous"]');

    boutonTous.addEventListener("click", function () {
        document.querySelector(".gallery").innerHTML = "";
        genererProjets(works);
    })

    for (let item of Categories) {
            
        const btnCategories = document.createElement("button");
        
        btnCategories.addEventListener("click",() => {
            filtre(item)
        })
        divCategories.appendChild(btnCategories);
        btnCategories.innerText = item;
        btnCategories.classList = item;
        /* liCat.classList.add(item); */
    }
        
}

const works = await getWorks();
var Categories = new Set();
genererProjets(works);
genererBtnCategories();
    













    


