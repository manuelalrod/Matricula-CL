import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciarPComponent } from './iniciar-p.component';

describe('IniciarPComponent', () => {
  let component: IniciarPComponent;
  let fixture: ComponentFixture<IniciarPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IniciarPComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IniciarPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
