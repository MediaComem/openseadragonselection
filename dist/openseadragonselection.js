var OpenSeadragon=require("openseadragon");!function(d){"use strict";if(!d.version||d.version.major<2)throw new Error("This version of OpenSeadragonSelection requires OpenSeadragon version 2.0.0+");function g(t){this.viewer.setMouseNavEnabled(!1);var e,i,s=this.viewer.viewport.deltaPointsFromPixels(t.delta,!0),r=this.viewer.viewport.pointFromPixel(t.position,!0),n=new d.Point(r.x-s.x,r.y-s.y);if(this.rect){var o;if(this.restrictToImage&&(o=this.rect.clone()),this.rectDone){if(this.allowRotation){var h=this.rect.getAngleFromCenter(n),l=this.rect.getAngleFromCenter(r);this.rect.rotation=(this.rect.rotation+h-l)%Math.PI}}else this.startRotated?this.rect=c(this.rotatedStartPoint,r,this.startRotatedHeight):(this.rect.width+=s.x,this.rect.height+=s.y);var a=this.viewer.world.getHomeBounds();this.restrictToImage&&!this.rect.fitsIn(new d.Rect(0,0,a.width,a.height))&&(this.rect=o)}else{if(this.restrictToImage){if(e=n,i=this.viewer.world.getHomeBounds(),!(0<=e.x&&e.x<=i.width&&0<=e.y&&e.y<=i.height))return;!function(t,e){var i;for(var s in{x:0,y:0})(i=e[s]-t[s])<1&&0<i&&(1<e[s]?(t[s]-=e[s]-1,e[s]=1):e[s]<0&&(t[s]-=e[s],e[s]=0))}(s,r)}this.startRotated?(this.rotatedStartPoint=n,this.rect=c(n,r,this.startRotatedHeight)):this.rect=new d.SelectionRect(n.x,n.y,s.x,s.y),this.rectDone=!1}this.draw(),this.viewer.raiseEvent("move_start",this.rect?this.rect.normalize():null)}function u(){this.rect.width<0&&(this.rect.x+=this.rect.width,this.rect.width=Math.abs(this.rect.width)),this.rect.height<0&&(this.rect.y+=this.rect.height,this.rect.height=Math.abs(this.rect.height)),this.viewer.setMouseNavEnabled(!0),this.rectDone=!0,this.viewer.raiseEvent("move_end",this.rect?this.rect.normalize():null)}function w(){this.viewer.canvas.focus()}function v(t){d.addClass(this.element,"dragging");var e=this.viewer.viewport.deltaPointsFromPixels(t.delta,!0);this.rect.x+=e.x,this.rect.y+=e.y;var i=this.viewer.world.getHomeBounds();this.restrictToImage&&!this.rect.fitsIn(new d.Rect(0,0,i.width,i.height))&&(this.rect.x-=e.x,this.rect.y-=e.y),this.draw(),this.viewer.raiseEvent("move_start",this.rect?this.rect.normalize():null)}function m(){d.removeClass(this.element,"dragging"),this.viewer.raiseEvent("move_end",this.rect?this.rect.normalize():null)}function y(t,e){var i,s=e.delta,r=this.rect.getDegreeRotation(),n=this.restrictToImage?this.rect.clone():null;switch(0!==r&&(s=s.rotate(-1*r,new d.Point(0,0)),i=this.rect.getCenter()),s=this.viewer.viewport.deltaPointsFromPixels(s,!0),t){case 0:this.rect.y+=s.y,this.rect.height-=s.y;break;case 1:this.rect.width+=s.x;break;case 2:this.rect.height+=s.y;break;case 3:this.rect.x+=s.x,this.rect.width-=s.x;break;case.5:this.rect.y+=s.y,this.rect.height-=s.y,this.rect.x+=s.x,this.rect.width-=s.x;break;case 1.5:this.rect.y+=s.y,this.rect.height-=s.y,this.rect.width+=s.x;break;case 2.5:this.rect.width+=s.x,this.rect.height+=s.y;break;case 3.5:this.rect.height+=s.y,this.rect.x+=s.x,this.rect.width-=s.x}if(0!==r){var o=this.rect.getCenter();s=o.rotate(r,i).minus(o),this.rect.x+=s.x,this.rect.y+=s.y}var h=this.viewer.world.getHomeBounds();this.restrictToImage&&!this.rect.fitsIn(new d.Rect(0,0,h.width,h.height))&&(this.rect=n),this.draw(),this.viewer.raiseEvent("move_start",this.rect?this.rect.normalize():null)}function p(){this.rect.width<0&&(this.rect.x+=this.rect.width,this.rect.width=Math.abs(this.rect.width)),this.rect.height<0&&(this.rect.y+=this.rect.height,this.rect.height=Math.abs(this.rect.height)),this.viewer.raiseEvent("move_end",this.rect?this.rect.normalize():null)}function f(t){var e=t.keyCode?t.keyCode:t.charCode;13===e?this.confirm():String.fromCharCode(e)===this.keyboardShortcut&&this.toggleState()}function c(t,e,i){if(t.x>e.x){var s=t;t=e,e=s}var r=e.minus(t),n=t.distanceTo(e),o=-1*Math.atan2(r.x,r.y)+Math.PI/2,h=new d.Point(r.x/2+t.x,r.y/2+t.y),l=new d.SelectionRect(h.x-n/2,h.y-i/2,n,i,o),a=new d.Point(0,i);return a=a.rotate(l.getDegreeRotation(),new d.Point(0,0)),l.x+=a.x/2,l.y+=a.y/2,l}d.Viewer.prototype.selection=function(t){return this.selectionInstance&&!t||(((t=t||{}).viewer=this).selectionInstance=new d.Selection(t)),this.selectionInstance},d.Selection=function(t){var e;d.extend(!0,this,{viewer:null,isSelecting:!1,buttonActiveImg:!1,rectDone:!0,element:null,toggleButton:null,showSelectionControl:!0,showConfirmDenyButtons:!0,styleConfirmDenyButtons:!0,returnPixelCoordinates:!0,keyboardShortcut:"c",rect:null,allowRotation:!0,startRotated:!1,startRotatedHeight:.1,restrictToImage:!1,onSelection:null,onMoveStart:null,onMoveEnd:null,prefixUrl:null,navImages:{selection:{REST:"selection_rest.png",GROUP:"selection_grouphover.png",HOVER:"selection_hover.png",DOWN:"selection_pressed.png"},selectionConfirm:{REST:"selection_confirm_rest.png",GROUP:"selection_confirm_grouphover.png",HOVER:"selection_confirm_hover.png",DOWN:"selection_confirm_pressed.png"},selectionCancel:{REST:"selection_cancel_rest.png",GROUP:"selection_cancel_grouphover.png",HOVER:"selection_cancel_hover.png",DOWN:"selection_cancel_pressed.png"}},borderStyle:{width:"1px",color:"#fff"},handleStyle:{top:"50%",left:"50%",width:"6px",height:"6px",margin:"-4px 0 0 -4px",background:"#000",border:"1px solid #ccc"},cornersStyle:{width:"6px",height:"6px",background:"#000",border:"1px solid #ccc"}},t),d.extend(!0,this.navImages,this.viewer.navImages),this.element||(this.element=d.makeNeutralElement("div"),this.element.style.background="rgba(0, 0, 0, 0.1)",this.element.className="selection-box"),this.borders=this.borders||[];for(var i=[],s=0;s<4;s++)this.borders[s]||(this.borders[s]=d.makeNeutralElement("div"),this.borders[s].className="border-"+s,this.borders[s].style.position="absolute",this.borders[s].style.width=this.borderStyle.width,this.borders[s].style.height=this.borderStyle.width,this.borders[s].style.background=this.borderStyle.color),(e=d.makeNeutralElement("div")).className="border-"+s+"-handle",e.style.position="absolute",e.style.top=this.handleStyle.top,e.style.left=this.handleStyle.left,e.style.width=this.handleStyle.width,e.style.height=this.handleStyle.height,e.style.margin=this.handleStyle.margin,e.style.background=this.handleStyle.background,e.style.border=this.handleStyle.border,new d.MouseTracker({element:this.borders[s],dragHandler:y.bind(this,s),dragEndHandler:p.bind(this,s)}),i[s]=d.makeNeutralElement("div"),i[s].className="corner-"+s+"-handle",i[s].style.position="absolute",i[s].style.width=this.cornersStyle.width,i[s].style.height=this.cornersStyle.height,i[s].style.background=this.cornersStyle.background,i[s].style.border=this.cornersStyle.border,new d.MouseTracker({element:i[s],dragHandler:y.bind(this,s+.5),dragEndHandler:p.bind(this,s)}),this.borders[s].appendChild(e),this.element.appendChild(this.borders[s]),setTimeout(this.element.appendChild.bind(this.element,i[s]),0);this.borders[0].style.top=0,this.borders[0].style.width="100%",this.borders[1].style.right=0,this.borders[1].style.height="100%",this.borders[2].style.bottom=0,this.borders[2].style.width="100%",this.borders[3].style.left=0,this.borders[3].style.height="100%",i[0].style.top="-3px",i[0].style.left="-3px",i[1].style.top="-3px",i[1].style.right="-3px",i[2].style.bottom="-3px",i[2].style.right="-3px",i[3].style.bottom="-3px",i[3].style.left="-3px",this.overlay||(this.overlay=new d.SelectionOverlay(this.element,this.rect||new d.SelectionRect)),this.innerTracker=new d.MouseTracker({element:this.element,clickTimeThreshold:this.viewer.clickTimeThreshold,clickDistThreshold:this.viewer.clickDistThreshold,dragHandler:d.delegate(this,v),dragEndHandler:d.delegate(this,m),clickHandler:d.delegate(this,w)}),this.outerTracker=new d.MouseTracker({element:this.viewer.canvas,clickTimeThreshold:this.viewer.clickTimeThreshold,clickDistThreshold:this.viewer.clickDistThreshold,dragHandler:d.delegate(this,g),dragEndHandler:d.delegate(this,u),clickHandler:d.delegate(this,w),startDisabled:!this.isSelecting}),this.keyboardShortcut&&d.addEvent(this.viewer.container,"keypress",d.delegate(this,f),!1);var r=this.prefixUrl||this.viewer.prefixUrl||"",n=this.viewer.buttons&&this.viewer.buttons.buttons,o=n?this.viewer.buttons.buttons[0]:null,h=o?o.onFocus:null,l=o?o.onBlur:null;if(this.showSelectionControl&&(this.toggleButton=new d.Button({element:this.toggleButton?d.getElement(this.toggleButton):null,clickTimeThreshold:this.viewer.clickTimeThreshold,clickDistThreshold:this.viewer.clickDistThreshold,tooltip:d.getString("Tooltips.SelectionToggle")||"Toggle selection",srcRest:r+this.navImages.selection.REST,srcGroup:r+this.navImages.selection.GROUP,srcHover:r+this.navImages.selection.HOVER,srcDown:r+this.navImages.selection.DOWN,onRelease:this.toggleState.bind(this),onFocus:h,onBlur:l}),n&&(this.viewer.buttons.buttons.push(this.toggleButton),this.viewer.buttons.element.appendChild(this.toggleButton.element)),this.toggleButton.imgDown&&(this.buttonActiveImg=this.toggleButton.imgDown.cloneNode(!0),this.toggleButton.element.appendChild(this.buttonActiveImg))),this.showConfirmDenyButtons){this.confirmButton=new d.Button({element:this.confirmButton?d.getElement(this.confirmButton):null,clickTimeThreshold:this.viewer.clickTimeThreshold,clickDistThreshold:this.viewer.clickDistThreshold,tooltip:d.getString("Tooltips.SelectionConfirm")||"Confirm selection",srcRest:r+this.navImages.selectionConfirm.REST,srcGroup:r+this.navImages.selectionConfirm.GROUP,srcHover:r+this.navImages.selectionConfirm.HOVER,srcDown:r+this.navImages.selectionConfirm.DOWN,onRelease:this.confirm.bind(this),onFocus:h,onBlur:l});var a=this.confirmButton.element;a.classList.add("confirm-button"),this.element.appendChild(a),this.cancelButton=new d.Button({element:this.cancelButton?d.getElement(this.cancelButton):null,clickTimeThreshold:this.viewer.clickTimeThreshold,clickDistThreshold:this.viewer.clickDistThreshold,tooltip:d.getString("Tooltips.SelectionCancel")||"Cancel selection",srcRest:r+this.navImages.selectionCancel.REST,srcGroup:r+this.navImages.selectionCancel.GROUP,srcHover:r+this.navImages.selectionCancel.HOVER,srcDown:r+this.navImages.selectionCancel.DOWN,onRelease:this.cancel.bind(this),onFocus:h,onBlur:l});var c=this.cancelButton.element;c.classList.add("cancel-button"),this.element.appendChild(c),this.styleConfirmDenyButtons&&(a.style.position="absolute",a.style.top="50%",a.style.left="50%",a.style.transform="translate(-100%, -50%)",c.style.position="absolute",c.style.top="50%",c.style.left="50%",c.style.transform="translate(0, -50%)")}this.viewer.addHandler("selection",this.onSelection),this.viewer.addHandler("move_start",this.onMoveStart),this.viewer.addHandler("move_end",this.onMoveEnd),this.viewer.addHandler("open",this.draw.bind(this)),this.viewer.addHandler("animation",this.draw.bind(this)),this.viewer.addHandler("resize",this.draw.bind(this)),this.viewer.addHandler("rotate",this.draw.bind(this))},d.extend(d.Selection.prototype,d.ControlDock.prototype,{toggleState:function(){return this.setState(!this.isSelecting)},setState:function(t){return this.isSelecting=t,this.outerTracker.setTracking(t),t?this.draw():this.undraw(),this.buttonActiveImg&&(this.buttonActiveImg.style.visibility=t?"visible":"hidden"),this.viewer.raiseEvent("selection_toggle",{enabled:t}),this},setAllowRotation:function(t){this.allowRotation=t},enable:function(){return this.setState(!0)},disable:function(){return this.setState(!1)},draw:function(){return this.rect&&(this.overlay.update(this.rect.normalize()),this.overlay.drawHTML(this.viewer.drawer.container,this.viewer.viewport)),this},undraw:function(){return this.overlay.destroy(),this.rect=null,this},confirm:function(){if(this.rect){var t=this.rect.normalize();if(this.returnPixelCoordinates){var e=this.viewer.viewport.viewportToImageRectangle(t);(e=d.SelectionRect.fromRect(e).round()).rotation=t.rotation,t=e}this.viewer.raiseEvent("selection",t),this.undraw()}return this},cancel:function(){return this.outerTracker.setTracking(!1),this.outerTracker.setTracking(!0),this.viewer.raiseEvent("selection_cancel",!1),this.undraw()}})}(OpenSeadragon),function(i){"use strict";i.SelectionOverlay=function(t,e){i.Overlay.apply(this,arguments),i.isPlainObject(t)?this.rotation=t.location.rotation||0:this.rotation=e.rotation||0},i.SelectionOverlay.prototype=i.extend(Object.create(i.Overlay.prototype),{drawHTML:function(){i.Overlay.prototype.drawHTML.apply(this,arguments),this.style.transform=this.style.transform.replace(/ ?rotate\(.+rad\)/,"")+" rotate("+this.rotation+"rad)"},update:function(t){i.Overlay.prototype.update.apply(this,arguments),this.rotation=t.rotation||0}})}(OpenSeadragon),function(n){"use strict";n.SelectionRect=function(t,e,i,s,r){n.Rect.apply(this,[t,e,i,s]),this.rotation=r||0},n.SelectionRect.fromRect=function(t){return new n.SelectionRect(t.x,t.y,t.width,t.height)},n.SelectionRect.prototype=n.extend(Object.create(n.Rect.prototype),{clone:function(){return new n.SelectionRect(this.x,this.y,this.width,this.height,this.rotation)},equals:function(t){return n.Rect.prototype.equals.apply(this,[t])&&this.rotation===t.rotation},toString:function(){return"["+Math.round(100*this.x)/100+","+Math.round(100*this.y)/100+","+Math.round(100*this.width)/100+"x"+Math.round(100*this.height)/100+"@"+Math.round(100*this.rotation)/100+"]"},swapWidthHeight:function(){var t=this.clone();return t.width=this.height,t.height=this.width,t.x+=(this.width-this.height)/2,t.y+=(this.height-this.width)/2,t},getDegreeRotation:function(){return this.rotation*(180/Math.PI)},getAngleFromCenter:function(t){var e=t.minus(this.getCenter());return Math.atan2(e.x,e.y)},round:function(){return new n.SelectionRect(Math.round(this.x),Math.round(this.y),Math.round(this.width),Math.round(this.height),this.rotation)},normalize:function(){var t=this.clone();return t.width<0&&(t.x+=t.width,t.width*=-1),t.height<0&&(t.y+=t.height,t.height*=-1),t.rotation%=Math.PI,t},fitsIn:function(t){for(var e=this.normalize(),i=[e.getTopLeft(),e.getTopRight(),e.getBottomRight(),e.getBottomLeft()],s=e.getCenter(),r=e.getDegreeRotation(),n=t.getBottomRight(),o=0;o<4;o++)if(i[o]=i[o].rotate(r,s),i[o].x<t.x||i[o].x>n.x||i[o].y<t.y||i[o].y>n.y)return!1;return!0},reduceRotation:function(){var t;return this.rotation<Math.PI/-4?(t=this.swapWidthHeight()).rotation+=Math.PI/2:this.rotation>Math.PI/4?(t=this.swapWidthHeight()).rotation-=Math.PI/2:t=this.clone(),t}})}(OpenSeadragon);
//# sourceMappingURL=openseadragonselection.js.map
