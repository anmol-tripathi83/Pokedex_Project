import { Link } from "react-router-dom";
import "./Pokemon.css";
function Pokemon({name, image, id}){
    return (
        <div className="pokemon">
            <Link to={`/pokemon/${id}`}>  {/** LINK component provide by the react router dom to enable the page opening in next page(unlike anchor tag which opened the page in same page by refreshing it) this will spoil the single page application therefore we use LINK component */}
                <div className="pokemon-name">{name}</div>
                <div>
                    <img className="pokemon-image" src={image}/>
                </div>
            </Link>
        </div>
    )
}

export default Pokemon;