<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;
    // protected $table = "obat";
    protected $fillable = ['id_product','id_user','qty','is_checkout'];
}
