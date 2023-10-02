import { useSelector } from 'react-redux';

const Forecast = () => {
  const { forecasts } = useSelector((state) => state.forecastWeather);

  return (

        <div className='sm:flex-row flex-row flex bg-blue-200 overflow-y-auto w-full sm:justify-evenly rounded-lg m-auto'>
        {forecasts.map((forecast, index) => (
            <div key={index} className=" p-2 text-center sm:min-w-fit min-w-full">
            <h1 className="text-lg md:text-2xl">{forecast.dayOfWeek}</h1>
            <h1 className="flex justify-center">
                <img src={`https://openweathermap.org/img/wn/${forecast.condition}@2x.png`} alt="" />
            </h1>
            <h1 className='text-lg md:text-2xl'>High: {forecast.highTemp.toFixed()}°F</h1>
            <h1 className='text-lg md:text-2xl'>Low: {forecast.lowTemp.toFixed()}°F</h1>
            </div>
        ))}
        </div>

  );
};

export default Forecast;
