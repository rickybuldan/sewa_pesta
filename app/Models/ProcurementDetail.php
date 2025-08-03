<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class ProcurementDetail extends Model
{
    use HasFactory;
    // protected $table = "pengadaan";
    protected $fillable = ['id_product','id_procurement','sub_total','item','accept_item'];

}


