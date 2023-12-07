import { NgModule } from '@angular/core';
import { Navbar } from './components/navbar/navbar.component';

@NgModule({
  declarations: [Navbar],
  exports: [Navbar],
})
export class SharedModule {}
