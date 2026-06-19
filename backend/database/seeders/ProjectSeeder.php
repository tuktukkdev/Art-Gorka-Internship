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
                'image' => 'projects/project-1.jpg',
                'industry' => 'retail',
                'project_type' => 'online-store',
                'platform' => 'Wordpress',
                'status' => 'Завершено',
                'description' => 'Полноценный интернет-магазин с интеграцией 1С, онлайн-оплатой и системой лояльности. Разработан на WordPress с кастомной темой. Включает фильтрацию по размеру, цвету и бренду, быстрый просмотр товаров и автоматическую выгрузку остатков из 1С.',
                'stack' => json_encode(['WordPress', 'WooCommerce', '1С Интеграция', 'UI/UX дизайн']),
            ],
            [
                'title' => 'Магазин продажи одежды',
                'url' => 'https://clothes-shop.ru',
                'image' => 'projects/project-2.jpg',
                'industry' => 'retail',
                'project_type' => 'online-store',
                'platform' => 'Bitrix',
                'status' => 'Завершено',
                'description' => 'Корпоративный сайт с каталогом товаров на 1С-Битрикс. Реализована интеграция с CRM, онлайн-заказ и система скидок. Адаптивный дизайн для мобильных устройств.',
                'stack' => json_encode(['1С-Битрикс', 'PHP', 'MySQL', 'Интеграция CRM']),
            ],
            [
                'title' => 'Сайт создания портфолио',
                'url' => 'https://portfolio.ru',
                'image' => 'projects/project-3.jpg',
                'industry' => 'education',
                'project_type' => 'landing',
                'platform' => 'Кастомная платформа',
                'status' => 'В разработке',
                'description' => 'Платформа для создания анимированных портфолио с возможностью добавления проектов, навыков и контактов. Интуитивный интерфейс для пользователей без навыков программирования.',
                'stack' => json_encode(['React.js', 'Laravel', 'PostgreSQL', 'Framer Motion']),
            ],
            [
                'title' => 'Сайт пекарни',
                'url' => 'https://meal.ru',
                'image' => 'projects/project-4.jpg',
                'industry' => 'horeca',
                'project_type' => 'landing',
                'platform' => 'Wordpress',
                'status' => 'Поддержка',
                'description' => 'Интернет-магазин свежей выпечки с доставкой по городу. Настроена онлайн-оплата, система лояльности и интеграция с соцсетями. Регулярное обновление ассортимента.',
                'stack' => json_encode(['WordPress', 'WooCommerce', 'SEO', 'Контент-менеджмент']),
            ],
            [
                'title' => 'Интернет-магазин книг Book',
                'url' => 'https://book.ru',
                'image' => 'projects/project-5.jpg',
                'industry' => 'education',
                'project_type' => 'online-store',
                'platform' => 'Кастомная платформа',
                'status' => 'В разработке',
                'description' => 'Книжный магазин с рекомендательной системой и отзывами. Пользователи могут создавать списки желаний, сохранять избранное и получать персонализированные рекомендации на основе покупок.',
                'stack' => json_encode(['Vue.js', 'Laravel', 'PostgreSQL', 'AI Рекомендации']),
            ],
            [
                'title' => 'Клининг сервис',
                'url' => 'https://cleaning.ru',
                'image' => 'projects/project-6.jpg',
                'industry' => 'manufacturing',
                'project_type' => 'corporate-site',
                'platform' => 'Bitrix',
                'status' => 'Завершено',
                'description' => 'Сайт клининговой компании с онлайн-записью, калькулятором стоимости и личным кабинетом клиента. Автоматическая система уведомлений и напоминаний.',
                'stack' => json_encode(['1С-Битрикс', 'PHP', 'JavaScript', 'Интеграция с CRM']),
            ],
            [
                'title' => 'Яндекс',
                'url' => 'https://yandex.ru',
                'image' => 'projects/project-7.jpg',
                'industry' => 'retail',
                'project_type' => 'corporate-site',
                'platform' => 'Кастомная платформа',
                'status' => 'Завершено',
                'description' => 'Поисковая система с экосистемой сервисов: почта, карты, маркетплейс. Высокая нагрузка, отказоустойчивость, распределённые системы. Многолетний опыт разработки.',
                'stack' => json_encode(['Go', 'Python', 'React.js', 'PostgreSQL', 'Redis']),
            ],
            [
                'title' => 'Сайт зарубежных книг',
                'url' => 'https://foreign-books.ru',
                'image' => 'projects/project-8.jpg',
                'industry' => 'education',
                'project_type' => 'online-store',
                'platform' => 'Кастомная платформа',
                'status' => 'Архивировано',
                'description' => 'Магазин книг на иностранных языках с доставкой по всему миру. Настроена интеграция с международными платёжными системами и системами доставки.',
                'stack' => json_encode(['Laravel', 'Vue.js', 'PostgreSQL', 'Stripe API']),
            ],
            [
                'title' => 'Сайт для бронирования коттеджей',
                'url' => 'https://cottage-booking.ru',
                'image' => 'projects/project-9.jpg',
                'industry' => 'travel',
                'project_type' => 'corporate-site',
                'platform' => 'Bitrix',
                'status' => 'Поддержка',
                'description' => 'Платформа для аренды загородных домов с онлайн-бронированием, системой отзывов и интеграцией с картами. Автоматическая проверка доступности.',
                'stack' => json_encode(['1С-Битрикс', 'PHP', 'PostgreSQL', 'API Интеграция']),
            ],
            [
                'title' => 'Сайт по продаже пиротехники',
                'url' => 'https://fireworks-shop.ru',
                'image' => 'projects/project-10.jpg',
                'industry' => 'manufacturing',
                'project_type' => 'online-store',
                'platform' => 'Другое',
                'status' => 'Завершено',
                'description' => 'Интернет-магазин пиротехники с доставкой по всей России. Реализована возрастная проверка, интеграция с платёжными системами и система доставки СДЭК.',
                'stack' => json_encode(['Custom PHP', 'MySQL', 'JavaScript', 'Интеграция СДЭК']),
            ],
        ];

        foreach ($projects as $project) {
            Project::create($project);
        }
    }
}