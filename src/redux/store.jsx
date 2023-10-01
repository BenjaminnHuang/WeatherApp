import { configureStore } from "@reduxjs/toolkit";
import currentWeatherReducer from "./currentWeatherSlice";


// create a redux store
export default configureStore({
    // reducers
    reducer: {
        currentWeather: currentWeatherReducer
    }
})