import { Button, Header, Segment } from "semantic-ui-react";
import {useEffect, useState } from "react";
import { useStore } from "../../../app/stores/stores";
import { observer } from "mobx-react-lite";
import { Link, useHistory, useParams } from "react-router-dom";
import LoadingConponent from "../../../app/layout/LoadingComponent";
import {v4 as uuid} from 'uuid';
import { Formik,Form} from "formik";
import * as Yup from 'yup'
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextAreaInput from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { ActivityFormValues } from "../../../app/models/activity";

export default observer( function ActivityForm(){
    const history = useHistory();
    const{activityStore} = useStore();
    const{createActivity,updateActivity,loadActivity,loadingInitial} = activityStore;
  
    const {id} = useParams<{id:string}>();
    const[activity,setActivity] = useState<ActivityFormValues>(new ActivityFormValues());
   
    const validationSchema = Yup.object({
        title:Yup.string().required('The activity title is requried'),
        description:Yup.string().required('The activity description is requried'),
        category:Yup.string().required(),
        date:Yup.string().required('Date is required').nullable(),
        city:Yup.string().required(),
        venue:Yup.string().required(),
    })
    
    useEffect(()=>{
        if(id) loadActivity(id).then(activity=> setActivity(new ActivityFormValues(activity)));
    },[id,loadActivity])

    function handleFormSubmit(activity:ActivityFormValues){
       if(!activity.id){
            let newActivity = {...activity,id:uuid()}
            createActivity(newActivity).then(()=> history.push(`/activities/${newActivity.id}`));
        }
        else{
           
            updateActivity(activity).then(()=> history.push(`/activities/${activity.id}`));
        }
    }

   


    if(loadingInitial) return <LoadingConponent content="Loading activity..." />

    return(
        <Segment clearing>
            <Header content='Activity Details' sub color='teal' />
            <Formik validationSchema={validationSchema} enableReinitialize initialValues={activity} onSubmit={values=>handleFormSubmit(values)}>
                    {({handleSubmit,isValid,isSubmitting,dirty})=>(
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput name="title" placeholder="Title" />
                    <MyTextAreaInput placeholder='Description' name='description' rows={3} />
                    <MySelectInput placeholder='Category'  name='category' options={categoryOptions}/>
                    <MyDateInput
                     placeholderText='Date' 
                     name='date' 
                     showTimeSelect
                    // timeCaption="time"
                     dateFormat='MMMM d, yyyy h:mm aa'
                     />
                     <Header content='Location Details' sub color='teal' />
                    <MyTextInput placeholder='City'  name='city' />
                    <MyTextInput placeholder='Venue'  name='venue' />
                    <Button 
                    disabled={isSubmitting || !dirty || !isValid}
                    loading={isSubmitting} 
                    floated="right" 
                    positive 
                    type="submit" 
                    content={id ? 'Update': 'Submit'}
                    />

                    <Button 
                    as={Link} 
                    to={id ? `/activities/${id}`:'/activities' }
                    floated="right" 
                    type="button" 
                    content='Cancel'/>
                    </Form>
                    )}
            </Formik>
         
        </Segment>
    )
})