<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthAdminController extends Controller
{
    // login
    public function loginview(Request $request) {
        return view('login');
    }

    // authorization
    public function auth(Request $request) {
        // validate data
        $form = $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);

        // authenticate checking
        if (Admin::where("username", $form['username'])->where("password", $form['password'])->first()) {
            $user = Admin::where("username", $form['username'])->where("password", $form['password'])->first();
            $request->session()->regenerate();

            return redirect('/courses');
        } else {
            // return error
            return back()->withErrors('Invalid username or password');
        }
    }

    // logout function
    public function logout(Request $request) {
        $request->session()->regenerate();
        return redirect('/login');
    }

    
}
