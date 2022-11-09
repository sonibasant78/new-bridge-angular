import { TestBed } from '@angular/core/testing';

import { OuterAuthGuard } from './outer-auth.guard';

describe('OuterAuthGuard', () => {
  let guard: OuterAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OuterAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
