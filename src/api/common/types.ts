export type UnitsType = 'standard'|'metric'|'imperial'
export type Language = 'ru'|'en'

/* eslint-disable camelcase */
export interface Geo {
    name: string
    lat: number
    lon: number
    country: string
    local_names?: {
        [key in Language|'ascii'|'feature_name']?: string
    }
    state?: string
}
/* eslint-enable camelcase */
