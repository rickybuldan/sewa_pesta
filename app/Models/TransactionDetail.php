<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class TransactionDetail extends Model
{
    use HasFactory;
    // protected $table = "pengadaan";
    protected $fillable = ['id_product','id_transaction','day','sub_total','good_condition'];

}


