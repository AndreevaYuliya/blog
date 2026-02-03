import { FC } from "react";
import { Link } from "react-router";

import Header from "../../components/Header";
import Container from "../../components/Container";
import routes from "../../routes/routes";

const StripePage: FC = () => {
  return (
    <Container>
      <Header title="Stripe Page" />

      <Link to={routes.newPost}>Go to Payment</Link>
    </Container>
  );
};

export default StripePage;
