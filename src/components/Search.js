import React from 'react';
import './Search.css';
//Search component
class Search extends React.Component {
    
    
    
    
    render (){
        
        
       const handleSubmit = (event) => {
     
        event.preventDefault();
                
    }
        
        const {
            value,
            onChange,
         
        } = this.props; //destructuring 
        
        return(
                <form onSubmit={handleSubmit}>
                
                       <span>Select a country or region </span>
                     <div> <input placeholder="Italy....Asia" type="text" value={value} onChange={onChange}></input>    </div>    
                </form>
        )
            
    }

}

export default Search;