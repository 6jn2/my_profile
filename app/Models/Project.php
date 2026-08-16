<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    protected $fillable = [
        'title', 'slug', 'short_description', 'description',
        'challenge', 'solution', 'results', 'features',
        'technologies', 'category', 'github_url', 'demo_url',
        'cover_image', 'featured', 'status', 'sort_order',
    ];

    protected $casts = [
        'features'     => 'array',
        'technologies' => 'array',
        'featured'     => 'boolean',
    ];

    public function media(): HasMany
    {
        return $this->hasMany(ProjectMedia::class)->orderBy('sort_order');
    }

    public function images(): HasMany
    {
        return $this->hasMany(ProjectMedia::class)->where('type', 'image')->orderBy('sort_order');
    }

    public function videos(): HasMany
    {
        return $this->hasMany(ProjectMedia::class)->where('type', 'video')->orderBy('sort_order');
    }

    public function coverMedia()
    {
        return $this->hasOne(ProjectMedia::class)->where('is_cover', true);
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    public function scopeFeatured($query)
    {
        return $query->where('featured', true);
    }
}
