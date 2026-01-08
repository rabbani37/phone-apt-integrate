// data load from API;
const url = "https://openapi.programming-hero.com/api/phones?search=iphone"
const dataLoadFromApi = async () => {
    const response = await fetch(url) 
    const apiData = await response.json()
    const phones = apiData.data;
    // console.log(phones);
    displayPhone(phones)

}

const displayPhone= phones=>{
    // console.log(phones)
    phones.forEach(phone => {
        console.log(phone)
    });
}

dataLoadFromApi(); // call dataLoad function