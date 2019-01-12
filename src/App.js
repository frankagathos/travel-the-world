import React from 'react';
import './App.css'
import Search from './components/Search';


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
       
    handleSubmit = (event) => {
     
        event.preventDefault();
                
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
            results_style:'user-has-chosen',
            country_stats_style:'show',
        });
       
       
        //Get photos of selected Country using UNSPLASH API
        const query= selectedCountry[0].name;
        const client_id ="8ed09088a4eb4d257e69127e636984bbf65599f0f00bc9a10a35d759d3f2b7d2"  ;
        let photocounter = this.state.photocounter ; 
          
        //API request  of users country
        fetch(`https://api.unsplash.com/search/photos?client_id=${client_id}&query=${query}`)
         .then(res => res.json())
         .then(json => {
            
            
            this.setState({          
                numberOfPhotos:json.results.length,
                city_photo_url:json.results[photocounter].urls.regular,
                photocounter:this.state.photocounter+1,
              
            }     
            )
        })
   
         console.log('number of photos:'+this.state.numberOfPhotos);
}

getNextImage = () => {
        //Get NEXT PHOTO of selected Country using UNSPLASH API
        const query= this.state.selectedCountryName;
        const client_id ="8ed09088a4eb4d257e69127e636984bbf65599f0f00bc9a10a35d759d3f2b7d2"  ;
        let photocounter = this.state.photocounter ; 
          
        //API request  of users country
        fetch(`https://api.unsplash.com/search/photos?client_id=${client_id}&query=${query}`)
         .then(res => res.json())
         .then(json => {
            

            this.setState({          
                city_photo_url:json.results[photocounter].urls.regular,
                photocounter:this.state.photocounter+1,
              
            }     
            )
        })
}
   


    render () {
        
        //check if it'loading 
        if(this.state.isLoading){
                           return <p>Loading....</p>
                       }
        return (
            
            <div className="App">
                      <div className={this.state.results_style}>
                         <Search onChange={this.onSearchChange} value={this.state.searchTerm} onSubmit={this.handleSubmit}></Search> 
                        
                              
                            <div>                          
                                               {this.state.allCountriesStats.filter(isSearched(this.state.searchTerm)).map(item=>
                            
                                                        <div className="country-card" key={item.alpha3Code} onClick={() => this.onCountryClick(item.alpha3Code)}>
                                                           <div> {item.name} </div>
                                                            <div className="region">{item.region}</div>
                                                             <div> <div className="flag-wrapper"><img src={item.flag} alt={item.flag}/></div></div>
                                                                            
                                                       
                                                                           
                                                         </div>
                                                                                                       
                                                       ) }
                         </div>
                    </div>
                    
                    <div className={this.state.country_stats_style}>
                          
                           {this.state.selectedCountryName} cover(s) an area of  {this.state.selectedCountryArea}km².The capital is {this.state.selectedCountryCapital}.<br></br>
                           It is located in {this.state.selectedCountrySubRegion} and has a population of {(this.state.selectedCountrypopulation/1000000).toFixed(4)} million.
                           
                           <div className='photo-wrapper'>
                                     <img src={this.state.city_photo_url} alt={this.state.selectedCountryName}></img>
                           </div>
                     
                           
                           <button onClick={this.getNextImage}>NEXT IMAGE</button>
                          
                    </div>
         
                    
            </div>
        )
    }
    
}





export default App;