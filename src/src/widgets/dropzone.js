'use strict';

import Lang from '../utils/lang.js';
import Array from '../utils/array.js';
import Dom from '../utils/dom.js';
import Widget from '../ui/widget.js';

export default Lang.Templatable("Widget.Dropzone", class Dropzone extends Widget { 

	constructor(container) {
		super(container);
		
		this.files = null;
		
		this.Node("input").addEventListener("change", this.OnInput_Change.bind(this));
	}
	
	Template() {
		return "<div handle='title' class='dropzone-title'>nls(Dropzone_Title)</div>" +
			   "<div class='box d-vertical d-center' id='maFile'>" +
				  "<div handle='message' class='dropzone-message'>" +
					  "<div class='dropzone-instructions'>nls(Dropzone_Instructions)</div>" +
					  "<br>" +
					  "<i handle='icon' class='fas fa-exclamation-triangle'></i>" +
				  "</div>" +
				  "<input handle='input' type='file' multiple />" +
			   "</div>";
	}
	
	OnInput_Change(ev) {
		if (ev.target.files.length == 0) return;
				
		this.files = Array.Map(ev.target.files, function(f) { 
			return { name:f.name, raw:f };
		});
		
		var css = ev.target.files.length > 0 ? "fas fa-thumbs-up" : "fas fa-exclamation-triangle";
		
		Dom.SetCss(this.Node("icon"), css);
		
		this.Emit("Change", { files:this.files });
	}
	
	Reset() {
		this.Node("input").value = "";
	}
});