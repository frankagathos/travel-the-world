import React from 'react';
import './Search.css';
//Search component
class Search extends React.Component {
    
    render (){
        const {
            value,
            onChange,
            onSubmit
        } = this.props; //destructuring 
        
        return(
                <form onSubmit={onSubmit}>
                       <div>Travel the world</div>
                       <span>By country or Region </span>
                     <div> <input placeholder="Italy....Asia" type="text" value={value} onChange={onChange}></input>    </div>    
                </form>
        )
            
    }

}

export default Search;