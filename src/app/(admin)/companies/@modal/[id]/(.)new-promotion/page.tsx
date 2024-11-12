'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import PromotionFormModal from '@/app/components/promotion-form-modal';

// Обратите внимание на использование React.use
export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();

  const resolvedParams = React.use(params); // Разворачиваем Promise

  return (
    <PromotionFormModal
      companyId={resolvedParams.id}
      show={true}
      onClose={() => router.back()}
    />
  );
}
