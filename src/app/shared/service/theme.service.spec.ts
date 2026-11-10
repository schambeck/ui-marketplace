import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let document: Document;
  let storage: jasmine.SpyObj<Storage>;

  beforeEach(() => {
    document = window.document.implementation.createHTMLDocument();
    const link = document.createElement('link');
    link.id = 'app-theme';
    document.head.appendChild(link);
    storage = jasmine.createSpyObj<Storage>('Storage', ['getItem', 'setItem']);
    Object.defineProperty(document, 'defaultView', { value: { localStorage: storage } });
  });

  it('defaults to blue/light without a saved preference', () => {
    const service = new ThemeService(document);
    expect(service.current).toEqual({ palette: 'blue', contrast: 'light' });
    expect(document.documentElement.dataset['contrast']).toBe('light');
  });

  it('restores a saved palette and contrast', () => {
    storage.getItem.and.returnValue('{"palette":"purple","contrast":"dark"}');
    const service = new ThemeService(document);
    expect(service.current).toEqual({ palette: 'purple', contrast: 'dark' });
    expect(document.documentElement.dataset['palette']).toBe('purple');
    expect(document.getElementById('app-theme')?.getAttribute('href')).toBe('assets/themes/lara-dark-purple/theme.css');
  });

  it('persists changes independently and restores them in a new instance', () => {
    const service = new ThemeService(document);
    service.setPalette('amber');
    service.setContrast('high-contrast');
    const saved = storage.setItem.calls.mostRecent().args;
    expect(saved).toEqual(['marketplace.theme', '{"palette":"amber","contrast":"high-contrast"}']);
    storage.getItem.and.returnValue(saved[1]);
    expect(new ThemeService(document).current).toEqual(service.current);
    expect(document.getElementById('app-theme')?.getAttribute('href')).toBe('assets/themes/lara-dark-amber/theme.css');
  });

  it('supports all twelve combinations', () => {
    const service = new ThemeService(document);
    for (const palette of service.palettes) {
      for (const contrast of service.contrasts) {
        service.setPalette(palette.value);
        service.setContrast(contrast.value);
        expect(document.documentElement.dataset['palette']).toBe(palette.value);
        expect(document.documentElement.dataset['contrast']).toBe(contrast.value);
      }
    }
  });

  it('recovers from malformed storage and validates each saved option', () => {
    for (const invalid of ['{', 'null', '42', '[]', '{"palette":"red","contrast":"sepia"}']) {
      storage.getItem.and.returnValue(invalid);
      expect(new ThemeService(document).current).toEqual({ palette: 'blue', contrast: 'light' });
    }
    storage.getItem.and.returnValue('{"palette":"green","contrast":"invalid"}');
    expect(new ThemeService(document).current).toEqual({ palette: 'green', contrast: 'light' });
  });

  it('still applies changes when browser storage is blocked', () => {
    storage.getItem.and.throwError('Storage blocked');
    storage.setItem.and.throwError('Storage blocked');
    const service = new ThemeService(document);
    expect(() => service.setContrast('dark')).not.toThrow();
    expect(document.documentElement.dataset['contrast']).toBe('dark');
  });
});
