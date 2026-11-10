import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Subscription} from 'rxjs';
import {DashboardService} from '../dashboard/dashboard.service';
import {DashboardAction, DashboardActivity, DashboardMetric, DashboardProfile, LoadState} from '../dashboard/dashboard.model';

@Component({selector: 'app-home', templateUrl: './home.component.html', styleUrls: ['./home.component.css']})
export class HomeComponent implements OnInit, OnDestroy {
  profile: DashboardProfile = 'guest';
  metrics: DashboardMetric[] = [];
  activities: DashboardActivity[] = [];
  activityState: LoadState = 'loading';
  updatedAt?: Date;
  private request?: Subscription;
  readonly descriptions = {
    guest: 'Explore o catálogo e entre na sua conta para acompanhar suas compras.',
    admin: 'Acompanhe os cadastros da plataforma e as solicitações que aguardam análise.',
    seller: 'Acompanhe seus produtos e a situação de publicação das suas ofertas.',
    buyer: 'Acompanhe suas compras e continue sua próxima descoberta.'
  };
  constructor(private title: Title, private dashboard: DashboardService) {}
  ngOnInit(): void { this.title.setTitle('Visão geral'); this.refresh(); }
  ngOnDestroy(): void { this.request?.unsubscribe(); }
  readonly refresh = (): void => {
    this.request?.unsubscribe();
    this.profile = this.dashboard.profile();
    this.metrics = [];
    this.activities = [];
    this.updatedAt = undefined;
    this.request = this.dashboard.load(this.profile).subscribe({
      next: section => {
        for (const metric of section.metrics) {
          const index = this.metrics.findIndex(item => item.id === metric.id);
          if (index < 0) { this.metrics.push(metric); } else { this.metrics[index] = metric; }
        }
        if (section.activityState) { this.activityState = section.activityState; this.activities = section.activities ?? []; }
      },
      complete: () => this.updatedAt = new Date()
    });
  };
  get loading(): boolean { return this.metrics.some(metric => metric.state === 'loading'); }
  get offerMetrics(): DashboardMetric[] { return this.metrics.filter(metric => ['DRAFT', 'PUBLISHED', 'PAUSED', 'RETIRED'].includes(metric.id)); }
  get pending(): DashboardMetric | undefined { return this.metrics.find(metric => metric.id === 'pending'); }
  get actions(): DashboardAction[] {
    const catalog = {title: 'Abrir catálogo', description: 'Explore produtos e ofertas disponíveis.', icon: 'pi-search', route: '/catalog'};
    if (this.profile === 'admin') {
      return [
        {title: 'Gerenciar usuários', description: 'Consulte os cadastros da plataforma.', icon: 'pi-users', route: '/user'},
        {title: 'Analisar vendedores', description: 'Revise as solicitações pendentes.', icon: 'pi-briefcase', route: '/seller-applications'},
        {title: 'Meus produtos', description: 'Consulte e edite seus próprios produtos.', icon: 'pi-box', route: '/list-product'},
        {title: 'Consultar inventário', description: 'Consulte reservas pelo identificador do pedido.', icon: 'pi-inbox', route: '/inventory'}, catalog
      ];
    }
    if (this.profile === 'seller') {
      return [{title: 'Minhas ofertas', description: 'Gerencie publicação e disponibilidade.', icon: 'pi-tags', route: '/offer'},
        {title: 'Meus produtos', description: 'Gerencie os seus produtos.', icon: 'pi-box', route: '/list-product'},
        {title: 'Consultar inventário', description: 'Consulte reservas de pedidos autorizados.', icon: 'pi-inbox', route: '/inventory'}, catalog];
    }
    if (this.profile === 'buyer') {
      return [{title: 'Meus pedidos', description: 'Veja todos os seus pedidos.', icon: 'pi-list', route: '/orders'},
        {title: 'Meu carrinho', description: 'Revise os itens selecionados.', icon: 'pi-shopping-cart', route: '/shopping-cart'},
        {title: 'Comece a vender', description: 'Apresente sua loja ao marketplace.', icon: 'pi-briefcase', route: '/become-seller'}, catalog];
    }
    return [catalog, {title: 'Acessar minha conta', description: 'Entre para acompanhar seus pedidos.', icon: 'pi-user', route: '/orders'}];
  }
  // SubmittedAt is a server-local LocalDateTime without an offset. Preserve its wall time.
  submittedDate(value: string): string {
    const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(value);
    return match ? `${match[3]}/${match[2]}/${match[1]} às ${match[4]}:${match[5]}` : 'Data não informada';
  }
}
