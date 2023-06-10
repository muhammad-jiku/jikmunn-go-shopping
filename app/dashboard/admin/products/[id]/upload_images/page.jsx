import { UploadImages } from '@/components';
import React from 'react';

const Page = async ({ params }) => {
  return <UploadImages id={params.id} />;
};

export default Page;
