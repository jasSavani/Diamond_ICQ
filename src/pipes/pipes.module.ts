import { NgModule } from '@angular/core';
import { ShapePipe } from './shape/shape';
import { FullShapePipe } from './full-shape/full-shape';
@NgModule({
	declarations: [ShapePipe,
    FullShapePipe],
	imports: [],
	exports: [ShapePipe,
    FullShapePipe]
})
export class PipesModule {}
