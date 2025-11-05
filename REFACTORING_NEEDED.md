# 🔧 REFACTORING NEEDED - Fit to Base Project

**Date:** 2025-11-04
**Issue:** Code doesn't follow existing codebase patterns
**Priority:** HIGH - Must fix before demo

---

## 🚨 CRITICAL ISSUES IDENTIFIED

### 1. **Not Using Base UI Components**
**Current:** We're using raw HTML/TailwindCSS
**Should Be:** Using `@src/ui` components

### 2. **Wrong Page Structure**
**Current:** Direct return of HTML
**Should Be:** Wrapped in `<Header>`, `<Title>`, `<View>` components

### 3. **Inconsistent Component Patterns**
**Current:** Exporting functional components
**Should Be:** Following naming conventions (`export function ComponentName()`)

### 4. **Missing Standard Imports**
**Current:** Not using lib utilities
**Should Be:** Using `cn()` from `@src/lib/styling`, `useAuth()` etc.

---

## 📋 WHAT NEEDS TO CHANGE

### Pattern Analysis from Existing Code:

```typescript
// ✅ CORRECT PATTERN (from HomeRootPage.tsx):
import * as React from "react";
import { Icon... } from "@tabler/icons-react";
import { useAuth } from "@src/lib/auth";
import { View } from "@src/ui/view";

export function PageName() {
  const { user } = useAuth();

  return (
    <View>
      {/* content */}
    </View>
  );
}

// ✅ CORRECT PATTERN (from UserRootPage.tsx):
import React from "react";
import { Icon... } from "@tabler/icons-react";
import { Header, Title } from "@src/ui/page";
import { View } from "@src/ui/view";
import { Button, ButtonLink } from "@src/ui/button";

export function PageName() {
  return (
    <>
      <Header>
        <Title>Page Title</Title>
        <ButtonLink to="./new">
          <IconPlus /> Add Item
        </ButtonLink>
      </Header>
      <View>
        {/* content */}
      </View>
    </>
  );
}
```

---

## 🔨 FILES THAT NEED REFACTORING

### Priority 1: Pages (4 files)

#### 1.1 `LeaderHome.tsx`
**Current Issues:**
- ❌ Not using `<Header>` and `<Title>`
- ❌ Not wrapping content in `<View>`
- ❌ Custom header div instead of standard component
- ❌ Export default instead of named export

**Required Changes:**
```diff
- export default function LeaderHome() {
+ export function LeaderHome() {
  const { data, isLoading } = useLeaderTeam();

  if (isLoading) {
    return <LoadingFallback />;
  }

+ return (
+   <>
+     <Header>
+       <Title>Dashboard Kompetensi</Title>
+     </Header>
-     <div className="min-h-screen bg-gray-50 pb-20">
-       <div className="bg-kf-blue p-6 text-gray-100">
-         {/* Header content */}
-       </div>
-       <div className="space-y-4 p-4">
+     <View className="space-y-4">
          {/* KPI Cards */}
+     </View>
+     <BottomNavLeader />
+   </>
+ );
}
```

#### 1.2 `LeaderTeam.tsx`
**Current Issues:**
- ❌ Same as LeaderHome

**Required Changes:**
- Use `<Header>` with `<Title>`
- Wrap list in `<View>`
- Change to named export

#### 1.3 `EmployeeDetail.tsx`
**Current Issues:**
- ❌ Custom back button instead of breadcrumbs
- ❌ Not using `<Header>` pattern
- ❌ Named export is correct ✅ (keep this)

**Required Changes:**
- Add breadcrumbs navigation
- Use `<Header>` and `<Title>`
- Wrap tabs content in `<View>`

#### 1.4 `DemoLanding.tsx`
**Current Issues:**
- ❌ Full custom landing page (this might be OK for demo landing)

**Decision Needed:** Keep as-is OR refactor to match?

---

### Priority 2: Components (5 files)

#### 2.1 `KPICard.tsx`
**Current Status:** ✅ OK - Can stay as custom component

