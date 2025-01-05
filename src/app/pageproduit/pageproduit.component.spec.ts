import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageproduitComponent } from './pageproduit.component';

describe('PageproduitComponent', () => {
  let component: PageproduitComponent;
  let fixture: ComponentFixture<PageproduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageproduitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageproduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
