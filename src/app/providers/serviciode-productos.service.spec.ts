import { TestBed } from '@angular/core/testing';

import { ServiciodeProductosService } from './serviciode-productos.service';

describe('ServiciodeProductosService', () => {
  let service: ServiciodeProductosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciodeProductosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
