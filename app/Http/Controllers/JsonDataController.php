<?php

namespace App\Http\Controllers;

use App\Models\House;
use App\Models\Package;

use App\Models\Pet;
use App\Models\Product;
use App\Models\Constant;
use App\Models\Transaction;
use App\Models\TransactionDetail;
use App\Models\UserAccess;
use App\Models\UsersRole;
use Illuminate\Http\Request;
use App\Helpers\Master;
use App\Models\User;
use App\Models\MenusAccess;

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Midtrans\Config;
use Midtrans\Snap;

class JsonDataController extends Controller
{
    //

    // for list menu side bar
    public function getAccessMenu(Request $request)
    {

        $MasterClass = new Master();

        $checkAuth = $MasterClass->Authenticated($MasterClass->getSession('user_id'));

        if ($checkAuth['code'] == $MasterClass::CODE_SUCCESS) {
            try {
                if ($request->isMethod('post')) {

                    DB::beginTransaction();

                    $data = json_decode($request->getContent());
                    $status = [];
                    $role_id = $MasterClass->getSession('role_id');
                    $saved = DB::select("SELECT * FROM menus_access ma LEFT JOIN users_access ua ON ma.id = ua.menu_access_id WHERE ua.role_id =" . $role_id . " AND ua.i_view=1");

                    $saved = $MasterClass->checkErrorModel($saved);

                    $status = $saved;

                    // if($status['code'] == $MasterClass::CODE_SUCCESS){
                    //     DB::commit();
                    // }else{
                    //     DB::rollBack();
                    // }

                    $results = [
                        'code' => $status['code'],
                        'info' => $status['info'],
                        'data' => $status['data'],
                    ];



                } else {
                    $results = [
                        'code' => '103',
                        'info' => "Method Failed",
                    ];
                }
            } catch (\Exception $e) {
                // Roll back the transaction in case of an exception
                $results = [
                    'code' => '102',
                    'info' => $e->getMessage(),
                ];

            }
        } else {

            $results = [
                'code' => '403',
                'info' => "Unauthorized",
            ];

        }

        return $MasterClass->Results($results);

    }
    //USER ROLE
    public function getRoleMenuAccess(Request $request)
    {

        $MasterClass = new Master();

        $checkAuth = $MasterClass->Authenticated($MasterClass->getSession('user_id'));

        if ($checkAuth['code'] == $MasterClass::CODE_SUCCESS) {
            try {
                if ($request->isMethod('post')) {

                    $data = json_decode($request->getContent());

                    DB::beginTransaction();

                    $status = [];
                    $sql = "SELECT * FROM users_roles ur LEFT JOIN users_access ua ON ur.id = ua.role_id WHERE ua.menu_access_id=" . $data->id;
                    // dd($sql);
                    $saved = DB::select($sql);
                    $saved = $MasterClass->checkErrorModel($saved);

                    $status = $saved;

                    // if($status['code'] == $MasterClass::CODE_SUCCESS){
                    //     DB::commit();
                    // }else{
                    //     DB::rollBack();
                    // }

                    $results = [
                        'code' => $status['code'],
                        'info' => $status['info'],
                        'data' => $status['data'],
                    ];



                } else {
                    $results = [
                        'code' => '103',
                        'info' => "Method Failed",
                    ];
                }
            } catch (\Exception $e) {
                // Roll back the transaction in case of an exception
                $results = [
                    'code' => '102',
                    'info' => $e->getMessage(),
                ];

            }
        } else {

            $results = [
                'code' => '403',
                'info' => "Unauthorized",
            ];

        }

        return $MasterClass->Results($results);

    }
    public function getRole(Request $request)
    {

        $MasterClass = new Master();

        $checkAuth = $MasterClass->Authenticated($MasterClass->getSession('user_id'));

        if ($checkAuth['code'] == $MasterClass::CODE_SUCCESS) {
            try {
                if ($request->isMethod('post')) {

                    $data = json_decode($request->getContent());


                    DB::beginTransaction();

                    $status = [];

                    $saved = DB::select('SELECT * FROM users_roles ur');
                    $saved = $MasterClass->checkErrorModel($saved);

                    $status = $saved;

                    // if($status['code'] == $MasterClass::CODE_SUCCESS){
                    //     DB::commit();
                    // }else{
                    //     DB::rollBack();
                    // }

                    $results = [
                        'code' => $status['code'],
                        'info' => $status['info'],
                        'data' => $status['data'],
                    ];



                } else {
                    $results = [
                        'code' => '103',
                        'info' => "Method Failed",
                    ];
                }
            } catch (\Exception $e) {
                // Roll back the transaction in case of an exception
                $results = [
                    'code' => '102',
                    'info' => $e->getMessage(),
                ];

            }
        } else {

            $results = [
                'code' => '403',
                'info' => "Unauthorized",
            ];

        }

        return $MasterClass->Results($results);

    }
    public function saveRole(Request $request)
    {

        $MasterClass = new Master();

        $checkAuth = $MasterClass->Authenticated($MasterClass->getSession('user_id'));

        if ($checkAuth['code'] == $MasterClass::CODE_SUCCESS) {
            try {
                if ($request->isMethod('post')) {

                    $dataArray = json_decode($request->getContent());

                    DB::beginTransaction();
                    $status = [];

                    // Simpan informasi metode ke dalam database AccessUser


                    $saved = UsersRole::updateOrCreate(
                        [
                            'id' => $dataArray->rid,
                        ], // Kolom dan nilai kriteria
                        [
                            'role_name' => $dataArray->role,
                        ] // Kolom yang akan diisi
                    );
                    // dd($saved);
                    $saved = $MasterClass->checkErrorModel($saved);

                    $status = $saved;




                    if ($status['code'] == $MasterClass::CODE_SUCCESS) {
                        DB::commit();
                    } else {
                        DB::rollBack();

                    }

                    $results = [
                        'code' => $status['code'],
                        'info' => $status['info'],
                        'data' => $status['data'],
                    ];

                } else {
                    $results = [
                        'code' => '103',
                        'info' => "Method Failed",
                    ];
                }
            } catch (\Exception $e) {
                // Roll back the transaction in case of an exception
                $results = [
                    'code' => '102',
                    'info' => $e->getMessage(),
                ];

            }
        } else {

            $results = [
                'code' => '403',
                'info' => "Unauthorized",
            ];

        }

        return $MasterClass->Results($results);

    }
    public function getAccessRole(Request $request)
    {

        $MasterClass = new Master();

        $checkAuth = $MasterClass->Authenticated($MasterClass->getSession('user_id'));

        if ($checkAuth['code'] == $MasterClass::CODE_SUCCESS) {
            try {
                if ($request->isMethod('post')) {

                    DB::beginTransaction();

                    $dataArray = $request->get('param_type');

                    $status = [];
                    $sql = 'SELECT ma.*  FROM menus_access ma WHERE ma.param_type ="' . $dataArray . '"';

                    $saved = DB::select($sql);
                    // $saved = MenusAccess::leftJoin()where('param_type', 'VIEW')->get();

                    $saved = $MasterClass->checkErrorModel($saved);

                    $status = $saved;

                    // if($status['code'] == $MasterClass::CODE_SUCCESS){
                    //     DB::commit();
                    // }else{
                    //     DB::rollBack();
                    // }

                    $results = [
                        'code' => $status['code'],
                        'info' => $status['info'],
                        'data' => $status['data'],
                    ];



                } else {
                    $results = [
                        'code' => '103',
                        'info' => "Method Failed",
                    ];
                }
            } catch (\Exception $e) {
                // Roll back the transaction in case of an exception
                $results = [
                    'code' => '102',
                    'info' => $e->getMessage(),
                ];

            }
        } else {

            $results = [
                'code' => '403',
                'info' => "Unauthorized",
            ];

        }

        return $MasterClass->Results($results);

    }
    public function saveUserAccessRole(Request $request)
    {

        $MasterClass = new Master();

        $checkAuth = $MasterClass->Authenticated($MasterClass->getSession('user_id'));

        if ($checkAuth['code'] == $MasterClass::CODE_SUCCESS) {
            try {
                if ($request->isMethod('post')) {

                    $dataArray = json_decode($request->getContent());

                    DB::beginTransaction();
                    $status = [];
                    // Simpan informasi metode ke dalam database AccessUser
                    foreach ($dataArray as $data) {

                        $saved = UserAccess::updateOrCreate(
                            [
                                'menu_access_id' => $data->mid,
                                'role_id' => $data->rid, // Gantilah $roleId dengan nilai yang sesuai
                            ], // Kolom dan nilai kriteria
                            [
                                'i_view' => $data->is_active,
                            ] // Kolom yang akan diisi
                        );
                        $saved = $MasterClass->checkErrorModel($saved);

                        $status = $saved;

                        if ($status['code'] != $MasterClass::CODE_SUCCESS) {
                            break;
                        }

                    }

                    if ($status['code'] == $MasterClass::CODE_SUCCESS) {
                        DB::commit();
                    } else {
                        DB::rollBack();

                    }

                    $results = [
                        'code' => $status['code'],
                        'info' => $status['info'],
                        'data' => $status['data'],
                    ];

                } else {
                    $results = [
                        'code' => '103',
                        'info' => "Method Failed",
                    ];
                }
            } catch (\Exception $e) {
                // Roll back the transaction in case of an exception
                $results = [
                    'code' => '102',
                    'info' => $e->getMessage(),
                ];

            }
        } else {

            $results = [
                'code' => '403',
                'info' => "Unauthorized",
            ];

        }

        return $MasterClass->Results($results);

    }
    public function updateMenuAccessName(Request $request)
    {

        $MasterClass = new Master();

        $checkAuth = $MasterClass->Authenticated($MasterClass->getSession('user_id'));

        if ($checkAuth['code'] == $MasterClass::CODE_SUCCESS) {
            try {
                if ($request->isMethod('post')) {

                    $mid = $request->get('mid');
                    $headmenu = $request->get('nhead');
                    $menuname = $request->get('nmenu');

                    DB::beginTransaction();
                    // dd($mid);

                    $status = [];
                    // Simpan informasi metode ke dalam database AccessUser

                    $saved = MenusAccess::where([
                        'id' => $mid,
                    ])->update([
                                'header_menu' => $headmenu,
                                'menu_name' => $menuname,
                            ]);


                    $saved = $MasterClass->checkerrorModelUpdate($saved);

                    $status = $saved;


                    if ($status['code'] == $MasterClass::CODE_SUCCESS) {
                        DB::commit();
                    } else {
                        DB::rollBack();

                    }

                    $results = [
                        'code' => $status['code'],
                        'info' => $status['info'],
                        'data' => $status['data'],
                    ];

                    // dd($results);

                } else {
                    $results = [
                        'code' => '103',
                        'info' => "Method Failed",
                    ];
                }
            } catch (\Exception $e) {
                // Roll back the transaction in case of an exception
                $results = [
                    'code' => '102',
                    'info' => $e->getMessage(),
                ];

            }
        } else {

            $results = [
                'code' => '403',
                'info' => "Unauthorized",
            ];

        }

        return $MasterClass->Results($results);

    }

