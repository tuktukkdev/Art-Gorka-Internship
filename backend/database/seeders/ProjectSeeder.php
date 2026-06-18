<?php
 
namespace Database\Seeders;
 
use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $projects = [
            [
                'title'       => 'Интернет-магазин хайповых кросовок',
                'url'         => 'https://shoe-store.ru',
                'platform'    => 'wordpress',
                'status'      => 'production',
                'description' => 'Магазин хайповых кросовок',
            ],
            [
                'title'       => 'Магазин продажи одежды',
                'url'         => 'https://clothes-shop.ru',
                'platform'    => 'bitrix',
                'status'      => 'production',
                'description' => 'Интернет магазин качесткенной одежды',
            ],
            [
                'title'       => 'Сайт создания портфолио',
                'url'         => 'https://portfolio.ru',
                'platform'    => 'custom',
                'status'      => 'production',
                'description' => 'Сайт для поздания анимированных портфолио',
            ],
            [
                'title'       => 'Сайт пекарни',
                'url'         => 'https://meal.ru',
                'platform'    => 'wordpress',
                'status'      => 'maintenance',
                'description' => 'Интернет магазин продажи свежей выпечки',
            ],
            [
                'title'       => 'Интернет магазин книг Book',
                'url'         => 'https://book.ru',
                'platform'    => 'custom',
                'status'      => 'development',
                'description' => 'Интернет магазин по продаже эксклюзивных книг',
            ],
            [
                'title'       => 'Клиненг сервис',
                'url'         => 'https://cleaning.ru',
                'platform'    => 'bitrix',
                'status'      => 'production',
                'description' => 'Клиненг сервис',
            ],
            [
                'title'       => 'Яндекс',
                'url'         => 'https://yandex.ru',
                'platform'    => 'custom',
                'status'      => 'production',
                'description' => 'Поисковая система'
            ],
            [
                'title'       => 'Сайт зарубежных книг',
                'url'         => 'https://foreign-books.ru',
                'platform'    => 'custom',
                'status'      => 'development',
                'description' => 'Сайт по прадаже книг на разных языках',
            ],
            [
                'title'       => 'Сайт для бронирования катоморанов',
                'url'         => 'https://catamarans.ru',
                'platform'    => 'bitrix',
                'status'      => 'maintenance',
                'description' => 'Сайт для бронирования катоморанов',
            ],
            [
                'title'       => 'Сайт по продаже продаже пиротехники',
                'url'         => 'https://pyrotechnics-product.ru',
                'platform'    => 'other',
                'status'      => 'production',
                'description' => null,
            ],
        ];

        Project::truncate();

        foreach ($projects as $project) {
            Project::create($project);
        }
 
        $this->command->info('Создано ' . count($projects) . ' проектов');
    }
}
