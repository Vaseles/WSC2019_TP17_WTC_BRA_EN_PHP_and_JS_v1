<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Member;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request) {
        if (Member::where('username', $request->username)->where('password', $request->password)->first()) {
            $user = Member::where('username', $request->username)->first();

            return response()->json([
                'token' => '123'
            ], 200);
        } else {
            return response()->json([
                'message' => 'Invalid login.'
            ]);
        }
    }

    public function create(Request $request) {
        if (Member::where('username', $request->username)) {
            return response()->json([
                'message' => 'Member email or username already registered'
            ], 422);
        }

        if (Member::where('email', $request->username)) {
            return response()->json([
                'message' => 'Member email or username already registered'
            ], 422);
        }

        $member = Member::create([
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'username' => $request->username,
            'email' => $request->email,
            'teacher_id' => $request->teacher_id, 
            'photo' =>$request->photo,
            'password' => $request->password
        ]);
        return response()->json([
           'token' => '123'
        ], 200);
    }

    public function logout (Request $request) {
        return response()->json([
            'message' => "Logout success"
        ], 200);
    }

    public function courses (Request $request) {
        return response()->json(Course::all(), 200);
    }
}
