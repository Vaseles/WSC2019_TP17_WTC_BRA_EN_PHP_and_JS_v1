<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Member;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    // show all courses (admin only)
    public function index(Request $request) {
        return view('courses', [
            'courses' => Course::all(),
            'members' => Member::all(),
        ]);
    }

    // create new course
    public function create(Request $request) {
        return view('create');
    }
    
    public function store(Request $request) {
        $form = $request->validate([
            'title' => 'required',
            'description' => 'required',
            'location' => 'required',
            'date' => 'required',
            'capacity' => 'required',
            'days' => 'required',
            'iname' => 'required',
        ]);

        $course = Course::create([
            'title' => $form['title'],
            'description' => $form['description'],
            'location' => $form['location'],
            'date_time' => $form['date'],
            'seats' => $form['capacity'],
            'duration_days' => $form['days'],
            'instructor_name' => $form['iname'],
        ])->create;        

        return redirect('/courses');
    }

    public function attende(Request $request, $id) {
        $course = Course::find($id);
        
        if ($course) {
            return view('attende', [
                'title' => $course->title,
                'members' => Member::where('course_id', $id)->get(),
            ]);
        } else {
            return response('Not Found');
        }
    }
    
    // public function attendeeList() {
    //     return view('courses');
    // }
    // public function raiting() {
    //     return view('courses');
    // }
}
