<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Вход | Art Gorka Admin</title>
    <style>
        @font-face {
            font-family: 'Gilroy';
            src: url('{{ asset('build/assets/Gilroy-Semibold.woff2') }}') format('woff2');
            font-weight: 600;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #F4F5F9;
            font-family: system-ui, -apple-system, sans-serif;
            color: #424C5C;
        }

        .card {
            background: #fff;
            border: 1px solid rgba(66,76,92,.12);
            border-radius: 6px;
            padding: 48px 40px;
            width: 100%;
            max-width: 400px;
            box-shadow: 0 4px 32px rgba(66,76,92,.1);
        }

        .logo {
            font-family: 'Gilroy', system-ui, sans-serif;
            font-weight: 600;
            font-size: 26px;
            color: #696FE5;
            letter-spacing: -.5px;
            margin-bottom: 8px;
        }

        .subtitle {
            font-size: 14px;
            color: #424C5C99;
            margin-bottom: 36px;
        }

        .field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }

        label {
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: .5px;
            color: #424C5C99;
        }

        input {
            padding: 11px 14px;
            border: 1px solid #CBCDF4;
            border-radius: 4px;
            font-size: 15px;
            color: #424C5C;
            outline: none;
            transition: border-color .2s, background .2s;
        }

        input:focus {
            border-color: #696FE5;
            background: #696FE50D;
        }

        input.error { border-color: #FF5555; background: #FF555533; }

        .error-msg {
            font-size: 12px;
            color: #FF5555;
            margin-top: 2px;
        }

        .btn {
            width: 100%;
            padding: 12px;
            background: #696FE5;
            color: #fff;
            border: none;
            border-radius: 4px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            transition: background .2s;
            margin-top: 8px;
        }

        .btn:hover { background: #5356AE; }

        .lockout {
            margin-top: 16px;
            padding: 10px 14px;
            background: #FF555533;
            border: 1px solid #FF5555;
            border-radius: 4px;
            font-size: 13px;
            color: #FF5555;
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="logo">Art Gorka</div>
        <div class="subtitle">Панель управления — вход</div>

        @if ($errors->has('login'))
            <div class="lockout">{{ $errors->first('login') }}</div>
        @endif

        <form method="POST" action="{{ route('admin.login.post') }}" style="margin-top: 24px">
            @csrf

            <div class="field">
                <label for="login">Логин</label>
                <input
                    id="login"
                    type="text"
                    name="login"
                    value="{{ old('login') }}"
                    autocomplete="username"
                    autofocus
                    class="{{ $errors->has('login') ? 'error' : '' }}"
                />
            </div>

            <div class="field">
                <label for="password">Пароль</label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    autocomplete="current-password"
                    class="{{ $errors->has('login') ? 'error' : '' }}"
                />
            </div>

            <button class="btn" type="submit">Войти</button>
        </form>
    </div>
</body>
</html>
