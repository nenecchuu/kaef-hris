<?php

namespace App\Http\Requests\Employee;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * Update Employee Request
 *
 * Validates employee updates with Indonesian error messages
 */
class UpdateEmployeeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Authorization handled by middleware
    }

    public function rules(): array
    {
        $employeeId = $this->route('employee');

        return [
            // Personal Information
            'employee_number' => [
                'sometimes',
                'string',
                'max:50',
                Rule::unique('employees', 'employee_number')->ignore($employeeId, 'employee_id')
            ],
            'full_name' => 'sometimes|string|max:255',
            'preferred_name' => 'nullable|string|max:100',
            'birth_date' => 'sometimes|date|before:today',
            'national_id' => [
                'nullable',
                'string',
                'size:16',
                'regex:/^[0-9]{16}$/',
                Rule::unique('employees', 'national_id')->ignore($employeeId, 'employee_id')
            ],
            'tax_id' => [
                'nullable',
                'string',
                'max:20',
                'regex:/^[0-9]{2}\.[0-9]{3}\.[0-9]{3}\.[0-9]{1}-[0-9]{3}\.[0-9]{3}$/',
                Rule::unique('employees', 'tax_id')->ignore($employeeId, 'employee_id')
            ],

            // Contact Information
            'email' => [
                'sometimes',
                'email',
                'max:255',
                Rule::unique('employees', 'email')->ignore($employeeId, 'employee_id')
            ],
            'phone' => 'sometimes|string|max:20|regex:/^(\+62|0)[0-9]{8,13}$/',
            'emergency_contact_name' => 'sometimes|string|max:255',
            'emergency_contact_phone' => 'sometimes|string|max:20|regex:/^(\+62|0)[0-9]{8,13}$/',
            'address' => 'sometimes|string|max:500',

            // Employment Information
            'employment_status' => ['sometimes', Rule::in(['active', 'inactive', 'terminated', 'on_leave', 'probation', 'suspended'])],
            'employment_type' => ['sometimes', Rule::in(['permanent', 'contract', 'intern', 'consultant'])],
            'hire_date' => 'sometimes|date|before_or_equal:today',
            'termination_date' => 'nullable|date|after:hire_date',
            'photo_url' => 'nullable|string|max:500',

            // Organizational
            'division_id' => 'sometimes|integer|exists:divisions,id',
            'job_position_id' => 'sometimes|integer|exists:job_positions,id',
            'manager_id' => 'nullable|string|exists:employees,employee_id',
            'user_id' => [
                'nullable',
                'integer',
                'exists:users,id',
                Rule::unique('employees', 'user_id')->ignore($employeeId, 'employee_id')
            ],

            // Child records (optional)
            'education_history' => 'nullable|array',
            'education_history.*.institution_name' => 'required_with:education_history|string|max:255',
            'education_history.*.degree_level' => ['required_with:education_history', Rule::in(['SD', 'SMP', 'SMA', 'D1', 'D2', 'D3', 'D4', 'S1', 'S2', 'S3'])],
            'education_history.*.field_of_study' => 'required_with:education_history|string|max:255',
            'education_history.*.graduation_year' => 'required_with:education_history|integer|min:1980|max:' . date('Y'),
            'education_history.*.gpa' => 'nullable|numeric|min:0|max:4',
            'education_history.*.is_verified' => 'nullable|boolean',

            'certifications' => 'nullable|array',
            'certifications.*.certification_name' => 'required_with:certifications|string|max:255',
            'certifications.*.issuing_organization' => 'required_with:certifications|string|max:255',
            'certifications.*.issue_date' => 'required_with:certifications|date',
            'certifications.*.expiry_date' => 'nullable|date|after:certifications.*.issue_date',
            'certifications.*.certification_number' => 'nullable|string|max:100',
            'certifications.*.is_active' => 'nullable|boolean',

            'professional_licenses' => 'nullable|array',
            'professional_licenses.*.license_name' => 'required_with:professional_licenses|string|max:255',
            'professional_licenses.*.license_number' => 'required_with:professional_licenses|string|max:100',
            'professional_licenses.*.issuing_authority' => 'required_with:professional_licenses|string|max:255',
            'professional_licenses.*.issue_date' => 'required_with:professional_licenses|date',
            'professional_licenses.*.expiry_date' => 'nullable|date|after:professional_licenses.*.issue_date',
            'professional_licenses.*.license_status' => ['nullable', Rule::in(['active', 'expired', 'suspended', 'revoked'])],
        ];
    }

    public function messages(): array
    {
        return [
            // Personal Information
            'employee_number.unique' => 'Nomor karyawan sudah digunakan.',
            'full_name.max' => 'Nama lengkap maksimal 255 karakter.',
            'birth_date.date' => 'Tanggal lahir harus berupa tanggal yang valid.',
            'birth_date.before' => 'Tanggal lahir harus sebelum hari ini.',
            'national_id.size' => 'NIK harus terdiri dari 16 digit.',
            'national_id.unique' => 'NIK sudah terdaftar.',
            'national_id.regex' => 'Format NIK tidak valid, harus 16 digit angka.',
            'tax_id.unique' => 'NPWP sudah terdaftar.',
            'tax_id.regex' => 'Format NPWP tidak valid (contoh: 12.345.678.9-123.456).',

            // Contact Information
            'email.email' => 'Format email tidak valid.',
            'email.unique' => 'Email sudah terdaftar.',
            'phone.regex' => 'Format nomor telepon tidak valid (gunakan format Indonesia).',
            'emergency_contact_phone.regex' => 'Format nomor kontak darurat tidak valid.',
            'address.max' => 'Alamat maksimal 500 karakter.',

            // Employment Information
            'employment_status.in' => 'Status kepegawaian tidak valid.',
            'employment_type.in' => 'Tipe kepegawaian tidak valid.',
            'hire_date.date' => 'Tanggal masuk kerja harus berupa tanggal yang valid.',
            'hire_date.before_or_equal' => 'Tanggal masuk kerja tidak boleh di masa depan.',
            'termination_date.after' => 'Tanggal terminasi harus setelah tanggal masuk kerja.',

            // Organizational
            'division_id.exists' => 'Divisi yang dipilih tidak valid.',
            'job_position_id.exists' => 'Jabatan yang dipilih tidak valid.',
            'manager_id.exists' => 'Manajer yang dipilih tidak valid.',
            'user_id.exists' => 'User yang dipilih tidak valid.',
            'user_id.unique' => 'User sudah terkait dengan karyawan lain.',

            // Education
            'education_history.*.institution_name.required_with' => 'Nama institusi pendidikan wajib diisi.',
            'education_history.*.degree_level.required_with' => 'Tingkat pendidikan wajib dipilih.',
            'education_history.*.degree_level.in' => 'Tingkat pendidikan tidak valid.',
            'education_history.*.field_of_study.required_with' => 'Bidang studi wajib diisi.',
            'education_history.*.graduation_year.required_with' => 'Tahun lulus wajib diisi.',
            'education_history.*.graduation_year.min' => 'Tahun lulus minimal 1980.',
            'education_history.*.graduation_year.max' => 'Tahun lulus tidak boleh di masa depan.',
            'education_history.*.gpa.numeric' => 'IPK harus berupa angka.',
            'education_history.*.gpa.min' => 'IPK minimal 0.',
            'education_history.*.gpa.max' => 'IPK maksimal 4.',

            // Certifications
            'certifications.*.certification_name.required_with' => 'Nama sertifikat wajib diisi.',
            'certifications.*.issuing_organization.required_with' => 'Organisasi penerbit wajib diisi.',
            'certifications.*.issue_date.required_with' => 'Tanggal terbit wajib diisi.',
            'certifications.*.expiry_date.after' => 'Tanggal kadaluarsa harus setelah tanggal terbit.',

            // Professional Licenses
            'professional_licenses.*.license_name.required_with' => 'Nama lisensi wajib diisi.',
            'professional_licenses.*.license_number.required_with' => 'Nomor lisensi wajib diisi.',
            'professional_licenses.*.issuing_authority.required_with' => 'Otoritas penerbit wajib diisi.',
            'professional_licenses.*.issue_date.required_with' => 'Tanggal terbit wajib diisi.',
            'professional_licenses.*.expiry_date.after' => 'Tanggal kadaluarsa harus setelah tanggal terbit.',
            'professional_licenses.*.license_status.in' => 'Status lisensi tidak valid.',
        ];
    }

    public function attributes(): array
    {
        return [
            'employee_number' => 'nomor karyawan',
            'full_name' => 'nama lengkap',
            'preferred_name' => 'nama panggilan',
            'birth_date' => 'tanggal lahir',
            'national_id' => 'NIK',
            'tax_id' => 'NPWP',
            'email' => 'email',
            'phone' => 'nomor telepon',
            'emergency_contact_name' => 'nama kontak darurat',
            'emergency_contact_phone' => 'nomor kontak darurat',
            'address' => 'alamat',
            'employment_status' => 'status kepegawaian',
            'employment_type' => 'tipe kepegawaian',
            'hire_date' => 'tanggal masuk kerja',
            'termination_date' => 'tanggal terminasi',
            'division_id' => 'divisi',
            'job_position_id' => 'jabatan',
            'manager_id' => 'manajer',
            'user_id' => 'user sistem',
        ];
    }
}