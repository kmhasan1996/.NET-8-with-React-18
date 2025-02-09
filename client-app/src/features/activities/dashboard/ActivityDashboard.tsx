//import React from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import ActivityDetails from "../details/activityDetails";
import ActivityList from "./ActivityList";
import ActivityForm from "../form/ActivityForm";
import { useStore } from "../../../app/stores/stores";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingConponent from "../../../app/layout/LoadingComponent";


export default observer(function ActivityDashboard(){
     const{activityStore} = useStore();
     const{activitiesByDate, selectedActivity,editMode}=activityStore;
   
     useEffect(()=>{
       activityStore.loadActivities();
     },[]);
   
   
   if(activityStore.loadingInitial) return <LoadingConponent content='Loading...' />
   

    return (
        <Grid>
            <GridColumn width='10'>
                
                {activitiesByDate.length > 0 ?(
                <ActivityList/>
                ):(
<div style={{backgroundColor:'white',padding:'10px 10px'}}>
                <h4>No activity found</h4>
                </div>
                )}

               
               
              
            </GridColumn>
            <GridColumn width='6'>
                {selectedActivity && !editMode &&
                <ActivityDetails  />
                }

                {
                    editMode && 
                    <ActivityForm  />
                }
                 
            </GridColumn>
        </Grid>
    )
})