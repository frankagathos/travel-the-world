
import React from 'react';

import './CountryInfo.css';

//Country info component
class CountryInfo extends React.Component{
    render(){
        
                const {
            imgUrl,
            CountryName,
            CountryArea,
            CountryCapital,
            CountrySubRegion,
            CountryPopulation,
            
         
        } = this.props; //destructuring 
        
        return(
                        <div>
             <div className='selected-flag'><img src={ imgUrl} alt={CountryName}></img></div>   
            <div>
                             {CountryName} cover(s) an area of  {CountryArea}km².The capital is {CountryCapital}.<br></br>
                           It is located in {CountrySubRegion} and has a population of {( CountryPopulation/1000000).toFixed(4)} million.
            </div>  
            
        </div>
        )

        
    }
    
    
}

   export default CountryInfo;