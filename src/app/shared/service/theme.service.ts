import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

export type ThemePalette = 'green' | 'blue' | 'purple' | 'amber';
export type ThemeContrast = 'light' | 'dark' | 'high-contrast';
export interface ThemePreference {
  palette: ThemePalette;
  contrast: ThemeContrast;
}

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly palettes: ReadonlyArray<{ value: ThemePalette; label: string }> = [
    { value: 'green', label: 'Verde' }, { value: 'blue', label: 'Azul' },
    { value: 'purple', label: 'Roxo' }, { value: 'amber', label: 'Âmbar' }
  ];
  readonly contrasts: ReadonlyArray<{ value: ThemeContrast; label: string }> = [
    { value: 'light', label: 'Claro' }, { value: 'dark', label: 'Escuro' },
    { value: 'high-contrast', label: 'Alto contraste' }
  ];
  private preference: ThemePreference = { palette: 'blue', contrast: 'light' };

  get current(): Readonly<ThemePreference> {
    return this.preference;
  }

  constructor(@Inject(DOCUMENT) private document: Document) {
    try {
      const stored: unknown = JSON.parse(this.document.defaultView?.localStorage.getItem('marketplace.theme') ?? 'null');
      if (stored && typeof stored === 'object') {
        const candidate = stored as Partial<ThemePreference>;
        this.preference = {
          palette: this.palettes.find(option => option.value === candidate.palette)?.value ?? 'blue',
          contrast: this.contrasts.find(option => option.value === candidate.contrast)?.value ?? 'light'
        };
      }
    } catch {
      // Storage may be unavailable or contain an invalid preference.
    }
    this.apply();
  }

  setPalette(palette: ThemePalette): void {
    this.update({ ...this.preference, palette });
  }

  setContrast(contrast: ThemeContrast): void {
    this.update({ ...this.preference, contrast });
  }

  private update(preference: ThemePreference): void {
    this.preference = preference;
    this.apply();
    try {
      this.document.defaultView?.localStorage.setItem('marketplace.theme', JSON.stringify(preference));
    } catch {
      // Keep the selected theme usable even when persistence is blocked.
    }
  }

  private apply(): void {
    const { palette, contrast } = this.preference;
    this.document.documentElement.dataset['palette'] = palette;
    this.document.documentElement.dataset['contrast'] = contrast;
    const mode = contrast === 'light' ? 'light' : 'dark';
    this.document.getElementById('app-theme')?.setAttribute('href', `assets/themes/lara-${mode}-${palette}/theme.css`);
  }
}
