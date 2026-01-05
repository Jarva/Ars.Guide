import TomSelect from 'tom-select';
import { addons, categories, versions, glyphs, spellFormSchema } from '../../../utils/spell-form';
import { parseJsonSpell, parseCompressedSpell } from '../../../utils/spell-compendium/spell-parser';
import { glyphLookup } from '../../../lib/data/glyphs';
import type { SpellColor, SpellSound } from '../../../utils/spell-compendium/spells';

interface SpellData {
    name: string;
    glyphs: string[];
    spell_color?: SpellColor;
    spell_sound?: SpellSound;
    spell_style?: Record<string, unknown>;
}

let glyphSelect: TomSelect;
let addonSelect: TomSelect;

function createGlyphSelect(): TomSelect {
    return new TomSelect('#glyphs', {
        labelField: 'text',
        searchField: ['text'],
        sortField: 'text',
        options: glyphs,
        plugins: ['drag_drop', 'caret_position', 'remove_button'],
        create: true,
        hideSelected: false,
        duplicates: true,
        onItemAdd: () => {
            glyphSelect.setTextboxValue();
            glyphSelect.refreshOptions();
        },
        createFilter: function(input) {
            return !(input.toLowerCase() in (this.options || []));
        }
    });
}

function createCategorySelect(): TomSelect {
    return new TomSelect('#category', {
        optgroups: [
            { value: 'combat', label: 'Combat' },
            { value: 'other', label: 'Other' },
        ],
        optgroupField: 'class',
        labelField: 'text',
        searchField: ['text'],
        options: categories,
        maxItems: 1,
    });
}

function createAddonSelect(): TomSelect {
    return new TomSelect('#addons', {
        labelField: 'text',
        searchField: ['text'],
        options: addons,
        create: true
    });
}

function createVersionSelect(): TomSelect {
    return new TomSelect('#versions', {
        labelField: 'value',
        searchField: ['value'],
        options: versions
    });
}

function fillFormWithSpellData(data: SpellData): void {
    const { name, glyphs: glyphIds, spell_style } = data;
    const spellInput = document.getElementById('spell') as HTMLInputElement | null;
    const spellStyleInput = document.getElementById('style') as HTMLInputElement | null;

    if (spellInput) {
        spellInput.value = name;
    }

    if (glyphSelect) {
        glyphSelect.clear();
        glyphIds.forEach(g => {
            const glyph = glyphLookup[g];
            if (glyph) {
                glyphSelect.addItem(glyph.value, true);
                if (!addonSelect.items.some(item => item === glyph.source)) {
                    addonSelect.addItem(glyph.source, true);
                }
            }
        });
    }

    spellInput?.dispatchEvent(new Event('blur'));

    if (spell_style && spellStyleInput) {
        spellStyleInput.value = JSON.stringify(spell_style);
    }
}

async function handleClipboardImport(): Promise<void> {
    try {
        const clipboardText = await navigator.clipboard.readText();
        let spellData: SpellData | null = null;

        if (clipboardText.trim().startsWith('{')) {
            spellData = parseJsonSpell(clipboardText);
        } else {
            spellData = parseCompressedSpell(clipboardText);
        }

        if (!spellData) {
            alert('Failed to parse spell from clipboard.');
            console.error(clipboardText);
            return;
        }

        console.log('Spell data from clipboard:', spellData);
        fillFormWithSpellData(spellData);
    } catch (err) {
        console.error('Clipboard read failed:', err);
        alert('Could not read from clipboard.');
    }
}

function setupInputValidation(): void {
    const inputs = document.querySelectorAll('#spellForm input');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if ((input as HTMLInputElement).checkValidity()) {
                input.classList.add('is-valid');
                input.classList.remove('is-invalid');
            } else {
                input.classList.remove('is-valid');
                input.classList.add('is-invalid');
            }
        }, false);
    });
}

function setupFormSubmission(): void {
    const form = document.getElementById('spellForm');
    form?.addEventListener('submit', (event) => {
        form.classList.add('was-validated');
        if (!(form as HTMLFormElement).checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        const formData = new FormData(form as HTMLFormElement);
        const parsed = spellFormSchema.safeParse(formData);
        if (!parsed.success) {
            event.preventDefault();
            event.stopPropagation();
        }
    }, false);
}

export function initSpellForm(): void {
    glyphSelect = createGlyphSelect();
    createCategorySelect();
    addonSelect = createAddonSelect();
    createVersionSelect();

    document.getElementById('importClipboardBtn')?.addEventListener('click', handleClipboardImport);
    setupInputValidation();
    setupFormSubmission();
}
