import { useEffect, useState, useCallback } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";

import Marquee from "react-fast-marquee";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Use useEffect instead of conditional rendering to prevent re-renders
  useEffect(() => {
    if (percent >= 100 && !loaded) {
      const timer1 = setTimeout(() => {
        setLoaded(true);
        const timer2 = setTimeout(() => {
          setIsLoaded(true);
        }, 1000);
        return () => clearTimeout(timer2);
      }, 600);
      return () => clearTimeout(timer1);
    }
  }, [percent, loaded]);

  useEffect(() => {
    if (!isLoaded) return;
    
    // Memoize the module import to prevent unnecessary reloads
    let isMounted = true;
    import("./utils/initialFX").then((module) => {
      if (!isMounted) return;
      
      setClicked(true);
      const timer = setTimeout(() => {
        if (module.initialFX) {
          module.initialFX();
        }
        setIsLoading(false);
      }, 900);
      
      return () => clearTimeout(timer);
    });
    
    return () => { isMounted = false; };
  }, [isLoaded, setIsLoading]);

  // Memoize the mouse move handler to prevent recreating on each render
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }, []);

  return (
    <>
      <div className="loading-header">
        <a href="/#" className="loader-title" data-cursor="disable">
          Logo
        </a>
        <div className={`loaderGame ${clicked ? "loader-out" : ""}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {/* Reduce number of elements for better performance */}
              {[...Array(20)].map((_, index) => (
                <div className="loaderGame-line" key={index}></div>
              ))}
            </div>
            <div className="loaderGame-ball"></div>
          </div>
        </div>
      </div>
      <div className="loading-screen">
        <div className="loading-marquee">
          <Marquee speed={50} gradientWidth={0}>
            <span> A Creative Developer</span> <span>A Creative Designer</span>
            <span> A Creative Developer</span> <span>A Creative Designer</span>
          </Marquee>
        </div>
        <div
          className={`loading-wrap ${clicked ? "loading-clicked" : ""}`}
          onMouseMove={handleMouseMove}
        >
          <div className="loading-hover"></div>
          <div className={`loading-button ${loaded ? "loading-complete" : ""}`}>
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  Loading <span>{percent}%</span>
                </div>
              </div>
              <div className="loading-box"></div>
            </div>
            <div className="loading-content2">
              <span>Welcome</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;
  let interval: number;

  // Use a more efficient interval timing
  interval = setInterval(() => {
    if (percent <= 50) {
      // Reduce random calculations
      percent = percent + Math.min(5, Math.floor(Math.random() * 6));
      setLoading(percent);
    } else {
      clearInterval(interval);
      // Use a longer interval for the slower part
      interval = setInterval(() => {
        percent = percent + 1; // Use fixed increment instead of random
        setLoading(percent);
        if (percent > 91) {
          clearInterval(interval);
        }
      }, 2000);
    }
  }, 150); // Slightly longer interval to reduce CPU usage

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      // Use a more efficient approach to reach 100%
      const remaining = 100 - percent;
      const increment = Math.max(1, Math.ceil(remaining / 20));
      
      interval = setInterval(() => {
        if (percent < 100) {
          percent = Math.min(100, percent + increment);
          setLoading(percent);
        } else {
          resolve(percent);
          clearInterval(interval);
        }
      }, 10); // Faster interval but fewer iterations
    });
  }
  
  return { loaded, percent, clear };
};
