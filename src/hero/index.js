import {useState} from 'react';
import {Rings} from 'react-loader-spinner';
import {motion} from 'framer-motion';
import dotenv from 'dotenv';

import './index.css';
dotenv.config();

const Hero=()=>{

    const [error,setError]=useState('');
    const [userQuery,setUserQuery]=useState('');
    const [fixQuery,setFixQuery]=useState('');
    const [isLoading,setIsLoading]=useState(false);
    const [fetchedData,setFetchedData]=useState([]);

    const fetchImages=async(e)=>{
        e.preventDefault();
        const clients_id=process.env.clients_id;
        if(userQuery){
            setIsLoading(true);
            const results= await fetch(`https://api.unsplash.com/search/photos?query=${userQuery}&client_id=${clients_id}`);
            const data=await results.json();
            setFetchedData(data.results);
            setIsLoading(false);
            console.log(results);
            console.log(data);
            if (data.errors) {
                console.error("Error fetching images:", data.errors);
              } else {
                let imageUrls = data.results.map((image) => image.urls.regular); // Extract image URLs
                console.log("Image URLs:", imageUrls); // Now you have the image URLs
                setFixQuery(userQuery);
                setUserQuery('');
                setIsLoading(false);
              }
        }
        else{
            setError("please provide some text");
        }
    }
    const heading="Search For your Favourite images".split("");

    return(
        <div className='heroContainer'>
            <h1 className='header'>
                {heading.map((el,index)=>(
                    <motion.span
                    initial={{opacity:0}}
                    whileInView={{opacity:1,transition:{delay:index/10}}}
                    >{el}{""}</motion.span>
                ))}
            </h1>
            <form onSubmit={fetchImages} className='inputForm'>
                <input type="text" className='userInput' placeholder="cat, dog, girl" onChange={(e)=>{setUserQuery(e.target.value)}} />
                <button type="submit" className='searchBtn'>search</button>
            </form>
            {error && <span style={{color:'red'}}>{error}</span>}
            {fetchedData.length>0 && <p className='description'>results of <span className='specia'>{fixQuery}</span></p>}
            <div className='imageContainer'>
                {isLoading && fetchedData.length<=0 ? <Rings
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="rings-loading"
                wrapperStyle={{}}
                wrapperClass=""
                className="loading"
                />:null}
            {
                fetchedData.length > 0 && fetchedData.map((doc,index)=>(
                    <motion.span key={index} className='eachImage'
                    initial={{opacity:0}}
                    whileInView={{opacity:1,transition:{delay:index/8}}}>
                        <img src={doc.urls.small} alt={doc.alt_description} className='unsplashImage' loading="lazy" />
                        <span className='imageText'>{doc.alt_description}</span>
                    </motion.span>
                )) 
            }
            </div>
        </div>
    )
}

export default Hero;