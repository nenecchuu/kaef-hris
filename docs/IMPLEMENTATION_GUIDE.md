# 🚀 IMPLEMENTATION GUIDE - Quick Start

**Target:** Demo MVP Aplikasi Kompetensi Kimia Farma
**Tech Stack:** Laravel 9 + React 18 + TypeScript + React Router
**Estimasi:** 4-6 jam development time

---

## 📚 DOKUMEN REFERENSI

1. **[project_brief.md](../project_brief.md)** - Source of Truth untuk business rules
2. **[DEMO_MVP_SPEC.md](./DEMO_MVP_SPEC.md)** - Spesifikasi teknis lengkap
3. **[WIREFRAME_DEMO.md](./WIREFRAME_DEMO.md)** - Visual mockup & wireframe
4. **Dokumen ini** - Quick start untuk mulai coding

---

## ⚡ QUICK START (30 menit setup)

### 1. Create Folder Structure
```bash
# Di dalam resources/app/
mkdir -p competency/pages
mkdir -p competency/components
mkdir -p competency/hooks

# Di dalam resources/
mkdir -p types
```

### 2. Create TypeScript Types
**File: `resources/types/competency.d.ts`**

```typescript
export type CompetencyStatus = '✅ Fit' | '⚠️ Gap' | '⬆️ Exceed';

export interface Employee {
  id: string;
  nama: string;
  jabatan: string;
  fungsi: string;
  level: string;
  photo?: string;
  email?: string;
  status_kompetensi: CompetencyStatus;
  fit_rate_overall: number;
}

export interface CompetencyItem {
  nama: string;
  expected: number;
  actual: number;
  gap: number;
  status: CompetencyStatus;
}

export interface CompetencyCategory {
  kategori: string;
  expected: number;
  actual_avg: number;
  fit_rate: number;
  gap: number;
  status: CompetencyStatus;
  items?: CompetencyItem[];
}

export interface AssessmentResult {
  assessed_date: string;
  assessor?: string;
  assessments: CompetencyCategory[];
}

export interface LeaderTeamData {
  leader_id: string;
  leader_name: string;
  leader_position: string;
  team_kpi: {
    total_members: number;
    avg_fit_rate: number;
    critical_gaps: number;
    status_distribution: {
      fit: number;
      gap: number;
      exceed: number;
    };
  };
  team_members: Employee[];
}

export interface EmployeeDetailData {
  employee: Employee & {
    phone?: string;
    department?: string;
    join_date?: string;
  };
  assessment_results: AssessmentResult;
  work_history?: any[];
  education?: any[];
  training?: any[];
  personal_qualification?: any[];
  achievement?: any[];
  kpi_personal?: any[];
}
```

### 3. Setup Router
**File: `resources/app/competency/competency.router.tsx`**

```typescript
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const LeaderHome = lazy(() => import('./pages/LeaderHome'));
const LeaderTeam = lazy(() => import('./pages/LeaderTeam'));
const EmployeeDetail = lazy(() => import('./pages/EmployeeDetail'));

export const competencyRoutes: RouteObject[] = [
  {
    path: '/leader',
    children: [
      {
        path: 'home',
        element: <LeaderHome />,
      },
      {
        path: 'team',
        element: <LeaderTeam />,
      },
      {
        path: 'team/:employeeId',
        element: <EmployeeDetail />,
      },
    ],
  },
];
```

**Update main router** (contoh di `resources/app/user.router.tsx` atau buat baru):
```typescript
import { competencyRoutes } from './competency/competency.router';

// Add to your existing routes
const routes: RouteObject[] = [
  // ... existing routes
  ...competencyRoutes,
];
```

---

## 🎨 SETUP BRAND COLORS

**File: `tailwind.config.ts`** (update existing)

```typescript
export default {
  theme: {
    extend: {
      colors: {
        'kf-blue': {
          DEFAULT: '#003A78',
          light: '#0057B7',
          dark: '#002654',
        },
        'kf-orange': {
          DEFAULT: '#F39200',
          light: '#FFB84D',
          dark: '#CC7600',
        },
      },
    },
  },
};
```

