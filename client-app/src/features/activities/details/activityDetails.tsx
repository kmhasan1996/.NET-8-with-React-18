import { Button, Card, CardContent, CardDescription, CardHeader, CardMeta, Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props{
    activity:Activity;
    cancelSelectedActivity: () =>void;
    openForm:(id:string)=>void;
    deleteActivity:(id:string)=>void;
}

export default function ActivityDetails({activity,cancelSelectedActivity,openForm,deleteActivity}:Props){
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
    </CardContent>
    <CardContent extra>
      <Button.Group widths='3'>
        <Button onClick={()=>openForm(activity.id)} basic color="blue" content='Edit' />
        <Button onClick={()=>deleteActivity(activity.id)} basic color="red" content='Delete' />
        <Button onClick={cancelSelectedActivity}  basic color="orange" content='Cancel' />
      </Button.Group>
    </CardContent>
  </Card>
    )
}