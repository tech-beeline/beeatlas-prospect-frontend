import { Key } from 'react';
import { Path } from 'react-router-dom';

export interface ILocation extends Path {
    state: unknown;
    key: Key;
}
