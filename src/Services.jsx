import React from 'react';
import { Laptop, HelpCircle, ShoppingCart, Users, Layers, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

const Button = ({ children, className, ...props }) => (
  <button 
    className={`px-6 py-3 font-semibold rounded-lg transition-all duration-300 ease-in-out bg-sky-500 hover:bg-sky-600 text-white ${className}`} 
    {...props}>
    {children}
  </button>
);

const services = [
  {
    title: 'Build Shopify Store',
    icon: <Shopify size={48} />,
    link: 'https://forms.gle/SfkP6rgmFm2oVPs79',
  },
  {
    title: 'Consultation',
    icon: <HelpCircle size={48} />,
    link: 'https://forms.gle/C1pAyQRi2fmxzFEK8',
  },
  {
    title: 'E-Commerce Brand? Scale or Startup',
    icon: <group size={48} />,
    link: 'https://forms.gle/CzZKmtHBNmXWeKDHA',
  },
  {
    title: 'Lead-Gen / Digital-Products',
    icon: <Users size={48} />,
    link: 'https://forms.gle/KP7VhseUnEmmBmz49',
  },
  {
    title: 'Multi-Brand Management',
    icon: <fa fa-line-chart size={48} />,
    link: 'https://docs.google.com/forms/d/e/1FAIpQLSfw9dkRCOMLaoN2FwDmcG6iCpyjQq5kQFnr4SZVo0h0gLYqiA/viewform',
  },
  {
    title: 'Others',
    icon: <Database size={48} />,
    link: 'https://docs.google.com/forms/d/e/1FAIpQLSciaASGQ9zYjllG3gXcZVq5Z_1pu-mSh8dtCqgJeyIRswTExw/viewform',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0 },
};

export default function Services() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans antialiased p-8">
      <h1 className="text-4xl font-extrabold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-teal-300">
        Let’s Build & Scale Your Brand
      </h1>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {services.map(({ title, icon, link }, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="bg-neutral-900 rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-sky-400 transition-shadow cursor-pointer"
          >
            <div className="mb-4 text-sky-400">{icon}</div>
            <h2 className="text-xl font-semibold mb-6">{title}</h2>
            <a href={link} target="_blank" rel="noopener noreferrer" style={{ width: 'fit-content' }}>
              <Button>
                Choose Service
              </Button>
            </a>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
