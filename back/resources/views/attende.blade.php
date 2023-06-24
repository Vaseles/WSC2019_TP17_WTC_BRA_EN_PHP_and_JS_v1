@extends('main')

@section('content')
    <div class="page">
        <h1>Attendee list</h1>
        {{ $title }}
        <table>
            <tbody>
                <tr>
                    <td>First Name</td>
                    <td>Last Name</td>
                    <td>Email</td>
                    <td>Photo</td>
                </tr>
                @foreach ($members as $member)
                    <tr>
                        <td>{{ $member->firstname }}</td>
                        <td>{{ $item->lastname }}</td>
                        <td>{{ $item->email }}</td>
                        <td>{{ $item->photo }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection