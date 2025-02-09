import { Button, Card, CardContent, CardDescription, CardHeader, CardMeta, Image } from "semantic-ui-react";
import { useStore } from "../../../app/stores/stores";
import LoadingConponent from "../../../app/layout/LoadingComponent";

export default function ActivityDetails(){
  const{activityStore} = useStore();
  const{selectedActivity:activity,openForm,cancelSelectedActivity}=activityStore;
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
        <Button onClick={()=>openForm(activity.id)} basic color="blue" content='Edit' />
        <Button onClick={cancelSelectedActivity}  basic color="orange" content='Cancel' />
      </Button.Group>
    </CardContent>
  </Card>
    )
}