import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {BehaviorSubject, Observable, finalize, shareReplay} from 'rxjs';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Title} from '@angular/platform-browser';

import {GameContext} from '../../../shared/model/game-context.entity';
import {GameContextHistory} from '../../../shared/model/game-context-history.entity';
import {GameContextStatus} from '../../../shared/model/game-context-status';
import {GameContextService} from '../../../shared/service/game-context.service';

@Component({
  selector: 'app-edit-game-context',
  templateUrl: './edit-game-context.component.html',
  styleUrls: ['./edit-game-context.component.css']
})
export class EditGameContextComponent implements OnInit {
  contextSubject$ = new BehaviorSubject<GameContext>(this.createEmptyContext());
  context$ = this.contextSubject$.asObservable();
  history$?: Observable<GameContextHistory[]>;
  saving = false;
  loadingHistory = false;
  statuses: GameContextStatus[] = ['ACTIVE', 'INACTIVE', 'DISCONTINUED'];

  constructor(private route: ActivatedRoute,
              private location: Location,
              private service: GameContextService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private titleService: Title) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Contexto de jogo');
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.get(id).subscribe(context => {
        this.contextSubject$.next(context);
        this.loadHistory(context.id);
      });
    }
  }

  back(): void {
    this.location.back();
  }

  isTerminal(context: GameContext): boolean {
    return context.status === 'DISCONTINUED';
  }

  isValid(context: GameContext): boolean {
    return Boolean(context.game?.trim() && context.platform?.trim() &&
      (!context.server?.trim() || Boolean(context.region?.trim())));
  }

  save(): void {
    const context = this.contextSubject$.getValue();
    if (!this.isValid(context)) {
      this.messageService.add({severity: 'warn', summary: 'Contexto de jogo inválido', detail: 'Informe jogo e plataforma. A região é obrigatória quando houver servidor.'});
      return;
    }
    if (this.isTerminal(context)) {
      this.messageService.add({severity: 'warn', summary: 'Contexto descontinuado', detail: 'Um contexto descontinuado não pode ser editado.'});
      return;
    }

    this.saving = true;
    const request = context.id ? this.service.update(context.id, context) : this.service.create(context);
    request.subscribe({
      next: saved => {
        this.contextSubject$.next(saved);
        this.messageService.add({severity: 'success', summary: 'Contexto de jogo salvo'});
        this.loadHistory(saved.id);
      },
      error: () => this.saving = false,
      complete: () => this.saving = false
    });
  }

  discontinue(context: GameContext): void {
    if (!context.id || this.isTerminal(context)) {
      return;
    }
    this.confirmationService.confirm({
      message: 'O contexto continuará no histórico e deixará de aceitar novas ofertas. Deseja continuar?',
      header: 'Descontinuar contexto de jogo',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        context.status = 'DISCONTINUED';
        this.save();
      }
    });
  }

  loadHistory(id: number): void {
    this.loadingHistory = true;
    this.history$ = this.service.history(id).pipe(
      finalize(() => this.loadingHistory = false),
      shareReplay(1)
    );
  }

  private createEmptyContext(): GameContext {
    return {id: 0, version: 0, game: '', platform: '', status: 'ACTIVE', createdAt: '', modifiedAt: ''};
  }
}