---

## 🔌 CREATE MOCK DATA HOOKS

### Hook 1: useLeaderTeam
**File: `resources/app/competency/hooks/useLeaderTeam.ts`**

```typescript
import { useQuery } from '@tanstack/react-query';
import { LeaderTeamData } from '@/types/competency';
import leaderTeamMock from '@/../../mock-data/leader_team.json';

export const useLeaderTeam = () => {
  return useQuery<LeaderTeamData>({
    queryKey: ['leader-team'],
    queryFn: async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      return leaderTeamMock as LeaderTeamData;
    },
  });
};
```

### Hook 2: useEmployeeDetail
**File: `resources/app/competency/hooks/useEmployeeDetail.ts`**

```typescript
import { useQuery } from '@tanstack/react-query';
import { EmployeeDetailData } from '@/types/competency';
import employeeE001Mock from '@/../../mock-data/employee_detail_E001.json';

export const useEmployeeDetail = (employeeId: string) => {
  return useQuery<EmployeeDetailData>({
    queryKey: ['employee-detail', employeeId],
    queryFn: async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // For demo, only return E001 data
      if (employeeId === 'E001') {
        return employeeE001Mock as EmployeeDetailData;
      }

      // For other employees, return minimal mock
      throw new Error('Employee data not available for demo');
    },
  });
};
```

---

## 🧩 BUILD REUSABLE COMPONENTS

### Component 1: StatusBadge
**File: `resources/app/competency/components/StatusBadge.tsx`**

```typescript
import { CompetencyStatus } from '@/types/competency';
import clsx from 'clsx';

interface StatusBadgeProps {
  status: CompetencyStatus;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const variants = {
    '✅ Fit': 'bg-green-100 text-green-800 border-green-200',
    '⚠️ Gap': 'bg-orange-100 text-orange-800 border-orange-200',
    '⬆️ Exceed': 'bg-blue-100 text-blue-800 border-blue-200',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm font-medium',
        variants[status],
        className,
      )}
    >
      {status}
    </span>
  );
};
```

### Component 2: KPICard
**File: `resources/app/competency/components/KPICard.tsx`**

```typescript
import { ReactNode } from 'react';
import clsx from 'clsx';

interface KPICardProps {
  icon: ReactNode;
  title: string;
  value: string | number;
  trend?: string;
  valueColor?: 'default' | 'success' | 'warning' | 'danger';
  className?: string;
}

export const KPICard = ({
  icon,
  title,
  value,
  trend,
  valueColor = 'default',
  className,
}: KPICardProps) => {
  const valueColors = {
    default: 'text-gray-900',
    success: 'text-green-600',
    warning: 'text-orange-600',
    danger: 'text-red-600',
  };

  return (
    <div
      className={clsx(
        'rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md',
        className,
      )}
    >
      <div className="mb-2 text-kf-blue">{icon}</div>
      <div className="text-sm text-gray-600">{title}</div>
      <div className={clsx('mt-1 text-3xl font-bold', valueColors[valueColor])}>
        {value}
      </div>
      {trend && <div className="mt-2 text-xs text-gray-500">{trend}</div>}
    </div>
  );
};
```

### Component 3: EmployeeCard
**File: `resources/app/competency/components/EmployeeCard.tsx`**

