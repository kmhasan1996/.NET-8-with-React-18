import { Grid} from "semantic-ui-react";
import { useStore } from "../../../app/stores/stores";
import LoadingConponent from "../../../app/layout/LoadingComponent";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";
import ActivityDetaledHeader from "./ActivityDetaledHeader";

export default observer( function ActivityDetails(){
  const{activityStore} = useStore();
  const{selectedActivity:activity,loadActivity}=activityStore;

  const {id} = useParams<{id:string}>();

  useEffect(()=>{
    if(id) loadActivity(id);
  },[id,loadActivity])

  if(!activity)return<LoadingConponent />;

    return(
      <Grid>
      <Grid.Column width={10}>
          <ActivityDetaledHeader activity={activity} />
          <ActivityDetailedInfo activity={activity} />
          <ActivityDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
          <ActivityDetailedSidebar activity={activity} />
      </Grid.Column>
  </Grid>
    )
})