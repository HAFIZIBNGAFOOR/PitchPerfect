import { TestBed } from '@angular/core/testing';

import { TurfAdminService } from './turf-admin.service';

describe('TurfAdminService', () => {
  let service: TurfAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TurfAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