#### 2.2 `EmployeeCard.tsx`
**Current Status:** ✅ OK - Can stay as custom component

#### 2.3 `StatusBadge.tsx`
**Current Status:** ✅ OK - Can stay as custom component

#### 2.4 `AssessmentTable.tsx`
**Current Status:** ✅ OK - Can stay as custom component

#### 2.5 `BottomNavLeader.tsx`
**Current Issues:**
- ❌ Should this be in `resources/components/` instead?
- ❌ Or is it OK in `app/competency/components/`?

**Decision:** Probably OK where it is (app-specific)

---

### Priority 3: Router Integration

#### 3.1 `user.router.tsx`
**Current Issues:**
- ❌ Using default imports: `import LeaderHome from ...`
- ✅ After refactor, should be: `import { LeaderHome } from ...`

**Required Changes:**
```diff
- import LeaderHome from "@src/app/competency/pages/LeaderHome";
- import LeaderTeam from "@src/app/competency/pages/LeaderTeam";
- import EmployeeDetail from "@src/app/competency/pages/EmployeeDetail";
- import DemoLanding from "@src/app/competency/pages/DemoLanding";
+ import { LeaderHome } from "@src/app/competency/pages/LeaderHome";
+ import { LeaderTeam } from "@src/app/competency/pages/LeaderTeam";
+ import { EmployeeDetail } from "@src/app/competency/pages/EmployeeDetail";
+ import { DemoLanding } from "@src/app/competency/pages/DemoLanding";
```

---

## 🎯 REFACTORING PLAN

### Step 1: Update Page Exports
Change all `export default function` to `export function`

### Step 2: Refactor LeaderHome
- Import `Header`, `Title`, `View` from `@src/ui`
- Import `LoadingFallback` from `@src/components/fallbacks`
- Restructure layout to match pattern
- Remove custom header styling, use standard components

### Step 3: Refactor LeaderTeam
- Same pattern as LeaderHome
- Use standard search/filter components if available

### Step 4: Refactor EmployeeDetail
- Add breadcrumbs
- Use `Header` and `Title`
- Consider using `@src/ui/tabs` if available

### Step 5: Update Router
- Change imports from default to named
- Verify routes still work

### Step 6: Test Everything
- Run `npm run build`
- Check for TypeScript errors
- Test in browser

---

## 📊 BEFORE vs AFTER

### Before (Current - Wrong):
```tsx
// LeaderHome.tsx
export default function LeaderHome() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-kf-blue p-6 text-gray-100">
        <div className="text-xl font-bold">{leader_name}</div>
      </div>
      <div className="space-y-4 p-4">
        {/* content */}
      </div>
      <BottomNavLeader />
    </div>
  );
}
```

### After (Correct - Following Base Project):
```tsx
// LeaderHome.tsx
import { Header, Title } from "@src/ui/page";
import { View } from "@src/ui/view";
import { LoadingFallback } from "@src/components/fallbacks";

export function LeaderHome() {
  const { data, isLoading } = useLeaderTeam();

  if (isLoading) {
    return <LoadingFallback />;
  }

  return (
    <>
      <Header>
        <Title>Dashboard Kompetensi - {data.leader_name}</Title>
      </Header>
      <View className="space-y-4">
        {/* KPI Cards */}
        <KPICard ... />
        <KPICard ... />
        {/* Status Distribution */}
      </View>
      <BottomNavLeader />
    </>
  );
}
```

---

## ⚠️ BREAKING CHANGES

### Import Changes Required
After refactoring, update:
- ✅ `user.router.tsx` - Change default imports to named
- ✅ Any lazy imports need updating

### Styling Changes
- Remove `min-h-screen bg-gray-50` (handled by MainLayout)
- Remove custom header backgrounds (use standard patterns)
- May need to adjust `BottomNavLeader` positioning

---

## 🧪 TESTING CHECKLIST

After refactoring:
- [ ] `npm run build` - No TypeScript errors
- [ ] Routes load correctly
- [ ] Pages render with standard layout
- [ ] Header and Title show correctly
- [ ] View component wraps content properly
- [ ] Bottom nav still works
- [ ] All interactions functional
- [ ] Styling matches or improves

