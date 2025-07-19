/**
 * Section1 Component
 * 
 * The hero section of the Order Management System that provides an engaging introduction
 * to the application. It features a responsive grid of images and a call-to-action.
 * 
 * Features:
 * - Responsive grid layout with product/service images
 * - Engaging headline and subheading text
 * - Call-to-action button to start the order process
 * - Styled with Material-UI and custom styled-components
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onOrderNowClick - Callback function triggered when the order button is clicked
 * @returns {JSX.Element} The Section1 component
 */
import React from "react";
import { Button, Container } from "@mui/material";
import {
  StyledSection,
  Heading,
  Subheading,
  Grid2Col,
  GridImageBox,
  ContentBox,
} from "./section1-styles";

const Section1 = ({ onOrderNowClick }) => {
  return (
    <StyledSection component="section" className="Section1">
      <Container maxWidth="lg">
        <Grid2Col className="gap-xsmall">
          <GridImageBox Container>
            <img
              src={`${process.env.PUBLIC_URL}/images/section1/image1.jpg`}
              alt="Effortless orders"
            />
            <img
              src={`${process.env.PUBLIC_URL}/images/section1/image2.jpg`}
              alt="Easy ordering"
            />
            <img
              src={`${process.env.PUBLIC_URL}/images/section1/image3.jpg`}
              alt="Quick checkout"
            />
            <img
              src={`${process.env.PUBLIC_URL}/images/section1/image4.jpg`}
              alt="Order tracking"
            />
          </GridImageBox>
          <ContentBox>
            <Heading variant="h1" component="h1">
              Effortless orders, every time
            </Heading>
            <Subheading>
              Placing your order is easy and intuitive. Just enter your details,
              choose your products, and watch your summary update instantly.
              We're here to guide you, so you can order with confidence and
              clarity.
            </Subheading>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={onOrderNowClick}
              sx={{ mt: 4 }}
            >
              Order Now
            </Button>
          </ContentBox>
        </Grid2Col>
      </Container>
    </StyledSection>
  );
};

export default Section1;
