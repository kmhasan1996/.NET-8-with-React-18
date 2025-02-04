import { useEffect, useState } from 'react'
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import NavBar from './Navbar';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingConponent from './LoadingComponent';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const[editMode,setEditMode] = useState(false);
  const[loading,setLoading] = useState(true);
  const[submitting,setSubmitting] = useState(false);
  
  useEffect(()=>{
    agent.Activities.list().then(response=>{
      //console.log(response);
      let activities:Activity[]=[];
      response.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      });
      setActivities(activities);
      setLoading(false);
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

    setSubmitting(true);
    if(activity.id){
      agent.Activities.update(activity).then(()=>{
        setActivities([...activities.filter(x=>x.id !== activity.id),activity]);

        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }else{
      activity.id = uuid();
      agent.Activities.create(activity).then(()=>{
        setActivities([...activities,{...activity}])

        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }

  function handleDeleteActivity(id:string){
    setSubmitting(true);

    agent.Activities.delete(id).then(()=>{
      setActivities([...activities.filter(x=>x.id !== id)]);
      setLoading(false);
      setSubmitting(false);
      handleCancelSelectedActivity();
    })

    
  }

if(loading) return <LoadingConponent content='Loading...' />

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
          submitting = {submitting}
           />
        </Container>
      </>
    
  )
}

export default App
