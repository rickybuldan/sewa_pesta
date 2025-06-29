<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Constant extends Model
{
    use HasFactory;
    protected $table = "master_constants";
    protected $fillable = ['constant_name','type','value','is_active'];
}
