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
}

export default function ActivityDashboard({activities,selectedActivity,selectActivity,cancelSelectedActivity,editMode,openForm,closeForm,createOrEditActivity,deleteActivity}:Props){
    return (
        <Grid>
            <GridColumn width='10'>
                <ActivityList 
                activities={activities} 
                selectActivity={selectActivity}
                deleteActivity={deleteActivity}
                />
            </GridColumn>
            <GridColumn width='6'>
                {selectedActivity && !editMode &&
                <ActivityDetails 
                activity={selectedActivity} 
                cancelSelectedActivity={cancelSelectedActivity} 
                openForm = {openForm}
                />
                }

                {
                    editMode && 
                    <ActivityForm closeForm={closeForm} activity={selectedActivity} createOrEditActivity={createOrEditActivity} />
                }
                 
            </GridColumn>
        </Grid>
    )
}