```typescript
import { Employee } from '@/types/competency';
import { StatusBadge } from './StatusBadge';
import clsx from 'clsx';

interface EmployeeCardProps {
  employee: Employee;
  onClick?: () => void;
}

export const EmployeeCard = ({ employee, onClick }: EmployeeCardProps) => {
  const borderColors = {
    '✅ Fit': 'border-l-green-500',
    '⚠️ Gap': 'border-l-orange-500',
    '⬆️ Exceed': 'border-l-blue-500',
  };

  return (
    <div
      onClick={onClick}
      className={clsx(
        'cursor-pointer rounded-lg border border-gray-200 border-l-4 bg-white p-4 shadow-sm transition hover:shadow-md',
        borderColors[employee.status_kompetensi],
      )}
    >
      <div className="flex items-center gap-4">
        <img
          src={employee.photo || 'https://i.pravatar.cc/150'}
          alt={employee.nama}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="font-semibold text-gray-900">{employee.nama}</div>
          <div className="text-sm text-gray-600">{employee.jabatan}</div>
          <div className="text-xs text-gray-500">{employee.fungsi}</div>
        </div>
        <div className="text-right">
          <StatusBadge status={employee.status_kompetensi} />
          <div className="mt-1 text-sm font-medium text-gray-700">
            {employee.fit_rate_overall}%
          </div>
        </div>
      </div>
    </div>
  );
};
```

### Component 4: AssessmentTable (HERO COMPONENT)
**File: `resources/app/competency/components/AssessmentTable.tsx`**

```typescript
import { CompetencyCategory } from '@/types/competency';
import { StatusBadge } from './StatusBadge';
import { useState } from 'react';
import clsx from 'clsx';

interface AssessmentTableProps {
  assessments: CompetencyCategory[];
}

export const AssessmentTable = ({ assessments }: AssessmentTableProps) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b-2 border-kf-blue bg-gray-50">
            <th className="p-3 text-left font-semibold">Kategori Kompetensi</th>
            <th className="p-3 text-center font-semibold">Expected</th>
            <th className="p-3 text-center font-semibold">Actual (Avg)</th>
            <th className="p-3 text-center font-semibold">Fit Rate</th>
            <th className="p-3 text-center font-semibold">Gap</th>
            <th className="p-3 text-center font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {assessments.map((item) => (
            <>
              <tr
                key={item.kategori}
                onClick={() =>
                  setExpandedRow(
                    expandedRow === item.kategori ? null : item.kategori,
                  )
                }
                className="cursor-pointer border-b transition hover:bg-gray-50"
              >
                <td className="p-3 font-medium">{item.kategori}</td>
                <td className="p-3 text-center">{item.expected.toFixed(1)}</td>
                <td className="p-3 text-center font-semibold">
                  {item.actual_avg.toFixed(1)}
                </td>
                <td className="p-3 text-center">
                  <span className="rounded-full border border-gray-300 bg-gray-50 px-2 py-1 text-sm">
                    {item.fit_rate}%
                  </span>
                </td>
                <td className="p-3 text-center">
                  <span
                    className={clsx(
                      'font-semibold',
                      item.gap < 0 && 'text-orange-600',
                      item.gap === 0 && 'text-green-600',
                      item.gap > 0 && 'text-blue-600',
                    )}
                  >
                    {item.gap > 0 && '+'}
                    {item.gap}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <StatusBadge status={item.status} />
                </td>
              </tr>

              {/* Expanded Row */}
              {expandedRow === item.kategori && item.items && (
                <tr>
                  <td colSpan={6} className="bg-gray-50 p-4">
                    <div className="text-sm font-semibold mb-2">
                      Detail Item Kompetensi:
                    </div>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="p-2 text-left">Item</th>
                          <th className="p-2 text-center">Expected</th>
                          <th className="p-2 text-center">Actual</th>
                          <th className="p-2 text-center">Gap</th>
                          <th className="p-2 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.items.map((subItem) => (
                          <tr key={subItem.nama} className="border-b">
                            <td className="p-2">{subItem.nama}</td>
                            <td className="p-2 text-center">{subItem.expected}</td>
                            <td className="p-2 text-center">{subItem.actual}</td>
                            <td className="p-2 text-center">
                              <span
                                className={clsx(
                                  'font-semibold',
                                  subItem.gap < 0 && 'text-orange-600',
                                  subItem.gap === 0 && 'text-green-600',
                                  subItem.gap > 0 && 'text-blue-600',
                                )}
                              >
                                {subItem.gap > 0 && '+'}
                                {subItem.gap}
                              </span>
                            </td>
                            <td className="p-2 text-center">
                              <StatusBadge status={subItem.status} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};
```

