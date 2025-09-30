# KAEF HRIS Coding Standards

## ⚠️ CRITICAL RULES - MUST NEVER BE VIOLATED

### 1. CODE LANGUAGE: **ENGLISH ONLY**

**RULE:** All code including variables, functions, classes, interfaces, types MUST be in English.

**❌ NEVER DO THIS:**

```typescript
// WRONG - Indonesian variable names
const nama_lengkap = employee.nama_lengkap;
const tanggal_lahir = data.tanggal_lahir;
const status_kepegawaian = employee.status_kepegawaian;

interface Employee {
  nama_lengkap: string; // ❌ WRONG
  divisi_id: number; // ❌ WRONG
}
```

**✅ ALWAYS DO THIS:**

```typescript
// CORRECT - English variable names
const fullName = employee.full_name;
const birthDate = data.birth_date;
const employmentStatus = employee.employment_status;

interface Employee {
  full_name: string; // ✅ CORRECT
  division_id: number; // ✅ CORRECT
}
```

### 2. USER-FACING TEXT: **INDONESIAN**

**RULE:** Only user-visible text (labels, messages, buttons) should be in Indonesian.

**✅ CORRECT:**

```typescript
// Code in English, labels in Indonesian
<Label htmlFor="full_name">Nama Lengkap</Label>
<Button>Tambah Karyawan</Button>
<p>Data karyawan berhasil disimpan</p>

const errorMessages = {
  required: "Field ini wajib diisi",
  invalid_email: "Format email tidak valid"
};
```

### 3. DATABASE COLUMNS: **ENGLISH (snake_case)**

**✅ CORRECT:**

```sql
-- Use English column names
CREATE TABLE employees (
  full_name VARCHAR,      -- ✅ CORRECT
  birth_date DATE,        -- ✅ CORRECT
  employment_status ENUM  -- ✅ CORRECT
);
```

**❌ NEVER:**

```sql
-- Don't use Indonesian
CREATE TABLE employees (
  nama_lengkap VARCHAR,      -- ❌ WRONG
  tanggal_lahir DATE,        -- ❌ WRONG
  status_kepegawaian ENUM    -- ❌ WRONG
);
```

## Current Technical Debt

### Story 1.1 & 1.2 (Backend)

- **Status:** Already implemented with Indonesian field names
- **Action:** Document for future refactor (Story 1.4+)
- **Note:** Do NOT fix now to avoid breaking changes

### Story 1.3 (Frontend)

- **Status:** Implemented with Indonesian field names (matching backend)
- **Action:** Keep as-is for now (matches Story 1.2 API)
- **Future:** Refactor when backend is refactored

### Going Forward (Story 1.4+)

- **All new code:** MUST use English variable names
- **All new APIs:** MUST use English field names
- **Migration plan:** Schedule refactor for Stories 1.1, 1.2, 1.3

## Enforcement Checklist

Before committing any code, verify:

- [ ] All variable names in English?
- [ ] All function names in English?
- [ ] All interface/type properties in English?
- [ ] All class names in English?
- [ ] User-facing text in Indonesian?
- [ ] No Indonesian in code comments (except explaining Indonesian terms)?

## Examples Reference

### API Response Types

```typescript
// ✅ CORRECT
interface ApiResponse<T> {
  status: "success" | "error";
  message: string; // Can contain Indonesian text
  data: T;
}

interface Employee {
  id: number;
  employee_number: string;
  full_name: string;
  email: string;
  employment_status: EmploymentStatus;
  division_id: number;
}
```

### React Components

```typescript
// ✅ CORRECT
export function EmployeeForm({ employee, onSubmit }: EmployeeFormProps) {
  const fullName = watch('full_name');
  const birthDate = watch('birth_date');

  return (
    <div>
      <Label>Nama Lengkap</Label>
      <Input name="full_name" />

      <Label>Tanggal Lahir</Label>
      <Input type="date" name="birth_date" />
    </div>
  );
}
```

### Validation Messages

```typescript
// ✅ CORRECT - Code in English, messages in Indonesian
const schema = z.object({
  full_name: z.string().min(1, "Nama lengkap wajib diisi"),
  email: z.string().email("Format email tidak valid"),
  birth_date: z.string().min(1, "Tanggal lahir wajib diisi"),
});
```

## Violation Consequences

If Indonesian variable names are found in new code:

1. ⚠️ First time: Warning + immediate fix required
2. ⛔ Second time: Code review fails, must refactor before merge
3. 🚫 Third time: Pull request rejected

## Last Updated

**Date:** 2025-09-30
**By:** Claude Code
**Reason:** Multiple violations found in Story 1.3 implementation

---

**REMEMBER:** Code is international, users are Indonesian. Code = English, UI = Indonesian.
