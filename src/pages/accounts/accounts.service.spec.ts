import { TestBed, inject } from '@angular/core/testing';
import { AccountsService } from './accounts.service';

describe('AccountsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountsService]
    });
  });

  it('should be created', inject([AccountsService], (service: AccountsService) => {
    expect(service).toBeTruthy();
  }));

  it('should save new account', inject([AccountsService], (service: AccountsService) => {
    expect(service.createNewAccount()).toBeTruthy();
  }));
});
