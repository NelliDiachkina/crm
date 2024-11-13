import React from 'react';
import PromotionForm from '@/app/components/promotion-form';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;

  return (
    <div className="py-6 px-10">
      <PromotionForm companyId={resolvedParams.id} />
    </div>
  );
}
