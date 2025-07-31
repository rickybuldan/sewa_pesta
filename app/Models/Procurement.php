<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Procurement extends Model
{
    use HasFactory;
    // protected $table = "pengadaan";
    protected $fillable = [
        'no_transaction',
        'supplier_name',
        'supplier_phone',
        'created_by',
        'updated_by',
        'price_total',
        'status'
    ];


    public static function generateNoTransaction($paramDate)
    {
        $prefix = 'TP';
        $paramx = Carbon::createFromFormat('Y-m-d H:i:s', $paramDate)->format('dmY');
        $date = $paramx;

        $lastBooking = Procurement::selectRaw("*, DATE_FORMAT(created_at, '%d%m%Y') AS formatted_booking_date")
            ->whereRaw("DATE_FORMAT(created_at, '%d%m%Y') = ?", [Carbon::parse($paramDate)->format('dmY')])
            ->orderBy('no_transaction', 'desc')
            ->first();

        if ($lastBooking) {
            $lastNumber = explode('/', $lastBooking->no_transaction);
            $lastSerial = (int) end($lastNumber);
            $newSerial = $lastSerial + 1;

        } else {
            $newSerial = 1;
        }

        $no_transaction = $prefix . '/' . $date . '/' . str_pad($newSerial, 5, '0', STR_PAD_LEFT);

        return $no_transaction;
    }

}


