const phoneDataLoad11 = async (searchValue = "oppo", isClicked_showAll) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
    const res = await fetch(url);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones)
    phoneDisplay11(phones, isClicked_showAll);
}

const phoneDisplay11 = (phones, isClicked_showAll) => {
    const phonesContainer = getElement("phones_container");
    phonesContainer.textContent = '';

    const showAllButton = getElement("show_all_button")
    if (phones.length > 10 && !isClicked_showAll) {
        phones = phones.slice(0, 10);
        showAllButton.classList.remove("hidden") // show
    } else {
        showAllButton.classList.add("hidden") // hide
    }


    phones.forEach(phone => {
        phoneCardDisplay(phone);
    });
}
// loading Spinner
const toggleLoadingSpinner11 = (isLoading) => {
    const loadingSpinner = getElement("loading_spinner")
    if (isLoading) {
        loadingSpinner.classList.remove("hidden")
    }
    else {
        loadingSpinner.classList.add("hidden")
    }
}

// search button
const searchHandle = (isClicked_showAll) => {
    toggleLoadingSpinner11(true) // on loadingSpinner
    const searchField = getElement("search_field");
    const searchValue = searchField.value;

    phoneDataLoad11(searchValue, isClicked_showAll);
}
const showAllHandler = () => {
    searchHandle(true)

}

phoneDataLoad11() // call data from APT and sent phones data phoneDisplay11() function

//-------------------------------------------------------
const phoneCardDisplay = (phone,) => {
    const { brand, image, phone_name, slug } = phone;
    const phonesContainer = getElement("phones_container");
    const phoneCard = document.createElement("div");
    phoneCard.classList = "card bg-base-200 w-full  shadow-sm p-5 border border-gray-300"
    phoneCard.innerHTML = `
    <p class="text-gray-400">${brand}</p>
             <figure>
                        <img src="${image}" />
                    </figure>
                    <div class="card-body text-center">

                        <h2 class="text-2xl font-bold text-center"> ${phone_name}</h2>
                        <p class="text-gray-600 font-semibold">A card component has a figure, a body part, and inside
                            body there are title and actions parts</p>

                        <div class="card-actions justify-center">
                            <button onclick="showDetailsHandler('${slug}')" class="btn w-3/5  btn-primary">Show Details</button>
                        </div>
                    </div>
    `;

    phonesContainer.appendChild(phoneCard);
    toggleLoadingSpinner11(false) // off loadingSpinner

}
//-------------------------------------------------
// show details handler 
const showDetailsDataLoad = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data
    singlePhone(phone)
}
const showDetailsHandler = (id) => {
    // console.log("show details", id)
    showDetailsDataLoad(id);

}
const singlePhone = (phone) => {
    show_details_modal.showModal() // open modal
    const {brand, image, name, releaseDate, slug, mainFeatures, others } = phone;
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
                    <p><span class="font-semibold">Release Date:</span> ${releaseDate}</p>
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





// utility functions here 
const getElement = (id) => {
    const element = document.getElementById(id);
    return element;
}

