<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
    use HasFactory;

    protected $fillable = [
        'member_id', 'course_id', 'registration_date', 
        'rate'
    ];

    public function member() {
        return $this->belongsTo(Member::class);
    }
    public function course() {
        return $this->belongsTo(Course::class);
    }
}
