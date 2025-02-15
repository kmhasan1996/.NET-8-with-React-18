import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import NavBar from './Navbar';
import { observer } from 'mobx-react-lite';
import { Container } from 'semantic-ui-react';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/activityDetails';

function App() {

  const location = useLocation();
 
  return (
    
      <>
        <Route exact path='/' component={HomePage} />
        <Route path={'/(.+)'} 
        render={()=>(
          <>
          <NavBar />
          <Container style={{marginTop:'5em'}}>
           <Route exact path='/activities' component={ActivityDashboard} />
           <Route path='/activities/:id' component={ActivityDetails} />
           <Route key={location.key} path={['/createActivity','/manage/:id']} component={ActivityForm} />
          </Container>
          </>
        )}

        />
       
      </>
    
  )
}

export default observer(App);
