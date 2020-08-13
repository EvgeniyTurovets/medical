jQuery.gdropdown = {
	
};

(function($){
	$.fn.gdropdown = function(options, params){
		if(this.length > 0){
			if($.type(params) === 'undefined' && $.type(options) === 'object'){
				params = options;
			}
			
			if($.type(options) === 'undefined' || $.type(options) === 'object'){
				params = $.extend(true, {}, $.gdropdown, params);
				return this.each(function(){
					if(!$(this).data('gdropdown')){
						$(this).data('gdropdown', new Gdropdown(this, params));
					}
				});
			}
			
			if($.type(options) === 'string'){
				params = $.extend(true, {}, $.gdropdown, params);
				
				var dropdown = $(this).data('gdropdown');
				
				switch (options){
					case 'get':
						return dropdown.get();
					case 'show':
						return dropdown.show();
					case 'hide':
						return dropdown.hide();
					case 'toggle':
						return dropdown.toggle();
				}
			}
		}
	}
	
	var Gdropdown = function(elem, params){
		this.element = elem;
		this.settings = params;
		
		this.shown = false;
		
		this.init();
	};
	
	Gdropdown.prototype = {
		init: function(){
			var dropdown = this;
			$(dropdown.element).addClass('gdropdown');
			$(dropdown.element).css({
				'background-clip' : 'padding-box',
				'display' : 'none',
				'float' : 'left',
				'left' : '0',
				'list-style' : 'outside none none',
				'position' : 'absolute',
				'top' : '100%',
				'z-index' : '1000',
			});
			
			$(dropdown.element).find('a').on('click', function(){
				dropdown.hide();
			});
			
			$(document).on('mousedown', function(e){
				if(dropdown.shown){
					if($(e.target).get(0) != $(dropdown.element).get(0) && !$.contains($(dropdown.element).get(0), $(e.target).get(0))){
						dropdown.hide();
					}
				}
			});
		},
		
		get: function(){
			var dropdown = this;
			return dropdown;
		},
		
		show: function(){
			var dropdown = this;
			$(dropdown.element).trigger('show.gdropdown');
			$(dropdown.element).show();
			$(dropdown.element).trigger('shown.gdropdown');
			dropdown.shown = true;
		},
		
		hide: function(){
			var dropdown = this;
			$(dropdown.element).trigger('hide.gdropdown');
			$(dropdown.element).hide();
			$(dropdown.element).trigger('hidden.gdropdown');
			dropdown.shown = false;
		},
		
		toggle: function(){
			var dropdown = this;
			
			if(dropdown.shown){
				dropdown.hide();
			}else{
				dropdown.show();
			}
			
			//$(dropdown.element).toggle();
		},
		
	};
}(jQuery));


