import { useEffect, useState } from 'react'
import axios from  'axios'
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';


import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import NavBar from './Navbar';


function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  useEffect(()=>{
    axios.get<Activity[]>("http://localhost:5000/api/Activities").then(response=>{
      console.log(response);
      setActivities(response.data);
    })

  },[]);

  function handleSelectedActivity(id:string){
    setSelectedActivity(activities.find(x=>x.id === id))
  }

  function handleCancelSelectedActivity(){
    setSelectedActivity(undefined);
  }

  return (
    
      <>
        <NavBar/>
        <Container style={{marginTop:'5em'}}>
         <ActivityDashboard
          activities={activities}
          selectedActivity = {selectedActivity}
          selectActivity = {handleSelectedActivity}
          cancelSelectedActivity = {handleCancelSelectedActivity}

           />
        </Container>
      </>
    
  )
}

export default App
