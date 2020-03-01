import axios from 'axios';

export const getImages = (params) => {
    let queryParams ={}
    queryParams.api_key = params.apiKey
    queryParams.lat = params.latValue
    queryParams.lon = params.longValue
    queryParams.page = params.pageNumber
    queryParams.method = 'flickr.photos.search';
    queryParams.per_page =10
    queryParams.format='json';
    queryParams.nojsoncallback=1;
    const config = {
        params: queryParams
    };
    const  url =  `https://www.flickr.com/services/rest/`
    return axios.get(url,config);
}