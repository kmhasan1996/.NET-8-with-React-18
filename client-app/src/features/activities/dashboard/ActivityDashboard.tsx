//import React from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

import ActivityDetails from "../details/activityDetails";
import ActivityList from "./ActivityList";
import ActivityForm from "../form/ActivityForm";
import { useStore } from "../../../app/stores/stores";
import { observer } from "mobx-react-lite";


interface Props{
    activities:Activity[];
    deleteActivity:(id:string)=>void;
    submitting:boolean;
}

export default observer(function ActivityDashboard({activities,deleteActivity,submitting}:Props){
     const{activityStore} = useStore();
     const{selectedActivity,editMode}=activityStore;
   
    return (
        <Grid>
            <GridColumn width='10'>
                
                {activities.length > 0 ?(
                <ActivityList 
                    activities={activities} 
                    deleteActivity={deleteActivity}
                    submitting = {submitting}
                />
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