import { useEffect, useState } from 'react'
import axios from  'axios'
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';


import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import NavBar from './Navbar';


function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const[editMode,setEditMode] = useState(false);
  
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

  function handleFormOpen(id?:string){
      id?handleSelectedActivity(id):handleCancelSelectedActivity();
      setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity:Activity){
    activity.id 
    ? setActivities([...activities.filter(x=>x.id !== activity.id)])
    :setActivities([...activities,activity])
    setEditMode(false);
    setSelectedActivity(activity);
  }

  return (
    
      <>
        <NavBar openForm={handleFormOpen} />
        <Container style={{marginTop:'5em'}}>
         <ActivityDashboard
          activities={activities}
          selectedActivity = {selectedActivity}
          selectActivity = {handleSelectedActivity}
          cancelSelectedActivity = {handleCancelSelectedActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEditActivity ={handleCreateOrEditActivity}
           />
        </Container>
      </>
    
  )
}

export default App
