import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header, Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/stores";
import RegsiterForm from '../users/RegisterForm'

export default observer(function LoginForm() {
    const { userStore,modalStore } = useStore();
    return (
        <Formik
            initialValues={{ email: '', password: '', error: null }}
            onSubmit={(values, { setErrors }) =>
                userStore.login(values).catch(_ => setErrors({ error: 'Invalid email or password '}))}
        >
            {({ handleSubmit, isSubmitting, errors }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Login to Reactivities' color="teal" textAlign="center" />
                    <MyTextInput placeholder="Email" name='email' />
                    <MyTextInput placeholder="Password" name='password' type='password' />
                    <ErrorMessage name='error' render={() => 
                        <Label style={{ marginBottom: 10 }} basic color='red' content={errors.error} />} />
                    <Button loading={isSubmitting} positive content='Login' type="submit" fluid />
                     <p>
                     Does not have a account? 
                     <strong>
                        <a style={{paddingLeft:'5px',cursor:'pointer'}} onClick={() => modalStore.openModal(<RegsiterForm />)} >
                            Click here
                        </a>
                     </strong>
                    </p>
                    
                </Form>
            )}

        </Formik>
    )
})