    //USER LIST
    public function getUserList(Request $request)
    {

        $MasterClass = new Master();

        $checkAuth = $MasterClass->Authenticated($MasterClass->getSession('user_id'));

        if ($checkAuth['code'] == $MasterClass::CODE_SUCCESS) {
            try {
                if ($request->isMethod('post')) {

                    DB::beginTransaction();


                    $status = [];

                    $query = "
                        SELECT
                            us.id,
                            us.name,
                            us.email,
                            us.is_active,
                            us.role_id,
                            ur.role_name 
                        FROM
                            users us
                            LEFT JOIN users_roles ur ON us.role_id = ur.id
                        
                    ";

                    $saved = DB::select($query);
                    $saved = $MasterClass->checkErrorModel($saved);

                    $status = $saved;

                    // if($status['code'] == $MasterClass::CODE_SUCCESS){
                    //     DB::commit();
                    // }else{
                    //     DB::rollBack();
                    // }

                    $results = [
                        'code' => $status['code'],
                        'info' => $status['info'],
                        'data' => $status['data'],
                    ];



                } else {
                    $results = [
                        'code' => '103',
                        'info' => "Method Failed",
                    ];
                }
            } catch (\Exception $e) {
                // Roll back the transaction in case of an exception
                $results = [
                    'code' => '102',
                    'info' => $e->getMessage(),
                ];

            }
        } else {

            $results = [
                'code' => '403',
                'info' => "Unauthorized",
            ];

        }

        return $MasterClass->Results($results);

    }

