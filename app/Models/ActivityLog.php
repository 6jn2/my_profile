<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ActivityLog extends Model
{
    protected $fillable = ['user_id', 'action', 'model_type', 'model_id', 'model_title', 'description', 'ip_address'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public static function record(string $action, string $description = '', ?Model $model = null): void
    {
        static::create([
            'user_id'     => auth()->id(),
            'action'      => $action,
            'model_type'  => $model ? class_basename($model) : null,
            'model_id'    => $model?->id,
            'model_title' => $model ? ($model->title ?? $model->name ?? null) : null,
            'description' => $description,
            'ip_address'  => request()->ip(),
        ]);
    }
}
