<?php

return [
    'description' => [
        'user' => [
            'add' => '{performedByName} Added New User with Name {affectedRowName}',
            'update' => '{performedByName} Updated General Info for {affectedRowName} with changes {attributeChanges}',
            'create' => '{performedByName} Added New user with Name {affectedRowName} from Management User',
            'delete' => '{performedByName} Deleted User with Name {affectedRowName} from Management User',
            'password_update' => '{performedByName} changed the password on {affectedRowName}\'s profile',
            'master_application_update' => '{performedByName} updated Master Account for {affectedRowName} with changes {attributeChanges}',
            'reset_password' => '{performedByName} triggered a password reset for {affectedRowName}\'s profile',
        ],
        'password_complexity' => [
            'update' => '{performedByName} Updated Password Complexity',
        ],
        'audit_trail' => [
            'download' => '{performedByName} Downloaded Excel from Audit Trail',
        ],
        'auth' => [
            'login' => '{performedByName} Logged In to the system',
            'logout' => '{performedByName} Logged Out from the system',
            'login_failed' => '{descrpition}',
        ],
    ],
];
