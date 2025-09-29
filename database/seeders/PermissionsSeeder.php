<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Seeder;

class PermissionsSeeder extends Seeder
{
    public function run()
    {
        $permissions = [
            // User Management Permissions
            [
                'title' => 'management_user_access',
            ],
            [
                'title' => 'management_user_create',
            ],
            [
                'title' => 'management_user_edit',
            ],
            [
                'title' => 'management_user_show',
            ],
            [
                'title' => 'management_user_delete',
            ],
            [
                'title' => 'blocked_user_access',
            ],
            [
                'title' => 'blocked_user_create',
            ],
            [
                'title' => 'blocked_user_edit',
            ],
            [
                'title' => 'blocked_user_show',
            ],
            [
                'title' => 'blocked_user_delete',
            ],

            // Settings Permissions
            [
                'title' => 'settings_access',
            ],
            [
                'title' => 'password_complexity_setup_access',
            ],
            [
                'title' => 'password_complexity_setup_create',
            ],
            [
                'title' => 'password_complexity_setup_edit',
            ],
            [
                'title' => 'password_complexity_setup_show',
            ],
            [
                'title' => 'password_complexity_setup_delete',
            ],
            [
                'title' => 'audit_trail_access',
            ],
            [
                'title' => 'audit_trail_create',
            ],
            [
                'title' => 'audit_trail_edit',
            ],
            [
                'title' => 'audit_trail_show',
            ],
            [
                'title' => 'audit_trail_delete',
            ],

            // BIJPedia Permissions
            [
                'title' => 'bijpedia_access',
            ],

            // Financing Permissions
            [
                'title' => 'financing_access',
            ],
            [
                'title' => 'pengajuan_access',
            ],
            [
                'title' => 'pengajuan_create',
            ],
            [
                'title' => 'pengajuan_edit',
            ],
            [
                'title' => 'pengajuan_show',
            ],
            [
                'title' => 'pengajuan_delete',
            ],
            [
                'title' => 'analisa_access',
            ],
            [
                'title' => 'analisa_create',
            ],
            [
                'title' => 'analisa_edit',
            ],
            [
                'title' => 'analisa_show',
            ],
            [
                'title' => 'analisa_delete',
            ],
            [
                'title' => 'komite_access',
            ],
            [
                'title' => 'komite_create',
            ],
            [
                'title' => 'komite_edit',
            ],
            [
                'title' => 'komite_show',
            ],
            [
                'title' => 'komite_delete',
            ],
            [
                'title' => 'akad_access',
            ],
            [
                'title' => 'akad_create',
            ],
            [
                'title' => 'akad_edit',
            ],
            [
                'title' => 'akad_show',
            ],
            [
                'title' => 'akad_delete',
            ],
            [
                'title' => 'pencairan_access',
            ],
            [
                'title' => 'pencairan_create',
            ],
            [
                'title' => 'pencairan_edit',
            ],
            [
                'title' => 'pencairan_show',
            ],
            [
                'title' => 'pencairan_delete',
            ],
            [
                'title' => 'monitoring_access',
            ],
            [
                'title' => 'monitoring_create',
            ],
            [
                'title' => 'monitoring_edit',
            ],
            [
                'title' => 'monitoring_show',
            ],
            [
                'title' => 'monitoring_delete',
            ],
            [
                'title' => 'laporan_financing_access',
            ],
            [
                'title' => 'laporan_financing_create',
            ],
            [
                'title' => 'laporan_financing_edit',
            ],
            [
                'title' => 'laporan_financing_show',
            ],
            [
                'title' => 'laporan_financing_delete',
            ],

            // General Affair Permissions
            [
                'title' => 'general_affair_access',
            ],
            [
                'title' => 'general_affair_create',
            ],
            [
                'title' => 'general_affair_edit',
            ],
            [
                'title' => 'general_affair_show',
            ],
            [
                'title' => 'general_affair_delete',
            ],

            // Human Resource Permissions
            [
                'title' => 'human_resource_access',
            ],
            [
                'title' => 'human_resource_create',
            ],
            [
                'title' => 'human_resource_edit',
            ],
            [
                'title' => 'human_resource_show',
            ],
            [
                'title' => 'human_resource_delete',
            ],

            // Reporting Permissions
            [
                'title' => 'reporting_access',
            ],
            [
                'title' => 'reporting_create',
            ],
            [
                'title' => 'reporting_edit',
            ],
            [
                'title' => 'reporting_show',
            ],
            [
                'title' => 'reporting_delete',
            ],

            // Help Desk Permissions
            [
                'title' => 'help_desk_access',
            ],
            [
                'title' => 'help_desk_create',
            ],
            [
                'title' => 'help_desk_edit',
            ],
            [
                'title' => 'help_desk_show',
            ],
            [
                'title' => 'help_desk_delete',
            ],

            // Profile Permissions
            [
                'title' => 'profile_access',
            ],
            [
                'title' => 'profile_edit',
            ],
            [
                'title' => 'profile_password_edit',
            ],

            // System Management Permissions (for backward compatibility and system management)
            [
                'title' => 'permission_access',
            ],
            [
                'title' => 'permission_create',
            ],
            [
                'title' => 'permission_edit',
            ],
            [
                'title' => 'permission_show',
            ],
            [
                'title' => 'permission_delete',
            ],
            [
                'title' => 'role_access',
            ],
            [
                'title' => 'role_create',
            ],
            [
                'title' => 'role_edit',
            ],
            [
                'title' => 'role_show',
            ],
            [
                'title' => 'role_delete',
            ],
        ];

        Permission::insert($permissions);
    }
}
