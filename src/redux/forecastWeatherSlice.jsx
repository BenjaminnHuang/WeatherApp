import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  forecasts: [], // An array to store forecasts for 5 days
  loading: false,
  error: null,
};

export const fetchForecastData = createAsyncThunk(
  'forecastWeather/fetchForecastData',
  async (cityName, thunkAPI) => {
    try {
      const apiKey = '2f460cf262bf4f4dffcae1a7800d90be';
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${apiKey}`
      );

      // Extract data for the next 5 days
      const forecasts = response.data.list.filter((forecast, index) => index % 8 === 0).map((forecast) => {
        const dateInSeconds = forecast.dt;
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = new Date(dateInSeconds * 1000); // Convert to milliseconds
        const dayOfWeek = daysOfWeek[date.getUTCDay()];
        return {
          dayOfWeek,
          highTemp: forecast.main.temp_max,
          lowTemp: forecast.main.temp_min,
          condition: forecast.weather[0].icon,
          date: dateInSeconds,
        };
      });

      return forecasts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const forecastWeatherSlice = createSlice({
  name: 'forecastWeather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchForecastData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchForecastData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.forecasts = action.payload; // Store the forecasts for 5 days
      })
      .addCase(fetchForecastData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default forecastWeatherSlice.reducer;
