import {useState} from 'react';
import { analyzeImage } from '../utils/googleCloudVisionApi';
import './index.css';

const Main=()=>{
    const [image,setImage]=useState('');
    const [error,setError]=useState('');
    const [imageUrl,setImageUrl]=useState('');
    const [apiError,setApiError]=useState('');

    const handleImageChange=(e)=>{
        const selectedImage=e.target.files[0];
        //even though we mentioned accept input only image they can override (or) insert empty so validation required
        if(selectedImage && selectedImage.type.match('image/*')  ){
            setImage(selectedImage);
            const userImageUrl = URL.createObjectURL(selectedImage);
            setImageUrl(userImageUrl);
            console.log(userImageUrl);
        }
        else{
            setError("*please select a valid image");
        }
    }
    const anwers=async()=>{
        try{
        const ans=await analyzeImage(image);
        // const ne= await ans.json();
        console.log(ans);
        // console.log(ne);
    }
        catch(e){
            console.log("main",e);
            console.log(e.message,"here");
            setApiError(e.message+" quota exceeded");
        }
    }
    const styles={
        color:'white',
        width:'100vw',
    }


    return(
        <div>
            <h1>Upload your image</h1>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {/* <button onClick={loadUploadedImage}>search</button> */}
            {error && <span style={{color:'red'}}>{error}</span>}
            {imageUrl&& <p>The Image you are inserted</p> }
            <img src={imageUrl} alt={image.name} className='' />
            {imageUrl&& <button onClick={anwers} className='fetchBtn'>fetch the results</button>}
            <p style={{color:'red'}}>{
                apiError
            }</p>
            <hr style={styles} />
        </div>
    )
}

export default Main;