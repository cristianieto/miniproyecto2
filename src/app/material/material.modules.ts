import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  exports: [
    MatButtonModule, 
    MatToolbarModule,
    MatInputModule, 
    MatCardModule, 
    MatIconModule, 
    MatTabsModule,
    MatFormFieldModule,
    MatDividerModule,
    MatGridListModule,
    MatTableModule,
    MatSelectModule,
    MatTooltipModule
  ],
})
export class MaterialModule {}
