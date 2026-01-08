// data load from API;
const url = "https://openapi.programming-hero.com/api/phones?search=iphone"
const dataLoadFromApi = async () => {
    const response = await fetch(url)
    const apiData = await response.json()
    const phones = apiData.data;
    displayPhone(phones)
    
}

const displayPhone = phones => {
    const phonesContainer = document.getElementById("phones_container")
    phones.forEach(phone => {
        console.log(phones);
        const {brand,image,phone_name,slug} = phone;
        const phoneCard = document.createElement('div');
        phoneCard.classList = "card bg-base-200 w-full  shadow-sm p-5 border border-gray-300"
        phoneCard.innerHTML=`
        <p class="text-gray-400">${brand} </p>
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

dataLoadFromApi(); // call dataLoad function