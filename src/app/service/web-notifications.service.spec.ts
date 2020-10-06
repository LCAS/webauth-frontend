import { TestBed } from '@angular/core/testing';

import { WebNotificationsService } from './web-notifications.service';

describe('WebNotificationsService', () => {
  let service: WebNotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebNotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
