const dataLoadPhones = async (searchValue, isShowAllClicked) => {
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
    if (phones.length > 8 && !isShowAllClicked) {
        phones = phones.slice(0, 8)
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
                            <button onclick="" class="btn w-3/5  btn-primary">Show Details</button>
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