import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { turfAdminGuard } from './turf-admin.guard';

describe('turfAdminGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => turfAdminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