    public function saveUser(Request $request)
    {

        $MasterClass = new Master();

        $checkAuth = $MasterClass->Authenticated($MasterClass->getSession('user_id'));

        if ($checkAuth['code'] == $MasterClass::CODE_SUCCESS) {
            try {
                if ($request->isMethod('post')) {

                    DB::beginTransaction();

                    $data = json_decode($request->getContent());

                    $status = [];
                    if ($data->password) {

                        $saved = User::updateOrCreate(
                            [
                                'id' => $data->id,
                            ],
                            [
                                'name' => $data->name,
                                'email' => $data->email,
                                'role_id' => $data->role_id,
                                'password' => Hash::make($data->password),
                                'is_active' => $data->is_active,
                            ] // Kolom yang akan diisi
                        );

                    } else {

                        $saved = User::updateOrCreate(
                            [
                                'id' => $data->id,
                            ],
                            [
                                'name' => $data->name,
                                'email' => $data->email,
                                'role_id' => $data->role_id,
                                'is_active' => $data->is_active,
                            ] // Kolom yang akan diisi
                        );

                    }

                    $saved = $MasterClass->checkErrorModel($saved);

                    $status = $saved;

                    if ($status['code'] == $MasterClass::CODE_SUCCESS) {
                        DB::commit();
                    } else {
                        DB::rollBack();
                    }

                    $results = [
                        'code' => $status['code'],
                        'info' => $status['info'],
                        'data' => $status['data'],
                    ];



                } else {
                    $results = [
                        'code' => '103',
                        'info' => "Method Failed",
                    ];
                }
            } catch (\Exception $e) {
                // Roll back the transaction in case of an exception
                $results = [
                    'code' => '102',
                    'info' => $e->getMessage(),
                ];

            }
        } else {

            $results = [
                'code' => '403',
                'info' => "Unauthorized",
            ];

        }

        return $MasterClass->Results($results);

    }

