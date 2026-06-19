<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class AdminUser extends Authenticatable
{
    protected $table = 'admin_users';

    protected $fillable = ['login', 'password'];

    protected $hidden = ['password', 'remember_token'];

    public function getAuthIdentifierName(): string
    {
        return 'login';
    }
}
