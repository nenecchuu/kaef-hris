<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * EmployeeEducationHistory Model
 *
 * Tracks educational background and academic achievements
 * of employees for professional development planning.
 */
class EmployeeEducationHistory extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     */
    protected $table = 'employee_education_history';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'employee_id',
        'institution_name',
        'degree_level',
        'field_of_study',
        'graduation_year',
        'gpa',
        'is_verified',
        'location',
    ];

    /**
     * The attributes that should be cast to native types.
     */
    protected $casts = [
        'graduation_year' => 'integer',
        'gpa' => 'decimal:2',
        'is_verified' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Available degree levels.
     */
    public const DEGREE_LEVELS = [
        'elementary' => 'Elementary School',
        'junior_high' => 'Junior High School',
        'senior_high' => 'Senior High School',
        'diploma_1' => 'Diploma I (D1)',
        'diploma_2' => 'Diploma II (D2)',
        'diploma_3' => 'Diploma III (D3)',
        'diploma_4' => 'Diploma IV (D4)',
        'bachelor' => 'Bachelor\'s Degree (S1)',
        'master' => 'Master\'s Degree (S2)',
        'doctoral' => 'Doctoral Degree (S3)',
    ];

    /**
     * Get the employee that owns the education record.
     */
    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }

    /**
     * Get the human-readable degree level.
     */
    public function getDegreeLevelNameAttribute(): string
    {
        return self::DEGREE_LEVELS[$this->degree_level] ?? $this->degree_level;
    }

    /**
     * Scope a query to only include verified education records.
     */
    public function scopeVerified($query)
    {
        return $query->where('is_verified', true);
    }

    /**
     * Scope a query to only include unverified education records.
     */
    public function scopeUnverified($query)
    {
        return $query->where('is_verified', false);
    }

    /**
     * Scope a query to include education by degree level.
     */
    public function scopeByDegreeLevel($query, $degreeLevel)
    {
        return $query->where('degree_level', $degreeLevel);
    }

    /**
     * Get the highest degree level rank for comparison.
     */
    public function getDegreeLevelRankAttribute(): int
    {
        $rankings = [
            'elementary' => 1,
            'junior_high' => 2,
            'senior_high' => 3,
            'diploma_1' => 4,
            'diploma_2' => 5,
            'diploma_3' => 6,
            'diploma_4' => 7,
            'bachelor' => 8,
            'master' => 9,
            'doctoral' => 10,
        ];

        return $rankings[$this->degree_level] ?? 0;
    }

    /**
     * Check if the education record is a higher education level.
     */
    public function isHigherEducation(): bool
    {
        return in_array($this->degree_level, [
            'diploma_3', 'diploma_4', 'bachelor', 'master', 'doctoral'
        ]);
    }

    /**
     * Format GPA for display.
     */
    public function getFormattedGpaAttribute(): ?string
    {
        if (is_null($this->gpa)) {
            return null;
        }

        return number_format($this->gpa, 2);
    }
}