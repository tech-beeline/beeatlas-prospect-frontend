import { IAuthProvider } from '../types';

import { beelineAuthProvider } from './beeline';
import { oidcAuthProvider } from './oidc';

export const getAuthProvider = (): IAuthProvider =>
    window.FEATURE_FLAGS.FLAG_IS_DEMO_STAND ? oidcAuthProvider : beelineAuthProvider;
