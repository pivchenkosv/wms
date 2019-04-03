<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;
use Tymon\JWTAuth\Facades\JWTAuth;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param array $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param array $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }

    public function register(Request $request)
    {
        $token = self::getToken($request->email, $request->password);

        $payload = [
            'password' => \Hash::make($request->password),
            'email' => $request->email,
            'name' => $request->name,
            'role' => $request->role,
            'auth_token' => $token
        ];

        if ($request->has('id')) {
            $user = User::find($request->id);

        } else {
            $user = new User;
        }
        $user->name = $request->name;
        $user->email = $request->email;
        $user->role = $request->role;
        $user->auth_token = $token;

//        $user = User::updateOrCreate(
//            ['email' => $request->email],
//            $payload
//        );

        $user->save();
//        if ($user->save()) {
//
//            $token = self::getToken($request->email, $request->password); // generate user token
//
//            if (!is_string($token)) return response()->json(['success' => false, 'data' => 'Token generation failed'], 201);
//
//            $user = \App\User::where('email', $request->email)->get()->first();
//
//            $user->auth_token = $token; // update user token
//
//            $user->save();
//
//            $users = User::all();
//
//            $response = ['success' => true, 'data' => $users];
//        } else
//            $response = ['success' => false, 'data' => 'Couldnt register user'];

        $users = User::all();

        $response = ['success' => true, 'data' => $users];
        return response()->json($response, 201);
    }

    private function getToken($email, $password)
    {
        $token = null;
        //$credentials = $request->only('email', 'password');
        try {
            if (!$token = JWTAuth::attempt(['email' => $email, 'password' => $password])) {
                return response()->json([
                    'response' => 'error',
                    'message' => 'Password or email is invalid',
                    'token' => $token
                ]);
            }
        } catch (JWTAuthException $e) {
            return response()->json([
                'response' => 'error',
                'message' => 'Token creation failed',
            ]);
        }
        return $token;
    }
}
