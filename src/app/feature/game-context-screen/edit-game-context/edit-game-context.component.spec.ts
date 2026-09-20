import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Title} from '@angular/platform-browser';

import {EditGameContextComponent} from './edit-game-context.component';
import {GameContextService} from '../../../shared/service/game-context.service';

describe('EditGameContextComponent', () => {
  let component: EditGameContextComponent;

  beforeEach(() => {
    component = new EditGameContextComponent(
      {} as ActivatedRoute,
      {} as Location,
      {} as GameContextService,
      new MessageService(),
      new ConfirmationService(),
      {} as Title
    );
  });

  it('requires game and platform and requires region when server is present', () => {
    const context = component.contextSubject$.getValue();
    expect(component.isValid(context)).toBeFalse();

    context.game = 'Elden Ring';
    context.platform = 'PC';
    context.server = 'South America';
    expect(component.isValid(context)).toBeFalse();

    context.region = 'BR';
    expect(component.isValid(context)).toBeTrue();
  });

  it('recognizes discontinued contexts as terminal', () => {
    const context = component.contextSubject$.getValue();
    context.status = 'DISCONTINUED';

    expect(component.isTerminal(context)).toBeTrue();
  });
});
