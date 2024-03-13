import axios from 'axios';
import {Base64} from 'js-base64';

const API_KEY = 'AIzaSyC49z95GgWRQ9IVcaYzUPJOppvcweaRQ4A';
const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;

export const analyzeImage = async (image) => {

    const encodedString=Base64.encode(image); //the image needs to be encoded
    const requestBody = {
        requests: [
            {
                image: {
                    content: encodedString
                },
                features: [
                    { type: 'LABEL_DETECTION', maxResults: 5 }
                ]
            }
        ]
    };
    console.log(requestBody);
    try {
        const response = await axios.post(API_URL, requestBody, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status !== 200) {
            throw new Error('Error calling the Vision API: ' + response.statusText);
          }
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error calling the Vision API", error);
        throw error;
    }
};