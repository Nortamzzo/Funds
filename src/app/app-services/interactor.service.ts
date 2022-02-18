import { Injectable } from '@angular/core';
import { InterstateService } from './interstate.service';
import { StylerService } from './styler.service';

@Injectable({
  providedIn: 'root'
})
export class InteractorService {

  // Handle interactions throughout application
  // Button clicks, cell edits, etc.
  // Calls Operator Service

  constructor(
    private state: InterstateService,
    private style: StylerService
  ) { }

  interactor(data: any) {
    let interaction = {
      id: data.target.getAttribute('id'),
      comp: data.target.getAttribute('comp'),
      action: data.target.getAttribute('action'),
      value: data.target.getAttribute('value')
    }
    console.log('Interactor: ', interaction)
    switch (interaction.comp) {
      case 'navbar':
        this.navbar(interaction);
        break;
      case 'ledger-toolbar':
        this.ledgerToolbar(interaction);
        break;
      default:
        console.log('Interactor Error: interactor');
        break;
    }
  }

  // Main Navbar Links
  navbar(interaction: any) {
    switch (interaction.action) {
      case 'setContent':
        this.state.setViewContent(interaction.value);
        break;
      default:
        console.log('Interactor Error: navbarToolbar');
        break;
    }
  }

  ledgerToolbar(interaction: any) {
    switch (interaction.action) {
      case 'setLedgerAction':
        this.state.setLedgerContent(interaction.value);
        break;
      default:
        // this.style.setLedgerActionCenterHeight(this.style.LedgerActionCenterHeightDefault);
        // this.style.setLedgerTableHeight(this.style.LedgerTableHeightDefault);
        this.state.setLedgerContent(interaction.value);
    }
  }

  transactionInput(interaction: any) {
    console.log('y', interaction)
    this.state.setLedgerToolbarMode(interaction);
  }

}
