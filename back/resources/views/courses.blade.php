@extends('main')

@section('content')
    <div class="page">
        <div class="page__header">
            <h2>Manage Courses</h2>
            <a href="/create" class='btn'>Create Course</a>
        </div>
            <table>
                <tbody>
                    <tr>
                        <th>course name</th>
                        <th>date</th>
                        <th>action</th>
                    </tr>
                    @foreach ($courses as $item)
                        <tr>
                            <td>{{ $item->title }}</td>
                            <td>{{ $item->date_time }}</td>
                            <td>
                                <a href="/courses/{{$item->id}}" class="btn">Attende list</a>
                                <a href="" class="btn">Raiting Diagram</a>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>

            <div class="page__header">
                <h2>Manage Members</h2>
                <a href="/create" class=''></a>
            </div>
                <table>
                    <tbody>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Photo</th>
                            <th>Status</th>
                        </tr>
                        @foreach ($members as $member)
                            <tr>
                                <td>{{ $member->firstname }}</td>
                                <td>{{ $item->lastname }}</td>
                                <td>{{ $item->email }}</td>
                                <td>{{ $item->photo }}</td>
                                <td>{{ $item->is_activated }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
    </div>
@endsection