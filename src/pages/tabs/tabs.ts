import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { SettingsPage } from '../settings/settings';
import { AccountsPage } from '../accounts/accounts';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AccountsPage;
  tab2Root = SettingsPage;
  tab3Root = AboutPage;

  constructor() {

  }
}
