# 📚 CODEBASE ANALYSIS - Kimia Farma HRIS

**Analysis Date:** 2025-11-04
**Base Project:** BIJ (Buana Indonesia Jaya) Template
**Purpose:** Understand patterns before adding Competency Module

---

## 🏗️ ARCHITECTURE OVERVIEW

### Project Structure
```
resources/
├── app/                    # Feature modules
│   ├── home/              # Homepage module
│   ├── user/              # User management module
│   ├── audit-trail/       # Audit logging
│   ├── password-complexity/
│   └── competency/        # ← OUR NEW MODULE
├── components/            # Shared components
│   ├── main-layout/       # App shell (Header, Sidebar, Footer)
│   ├── site-navigation/   # Nav components
│   ├── fallbacks/         # Error/Loading states
│   ├── forms/             # Form components
│   └── ...
├── ui/                    # Base UI library (Radix UI wrappers)
│   ├── button.tsx
│   ├── tabs.tsx
│   ├── view.tsx
│   ├── page.tsx
│   └── ...
├── lib/                   # Utilities
│   ├── auth.tsx           # Auth context & hooks
│   ├── styling.ts         # cn() util
│   └── ...
├── hooks/                 # Shared hooks
├── constants/             # App constants
│   └── site-navigation.js # Navigation config
└── types/                 # TypeScript types
```

---

## 🎨 UI COMPONENT LIBRARY

### Available Components (@src/ui/*)

#### Layout Components
- ✅ **View** - Card/section wrapper with shadow & border
- ✅ **Header** - Page header wrapper
- ✅ **Title** - Page title with document title sync
- ✅ **Card** - Generic card component

#### Form Components
- ✅ **Button / ButtonLink** - Primary/Secondary/Ghost/Outline variants
- ✅ **Input** - Text input
- ✅ **InputNumber** - Number input
- ✅ **Textarea** - Multi-line text
- ✅ **Select** - Dropdown select
- ✅ **Combobox / MultiCombobox** - Searchable select
- ✅ **Checkbox** - Checkbox input
- ✅ **Switch** - Toggle switch
- ✅ **DatePicker** - Date input
- ✅ **InputOTP** - OTP code input
- ✅ **Field / Label** - Form field wrappers

#### Data Display
- ✅ **Table** - Table components (TableHead, TableCell, etc.)
- ✅ **Avatar** - User avatar with fallback
- ✅ **DescriptionList** - Key-value pairs
- ✅ **Breadcrumbs** - Navigation breadcrumbs
- ✅ **Tabs** - Radix UI tabs wrapper

#### Overlays
- ✅ **Dialog** - Modal dialog
- ✅ **AlertDialog** - Confirmation dialog
- ✅ **ConfirmDialog** - Delete confirmation
- ✅ **DropdownMenu** - Context menu
- ✅ **Popover** - Floating content

#### Feedback
- ✅ **AlertToaster** - Toast notifications
- ✅ **LoadingFallback** - Loading states
- ✅ **ErrorFallback** - Error states

#### Utilities
- ✅ **Separator** - Visual divider
- ✅ **Command** - Command palette

---

## 📐 STANDARD PAGE PATTERNS

### Pattern 1: Simple Page (like HomeRootPage)

```typescript
import * as React from "react";
import { IconExample } from "@tabler/icons-react";
import { useAuth } from "@src/lib/auth";
import { View } from "@src/ui/view";

export function PageName() {
  const { user } = useAuth();

  return (
    <View>
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        {/* Content */}
      </div>
    </View>
  );
}
```

**Key Points:**
- ✅ Named export `export function`
- ✅ Import `* as React` (JSX compatibility)
- ✅ Wrap in `<View>` for card styling
- ✅ Use `useAuth()` for user data

### Pattern 2: Data Page (like UserRootPage)

```typescript
import React from "react";
import { IconPlus, IconFilter } from "@tabler/icons-react";
import { Header, Title } from "@src/ui/page";
import { View } from "@src/ui/view";
import { Button, ButtonLink } from "@src/ui/button";
import { LoadingFallback } from "@src/components/fallbacks";
import { useRecord } from "@src/hooks/use-record";

export function PageName() {
  const { data } = useRecord({
    queryKey: ['key'],
    queryFn: fetchFunction,
  });

  if (!data) {
    return <LoadingFallback />;
  }

  return (
    <>
      <Header>
        <Title>Page Title</Title>
        <ButtonLink to="./new">
          <IconPlus /> Add Item
        </ButtonLink>
      </Header>
      <View>
        {/* Content */}
      </View>
    </>
  );
}
```

**Key Points:**
- ✅ `<Header>` + `<Title>` for page header
- ✅ Buttons in header for actions
- ✅ `<View>` for main content
- ✅ `<LoadingFallback>` for loading state
- ✅ TanStack Query for data fetching

---

