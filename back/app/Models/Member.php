<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    use HasFactory;

    protected $fillable = [
        'username', 'firstname', 'lastname', 'email',
        'photo', 'teacher_id', 'is_activated', 'password'
    ];

    public function registrations() {
        return $this->hasMany(Registration::class);
    }
}
