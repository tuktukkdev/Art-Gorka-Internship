<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;

class AdminAuthController extends Controller
{
    private const MAX_ATTEMPTS = 5;
    private const DECAY_SECONDS = 60;

    public function showLogin()
    {
        if (Auth::guard('admin')->check()) {
            return redirect('/admin');
        }

        return view('admin-login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'login'    => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);

        $key = 'admin-login:' . Str::lower($request->input('login')) . '|' . $request->ip();

        if (RateLimiter::tooManyAttempts($key, self::MAX_ATTEMPTS)) {
            $seconds = RateLimiter::availableIn($key);

            return back()->withErrors([
                'login' => "Слишком много попыток. Повторите через {$seconds} сек.",
            ])->withInput($request->only('login'));
        }

        $credentials = [
            'login'    => $request->input('login'),
            'password' => $request->input('password'),
        ];

        if (!Auth::guard('admin')->attempt($credentials, $request->boolean('remember'))) {
            RateLimiter::hit($key, self::DECAY_SECONDS);

            $remaining = self::MAX_ATTEMPTS - RateLimiter::attempts($key);

            return back()->withErrors([
                'login' => 'Неверный логин или пароль.' . ($remaining > 0 ? " Осталось попыток: {$remaining}." : ''),
            ])->withInput($request->only('login'));
        }

        RateLimiter::clear($key);
        $request->session()->regenerate();

        return redirect('/admin');
    }

    public function logout(Request $request)
    {
        Auth::guard('admin')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/admin/login');
    }
}
