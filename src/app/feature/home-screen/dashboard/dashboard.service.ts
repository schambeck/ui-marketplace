import {Injectable} from '@angular/core';
import {catchError, map, merge, Observable, of, startWith} from 'rxjs';
import {KeycloakService} from 'keycloak-angular';
import {ProductService} from '../../../shared/service/product.service';
import {UserService} from '../../../shared/service/user.service';
import {SellerApplicationService} from '../../../shared/service/seller-application.service';
import {OfferService} from '../../../shared/service/offer.service';
import {OrderService} from '../../../shared/service/order.service';
import {Page} from '../../../shared/model/page';
import {OfferStatus} from '../../../shared/model/offer.entity';
import {DashboardMetric, DashboardProfile, DashboardSection} from './dashboard.model';

@Injectable({providedIn: 'root'})
export class DashboardService {
  constructor(private keycloak: KeycloakService, private users: UserService,
              private products: ProductService, private applications: SellerApplicationService,
              private offers: OfferService, private orders: OrderService) {}

  profile(): DashboardProfile {
    if (!this.keycloak.isLoggedIn()) { return 'guest'; }
    const roles = this.keycloak.getUserRoles().map(role => role.trim().toLowerCase());
    return roles.includes('admin') ? 'admin' : roles.includes('seller') ? 'seller' : 'buyer';
  }

  load(profile: DashboardProfile): Observable<DashboardSection> {
    if (profile === 'admin') {
      return merge(
        this.count({id: 'users', title: 'Usuários cadastrados', icon: 'pi-users', detail: 'Total cadastral da plataforma', route: '/user'}, this.users.list(0, 1)),
        this.count({id: 'products', title: 'Produtos cadastrados', icon: 'pi-box', detail: 'Total global de produtos. O atalho abre seus produtos.', route: '/list-product', actionLabel: 'Ver meus produtos'}, this.products.list(0, 1)),
        this.count({id: 'pending', title: 'Solicitações pendentes', icon: 'pi-briefcase', detail: 'Aguardando análise administrativa', route: '/seller-applications'}, this.applications.pending(0, 5), page => page.content.map(item => ({
          id: String(item.id), title: item.publicName, status: 'Pendente', date: item.submittedAt, route: ['/seller-applications']
        })))
      );
    }
    if (profile === 'seller') {
      const statuses: {id: OfferStatus; title: string}[] = [
        {id: 'DRAFT', title: 'Rascunhos'}, {id: 'PUBLISHED', title: 'Publicadas'},
        {id: 'PAUSED', title: 'Pausadas'}, {id: 'RETIRED', title: 'Retiradas'}
      ];
      return merge(
        this.count({id: 'products', title: 'Meus produtos', icon: 'pi-box', detail: 'Produtos vinculados ao seu usuário', route: '/list-product'}, this.products.listByUser(0, 1)),
        ...statuses.map(status => this.count({id: status.id, title: status.title, icon: 'pi-tags', detail: 'Suas ofertas • status de publicação', route: '/offer'}, this.offers.searchOwned(0, 1, status.id)))
      );
    }
    if (profile === 'buyer') {
      return this.count({id: 'orders', title: 'Meus pedidos', icon: 'pi-shopping-bag', detail: 'Todas as suas compras, em qualquer status', route: '/orders'}, this.orders.list(0, 5), page => page.content.map(order => ({
        id: order.publicId, title: `Pedido ${order.publicId.slice(0, 8)}`, status: order.status,
        // History is not a creation timestamp exposed by OrderWeb. Do not infer one.
        amount: order.totalAmount, route: ['/orders', order.publicId]
      })));
    }
    return of({metrics: []});
  }

  private count<T>(definition: Omit<DashboardMetric, 'state' | 'value'>, request: Observable<Page<T>>,
                   activities?: (page: Page<T>) => NonNullable<DashboardSection['activities']>): Observable<DashboardSection> {
    return request.pipe(
      map(page => ({metrics: [{...definition, state: 'success' as const, value: page.totalElements}],
        ...(activities ? {activities: activities(page), activityState: 'success' as const} : {})})),
      catchError(() => of({metrics: [{...definition, state: 'error' as const}],
        ...(activities ? {activities: [], activityState: 'error' as const} : {})})),
      startWith({metrics: [{...definition, state: 'loading' as const}],
        ...(activities ? {activities: [], activityState: 'loading' as const} : {})})
    );
  }
}
