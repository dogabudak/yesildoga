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

const CostSection = styled.div`
  margin-bottom: 20px;
`;

export const CharityProject: React.FC = () => {
  return (
    <Container>
      <Title>Project Name: Charity Project with Durham County Poets</Title>

      <Section>
        <Heading>Project Objective</Heading>
        <p>
          The objective of this project is to organize a charity project involving the Durham County Poets 
          to raise funds and awareness for a chosen cause.
        </p>
      </Section>

      <Section>
        <Heading>Project Timeline</Heading>
        <p>
          This will depend on the availability of the band and the logistics of the charity project, 
          but typically it takes 3-6 months to plan and execute a successful charity project.
        </p>
      </Section>

      <Section>
        <Heading>Project Steps</Heading>
        <List>
          <li>
            <Strong>Define the Cause:</Strong> Determine the cause or charity that you want to support 
            through this project. This could be anything from an animal shelter to a food bank to a 
            medical research organization.
          </li>
          <li>
            <Strong>Contact Durham County Poets:</Strong> Reach out to the Durham County Poets and 
            explain your project and the cause you are supporting. Discuss their availability, 
            performance fees, and logistics.
          </li>
          <li>
            <Strong>Plan the Event:</Strong> Choose a date and venue for the charity event. Work with 
            the band to determine the length of their performance and any other requirements.
          </li>
          <li>
            <Strong>Promotion and Marketing:</Strong> Create a marketing plan to promote the charity 
            event. Utilize social media, email newsletters, and local press to raise awareness and interest.
          </li>
          <li>
            <Strong>Ticket Sales:</Strong> Determine the ticket price and create a system for selling 
            tickets. Consider partnering with local businesses and organizations to help sell tickets.
          </li>
          <li>
            <Strong>Day of the Event:</Strong> On the day of the charity event, ensure that everything 
            is set up and running smoothly. Thank attendees for their support and encourage them to 
            donate further.
          </li>
          <li>
            <Strong>Follow Up:</Strong> Follow up with attendees and donors to thank them for their 
            support and provide information on how their contributions are making a difference for the 
            chosen cause.
          </li>
        </List>
      </Section>

      <Section>
        <Heading>Estimated Cost for the Project</Heading>
        <CostSection>
          <p>
            <Strong>Performance Fees:</Strong> The cost for the Durham County Poets performance fee 
            will vary based on their availability and other factors. A rough estimate for their 
            performance fee could range from $5,000 to $10,000.
          </p>
        </CostSection>

        <CostSection>
          <p>
            <Strong>Venue Rental:</Strong> The cost for the venue rental will also vary depending on 
            the location and size of the venue. A rough estimate for the venue rental could range from 
            $1,000 to $5,000.
          </p>
        </CostSection>

        <CostSection>
          <p>
            <Strong>Promotional Materials:</Strong> To promote the charity event, you may need to 
            create promotional materials such as posters, flyers, and banners. The cost for these 
            materials will depend on the quantity and quality desired, but a rough estimate could 
            range from $500 to $1,000.
          </p>
        </CostSection>

        <CostSection>
          <p>
            <Strong>Ticketing System:</Strong> To sell tickets, you may need to use a ticketing system 
            such as Eventbrite or Ticketmaster. These services typically charge a small fee for each 
            ticket sold, which could range from $0.50 to $2 per ticket.
          </p>
        </CostSection>

        <CostSection>
          <p>
            <Strong>Additional Costs:</Strong> Depending on the specifics of the event, there may be 
            additional costs such as insurance, security, and equipment rental. A rough estimate for 
            these additional costs could range from $500 to $2,000.
          </p>
        </CostSection>

        <p>
          <Strong>Overall, a rough estimate for the total cost of this charity project involving 
          Durham County Poets could range from $7,000 to $20,000.</Strong>
        </p>
      </Section>
    </Container>
  );
};
