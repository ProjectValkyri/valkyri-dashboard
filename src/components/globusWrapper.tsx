"use client";

import dynamic from 'next/dynamic';

// running the globe purely client side, ssr: false -> not using Next.JS server side rendering
const Globe = dynamic(() => import('@/components/openGlobus'), { ssr: false });

export default function GlobeWrapper() {
  return <Globe />;
}