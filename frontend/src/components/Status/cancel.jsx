import React from 'react';
import { Container, Header, Icon, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const CancelPage = () => {
  return (
    <div className="">
            <Container textAlign="center" style={{ marginTop: '50px' }}>
      <Icon name="cancel" size="huge" color="red" />
      <Header as="h2" color="red">
        Payment Cancelled!
      </Header>
      <p>It seems like you cancelled the payment. If you have any questions, feel free to contact us.</p>
      <Button primary as={Link} to="/cart">
        Go to Cart
      </Button>
    </Container>
    </div>
  );
};

export default CancelPage;
