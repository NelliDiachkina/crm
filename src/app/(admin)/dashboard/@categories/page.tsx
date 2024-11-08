import DashboardCard from '@/app/components/dashboard-card';
import StatCard, { StatCardType } from '@/app/components/stat-card';
import { getSummaryCategories } from '@/lib/api';

export default async function Page() {
  const data = await getSummaryCategories();

  return (
    <DashboardCard label="Categories of companies">
      <ul className="grid grid-cols-12 gap-3 pb-5 px-5">
        {data.map(({ categoryId, categoryTitle, count }) => (
          <li key={categoryId} className="col-span-3">
            <StatCard
              type={StatCardType.Dark}
              label={categoryTitle}
              counter={count}
            />
          </li>
        ))}
      </ul>
    </DashboardCard>
  );
}
