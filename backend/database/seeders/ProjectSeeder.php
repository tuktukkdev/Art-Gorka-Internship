<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    private const array IMAGES = [
        'projects/category_card_corporative.jpg',
        'projects/category_card_landings.jpg',
    ];

    private function img(): string
    {
        return self::IMAGES[array_rand(self::IMAGES)];
    }

    public function run(): void
    {
        $projects = [
            [
                'title'        => 'Интернет-магазин кроссовок',
                'url'          => 'https://sneakershop.ru',
                'image'        => $this->img(),
                'industry'     => 'Розничная торговля',
                'project_type' => 'Интернет-магазин',
                'platform'     => 'Wordpress',
                'status'       => 'Завершено',
                'description'  => 'Интернет-магазин с интеграцией 1С и онлайн-оплатой.',
                'stack'        => ['Разработка сайта', 'Дизайн', 'SEO'],
            ],
            [
                'title'        => 'Корпоративный сайт строительной компании',
                'url'          => 'https://stroy-group.ru',
                'image'        => $this->img(),
                'industry'     => 'Строительство',
                'project_type' => 'Корпоративный сайт',
                'platform'     => 'Bitrix',
                'status'       => 'Поддержка',
                'description'  => 'Представительский сайт с каталогом проектов и формой тендерных заявок.',
                'stack'        => ['Разработка сайта', 'Дизайн', 'Обслуживание'],
            ],
            [
                'title'        => 'Лендинг для студии маникюра',
                'url'          => 'https://nailstudio.ru',
                'image'        => $this->img(),
                'industry'     => 'Красота и уход',
                'project_type' => 'Лендинг',
                'platform'     => 'Кастомная платформа',
                'status'       => 'Завершено',
                'description'  => 'Продающий лендинг с онлайн-записью и галереей работ мастеров.',
                'stack'        => ['Дизайн', 'Разработка сайта', 'SMM'],
            ],
            [
                'title'        => 'Интернет-магазин косметики',
                'url'          => 'https://beautystore.ru',
                'image'        => $this->img(),
                'industry'     => 'Красота и уход',
                'project_type' => 'Интернет-магазин',
                'platform'     => 'Wordpress',
                'status'       => 'Поддержка',
                'description'  => 'Каталог более 500 позиций с фильтрами подбора и личным кабинетом.',
                'stack'        => ['Разработка сайта', 'SEO', 'Контекстная реклама'],
            ],
            [
                'title'        => 'Сайт для бронирования коттеджей',
                'url'          => 'https://cottage-booking.ru',
                'image'        => $this->img(),
                'industry'     => 'Туризм',
                'project_type' => 'Корпоративный сайт',
                'platform'     => 'Bitrix',
                'status'       => 'В разработке',
                'description'  => 'Платформа для аренды загородных домов с онлайн-календарём.',
                'stack'        => ['Разработка сайта', 'Дизайн', 'Обслуживание'],
            ],
            [
                'title'        => 'Корпоративный сайт юридической компании',
                'url'          => 'https://legalgroup.ru',
                'image'        => $this->img(),
                'industry'     => 'Юридические услуги',
                'project_type' => 'Корпоративный сайт',
                'platform'     => 'Кастомная платформа',
                'status'       => 'Завершено',
                'description'  => 'Чистый дизайн, подача услуг и удобная форма обратной связи.',
                'stack'        => ['Дизайн', 'Разработка сайта', 'SEO'],
            ],
            [
                'title'        => 'Лендинг для онлайн-школы',
                'url'          => 'https://edupro.ru',
                'image'        => $this->img(),
                'industry'     => 'Образование',
                'project_type' => 'Лендинг',
                'platform'     => 'Wordpress',
                'status'       => 'Завершено',
                'description'  => 'Лендинг с описанием программ, отзывами и формой регистрации на пробный урок.',
                'stack'        => ['Дизайн', 'Разработка сайта', 'Контекстная реклама', 'SMM'],
            ],
            [
                'title'        => 'Корпоративный сайт производственной компании',
                'url'          => 'https://manufacture.ru',
                'image'        => $this->img(),
                'industry'     => 'Производство',
                'project_type' => 'Корпоративный сайт',
                'platform'     => 'Bitrix',
                'status'       => 'Поддержка',
                'description'  => 'Каталог продукции с техническими характеристиками и разделом для дистрибьюторов.',
                'stack'        => ['Разработка сайта', 'SEO', 'Обслуживание'],
            ],
            [
                'title'        => 'Лендинг для автосервиса',
                'url'          => 'https://autoservice.ru',
                'image'        => $this->img(),
                'industry'     => 'Автобизнес',
                'project_type' => 'Лендинг',
                'platform'     => 'Другое',
                'status'       => 'Архивировано',
                'description'  => 'Одностраничник с перечнем услуг, ценами и онлайн-записью.',
                'stack'        => ['Разработка сайта', 'Контекстная реклама'],
            ],
            [
                'title'        => 'Сайт фитнес-клуба',
                'url'          => 'https://fitness-club.ru',
                'image'        => $this->img(),
                'industry'     => 'Фитнес',
                'project_type' => 'Корпоративный сайт',
                'platform'     => 'Wordpress',
                'status'       => 'В разработке',
                'description'  => 'Сайт с расписанием тренировок, профилями тренеров и онлайн-оплатой абонементов.',
                'stack'        => ['Дизайн', 'Разработка сайта', 'SMM'],
            ],
        ];

        foreach ($projects as $data) {
            Project::create($data);
        }
    }
}
