import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';

import { HeaderComponent } from './header.component';

@NgModule({
  imports: [CommonModule, MatToolbarModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class MwcBrowserDemoUiHeaderModule {}
