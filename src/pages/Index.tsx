
import React from 'react';
import Layout from '@/components/Layout';
import VideoPlayer from '@/components/VideoPlayer';
import PromptInput from '@/components/PromptInput';

const Index = () => {
  return (
    <Layout>
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-hidden">
          <VideoPlayer />
        </div>
        <PromptInput />
      </div>
    </Layout>
  );
};

export default Index;
