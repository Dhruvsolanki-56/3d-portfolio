import "./styles/Career.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Career = () => {
  useGSAP(() => {
    // Create a timeline for the career section
    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".career-section",
        start: "top 80%",
        end: "center 60%",
        scrub: 1,
        id: "career",
      },
    });
    
    // Animate the timeline height from 0% to 100%
    timeline.to(".career-timeline", {
      maxHeight: "100%",
      duration: 1.5,
      ease: "power2.out",
    });
    
    // Animate each career box with a stagger effect
    timeline.to(".career-info-box", {
      opacity: 1,
      y: 0,
      stagger: 0.3,
      duration: 0.8,
      ease: "back.out(1.7)",
    }, "-=1");
  }, []);
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Frontend Developer Intern</h4>
                <h5>TechNova Solutions</h5>
              </div>
              <h3>2022</h3>
            </div>
            <p>
              Contributed to building responsive web interfaces and optimized site performance. Collaborated with designers to implement pixel-perfect UIs and improved loading speed by 30%.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full-Stack Developer</h4>
                <h5>CodeCrafters Pvt Ltd</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Developed scalable full-stack applications using React, Node.js, and MySQL. Built reusable components and enhanced backend APIs for seamless user experiences across platforms.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Creative Developer & 3D Designer</h4>
                <h5>Freelance / Personal Projects</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Crafting immersive web experiences with Three.js, Blender, and modern animation libraries. Designing unique digital interfaces and bringing creative ideas to life through code and design.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