    public function deleteUser(Request $request)
    {

        $MasterClass = new Master();

        $checkAuth = $MasterClass->Authenticated($MasterClass->getSession('user_id'));

        if ($checkAuth['code'] == $MasterClass::CODE_SUCCESS) {
            try {
                if ($request->isMethod('post')) {

                    DB::beginTransaction();

                    $data = json_decode($request->getContent());

                    $status = [];

                    $saved = User::where('id', $data->id)->delete();

                    $saved = $MasterClass->checkerrorModelUpdate($saved);

                    $status = $saved;

                    if ($status['code'] == $MasterClass::CODE_SUCCESS) {
                        DB::commit();
                    } else {
                        DB::rollBack();
                    }

                    $results = [
                        'code' => $status['code'],
                        'info' => $status['info'],
                        'data' => $status['data'],
                    ];



                } else {
                    $results = [
                        'code' => '103',
                        'info' => "Method Failed",
                    ];
                }
            } catch (\Exception $e) {
                // Roll back the transaction in case of an exception
                $results = [
                    'code' => '102',
                    'info' => $e->getMessage(),
                ];

            }
        } else {

            $results = [
                'code' => '403',
                'info' => "Unauthorized",
            ];

        }

        return $MasterClass->Results($results);

    }

    public function deleteGlobal(Request $request)
    {

        $MasterClass = new Master();

        $checkAuth = $MasterClass->Authenticated($MasterClass->getSession('user_id'));

        if ($checkAuth['code'] == $MasterClass::CODE_SUCCESS) {
            try {
                if ($request->isMethod('post')) {

                    DB::beginTransaction();

                    $data = json_decode($request->getContent());

                    $status = [];

                    $saved = DB::table($data->tableName)->where('id', $data->id)->delete();

                    $saved = $MasterClass->checkerrorModelUpdate($saved);

                    $status = $saved;

                    if ($status['code'] == $MasterClass::CODE_SUCCESS) {
                        DB::commit();
                    } else {
                        DB::rollBack();
                    }

                    $results = [
                        'code' => $status['code'],
                        'info' => $status['info'],
                        'data' => $status['data'],
                    ];



                } else {
                    $results = [
                        'code' => '103',
                        'info' => "Method Failed",
                    ];
                }
            } catch (\Exception $e) {
                // Roll back the transaction in case of an exception
                $results = [
                    'code' => '102',
                    'info' => $e->getMessage(),
                ];

            }
        } else {

            $results = [
                'code' => '403',
                'info' => "Unauthorized",
            ];

        }

        return $MasterClass->Results($results);

    }

    // dashboard
    public function getOverviewProfit(Request $request)
    {

        $MasterClass = new Master();

        $checkAuth = $MasterClass->Authenticated($MasterClass->getSession('user_id'));

        if ($checkAuth['code'] == $MasterClass::CODE_SUCCESS) {
            try {
                if ($request->isMethod('post')) {

                    DB::beginTransaction();


                    $status = [];


                    $query = "
                        SELECT SUM(price_total) as price_total FROM transactions WHERE status = '10'
                        ";




                    $saved = DB::select($query);
                    $saved = $MasterClass->checkErrorModel($saved);

                    $status = $saved;

                    // if($status['code'] == $MasterClass::CODE_SUCCESS){
                    //     DB::commit();
                    // }else{
                    //     DB::rollBack();
                    // }

                    $results = [
                        'code' => $status['code'],
                        'info' => $status['info'],
                        'data' => $status['data'],
                    ];


                } else {
                    $results = [
                        'code' => '103',
                        'info' => "Method Failed",
                    ];
                }
            } catch (\Exception $e) {
                // Roll back the transaction in case of an exception
                $results = [
                    'code' => '102',
                    'info' => $e->getMessage(),
                ];

            }
        } else {

            $results = [
                'code' => '403',
                'info' => "Unauthorized",
            ];

        }

        return $MasterClass->Results($results);

    }

