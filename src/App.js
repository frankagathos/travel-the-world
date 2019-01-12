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
    
   state = {
       searchTerm:'',
       selectedCountry:'',
       allCountriesStats:[], 
       isLoading:false,
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
function Id(item) {
return item.alpha3Code === id;
}
const updatedList = this.state.allCountriesStats.filter(Id);
       console.log(updatedList);
}


    render () {
        
        //check if it'loading 
        if(this.state.isLoading){
                           return <p>Loading....</p>
                       }
        return (
            
            <div className="App">
              
                       <Search onChange={this.onSearchChange} value={this.state.searchTerm} onSubmit={this.handleSubmit}></Search>    
                         <div>   
                                                                      
                                               {this.state.allCountriesStats.filter(isSearched(this.state.searchTerm)).map(item=>
                            
                                                        <div className="country-card" key={item.alpha3Code} onClick={this.onCountryClick}>
                                                           <div> {item.name} </div>
                                                            <div className="region">{item.region}</div>
                                                             <div> <div className="flag-wrapper"><img src={item.flag} alt={item.flag}/></div></div>
                                                                             <span>
                                                                            <button
                                                                            //choose button
                                                                            onClick={() => this.onCountryClick(item.alpha3Code)}
                                                                            type="button"
                                                                            >
                                                                           Select
                                                                            </button>
                                                                            </span>
                                                         </div>
                                                                                                       
                                                       ) }
                       </div>
         
                    
            </div>
        )
    }
    
}





export default App;