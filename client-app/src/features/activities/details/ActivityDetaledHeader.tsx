import { observer } from 'mobx-react-lite';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import {Activity} from "../../../app/models/activity";
import { Link, useHistory } from 'react-router-dom';
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

    const history = useHistory();
    const {activityStore}=useStore();

    function handleDelete(id:string){
        try{
             activityStore.deleteActivity(id).then(()=>history.push('/activities'))
        }catch(error){
            console.log(error);
        }
    }
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
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
                                <p>{activity.date}</p>
                                <p>
                                    Hosted by <strong>Bob</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button color='teal'>Join Activity</Button>
                <Button>Cancel Attendance</Button>
                <Button 
                loading={activityStore.loading}
                onClick={()=>handleDelete(activity.id)}
                color='red' floated='right'>
                    Delete
                </Button>
                <Button as={Link} to={`/manage/${activity.id}`} color='orange' floated='right'>
                    Manage Event
                </Button>
            </Segment>
        </Segment.Group>
    )
})