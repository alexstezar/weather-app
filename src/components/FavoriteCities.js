import React, {useState} from 'react';

function FavoriteCities(props) {
    const [cities, setCities] = useState([]);
    function addCity(city){
        setCities([...cities, city]);
    }
    const removeCity = (index) =>{
        const newCities = [...cities];
        newCities.splice(index, 1);
        setCities(newCities);
    };
    const setCity = (city) => {
        props.sendCity(city);
    }
    return (
        <div className="middle">
        <div className="search">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const city = e.target.elements.city.value;
                    if (city) {
                        addCity(city);
                        e.target.elements.city.value = '';
                    }
                }}
            >
                <label htmlFor="city"></label>
                <input type="text" id="city"
                   placeholder='Enter Favourite City'/>
                <button type="submit" className={'add-button'}>Add</button>
            </form>
            <ul className={'items-container'}>
                {cities.map((city, index) => (
                    <li className={'list-item'} key={index}>
                        <button className={'city-name'} onClick={() => setCity(city)}>{city}{' '}</button>
                        <button className={'remove-button'} onClick={() => removeCity(index)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
        </div>
    );

}

export default FavoriteCities;