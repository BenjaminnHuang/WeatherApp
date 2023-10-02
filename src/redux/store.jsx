import { configureStore } from "@reduxjs/toolkit";
import currentWeatherReducer from "./currentWeatherSlice";
import forecastWeatherReducer from "./forecastWeatherSlice";


// create a redux store
export default configureStore({
    // reducers
    reducer: {
        currentWeather: currentWeatherReducer,
        forecastWeather: forecastWeatherReducer
    }
})