
import { useState } from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWeatherData } from '../redux/currentWeatherSlice'
import { fetchForecastData } from '../redux/forecastWeatherSlice'

// the left side of our dashboard that shows todays info
const TodayCard = () => {

    const dispatch = useDispatch()
    const {city, temperature, humidity, windSpeed, condition, loading, error} = useSelector((state) => state.currentWeather)
    


    // City state for the search bar
    const [cityInput, setCity] = useState('')

    // Set the city state to the searched city
    const handleInputChange = (e) => {
        setCity(e.target.value)
    }

    // Triggered when the user clicks enter
    const handleSubmit = async (e) => {
        if(e.key === 'Enter'){
            
            // fetch the current data
            dispatch(fetchWeatherData(cityInput))
            // fetch the five-day forecast
            dispatch(fetchForecastData(cityInput))
        }
    }

    return (
        <div className="w-full rounded-lg p-4 max-h-full">

            <div className='flex items-center bg-gray-100 rounded-lg p-2 gap-2'>
                <AiOutlineSearch className=' text-gray-400 text-xl'/>
                <input 
                    className = " w-full bg-gray-100 text-sm border-none outline-none" 
                    type="text" 
                    placeholder="Search Cities" 
                    onChange={handleInputChange}
                    onKeyDown={handleSubmit}
                />
            </div>

            <div className='text-center mt-10 text-3xl md:text-5xl'>
                {!city ? '' : <h1>{city}</h1>}
            </div>

            <div className='flex flex-row items-center justify-evenly mt-10'>

                <div className='text-6xl md:text-8xl text-center'>
                    {!temperature ?  '' : <h1>{temperature.toFixed()}°F</h1>}
                </div>

                <div className='text-lg md:text-7xl transform -rotate-90 md:rotate-0'>
                    {!condition ? '' : <h1>{condition}</h1>}
                </div>

            </div>

            {humidity && 
            
                <div className='flex flex-row justify-evenly border-2 mt-10 p-4 bg-blue-200 rounded-lg'>
                    
                    <div className='text-center text-xl md:text-2xl'>
                        {!humidity ? '' : <h1>{humidity}% <br/> Humidity</h1>}
                    </div>

                    <div className='text-center text-xl md:text-2xl'>
                        {!windSpeed ? '' : <h1>{windSpeed.toFixed()} MPH <br/> Wind Speed</h1>}
                    </div>
                    


                </div> 
            }
            

        </div>
    )
}

export default TodayCard