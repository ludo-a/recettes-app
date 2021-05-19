import React from 'react';
import ButtonDel from './ButtonDel';


const Card = ({ details, supprimerRecette ,id}) => {
    
    const ingredients = details.ingredients.split(',')
    .map(item => <li key={item}>{item}</li>)
    
    const instructions = details.instructions.split('\n')
    .map(item => <li key={item}>{item}</li>)
    

    return (
        <div className="card">
            <div className="image">
                <img src={process.env.PUBLIC_URL+`/img/${details.image}`} alt={details.nom} />
            </div>
            <div className="recette">
                <div className="alignement">
                    <h2>{details.nom}</h2>
                    <ButtonDel 
                    id={id}
                    supprimerRecette={supprimerRecette} />
                </div>
                <ul className="liste-ingredients">
                    {ingredients}
                </ul>
                <ol className="liste-instructions">
                    {instructions}
                </ol>
            </div>
        </div>
    );
};

export default Card;

