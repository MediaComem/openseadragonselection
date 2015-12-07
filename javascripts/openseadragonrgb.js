!function(e){"use strict";function t(e){this.onCanvasHover(this.getValueAt(e.position))}if(!e.version||e.version.major<2)throw new Error("This version of OpenSeadragonRGB requires OpenSeadragon version 2.0.0+");e.Viewer.prototype.rgb=function(t){return(!this.rgbInstance||t)&&(t=t||{},t.viewer=this,this.rgbInstance=new e.RGB(t)),this.rgbInstance},e.RGB=function(n){e.extend(!0,this,{viewer:null,onCanvasHover:null},n),this.onCanvasHover&&(this.tracker=new e.MouseTracker({element:this.viewer.canvas,moveHandler:e.delegate(this,t)}))},e.extend(e.RGB.prototype,e.ControlDock.prototype,{getValueAt:function(t,n){var r=1===arguments.length?t:new e.Point(t,n),o=this.viewer,i=o.drawer.getRgbAt(r);if(i)for(var a,s,g,u=0;u<o.world.getItemCount();u++)a=o.world.getItemAt(u),g=a.getContentSize(),s=a.viewerElementToImageCoordinates(r),s.x>=0&&s.y>=0&&s.x<=g.x&&s.y<=g.y&&(i.image=a);return i}}),e.Drawer.prototype.getRgbAt=function(t){if(!this.useCanvas)return!1;var n=e.pixelDensityRatio,r=this._getContext().getImageData(t.x*n,t.y*n,1,1).data;return{r:r[0],g:r[1],b:r[2],a:r[3]}}}(OpenSeadragon);
//# sourceMappingURL=openseadragonrgb.js.map