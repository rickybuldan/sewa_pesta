<?php

namespace App\Http\Controllers;

use App\Mail\SendMail;
use App\Mail\VerificationEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Mail;



class AuthController extends Controller
{
    public function index()
    {
        // Logika untuk menampilkan halaman indeks pengguna
        if(Auth::check()){
            return redirect('/');
        }
        
        return view('auth.login');
        
    }

    // public function signup()
    // {
    //     return view('auth.signup');
    // }

    public function login(Request $request)
    {

        $data = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ], [
            'email.required' => 'Email cannot be empty.',
            'email.email' => 'Invalid email format.',
            'password.required' => 'Password cannot be empty.',
        ]);

        $credentials = $request->only('email', 'password');

        if ($user = User::where('email', $request->email)->first()) {
            // Check if the user is active
            if ($user->is_active == 1 && Auth::attempt($credentials)) {
                Auth::logoutOtherDevices($request->password);

                // if (Auth::user()->roles->first()->role_name == "Customer") {
                //     Session::put('user_id', Auth::user()->id);
                //     Session::put('name', Auth::user()->name);
                //     Session::put('role_id', Auth::user()->role_id);
                //     return redirect(route('home'));
                // } else {
                //     Session::put('user_id', Auth::user()->id);
                //     Session::put('name', Auth::user()->name);
                //     Session::put('role_id', Auth::user()->role_id);
                //     return redirect()->intended('/');
                // }
                Session::put('user_id', Auth::user()->id);
                Session::put('name', Auth::user()->name);
                Session::put('role_id', Auth::user()->role_id);
                return redirect()->intended('/');
            } else {
                return redirect()
                    ->back()
                    ->withErrors(['email' => $user->is_active ? 'Invalid credentials' : 'Silakan verifikasi email terlebih dahulu.'])
                    ->withInput($request->except('password'));
            }
        } else {
            return redirect()
                ->back()
                ->withErrors(['email' => 'Email tidak terdaftar.'])
                ->withInput($request->except('password'));
        }

    }
    public function logout(Request $request)
    {
        Auth::logout();

        Session::flush();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }

    public function signup(Request $request)
    {

        if ($request->isMethod('post')) {
            $data = json_decode($request->getContent());
            $user = User::where('email', $data->email)->first();

            $baseURL = url('/');
            if (!$user) {

                $saved = User::create(

                    [
                        'name' => $data->name,
                        'email' => $data->email,
                        'phone' => $data->phone,
                        'address' => $data->address,
                        'role_id' => 14,
                        'password' => Hash::make($data->password),
                        'is_active' => 0,

                    ] // Kolom yang akan diisi
                );

                if ($saved) {
                    $name = $data->name;
                    $email = $data->email;
                    $sub = "Verification Sewa Pesta";
                    $mess = "silakan klik link dibawah ini untuk verifikasi email " ;
                    $link = $baseURL . "/verifyemail?code=" .encrypt($saved->id);

                    $send_mail = $data->email;
                    try {
                        Mail::to($send_mail)->send(new SendMail($name, $email, $sub, $mess, $link));

                        $results = [
                            'code' => 0,
                            'info' => 'Success, silakan verifikasi email anda untuk login.',
                        ];
                    } catch (\Exception $e) {
                        $results = [
                            'code' => 2,
                            'info' => 'Email gagal dikirim: ' . $e->getMessage(),
                        ];
                    }
                    // dd($results);

                    return $results;

                } else {
                    $results = [
                        'code' => 1,
                        'info' => 'Registrasi gagal',
                    ];

                    return $results;
                }

            } else {

                $results = [
                    'code' => 1,
                    'info' => 'Email sudah terdaftar!',
                ];

                return $results;

            }
        } else {
            return view('auth.signup');
        }
    }
    public function verifyemail(Request $request)
    {
        $uid = decrypt($request->query('code'));
        $saved = User::where('id', $uid)
             ->where('is_active', '!=', 1)
             ->first();

        if ($saved) {
            $saved->is_active = 1;
            $saved->save();

            return view('auth.login')->withErrors(['email' => 'Email berhasil diverifikasi silakan login.']);
        } else {
            return view('auth.login')->withErrors(['email' => 'Verifikasi gagal atau akun sudah aktif.']);
        }


    }
}
