import {QuickActionsComponent} from '../dashboard/quick-actions.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule, registerLocaleData} from '@angular/common';
import pt from '@angular/common/locales/pt';
import {RouterTestingModule} from '@angular/router/testing';
import {of, Subject} from 'rxjs';
import {HomeComponent} from './home.component';
import {DashboardService} from '../dashboard/dashboard.service';
import {KpiCardComponent} from '../dashboard/kpi-card.component';
import {OfferChartComponent} from '../dashboard/offer-chart.component';
import {DashboardSection} from '../dashboard/dashboard.model';

registerLocaleData(pt);
describe('HomeComponent dashboard', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let service: jasmine.SpyObj<DashboardService>;
  beforeEach(async () => {
    service = jasmine.createSpyObj('DashboardService', ['profile', 'load']);
    service.profile.and.returnValue('buyer');
    service.load.and.returnValue(of({metrics: [{id: 'orders', title: 'Meus pedidos', icon: 'pi-list', detail: 'Compras', route: '/orders', state: 'success', value: 0}], activities: [], activityState: 'success'}));
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, KpiCardComponent, OfferChartComponent, QuickActionsComponent],
      imports: [CommonModule, RouterTestingModule], providers: [{provide: DashboardService, useValue: service}]
    }).compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
  });
  it('renders zero and empty state, with buyer navigation only', () => {
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelector('app-dashboard-kpi strong')?.textContent).toBe('0');
    expect(element.textContent).toContain('Você ainda não possui pedidos');
    expect(element.querySelector('a[href="/orders"]')).toBeTruthy();
    expect(element.querySelector('a[href="/seller-applications"]')).toBeNull();
  });
  it('formats money and preserves server wall time without inventing order dates', () => {
    service.load.and.returnValue(of({metrics: [], activityState: 'success', activities: [{id: 'a', title: 'Pedido a', status: 'CREATED', amount: 1234.5, route: ['/orders', 'a']}]}));
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('1.234,50');
    expect(fixture.nativeElement.textContent).toContain('Data de criação não disponibilizada');
    expect(fixture.componentInstance.submittedDate('2026-11-10T15:04:22')).toBe('10/11/2026 às 15:04');
    expect(fixture.componentInstance.submittedDate('invalid')).toBe('Data não informada');
  });
  it('cancels obsolete requests on refresh and destroy', () => {
    const first = new Subject<DashboardSection>();
    const second = new Subject<DashboardSection>();
    service.load.and.returnValues(first, second);
    fixture.detectChanges();
    expect(first.observed).toBeTrue();
    fixture.componentInstance.refresh();
    expect(first.observed).toBeFalse();
    expect(second.observed).toBeTrue();
    fixture.destroy();
    expect(second.observed).toBeFalse();
  });
  it('fits real browser viewports at 375, 768, 1024 and 1440 pixels', async () => {
    service.profile.and.returnValue('seller');
    service.load.and.returnValue(of({metrics: ['DRAFT', 'PUBLISHED', 'PAUSED', 'RETIRED'].map(id => ({
      id, title: 'Ofertas publicadas', icon: 'pi-tags', detail: 'Suas ofertas • status de publicação',
      route: '/offer', state: 'success' as const, value: 1234
    }))}));
    fixture.detectChanges();
    for (const width of [375, 768, 1024, 1440]) {
      const frame = document.createElement('iframe');
      frame.style.cssText = `width:${width}px;height:1400px;border:0;position:absolute;left:0;top:0`;
      document.body.appendChild(frame);
      try {
        const target = frame.contentDocument!;
        document.querySelectorAll('style').forEach(style => target.head.appendChild(style.cloneNode(true)));
        target.body.style.margin = '0';
        const content = fixture.nativeElement.cloneNode(true) as HTMLElement;
        target.body.appendChild(content);
        await new Promise<void>(resolve => frame.contentWindow!.requestAnimationFrame(() => resolve()));
        expect(target.documentElement.scrollWidth).withContext(`overflow at ${width}px`).toBeLessThanOrEqual(width);
        const grid = content.querySelector('.analysis-grid')!;
        const columns = frame.contentWindow!.getComputedStyle(grid).gridTemplateColumns.split(' ').length;
        expect(columns).withContext(`chart columns at ${width}px`).toBe(width < 768 ? 1 : 2);
      } finally { frame.remove(); }
    }
  });
  it('renders loading and recoverable error independently of successful metrics', () => {
    service.load.and.returnValue(of({metrics: [
      {id: 'a', title: 'A', icon: 'pi-box', detail: '', route: '/orders', state: 'loading'},
      {id: 'b', title: 'B', icon: 'pi-box', detail: '', route: '/orders', state: 'error'}
    ], activityState: 'error'}));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.skeleton')).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('Tentar novamente');
    expect(fixture.nativeElement.querySelector('.refresh').disabled).toBeTrue();
  });
});

describe('OfferChartComponent', () => {
  it('calculates percentages over every status, including empty and failure states', () => {
    const chart = new OfferChartComponent();
    chart.metrics = ['DRAFT', 'PUBLISHED', 'PAUSED', 'RETIRED'].map((id, index) => ({id, title: id, icon: '', detail: '', route: '/offer', state: 'success', value: index === 1 ? 3 : 1}));
    expect(chart.loading).toBeFalse();
    expect(chart.total).toBe(6);
    expect(chart.percentage(chart.metrics[1])).toBe(50);
    chart.metrics.forEach(metric => metric.value = 0);
    expect(chart.percentage(chart.metrics[0])).toBe(0);
    chart.metrics[0].state = 'error';
    expect(chart.failed).toBeTrue();
  });
});
