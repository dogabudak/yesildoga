import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  line-height: 1.6;
`;

const Title = styled.h1`
  color: #2c3e50;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
`;

const Section = styled.section`
  margin-bottom: 30px;
`;

const Heading = styled.h2`
  color: #34495e;
  margin-top: 30px;
`;

const List = styled.ol`
  padding-left: 20px;
  
  li {
    margin-bottom: 10px;
  }
`;

const Strong = styled.strong`
  color: #2c3e50;
`;

export const AgricultureProject: React.FC = () => {
  return (
    <Container>
      <Title>Project Plan for Growing Yucca gloriosa and Creating Organic Products</Title>

      <Section>
        <Heading>Introduction</Heading>
        <p>
          The purpose of this project is to grow Yucca gloriosa, a drought-resistant plant, 
          and create organic products that can be used to help society and poor communities. 
          The project aims to promote sustainable agriculture practices, provide employment 
          opportunities, and create products that can be sold to generate income for the community.
        </p>
      </Section>

      <Section>
        <Heading>Objectives</Heading>
        <List>
          <li>To cultivate Yucca gloriosa plants in a sustainable manner.</li>
          <li>To develop organic products using Yucca gloriosa that can be used by the community and sold for income.</li>
          <li>To provide employment opportunities for members of the community.</li>
          <li>To promote sustainable agriculture practices in the community.</li>
        </List>
      </Section>

      <Section>
        <Heading>Implementation Plan</Heading>
        <List>
          <li>Identify suitable land for Yucca gloriosa cultivation.</li>
          <li>Prepare the land by removing weeds and adding organic fertilizers.</li>
          <li>Source Yucca gloriosa seedlings from a reputable supplier.</li>
          <li>Plant the seedlings and ensure proper spacing to allow for growth and efficient water use.</li>
          <li>Implement an irrigation system that utilizes rainwater harvesting and drip irrigation to conserve water.</li>
          <li>Implement organic pest and disease management practices to avoid the use of harmful chemicals.</li>
          <li>Harvest the Yucca gloriosa plants once they reach maturity and process them into organic products such as soap, shampoo, and biofuel.</li>
          <li>Package and market the organic products to the community and beyond.</li>
        </List>
      </Section>

      <Section>
        <Heading>Budget</Heading>
        <List>
          <li>Land preparation: $500</li>
          <li>Yucca gloriosa seedlings: $1000</li>
          <li>Irrigation system: $1500</li>
          <li>Organic fertilizers, pest management, and harvesting equipment: $2000</li>
          <li>Product packaging and marketing: $1000</li>
          <li>Labor and other miscellaneous expenses: $2500</li>
        </List>
        <p><Strong>Total budget: $8500</Strong></p>
      </Section>

      <Section>
        <Heading>Conclusion</Heading>
        <p>
          The cultivation of Yucca gloriosa and creation of organic products has the potential 
          to provide employment opportunities and generate income for the community, while 
          promoting sustainable agriculture practices. By implementing this project, we can 
          create a positive impact on the environment and the lives of the people in the community.
        </p>
      </Section>
    </Container>
  );
};
