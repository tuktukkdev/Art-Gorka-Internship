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
            $table->string('url');
            $table->string('image')->nullable();
            $table->string('industry')->nullable();
            $table->string('project_type')->nullable();
            $table->enum('platform', ['Wordpress', 'Bitrix', 'Кастомная платформа', 'Другое']);
            $table->enum('status', ['В разработке', 'Завершено', 'Поддержка', 'Архивировано'])->default('В разработке');
            $table->text('description')->nullable();
            $table->json('stack')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};