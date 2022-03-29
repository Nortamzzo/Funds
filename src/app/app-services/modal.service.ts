import { ComponentFactoryResolver, ComponentRef, ViewContainerRef } from "@angular/core";
import { NewTransactionModalComponent } from "@app/ledger/new-transaction-modal/new-transaction-modal.component";
import { Subject } from "rxjs";

export class ModalService {
  private componentRef!: ComponentRef<NewTransactionModalComponent>;
  private componentSubscriber!: Subject<string>;
  constructor(private resolver: ComponentFactoryResolver) {}

  openModal(entry: ViewContainerRef, modalTitle: string, modalBody: string) {
    let factory = this.resolver.resolveComponentFactory(NewTransactionModalComponent);
    this.componentRef = entry.createComponent(factory);
    this.componentRef.instance.title = modalTitle;
    this.componentRef.instance.body = modalBody;
    this.componentRef.instance.closeMeEvent.subscribe(() => this.closeModal());
    this.componentRef.instance.confirmEvent.subscribe(() => this.confirm());
    this.componentSubscriber = new Subject<string>();
    return this.componentSubscriber.asObservable();
  }

  closeModal() {
    this.componentSubscriber.complete();
    this.componentRef.destroy();
  }

  confirm() {
    this.componentSubscriber.next('confirm');
    this.closeModal();
  }
}