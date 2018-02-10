
import * as camelCase from 'camelcase';

export function normalizeCamelCase (key: string): string {
    let properties = key.split('.');

    for (var prop in properties) 
      properties[prop] = camelCase(properties[prop]);

    return properties.join('.');
}