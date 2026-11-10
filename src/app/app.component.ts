import {PrimeNGConfig} from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Marketplace';
  loading: boolean = false;

  constructor(private titleService: Title, private router: Router, private primeConfig: PrimeNGConfig) {
    this.router.events
      .pipe(filter((e: Event) => e instanceof RouterEvent))
      .subscribe((e: Event) => this.navigationInterceptor(e));
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.primeConfig.setTranslation({
      accept: 'Confirmar', reject: 'Cancelar', choose: 'Selecionar', upload: 'Enviar', cancel: 'Cancelar',
      emptyMessage: 'Nenhum resultado encontrado', emptyFilterMessage: 'Nenhum resultado encontrado',
      today: 'Hoje', clear: 'Limpar', dateFormat: 'dd/mm/yy',
      dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'], dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sá'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      aria: {...this.primeConfig.translation.aria, close: 'Fechar', star: '1 estrela', stars: '{star} estrelas',
        firstPageLabel: 'Primeira página', lastPageLabel: 'Última página', nextPageLabel: 'Próxima página', previousPageLabel: 'Página anterior', prevPageLabel: 'Página anterior',
        pageLabel: 'Página {page}', rowsPerPageLabel: 'Registros por página', navigation: 'Navegação', next: 'Próximo', previous: 'Anterior',
        selectRow: 'Selecionar registro', unselectRow: 'Desmarcar registro', zoomImage: 'Ampliar imagem'}
    });
  }

  navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this.loading = true
    }
    if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
      this.loading = false
    }
  }
}
