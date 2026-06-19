<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Project extends Model
{
    protected $fillable = [
        'title',
        'url',
        'image',
        'industry',
        'project_type',
        'platform',
        'status',
        'description',
        'stack',
    ];

    protected $casts = [
        'stack' => 'array',
    ];

    public function scopeFilter(Builder $query, array $filters): Builder
    {
        if (!empty($filters['platform'])) {
            $query->where('platform', $filters['platform']);
        }

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (!empty($filters['industry'])) {
            $industries = is_array($filters['industry'])
                ? $filters['industry']
                : explode(',', $filters['industry']);
            $query->whereIn('industry', $industries);
        }

        if (!empty($filters['project_type'])) {
            $types = is_array($filters['project_type'])
                ? $filters['project_type']
                : explode(',', $filters['project_type']);
            $query->whereIn('project_type', $types);
        }

        return $query;
    }
}