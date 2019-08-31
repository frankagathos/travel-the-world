import React from 'react';
import './App.css'
import Search from './components/Search';
import CountryInfo from './components/CountryInfo'

const isSearched =(searchTerm) => {
return function(item) {
return !searchTerm ||
item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||  item.region.toLowerCase().includes(searchTerm.toLowerCase());//important function for the search
}
}


class App extends React.Component {
    
    constructor(props) {
 super(props);
this.state = {
       searchTerm:'',
       selectedCountry:'',
       allCountriesStats:[], 
       isLoading:false,
       results_style:'show',
       country_stats_style:'hide',
       photocounter:0,
   } 
this.onSearchChange = this.onSearchChange.bind(this);
this.onCountryClick = this.onCountryClick.bind(this);
this.getNextImage = this.getNextImage.bind(this);
}

    

 
   componentDidMount(){
       
    this.setState({isLoading:true});   
    //API request from country rest full apis startin data
    fetch(`https://restcountries.eu/rest/v2/all`)     
       .then(res => res.json())
       .then(json => {
           this.setState ({
               allCountriesStats:json,
               isLoading:false,
           })        
       })
   }
       

   onSearchChange = (event) => {

         this.setState({
            searchTerm:event.target.value,//important event.target.value
        });
       
   }
   

   onCountryClick(id) {
   const isId = item => item.alpha3Code===id;
   const selectedCountry = this.state.allCountriesStats.filter(isId);
   
      this.setState({
          
            selectedCountryName:selectedCountry[0].name,
            selectedCountryArea:selectedCountry[0].area,
            selectedCountryCapital:selectedCountry[0].capital,
            selectedCountrySubRegion:selectedCountry[0].subregion,
            selectedCountrypopulation:selectedCountry[0].population,
            selectedCountryFlag:selectedCountry[0].flag,
            results_style:'user-has-chosen',
            country_stats_style:'show',
            photocounter:1,  
        });
       
       
        //Get photos of selected Country using UNSPLASH API
        const query= selectedCountry[0].name;
        const client_id ="8ed09088a4eb4d257e69127e636984bbf65599f0f00bc9a10a35d759d3f2b7d2";
        let photocounter = 0; 
          
          this.setState({isLoading:true});   
        //API request  of users country
        fetch(`https://api.unsplash.com/search/photos?client_id=${client_id}&query=${query}`)
         .then(res => res.json())
         .then(json => {
            
            
            this.setState({          
                numberOfPhotos:json.results.length,
                city_photo_url:json.results[photocounter].urls.regular,
                all_city_urls:json.results,
                isLoading:false,         
            }     
            )
        }) 
        
 
}

getNextImage = () => {
  
        let photocounter = this.state.photocounter; 
        const TotalPhotos = this.state.numberOfPhotos;
        const AllUrls = this.state.all_city_urls;
    if (TotalPhotos>photocounter){     
            this.setState({          
                city_photo_url:AllUrls[photocounter].urls.regular,
                photocounter:this.state.photocounter+1,
            })
            }
 
     else{
            this.setState({          
                city_photo_url:AllUrls[0].urls.regular,
                photocounter:1,
            })
            }
                  
}
//maybe correct
getPreviousImage = () =>{
    let photocounter = this.state.photocounter; 
    const TotalPhotos = this.state.numberOfPhotos;
    const AllUrls = this.state.all_city_urls;
    
    let firstPrevious = true;
    if (firstPrevious){
        
        if(photocounter>1){
         this.setState({          
                city_photo_url:AllUrls[photocounter-2].urls.regular,
                photocounter:this.state.photocounter-1,
                })
            firstPrevious=false;
        }
       else {
                this.setState({          
                city_photo_url:AllUrls[TotalPhotos-1].urls.regular,
                photocounter:TotalPhotos,
                })
            firstPrevious=false;
       }
    } 
  
    else {
                this.setState({          
                city_photo_url:AllUrls[photocounter-1].urls.regular,
                photocounter:this.state.photocounter-1,
            })
                
    }    
}






    

    render () {
        //check if it'loading 
        if(this.state.isLoading){
                           return <p>Loading....</p>
                       }

                   
        return (
        
            <div className="App">
                      <div className={this.state.results_style}>
                         <Search onChange={this.onSearchChange} value={this.state.searchTerm}></Search> 
                        
                              
                                                    
                                               {this.state.allCountriesStats.filter(isSearched(this.state.searchTerm)).map(item=>
                            
                                                        <div className="country-card" key={item.alpha3Code} onClick={() => this.onCountryClick(item.alpha3Code)}>
                                                            <div> {item.name} </div>
                                                            <div className="region">{item.region}</div>
                                                            <div>
                                                                 <div className="flag-wrapper"><div style={{height:'150px',background:'url('+item.flag+')',width:'300px',backgroundPosition:"center center",backgroundSize:"cover",}}/>
                                                                 </div>
                                                            
                                                            </div>
                                                                            
                                                       
                                                                           
                                                         </div>
                                                                                                       
                                                       ) }
                           
                     </div>
               
                    <div className={this.state.country_stats_style}>
                    
                          <CountryInfo imgUrl={this.state.selectedCountryFlag} CountryName={this.state.selectedCountryName}  CountryArea={ this.state.selectedCountryArea} CountryCapital={this.state.selectedCountryCapital}  CountrySubRegion={this.state.selectedCountrySubRegion} CountryPopulation={this.state.selectedCountrypopulation}></CountryInfo>
                          
       
                           <div className='photo-wrapper'>
                                     <img src={this.state.city_photo_url} alt={this.state.selectedCountryName}></img>
                                     
                           </div>
                            <div>
                                     {this.state.photocounter+'/'+this.state.numberOfPhotos}
                            </div>
                          
                           <button onClick={this.getPreviousImage}>PREVIOUS</button>
                           <button onClick={this.getNextImage}>NEXT</button> 
                    </div>
         
                    
            </div>
        )
    }
    
}





export default App;