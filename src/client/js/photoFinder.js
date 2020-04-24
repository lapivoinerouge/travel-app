// pixabay variables
const pixabayUrl = 'https://pixabay.com/api/?key=';
const pixabayKey = '16200588-f8290938e3f301deeb4dd349e';
const pixabayCityQuery = '&q=';
const pixabayOtherParams = '&image_type=photo';

// get data from pixabay API
async function getPhoto(city) {

    const pixaCity = city.toLowerCase();

    try {
        const res = await fetch(pixabayUrl+pixabayKey+pixabayCityQuery+pixaCity+pixabayOtherParams);
        
        const pixaData = await res.json();
        const data = {
            url: pixaData.hits[0].largeImageURL
        }
        return data;

    } catch(error) {
        console.log("error", error);
    }
};

export {
    getPhoto
}