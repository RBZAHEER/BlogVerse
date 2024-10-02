import React from "react";
import { useAuth } from "../context/AuthProvider";

function About() {
  const { profile } = useAuth();
  console.log(profile);

  return (
    <div className="container mx-auto my-12 p-4 space-y-9">
      <h1 className="text-2xl font-bold mb-6">About</h1>
      <p>
        Hello, I am{" "}
        <strong className="text-blue-800 font-semibold hover:scale-105 duration-500">
          {profile?.name}
        </strong>
        , a passionate full stack developer with expertise in both front-end and
        back-end technologies. I specialize in building dynamic, user-friendly
        web applications, ensuring seamless and responsive digital experiences.
      </p>
      <h2 className="font-semibold text-blue-800 text-xl">
        Technical Expertise:
      </h2>
      <p>
        I am well-versed in modern JavaScript frameworks like React.js and
        Vue.js, alongside HTML5 and CSS3 for creating responsive interfaces. On
        the back-end, I utilize technologies such as Node.js and Express.js, and
        manage databases with MySQL and MongoDB. Additionally, I have experience
        in containerization with Docker, cloud services (AWS, Azure), and CI/CD
        pipelines for efficient deployment.
      </p>
      <h2 className="font-semibold text-blue-800 text-xl">
        Professional Highlights:
      </h2>
      <p>
        Throughout my career, I have successfully developed and deployed
        full-stack applications, collaborating with teams to deliver top-tier
        software solutions. My ability to adapt to new technologies and industry
        trends ensures I remain at the forefront of innovation.
      </p>
      <p>
        I am driven by a strong commitment to quality and a desire to contribute
        to impactful projects, whether through front-end development or back-end
        logic. My goal is to create solutions that not only meet user needs but
        also surpass client expectations.
      </p>
      <h2 className="font-semibold text-blue-800 text-xl">
        Personal Interests and Inspiration:
      </h2>
      <p>
        I am particularly interested in the Next.js framework for its ability to
        optimize server-side rendering and deliver fast, efficient applications.
        Additionally, the MERN stack (MongoDB, Express.js, React.js, and
        Node.js) excites me because of its versatility in building modern,
        scalable full-stack applications. Constantly exploring new tools and
        technologies like these fuels my passion for development and motivates
        me to push the boundaries of what I can create.
      </p>
    </div>
  );
}

export default About;
