import { useEffect, useState } from 'react'
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import NavBar from './Navbar';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const[editMode,setEditMode] = useState(false);
  
  useEffect(()=>{
    agent.Acitivities.list().then(response=>{
      //console.log(response);
      let activities:Activity[]=[];
      response.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      });
      setActivities(activities);
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
    :setActivities([...activities,{...activity,id:uuid()}])
    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id:string){
    setActivities([...activities.filter(x=>x.id !== id)])
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
          deleteActivity={handleDeleteActivity}
           />
        </Container>
      </>
    
  )
}

export default App
