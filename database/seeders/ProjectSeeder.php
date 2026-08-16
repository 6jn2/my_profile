<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\ProjectMedia;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            [
                'title'             => 'CareCar',
                'slug'              => 'carecar',
                'short_description' => 'تطبيق يربط أصحاب السيارات بمقدمي خدمات السيارات.',
                'description'       => 'CareCar هو تطبيق موبايل متكامل يربط أصحاب السيارات بمقدمي خدمات السيارات بشكل سريع وسهل. يتيح للمستخدمين البحث عن مزودي الخدمات، عرض التفاصيل، حجز المواعيد، وتقييم الخدمة بعد الانتهاء.',
                'challenge'         => 'التحدي الرئيسي كان في بناء نظام حجز ديناميكي مع إدارة الحالات المختلفة للطلبات والإشعارات الفورية.',
                'solution'          => 'استخدمنا Flutter لبناء واجهة مستخدم سلسة وتفاعلية، مع Laravel API للـBackend وFirebase للإشعارات الفورية وإدارة الصور.',
                'results'           => 'تطبيق سريع ومتجاوب مع تجربة مستخدم ممتازة يربط بين الطرفين بكل سهولة.',
                'features'          => ['البحث عن مقدمي الخدمات','تصنيف الخدمات','حجز موعد','معلومات مقدم الخدمة','التقييم والمراجعات','الموقع الجغرافي','رفع الصور','إدارة الطلبات'],
                'technologies'      => ['Flutter', 'Dart', 'Laravel', 'MySQL', 'Firebase', 'REST API', 'Google Maps'],
                'category'          => 'mobile',
                'github_url'        => null,
                'demo_url'          => null,
                'featured'          => true,
                'status'            => 'published',
                'sort_order'        => 1,
            ],
            [
                'title'             => 'Dental Clinic Accounting System',
                'slug'              => 'dental-clinic-accounting',
                'short_description' => 'نظام محاسبي متكامل لإدارة عيادة الأسنان.',
                'description'       => 'نظام محاسبي شامل مصمم خصيصاً لعيادات الأسنان. يوفر إدارة كاملة للمرضى والحسابات والتقارير المالية.',
                'challenge'         => 'بناء نظام محاسبي دقيق يتعامل مع تعقيدات إدارة العيادة والحسابات.',
                'solution'          => 'تصميم واجهة مستخدم بسيطة مع Flutter مع قاعدة بيانات MySQL منظمة لإدارة جميع العمليات.',
                'results'           => 'نظام دقيق وموثوق يوفر تقارير مالية فورية.',
                'features'          => ['إدارة الحسابات','تسجيل العمليات','إدارة بيانات المرضى','تقارير مالية شاملة','إدارة المواعيد','الحسابات المالية التفصيلية'],
                'technologies'      => ['Flutter', 'Dart', 'MySQL', 'REST API'],
                'category'          => 'mobile',
                'github_url'        => null,
                'demo_url'          => null,
                'featured'          => true,
                'status'            => 'published',
                'sort_order'        => 2,
            ],
            [
                'title'             => 'Small Shop Accounting App',
                'slug'              => 'small-shop-accounting',
                'short_description' => 'تطبيق إدارة حسابات للمحلات التجارية الصغيرة.',
                'description'       => 'تطبيق موبايل مصمم لأصحاب المحلات الصغيرة لإدارة حساباتهم بشكل بسيط وفعال. يتيح تسجيل المبيعات، المشتريات، المصروفات ومتابعة الأرباح اليومية.',
                'challenge'         => 'تصميم تجربة مستخدم بسيطة جداً تناسب أصحاب المحلات الذين ليس لديهم خبرة تقنية.',
                'solution'          => 'واجهة مبسطة مع تصميم بديهي يمكن لأي شخص استخدامه بسهولة.',
                'results'           => 'تطبيق سهل الاستخدام يوفر للمحل صاحبه رؤية واضحة لوضعه المالي.',
                'features'          => ['تسجيل المبيعات','تسجيل المشتريات','الحسابات اليومية','تتبع المصروفات','حساب الأرباح','متابعة جميع العمليات'],
                'technologies'      => ['Flutter', 'Dart', 'MySQL'],
                'category'          => 'mobile',
                'github_url'        => null,
                'demo_url'          => null,
                'featured'          => false,
                'status'            => 'published',
                'sort_order'        => 3,
            ],
        ];

        foreach ($projects as $projectData) {
            Project::updateOrCreate(['slug' => $projectData['slug']], $projectData);
        }
    }
}
