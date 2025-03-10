import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { useStore } from '../../app/stores/stores';
import LoginForm from '../users/LoginForm';
import RegsiterForm from '../users/RegisterForm'
import { observer } from "mobx-react-lite";

export default observer( function HomePage(){
    const { userStore, modalStore } = useStore();
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBottom: 12}} />
                    Reactivities
                </Header>
                
                {userStore.isLoggedIn ? (
                    <>
                        <Header as='h2' inverted content={`Welcome back ${userStore.user?.displayName}`} />
                        <Button as={Link} to='/activities' size='huge' inverted>
                            Go to activities!
                        </Button>
                    </>
                ) : (
                    <>
                    <Header as='h2' inverted content='Welcome to Reactivities' />
                
                        <Button onClick={() => modalStore.openModal(<LoginForm />)} size='huge' inverted>
                            Login
                        </Button>
                        <Button onClick={() => modalStore.openModal(<RegsiterForm />)} size='huge' inverted>
                            Register
                        </Button>
                    </>

                )}
            </Container>
        </Segment>
    )
})