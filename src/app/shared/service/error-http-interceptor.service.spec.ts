import { TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { ErrorHttpInterceptorService } from './error-http-interceptor.service';

describe('ErrorHttpInterceptorService', () => {
  let service: ErrorHttpInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({ 
      imports: [ToastModule], 
      providers: [ErrorHttpInterceptorService, MessageService]
    })
  });
  
  it('should use created', () => {
    service = TestBed.inject(ErrorHttpInterceptorService);
    expect(service).toBeTruthy();
  });

});
