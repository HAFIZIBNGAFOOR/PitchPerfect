import { TestBed } from '@angular/core/testing';

import { TurfAdminInterceptor } from './turf-admin.interceptor';

describe('TurfAdminInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TurfAdminInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: TurfAdminInterceptor = TestBed.inject(TurfAdminInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
