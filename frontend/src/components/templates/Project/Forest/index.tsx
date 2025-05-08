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

const List = styled.ul`
  padding-left: 20px;
  
  li {
    margin-bottom: 10px;
  }
`;

export const ForestProject: React.FC = () => {
  return (
    <Container>
      <Title>Project Plan for Forestation in Kapuzbaşı, Kayseri</Title>

      <Section>
        <Heading>Goal</Heading>
        <p>
          The goal of this project is to create a small-scale forest in Kapuzbaşı, Kayseri, 
          using European beech trees.
        </p>
      </Section>

      <Section>
        <Heading>Objectives</Heading>
        <List>
          <li>To enhance the ecological health and biodiversity of the area.</li>
          <li>To promote sustainable forest management practices.</li>
          <li>To improve the visual landscape of the region.</li>
          <li>To contribute to climate change mitigation efforts.</li>
        </List>
      </Section>

      <Section>
        <Heading>Project Timeline</Heading>
        <List>
          <li>Site preparation: May - June</li>
          <li>Tree planting: October - November</li>
          <li>Maintenance and monitoring: Year-round</li>
        </List>
      </Section>

      <Section>
        <Heading>Site Preparation</Heading>
        <List>
          <li>Soil testing to determine nutrient content and pH levels.</li>
          <li>Soil amendment (if necessary) to improve soil conditions for European beech trees.</li>
          <li>Clearing of the site of any debris, rocks or weeds.</li>
          <li>Establishing a water supply for irrigation.</li>
        </List>
      </Section>

      <Section>
        <Heading>Tree Selection and Planting</Heading>
        <List>
          <li>Selection of European beech trees from a reputable nursery.</li>
          <li>Planting of trees in October - November when the soil is moist and cool.</li>
          <li>Planting density of 1,000 trees per hectare.</li>
          <li>
            Planting technique: digging a hole 2 times the size of the root ball, loosening 
            soil at the bottom of the hole, gently placing the tree in the hole, and 
            backfilling with soil.
          </li>
        </List>
      </Section>

      <Section>
        <Heading>Maintenance and Monitoring</Heading>
        <List>
          <li>Regular watering during the first two years after planting.</li>
          <li>Fertilizer application as needed.</li>
          <li>Pruning of dead or damaged branches.</li>
          <li>Monitoring of pests and diseases.</li>
          <li>Removal of competing vegetation (weeds and other plants).</li>
        </List>
      </Section>

      <Section>
        <Heading>Project Cost</Heading>
        <List>
          <li>Site preparation and planting: $XX,XXX (depending on the size of the forest).</li>
          <li>Maintenance and monitoring: $X,XXX per year.</li>
          <li>Total estimated cost: $XX,XXX.</li>
        </List>
      </Section>

      <Section>
        <Heading>Conclusion</Heading>
        <p>
          By creating a small-scale forest of European beech trees in Kapuzbaşı, Kayseri, we can 
          enhance the ecological health and biodiversity of the area, promote sustainable forest 
          management practices, improve the visual landscape of the region, and contribute to 
          climate change mitigation efforts. With careful planning and management, this project 
          can be successful and provide benefits for years to come.
        </p>
      </Section>
    </Container>
  );
};
