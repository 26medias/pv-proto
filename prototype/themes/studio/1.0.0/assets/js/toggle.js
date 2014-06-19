/**
	formapi
	@version:		1.0.0
	@author:		Julien Loutre <julien.loutre@gmail.com>
*/
(function($){
 	$.fn.extend({
 		wtoggle: function() {
			var plugin_namespace = "wtoggle";
			
			var pluginClass = function() {};
			
			pluginClass.prototype.init = function (options) {
				try {
					
					var scope = this;
					
					this.options = $.extend({
						min:		0,
						max:		"auto",
						label:		"Hide",
						trigger:	$()
					},options, this.element.data());
					
					this.options.default_label = $(this.element.data("trigger")).html();
					
					this.element.css({
						"overflow":		"hidden",
						"min-height":	this.options.min,
						"max-height":	this.options.max,
						"height":		this.options.min
					});
					
					scope.toggled = true;
					
					$(this.element.data("trigger")).click(function() {
						if (scope.toggled) {
							scope.element.css({
								"height":		scope.options.max,
								"overflow":		"auto"
							});
							$(scope.element.data("trigger")).html(scope.options.label);
						} else {
							scope.element.css({
								"height":		scope.options.min,
								"overflow":		"hidden"
							});
							$(scope.element.data("trigger")).html(scope.options.default_label);
						}
						scope.toggled = !scope.toggled;
					});
					
					
				} catch (err) {
					this.error(err);
				}
			};
			pluginClass.prototype.skin = function () {
				try {
					
				} catch (err) {
					this.error(err);
				}
			};
			
			
			
			
			pluginClass.prototype.__init = function (element) {
				try {
					this.element = element;
				} catch (err) {
					this.error(err);
				}
			};
			// centralized error handler
			pluginClass.prototype.error = function (e) {
				if (console && console.info) {
					console.info("error on "+plugin_namespace+":",e);
				}
			};
			// Centralized routing function
			pluginClass.prototype.execute = function (fn, options) {
				try {
					if (typeof(this[fn]) == "function") {
						var output = this[fn].apply(this, [options]);
					} else {
						this.error("'"+fn.toString()+"()' is not a function");
					}
				} catch (err) {
					this.error(err);
				}
			};
			
			// process
			var fn;
			var options;
			if (arguments.length == 0) {
				fn = "init";
				options = {};
			} else if (arguments.length == 1 && typeof(arguments[0]) == 'object') {
				fn = "init";
				options = $.extend({},arguments[0]);
			} else {
				fn = arguments[0];
				options = arguments[1];
			}
			$.each(this, function(idx, item) {
				// if the plugin does not yet exist, let's create it.
				if ($(item).data(plugin_namespace) == null) {
					$(item).data(plugin_namespace, new pluginClass());
					$(item).data(plugin_namespace).__init($(item));
				}
				$(item).data(plugin_namespace).execute(fn, options);
			});
			return this;
    	}
	});
	
})(jQuery);

$(function() {
	
	$('[data-widget="toggle"]').wtoggle();
	
});