---

## 💡 RECOMMENDATIONS

### Must Do (Before Demo):
1. ✅ **Refactor pages** to use standard components
2. ✅ **Update router** imports
3. ✅ **Test** full flow works

### Nice to Have:
1. Check if there's a `@src/ui/tabs` component to use
2. Consider if search/filter has standard components
3. Look for loading skeleton patterns
4. Check for standard table components

### Questions for Review:
1. **Bottom Navigation** - Is this pattern OK? Or should it be different?
2. **Landing Page** - Keep custom or standardize?
3. **Mobile Layout** - Does MainLayout support mobile-first apps?
4. **Colors** - Are custom Kimia Farma colors OK in Tailwind config?

---

## 📝 EXAMPLE REFACTOR (Complete)

### File: `resources/app/competency/pages/LeaderHome.tsx`

```typescript
import * as React from "react";
import {
  IconUsers,
  IconChartBar,
  IconAlertTriangle,
} from "@tabler/icons-react";

import { KPICard } from "../components/KPICard";
import { BottomNavLeader } from "../components/BottomNavLeader";
import { useLeaderTeam } from "../hooks/useLeaderTeam";
import { LoadingFallback } from "@src/components/fallbacks";
import { Header, Title } from "@src/ui/page";
import { View } from "@src/ui/view";

export function LeaderHome() {
  const { data, isLoading } = useLeaderTeam();

  if (isLoading) {
    return <LoadingFallback />;
  }

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-red-600">Error loading data</div>
      </div>
    );
  }

  const { leader_name, leader_position, team_kpi } = data;

  return (
    <>
      <Header>
        <Title>Dashboard Kompetensi</Title>
        <div className="text-sm text-gray-600">
          {leader_name} - {leader_position}
        </div>
      </Header>

      <View className="space-y-4">
        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-3">
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
        </div>

        {/* Status Distribution */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="mb-4 font-semibold">Status Distribusi:</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>✅ Fit</span>
              <span className="font-semibold">
                {team_kpi.status_distribution.fit} (
                {(
                  (team_kpi.status_distribution.fit / team_kpi.total_members) *
                  100
                ).toFixed(1)}
                %)
              </span>
            </div>
            <div className="flex justify-between">
              <span>⚠️ Gap</span>
              <span className="font-semibold">
                {team_kpi.status_distribution.gap} (
                {(
                  (team_kpi.status_distribution.gap / team_kpi.total_members) *
                  100
                ).toFixed(1)}
                %)
              </span>
            </div>
            <div className="flex justify-between">
              <span>⬆️ Exceed</span>
              <span className="font-semibold">
                {team_kpi.status_distribution.exceed} (
                {(
                  (team_kpi.status_distribution.exceed /
                    team_kpi.total_members) *
                  100
                ).toFixed(1)}
                %)
              </span>
            </div>
          </div>
        </div>
      </View>

      <BottomNavLeader />
    </>
  );
}
```

---

## 🚀 ACTION ITEMS

**For Developer:**

1. [ ] Read this refactoring guide
2. [ ] Backup current code (git commit)
3. [ ] Refactor `LeaderHome.tsx` first
4. [ ] Test it works
5. [ ] Refactor remaining pages
6. [ ] Update router imports
7. [ ] Test full flow
8. [ ] Commit refactored code

**Estimated Time:** 1-2 hours

---

## ✅ BENEFITS AFTER REFACTORING

1. **Consistency** - Matches existing codebase patterns
2. **Maintainability** - Easier for team to understand
3. **Reusability** - Uses shared UI components
4. **Standards** - Follows project conventions
5. **Professional** - Shows attention to detail

---

**Created:** 2025-11-04
**Status:** ⚠️ **AWAITING REFACTOR**
**Priority:** 🔴 **HIGH**
**Estimated Effort:** 1-2 hours

**Note:** This refactoring is essential for production-ready code. The current implementation works functionally but doesn't follow the established patterns of the base project.
