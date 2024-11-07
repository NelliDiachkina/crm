'use client';

import React from 'react';
import Button from '@/app/components/button';

export interface ErrorComponentProps {
  reset: () => void;
}

export default function GlobalError({ reset }: ErrorComponentProps) {
  return (
    <html>
      <body>
        <div>
          <p>Something went wrong!</p>
          <Button onClick={() => reset()}>Try again</Button>
        </div>
      </body>
    </html>
  );
}
