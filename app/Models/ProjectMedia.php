<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProjectMedia extends Model
{
    protected $fillable = [
        'project_id', 'type', 'url', 'thumbnail',
        'title', 'provider', 'is_cover', 'sort_order',
    ];

    protected $casts = [
        'is_cover' => 'boolean',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function getFullUrlAttribute(): string
    {
        if ($this->provider === 'local' || !$this->provider) {
            return str_starts_with($this->url, 'http') ? $this->url : asset('storage/' . $this->url);
        }
        return $this->url;
    }
}
