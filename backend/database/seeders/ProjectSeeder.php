<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            [
                'title' => 'Интернет-магазин хайповых кросовок',
                'url' => 'https://sneakershop.ru',
                'image' => '/images/projects/project-1.jpg',
                'industry' => 'retail',
                'project_type' => 'online-store',
                'platform' => 'wordpress',
                'status' => 'Завершено',
                'description' => 'Магазин с интеграцией 1С и онлайн-оплатой.',
                'stack' => json_encode(['UI/UX дизайн', 'Вёрстка', 'Интеграция 1С']),
            ],
            [
                'title' => 'Магазин продажи одежды',
                'url' => 'https://clothes-shop.ru',
                'image' => '/images/projects/project-2.jpg',
                'industry' => 'retail',
                'project_type' => 'online-store',
                'platform' => 'bitrix',
                'status' => 'Завершено',
                'description' => 'Интернет-магазин качественной одежды',
                'stack' => json_encode(['UI/UX дизайн', 'Разработка', 'Интеграция CRM']),
            ],
            [
                'title' => 'Сайт создания портфолио',
                'url' => 'https://portfolio.ru',
                'image' => '/images/projects/project-3.jpg',
                'industry' => 'education',
                'project_type' => 'landing',
                'platform' => 'custom',
                'status' => 'В разработке',
                'description' => 'Сайт для создания анимированных портфолио',
                'stack' => json_encode(['Дизайн', 'Вёрстка', 'Анимация']),
            ],
            [
                'title' => 'Сайт пекарни',
                'url' => 'https://meal.ru',
                'image' => '/images/projects/project-4.jpg',
                'industry' => 'horeca',
                'project_type' => 'landing',
                'platform' => 'wordpress',
                'status' => 'Поддержка',
                'description' => 'Интернет-магазин продажи свежей выпечки',
                'stack' => json_encode(['Вёрстка', 'WordPress', 'SEO']),
            ],
            [
                'title' => 'Интернет-магазин книг Book',
                'url' => 'https://book.ru',
                'image' => '/images/projects/project-1.jpg',
                'industry' => 'education',
                'project_type' => 'online-store',
                'platform' => 'custom',
                'status' => 'В разработке',
                'description' => 'Интернет-магазин по продаже эксклюзивных книг',
                'stack' => json_encode(['UI/UX дизайн', 'Разработка']),
            ],
            [
                'title' => 'Клининг сервис',
                'url' => 'https://cleaning.ru',
                'image' => '/images/projects/project-2.jpg',
                'industry' => 'manufacturing',
                'project_type' => 'corporate-site',
                'platform' => 'bitrix',
                'status' => 'Завершено',
                'description' => 'Клининг сервис',
                'stack' => json_encode(['Bitrix', 'Вёрстка']),
            ],
            [
                'title' => 'Яндекс',
                'url' => 'https://yandex.ru',
                'image' => '/images/projects/project-3.jpg',
                'industry' => 'retail',
                'project_type' => 'corporate-site',
                'platform' => 'custom',
                'status' => 'Завершено',
                'description' => 'Поисковая система',
                'stack' => json_encode(['UI/UX дизайн', 'Разработка', 'SEO']),
            ],
            [
                'title' => 'Сайт зарубежных книг',
                'url' => 'https://foreign-books.ru',
                'image' => '/images/projects/project-4.jpg',
                'industry' => 'education',
                'project_type' => 'online-store',
                'platform' => 'custom',
                'status' => 'Архивировано',
                'description' => 'Сайт по продаже книг на разных языках',
                'stack' => json_encode(['UI/UX дизайн', 'Вёрстка']),
            ],
            [
                'title' => 'Сайт для бронирования коттеджей',
                'url' => 'https://cottage-booking.ru',
                'image' => '/images/projects/project-1.jpg',
                'industry' => 'travel',
                'project_type' => 'corporate-site',
                'platform' => 'bitrix',
                'status' => 'Поддержка',
                'description' => 'Платформа для аренды загородных домов',
                'stack' => json_encode(['Bitrix', 'Вёрстка', 'Интеграция']),
            ],
            [
                'title' => 'Сайт по продаже пиротехники',
                'url' => 'https://fireworks-shop.ru',
                'image' => '/images/projects/project-2.jpg',
                'industry' => 'manufacturing',
                'project_type' => 'online-store',
                'platform' => 'other',
                'status' => 'Завершено',
                'description' => 'Магазин с доставкой пиротехники по всей России',
                'stack' => json_encode(['UI/UX дизайн', 'Разработка', 'Интеграция']),
            ],
        ];

        foreach ($projects as $project) {
            Project::create($project);
        }
    }
}