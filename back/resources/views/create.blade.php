@extends('main')

@section('content')
    <div class="page">
        <form action="" method="POST" style="max-width: 600px">
            <h2>Create</h2>

            @csrf
            <label for="">Course Name:</label>
            <input type="text" 
                name="title" 
                placeholder="enter your title...">

            <label for="">Description</label>
            <textarea name="description" id="" cols="30" rows="10"></textarea>
           
            {{-- @error('username')
            <p>{{ $message }}</p>
            @enderror --}}

            <label for="">Location</label>
            <input type="text" 
                name="location" 
                placeholder="enter your location...">


            <label for="">Starting Date & Time</label>
            <input type="datetime-local" 
                name="date" 
                placeholder="enter your title...">

            <label for="">Capacity</label>
            <input type="text" 
                name="capacity" 
                placeholder="enter your capacity...">

            <label for="">Duration Days</label>
            <input type="integer" 
                name="days" 
                placeholder="enter your days...">

            <label for="">Instructor's name</label>
            <input type="text" 
                name="iname" 
                placeholder="enter your name...">
            
            <button class="btn">Continue</button>
        </form>
    </div>
@endsection