<?php

require __DIR__ . '/../vendor/autoload.php';

$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$data = [
    'settings'    => App\Models\Setting::all()->toArray(),
    'skills'      => App\Models\Skill::all()->toArray(),
    'services'    => App\Models\Service::all()->toArray(),
    'experiences' => App\Models\Experience::all()->toArray(),
    'projects'    => App\Models\Project::all()->toArray(),
];

file_put_contents(
    __DIR__ . '/../database/backup.json',
    json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
);

echo "✅ Exported successfully!\n";
echo "Settings: " . count($data['settings']) . "\n";
echo "Skills: " . count($data['skills']) . "\n";
echo "Services: " . count($data['services']) . "\n";
echo "Experiences: " . count($data['experiences']) . "\n";
echo "Projects: " . count($data['projects']) . "\n";
