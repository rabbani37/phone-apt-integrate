// data load from API;
const url = "https://openapi.programming-hero.com/api/phones?search=iphone"
const dataLoadFromApi = async () => {
    const response = await fetch(url) 
    const apiData = await response.json()
    const phones = apiData.data;
    console.log(phones)
}

dataLoadFromApi()