// data load from API;
const phoneDataLoad = async (searchText = 'iphone', isShowAll) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const response = await fetch(url)
    const apiData = await response.json()
    const phones = apiData.data;
    displayPhone(phones, isShowAll)

}
phoneDataLoad()
const displayPhone = (phones, isShowAll) => {

    phoneCountAndShow(phones) // phone count korche and UI te dekhacche 
    const phonesContainer = document.getElementById("phones_container");
    phonesContainer.textContent = '';



    showAllButtonShow(phones, isShowAll) // button hidden if phone more than 6

    // console.log(isShowAll)

    if (!isShowAll) {
        phones = phones.slice(0, 6);
    }
    // else{
    //      phones = phones.slice();
    // }

    phones.forEach(phone => {
        // console.log(phones);
        const { brand, image, phone_name, slug } = phone;
        const phoneCard = document.createElement('div');
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
                            <button onclick="handleShowDetails('${slug}')" class="btn w-3/5  btn-primary">Show Details</button>
                        </div>
                    </div>
        `;
        phonesContainer.appendChild(phoneCard);
    });
    toggleLoadingSpinner(false); // hide loading spinner
}

// handle show details & modal open
const handleShowDetails = async (id) => {
    // console.log("slug", id)
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const singleData = await res.json();
    const singlePhone = singleData.data
    // console.log(singlePhone);

    showPhoneDetails(singlePhone)
}
// show phone details in Modal
const showPhoneDetails = (singlePhone) => {
    const { name,image,brand,mainFeatures } = singlePhone;
    show_details_modal.showModal()

    const showDetailsContainer = document.getElementById("show_details_container")
    showDetailsContainer.innerHTML = `
    
                <div class="bg-slate-50 rounded-lg p-6 mb-5 flex justify-center">
                    <img src="${image}" alt="Phone" class="h-48 object-contain" />
                </div>

                
                <h3 id="show_details_phoneName" class="text-xl font-bold mb-2">
                    ${name}
                </h3>

                
                <p class="text-sm text-gray-500 mb-4">
                    It is a long established fact that a reader will be distracted by the readable content of a page
                    when looking at its layout.
                </p>

                
                <div class="text-sm text-gray-700 space-y-2">
                    <p><span class="font-semibold">Storage:</span> 128GB / 256GB / 1TB</p>
                    <p><span class="font-semibold">Display Size:</span> 6.7 inches, 108.9 cm</p>
                    <p><span class="font-semibold">Chipset:</span> Apple A15 Bionic</p>
                    <p><span class="font-semibold">Memory:</span> 128GB 6GB RAM</p>
                    <p><span class="font-semibold">Slug:</span> iphone_13_pro_max</p>
                    <p><span class="font-semibold">Release Date:</span> September 24, 2021</p>
                    <p><span class="font-semibold">Brand:</span> Apple</p>
                    <p><span class="font-semibold">GPS:</span> A-GPS, GLONASS, GALILEO</p>
                </div>

                <div class="modal-action justify-end mt-6">
                    <form method="dialog">
                        <button class="btn btn-error px-6">Close</button>
                    </form>
                </div>
    
    `;
    // console.log(singlePhone)


}


// handel search button
const searchHandler = (isShowAll) => {
    toggleLoadingSpinner(true) // show loading spinner
    const inputField = document.getElementById("search_field");
    const inputText = inputField.value;
    const inputValue = inputText.trim().toLowerCase();
    // inputField.value = '';
    phoneDataLoad(inputValue, isShowAll);
}


const phoneCountAndShow = (phones) => {

    const phonoCount = phones.length;
    const totalPhone = document.getElementById("total_Phone");
    totalPhone.innerText = phonoCount;

}

const showAllButtonShow = (phones, isShowAll) => {
    const showAllButton = document.getElementById("show_all_container");
    if (phones.length > 6 && !isShowAll) {
        // console.log(phones.length)
        showAllButton.classList.remove("hidden");
    } else {
        showAllButton.classList.add("hidden");
    }
}
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById("loading_spinner");
    if (isLoading) {
        loadingSpinner.classList.remove("hidden");
    } else {
        loadingSpinner.classList.add("hidden");

    }
}

// handle show all
const handleShowAll = () => {
    searchHandler(true)
}


