import React from "react";
import { Container, Header, Icon, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
export default function SuccessPage() {
  return (
    <div className="">
      <Container textAlign="center" style={{ marginTop: "50px" }}>
        <Icon name="check circle" size="huge" color="green" />
        <Header as="h2" color="green">
          Payment Successful!
        </Header>
        <p>
          Thank you for your purchase. Your transaction has been completed
          successfully.
        </p>
        <Button primary as={Link} to="/">
          Go to Home
        </Button>
      </Container>
    </div>
  );
}
