import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceiroMovimentacaoComponent } from './financeiro-movimentacao.component';

describe('FinanceiroMovimentacaoComponent', () => {
  let component: FinanceiroMovimentacaoComponent;
  let fixture: ComponentFixture<FinanceiroMovimentacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceiroMovimentacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceiroMovimentacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