## 🧭 NAVIGATION STRUCTURE

### Main Layout (Desktop)

```
┌──────────────────────────────────────┐
│  Header (User menu, notifications)   │
├─────────┬────────────────────────────┤
│ Sidebar │  Main Content              │
│         │  ┌──────────────────────┐  │
│ • Home  │  │ <Header>             │  │
│ • Users │  │   <Title>            │  │
│ • ...   │  │   <Button>           │  │
│         │  │ </Header>            │  │
│         │  │                      │  │
│         │  │ <View>               │  │
│         │  │   Content here       │  │
│         │  │ </View>              │  │
│         │  └──────────────────────┘  │
└─────────┴────────────────────────────┘
```

### Main Layout (Mobile)

```
┌──────────────────────────────────────┐
│  Navbar (Hamburger menu)             │
├──────────────────────────────────────┤
│  Main Content                        │
│  ┌────────────────────────────────┐  │
│  │ <Header>                       │  │
│  │   <Title>                      │  │
│  │ </Header>                      │  │
│  │                                │  │
│  │ <View>                         │  │
│  │   Content here                 │  │
│  │ </View>                        │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
```

**Key Points:**
- ✅ Sidebar hidden on mobile (< 768px)
- ✅ Hamburger menu (Navbar) on mobile
- ✅ MainLayout handles responsive behavior
- ✅ Content has padding: `md:ml-61` (sidebar width)

---

## 🔑 KEY PATTERNS TO FOLLOW

### 1. Imports Order
```typescript
// 1. React & external libs
import * as React from "react";
import { IconExample } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

// 2. Internal components (alphabetical)
import { ComponentA } from "@src/app/module/components";
import { ComponentB } from "@src/components/shared";

// 3. UI library
import { Button } from "@src/ui/button";
import { View } from "@src/ui/view";

// 4. Hooks & utils
import { useAuth } from "@src/lib/auth";
import { cn } from "@src/lib/styling";
```

### 2. Component Export
```typescript
// ✅ CORRECT - Named export
export function ComponentName() { }

// ❌ WRONG - Default export
export default function ComponentName() { }
```

### 3. Styling with cn()
```typescript
import { cn } from "@src/lib/styling";

<div className={cn(
  "base-classes",
  condition && "conditional-classes",
  className, // Allow prop override
)} />
```

### 4. Loading States
```typescript
import { LoadingFallback } from "@src/components/fallbacks";

if (isLoading) {
  return <LoadingFallback />;
}
```

### 5. Error States
```typescript
import { ErrorFallback } from "@src/components/fallbacks";

if (error) {
  return <ErrorFallback error={error} />;
}
```

---

## 🎯 COMPETENCY MODULE REQUIREMENTS

### What Needs to Change

#### 1. **Bottom Navigation (Mobile)**
**Current Issue:** Sidebar doesn't work for mobile app
**Solution:** Create custom `BottomNav` component for mobile

**Approach:**
```typescript
// resources/app/competency/components/BottomNavLeader.tsx
// Keep as-is, it's a custom component for mobile navigation
// This is OK because competency module is mobile-first
```

#### 2. **Pages Structure**
**Must Change:**
- ✅ Use `<Header>` and `<Title>` from `@src/ui/page`
- ✅ Wrap content in `<View>` from `@src/ui/view`
- ✅ Use `<LoadingFallback>` for loading states
- ✅ Change to named exports

#### 3. **Tabs Usage**
**Must Use:** `@src/ui/tabs` components
```typescript
import { Tabs, TabsList, Tab, TabsContent } from "@src/ui/tabs";

<Tabs defaultValue="assessment">
  <TabsList>
    <Tab value="assessment">Hasil Assessment</Tab>
    <Tab value="history">Riwayat Kerja</Tab>
  </TabsList>
  <TabsContent value="assessment">
    {/* Content */}
  </TabsContent>
</Tabs>
```

#### 4. **Navigation Integration**
**Must Add:** Entry in `site-navigation.js`

```javascript
// resources/constants/site-navigation.js
const MENU_COMPETENCY = "competency";

const SHARED_MENUS = {
  // ... existing menus
  [MENU_COMPETENCY]: {
    name: "Kompetensi",
    pathname: "/leader/home",
    icon: IconChartBar, // or appropriate icon
    allow: [EMPLOYEE_TYPE_INHOUSE, EMPLOYEE_TYPE_OUTSOURCED],
  },
};
```

---

## 🚫 WHAT'S NOT NEEDED (Base Project Specific)

### These are for the original client (can ignore/remove):

1. **Financing Module** - Not relevant for Kimia Farma
2. **Help Desk** - Not needed
3. **Bijpedia** - BIJ specific
4. **General Affair** - Different domain
5. **Admin/Supervisor roles** - Simplify to Leaders/Karyawan

