import {useState} from 'react';

const Main=()=>{
    const [image,setImage]=useState('');
    const [error,setError]=useState('');
    const [userQuery,setUserQuery]=useState('');
    const [fetchedData,setFetchedData]=useState([]);

    const handleImageChange=(e)=>{
        const selectedImage=e.target.files[0];
        //even though we mentioned accept input only image they can override (or) insert empty so validation required
        if(selectedImage && selectedImage.type.match('image/*')  ){
            setImage(selectedImage);
        }
        else{
            setError("*please select a valid image");
        }
    }

    const loadUploadedImage=()=>{
        if(image){
            console.log(image);
            console.log("image inserted successfully");
        }
        else{
            setError("*image is missing");
        }
    }

    const fetchImages=async()=>{
        if(userQuery){
            const results= await fetch(`https://api.unsplash.com/search/photos?query=${userQuery}&client_id=_-F6scScvqFOvyOCNKz_rxYK1s3Zdr6AH4vaKqjfvdU`);
            const data=await results.json();
            setFetchedData(data.results);
            console.log(results);
            console.log(data);
            if (data.errors) {
                // Handle errors if any (optional)
                console.error("Error fetching images:", data.errors);
              } else {
                let imageUrls = data.results.map((image) => image.urls.regular); // Extract image URLs
                console.log("Image URLs:", imageUrls); // Now you have the image URLs
              }
        }
        
    }

    return(
        <div>
            Main
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button onClick={loadUploadedImage}>search</button>
            {error && <span style={{color:'red'}}>{error}</span>}
            {/* <p>The Image you are inserted</p> */}
            {/* <img src={image} alt={image.name} className='' /> */}
            <button onClick={fetchImages}>fetch</button>
            {
                fetchedData.length > 0 && fetchedData.map((doc,index)=>(
                    <div key={index}>
                        <img src={doc.urls.regular} alt={doc.alt_description} />
                        <p>{doc.alt_description}</p>
                    </div>
                ))
                
            }
        </div>
    )
}

export default Main;