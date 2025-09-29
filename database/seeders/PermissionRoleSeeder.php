<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;

class PermissionRoleSeeder extends Seeder
{
    public function run()
    {
        $all_permissions = Permission::all();

        // Get roles by title instead of assuming IDs
        $superadmin_role = Role::where('title', 'SuperAdmin')->first();
        $supervisor_role = Role::where('title', 'Supervisor')->first();
        $user_role = Role::where('title', 'User')->first();

        // SuperAdmin - Full access to everything
        if ($superadmin_role) {
            $superadmin_permissions = $all_permissions;
            $superadmin_role->permissions()->sync($superadmin_permissions->pluck('id'));
        }

        // Supervisor - All except settings and read-only user management
        if ($supervisor_role) {
            $supervisor_permissions = $all_permissions->filter(function ($permission) {
                // Exclude settings permissions
                if (str_contains($permission->title, 'settings_') ||
                    str_contains($permission->title, 'password_complexity_setup_') ||
                    str_contains($permission->title, 'audit_trail_')) {
                    return false;
                }

                // Exclude user management permissions (make them read-only)
                if (str_contains($permission->title, 'management_user_') ||
                    str_contains($permission->title, 'blocked_user_')) {
                    // Only allow access and show permissions for user management
                    return str_contains($permission->title, '_access') || str_contains($permission->title, '_show');
                }

                // Exclude system management permissions
                if (str_contains($permission->title, 'permission_') ||
                    str_contains($permission->title, 'role_')) {
                    return false;
                }

                return true;
            });
            $supervisor_role->permissions()->sync($supervisor_permissions->pluck('id'));
        }

        // User - All except user management and settings
        if ($user_role) {
            $user_permissions = $all_permissions->filter(function ($permission) {
                // Exclude user management permissions
                if (str_contains($permission->title, 'management_user_') ||
                    str_contains($permission->title, 'blocked_user_')) {
                    return false;
                }

                // Exclude settings permissions
                if (str_contains($permission->title, 'settings_') ||
                    str_contains($permission->title, 'password_complexity_setup_') ||
                    str_contains($permission->title, 'audit_trail_')) {
                    return false;
                }

                // Exclude system management permissions
                if (str_contains($permission->title, 'permission_') ||
                    str_contains($permission->title, 'role_')) {
                    return false;
                }

                return true;
            });
            $user_role->permissions()->sync($user_permissions->pluck('id'));
        }
    }
}