    public function getOverviewTransaction(Request $request)
    {

        $MasterClass = new Master();

        $checkAuth = $MasterClass->Authenticated($MasterClass->getSession('user_id'));

        if ($checkAuth['code'] == $MasterClass::CODE_SUCCESS) {
            try {
                if ($request->isMethod('post')) {

                    DB::beginTransaction();


                    $status = [];


                    // $query = "
                    // SELECT
                    //     all_days.day_of_week,
                    //     COALESCE(COUNT(transactions.id), 0) AS transaction_count,
                    //     COALESCE(SUM(transactions.price_total), 0) AS total_price
                    // FROM
                    //     (
                    //         SELECT 'Monday' AS day_of_week, 1 AS day_order
                    //         UNION SELECT 'Tuesday', 2
                    //         UNION SELECT 'Wednesday', 3
                    //         UNION SELECT 'Thursday', 4
                    //         UNION SELECT 'Friday', 5
                    //         UNION SELECT 'Saturday', 6
                    //         UNION SELECT 'Sunday', 7
                    //     ) AS all_days
                    // LEFT JOIN
                    //     transactions ON DAYNAME(transactions.transaction_start_date) = all_days.day_of_week
                    //     AND MONTH(transactions.transaction_start_date) = MONTH(CURRENT_DATE)
                    //     AND YEAR(transactions.transaction_start_date) = YEAR(CURRENT_DATE)
                    // GROUP BY
                    //     all_days.day_of_week, all_days.day_order
                    // ORDER BY
                    //     all_days.day_order;
                    // ";

                    $query = "
                        SELECT
                            t.id,
                            t.start_date,
                            t.end_date,
                            t.no_transaction,
                            t.status,
                            t.created_by,
                            t.updated_by,
                            t.price_total,
                            t.customer_name,
                            t.address,
                            t.customer_phone,
                            t.file_path,
                            t.created_at,
                            t.updated_at,
                            (t.price_total + COALESCE(d.denda, 0)) as grand_total, 
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
                        ORDER BY t.created_at ASC;
                    ";
                



                    $saved = DB::select($query);
                    $saved = $MasterClass->checkErrorModel($saved);

                    // $response = [
                    //     [
                    //         'name' => 'Transaksi Success',
                    //         'data' => array_map(function ($item) {
                    //             return [
                    //                 'day_of_week' => $item->day_of_week,
                    //                 'count' => $item->success_count,
                    //                 'total' => $item->success_total,
                    //             ];
                    //         }, $saved['data']),
                    //     ],
                    //     [
                    //         'name' => 'Transaksi Failed',
                    //         'data' => array_map(function ($item) {
                    //             return [
                    //                 'day_of_week' => $item->day_of_week,
                    //                 'count' => $item->failed_count,
                    //                 'total' => $item->failed_total,
                    //             ];
                    //         }, $saved[]),
                    //     ],
                    // ];
                    $status = $saved;

                    // if($status['code'] == $MasterClass::CODE_SUCCESS){
                    //     DB::commit();
                    // }else{
                    //     DB::rollBack();
                    // }

                    $results = [
                        'code' => $status['code'],
                        'info' => $status['info'],
                        'data' => $status['data'],
                    ];



                } else {
                    $results = [
                        'code' => '103',
                        'info' => "Method Failed",
                    ];
                }
            } catch (\Exception $e) {
                // Roll back the transaction in case of an exception
                $results = [
                    'code' => '102',
                    'info' => $e->getMessage(),
                ];

            }
        } else {

            $results = [
                'code' => '403',
                'info' => "Unauthorized",
            ];

        }

        return $MasterClass->Results($results);

    }

    public function getOverviewLastTransaction(Request $request)
    {

        $MasterClass = new Master();

        $checkAuth = $MasterClass->Authenticated($MasterClass->getSession('user_id'));

        if ($checkAuth['code'] == $MasterClass::CODE_SUCCESS) {
            try {
                if ($request->isMethod('post')) {

                    DB::beginTransaction();


                    $status = [];

                    $query = "
                            SELECT
                                p.product_name,
                                SUM(td.quantity) AS total_products_sold
                            FROM
                                transactions t
                                LEFT JOIN transaction_details td ON td.id_transaction = t.id
                                LEFT JOIN products p ON td.kd_product = p.prod_code
                            GROUP BY
                                p.product_name
                            ORDER BY
                                total_products_sold DESC;

                        ";

                    $saved = DB::select($query);
                    $saved = $MasterClass->checkErrorModel($saved);

                    $status = $saved;

                    // if($status['code'] == $MasterClass::CODE_SUCCESS){
                    //     DB::commit();
                    // }else{
                    //     DB::rollBack();
                    // }

                    $results = [
                        'code' => $status['code'],
                        'info' => $status['info'],
                        'data' => $status['data'],
                    ];



                } else {
                    $results = [
                        'code' => '103',
                        'info' => "Method Failed",
                    ];
                }
            } catch (\Exception $e) {
                // Roll back the transaction in case of an exception
                $results = [
                    'code' => '102',
                    'info' => $e->getMessage(),
                ];

            }
        } else {

            $results = [
                'code' => '403',
                'info' => "Unauthorized",
            ];

        }

        return $MasterClass->Results($results);

    }

