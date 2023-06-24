<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <style>

    </style>

    <title>Admin panel</title>
</head>
<body>
    <style>
        * {
            box-sizing: border-box;
            padding: 0;
            margin: 0;
            text-decoration: none;
            outline: none;
            background-color: transparent;
            color: rgb(243, 243, 243);
            border: none;
            font-size: 18px;
            font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        }
        body {
            background-color: #0a0a0a;
        }
        a {
            color: rgb(243, 243, 243);
        }
        a:hover {
            color: slateblue;
        }
        /*page*/
        .page {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            width: 100%;
            padding: 5%;
        }
        h2 {
            font-size: 22px;
        }
        form {
            display: flex;
            justify-content: center;
            align-items: start;
            flex-direction: column;
            width: 100%;
            max-width: 400px;
            padding: 4% ;
            background-color: rgb(254,254,254,.05);
            border-radius: 10px;
            row-gap: 10px;
        }
        input, textarea {
            width: 100%;
            background-color: rgb(243, 243, 243, .1);
            padding: 10px;
            border-radius: 10px;
            transition: all .3s linear;
        }
        input:hover {
            background-color: rgb(106, 90, 205, .1);
        }
        input:focus {
            background-color: rgb(106, 90, 205, .3);
        }
        .btn {
            border: 2px solid rgb(243, 243, 243);
            padding: 6px 10px;
            border-radius: 10px;
            transition: all .3s linear;
        }
        .btn:hover {
            border-color: slateblue;
            color: slateblue;
            cursor: pointer;
        }
        .page__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            margin-bottom: 10px;
        }
        table {
            width: 100%;
            min-width: 100%;
            border: 2px solid rgb(243, 243, 243);
        }
        td {
            padding: 10px;
            text-align: center;
            border: 1px solid rgb(243, 243, 243)
        }
    </style>
    @yield('content')
</body>
</html>