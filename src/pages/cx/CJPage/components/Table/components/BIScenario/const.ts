import { Icons } from 'styles/design-tokens/js/iconfont';

export const stepTypeAvatarMap = {
    UserTask: { iconName: Icons.User, color: 'orange' },
    ServiceTask: { iconName: Icons.Settings, color: 'blue' },
} as const;
