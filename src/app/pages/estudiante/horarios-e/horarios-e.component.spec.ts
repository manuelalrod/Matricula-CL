import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorariosEComponent } from './horarios-e.component';

describe('HorariosEComponent', () => {
  let component: HorariosEComponent;
  let fixture: ComponentFixture<HorariosEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorariosEComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HorariosEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
