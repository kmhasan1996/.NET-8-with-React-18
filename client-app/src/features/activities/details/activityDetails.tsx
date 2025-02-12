import { Button, Card, CardContent, CardDescription, CardHeader, CardMeta, Image } from "semantic-ui-react";
import { useStore } from "../../../app/stores/stores";
import LoadingConponent from "../../../app/layout/LoadingComponent";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

export default observer( function ActivityDetails(){
  const{activityStore} = useStore();
  const{selectedActivity:activity,loadActivity}=activityStore;

  const {id} = useParams<{id:string}>();

  useEffect(()=>{
    if(id) loadActivity(id);
  },[id,loadActivity])

  if(!activity)return<LoadingConponent />;

    return(
            <Card fluid>
                <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
                <CardContent>
                  <CardHeader>{activity.title}</CardHeader>
                  <CardMeta>
                    <span>{activity.date}</span>
                  </CardMeta>
                  <CardDescription>
                  {activity.description}
                  </CardDescription>
                  <CardDescription>
                  {activity.city}, {activity.venue}
                  </CardDescription>
                </CardContent>
                <CardContent extra>
                  <Button.Group widths='2'>
                    <Button as={Link} to={`/manage/${activity.id}`} basic color="blue" content='Edit' />
                    <Button as={Link} to='/activities' basic color="orange" content='Cancel' />
                  </Button.Group>
                </CardContent>
              </Card>
    )
})