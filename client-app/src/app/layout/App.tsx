import { useEffect, useState } from 'react'
import { Activity } from '../models/activity';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import NavBar from './Navbar';
import agent from '../api/agent';
import LoadingConponent from './LoadingComponent';
import { useStore } from '../stores/stores';
import { observer } from 'mobx-react-lite';
import { Container } from 'semantic-ui-react';

function App() {

  const {activityStore} = useStore();

  const [activities, setActivities] = useState<Activity[]>([]);

  const[submitting,setSubmitting] = useState(false);
  
  useEffect(()=>{
    activityStore.loadActivities();
  },[]);



  

  function handleDeleteActivity(id:string){
    setSubmitting(true);

    agent.Activities.delete(id).then(()=>{
      setActivities([...activities.filter(x=>x.id !== id)]);
     // setLoading(false);
      setSubmitting(false);
    })

    
  }

if(activityStore.loadingInitial) return <LoadingConponent content='Loading...' />

  return (
    
      <>
        <NavBar />
        <Container style={{marginTop:'5em'}}>
         <ActivityDashboard
          activities={activityStore.activities}
          deleteActivity={handleDeleteActivity}
          submitting = {submitting}
           />
        </Container>
      </>
    
  )
}

export default observer(App);
