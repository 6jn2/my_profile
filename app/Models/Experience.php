<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    protected $fillable = [
        'title', 'organization', 'description', 'type',
        'start_date', 'end_date', 'is_current', 'skills_used', 'sort_order', 'is_active',
    ];

    protected $casts = [
        'is_current'  => 'boolean',
        'is_active'   => 'boolean',
        'skills_used' => 'array',
        'start_date'  => 'date',
        'end_date'    => 'date',
    ];

    public function scopeActive($query) { return $query->where('is_active', true); }
}
