/**
 * TomSelect factory functions for creating consistent dropdown configurations.
 * Reduces duplication across form components.
 */

import TomSelect from 'tom-select';
import type { SelectOption } from '../utils/value-map';

export interface SelectConfig<T extends object = { text: string }> {
    selector: string;
    options: SelectOption<T>[];
    labelField?: string;
    searchField?: string[];
    sortField?: string;
    plugins?: string[];
    maxItems?: number;
    create?: boolean;
    duplicates?: boolean;
    hideSelected?: boolean;
    optgroups?: Array<{ value: string; label: string }>;
    optgroupField?: string;
    onItemAdd?: (value: string, item: HTMLElement) => void;
    createFilter?: (input: string) => boolean;
}

/**
 * Create a basic TomSelect instance with common defaults.
 */
export function createSelect<T extends object = { text: string }>(
    config: SelectConfig<T>
): TomSelect {
    const { selector, options, ...rest } = config;
    return new TomSelect(selector, {
        labelField: rest.labelField ?? 'text',
        searchField: rest.searchField ?? ['text'],
        options,
        ...rest,
    });
}

/**
 * Create a glyph select with drag-drop, duplicate support, and custom creation.
 */
export function createGlyphSelect(
    selector: string,
    options: SelectOption[]
): TomSelect {
    const select = new TomSelect(selector, {
        labelField: 'text',
        searchField: ['text'],
        sortField: 'text',
        options,
        plugins: ['drag_drop', 'caret_position', 'remove_button'],
        create: true,
        hideSelected: false,
        duplicates: true,
        onItemAdd: (_value: string, _item: HTMLElement) => {
            select.setTextboxValue('');
            select.refreshOptions();
        },
        createFilter: function(this: TomSelect, input: string) {
            return !(input.toLowerCase() in (this.options || []));
        }
    });
    return select;
}

/**
 * Create a category select with optgroups for combat/other.
 */
export function createCategorySelect(
    selector: string,
    options: SelectOption<{ class: string; text: string }>[]
): TomSelect {
    return new TomSelect(selector, {
        optgroups: [
            { value: 'combat', label: 'Combat' },
            { value: 'other', label: 'Other' },
        ],
        optgroupField: 'class',
        labelField: 'text',
        searchField: ['text'],
        options,
        maxItems: 1,
    });
}

/**
 * Create an addon select with creation support.
 */
export function createAddonSelect(
    selector: string,
    options: SelectOption[]
): TomSelect {
    return new TomSelect(selector, {
        labelField: 'text',
        searchField: ['text'],
        options,
        create: true,
    });
}

/**
 * Create a version select.
 */
export function createVersionSelect(
    selector: string,
    options: SelectOption<object>[]
): TomSelect {
    return new TomSelect(selector, {
        labelField: 'value',
        searchField: ['value'],
        options,
    });
}
