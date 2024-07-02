import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioPComponent } from './horario-p.component';

describe('HorarioPComponent', () => {
  let component: HorarioPComponent;
  let fixture: ComponentFixture<HorarioPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorarioPComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HorarioPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
