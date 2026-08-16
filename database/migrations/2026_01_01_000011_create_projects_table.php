<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('short_description')->nullable();
            $table->longText('description')->nullable();
            $table->longText('challenge')->nullable();
            $table->longText('solution')->nullable();
            $table->longText('results')->nullable();
            $table->json('features')->nullable();       // ["Feature 1", "Feature 2"]
            $table->json('technologies')->nullable();   // ["Flutter", "Laravel"]
            $table->string('category')->default('mobile'); // mobile, web, backend
            $table->string('github_url')->nullable();
            $table->string('demo_url')->nullable();
            $table->string('cover_image')->nullable();
            $table->boolean('featured')->default(false);
            $table->enum('status', ['draft', 'published'])->default('draft');
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