    // transaction
    public function saveTransaction(Request $request)
    {

        $MasterClass = new Master();

        $checkAuth = $MasterClass->Authenticated($MasterClass->getSession('user_id'));

        if ($checkAuth['code'] == $MasterClass::CODE_SUCCESS) {
            try {
                if ($request->isMethod('post')) {

                    DB::beginTransaction();

                    $data = json_decode($request->input('data'));
                    
                    $status = [];

                    $image = $request->file('image');
                    $status = [];
                    $imagePath = null;
                    
                    if ($image) {
                        // dd( $image->getRealPath());
                        $imagePath = $image->store('images', 'public');
                        // dd($imagePath);
                    }

                    $nowdate = now();
                    $notrx = Transaction::generateNoTransaction($nowdate);
                    
                    $transaction = Transaction::create([
                        'customer_name' => $data->tenant_name,
                        'no_transaction' => $notrx,
                        'created_by' => $MasterClass->getSession('user_id'),
                        'updated_by' => $MasterClass->getSession('user_id'),
                        'price_total' => $data->grand_total,
                        'start_date' => $data->start_date,
                        'end_date' => $data->end_date,
                        'address' => $data->address,
                        'customer_phone' => $data->phone_number,
                        'status' => 10,
                        'file_path'=> $imagePath
                    ]);

                    $saved1 = $MasterClass->checkErrorModel($transaction);

                    foreach ($data->items as $pdr) {

                        $detailTransac = TransactionDetail::create([
                            'id_transaction' => $transaction->id,
                            'id_product' => $pdr->id,
                            'day' => $data->day,
                            'sub_total' => ($pdr->price * $data->day),
                        ]);

                        $saved2 = $MasterClass->checkErrorModel($detailTransac);
                        $saveProd = Product::where(column: [
                            'id' => $pdr->id,
                        ])->update([
                                    'status' => 1
                                ]);
                        $saved3 = $MasterClass->checkerrorModelUpdate($saveProd);
                    }

                    $status = $saved3;

                    if ($status['code'] == $MasterClass::CODE_SUCCESS) {
                        DB::commit();
                    } else {
                        DB::rollBack();
                    }
                    $status = $saved1;
                    $results = [
                        'code' => $status['code'],
                        'info' => $status['info'],
                        'data' => $status['data'],
                    ];

                } else {
                    $results = [
                        'code' => '103',
                        'info' => "Method Failed",
                    ];
                }
            } catch (\Exception $e) {
                // Roll back the transaction in case of an exception
                $results = [
                    'code' => '102',
                    'info' => $e->getMessage(),
                ];

            }
        } else {

            $results = [
                'code' => '403',
                'info' => "Unauthorized",
            ];

        }

        return $MasterClass->Results($results);

    }

    public function loadGlobal(Request $request)
    {

        $MasterClass = new Master();

        $checkAuth = $MasterClass->Authenticated($MasterClass->getSession('user_id'));

        if ($checkAuth['code'] == $MasterClass::CODE_SUCCESS) {
            try {
                if ($request->isMethod('post')) {

                    DB::beginTransaction();

                    $status = [];

                    $data = json_decode($request->getContent());

                    $query = "
                        SELECT
                            *
                        FROM

                    " . $data->tableName;
                    if (isset($data->is_detail)) {
                        $query = "
                        SELECT
                            *,
                            COALESCE(
                                    CASE 
                                        WHEN td.good_condition = 0 THEN
                                            CASE 
                                                WHEN mc.type = 1 THEN (td.sub_total + mc.value)
                                                WHEN mc.type = 2 THEN (td.sub_total + (td.sub_total * mc.value / 100))
                                                ELSE 0
                                            END
                                        ELSE 0
                                    END
                                ,0) AS denda
                        FROM

                        " . $data->tableName;
                        
                    }

                    $whereClause = isset($data->where) ? " WHERE " . $data->where : "";

                    if ($whereClause) {
                        $query = $query . " WHERE " . $data->where;
                    }

                    
                    // dd($query);

                    $saved = DB::select($query);
                    $saved = $MasterClass->checkErrorModel($saved);

                    $status = $saved;

                    // if($status['code'] == $MasterClass::CODE_SUCCESS){
                    //     DB::commit();
                    // }else{
                    //     DB::rollBack();
                    // }

                    $results = [
                        'code' => $status['code'],
                        'info' => $status['info'],
                        'data' => $status['data'],
                    ];



                } else {
                    $results = [
                        'code' => '103',
                        'info' => "Method Failed",
                    ];
                }
            } catch (\Exception $e) {
                // Roll back the transaction in case of an exception
                $results = [
                    'code' => '102',
                    'info' => $e->getMessage(),
                ];

            }
        } else {

            $results = [
                'code' => '403',
                'info' => "Unauthorized",
            ];

        }

        return $MasterClass->Results($results);

    }
    // dashboard
    public function changeStatusTransaction(Request $request)
    {

        $MasterClass = new Master();

        $checkAuth = $MasterClass->Authenticated($MasterClass->getSession('user_id'));

        if ($checkAuth['code'] == $MasterClass::CODE_SUCCESS) {
            try {
                if ($request->isMethod('post')) {

                    DB::beginTransaction();

                    $data = json_decode($request->getContent());

                    $status = [];

                    $saved = Transaction::where([
                        'id' => $data->id
                    ])->update([
                                'status' => $data->status,
                                'description' => isset($data->desc) ? $data->desc : "",
                            ]);

                    $saved = $MasterClass->checkerrorModelUpdate($saved);

                    $status = $saved;

                    if ($status['code'] == $MasterClass::CODE_SUCCESS) {
                        DB::commit();
                    } else {
                        DB::rollBack();
                    }

                    $results = [
                        'code' => $status['code'],
                        'info' => $status['info'],
                        'data' => $status['data'],
                    ];


                } else {
                    $results = [
                        'code' => '103',
                        'info' => "Method Failed",
                    ];
                }
            } catch (\Exception $e) {
                // Roll back the transaction in case of an exception
                $results = [
                    'code' => '102',
                    'info' => $e->getMessage(),
                ];

            }
        } else {

            $results = [
                'code' => '403',
                'info' => "Unauthorized",
            ];

        }

        return $MasterClass->Results($results);

    }

