import React, { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import './SkillsCarousel.css';

gsap.registerPlugin(Draggable);

const SkillsCarousel = () => {
  const offensiveTrackRef = useRef(null);
  const defensiveTrackRef = useRef(null);
  const devTrackRef = useRef(null);

  const offensiveTimelineRef = useRef(null);
  const defensiveTimelineRef = useRef(null);
  const devTimelineRef = useRef(null);

  const offensiveDraggableRef = useRef(null);
  const defensiveDraggableRef = useRef(null);
  const devDraggableRef = useRef(null);

  const resizeTimeoutRef = useRef(null);

  const techIcons = {
    // Red Team / Offensive
    'Kali Linux': 'devicon-linux-plain colored',
    'Metasploit': 'devicon-ruby-plain colored',
    'Nmap': 'devicon-bash-plain colored',
    'Burp Suite': 'devicon-java-plain colored',
    'Wireshark': 'devicon-network-plain colored', 
    'Python': 'devicon-python-plain colored',
    // Blue Team / Defensive
    'Splunk': 'devicon-splunk-original colored',
    'SIEM': 'devicon-linux-plain colored',
    'Firewall': 'devicon-linux-plain colored',
    'Arch Linux': 'devicon-archlinux-plain colored',
    'Fedora': 'devicon-fedora-plain colored',
    // Dev
    'React': 'devicon-react-original colored',
    'Laravel': 'devicon-laravel-plain colored',
    'Tailwind': 'devicon-tailwindcss-original colored',
    'JavaScript': 'devicon-javascript-plain colored',
    'n8n': 'devicon-nodejs-plain colored',
    'Git': 'devicon-git-plain colored',
    'Docker': 'devicon-docker-plain colored',
  };

  const offensiveTechs = [
    { name: 'Kali Linux', icon: techIcons['Kali Linux'] },
    { name: 'Metasploit', icon: techIcons['Metasploit'] },
    { name: 'Nmap', icon: techIcons['Nmap'] },
    { name: 'Burp Suite', icon: techIcons['Burp Suite'] },
    { name: 'Python', icon: techIcons['Python'] },
  ];

  const defensiveTechs = [
    { name: 'Splunk', icon: techIcons['Splunk'] },
    { name: 'Wireshark', icon: techIcons['Wireshark'] },
    { name: 'SIEM', icon: techIcons['SIEM'] },
    { name: 'Arch Linux', icon: techIcons['Arch Linux'] },
    { name: 'Fedora', icon: techIcons['Fedora'] },
  ];

  const devTechs = [
    { name: 'React', icon: techIcons['React'] },
    { name: 'Laravel', icon: techIcons['Laravel'] },
    { name: 'Tailwind', icon: techIcons['Tailwind'] },
    { name: 'JavaScript', icon: techIcons['JavaScript'] },
    { name: 'n8n', icon: techIcons['n8n'] },
    { name: 'Docker', icon: techIcons['Docker'] },
    { name: 'Git', icon: techIcons['Git'] },
  ];

  const duplicateArray = (arr) => [...arr, ...arr, ...arr];

  const getTrackMetrics = (element) => {
    const computedStyle = window.getComputedStyle(element);
    const gap = parseFloat(computedStyle.gap) || 20;
    const scrollWidth = element.scrollWidth;
    return { scrollWidth, gap };
  };

  const cleanupCarousel = (timelineRef, draggableRef) => {
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }
    if (draggableRef.current && draggableRef.current.length > 0) {
      draggableRef.current[0].kill();
      draggableRef.current = null;
    }
  };

  const initCarousel = useCallback((trackElement, timelineRef, draggableRef, direction = 1, duration = 30) => {
    if (!trackElement) return;

    cleanupCarousel(timelineRef, draggableRef);

    gsap.set(trackElement, { x: 0 });

    const { scrollWidth, gap } = getTrackMetrics(trackElement);
    const itemWidth = (scrollWidth + gap) / 3;

    timelineRef.current = gsap.to(trackElement, {
      x: direction === 1 ? `-=${itemWidth}` : `+=${itemWidth}`,
      duration: duration,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => {
          return parseFloat(x) % itemWidth;
        })
      }
    });

    draggableRef.current = Draggable.create(trackElement, {
      type: 'x',
      inertia: true,
      onPress: () => timelineRef.current.pause(),
      onRelease: () => timelineRef.current.play(),
      onDrag: function() {
        gsap.set(this.target, { x: this.x % itemWidth });
      },
      onThrowUpdate: function() {
        gsap.set(this.target, { x: this.x % itemWidth });
      }
    });
  }, []);

  const setupCarousels = useCallback(() => {
    initCarousel(offensiveTrackRef.current, offensiveTimelineRef, offensiveDraggableRef, 1, 35);
    initCarousel(defensiveTrackRef.current, defensiveTimelineRef, defensiveDraggableRef, -1, 30);
    initCarousel(devTrackRef.current, devTimelineRef, devDraggableRef, 1, 40);
  }, [initCarousel]);

  useEffect(() => {
    // Timeout pequeño para asegurar renderizado completo
    const initTimeout = setTimeout(() => {
      setupCarousels();
    }, 100);

    const handleResize = () => {
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(() => {
        setupCarousels();
      }, 250);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(initTimeout);
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      window.removeEventListener('resize', handleResize);
      cleanupCarousel(offensiveTimelineRef, offensiveDraggableRef);
      cleanupCarousel(defensiveTimelineRef, defensiveDraggableRef);
      cleanupCarousel(devTimelineRef, devDraggableRef);
    };
  }, [setupCarousels]);

  const Track = ({ title, techs, trackRef, trackClass }) => (
    <div className={`carousel-container ${trackClass}`}>
      <h4 className="carousel-title text-[#e8f0fe] mb-3 opacity-90 text-sm font-semibold tracking-wider font-SpaceMono">
        <span className="text-redteam mr-2">{'>'}</span> {title}
      </h4>
      <div className="carousel-track-wrapper">
        <div className="carousel-track" ref={trackRef}>
          {duplicateArray(techs).map((tech, idx) => (
            <div key={`${tech.name}-${idx}`} className="carousel-item">
              <i className={`${tech.icon} text-3xl mb-2 opacity-80 group-hover:opacity-100 transition-opacity`}></i>
              <span className="text-xs font-medium text-[#94a3b8] group-hover:text-white transition-colors">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="skills-carousel-section">
      <div className="skills-carousel-wrapper">
        <Track 
          title="[OFFENSIVE / RED TEAM]" 
          techs={offensiveTechs} 
          trackRef={offensiveTrackRef} 
          trackClass="track-offensive"
        />
        <Track 
          title="[DEFENSIVE / BLUE TEAM]" 
          techs={defensiveTechs} 
          trackRef={defensiveTrackRef} 
          trackClass="track-defensive"
        />
        <Track 
          title="[DEVELOPMENT]" 
          techs={devTechs} 
          trackRef={devTrackRef} 
          trackClass="track-dev"
        />
      </div>
    </div>
  );
};

export default SkillsCarousel;
