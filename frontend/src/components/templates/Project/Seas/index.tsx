import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  line-height: 1.6;
`;

const Title = styled.h3`
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

const SubHeading = styled.h4`
  color: #2c3e50;
  margin-top: 25px;
`;

const List = styled.ul`
  padding-left: 20px;

  li {
    margin-bottom: 10px;
  }
`;

const Strong = styled.strong`
  color: #2c3e50;
`;

export const SeaProject: React.FC = () => {
  return (
    <Container>
      <Title>Sea Charity Project Description</Title>

      <Section>
        <SubHeading>Background:</SubHeading>
        <p>
          The project involves the deployment of a River Plastic Interceptor, which is a floating
          barrier system developed by the Ocean Cleanup, in the Aksu Stream.
        </p>

        <p>
          The interceptor is designed to capture plastic waste and other debris as it flows
          downstream, preventing it from entering the Mediterranean Sea.
        </p>

        <p>
          The Aksu Stream is a major waterway in Antalya that is heavily impacted by plastic
          pollution, with large amounts of plastic waste entering the stream from nearby urban
          and residential areas. The River Plastic Interceptor will be deployed at the mouth of
          the stream, where it empties into the sea, and will be capable of capturing up to
          50 tons of plastic waste per year.
        </p>
      </Section>

      <Section>
        <Heading>Estimated Cost for the Project</Heading>
        <p>
          <Strong>System Design and Production:</Strong> The design and production of an Ocean
          Cleanup system will depend on the specific needs of the river and the amount of plastic
          waste present. The cost of designing and producing the system could range from a few
          thousand to tens of thousands of dollars.
        </p>

        <p>
          <Strong>Installation and Maintenance:</Strong> The installation and maintenance of the
          Ocean Cleanup system will require skilled labor and ongoing maintenance. The cost of
          installation and maintenance could range from a few thousand to tens of thousands of
          dollars per year.
        </p>

        <p>
          <Strong>Operating Costs:</Strong> The operating costs of an Ocean Cleanup system will
          include the cost of energy for powering the system and the cost of personnel to operate
          and monitor the system. The operating costs could range from a few thousand to tens of
          thousands of dollars per year.
        </p>

        <p>
          Overall, a rough estimation of the costs involved in implementing an Ocean Cleanup
          system for a small scale river would be 10,000$.
        </p>
      </Section>

      <Section>
        <SubHeading>Relative Links:</SubHeading>
        <List>
          <li>
            <a href="https://theoceancleanup.com/sources/" target="_blank" rel="noopener noreferrer">
              https://theoceancleanup.com/sources/
            </a>
          </li>
          <li>
            <a href="https://theoceancleanup.com/rivers/" target="_blank" rel="noopener noreferrer">
              https://theoceancleanup.com/rivers/
            </a>
          </li>
          <li>
            <a href="https://theoceancleanup.com/dashboard/#interceptor001" target="_blank" rel="noopener noreferrer">
              https://theoceancleanup.com/dashboard/#interceptor001
            </a>
          </li>
        </List>
      </Section>
    </Container>
  );
};
