<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = ['title', 'description', 'icon', 'number', 'is_featured', 'sort_order', 'is_active'];

    protected $casts = ['is_featured' => 'boolean', 'is_active' => 'boolean'];

    public function scopeActive($query) { return $query->where('is_active', true); }
}
