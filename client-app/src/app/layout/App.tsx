import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import NavBar from './Navbar';
import { observer } from 'mobx-react-lite';
import { Container } from 'semantic-ui-react';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/activityDetails';
import TestErrors from '../../features/errors/TestErrors';
import NotFound from '../../features/errors/NotFound';
import { ToastContainer } from 'react-toastify';

function App() {

  const location = useLocation();
 
  return (
    
      <>
      <ToastContainer position='bottom-right' hideProgressBar/>
        <Route exact path='/' component={HomePage} />
        <Route path={'/(.+)'} 
        render={()=>(
          <>
          <NavBar />
          <Container style={{marginTop:'5em'}}>
            <Switch>
                <Route exact path='/activities' component={ActivityDashboard} />
              <Route path='/activities/:id' component={ActivityDetails} />
              <Route key={location.key} path={['/create-activity','/manage/:id']} component={ActivityForm} />
              <Route path='/errors' component={TestErrors} />
              <Route component={NotFound} />
            </Switch>
           
          </Container>
          </>
        )}

        />
       
      </>
    
  )
}

export default observer(App);