jQuery(function($){ $(".hasTooltip").tooltip({"html": true,"container": "body"}); });
	



	
	jQuery(document).ready(function($){
				$("#chronoform-Форма_заявки").gvalidate();

				$("#chronoform-Форма_заявки").find(":input").on("invalid.gvalidation", function(){
					var field = $(this);
					if(field.is(":hidden")){
						if(field.closest(".tab-pane").length > 0){
							var tab_id = field.closest(".tab-pane").attr("id");
							$('a[href="#'+tab_id+'"]').closest(".nav").gtabs("get").show($('a[href="#'+tab_id+'"]'));
						}
						if(field.closest(".panel-collapse").length > 0){
							var slider_id = field.closest(".panel-collapse").attr("id");
							$('a[href="#'+slider_id+'"]').closest(".panel-group").gsliders("get").show($('a[href="#'+slider_id+'"]'));
						}
					}
					if(field.data("wysiwyg") == "1"){
						field.data("gvalidation-target", field.parent());
					}
				});
				$("#chronoform-Форма_заявки").on("success.gvalidation", function(e){
					if($("#chronoform-Форма_заявки").data("gvalidate_success")){
						var gvalidate_success = $("#chronoform-Форма_заявки").data("gvalidate_success");
						if(gvalidate_success in window){
							window[gvalidate_success](e, $("#chronoform-Форма_заявки"));
						}
					}
				});
				$("#chronoform-Форма_заявки").on("fail.gvalidation", function(e){
					if($("#chronoform-Форма_заявки").data("gvalidate_fail")){
						var gvalidate_fail = $("#chronoform-Форма_заявки").data("gvalidate_fail");
						if(gvalidate_fail in window){
							window[gvalidate_fail](e, $("#chronoform-Форма_заявки"));
						}
					}
				});
			

					function chronoforms_validation_signs(formObj){
						formObj.find(":input[class*=validate]").each(function(){
							if($(this).attr("class").indexOf("required") >= 0 || $(this).attr("class").indexOf("group") >= 0){
								var required_parent = [];
								if($(this).closest(".gcore-subinput-container").length > 0){
									var required_parent = $(this).closest(".gcore-subinput-container");
								}else if($(this).closest(".gcore-form-row, .form-group").length > 0){
									var required_parent = $(this).closest(".gcore-form-row, .form-group");
								}
								if(required_parent.length > 0){
									var required_label = required_parent.find("label");
									if(required_label.length > 0 && !required_label.first().hasClass("required_label")){
										required_label.first().addClass("required_label");
										required_label.first().html(required_label.first().html() + " <i class='fa fa-asterisk' style='color:#ff0000; font-size:9px; vertical-align:top;'></i>");
									}
								}
							}
						});
					}
					chronoforms_validation_signs($("#chronoform-Форма_заявки"));
				

				function chronoforms_data_tooltip(formObj){
					formObj.find(":input").each(function(){
						if($(this).data("tooltip") && $(this).closest(".gcore-input, .gcore-input-wide").length > 0){
							var tipped_parent = [];
							if($(this).closest(".gcore-subinput-container").length > 0){
								var tipped_parent = $(this).closest(".gcore-subinput-container");
							}else if($(this).closest(".gcore-form-row, .form-group").length > 0){
								var tipped_parent = $(this).closest(".gcore-form-row, .form-group");
							}
							if(tipped_parent.length > 0){
								var tipped_label = tipped_parent.find("label");
								if(tipped_label.length > 0 && !tipped_label.first().hasClass("tipped_label")){
									tipped_label.first().addClass("tipped_label");
									var $tip = $("<i class='fa fa-exclamation-circle input-tooltip' style='color:#2693FF; padding-left:5px;'></i>");
									$tip.data("content", $(this).data("tooltip"));
									tipped_label.first().append($tip);
								}
							}
						}
					});
					formObj.find(".input-tooltip").gtooltip();
				}
				chronoforms_data_tooltip($("#chronoform-Форма_заявки"));
			

				function chronoforms_data_loadstate(formObj){
					formObj.find(':input[data-load-state="disabled"]').prop("disabled", true);
					formObj.find('*[data-load-state="hidden"]').css("display", "none");
					formObj.find(':input[data-load-state="hidden_parent"]').each(function(){
						if($(this).closest(".gcore-subinput-container").length > 0){
							$(this).closest(".gcore-subinput-container").css("display", "none");
						}else if($(this).closest(".gcore-form-row").length > 0){
							$(this).closest(".gcore-form-row").css("display", "none");
						}
					});
				}
				chronoforms_data_loadstate($("#chronoform-Форма_заявки"));
			
$(":input").inputmask();
function chronoforms_fields_events(){
}
chronoforms_fields_events();
function chronoforms_pageload_fields_events(){

}
chronoforms_pageload_fields_events();
			});
	jQuery(document).ready(function($){
			$('[data-g-toggle="tab"]').closest('.nav').gtabs({
				'pane_selector':'.tab-pane',
				'tab_selector':'[data-g-toggle="tab"]',
			});
			$('[data-g-toggle="collapse"]').closest('.panel-group').gsliders({
				'pane_selector':'.panel-collapse',
				'tab_selector':'[data-g-toggle="collapse"]',
				'active_pane_class':'in',
			});
			
			$('[data-g-toggle="modal"]').on('click', function(e){
				e.preventDefault();
				$modal = $($(this).data('g-target'));
				$modal.gmodal({
					'close_selector' : '[data-g-dismiss="modal"]',
				});
				$modal.gmodal('open');
			});
			
			$('.gdropdown').gdropdown();
			$('[data-g-toggle="dropdown"]').on('click', function(e){
				e.preventDefault();
				$(this).parent().find('.gdropdown').gdropdown('toggle');
			});
		});
	