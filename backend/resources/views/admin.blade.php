<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Админка | Art Gorka</title>
    @viteReactRefresh
    @vite(['resources/js/admin/main.jsx'])
</head>
<body>
    <div id="admin-root"></div>
</body>
</html>