    public function saveProduct(Request $request)
    {

        $MasterClass = new Master();

        $checkAuth = $MasterClass->Authenticated($MasterClass->getSession('user_id'));

        if ($checkAuth['code'] == $MasterClass::CODE_SUCCESS) {
            try {
                if ($request->isMethod('post')) {

                    DB::beginTransaction();

                    $image = $request->file('image');
                    $data = json_decode($request->input('data'));
                    $status = [];
                    $imagePath = null;
                    
                    if ($data->id) {
                        $product = Product::find($data->id);
                        $currentFilePath = $product->file_path;
                       
                        if (empty($image)) {
                            $imagePath = $currentFilePath;
                        } else {
                            $imagePath = $image->store('images', 'public');
                        }


                    } else {
                        if ($image) {
                            // dd( $image->getRealPath());
                            $imagePath = $image->store('images', 'public');
                            // dd($imagePath);
                        }
                    }
                    
                    $saved = Product::updateOrCreate(
                        [
                            'id' => $data->id,
                        ],
                        [
                            'product_name' => $data->product_name,

                            // 'prod_code' => $data->prod_code,
                            'price' => $data->price,
                            'file_path' => $imagePath,
                            'desc' => $data->desc,
                            'status' => $data->status,
                            // 'stock_minimum' => $data->min,
                            // 'stock_maximum' => $data->max,
                            // 'stock' => $data->init,
                        ]
                    );

                    // if ($imagePath && $data->id) {

                    // }

                    $saved = $MasterClass->checkErrorModel($saved);

                    $status = $saved;

                    if ($status['code'] == $MasterClass::CODE_SUCCESS) {
                        DB::commit();
                    } else {
                        DB::rollBack();
                    }

                    $results = [
                        'code' => $status['code'],
                        'info' => $status['info'],
                        'data' => $status['data'],
                    ];



                } else {
                    $results = [
                        'code' => '103',
                        'info' => "Method Failed",
                    ];
                }
            } catch (\Exception $e) {
                // Roll back the transaction in case of an exception
                $results = [
                    'code' => '102',
                    'info' => $e->getMessage(),
                ];

            }
        } else {

            $results = [
                'code' => '403',
                'info' => "Unauthorized",
            ];

        }

        return $MasterClass->Results($results);

    }

    public function saveConstant(Request $request)
    {

        $MasterClass = new Master();

        $checkAuth = $MasterClass->Authenticated($MasterClass->getSession('user_id'));

        if ($checkAuth['code'] == $MasterClass::CODE_SUCCESS) {
            try {
                if ($request->isMethod('post')) {

                    DB::beginTransaction();

                    $data       = json_decode($request->input('data'));
                    $status     = [];
                    
                    if ($data->id) {

                        $saved = Constant::query()->update([
                            'is_active' => 0
                        ]);

                        $saved = $MasterClass->checkerrorModelUpdate($saved);

                        $saved = Constant::updateOrCreate(
                        [
                            'id' => $data->id,
                            ],
                            [
                                'is_active' => 1,
                            ]
                        );

                    } else {
                        $saved = Constant::updateOrCreate(
                        [
                            'id' => $data->id,
                            ],
                            [
                                'constant_name' => $data->const_name,
                                'type' => $data->type,
                                'value' => $data->value,
                                'is_active' => 0,
                            ]
                        );
                    }

                    $saved = $MasterClass->checkErrorModel($saved);

                    $status = $saved;

                    if ($status['code'] == $MasterClass::CODE_SUCCESS) {
                        DB::commit();
                    } else {
                        DB::rollBack();
                    }

                    $results = [
                        'code' => $status['code'],
                        'info' => $status['info'],
                        'data' => $status['data'],
                    ];



                } else {
                    $results = [
                        'code' => '103',
                        'info' => "Method Failed",
                    ];
                }
            } catch (\Exception $e) {
                // Roll back the transaction in case of an exception
                $results = [
                    'code' => '102',
                    'info' => $e->getMessage(),
                ];

            }
        } else {

            $results = [
                'code' => '403',
                'info' => "Unauthorized",
            ];

        }

        return $MasterClass->Results($results);

    }

    public function getRandomCode(Request $request)
    {

        $MasterClass = new Master();

        $checkAuth = $MasterClass->Authenticated($MasterClass->getSession('user_id'));

        if ($checkAuth['code'] == $MasterClass::CODE_SUCCESS) {
            try {
                if ($request->isMethod('post')) {
                    $data = json_decode($request->getContent());

                    $barcode = $data->barcode_code;
                    $status = $MasterClass->generateBarcodeImg($barcode);
                    $results = [
                        'code' => $status['code'],
                        'info' => $status['info'],
                        'data' => $status['data'],
                    ];

                } else {
                    $results = [
                        'code' => '103',
                        'info' => "Method Failed",
                    ];
                }
            } catch (\Exception $e) {
                // Roll back the transaction in case of an exception
                $results = [
                    'code' => '102',
                    'info' => $e->getMessage(),
                ];

            }
        } else {

            $results = [
                'code' => '403',
                'info' => "Unauthorized",
            ];

        }

        return $MasterClass->Results($results);

    }



