import { TestBed } from '@angular/core/testing';

import { DetectKeypadService } from './detect-keypad.service';

describe('DetectKeypadService', () => {
  let service: DetectKeypadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetectKeypadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
