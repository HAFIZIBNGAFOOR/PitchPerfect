import { TestBed } from '@angular/core/testing';

import { AdminInterceptor } from './admin.interceptor';

describe('AdminInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AdminInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AdminInterceptor = TestBed.inject(AdminInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
