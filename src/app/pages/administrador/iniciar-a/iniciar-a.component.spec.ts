import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciarAComponent } from './iniciar-a.component';

describe('IniciarAComponent', () => {
  let component: IniciarAComponent;
  let fixture: ComponentFixture<IniciarAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IniciarAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IniciarAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