    // midtrans


    public function createPayment(Request $request)
    {
        $data = json_decode($request->getContent());
        Config::$serverKey = config('services.midtrans.server_key');
        Config::$clientKey = config('services.midtrans.client_key');
        Config::$isProduction = config('services.midtrans.is_production');
        $transaction_details = array(
            'transaction_details' => array(
                'order_id' => uniqid(),
                'gross_amount' => (int) $data->amount,
            ),
            'customer_details' => array(
                'first_name' => 'budi',
                'last_name' => 'pratama',
                'email' => 'budi.pra@example.com',
                'phone' => '08111222333',
            ),
        );

        try {
            $snapToken = Snap::getSnapToken($transaction_details);
            return response()->json(['snap_token' => $snapToken]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500); // Handle any errors
        }
    }

    public function notificationHandler(Request $request)
    {
        $payload = $request->getContent();
        $notification = json_decode($payload);

        return response('OK', 200);
    }

    public function setSendTransaction(Request $request)
    {

        $MasterClass = new Master();

        $checkAuth = $MasterClass->Authenticated($MasterClass->getSession('user_id'));

        if ($checkAuth['code'] == $MasterClass::CODE_SUCCESS) {
            try {
                if ($request->isMethod('post')) {

                    DB::beginTransaction();

                    $data = json_decode($request->input('data'));
                    $status = [];
                    
                    $saved = Transaction::where([
                        'id' => $data->id,
                    ])->update([
                        'status' => 20,
                        'updated_by' => $MasterClass->getSession('user_id')
                    ]);

                    $saved = $MasterClass->checkerrorModelUpdate($saved);

                    $status = $saved;

                    if ($status['code'] == $MasterClass::CODE_SUCCESS) {
                        DB::commit();
                    } else {
                        DB::rollBack();
                    }

                    $results = [
                        'code' => $status['code'],
                        'info' => $status['info'],
                        'data' => $status['data'],
                    ];



                } else {
                    $results = [
                        'code' => '103',
                        'info' => "Method Failed",
                    ];
                }
            } catch (\Exception $e) {
                // Roll back the transaction in case of an exception
                $results = [
                    'code' => '102',
                    'info' => $e->getMessage(),
                ];

            }
        } else {

            $results = [
                'code' => '403',
                'info' => "Unauthorized",
            ];

        }

        return $MasterClass->Results($results);

    }

    public function setSendBackTransaction(Request $request)
    {

        $MasterClass = new Master();

        $checkAuth = $MasterClass->Authenticated($MasterClass->getSession('user_id'));

        if ($checkAuth['code'] == $MasterClass::CODE_SUCCESS) {
            try {
                if ($request->isMethod('post')) {

                    DB::beginTransaction();

                    $data = json_decode($request->input('data'));
                    $status = [];
                    // dd($data);
                    foreach ($data->items as $it) {

                        $saved = TransactionDetail::where([
                            'id_product' => $it->id_product,
                        ])->update([
                            'good_condition' => $it->good_condition
                        ]);
                        
                        $saved = $MasterClass->checkerrorModelUpdate($saved);
                        
                        $status_product = 2;
                        if( $it->good_condition == 1){
                            $status_product = 0;
                        }

                        $saved = Product::where([
                            'id' => $it->id_product,
                        ])->update([
                            'status' => $status_product,
                        ]);

                        $saved = $MasterClass->checkerrorModelUpdate($saved);

                        $status = $saved;

                        if ($status['code'] != $MasterClass::CODE_SUCCESS) {
                            break;
                        }

                    }

                    $saved = Transaction::where([
                        'id' => $data->id_transaction,
                    ])->update([
                        'status' => 30,
                        'updated_by' => $MasterClass->getSession('user_id')
                    ]);

                    $saved = $MasterClass->checkerrorModelUpdate($saved);

                    $status = $saved;

                    if ($status['code'] == $MasterClass::CODE_SUCCESS) {
                        DB::commit();
                    } else {
                        DB::rollBack();
                    }

                    $results = [
                        'code' => $status['code'],
                        'info' => $status['info'],
                        'data' => $status['data'],
                    ];

                } else {
                    $results = [
                        'code' => '103',
                        'info' => "Method Failed",
                    ];
                }
            } catch (\Exception $e) {
                // Roll back the transaction in case of an exception
                $results = [
                    'code' => '102',
                    'info' => $e->getMessage(),
                ];

            }
        } else {

            $results = [
                'code' => '403',
                'info' => "Unauthorized",
            ];

        }

        return $MasterClass->Results($results);

    }






}
