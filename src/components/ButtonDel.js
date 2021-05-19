import React from 'react';


const ButtonDel = ({supprimerRecette, id}) => {
    
    return (
        <div>
            <button className="deleteBtn" onClick={() => supprimerRecette(id)}>Supprimer</button>
        </div>
    );
};

export default ButtonDel;