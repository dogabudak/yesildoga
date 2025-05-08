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

const UnorderedList = styled.ul`
  padding-left: 20px;
  
  li {
    margin-bottom: 10px;
  }
`;

const Strong = styled.strong`
  color: #2c3e50;
`;

const Conclusion = styled(Section)`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 5px;
  margin-top: 30px;
`;

const PilotCity = styled.div`
  font-weight: bold;
  color: #27ae60;
  margin-top: 20px;
`;

export const EducationProject: React.FC = () => {
  return (
    <Container>
      <Title>Education Charity Project Description</Title>

      <Section>
        <Heading>Background</Heading>
        <p>
          In Turkey, many poor children living in villages have to walk long distances to reach the 
          nearest school, which can be a significant obstacle to their education. Our charity 
          organization aims to remove this obstacle by providing free transport to these children 
          so that they can attend school regularly and receive a quality education.
        </p>
      </Section>

      <Section>
        <Heading>Project Description</Heading>
        <p>
          The education charity project will involve transporting poor children living in villages 
          to school for free. Here are the main components of the project:
        </p>
        <List>
          <li>
            <Strong>Identify target areas:</Strong> The organization will identify the villages 
            where poor children have limited access to education due to transportation barriers.
          </li>
          <li>
            <Strong>Assess needs:</Strong> The organization will assess the transportation needs 
            of the target villages, including the number of children who need transport and the 
            distance they have to travel.
          </li>
          <li>
            <Strong>Acquire vehicles:</Strong> The organization will acquire vehicles (such as 
            buses or vans) that can transport the children to and from school safely and efficiently.
          </li>
          <li>
            <Strong>Hire drivers:</Strong> The organization will hire trained and qualified 
            drivers who can operate the vehicles safely and reliably.
          </li>
          <li>
            <Strong>Establish routes:</Strong> The organization will establish transportation 
            routes that cover the target villages and ensure that all eligible children have 
            access to transportation.
          </li>
          <li>
            <Strong>Manage logistics:</Strong> The organization will manage the logistics of 
            the transportation program, including scheduling, vehicle maintenance, and safety 
            inspections.
          </li>
          <li>
            <Strong>Monitor and evaluate:</Strong> The organization will monitor the effectiveness 
            of the transportation program and evaluate its impact on the education outcomes of 
            the target children.
          </li>
        </List>
      </Section>

      <Section>
        <Heading>Estimated Cost for the Project</Heading>
        <p>
          The estimated cost for this project will depend on several factors, including the number 
          of children who will be transported, the distance they will travel, and the mode of 
          transportation. Here are some possible cost factors to consider:
        </p>
        <UnorderedList>
          <li>
            <Strong>Vehicles:</Strong> Depending on the number of children who will be transported, 
            the organization may need to purchase or rent one or more vehicles. The cost of each 
            vehicle will depend on factors such as the make and model, age, and condition. 
            Additionally, there will be ongoing costs for fuel, maintenance, and repairs.
          </li>
          <li>
            <Strong>Drivers:</Strong> The organization may need to hire one or more drivers to 
            transport the children. The cost of hiring drivers will depend on factors such as 
            their qualifications, experience, and wages.
          </li>
          <li>
            <Strong>Insurance:</Strong> The organization will need to obtain insurance coverage 
            for the vehicles and drivers. The cost of insurance will depend on factors such as 
            the level of coverage, the number of vehicles and drivers, and the organization's 
            claims history.
          </li>
          <li>
            <Strong>Administration:</Strong> There will be administrative costs associated with 
            managing the transportation program, such as salaries for staff, office expenses, 
            and transportation logistics.
          </li>
          <li>
            <Strong>Contingency:</Strong> It's important to factor in some contingency funds 
            to cover unforeseen expenses that may arise during the project.
          </li>
        </UnorderedList>
        <p>
          Based on these factors, the estimated cost for this project could range from tens of 
          thousands to hundreds of thousands of Turkish liras. The organization will need to 
          carefully plan and budget for each expense to ensure that the project is financially 
          sustainable.
        </p>
      </Section>

      <Conclusion>
        <Heading>Conclusion</Heading>
        <p>
          The project to provide free transport to school for poor children living in villages 
          in Turkey is an important initiative that can make a significant difference in the 
          lives of vulnerable children. By ensuring regular attendance at school, the project 
          can improve the academic performance and future prospects of these children, and 
          contribute to their overall well-being. The success of the project will depend on 
          the commitment and support of the local community, as well as the generosity of 
          donors who share our vision of a better future for all children.
        </p>
      </Conclusion>

      <PilotCity>
        <Heading>Pilot city:</Heading>
        <p>Yalova</p>
      </PilotCity>
    </Container>
  );
};
