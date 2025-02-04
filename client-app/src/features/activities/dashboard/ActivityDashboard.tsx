//import React from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

import ActivityDetails from "../details/activityDetails";
import ActivityList from "./ActivityList";
import ActivityForm from "../form/ActivityForm";


interface Props{
    activities:Activity[];
    selectedActivity: Activity | undefined;
    selectActivity:(id:string) => void;
    cancelSelectedActivity: () =>void;
    editMode:boolean;
    openForm:(id:string)=>void;
    closeForm:()=>void;
    createOrEditActivity:(activity:Activity)=>void;
    deleteActivity:(id:string)=>void;
    submitting:boolean;
}

export default function ActivityDashboard({activities,selectedActivity,selectActivity,cancelSelectedActivity,editMode,openForm,closeForm,createOrEditActivity,deleteActivity,submitting}:Props){
    return (
        <Grid>
            <GridColumn width='10'>
                
                {activities.length > 0 ?(
                    <ActivityList 
                activities={activities} 
                selectActivity={selectActivity}
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
                <ActivityDetails 
                activity={selectedActivity} 
                cancelSelectedActivity={cancelSelectedActivity} 
                openForm = {openForm}
                deleteActivity={deleteActivity}
                />
                }

                {
                    editMode && 
                    <ActivityForm 
                    closeForm={closeForm} 
                    activity={selectedActivity} 
                    createOrEditActivity={createOrEditActivity}
                    submitting = {submitting}
                    />
                }
                 
            </GridColumn>
        </Grid>
    )
}