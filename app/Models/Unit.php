<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Unit extends Model
{
    use HasFactory;
    // protected $table = "obat";
    protected $fillable = ['unit_name','updated_by','created_by'];
}
