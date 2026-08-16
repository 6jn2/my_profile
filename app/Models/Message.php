<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = ['name', 'email', 'phone', 'subject', 'message', 'status', 'ip_address', 'user_agent'];

    public function scopeUnread($query) { return $query->where('status', 'unread'); }
}
