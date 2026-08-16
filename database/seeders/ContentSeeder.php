<?php

namespace Database\Seeders;

use App\Models\Skill;
use App\Models\Service;
use App\Models\Experience;
use App\Models\Setting;
use Illuminate\Database\Seeder;

class ContentSeeder extends Seeder
{
    public function run(): void
    {
        // ── Skills ──────────────────────────────────────────────────────
        $skills = [
            ['name'=>'Flutter',           'category'=>'mobile',   'icon'=>'flutter',    'icon_color'=>'#54C5F8', 'level'=>90, 'sort_order'=>1],
            ['name'=>'Dart',              'category'=>'mobile',   'icon'=>'dart',       'icon_color'=>'#00B4AB', 'level'=>88, 'sort_order'=>2],
            ['name'=>'Mobile UI Design',  'category'=>'uiux',     'icon'=>'mobile',     'icon_color'=>'#A78BFA', 'level'=>85, 'sort_order'=>3],
            ['name'=>'Laravel',           'category'=>'backend',  'icon'=>'laravel',    'icon_color'=>'#FF2D20', 'level'=>75, 'sort_order'=>4],
            ['name'=>'REST API',          'category'=>'backend',  'icon'=>'api',        'icon_color'=>'#00D4FF', 'level'=>82, 'sort_order'=>5],
            ['name'=>'Firebase',          'category'=>'backend',  'icon'=>'firebase',   'icon_color'=>'#FFCA28', 'level'=>78, 'sort_order'=>6],
            ['name'=>'MySQL',             'category'=>'database', 'icon'=>'mysql',      'icon_color'=>'#00758F', 'level'=>76, 'sort_order'=>7],
            ['name'=>'Python',            'category'=>'backend',  'icon'=>'python',     'icon_color'=>'#3776AB', 'level'=>65, 'sort_order'=>8],
            ['name'=>'Git',              'category'=>'tools',    'icon'=>'git',        'icon_color'=>'#F05032', 'level'=>80, 'sort_order'=>9],
            ['name'=>'GitHub',            'category'=>'tools',    'icon'=>'github',     'icon_color'=>'#F0F0F0', 'level'=>82, 'sort_order'=>10],
            ['name'=>'UI/UX',             'category'=>'uiux',     'icon'=>'design',     'icon_color'=>'#EC4899', 'level'=>80, 'sort_order'=>11],
            ['name'=>'Responsive Design', 'category'=>'uiux',     'icon'=>'responsive', 'icon_color'=>'#8B5CF6', 'level'=>84, 'sort_order'=>12],
        ];
        foreach ($skills as $s) Skill::updateOrCreate(['name' => $s['name']], array_merge($s, ['is_active' => true]));

        // ── Services ────────────────────────────────────────────────────
        $services = [
            ['number'=>'01','title'=>'Flutter App Development',   'icon'=>'flutter',   'description'=>'تطوير تطبيقات موبايل احترافية وعالية الأداء لنظامي Android وiOS باستخدام Flutter وDart.','sort_order'=>1],
            ['number'=>'02','title'=>'Mobile UI Development',     'icon'=>'design',    'description'=>'تصميم وتطوير واجهات مستخدم حديثة وجذابة للتطبيقات مع تجربة مستخدم استثنائية.','sort_order'=>2],
            ['number'=>'03','title'=>'REST API Integration',      'icon'=>'api',       'description'=>'ربط التطبيقات بخدمات Backend وREST APIs بشكل آمن وفعال.','sort_order'=>3],
            ['number'=>'04','title'=>'Firebase Integration',      'icon'=>'firebase',  'description'=>'دمج Firebase في التطبيقات للمصادقة، قواعد البيانات، الإشعارات والتخزين.','sort_order'=>4],
            ['number'=>'05','title'=>'Database Integration',      'icon'=>'database',  'description'=>'تصميم وإدارة قواعد البيانات MySQL مع ربطها بالتطبيقات بشكل متكامل.','sort_order'=>5],
            ['number'=>'06','title'=>'Custom Business Apps',      'icon'=>'business',  'description'=>'تطوير تطبيقات مخصصة لإدارة الأعمال مثل نظم المحاسبة وإدارة المحلات والعيادات.','sort_order'=>6],
            ['number'=>'07','title'=>'UI/UX Implementation',      'icon'=>'uiux',      'description'=>'تحويل التصاميم إلى واجهات تطبيقات تفاعلية وسريعة الاستجابة.','sort_order'=>7],
        ];
        foreach ($services as $s) Service::updateOrCreate(['title' => $s['title']], array_merge($s, ['is_active' => true, 'is_featured' => false]));

        // ── Experiences ─────────────────────────────────────────────────
        $experiences = [
            ['title'=>'Information Technology – B.Sc.','organization'=>'National University – Ibb, Yemen','description'=>'دراسة تقنية المعلومات في الجامعة الوطنية بإب، اليمن. اكتساب أسس قوية في علوم الحاسوب والبرمجة وقواعد البيانات.','type'=>'education','start_date'=>'2020-09-01','end_date'=>null,'is_current'=>true,'sort_order'=>1],
            ['title'=>'تعلم Flutter وDart','organization'=>'Self-Learning','description'=>'بدأت رحلة تعلم Flutter وDart من الصفر وبنيت أسساً قوية في تطوير تطبيقات الموبايل. اجتزت العديد من الدورات والمشاريع التطبيقية.','type'=>'learning','start_date'=>'2022-01-01','end_date'=>'2022-12-31','is_current'=>false,'sort_order'=>2],
            ['title'=>'تطوير تطبيقات Mobile','organization'=>'Personal Projects','description'=>'بدأت تطوير تطبيقات Flutter عملية وحقيقية مع التركيز على تجربة المستخدم والأداء العالي.','type'=>'project','start_date'=>'2023-01-01','end_date'=>null,'is_current'=>true,'sort_order'=>3],
            ['title'=>'Laravel Backend Development','organization'=>'Self-Learning & Projects','description'=>'تعلم Laravel وبناء REST APIs احترافية لربطها بتطبيقات Flutter.','type'=>'learning','start_date'=>'2023-06-01','end_date'=>null,'is_current'=>true,'sort_order'=>4],
            ['title'=>'CareCar – Flutter App','organization'=>'Personal Project','description'=>'بناء تطبيق CareCar الذي يربط أصحاب السيارات بمقدمي الخدمات. باستخدام Flutter + Laravel + MySQL + Firebase.','type'=>'project','start_date'=>'2024-01-01','end_date'=>'2024-08-01','is_current'=>false,'sort_order'=>5],
            ['title'=>'Dental Clinic & Shop Accounting Apps','organization'=>'Personal Projects','description'=>'تطوير تطبيقات محاسبية لعيادة الأسنان والمحلات الصغيرة باستخدام Flutter وMySQL.','type'=>'project','start_date'=>'2025-01-01','end_date'=>null,'is_current'=>true,'sort_order'=>6],
        ];
        foreach ($experiences as $e) Experience::updateOrCreate(['title' => $e['title']], array_merge($e, ['is_active' => true]));

        // ── Settings ─────────────────────────────────────────────────────
        $settings = [
            // General
            ['key'=>'site_name',        'value'=>'Mohammed Mojib',         'type'=>'string', 'group'=>'general', 'label'=>'اسم الموقع'],
            ['key'=>'site_title',       'value'=>'Mohammed Mojib | Flutter Developer', 'type'=>'string', 'group'=>'general', 'label'=>'عنوان الموقع'],
            ['key'=>'hero_name_ar',     'value'=>'محمد مجيب',              'type'=>'string', 'group'=>'general', 'label'=>'الاسم بالعربية (Hero)'],
            ['key'=>'hero_name_en',     'value'=>'Mohammed Mojib',          'type'=>'string', 'group'=>'general', 'label'=>'الاسم بالإنجليزية (Hero)'],
            ['key'=>'hero_title',       'value'=>'Flutter Developer & Mobile App Developer', 'type'=>'string', 'group'=>'general', 'label'=>'المسمى الوظيفي'],
            ['key'=>'hero_description', 'value'=>'أقوم بتطوير تطبيقات موبايل حديثة وعالية الجودة باستخدام Flutter، مع بناء واجهات مستخدم احترافية وربط التطبيقات بـ APIs وFirebase وقواعد البيانات.', 'type'=>'text', 'group'=>'general', 'label'=>'وصف Hero'],
            ['key'=>'about_text',       'value'=>'أنا محمد مجيب نعمان مهيوب، مطور تطبيقات ومبرمج متخصص في Flutter وتطوير تطبيقات الهاتف. أهتم بتصميم واجهات مستخدم حديثة، وبناء تطبيقات عملية وقابلة للتوسع، وربط التطبيقات بخدمات Backend وREST APIs وقواعد البيانات.', 'type'=>'text', 'group'=>'general', 'label'=>'نص About'],
            ['key'=>'full_name',        'value'=>'Mohammed Mojib Numan Mahyoob', 'type'=>'string', 'group'=>'general', 'label'=>'الاسم الكامل'],
            ['key'=>'location',         'value'=>'Yemen',                   'type'=>'string', 'group'=>'general', 'label'=>'الموقع'],
            ['key'=>'education',        'value'=>'Information Technology',  'type'=>'string', 'group'=>'general', 'label'=>'التخصص'],
            ['key'=>'university',       'value'=>'National University – Ibb, Yemen', 'type'=>'string', 'group'=>'general', 'label'=>'الجامعة'],
            ['key'=>'stats_projects',   'value'=>'5',                       'type'=>'string', 'group'=>'general', 'label'=>'عدد المشاريع'],
            ['key'=>'stats_technologies','value'=>'12',                     'type'=>'string', 'group'=>'general', 'label'=>'عدد التقنيات'],
            ['key'=>'stats_years',      'value'=>'3',                       'type'=>'string', 'group'=>'general', 'label'=>'سنوات التعلم'],
            ['key'=>'stats_repos',      'value'=>'10+',                     'type'=>'string', 'group'=>'general', 'label'=>'GitHub Repos'],
            // Contact
            ['key'=>'email',            'value'=>'',                        'type'=>'string', 'group'=>'contact', 'label'=>'البريد الإلكتروني'],
            ['key'=>'phone',            'value'=>'',                        'type'=>'string', 'group'=>'contact', 'label'=>'رقم الهاتف'],
            ['key'=>'whatsapp',         'value'=>'',                        'type'=>'string', 'group'=>'contact', 'label'=>'WhatsApp'],
            // Social
            ['key'=>'github',           'value'=>'',                        'type'=>'string', 'group'=>'social',  'label'=>'GitHub URL'],
            ['key'=>'linkedin',         'value'=>'',                        'type'=>'string', 'group'=>'social',  'label'=>'LinkedIn URL'],
            // SEO
            ['key'=>'meta_description', 'value'=>'Professional Flutter Developer specializing in mobile app development, modern UI design, APIs, Firebase, Laravel and MySQL.', 'type'=>'text', 'group'=>'seo', 'label'=>'Meta Description'],
            ['key'=>'meta_keywords',    'value'=>'Flutter Developer, Mobile App Developer, Flutter Yemen, Mohammed Mojib', 'type'=>'string', 'group'=>'seo', 'label'=>'Keywords'],
        ];
        foreach ($settings as $s) Setting::updateOrCreate(['key' => $s['key']], $s);
    }
}
