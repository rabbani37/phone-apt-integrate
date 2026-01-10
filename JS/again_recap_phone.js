const dataLoadPhones = async (searchValue = "iphone", isShowAllClicked) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchValue}`);
    const data = await res.json();
    const phones = data.data;
    phonesArrayData(phones, isShowAllClicked);
}
const phonesArrayData = (phones, isShowAllClicked) => {
    console.log(phones);
    const phonesContainer = getElement("phones_container");
    phonesContainer.textContent = "";

    // if phone more than 8 'Show All' hide/visible and if clicked button visible all phone
    const showAllButton = getElement("show_all_button")
    if (phones.length > 9 && !isShowAllClicked) {
        phones = phones.slice(0, 9)
        showAllButton.classList.remove("hidden");
    } else {
        showAllButton.classList.add("hidden");
    }

    phones.forEach((phone) => {
        phoneCardDisplay(phone);

    })

}
const phoneCardDisplay = (phone) => {
    const phonesContainer = getElement("phones_container");
    const phoneCard = document.createElement("div")
    phoneCard.classList = "card bg-base-200 w-full  shadow-sm p-5 border border-gray-300";
    phoneCard.innerHTML = `
            <p class="text-gray-400"> ${phone.brand}</p>
             <figure>
                        <img src="${phone.image}" />
                    </figure>
                    <div class="card-body text-center">

                        <h2 class="text-2xl font-bold text-center"> ${phone.phone_name} </h2>
                        <p class="text-gray-600 font-semibold">A card component has a figure, a body part, and inside
                            body there are title and actions parts</p>

                        <div class="card-actions justify-center">
                            <button onclick="detailsHandler('${phone.slug}')" class="btn w-3/5  btn-primary">Show Details</button>
                        </div>
                    </div>
    `;
    phonesContainer.appendChild(phoneCard)
    toggleLoadingSpinner(false)
}



// search handler
const searchHandle = (isShowAllClicked) => {
    toggleLoadingSpinner(true)
    const searchField = getElement("search_field");
    const searchValue = searchField.value;
    dataLoadPhones(searchValue, isShowAllClicked) // call data form API according to search result
}
const showAllHandler = () => {
    searchHandle(true)
}
const detailsHandler = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    phoneDetailsDisplay(phone)
}
const phoneDetailsDisplay = (phone) => {
    show_details_modal.showModal() // open modal
    const { brand, image, name, releaseDate, slug, mainFeatures, others } = phone;
    console.log(phone)
    const phoneDetailsContainer = getElement("show_details_container");
    phoneDetailsContainer.innerHTML = `

                <div class="bg-slate-50 rounded-lg p-6 mb-5 flex justify-center">
                    <img src="${image}" alt="Phone" class="h-48 object-contain" />
                </div>

                <h3 id="show_details_phoneName" class="text-xl font-bold mb-2">${name} </h3>

                <div class="text-sm text-gray-700 space-y-2">
                    <p><span class="font-semibold">Storage:</span> ${mainFeatures?.storage} </p>
                    <p><span class="font-semibold">Display Size:</span> ${mainFeatures?.displaySize} </p>
                    <p><span class="font-semibold">Chipset:</span> ${mainFeatures?.chipSet}</p>
                    <p><span class="font-semibold">Memory:</span> ${mainFeatures?.memory}</p>
                    <p><span class="font-semibold">Slug:</span> ${slug}</p>
                    <p><span class="font-semibold">Release Date:</span> ${releaseDate || "No Date"}</p>
                    <p><span class="font-semibold">Brand:</span> ${brand}</p>
                    <p><span class="font-semibold">GPS:</span> ${others?.GPS || "No GPS"}</p>
                </div>

                <div class="modal-action justify-end mt-6">
                    <form method="dialog">
                        <button class="btn btn-error px-6">Close</button>
                    </form>
                </div>

    `;
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = getElement("loading_spinner");
    if (isLoading) {
        loadingSpinner.classList.remove("hidden")
    } else {
        loadingSpinner.classList.add("hidden");
    }
}







dataLoadPhones(); // call data form API

// utility functions here 
const getElement = (id) => {
    const element = document.getElementById(id);
    return element;
}