<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MessageAdminController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Message::latest();
        if ($request->status) $query->where('status', $request->status);
        if ($request->search) $query->where(fn($q) => $q->where('name','like',"%{$request->search}%")->orWhere('email','like',"%{$request->search}%")->orWhere('subject','like',"%{$request->search}%"));
        return response()->json(['data' => $query->paginate(20)]);
    }

    public function show(Message $message): JsonResponse
    {
        if ($message->status === 'unread') $message->update(['status' => 'read']);
        return response()->json(['data' => $message]);
    }

    public function updateStatus(Request $request, Message $message): JsonResponse
    {
        $message->update($request->validate(['status' => 'required|in:unread,read,replied,archived']));
        return response()->json(['data' => $message]);
    }

    public function destroy(Message $message): JsonResponse { $message->delete(); return response()->json(['message'=>'تم الحذف.']); }
}
