import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceiroCadastroComponent } from './financeiro-cadastro.component';

describe('FinanceiroCadastroComponent', () => {
  let component: FinanceiroCadastroComponent;
  let fixture: ComponentFixture<FinanceiroCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceiroCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceiroCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
