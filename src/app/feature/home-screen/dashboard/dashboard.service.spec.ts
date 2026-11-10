import {of, throwError} from 'rxjs';
import {KeycloakService} from 'keycloak-angular';
import {DashboardService} from './dashboard.service';
import {UserService} from '../../../shared/service/user.service';
import {ProductService} from '../../../shared/service/product.service';
import {SellerApplicationService} from '../../../shared/service/seller-application.service';
import {OfferService} from '../../../shared/service/offer.service';
import {OrderService} from '../../../shared/service/order.service';
import {DashboardSection} from './dashboard.model';

describe('DashboardService', () => {
  let service: DashboardService;
  let auth: jasmine.SpyObj<KeycloakService>;
  let users: jasmine.SpyObj<UserService>;
  let products: jasmine.SpyObj<ProductService>;
  let applications: jasmine.SpyObj<SellerApplicationService>;
  let offers: jasmine.SpyObj<OfferService>;
  let orders: jasmine.SpyObj<OrderService>;
  beforeEach(() => {
    auth = jasmine.createSpyObj('KeycloakService', ['isLoggedIn', 'getUserRoles']);
    users = jasmine.createSpyObj('UserService', ['list']);
    products = jasmine.createSpyObj('ProductService', ['list', 'listByUser']);
    applications = jasmine.createSpyObj('SellerApplicationService', ['pending']);
    offers = jasmine.createSpyObj('OfferService', ['searchOwned']);
    orders = jasmine.createSpyObj('OrderService', ['list']);
    service = new DashboardService(auth, users, products, applications, offers, orders);
    users.list.and.returnValue(of({content: [], size: 1, totalElements: 1234}));
    products.list.and.returnValue(of({content: [], size: 1, totalElements: 42}));
    products.listByUser.and.returnValue(of({content: [], size: 1, totalElements: 3}));
    applications.pending.and.returnValue(of({content: [], size: 5, totalElements: 0}));
    offers.searchOwned.and.returnValue(of({content: [], size: 1, totalElements: 2}));
    orders.list.and.returnValue(of({content: [], size: 5, totalElements: 0}));
  });
  it('normalizes roles and prioritizes admin only for authenticated users', () => {
    auth.isLoggedIn.and.returnValue(false);
    expect(service.profile()).toBe('guest');
    auth.isLoggedIn.and.returnValue(true);
    auth.getUserRoles.and.returnValue([' SELLER ', 'ADMIN']);
    expect(service.profile()).toBe('admin');
    auth.getUserRoles.and.returnValue(['seller']);
    expect(service.profile()).toBe('seller');
    auth.getUserRoles.and.returnValue([]);
    expect(service.profile()).toBe('buyer');
  });
  it('uses server totals rather than page length and isolates partial failures', () => {
    products.list.and.returnValue(throwError(() => new Error('unavailable')));
    const results: DashboardSection[] = [];
    service.load('admin').subscribe(section => results.push(section));
    expect(results.some(section => section.metrics.some(metric => metric.id === 'users' && metric.value === 1234))).toBeTrue();
    expect(results.some(section => section.metrics.some(metric => metric.id === 'products' && metric.state === 'error' && metric.value === undefined))).toBeTrue();
    expect(results.some(section => section.activityState === 'success' && section.activities?.length === 0)).toBeTrue();
    expect(orders.list).not.toHaveBeenCalled();
    expect(offers.searchOwned).not.toHaveBeenCalled();
  });
  it('queries only owned resources for sellers and uses all four real statuses', () => {
    service.load('seller').subscribe();
    expect(offers.searchOwned.calls.allArgs()).toEqual([[0, 1, 'DRAFT'], [0, 1, 'PUBLISHED'], [0, 1, 'PAUSED'], [0, 1, 'RETIRED']]);
    expect(products.listByUser).toHaveBeenCalledOnceWith(0, 1);
    expect(users.list).not.toHaveBeenCalled();
    expect(products.list).not.toHaveBeenCalled();
    expect(applications.pending).not.toHaveBeenCalled();
  });
  it('never loads administrative or seller data for buyers and guests', () => {
    service.load('guest').subscribe();
    expect(orders.list).not.toHaveBeenCalled();
    service.load('buyer').subscribe();
    expect(orders.list).toHaveBeenCalledOnceWith(0, 5);
    expect(users.list).not.toHaveBeenCalled();
    expect(applications.pending).not.toHaveBeenCalled();
    expect(offers.searchOwned).not.toHaveBeenCalled();
  });
});
