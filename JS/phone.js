// data load from API;
const phoneDataLoad = async (searchText = 'iphone') => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const response = await fetch(url)
    const apiData = await response.json()
    const phones = apiData.data;
    displayPhone(phones)

}
phoneDataLoad()
const displayPhone = phones => {

    phoneCount(phones) // phone count korche and UI te dekhacche 
    const phonesContainer = document.getElementById("phones_container");
    phonesContainer.textContent = '';

    // console.log(phones.length)
    
    showAllButtonShow(phones) // button hidden if phone more than 6
    phones = phones.slice(0, 6);
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
                            <button class="btn w-3/5  btn-primary">Show Details</button>
                        </div>
                    </div>
        `;
        phonesContainer.appendChild(phoneCard)
    });
}

// handel search button
const searchHandler = () => {
    const inputField = document.getElementById("search_field");
    const inputText = inputField.value;
    const inputValue = inputText.trim().toLowerCase()
    phoneDataLoad(inputValue);
    inputField.value = ''
}
// phoneDataLoad(); // call dataLoad function

const phoneCount = (phones) => {
    const phonoCount = phones.length;
    const totalPhone = document.getElementById("total_Phone");
    const p = document.createElement("p")
    p.innerText = phonoCount;
    totalPhone.appendChild(p)
}

const showAllButtonShow = (phones) => {
    if (phones.length > 6) {
        // console.log(phones.length)
        const showAllButton = document.getElementById("show_all_container")
        showAllButton.classList.remove("hidden")
    }else{
       const showAllButton = document.getElementById("show_all_container")
        showAllButton.classList.add("hidden") 
    }
}