### Component 5: BottomNavLeader
**File: `resources/app/competency/components/BottomNavLeader.tsx`**

```typescript
import { Link, useLocation } from 'react-router-dom';
import { IconHome, IconUsers, IconChartBar, IconBell, IconDots } from '@tabler/icons-react';
import clsx from 'clsx';

const navItems = [
  { icon: IconHome, label: 'Beranda', path: '/leader/home' },
  { icon: IconUsers, label: 'Tim', path: '/leader/team' },
  { icon: IconChartBar, label: 'Analisis', path: '/leader/analysis' },
  { icon: IconBell, label: 'Notifikasi', path: '/leader/notifications' },
  { icon: IconDots, label: 'Lainnya', path: '/leader/more' },
];

export const BottomNavLeader = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={clsx(
                'flex flex-1 flex-col items-center gap-1 py-2 transition',
                isActive
                  ? 'border-t-2 border-kf-blue text-kf-blue'
                  : 'text-gray-500 hover:text-gray-700',
              )}
            >
              <Icon size={24} />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
```

---

## 📄 BUILD PAGES

### Page 1: LeaderHome
**File: `resources/app/competency/pages/LeaderHome.tsx`**

```typescript
import { KPICard } from '../components/KPICard';
import { BottomNavLeader } from '../components/BottomNavLeader';
import { useLeaderTeam } from '../hooks/useLeaderTeam';
import { IconUsers, IconChartBar, IconAlertTriangle } from '@tabler/icons-react';

export default function LeaderHome() {
  const { data, isLoading } = useLeaderTeam();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const { leader_name, leader_position, team_kpi } = data!;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-kf-blue p-6 text-gray-100">
        <div className="mb-2 text-sm">Selamat Pagi,</div>
        <div className="text-xl font-bold">{leader_name}</div>
        <div className="text-sm opacity-90">{leader_position}</div>
      </div>

      {/* KPI Cards */}
      <div className="space-y-4 p-4">
        <KPICard
          icon={<IconUsers size={32} />}
          title="Total Anggota Tim"
          value={team_kpi.total_members}
          trend="+2 dari bulan lalu"
        />
        <KPICard
          icon={<IconChartBar size={32} />}
          title="Rata-rata Fit Rate Tim"
          value={`${team_kpi.avg_fit_rate}%`}
          trend="+5% dari bulan lalu"
          valueColor="success"
        />
        <KPICard
          icon={<IconAlertTriangle size={32} />}
          title="Gap Kritis"
          value={team_kpi.critical_gaps}
          trend="Karyawan perlu development"
          valueColor="warning"
        />

        {/* Status Distribution */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="mb-4 font-semibold">Status Distribusi:</div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>✅ Fit</span>
              <span className="font-semibold">
                {team_kpi.status_distribution.fit} (
                {((team_kpi.status_distribution.fit / team_kpi.total_members) * 100).toFixed(1)}%)
              </span>
            </div>
            <div className="flex justify-between">
              <span>⚠️ Gap</span>
              <span className="font-semibold">
                {team_kpi.status_distribution.gap} (
                {((team_kpi.status_distribution.gap / team_kpi.total_members) * 100).toFixed(1)}%)
              </span>
            </div>
            <div className="flex justify-between">
              <span>⬆️ Exceed</span>
              <span className="font-semibold">
                {team_kpi.status_distribution.exceed} (
                {((team_kpi.status_distribution.exceed / team_kpi.total_members) * 100).toFixed(1)}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      <BottomNavLeader />
    </div>
  );
}
```

### Page 2: LeaderTeam
**File: `resources/app/competency/pages/LeaderTeam.tsx`**

