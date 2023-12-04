import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailProductsComponent } from './view-detail-products.component';

describe('ViewDetailProductsComponent', () => {
  let component: ViewDetailProductsComponent;
  let fixture: ComponentFixture<ViewDetailProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDetailProductsComponent]
    });
    fixture = TestBed.createComponent(ViewDetailProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
