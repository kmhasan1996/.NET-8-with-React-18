import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";

export default function HomePage(){

    return (
        <Container style={{marginTop:'5em'}}>
            <h2>Home page</h2>
            <h3>Go to <Link to={'/activities'}>Activities</Link> </h3>
        </Container>
    )
}