```typescript
import { EmployeeCard } from '../components/EmployeeCard';
import { BottomNavLeader } from '../components/BottomNavLeader';
import { useLeaderTeam } from '../hooks/useLeaderTeam';
import { useNavigate } from 'react-router-dom';

export default function LeaderTeam() {
  const { data, isLoading } = useLeaderTeam();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const { team_members } = data!;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white p-6">
        <div className="text-xl font-bold">Tim Saya</div>
        <div className="text-sm text-gray-600">{team_members.length} Anggota</div>
      </div>

      {/* Search Bar (non-functional for demo) */}
      <div className="p-4">
        <input
          type="text"
          placeholder="🔍 Cari nama karyawan..."
          className="w-full rounded-lg border border-gray-300 p-3"
          disabled
        />
      </div>

      {/* Employee List */}
      <div className="space-y-3 px-4">
        {team_members.map((employee) => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            onClick={() => navigate(`/leader/team/${employee.id}`)}
          />
        ))}
      </div>

      <BottomNavLeader />
    </div>
  );
}
```

### Page 3: EmployeeDetail (dengan Tabs)
**File: `resources/app/competency/pages/EmployeeDetail.tsx`**

```typescript
import { useParams, useNavigate } from 'react-router-dom';
import { useEmployeeDetail } from '../hooks/useEmployeeDetail';
import { StatusBadge } from '../components/StatusBadge';
import { AssessmentTable } from '../components/AssessmentTable';
import { BottomNavLeader } from '../components/BottomNavLeader';
import { IconArrowLeft } from '@tabler/icons-react';
import { useState } from 'react';
import clsx from 'clsx';

export default function EmployeeDetail() {
  const { employeeId } = useParams<{ employeeId: string }>();
  const navigate = useNavigate();
  const { data, isLoading } = useEmployeeDetail(employeeId!);
  const [activeTab, setActiveTab] = useState('assessment');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const { employee, assessment_results, work_history, education, achievement, kpi_personal } = data!;

  const tabs = [
    { id: 'work-history', label: 'Riwayat Kerja' },
    { id: 'education', label: 'Pendidikan' },
    { id: 'assessment', label: 'Hasil Assessment' },
    { id: 'training', label: 'Training' },
    { id: 'competency', label: 'Kompetensi' },
    { id: 'qualification', label: 'Kualifikasi' },
    { id: 'achievement', label: 'Achievement' },
    { id: 'kpi', label: 'KPI Personal' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white p-4">
        <button onClick={() => navigate(-1)} className="mb-4 flex items-center gap-2 text-kf-blue">
          <IconArrowLeft size={20} />
          Kembali
        </button>

        <div className="flex flex-col items-center">
          <img
            src={employee.photo || 'https://i.pravatar.cc/150'}
            alt={employee.nama}
            className="mb-3 h-24 w-24 rounded-full object-cover"
          />
          <div className="text-center">
            <div className="text-xl font-bold">{employee.nama}</div>
            <div className="text-sm text-gray-600">{employee.jabatan}</div>
            <div className="text-sm text-gray-500">{employee.fungsi}</div>
            <div className="text-xs text-gray-500">{employee.level}</div>
            <div className="mt-2">
              <StatusBadge status={employee.status_kompetensi} />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="overflow-x-auto border-b border-gray-200 bg-white">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                'whitespace-nowrap border-b-2 px-4 py-3 text-sm transition',
                activeTab === tab.id
                  ? 'border-kf-blue font-semibold text-kf-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {activeTab === 'assessment' && (
          <div>
            <div className="mb-4 rounded-lg bg-white p-4">
              <div className="font-semibold">Hasil Assessment</div>
              <div className="text-sm text-gray-600">
                Terakhir diupdate: {assessment_results.assessed_date}
              </div>
            </div>
            <AssessmentTable assessments={assessment_results.assessments} />
          </div>
        )}

        {activeTab === 'work-history' && (
          <div className="space-y-3">
            {work_history?.map((item: any) => (
              <div key={item.id} className="rounded-lg bg-white p-4">
                <div className="font-semibold">{item.position}</div>
                <div className="text-sm text-gray-600">{item.department}</div>
                <div className="text-xs text-gray-500">
                  {item.start_date} - {item.end_date || 'Sekarang'}
                </div>
                <div className="mt-2 text-sm">{item.description}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'education' && (
          <div className="space-y-3">
            {education?.map((item: any) => (
              <div key={item.id} className="rounded-lg bg-white p-4">
                <div className="font-semibold">{item.degree}</div>
                <div className="text-sm text-gray-600">{item.institution}</div>
                <div className="text-xs text-gray-500">
                  {item.year_start} - {item.year_end}
                </div>
                {item.gpa && <div className="mt-1 text-sm">GPA: {item.gpa}</div>}
              </div>
            ))}
          </div>
        )}

        {/* Other tabs - placeholder */}
        {!['assessment', 'work-history', 'education'].includes(activeTab) && (
          <div className="rounded-lg bg-white p-8 text-center text-gray-500">
            Data {tabs.find((t) => t.id === activeTab)?.label} akan ditampilkan di sini
          </div>
        )}
      </div>

      <BottomNavLeader />
    </div>
  );
}
```

