    @extends('main')

    @section('content')
        <div class="page">
            <form action="" method="POST">
                <h2>Login</h2>

                @csrf
                <input type="text" 
                    name="username" 
                    placeholder="enter your username...">

            
                @error('username')
                <p>{{ $message }}</p>
                @enderror

                @error('password')
                <p>{{ $message }}</p>
                @enderror

                <input type="password" 
                    name="password" 
                    placeholder="enter your password...">

                <button class="btn">Continue</button>
            </form>
        </div>
    @endsection