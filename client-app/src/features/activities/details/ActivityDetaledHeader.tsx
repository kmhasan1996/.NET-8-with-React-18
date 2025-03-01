import { observer } from 'mobx-react-lite';
import {Button, Header, Item, Segment, Image, Label} from 'semantic-ui-react'
import {Activity} from "../../../app/models/activity";
import { Link } from 'react-router-dom';
//import { useStore } from '../../../app/stores/stores';
import {format} from 'date-fns'
import { useStore } from '../../../app/stores/stores';
const activityImageStyle = {
    filter: 'brightness(30%)'
};
const activityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};
interface Props {
    activity: Activity
}
export default observer (function ActivityDetailedHeader({activity}: Props) {

    const {activityStore:{updateAttendace,cancelActivityToggle,loading}} = useStore();

    // const history = useHistory();
    // const {activityStore}=useStore();

    // function handleDelete(id:string){
    //     try{
    //          activityStore.deleteActivity(id).then(()=>history.push('/activities'))
    //     }catch(error){
    //         console.log(error);
    //     }
    // }
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                {activity.isCancelled && 
                    <Label style={{position:'absolute',zIndex:1000,left:-14,top:20}}
                     ribbon color='red' content='Cancelled'></Label>
                }
                <Image src={`/assets/categoryImages/${activity.category}.jpg`} fluid style={activityImageStyle}/>
                <Segment style={activityImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={activity.title}
                                    style={{color: 'white'}}
                                />
                                <p>{format(activity.date!,'dd MMM yyyy h:mm aa' )}</p>
                                <p>
                                    Hosted by <strong><Link to={`/profile/${activity.host?.username}`}>{activity.host?.displayName}</Link> </strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                {activity.isHost ?(
<>

                    <Button
                        color={activity.isCancelled ? 'green' : 'red'}
                        floated='left'
                        basic
                        content={activity.isCancelled ? 'Re-activate Activity' : 'Cancel Activity'}
                        onClick={cancelActivityToggle}
                        loading={loading}
                    />

                    <Button as={Link} disabled={activity.isCancelled} to={`/manage/${activity.id}`} color='orange' floated='right'>
                    Manage Event
                    </Button>
                    </>
                ): activity.isGoing ?(
                    <Button loading={loading} onClick={updateAttendace}>Cancel Attendance</Button>
                ):(
                    <Button loading={loading} disabled={activity.isCancelled} onClick={updateAttendace} color='teal'>Join Activity</Button>
                )}
              
               
                {/* <Button 
                loading={activityStore.loading}
                onClick={()=>handleDelete(activity.id)}
                color='red' floated='right'>
                    Delete
                </Button> */}
               
            </Segment>
        </Segment.Group>
    )
})