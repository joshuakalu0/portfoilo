(function () {
	function Dome(els) {
		for (var i = 0; i < els.length; i++) {
			this[i] = els[i];
		}
		this.length = els.length;
	}

	Dome.prototype.map = function (callback) {
		var results = [],
			i = 0;
		for (; i < this.length; i++) {
			results.push(callback.call(this, this[i], i));
		}
		return results;
	};
	Dome.prototype.prepend = function (els) {
		return this.forEach(function (parEl, i) {
			for (var j = els.length - 1; j > -1; j--) {
				childEl = i > 0 ? els[j].cloneNode(true) : els[j];
				parEl.insertBefore(childEl, parEl.firstChild);
			}
		});
	};
	Dome.prototype.remove = function () {
		return this.forEach(function (el) {
			return el.parentNode.removeChild(el);
		});
	};
	Dome.prototype.on = (function () {
		if (document.addEventListener) {
			return function (evt, fn) {
				return this.forEach(function (el) {
					el.addEventListener(evt, fn, false);
				});
			};
		} else if (document.attachEvent) {
			return function (evt, fn) {
				return this.forEach(function (el) {
					el.attachEvent("on" + evt, fn);
				});
			};
		} else {
			return function (evt, fn) {
				return this.forEach(function (el) {
					el["on" + evt] = fn;
				});
			};
		}
	})();

	Dome.prototype.forEach = function (callback) {
		this.map(callback);
		return this;
	};
	Dome.prototype.append = function (els) {
		return this.forEach(function (parEl, i) {
			els.forEach(function (childEl) {
				if (i > 0) {
					childEl = childEl.cloneNode(true);
				}
				parEl.appendChild(childEl);
			});
		});
	};
	Dome.prototype.prepend = function (els) {
		return this.forEach(function (parEl, i) {
			for (var j = els.length - 1; j > -1; j--) {
				childEl = i > 0 ? els[j].cloneNode(true) : els[j];
				parEl.insertBefore(childEl, parEl.firstChild);
			}
		});
	};

	Dome.prototype.off = (function () {
		if (document.removeEventListener) {
			return function (evt, fn) {
				return this.forEach(function (el) {
					el.removeEventListener(evt, fn, false);
				});
			};
		} else if (document.detachEvent) {
			return function (evt, fn) {
				return this.forEach(function (el) {
					el.detachEvent("on" + evt, fn);
				});
			};
		} else {
			return function (evt, fn) {
				return this.forEach(function (el) {
					el["on" + evt] = null;
				});
			};
		}
	})();
	Dome.prototype.mapOne = function (callback) {
		var m = this.map(callback);
		return m.length > 1 ? m : m[0];
	};

	Dome.prototype.text = function (text) {
		if (typeof text !== "undefined") {
			return this.forEach(function (el) {
				el.innerText = text;
			});
		} else {
			return this.mapOne(function (el) {
				return el.innerText;
			});
		}
	};
	Dome.prototype.html = function (html) {
		if (typeof html !== "undefined") {
			this.forEach(function (el) {
				el.innerHTML = html;
			});
			return this;
		} else {
			return this.mapOne(function (el) {
				return el.innerHTML;
			});
		}
	};
	Dome.prototype.addClass = function (classes) {
		var className = "";
		if (typeof classes !== "string") {
			for (var i = 0; i < classes.length; i++) {
				className += " " + classes[i];
			}
		} else {
			className = " " + classes;
		}
		return this.forEach(function (el) {
			el.className += className;
		});
	};

	Dome.prototype.removeClass = function (clazz) {
		return this.forEach(function (el) {
			var cs = el.className.split(" "),
				i;

			while ((i = cs.indexOf(clazz)) > -1) {
				cs = cs.slice(0, i).concat(cs.slice(++i));
			}
			el.className = cs.join(" ");
		});
	};
	Dome.prototype.attr = function (attr, val) {
		if (typeof val !== "undefined") {
			return this.forEach(function (el) {
				el.setAttribute(attr, val);
			});
		} else {
			return this.mapOne(function (el) {
				return el.getAttribute(attr);
			});
		}
	};

	Dome.prototype.css = function (obj) {
		if (typeof obj === "object") {
			let keys = Object.keys(obj);
			let values = Object.values(obj);
			if (keys) {
				return this.forEach(function (el) {
					keys.forEach((key, i, s) => {
						el.style[key] = values[i];
					});
				});
			}
		} else {
			return this.mapOne(function (el) {
				return el.classList;
			});
		}
	};
	Dome.prototype.toggleCss = function (classes) {
		if (typeof classes === "string") {
			return this.forEach(function (el) {
				el.classList.toggle(classes);
			});
		} else {
			return this.mapOne(function (el) {
				return el.classList;
			});
		}
	};
	Dome.prototype.addCss = function (classes) {
		if (typeof classes === "string") {
			return this.forEach(function (el) {
				el.classList.add(classes);
			});
		} else {
			return this.mapOne(function (el) {
				return el.classList;
			});
		}
	};
	Dome.prototype.removeCss = function (classes) {
		if (typeof classes === "string") {
			return this.forEach(function (el) {
				el.classList.remove(classes);
			});
		} else {
			return this.mapOne(function (el) {
				return el.classList;
			});
		}
	};
	Dome.prototype.hide = function (time) {
		let num;
		try {
			num = parseFloat(time);
		} catch (error) {
			num = 0.0;
			console.error("hide function takes only float points or numbers", error);
		}
		if (typeof time === "string") {
			return this.forEach(function (el) {
				el.style.transition = String(num) + "s";
				el.style.opacity = "0";
				let t = setTimeout(function () {
					el.style.display = "none";
					clearTimeout(t);
				}, num * 1000);

				// el.classList.remove(classes);
			});
			// return this;
		} else {
			return this.mapOne(function (el) {
				el.style.display = "none";
				return el.classList;
			});
		}
	};
	Dome.prototype.show = function (time) {
		let num;
		try {
			num = parseFloat(time);
		} catch (error) {
			num = 0.0;
			console.error("hide function takes only float points or numbers", error);
		}
		if (typeof time === "string") {
			return this.forEach(function (el) {
				el.style.transition = String(num) + "s";
				el.style.display = "block";
				let t = setTimeout(function () {
					el.style.opacity = "1";
					clearTimeout(t);
				}, 0000);

				// el.classList.remove(classes);
			});
			// return this;
		} else {
			return this.mapOne(function (el) {
				el.style.display = "inline-block";
				return el.classList;
			});
		}
	};
	Dome.prototype.toggle = function (type = "inline-block") {
		return this.forEach(function (el) {
			let style = el.style.display == "none" ? type : "none";
			el.style.display = style;
		});

		// } else {
		// 	return this.mapOne(function (el) {
		// 		el.style.display = "inline-block";
		// 		return el.classList;
		// 	});
		// }
	};

	var dome = {
		get: function (selector) {
			var els;
			if (typeof selector === "string") {
				els = document.querySelectorAll(selector);
			} else if (selector.length) {
				els = selector;
			} else {
				els = [selector];
			}
			return new Dome(els);
		},
		create: function (tagName, attrs) {
			var el = new Dome([document.createElement(tagName)]);
			if (attrs) {
				if (attrs.className) {
					el.addClass(attrs.className);
					delete attrs.className;
				}
				if (attrs.text) {
					el.text(attrs.text);
					delete attrs.text;
				}
				for (var key in attrs) {
					if (attrs.hasOwnProperty(key)) {
						el.attr(key, attrs[key]);
					}
				}
			}
			return el;
		},
		ajax: async function (obj) {
			let url,
				body,
				method,
				type = obj;
			try {
				let main = "";
				let req = new Resquest(url, {
					method: met,
					body: body,
				});
				let one = await fetch(req);
				if (rtype == "text") {
					main = await one.text();
				} else if (rtype == "json") {
					main = await one.json();
				}
				return main;
			} catch (err) {
				console.warn(
					"there was an error running the request" + err + "occured"
				);
			}
		},
	};

	window.$ = dome.get;
	window._ = dome;
	return dome;
})(window);
