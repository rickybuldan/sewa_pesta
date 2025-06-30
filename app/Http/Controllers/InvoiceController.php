<?php

namespace App\Http\Controllers;

use App\Helpers\Master;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InvoiceController extends Controller
{

    public function invoice(Request $request)
    {
        $MasterClass = new Master();
        try {
            if ($request->isMethod('post')) {
             
                $noinvoice = $request->get('noinvoice');
                if(empty($noinvoice)){
                    $results = [
                        'code' => 1,
                        'info' => 'Data TIdak Ditemukan',
                        'data' => null,
                    ];
                    return $MasterClass->Results($results);
                }
                DB::beginTransaction();


                $status = [];
                $sql = " 
                        SELECT
                            t.*,
                            COALESCE(d.denda, 0) AS denda
                        FROM transactions t
                        LEFT JOIN (
                            SELECT
                                td.id_transaction,
                                SUM(
                                    CASE 
                                        WHEN td.good_condition = 0 THEN
                                            CASE 
                                                WHEN mc.type = 1 THEN (td.sub_total + mc.value)
                                                WHEN mc.type = 2 THEN (td.sub_total + (td.sub_total * mc.value / 100))
                                                ELSE 0
                                            END
                                        ELSE 0
                                    END
                                ) AS denda
                            FROM transaction_details td
                            LEFT JOIN master_constants mc ON mc.is_active = 1
                            GROUP BY td.id_transaction
                        ) d ON d.id_transaction = t.id
                        
                        WHERE t.no_transaction ='" . $noinvoice . "'";
                // dd($sql);
                $saved = DB::select($sql);
             
                $saved = $MasterClass->checkErrorModel($saved);
               
                $status = $saved;

                $results = [
                    'code' => $status['code'],
                    'info' => $status['info'],
                    'data' => $status['data'],
                ];

                return $MasterClass->Results($results);

            } else {
                $noinvoice = $request->query('noinvoice');
                // dd($noinvoice);
                $javascriptFiles = [
                    asset('action-js/global/global-action.js'),
                    asset('action-js/invoice/invoice-action.js'),
                ];

                $cssFiles = [
                    // asset('css/main.css'),
                    // asset('css/custom.css'),
                ];
                $baseURL = url('/');
                $varJs = [
                    'const baseURL = "' . $baseURL . '"',
                    'const no_invoice = "' . $noinvoice . '"',
                ];

                $data = [
                    'javascriptFiles' => $javascriptFiles,
                    'cssFiles' => $cssFiles,
                    'varJs' => $varJs,
                    'title' => "Invoice",
                    'subtitle' => "Detail Invoice",
                ];

                return view('pages.admin.invoice.invoice')
                    ->with($data);
            }
        } catch (\Exception $e) {

            $results = [
                'code' => '102',
                'info' => $e->getMessage(),
            ];

        }




    }

}
