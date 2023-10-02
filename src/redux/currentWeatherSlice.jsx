import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// initialize the state
const initialState = {
  city: null,
  temperature: null,
  humidity: null,
  windSpeed: null,
  condition: null,
  loading: false,
  error: null,
};

// Create an async thunk for fetching weather data
export const fetchWeatherData = createAsyncThunk(
  'currentWeather/fetchWeatherData',
  async (cityName, thunkAPI) => {
    try {
      const apiKey = '2f460cf262bf4f4dffcae1a7800d90be';
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`
      );
      console.log(response.data.name)
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const currentWeatherSlice = createSlice({
  name: 'currentWeather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.temperature = action.payload.main.temp;
        state.humidity = action.payload.main.humidity;
        state.windSpeed = action.payload.wind.speed;
        state.condition = action.payload.weather[0].main;
        state.city = action.payload.name;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default currentWeatherSlice.reducer;
