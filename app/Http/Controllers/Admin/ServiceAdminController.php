<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\ActivityLog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ServiceAdminController extends Controller
{
    public function index(): JsonResponse { return response()->json(['data' => Service::orderBy('sort_order')->get()]); }

    public function store(Request $request): JsonResponse
    {
        $service = Service::create($request->validate(['title'=>'required','description'=>'nullable','icon'=>'nullable','number'=>'nullable','is_featured'=>'boolean','sort_order'=>'integer','is_active'=>'boolean']));
        ActivityLog::record('create', "إضافة خدمة: {$service->title}", $service);
        return response()->json(['data' => $service], 201);
    }

    public function update(Request $request, Service $service): JsonResponse
    {
        $service->update($request->all());
        ActivityLog::record('update', "تعديل خدمة: {$service->title}", $service);
        return response()->json(['data' => $service]);
    }

    public function destroy(Service $service): JsonResponse { $n=$service->title; $service->delete(); ActivityLog::record('delete',"حذف خدمة: $n"); return response()->json(['message'=>'تم الحذف.']); }
}
