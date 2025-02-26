//import React from "react";
import {  Grid, GridColumn } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "../../../app/stores/stores";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingConponent from "../../../app/layout/LoadingComponent";
import ActivityFilters from "./ActivityFilters";



export default observer(function ActivityDashboard(){
     const{activityStore} = useStore();
     const{activitiesByDate,loadActivities,activityRegistry}=activityStore;
   
     useEffect(()=>{
        if(activityRegistry.size <= 1){
            loadActivities();
        }
     },[activityRegistry.size, activityStore]);
   
   
   if(activityStore.loadingInitial) return <LoadingConponent content='Loading...' />
   

    return (
        <Grid>
            <GridColumn width='11'>
              
                {activitiesByDate.length > 0 ?(
                <ActivityList/>
                ):(
                <div style={{backgroundColor:'white',padding:'10px 10px'}}>
                    <h4>No activity found</h4>
                </div>
                )}

               
               
              
            </GridColumn>
            <GridColumn width='5'>
              
               <ActivityFilters />
            </GridColumn>
        </Grid>
    )
})