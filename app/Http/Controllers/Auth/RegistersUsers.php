<?php

namespace Illuminate\Foundation\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Events\Registered;

trait RegistersUsers
{
    use RedirectsUsers;

    /**
     * Show the application registration form.
     *
     * @return \Illuminate\Http\Response
     */
    public function showRegistrationForm()
    {
        return view('auth.register');
    }

    /**
     * Handle a registration request for the application.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        if (!$request->has('id')) {
            $this->validator($request->all())->validate();

            event(new Registered($user = $this->create($request->all())));

            $users = User::all();

            return response()->json(['success' => true, 'data' => $users]);
        }

        $id = $request->input('id');
        $updatedUser = $request->only('name', 'email', 'role');

        $user = \App\User::find($id);

        $user->name = $updatedUser['name'];
        $user->email = $updatedUser['email'];
        $user->role = $updatedUser['role'];

        if ($user->save()) {
            $users = User::all();
            return response()->json(['success' => true, 'data' => $users]);
        }


        return response()->json(['success' => false]);

    }

    /**
     * Get the guard to be used during registration.
     *
     * @return \Illuminate\Contracts\Auth\StatefulGuard
     */
    protected function guard()
    {
        return Auth::guard();
    }

    /**
     * The user has been registered.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  mixed $user
     * @return mixed
     */
    protected function registered(Request $request, $user)
    {
        //
    }
}
