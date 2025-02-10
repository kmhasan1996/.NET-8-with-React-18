import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import NavBar from './Navbar';
import { observer } from 'mobx-react-lite';
import { Container } from 'semantic-ui-react';
import { Route } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/activityDetails';

function App() {

 
  return (
    
      <>
        <NavBar />
        <Container style={{marginTop:'5em'}}>
         <Route exact path='/' component={HomePage} />
         <Route exact path='/activities' component={ActivityDashboard} />
         <Route path='/activities/:id' component={ActivityDetails} />
         <Route path='/createActivity' component={ActivityForm} />
        </Container>
      </>
    
  )
}

export default observer(App);
