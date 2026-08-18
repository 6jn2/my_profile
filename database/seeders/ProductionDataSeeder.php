<?php

namespace Database\Seeders;

use App\Models\Setting;
use App\Models\Skill;
use App\Models\Service;
use App\Models\Experience;
use App\Models\Project;
use Illuminate\Database\Seeder;

class ProductionDataSeeder extends Seeder
{
    public function run(): void
    {
        $backupPath = database_path('backup.json');

        if (!file_exists($backupPath)) {
            $this->command->warn('backup.json not found, skipping.');
            return;
        }

        $data = json_decode(file_get_contents($backupPath), true);

        // Settings
        if (!empty($data['settings'])) {
            foreach ($data['settings'] as $s) {
                Setting::updateOrCreate(['key' => $s['key']], ['value' => $s['value']]);
            }
            $this->command->info('✅ Settings: ' . count($data['settings']));
        }

        // Skills
        if (!empty($data['skills'])) {
            Skill::truncate();
            foreach ($data['skills'] as $row) {
                unset($row['id'], $row['created_at'], $row['updated_at']);
                Skill::create($row);
            }
            $this->command->info('✅ Skills: ' . count($data['skills']));
        }

        // Services
        if (!empty($data['services'])) {
            Service::truncate();
            foreach ($data['services'] as $row) {
                unset($row['id'], $row['created_at'], $row['updated_at']);
                Service::create($row);
            }
            $this->command->info('✅ Services: ' . count($data['services']));
        }

        // Experiences
        if (!empty($data['experiences'])) {
            Experience::truncate();
            foreach ($data['experiences'] as $row) {
                unset($row['id'], $row['created_at'], $row['updated_at']);
                Experience::create($row);
            }
            $this->command->info('✅ Experiences: ' . count($data['experiences']));
        }

        // Projects
        if (!empty($data['projects'])) {
            Project::truncate();
            foreach ($data['projects'] as $row) {
                unset($row['id'], $row['created_at'], $row['updated_at']);
                if (isset($row['technologies']) && is_string($row['technologies'])) {
                    $row['technologies'] = json_decode($row['technologies'], true);
                }
                if (isset($row['features']) && is_string($row['features'])) {
                    $row['features'] = json_decode($row['features'], true);
                }
                Project::create($row);
            }
            $this->command->info('✅ Projects: ' . count($data['projects']));
        }
    }
}
