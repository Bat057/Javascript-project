async function getWorks() {
    const reponse = await fetch("http://localhost:5678/api/works")
    const works = await reponse.json()

    return works
}

function genererProjets(works) {

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

        figureProjet.dataset.id = projet.id
        imageElement.src = projet.imageUrl;
        captionElement.innerText = projet.title;
    }
}

function genererModal(works) {

    for (let i = 0; i < works.length; i++) {

        const projet = works[i];
        const divModalImage = document.createElement("div")
        const modalImage = document.createElement("img")
        const iconeModalImage = document.createElement("i")
        const galleryModal = document.querySelector(".galleryModal")
        divModalImage.classList.add("noAdd")
        iconeModalImage.classList.add("fa-solid", "fa-trash-can")

        const divModal = galleryModal.appendChild(divModalImage)
        divModal.appendChild(modalImage)
        divModal.appendChild(iconeModalImage)
        modalImage.src = projet.imageUrl;

        iconeModalImage.addEventListener("click", async (event) => {
            event.preventDefault();
            let token = sessionStorage.getItem("token")
            console.log(`${token}`)
            /* token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc0ODI0OTQyOCwiZXhwIjoxNzQ4MzM1ODI4fQ.Nx5CIUQTYuvIE9ijB_vcveHuhi_U77A8mhiOz537rZQ"*/
            const reponse = await fetch(`http://localhost:5678/api/works/${projet.id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
            })
            console.log(reponse)

        })
    }
}

function filtre(name) {
    const worksFiltre = works.filter(function (work) {

        return work.category.name != name;
    });
    console.log(worksFiltre)
    /*document.querySelector(".gallery").innerHTML = "";
    genererProjets(worksFiltre);*/
    for (let i = 0; i < works.length; i++) {
        const idShow = works[i].id
        const projShow = document.querySelector(`[data-id="${idShow}"]`)
        projShow.classList.remove("hidden")
    }

    for (let i =0; i <worksFiltre.length; i++) {
        const idHide = worksFiltre[i].id
        const projHide = document.querySelector(`[data-id="${idHide}"]`)
        projHide.classList.add("hidden")
    }
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
        /*document.querySelector(".gallery").innerHTML = "";
        genererProjets(works);*/
        for (let i = 0; i < works.length; i++) {
            const idShow = works[i].id
            const projShow = document.querySelector(`[data-id="${idShow}"]`)
            projShow.classList.remove("hidden")
        }
    })

    for (let item of Categories) {

        const btnCategories = document.createElement("button");

        btnCategories.addEventListener("click", () => {
            filtre(item)
        })
        divCategories.appendChild(btnCategories);
        btnCategories.innerText = item;
        btnCategories.classList = item;
        /* liCat.classList.add(item); */

        /* Select modal */
        const option = document.createElement("option")
        const selectCategory = document.querySelector(".selectCategory")
        selectCategory.appendChild(option)
        option.innerText = item
    }

    /* logout */
    const logout = document.querySelector(".logout")
    logout.addEventListener("click", function (event) {
        window.sessionStorage.clear()
        window.location.reload()
    })
}

function setAdminMode() {

    const login = document.querySelector(".login");
    const button = document.querySelector(".button");

    const edit = document.querySelectorAll(".admin");

    if (window.sessionStorage.token) {
        edit.forEach(function (e) {
            e.classList.remove("hidden")
        })
        login.classList.add("hidden");
        button.classList.add("hidden");
        document.getElementById("projetsTitle").style.marginLeft = "100px";
    }

    /* gestion modal */
    const btnModal = document.querySelector(".btnModal")
    const addPic = document.querySelectorAll(".add")
    const noAdd = document.querySelectorAll(".noAdd")

    btnModal.addEventListener("click", () => {
        addPic.forEach((e) => {
            e.classList.remove("hidden")
        })
        noAdd.forEach((e) => {
            e.classList.add("hidden")
        })
    })

    const modify = document.querySelector(".modifier")
    const modal = document.querySelector(".modal")

    modify.addEventListener("click", () => {
        modal.showModal();
    });

    const quitModal = document.querySelector(".cross-modal")

    quitModal.addEventListener("click", () => {
        modal.close();
    })

    modal.addEventListener("close", () => {

        addPic.forEach((e) => {
            e.classList.add("hidden")
        })
        noAdd.forEach((e) => {
            e.classList.remove("hidden")
        })

    })
}

const works = await getWorks();
const Categories = new Set();
genererProjets(works);
genererModal(works)
genererBtnCategories();
setAdminMode();
