---

## ✅ FINAL CHECKLIST

### Before Testing
- [ ] All TypeScript types created
- [ ] Router configured
- [ ] Brand colors added to Tailwind config
- [ ] Mock data hooks created
- [ ] All 5 reusable components created
- [ ] All 3 pages created
- [ ] Bottom navigation working

### Testing Flow
- [ ] Navigate to `/leader/home` - Dashboard loads with KPI
- [ ] Click "Tim" tab - Team list displays 7 employees
- [ ] Click "Budi Santoso" card - Detail page opens
- [ ] Verify profile header displays correctly
- [ ] Click "Hasil Assessment" tab (should be default)
- [ ] Verify table shows 5 categories with correct format:
  - [ ] Average: plain number (2.4)
  - [ ] Fit Rate: percentage (40%)
  - [ ] Gap: signed integer (-1)
  - [ ] Status: badges with icons
- [ ] Click a table row - Should expand to show items
- [ ] Click "Riwayat Kerja" tab - Should show work history
- [ ] Navigate back to Team - Back button works

### Polish
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Responsive on mobile (375px, 414px)
- [ ] Colors match brand (#003A78, #F39200)
- [ ] Loading states working
- [ ] Smooth transitions

---

## 🎬 DEMO REHEARSAL

Practice this flow before presentation:

1. **Open app** → Auto or manual login
2. **Show Dashboard** (30s)
   - "Ini dashboard untuk Leader"
   - "24 anggota tim, fit rate 62%"
   - "Ada 5 karyawan yang perlu development"
3. **Go to Team** (30s)
   - "Daftar semua anggota tim"
   - "Status terlihat dengan jelas"
4. **Open Budi Santoso** (2 min)
   - "Detail lengkap karyawan"
   - "8 jenis data terintegrasi"
   - "Fokus ke Hasil Assessment"
5. **Show Assessment Table** (1.5 min)
   - "5 kategori kompetensi"
   - "Expected vs Actual"
   - "Gap otomatis terdeteksi"
   - "Expand untuk detail item"
6. **Back to Team** (30s)
   - "Closure: value proposition"

**Total: 5 menit**

---

## 🚨 TROUBLESHOOTING

### TypeScript errors on import
- Check `tsconfig.json` has correct path aliases
- Verify `@/types` maps to `resources/types`

### Routes not working
- Make sure `competencyRoutes` merged into main router
- Check React Router version compatibility

### Mock data not loading
- Verify JSON file paths
- Check if `mock-data/` is accessible from `resources/`
- May need to adjust import paths

### Tailwind classes not working
- Run `npm run build` to regenerate Tailwind
- Check `tailwind.config.ts` extends colors correctly

---

## 📞 SUPPORT

**Referensi:**
- [React Router Docs](https://reactrouter.com/)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Radix UI Docs](https://www.radix-ui.com/)
- [Tabler Icons](https://tabler-icons.io/)

**Mock Data:**
- `mock-data/leader_team.json` - Team data
- `mock-data/employee_detail_E001.json` - Budi Santoso detail

---

**Last Updated:** 2024-11-04
**Status:** Ready to implement
**Estimated Time:** 4-6 hours
