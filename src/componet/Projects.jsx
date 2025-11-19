import { motion } from 'framer-motion';
import Link from 'next/link';
import ArrowIcon from '@/assest/Icons/ArrowIcon';

const slugify = (text) => {
    return text
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
};

const Projects = ({ 
    projects, 
    currentProjectIndex, 
    maxItems = 6,
    title = "" 
}) => {
    // Filter out current project and limit the number of items
    const Projects = projects
        .filter((_, index) => index !== currentProjectIndex)
        .slice(0, maxItems);

    if (Projects.length === 0) {
        return null;
    }

    return (
        <section className="">
            {title && (
                <h2 className="text-3xl font-bold mb-12 text-black">
                    {title}
                </h2>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {Projects.map((project, index) => (
                    <ProjectCard 
                        key={index} 
                        project={project} 
                        index={index} 
                    />
                ))}
            </div>
        </section>
    );
};

const ProjectCard = ({ project, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group cursor-pointer"
        >
            <Link href={`/project/${slugify(project.title)}`}>
                <div className="relative bg-white/5 rounded-xl overflow-hidden border border-black/30 hover:border-black/60 transition-all duration-500">
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 transition-all duration-500 z-10 pointer-events-none" />

                    {/* Project Image */}
                    <div className="aspect-[4/3] overflow-hidden relative">
                        <img
                            src={project.img?.src || project.img}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />

                        {/* Overlay gradient */}
                        <div className="absolute inset-0 from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Project Info */}
                    <div className="p-6 relative z-20">
                        <h3 className="text-xl font-bold mb-2 text-black transition-all duration-300">
                            {project.title}
                        </h3>
                        <p className="text-black/70 text-sm mb-3">
                            {project.time}
                        </p>
                        <div className="flex items-center gap-2 text-black/60 transition-colors duration-300">
                            <span className="text-sm">View Project</span>
                            <motion.div
                                className="w-4 h-4"
                                whileHover={{ x: 5 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ArrowIcon />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default Projects;