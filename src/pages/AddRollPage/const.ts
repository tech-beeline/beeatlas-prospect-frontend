export const uneditableNameRoles = new Set(
    [
        'Administrator',
        'ProductOwner',
        'ProductTeamAnalystArchitect',
        'ProductTeamMember',
        'EnterpriseArchitect',
        'ITManager',
        'DomainOwner',
    ].map((item) => item.toLowerCase()),
);

export const uneditablePermissionsRoles = new Set(
    ['Administrator', 'Employee'].map((item) => item.toLowerCase()),
);
