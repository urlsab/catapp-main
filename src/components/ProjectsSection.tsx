import React from 'react';
import resumeBuilderImage from '../../Assets/resumes builder website.png';
import orBenjiImage from '../../Assets/benji website.png';
import refaelLawImage from '../../Assets/refael website.png';
import atlizImage from '../../Assets/atliz website.png';
import campNetworkImage from '../../Assets/camps website.png';
import colorGameImage from '../../Assets/color game website.png';
import portfolioImage from '../../Assets/portfolio website.png';
import amiChaiImage from '../../Assets/ami-story.png';

interface Project {
  id: number;
  title: string;
  image: string;
  url?: string;
}

const ProjectsSection: React.FC = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: 'בונה קו"ח',
      image: resumeBuilderImage,
      url: 'https://resumes-builder.web.app'
    },
    {
      id: 2,
      title: "אור בנג'י",
      image: orBenjiImage,
      url: 'https://orbenji.com'
    },
    {
      id: 3,
      title: 'רפאל סבג - עו"ד',
      image: refaelLawImage,
      url: 'https://refael-law.com'
    },
    {
      id: 4,
      title: 'אטליז למהדרין',
      image: atlizImage,
      url: 'https://atliz.co.il'
    },
    {
      id: 5,
      title: 'רשת חברתית',
      image: campNetworkImage,
      url: 'https://yelp--camp--project.herokuapp.com'
    },
    {
      id: 6,
      title: 'משחק צבעים',
      image: colorGameImage,
      url: 'https://color-game-react.vercel.app'
    },
    {
      id: 7,
      title: 'אתר פורטפוליו',
      image: portfolioImage,
      url: 'https://portfolio-uriel-yair-sabag.vercel.app'
    },
    {
      id: 8,
      title: 'עמי-חי',
      image: amiChaiImage,
      url: 'https://ami-chai.com'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-24 pb-16 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
            הפרויקטים <span className="text-[#1a79f6]">שלנו</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg">
            לחצו על פרויקט לביקור באתר
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl border border-white/10 hover:border-[#1a79f6]/60 transition-all duration-300 shadow-lg hover:shadow-[0_0_24px_rgba(26,121,246,0.3)] block aspect-video bg-gray-900"
            >
              {/* Project Image */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 transition-all duration-300 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                  <span className="text-white text-xl sm:text-2xl font-bold text-center drop-shadow-lg px-4">
                    {project.title}
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-[#1a79f6] text-white text-sm font-semibold px-4 py-1.5 rounded-full shadow-lg">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    צפה באתר
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;
