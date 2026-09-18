// IpLocation.tsx
'use client';

import { useState, useEffect } from 'react';

const IpLocation = () => {
  const [location, setLocation] = useState('Hong Kong');

  useEffect(() => {
    // 直接从 Vercel 注入的请求头中读取
    // 注意：客户端无法直接读取这些头，需要通过一个 Server Component 或 API 路由中转
    // 为了简化，这里还是保留 API 路由的方案
    // 如果要在 Server Component 中使用，可以这样：
    // import { headers } from 'next/headers';
    // const city = headers().get('x-vercel-ip-city');
  }, []);

  return <span>{location}</span>;
};

export default IpLocation;