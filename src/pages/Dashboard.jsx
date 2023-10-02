import TodayCard from "../components/TodayCard"
import Forecast from "../components/Forecast"

// create the weather dashboard
const Dashboard = () => {
    return (

        <div className=" bg-gray-100 w-full h-full rounded-lg p-4">

            <TodayCard/>
            <Forecast/>

        </div>

    )
}

export default Dashboard