### Can Keep:
- ✅ User management (adapt for Kimia Farma users)
- ✅ Password complexity
- ✅ Audit trail
- ✅ Profile management

---

## 📝 REFACTORING CHECKLIST

### Phase 1: Update Exports
- [ ] Change `LeaderHome` to named export
- [ ] Change `LeaderTeam` to named export
- [ ] Change `EmployeeDetail` to named export
- [ ] Change `DemoLanding` to named export
- [ ] Update imports in `user.router.tsx`

### Phase 2: Refactor LeaderHome
- [ ] Import `Header`, `Title` from `@src/ui/page`
- [ ] Import `View` from `@src/ui/view`
- [ ] Import `LoadingFallback` from `@src/components/fallbacks`
- [ ] Restructure JSX to match pattern
- [ ] Keep `BottomNavLeader` (mobile-specific)

### Phase 3: Refactor LeaderTeam
- [ ] Same as LeaderHome
- [ ] Consider using standard search/filter if available

### Phase 4: Refactor EmployeeDetail
- [ ] Use `Tabs`, `TabsList`, `Tab`, `TabsContent` from `@src/ui/tabs`
- [ ] Add breadcrumbs with `Breadcrumbs` from `@src/ui/breadcrumbs`
- [ ] Use `Header` and `Title`
- [ ] Wrap content in `View`

### Phase 5: Add Navigation Entry
- [ ] Update `site-navigation.js`
- [ ] Add icon import
- [ ] Add menu constant
- [ ] Add to SHARED_MENUS
- [ ] Add to appropriate navigation arrays

### Phase 6: Testing
- [ ] `npm run build` - No errors
- [ ] Routes work correctly
- [ ] Navigation shows in sidebar (desktop)
- [ ] Bottom nav works (mobile)
- [ ] All tabs functional
- [ ] Loading states work
- [ ] Styling matches

---

## 🎨 MOBILE-FIRST CONSIDERATIONS

### This is Mobile App, Not Desktop

**Key Differences:**
1. **Bottom Navigation** instead of Sidebar
2. **Full-screen pages** without sidebar margin
3. **Touch-optimized** interactions
4. **Mobile-first** responsive design

**Solution:**
- Keep `BottomNavLeader` as custom component
- Optionally hide sidebar for competency routes
- Consider full-screen mode for mobile

**Potential Approach:**
```typescript
// In EmployeeDetail or other pages
const isMobile = useWindowDimensions().width < SCREEN_SIZE_MEDIUM;

return (
  <div className={cn(
    isMobile && "fixed inset-0 z-50 bg-white"  // Full screen on mobile
  )}>
    {/* Content */}
  </div>
);
```

---

## 🔧 UTILITY FUNCTIONS AVAILABLE

### From @src/lib/*

```typescript
// Styling utility
import { cn } from "@src/lib/styling";
cn("class1", condition && "class2", "class3")

// Auth hook
import { useAuth } from "@src/lib/auth";
const { user, login, logout } = useAuth();

// Document title
import { useDocumentTitle } from "@src/hooks/use-document-title";
useDocumentTitle("Page Title");

// Window dimensions
import { useWindowDimensions } from "@src/hooks/use-window-dimensions";
const { width, height } = useWindowDimensions();

// Record management (data tables)
import { useRecord } from "@src/hooks/use-record";
const { data, pagination } = useRecord({ queryKey, queryFn });
```

---

## 📚 LEARNING FROM EXISTING CODE

### Good Examples to Study:

1. **HomeRootPage** (`resources/app/home/pages/root.tsx`)
   - Simple page with View wrapper
   - useAuth usage
   - Time/date display
   - Clean structure

2. **UserRootPage** (`resources/app/user/main/pages/root.tsx`)
   - Data page with Header/Title
   - Table with columns
   - Filter and search
   - Action menu
   - Loading states

3. **MainLayout** (`resources/components/main-layout/main-layout.jsx`)
   - App shell structure
   - Error boundaries
   - Toast notifications
   - Responsive behavior

---

## ✅ SUMMARY

### Base Project Strengths:
- ✅ Well-organized UI component library
- ✅ Consistent patterns across modules
- ✅ Good TypeScript usage
- ✅ Proper error/loading states
- ✅ Responsive design built-in

### Our Adaptations Needed:
- ✅ Follow existing patterns for pages
- ✅ Use standard UI components
- ✅ Keep custom mobile navigation (BottomNav)
- ✅ Adapt layout for mobile-first
- ✅ Clean up BIJ-specific references

### Next Steps:
1. Read this doc thoroughly
2. Study the example files mentioned
3. Refactor our pages to match patterns
4. Test thoroughly
5. Document any new patterns we create

---

**Document Version:** 1.0
**Date:** 2025-11-04
**Status:** 📚 **EDUCATIONAL REFERENCE**
**Next:** Apply learnings to refactor
