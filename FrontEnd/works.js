async function getWorks() {
    const reponse = await fetch("http://localhost:5678/api/works")
    const works = await reponse.json()

    return works
}

function genererProjets(works) {

    for (let i = 0; i < works.length; i++) {
        const allFigure = document.querySelectorAll("figure")
  
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
            const reponse = await fetch(`http://localhost:5678/api/works/${projet.id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
            })

            const modal = document.querySelector(".modal")
            modal.close()
            /*const figureToDelete = document.querySelector(`figure[data-id="${projet.id}"]`)
            console.log(figureToDelete)
            figureToDelete.remove()*/
           const divGallery = document.querySelector(".gallery")
            const allFigure = divGallery.querySelectorAll("figure")
            const allDiv = galleryModal.querySelectorAll("div")
            allFigure.forEach(function (e) {
                e.remove()
            })
            allDiv.forEach(function (e) {
                e.remove()
            })
            works = await getWorks()
            genererProjets(works)
            genererModal(works)
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

    for (let i = 0; i < worksFiltre.length; i++) {
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
        if (item == "Objets") {
            option.setAttribute("selected", true)
            option.value = "1"
        }
        if (item == "Hotels & restaurants") {
            option.value = "3"
        } else if (item == "Appartements") {
            option.value = "2"
        }

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
    const arrowBack = document.querySelector(".arrow-back")

    btnModal.addEventListener("click", () => {
        addPic.forEach((e) => {
            e.classList.remove("hidden")
        })
        noAdd.forEach((e) => {
            e.classList.add("hidden")
        })
        arrowBack.style.visibility = "initial"
    })

    arrowBack.addEventListener("click", () => {
        addPic.forEach((e) => {
            e.classList.add("hidden")
        })
        noAdd.forEach((e) => {
            e.classList.remove("hidden")
        })
        arrowBack.style.visibility = "hidden"
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

    const addImg = document.querySelectorAll(".preview")
    const previewImg = document.getElementById('imgPreview')

    modal.addEventListener("close", () => {

        addPic.forEach((e) => {
            e.classList.add("hidden")
        })
        noAdd.forEach((e) => {
            e.classList.remove("hidden")

        })
        addImg.forEach((e) => {
            e.classList.remove("hidden")
        })
        arrowBack.style.visibility = "hidden"

        previewImg.classList.add("hidden")
        modal.querySelector('.input').value = ''
        modal.querySelector(".selectCategory").value = "1"
        modal.querySelector(".inputImg").value = ""
        /*document.getElementById("imgPreview").setAttribute('src', "")*/
    })

    const input = document.querySelector(".input")
    input.addEventListener("input", (event) => {
        document.querySelector(".submit").style.backgroundColor = "#1D6154"
        if (input.value == '') {
            document.querySelector(".submit").style.backgroundColor = "#a7a7a7"
        }
    })

    const inputImg = document.querySelector(".inputImg");
    inputImg.addEventListener('change', () => {
        const file = inputImg.files;

        if (file) {
            const fileReader = new FileReader();

            fileReader.onload = event => {
                previewImg.classList.remove("hidden")
                previewImg.setAttribute('src', event.target.result);
                addImg.forEach(function (e) {
                    e.classList.add("hidden")
                })
            }
            fileReader.readAsDataURL(file[0]);

        }

    })


}

function addWork() {
    const form = document.querySelector(".formModal")
    const dialogReponse = document.querySelector(".reponse")
    const errorMsg = dialogReponse.querySelector("p")

    form.addEventListener('submit', async (event) => {
        event.preventDefault()
        let token = sessionStorage.getItem("token")


        const input = document.querySelector(".inputImg")
        let formData = new FormData(form)
   
        for (var key of formData.entries()) {
            console.log(key[0], key[1]);
        }

        const reponse = await fetch('http://localhost:5678/api/works', {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        })

        if (reponse.status != 201) {
            dialogReponse.showModal()
            errorMsg.innerHTML = "Erreur dans le formulaire."
            errorMsg.style.color = "red"
            
        } else {
            const modal = document.querySelector(".modal")
            modal.close()

            const divGallery = document.querySelector(".gallery")
            const allFigure = divGallery.querySelectorAll("figure")
            allFigure.forEach(function (e) {
                e.remove()
            })

            const galleryModal = document.querySelector(".galleryModal")
            const allDiv = galleryModal.querySelectorAll("div")
            allDiv.forEach(function (e) {
                e.remove()
            })

            works = await getWorks()
            genererProjets(works)
            genererModal(works)

            dialogReponse.showModal()
            errorMsg.innerHTML = "Projet ajouté."
            errorMsg.style.color = "green"
            console.log(reponse)
        }
    })
}

let works = await getWorks()
const Categories = new Set()
genererProjets(works)
genererModal(works)
genererBtnCategories()
setAdminMode()
addWork()



































