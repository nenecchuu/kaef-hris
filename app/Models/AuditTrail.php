<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use JsonException;

class AuditTrail extends Model
{
    use HasFactory, SoftDeletes;

    public $table = 'audit_trails';

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected $casts = [
        'changes' => 'array',
    ];

    protected $fillable = [
        'action',
        'domain',
        'affected_row_id',
        'affected_row_name',
        'performed_by_id',
        'performed_by_name',
        'changes',
        'description',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    public function getFormattedDescriptionAttribute()
    {
        if (isset($this->description) && $this->description && $this->description != '') {
            return $this->description;
        }

        $key = $this->domain.'.'.$this->action;

        $template = config("audit_trail.description.$key", '');

        if (! $template) {
            return 'Unknown action';
        }

        return $this->replacePlaceholders($template);
    }

    public function getFormattedCreatedAtAttribute()
    {
        return Carbon::parse($this->created_at)->locale('id')->translatedFormat('d F Y H:i:s') ?? '';
    }

    private function replacePlaceholders(string $template): string
    {
        $changes = $this->safe_json_decode_array($this->getAttribute('changes'));
        $attributeChanges = "";
        if ($changes && is_array($changes) && !empty($changes)) {
            foreach ($changes as $key => $value) {
                if(is_array($value)) {
                    $value['old'] = (isset($value['old']) && (!is_string($value['old']) || trim($value['old']) !== '')) ? $value['old'] : '-';
                    $value['new'] = (isset($value['new']) && (!is_string($value['new']) || trim($value['new']) !== '')) ? $value['new'] : '-';
                    $attributeChanges .= "\"$key\": {$value['old']} → {$value['new']}, ";
                }
            }
        }

        $placeholders = [
            '{performedByName}' => $this->performed_by_name,
            '{affectedRowName}' => $this->affected_row_name,
            '{attributeChanges}' => rtrim($attributeChanges, ', '),
        ];

        return str_replace(array_keys($placeholders), array_values($placeholders), $template);
    }


    /**
     * Decode JSON aman → selalu array (assoc).
     * null / '' / invalid / scalar -> []
     */
    private function safe_json_decode_array($value): array
    {
        if (is_array($value))  return $value;
        if (is_object($value)) return json_decode(json_encode($value), true);
        if ($value === null || $value === '') return [];

        try {
            $decoded = json_decode($value, true, 512, JSON_THROW_ON_ERROR);
            return is_array($decoded) ? $decoded : [];
        } catch (JsonException $e) {
            return [];
        }
    }
}
