function Pokemon({name, image}){
    return (
        <div>
            <div><h3>{name}</h3></div>
            <div><img src={image}/></div>
        </div>
    )
}

export default Pokemon;