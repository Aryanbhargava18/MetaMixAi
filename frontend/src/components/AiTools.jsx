// AiTools.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiToolsData } from '../assets/assets';

const AiTools = () => {
  const navigate = useNavigate();

  return (
    <div className='px-4 sm:px-20 xl:px-32 bg-[#0A0A0F]'>
      <div className='text-center'>
        <h1 className='text-[#6B8CFF] text-[42px] font-semibold'>
          Discover Leading AI Solutions
        </h1>
        <p className='text-[#CCCCCC] max-w-lg mx-auto'>
          Discover the most popular and cutting-edge AI tools—all seamlessly integrated into one platform to help you create, enhance, and optimize things faster and smarter. Explore the latest in AI technology curated for every creative and professional need.
        </p>
      </div>
      <div className='flex flex-wrap mt-10 justify-center'>
        {AiToolsData.map((tool, index) => (
          <div
            key={index}
            className='p-8 m-4 max-w-xs rounded-lg bg-[#FDFDFE] shadow-lg border border-gray-100 hover:-translate-y-1 transition-all duration-300 cursor-pointer'
            onClick={() => navigate(tool.path)}
          >
            <div
              className='w-12 h-12 flex items-center justify-center rounded-xl mb-6'
              style={{
                background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`
              }}
            >
              <tool.Icon className='w-8 h-8 text-white' />
            </div>
            <h3 className='mb-3 text-lg font-semibold'>{tool.title}</h3>
            <p className='text-[#6B7280] text-sm max-w-[95%]'>{tool.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiTools;
