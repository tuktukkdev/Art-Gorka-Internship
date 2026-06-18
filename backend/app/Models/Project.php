<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
class Project extends Model
{
    protected $fillable = [
        'title',
        'url',
        'platform',
        'status',
        'description',
    ];

    const PLATFORMS = ['wordpress', 'bitrix', 'custom', 'other'];
    const STATUSES  = ['development', 'production', 'maintenance', 'archived'];

    //Фильтрация проектов по platform и/или status.
    public function scopeFilter(Builder $query, array $filters): Builder
    {
        if (!empty($filters['platform'])) {
            $query->where('platform', $filters['platform']);
        }
 
        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }
 
        return $query;
    }
}
