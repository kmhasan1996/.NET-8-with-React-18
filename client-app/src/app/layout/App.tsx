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
import { useStore } from '../stores/stores';
import { useEffect } from 'react';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';

function App() {

  const location = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded())
    } else {
      commonStore.setAppLoaded()
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <LoadingComponent content='Loading app...' />
 
  return (
    
      <>
      <ModalContainer />
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
