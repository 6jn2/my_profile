<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\ActivityLog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['بيانات الدخول غير صحيحة.'],
            ]);
        }

        // Only admin role allowed
        if ($user->role !== 'admin') {
            return response()->json(['message' => 'غير مصرح لك بالدخول.'], 403);
        }

        $token = $user->createToken('admin-token', ['admin'])->plainTextToken;

        ActivityLog::record('login', 'تسجيل دخول إلى لوحة التحكم');

        return response()->json([
            'token' => $token,
            'user'  => ['id' => $user->id, 'name' => $user->name, 'email' => $user->email],
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        ActivityLog::record('logout', 'تسجيل خروج من لوحة التحكم');
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'تم تسجيل الخروج بنجاح.']);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json(['user' => $request->user()]);
    }
}
