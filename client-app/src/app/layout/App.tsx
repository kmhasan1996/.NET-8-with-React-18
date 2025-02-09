import { useEffect } from 'react'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import NavBar from './Navbar';
import LoadingConponent from './LoadingComponent';
import { useStore } from '../stores/stores';
import { observer } from 'mobx-react-lite';
import { Container } from 'semantic-ui-react';

function App() {

  const {activityStore} = useStore();


  useEffect(()=>{
    activityStore.loadActivities();
  },[]);


if(activityStore.loadingInitial) return <LoadingConponent content='Loading...' />

  return (
    
      <>
        <NavBar />
        <Container style={{marginTop:'5em'}}>
         <ActivityDashboard />
        </Container>
      </>
    
  )
}

export default observer(App);
