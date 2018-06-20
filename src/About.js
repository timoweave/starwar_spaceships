import React from "react";
import styled from "styled-components";

const A = styled.a`
  text-decoration: none;
`;

const P = styled.p`
  font-size: 1.5rem;
`;

const CircleImg = styled.img`
  border-radius: 50%;
  width: 18%;
`;

const About = () => {
  return (
    <div>
      <h1>Watto Starship Shopping App</h1>
      <CircleImg alt="me" src="/images/user_465x465_box.png" />
      <P>Timothy shiu</P>
      <P>timomakers@gmail.com</P>
      <P>
        <A href="https://github.com/timoweave">github.com/timoweave</A>
      </P>
      <P>
        <A href="https://linkedin.com/in/tlinkedin">
          linkedin.com/in/tlinkedin
        </A>
      </P>
    </div>
  );
};

export default About;
