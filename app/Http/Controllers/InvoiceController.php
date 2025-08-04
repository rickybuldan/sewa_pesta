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
                            COALESCE(d.denda, 0) AS denda,
                            COALESCE(d.denda_telat, 0) AS denda_telat
                        FROM transactions t
                        LEFT JOIN (
                            SELECT
                                td.id_transaction,
                                SUM(
                                    CASE 
                                        WHEN td.late > 1 AND td.late IS NOT NULL AND mc.value is not null AND mc.value != 0 THEN
                                            CASE 
                                                WHEN mc.type = 1 THEN (td.sub_total + mc.value)
                                                WHEN mc.type = 2 THEN (td.sub_total * mc.value / 100) * td.late
                                                ELSE 0
                                            END
                                        ELSE 0
                                    END
                                ) AS denda_telat,
                                SUM(
                                    CASE 
                                        WHEN td.penalty > 0 THEN
                                            td.penalty
                                        ELSE 0
                                    END
                                ) AS denda
                            FROM transaction_details td
                            LEFT JOIN master_constants mc ON mc.is_active = 1
                            GROUP BY td.id_transaction
                        ) d ON d.id_transaction = t.id
                        
                        WHERE t.no_transaction ='" . $noinvoice . "'";
             
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
    
    public function invoice_procurement(Request $request)
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
                            td.*,
                            t.supplier_name,
                            t.supplier_phone,
                            t.no_transaction,
                            u.unit_name,
                            p.product_name,
                            p.price,
                            us1.name as submitted_by,
                            us2.name as approver,
                            u.unit_name
                        FROM procurements t
                        
                        LEFT JOIN procurement_details td ON td.id_procurement = t.id
                        left join products p ON p.id=td.id_product 
                        LEFT JOIN units u ON u.id = p.id_unit 
                        LEFT JOIN users us1 ON us1.id = t.created_by
                        LEFT JOIN users us2 ON us2.id = t.updated_by
                        
                        WHERE t.no_transaction ='" . $noinvoice . "'";
             
                
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
                    asset('action-js/invoice/invoice-procurement-action.js'),
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

                return view('pages.admin.invoice.invoice_procurement')
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
