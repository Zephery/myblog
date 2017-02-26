/**
 * @license A class to parse color values
 * @author Stoyan Stefanov <sstoo@gmail.com>
 * @link   http://www.phpied.com/rgb-color-parser-in-javascript/
 * Use it if you like it
 *
 */
function RGBColor(color_string)
{
    this.ok = false;

    // strip any leading #
    if (color_string.charAt(0) == '#') { // remove # if any
        color_string = color_string.substr(1,6);
    }

    color_string = color_string.replace(/ /g,'');
    color_string = color_string.toLowerCase();

    // before getting into regexps, try simple matches
    // and overwrite the input
    var simple_colors = {
        aliceblue: 'f0f8ff',
        antiquewhite: 'faebd7',
        aqua: '00ffff',
        aquamarine: '7fffd4',
        azure: 'f0ffff',
        beige: 'f5f5dc',
        bisque: 'ffe4c4',
        black: '000000',
        blanchedalmond: 'ffebcd',
        blue: '0000ff',
        blueviolet: '8a2be2',
        brown: 'a52a2a',
        burlywood: 'deb887',
        cadetblue: '5f9ea0',
        chartreuse: '7fff00',
        chocolate: 'd2691e',
        coral: 'ff7f50',
        cornflowerblue: '6495ed',
        cornsilk: 'fff8dc',
        crimson: 'dc143c',
        cyan: '00ffff',
        darkblue: '00008b',
        darkcyan: '008b8b',
        darkgoldenrod: 'b8860b',
        darkgray: 'a9a9a9',
        darkgreen: '006400',
        darkkhaki: 'bdb76b',
        darkmagenta: '8b008b',
        darkolivegreen: '556b2f',
        darkorange: 'ff8c00',
        darkorchid: '9932cc',
        darkred: '8b0000',
        darksalmon: 'e9967a',
        darkseagreen: '8fbc8f',
        darkslateblue: '483d8b',
        darkslategray: '2f4f4f',
        darkturquoise: '00ced1',
        darkviolet: '9400d3',
        deeppink: 'ff1493',
        deepskyblue: '00bfff',
        dimgray: '696969',
        dodgerblue: '1e90ff',
        feldspar: 'd19275',
        firebrick: 'b22222',
        floralwhite: 'fffaf0',
        forestgreen: '228b22',
        fuchsia: 'ff00ff',
        gainsboro: 'dcdcdc',
        ghostwhite: 'f8f8ff',
        gold: 'ffd700',
        goldenrod: 'daa520',
        gray: '808080',
        green: '008000',
        greenyellow: 'adff2f',
        honeydew: 'f0fff0',
        hotpink: 'ff69b4',
        indianred : 'cd5c5c',
        indigo : '4b0082',
        ivory: 'fffff0',
        khaki: 'f0e68c',
        lavender: 'e6e6fa',
        lavenderblush: 'fff0f5',
        lawngreen: '7cfc00',
        lemonchiffon: 'fffacd',
        lightblue: 'add8e6',
        lightcoral: 'f08080',
        lightcyan: 'e0ffff',
        lightgoldenrodyellow: 'fafad2',
        lightgrey: 'd3d3d3',
        lightgreen: '90ee90',
        lightpink: 'ffb6c1',
        lightsalmon: 'ffa07a',
        lightseagreen: '20b2aa',
        lightskyblue: '87cefa',
        lightslateblue: '8470ff',
        lightslategray: '778899',
        lightsteelblue: 'b0c4de',
        lightyellow: 'ffffe0',
        lime: '00ff00',
        limegreen: '32cd32',
        linen: 'faf0e6',
        magenta: 'ff00ff',
        maroon: '800000',
        mediumaquamarine: '66cdaa',
        mediumblue: '0000cd',
        mediumorchid: 'ba55d3',
        mediumpurple: '9370d8',
        mediumseagreen: '3cb371',
        mediumslateblue: '7b68ee',
        mediumspringgreen: '00fa9a',
        mediumturquoise: '48d1cc',
        mediumvioletred: 'c71585',
        midnightblue: '191970',
        mintcream: 'f5fffa',
        mistyrose: 'ffe4e1',
        moccasin: 'ffe4b5',
        navajowhite: 'ffdead',
        navy: '000080',
        oldlace: 'fdf5e6',
        olive: '808000',
        olivedrab: '6b8e23',
        orange: 'ffa500',
        orangered: 'ff4500',
        orchid: 'da70d6',
        palegoldenrod: 'eee8aa',
        palegreen: '98fb98',
        paleturquoise: 'afeeee',
        palevioletred: 'd87093',
        papayawhip: 'ffefd5',
        peachpuff: 'ffdab9',
        peru: 'cd853f',
        pink: 'ffc0cb',
        plum: 'dda0dd',
        powderblue: 'b0e0e6',
        purple: '800080',
        red: 'ff0000',
        rosybrown: 'bc8f8f',
        royalblue: '4169e1',
        saddlebrown: '8b4513',
        salmon: 'fa8072',
        sandybrown: 'f4a460',
        seagreen: '2e8b57',
        seashell: 'fff5ee',
        sienna: 'a0522d',
        silver: 'c0c0c0',
        skyblue: '87ceeb',
        slateblue: '6a5acd',
        slategray: '708090',
        snow: 'fffafa',
        springgreen: '00ff7f',
        steelblue: '4682b4',
        tan: 'd2b48c',
        teal: '008080',
        thistle: 'd8bfd8',
        tomato: 'ff6347',
        turquoise: '40e0d0',
        violet: 'ee82ee',
        violetred: 'd02090',
        wheat: 'f5deb3',
        white: 'ffffff',
        whitesmoke: 'f5f5f5',
        yellow: 'ffff00',
        yellowgreen: '9acd32'
    };
    for (var key in simple_colors) {
        if (color_string == key) {
            color_string = simple_colors[key];
        }
    }
    // emd of simple type-in colors

    // array of color definition objects
    var color_defs = [
        {
            re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
            example: ['rgb(123, 234, 45)', 'rgb(255,234,245)'],
            process: function (bits){
                return [
                    parseInt(bits[1]),
                    parseInt(bits[2]),
                    parseInt(bits[3])
                ];
            }
        },
        {
            re: /^(\w{2})(\w{2})(\w{2})$/,
            example: ['#00ff00', '336699'],
            process: function (bits){
                return [
                    parseInt(bits[1], 16),
                    parseInt(bits[2], 16),
                    parseInt(bits[3], 16)
                ];
            }
        },
        {
            re: /^(\w{1})(\w{1})(\w{1})$/,
            example: ['#fb0', 'f0f'],
            process: function (bits){
                return [
                    parseInt(bits[1] + bits[1], 16),
                    parseInt(bits[2] + bits[2], 16),
                    parseInt(bits[3] + bits[3], 16)
                ];
            }
        }
    ];

    // search through the definitions to find a match
    for (var i = 0; i < color_defs.length; i++) {
        var re = color_defs[i].re;
        var processor = color_defs[i].process;
        var bits = re.exec(color_string);
        if (bits) {
            channels = processor(bits);
            this.r = channels[0];
            this.g = channels[1];
            this.b = channels[2];
            this.ok = true;
        }

    }

    // validate/cleanup values
    this.r = (this.r < 0 || isNaN(this.r)) ? 0 : ((this.r > 255) ? 255 : this.r);
    this.g = (this.g < 0 || isNaN(this.g)) ? 0 : ((this.g > 255) ? 255 : this.g);
    this.b = (this.b < 0 || isNaN(this.b)) ? 0 : ((this.b > 255) ? 255 : this.b);

    // some getters
    this.toRGB = function () {
        return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
    }
    this.toHex = function () {
        var r = this.r.toString(16);
        var g = this.g.toString(16);
        var b = this.b.toString(16);
        if (r.length == 1) r = '0' + r;
        if (g.length == 1) g = '0' + g;
        if (b.length == 1) b = '0' + b;
        return '#' + r + g + b;
    }

    // help
    this.getHelpXML = function () {

        var examples = new Array();
        // add regexps
        for (var i = 0; i < color_defs.length; i++) {
            var example = color_defs[i].example;
            for (var j = 0; j < example.length; j++) {
                examples[examples.length] = example[j];
            }
        }
        // add type-in colors
        for (var sc in simple_colors) {
            examples[examples.length] = sc;
        }

        var xml = document.createElement('ul');
        xml.setAttribute('id', 'rgbcolor-examples');
        for (var i = 0; i < examples.length; i++) {
            try {
                var list_item = document.createElement('li');
                var list_color = new RGBColor(examples[i]);
                var example_div = document.createElement('div');
                example_div.style.cssText =
                        'margin: 3px; '
                        + 'border: 1px solid black; '
                        + 'background:' + list_color.toHex() + '; '
                        + 'color:' + list_color.toHex()
                ;
                example_div.appendChild(document.createTextNode('test'));
                var list_item_value = document.createTextNode(
                    ' ' + examples[i] + ' -> ' + list_color.toRGB() + ' -> ' + list_color.toHex()
                );
                list_item.appendChild(example_div);
                list_item.appendChild(list_item_value);
                xml.appendChild(list_item);

            } catch(e){}
        }
        return xml;

    }

}

/**
 * @license canvg.js - Javascript SVG parser and renderer on Canvas
 * MIT Licensed 
 * Gabe Lerner (gabelerner@gmail.com)
 * http://code.google.com/p/canvg/
 *
 * Requires: rgbcolor.js - http://www.phpied.com/rgb-color-parser-in-javascript/
 *
 */
if(!window.console) {
	window.console = {};
	window.console.log = function(str) {};
	window.console.dir = function(str) {};
}

if(!Array.prototype.indexOf){
	Array.prototype.indexOf = function(obj){
		for(var i=0; i<this.length; i++){
			if(this[i]==obj){
				return i;
			}
		}
		return -1;
	}
}

(function(){
	// canvg(target, s)
	// empty parameters: replace all 'svg' elements on page with 'canvas' elements
	// target: canvas element or the id of a canvas element
	// s: svg string, url to svg file, or xml document
	// opts: optional hash of options
	//		 ignoreMouse: true => ignore mouse events
	//		 ignoreAnimation: true => ignore animations
	//		 ignoreDimensions: true => does not try to resize canvas
	//		 ignoreClear: true => does not clear canvas
	//		 offsetX: int => draws at a x offset
	//		 offsetY: int => draws at a y offset
	//		 scaleWidth: int => scales horizontally to width
	//		 scaleHeight: int => scales vertically to height
	//		 renderCallback: function => will call the function after the first render is completed
	//		 forceRedraw: function => will call the function on every frame, if it returns true, will redraw
	this.canvg = function (target, s, opts) {
		// no parameters
		if (target == null && s == null && opts == null) {
			var svgTags = document.getElementsByTagName('svg');
			for (var i=0; i<svgTags.length; i++) {
				var svgTag = svgTags[i];
				var c = document.createElement('canvas');
				c.width = svgTag.clientWidth;
				c.height = svgTag.clientHeight;
				svgTag.parentNode.insertBefore(c, svgTag);
				svgTag.parentNode.removeChild(svgTag);
				var div = document.createElement('div');
				div.appendChild(svgTag);
				canvg(c, div.innerHTML);
			}
			return;
		}	
		opts = opts || {};
	
		if (typeof target == 'string') {
			target = document.getElementById(target);
		}
		
		// reuse class per canvas
		var svg;
		if (target.svg == null) {
			svg = build();
			target.svg = svg;
		}
		else {
			svg = target.svg;
			svg.stop();
		}
		svg.opts = opts;
		
		var ctx = target.getContext('2d');
		if (typeof(s.documentElement) != 'undefined') {
			// load from xml doc
			svg.loadXmlDoc(ctx, s);
		}
		else if (s.substr(0,1) == '<') {
			// load from xml string
			svg.loadXml(ctx, s);
		}
		else {
			// load from url
			svg.load(ctx, s);
		}
	}

	function build() {
		var svg = { };
		
		svg.FRAMERATE = 30;
		svg.MAX_VIRTUAL_PIXELS = 30000;
		
		// globals
		svg.init = function(ctx) {
			svg.Definitions = {};
			svg.Styles = {};
			svg.Animations = [];
			svg.Images = [];
			svg.ctx = ctx;
			svg.ViewPort = new (function () {
				this.viewPorts = [];
				this.Clear = function() { this.viewPorts = []; }
				this.SetCurrent = function(width, height) { this.viewPorts.push({ width: width, height: height }); }
				this.RemoveCurrent = function() { this.viewPorts.pop(); }
				this.Current = function() { return this.viewPorts[this.viewPorts.length - 1]; }
				this.width = function() { return this.Current().width; }
				this.height = function() { return this.Current().height; }
				this.ComputeSize = function(d) {
					if (d != null && typeof(d) == 'number') return d;
					if (d == 'x') return this.width();
					if (d == 'y') return this.height();
					return Math.sqrt(Math.pow(this.width(), 2) + Math.pow(this.height(), 2)) / Math.sqrt(2);			
				}
			});
		}
		svg.init();
		
		// images loaded
		svg.ImagesLoaded = function() { 
			for (var i=0; i<svg.Images.length; i++) {
				if (!svg.Images[i].loaded) return false;
			}
			return true;
		}

		// trim
		svg.trim = function(s) { return s.replace(/^\s+|\s+$/g, ''); }
		
		// compress spaces
		svg.compressSpaces = function(s) { return s.replace(/[\s\r\t\n]+/gm,' '); }
		
		// ajax
		svg.ajax = function(url) {
			var AJAX;
			if(window.XMLHttpRequest){AJAX=new XMLHttpRequest();}
			else{AJAX=new ActiveXObject('Microsoft.XMLHTTP');}
			if(AJAX){
			   AJAX.open('GET',url,false);
			   AJAX.send(null);
			   return AJAX.responseText;
			}
			return null;
		} 
		
		// parse xml
		svg.parseXml = function(xml) {
			if (window.DOMParser)
			{
				var parser = new DOMParser();
				return parser.parseFromString(xml, 'text/xml');
			}
			else 
			{
				xml = xml.replace(/<!DOCTYPE svg[^>]*>/, '');
				var xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
				xmlDoc.async = 'false';
				xmlDoc.loadXML(xml); 
				return xmlDoc;
			}		
		}
		
		svg.Property = function(name, value) {
			this.name = name;
			this.value = value;
			
			this.hasValue = function() {
				return (this.value != null && this.value !== '');
			}
							
			// return the numerical value of the property
			this.numValue = function() {
				if (!this.hasValue()) return 0;
				
				var n = parseFloat(this.value);
				if ((this.value + '').match(/%$/)) {
					n = n / 100.0;
				}
				return n;
			}
			
			this.valueOrDefault = function(def) {
				if (this.hasValue()) return this.value;
				return def;
			}
			
			this.numValueOrDefault = function(def) {
				if (this.hasValue()) return this.numValue();
				return def;
			}
			
			/* EXTENSIONS */
			var that = this;
			
			// color extensions
			this.Color = {
				// augment the current color value with the opacity
				addOpacity: function(opacity) {
					var newValue = that.value;
					if (opacity != null && opacity != '') {
						var color = new RGBColor(that.value);
						if (color.ok) {
							newValue = 'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', ' + opacity + ')';
						}
					}
					return new svg.Property(that.name, newValue);
				}
			}
			
			// definition extensions
			this.Definition = {
				// get the definition from the definitions table
				getDefinition: function() {
					var name = that.value.replace(/^(url\()?#([^\)]+)\)?$/, '$2');
					return svg.Definitions[name];
				},
				
				isUrl: function() {
					return that.value.indexOf('url(') == 0
				},
				
				getFillStyle: function(e) {
					var def = this.getDefinition();
					
					// gradient
					if (def != null && def.createGradient) {
						return def.createGradient(svg.ctx, e);
					}
					
					// pattern
					if (def != null && def.createPattern) {
						return def.createPattern(svg.ctx, e);
					}
					
					return null;
				}
			}
			
			// length extensions
			this.Length = {
				DPI: function(viewPort) {
					return 96.0; // TODO: compute?
				},
				
				EM: function(viewPort) {
					var em = 12;
					
					var fontSize = new svg.Property('fontSize', svg.Font.Parse(svg.ctx.font).fontSize);
					if (fontSize.hasValue()) em = fontSize.Length.toPixels(viewPort);
					
					return em;
				},
			
				// get the length as pixels
				toPixels: function(viewPort) {
					if (!that.hasValue()) return 0;
					var s = that.value+'';
					if (s.match(/em$/)) return that.numValue() * this.EM(viewPort);
					if (s.match(/ex$/)) return that.numValue() * this.EM(viewPort) / 2.0;
					if (s.match(/px$/)) return that.numValue();
					if (s.match(/pt$/)) return that.numValue() * 1.25;
					if (s.match(/pc$/)) return that.numValue() * 15;
					if (s.match(/cm$/)) return that.numValue() * this.DPI(viewPort) / 2.54;
					if (s.match(/mm$/)) return that.numValue() * this.DPI(viewPort) / 25.4;
					if (s.match(/in$/)) return that.numValue() * this.DPI(viewPort);
					if (s.match(/%$/)) return that.numValue() * svg.ViewPort.ComputeSize(viewPort);
					return that.numValue();
				}
			}
			
			// time extensions
			this.Time = {
				// get the time as milliseconds
				toMilliseconds: function() {
					if (!that.hasValue()) return 0;
					var s = that.value+'';
					if (s.match(/s$/)) return that.numValue() * 1000;
					if (s.match(/ms$/)) return that.numValue();
					return that.numValue();
				}
			}
			
			// angle extensions
			this.Angle = {
				// get the angle as radians
				toRadians: function() {
					if (!that.hasValue()) return 0;
					var s = that.value+'';
					if (s.match(/deg$/)) return that.numValue() * (Math.PI / 180.0);
					if (s.match(/grad$/)) return that.numValue() * (Math.PI / 200.0);
					if (s.match(/rad$/)) return that.numValue();
					return that.numValue() * (Math.PI / 180.0);
				}
			}
		}
		
		// fonts
		svg.Font = new (function() {
			this.Styles = ['normal','italic','oblique','inherit'];
			this.Variants = ['normal','small-caps','inherit'];
			this.Weights = ['normal','bold','bolder','lighter','100','200','300','400','500','600','700','800','900','inherit'];
			
			this.CreateFont = function(fontStyle, fontVariant, fontWeight, fontSize, fontFamily, inherit) { 
				var f = inherit != null ? this.Parse(inherit) : this.CreateFont('', '', '', '', '', svg.ctx.font);
				return { 
					fontFamily: fontFamily || f.fontFamily, 
					fontSize: fontSize || f.fontSize, 
					fontStyle: fontStyle || f.fontStyle, 
					fontWeight: fontWeight || f.fontWeight, 
					fontVariant: fontVariant || f.fontVariant,
					toString: function () { return [this.fontStyle, this.fontVariant, this.fontWeight, this.fontSize, this.fontFamily].join(' ') } 
				} 
			}
			
			var that = this;
			this.Parse = function(s) {
				var f = {};
				var d = svg.trim(svg.compressSpaces(s || '')).split(' ');
				var set = { fontSize: false, fontStyle: false, fontWeight: false, fontVariant: false }
				var ff = '';
				for (var i=0; i<d.length; i++) {
					if (!set.fontStyle && that.Styles.indexOf(d[i]) != -1) { if (d[i] != 'inherit') f.fontStyle = d[i]; set.fontStyle = true; }
					else if (!set.fontVariant && that.Variants.indexOf(d[i]) != -1) { if (d[i] != 'inherit') f.fontVariant = d[i]; set.fontStyle = set.fontVariant = true;	}
					else if (!set.fontWeight && that.Weights.indexOf(d[i]) != -1) {	if (d[i] != 'inherit') f.fontWeight = d[i]; set.fontStyle = set.fontVariant = set.fontWeight = true; }
					else if (!set.fontSize) { if (d[i] != 'inherit') f.fontSize = d[i].split('/')[0]; set.fontStyle = set.fontVariant = set.fontWeight = set.fontSize = true; }
					else { if (d[i] != 'inherit') ff += d[i]; }
				} if (ff != '') f.fontFamily = ff;
				return f;
			}
		});
		
		// points and paths
		svg.ToNumberArray = function(s) {
			var a = svg.trim(svg.compressSpaces((s || '').replace(/,/g, ' '))).split(' ');
			for (var i=0; i<a.length; i++) {
				a[i] = parseFloat(a[i]);
			}
			return a;
		}		
		svg.Point = function(x, y) {
			this.x = x;
			this.y = y;
			
			this.angleTo = function(p) {
				return Math.atan2(p.y - this.y, p.x - this.x);
			}
			
			this.applyTransform = function(v) {
				var xp = this.x * v[0] + this.y * v[2] + v[4];
				var yp = this.x * v[1] + this.y * v[3] + v[5];
				this.x = xp;
				this.y = yp;
			}
		}
		svg.CreatePoint = function(s) {
			var a = svg.ToNumberArray(s);
			return new svg.Point(a[0], a[1]);
		}
		svg.CreatePath = function(s) {
			var a = svg.ToNumberArray(s);
			var path = [];
			for (var i=0; i<a.length; i+=2) {
				path.push(new svg.Point(a[i], a[i+1]));
			}
			return path;
		}
		
		// bounding box
		svg.BoundingBox = function(x1, y1, x2, y2) { // pass in initial points if you want
			this.x1 = Number.NaN;
			this.y1 = Number.NaN;
			this.x2 = Number.NaN;
			this.y2 = Number.NaN;
			
			this.x = function() { return this.x1; }
			this.y = function() { return this.y1; }
			this.width = function() { return this.x2 - this.x1; }
			this.height = function() { return this.y2 - this.y1; }
			
			this.addPoint = function(x, y) {	
				if (x != null) {
					if (isNaN(this.x1) || isNaN(this.x2)) {
						this.x1 = x;
						this.x2 = x;
					}
					if (x < this.x1) this.x1 = x;
					if (x > this.x2) this.x2 = x;
				}
			
				if (y != null) {
					if (isNaN(this.y1) || isNaN(this.y2)) {
						this.y1 = y;
						this.y2 = y;
					}
					if (y < this.y1) this.y1 = y;
					if (y > this.y2) this.y2 = y;
				}
			}			
			this.addX = function(x) { this.addPoint(x, null); }
			this.addY = function(y) { this.addPoint(null, y); }
			
			this.addBoundingBox = function(bb) {
				this.addPoint(bb.x1, bb.y1);
				this.addPoint(bb.x2, bb.y2);
			}
			
			this.addQuadraticCurve = function(p0x, p0y, p1x, p1y, p2x, p2y) {
				var cp1x = p0x + 2/3 * (p1x - p0x); // CP1 = QP0 + 2/3 *(QP1-QP0)
				var cp1y = p0y + 2/3 * (p1y - p0y); // CP1 = QP0 + 2/3 *(QP1-QP0)
				var cp2x = cp1x + 1/3 * (p2x - p0x); // CP2 = CP1 + 1/3 *(QP2-QP0)
				var cp2y = cp1y + 1/3 * (p2y - p0y); // CP2 = CP1 + 1/3 *(QP2-QP0)
				this.addBezierCurve(p0x, p0y, cp1x, cp2x, cp1y,	cp2y, p2x, p2y);
			}
			
			this.addBezierCurve = function(p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y) {
				// from http://blog.hackers-cafe.net/2009/06/how-to-calculate-bezier-curves-bounding.html
				var p0 = [p0x, p0y], p1 = [p1x, p1y], p2 = [p2x, p2y], p3 = [p3x, p3y];
				this.addPoint(p0[0], p0[1]);
				this.addPoint(p3[0], p3[1]);
				
				for (i=0; i<=1; i++) {
					var f = function(t) { 
						return Math.pow(1-t, 3) * p0[i]
						+ 3 * Math.pow(1-t, 2) * t * p1[i]
						+ 3 * (1-t) * Math.pow(t, 2) * p2[i]
						+ Math.pow(t, 3) * p3[i];
					}
					
					var b = 6 * p0[i] - 12 * p1[i] + 6 * p2[i];
					var a = -3 * p0[i] + 9 * p1[i] - 9 * p2[i] + 3 * p3[i];
					var c = 3 * p1[i] - 3 * p0[i];
					
					if (a == 0) {
						if (b == 0) continue;
						var t = -c / b;
						if (0 < t && t < 1) {
							if (i == 0) this.addX(f(t));
							if (i == 1) this.addY(f(t));
						}
						continue;
					}
					
					var b2ac = Math.pow(b, 2) - 4 * c * a;
					if (b2ac < 0) continue;
					var t1 = (-b + Math.sqrt(b2ac)) / (2 * a);
					if (0 < t1 && t1 < 1) {
						if (i == 0) this.addX(f(t1));
						if (i == 1) this.addY(f(t1));
					}
					var t2 = (-b - Math.sqrt(b2ac)) / (2 * a);
					if (0 < t2 && t2 < 1) {
						if (i == 0) this.addX(f(t2));
						if (i == 1) this.addY(f(t2));
					}
				}
			}
			
			this.isPointInBox = function(x, y) {
				return (this.x1 <= x && x <= this.x2 && this.y1 <= y && y <= this.y2);
			}
			
			this.addPoint(x1, y1);
			this.addPoint(x2, y2);
		}
		
		// transforms
		svg.Transform = function(v) {	
			var that = this;
			this.Type = {}
		
			// translate
			this.Type.translate = function(s) {
				this.p = svg.CreatePoint(s);			
				this.apply = function(ctx) {
					ctx.translate(this.p.x || 0.0, this.p.y || 0.0);
				}
				this.applyToPoint = function(p) {
					p.applyTransform([1, 0, 0, 1, this.p.x || 0.0, this.p.y || 0.0]);
				}
			}
			
			// rotate
			this.Type.rotate = function(s) {
				var a = svg.ToNumberArray(s);
				this.angle = new svg.Property('angle', a[0]);
				this.cx = a[1] || 0;
				this.cy = a[2] || 0;
				this.apply = function(ctx) {
					ctx.translate(this.cx, this.cy);
					ctx.rotate(this.angle.Angle.toRadians());
					ctx.translate(-this.cx, -this.cy);
				}
				this.applyToPoint = function(p) {
					var a = this.angle.Angle.toRadians();
					p.applyTransform([1, 0, 0, 1, this.p.x || 0.0, this.p.y || 0.0]);
					p.applyTransform([Math.cos(a), Math.sin(a), -Math.sin("�   �            �                    "�   x            �                    "�                                   "�   �            � (                  "�   �            � (                  "�   �                                "�   �            �                    "�   �            �                    "�   P            X                    "�                                    "�   �            �                    "�   @            H (                  "�   �             (                  "�   (            @                    "�   �            �                    "�   �            �                    "�   �            �                    "�   D            T                    "�                                   "�   �            �                    "�   L            T (                  "�                (                  "�   4            L                    "�   �                                "�   �            �                    "�   �            �                    "�   P            `                    "�   �            �                    "�   \            l 0                  "�                 (                  "�   �            �                    "�   �            �                    "�   �            �                    "�   0            H                    "�   �
                                 "�   �
            �
                    "�   
            
                    "�   �	            �	                    "�   x	            �	 0                  "�   4	            <	 (                  "�   �            �                    "�   �            �                    "�   T            \                    "�               $                    "�   �            �                    "�   �            �                    "�   $            ,                    "�   �            � (                  "�   �            � (                  "�   0            @                    "�   �                                 "�   �            �                    "�   �            �                    "�   T            \                    "�                (                    "�   �            �                    "�   �            � (                  "�   \            d (                  "�   �            �                    "�   �            �                    "�   |            �                    "�   <            L                    "�                                   "�   �            �                    "�   T            \ (                  "�                (                  "�   \            t                    "�   $            ,                    "�   �             �                     "�   �             �                     "�   t             �                     "�   @             H                     "�   ��            ��                    "�   |�            �� (                  "�   8�            @� (                  "�   ��            ��                    "�   t�            |�                    "�   <�            D�                    "�   �            �                    "�   ��            ��                    "�   x�            ��                    "�   H�            P�                    "�   ��             � (                  "�   ��            �� (                  "�   <�            L�                    "�   �            �                    "�   ��            ��                    "�   ��            ��                    "�   `�            h�                    "�   ��            �                    "�   ��            �� (                  "�   h�            p� (                  "�   ��            ��                    "�   |�            ��                    "�   <�            D�                    "�   �            �                    "�   ��            ��                    "�   ��            ��                    "�   $�            ,�                    "�   ��            �� (                  "�   ��            �� (                  "�   ��            ��                    "�   ��            ��                    "�   d�            l�                    "�   4�            <�                    "�   ��            �                    "�   ��            ��                    "�   L�            T�                    "�   ��            � (                  "�   ��            �� (                  "�   ��            ��                    "�   ��            ��                    "�   p�            x�                    "�   @�            H�                    "�    �            �                    "�   ��            ��                    "�   ��            ��                    "�   X�            `�                    "�   ��            � (                  "�   ��            �� (                  "�   ��            ��                    "�   ��            ��                    "�   ,�            T�                    "�   ��            ��                    "�   p�            ��                    "�   ��            ��                    "�   ��            ��                    "�   P�            X�                    "�    �            � (                  "�   ��            �� (                  "�   ��            �                    "�   ��            ��                    "�   ��            ��                    "�   P�            X�                    "�   �             �                    "�   ��            ��                    "�   `�            h�                    "�   0�            8�                    "�   ��            �� (                  "�   ��            �� (                  "�   ��            ��                    "�   ��            ��                    "�   T�            \�                    "�   $�            ,�                    "�   ��            ��                    "�   ��            ��                    "�   <�            D�                    "�   ��            �� (                  "�   ��            �� (                  "�   ��             �                    "�   ��            ��                    "�   ��            ��                    "�   H�            X�                    "�   �            �                    "�   ��            ��                    "�   `�            h� (                  "�   �            $� (                  "�   ��            ��                    "�   H�            P�                    "�   �             �                    "�   ��            ��                    "�   ��            ��                    "�   p�            x�                    "��   ��         /  ��                    "�   @�            H�                    "�F   ��         �   �� `                  "�   �            $�                    "�   ��            ��                    "�   ��            ��                    "�   <�            L�                    "�   ��            ��                    "�   ��            ��                    "�   $�            <�                    "�   ��            ��                    "�   l�            ��                    "�   �            (�                    "�   8�            H�                    "�   ��            ��                    "�   ,�            <�                    "�   ��            ��                    "�   t�            ��                    "�   (�            8�                    "�   ��            ��                    "�   p�            ��                    "�   <�            D�                    "�   ��            ��                    "�   x�            ��                    "�   �            $�                    "�   ��            ��                    "�   L�            d�                    "�   ��            �                    "�   ��            ��                    "�   @�            H�                    "�   ��            ��                    "�   `�            p�                    "�   �            �                    "�   l�            ��                    "�   �            �                    "�   ��            ��                    "�   `�            p�                    "�   �            $�                    "�   ��            о                    "�   4�            L�                    "�   ��            Ƚ                    "�   d�            t�                    "�    �            �                    "�   ��            ļ                    "�   ̻            �                    "�   ��            ��                    "�   غ            �                    "�   �            �                    "�   `#            p#                    "�   �            �                    "�   ��            �                    "�   D            L                    "�   ,�            4�                    "�   ({            8{                    "�   �            �                    "�   �            �                    "�   l�            |�                    "�   T�            d�                    "�   �            �                    "�   ��            ��                    "�   ��            ��                    "�   �             �                     "�   �            �                    "�   (,            8,                    "�   �.            �.                    "�   T            \                    "�   �%            �%                    "�   |�            ��                    "�   ��                                 "�   ~            4~                    "�                                    "�   ��            ��                    "�   @
            X
                    "�    �            �                    "�   @�            H�                    "�   �            ��                    "�   �            ��                    "�
   ��            �� 0                  "�   ��         5   �� @                  "�   @�            H�                    "�   ��            �� 0                  "�   (�            8� (                  "�   ��            ��                    "�   ��            �� H                  "�   L�            T� (                  "�   ��            ��                    "�   ��            ��                    "�   ��            ��                    "�   ��            ��                    "�   T�            \� 0                  "�   ��            �� p                  p                                                                                        ��                   RSDS�M��}B�1�<�{da   C:\dvs\p4\build\sw\gcomp\rel\gs_02_80\src\Mjolnir\Features\GsProxy\_out\win7_amd64_release\GsProxyPlugin.pdb        b   b                          �� ؘ ��                            �          �             ��         ����    @   ؘ                        Ж P� (�                            h�         x�             Ж         ����    @   P�                         � ș ��                            ��         �� x�                  �        ����    @   ș                        8� H�  �                            `�         �� �� x�                     8�        ����    @   H�                        p� К ��                            �         � �� x�                     p�        ����    @   К                        �� X� 0�                            p�         ��             ��         ����    @   X�                        З Л ��                            �          � ��                 З        ����    @   Л                         � P� (�                            h�         �� ��                  �        ����    @   P�             P�         ����    @   М                        �         ��                �      ��  � ��                            8�         h� �� �� P� x�                             ��        ����    @    �             �        ����    @   ��                        Н         �� �� P� x�                         8�               P    �                        8�         X� �� ؞                     8�        ����    @    �             x�        ����    @   ��                        ��         �� ؞                 ��        ����    @    �                        �         (�             ��         ����    @    �             x�               @   ��             ��               @    �                        ș ȟ ��                            ��         �� ��                 ș        ����    @   ȟ                        � H�  �                            `�         x� ��                 �        ����    @   H�             �         ����    @   Ƞ                        �         ��                        � Ƞ �                            8� @� �                            X�         p� ��                 8�        ����    @   @�                        h� �� ��                            ء         � ��                 h�        ����    @   ��                        �� @� �                            X�         h�             ��         ����    @   @�                        � �� ��                            Т         �             �         ����    @   ��                         � 0� �                            H�         `� �                  �        ����    @   0�                        `� �� ��                            ȣ         � h�                 `�        ����    @   ��                        �� 0� �                            H�         X�             ��         ����    @   0�                        ț �� ��                            ��         Ф             ț         ����    @   ��                         �  � ��                            8�         P� Ф                  �        ����    @    �                        P� �� x�                            ��         ȥ             P�         ����    @   ��                        �� � �                            0�         @�             ��         ����    @   �                        М �� h�                            ��         ��             М         ����    @   ��                        � � �                             �         8� ��                 �        ����    @   �                        p� �� `�                            ��         �� @�                 p�        ����    @   ��                        �� � �                             �         8� �                 ��        ����    @   �             X�         ����    @   ��                        ��         `�                        X� ب ��                            �         � `�                 X�        ����    @   ب                        �� X� 0�                            p�         �� X�                 ��        ����    @   X�                        �� ة ��                            �          �             ��         ����    @   ة                        0� P� (�                            h�         �� @�                 0�        ����    @   P�                        �� Ъ ��                            �          �  �                 ��        ����    @   Ъ                        � P� (�                            h�         x�             �         ����    @   P�                        (� ȫ ��                            �         �             (�         ����    @   ȫ                        h� @� �                            X�         p� x�                 h�        ����    @   @�                        �� �� ��                            ج         � �                 ��        ����    @   ��                        � @� �                            X�         p� �                 �        ����    @   @�                        (� �� ��                            ح         �             (�         ����    @   ��                        p� 8� �                            P�         h� x�                 p�        ����    @   8�                        �� �� ��                            Ю         �             ��         ����    @   ��                         � 0� �                            H�         `� �                  �        ����    @   0�                        H� �� ��                            ȯ         � x�                 H�        ����    @   ��                        �� 0� �                            H�         `� �                 ��        ����    @   0�                        � �� ��                            Ȱ         � �                 �        ����    @   ��                         � 0� �                            H�         `� �                  �        ����    @   0�                        x� �� ��                            ȱ         � x�                 x�        ����    @   ��                        �� 0� �                            H�         `� �                 ��        ����    @   0�                        � �� ��                            Ȳ         � �                 �        ����    @   ��                        `� 0� �                            H�         `� �                 `�        ����    @   0�                        �� �� ��                            ȳ         � x�                 ��        ����    @   ��                        � 0� �                            H�         `� x�                 �        ����    @   0�                        H� �� ��                            ȴ         ش             H�         ����    @   ��                        �� (�  �                            @�         X� ش                 ��        ����    @   (�                        Х �� ��                            ��         ص ش                 Х        ����    @   ��                        � (�  �                            @�         X� ش                 �        ����    @   (�                        P� �� ��                            ��         ض ش                 P�        ����    @   ��                        X� (�  �                            @�         `� � h�                     X�        ����    @   (�                        �� �� ��                            ȷ         � � h�                     ��        ����    @   ��                        Ч 8� �                            P�         p� � h�                     Ч        ����    @   8�                        � �� ��                            ظ         �� � h�                     �        ����    @   ��                        P� H�  �                            `�         �� � h�                     P�        ����    @   H�                        �� й ��                            �         � � h�                     ��        ����    @   й                        Ш X� 0�                            p�         �� � h�                     Ш        ����    @   X�                        Ȧ � ��                            ��         � � h�                     Ȧ        ����    @   �                        H� h� @�                            ��         �� � h�                     H�        ����    @   h�                        �� � Ȼ                            �         (� � h�                     ��        ����    @   �                        �� x� P�                            ��         �� � h�                     ��        ����    @   x�                        �  � ؼ                            �         8� � h�                     �        ����    @    �                        (� �� `�                            ��         �� � h�                     (�        ����    @   ��                        `� � �                            (�         H� � h�                     `�        ����    @   �                        � �� p�                            ��         о � h�                     �        ����    @   ��                        �  � ��                            8�         X� � h�                     �        ����    @    �                        h� �� ��                            ��         � � h�                     h�        ����    @   ��                        �� 0� �                            H�         h� � h�                     ��        ����    @   0�                        � �� ��                            ��         �� � h�                     �        ����    @   ��                        �� @� �                            X�         x� � h�                     ��        ����    @   @�                        (� �� ��                            ��          � � h�                     (�        ����    @   ��                        �� P� (�                            h�         �� Ф                 ��        ����    @   P�                        � �� ��                            ��         � � h�                     �        ����    @   ��                        � X� 0�                            p�         ��             �         ����    @   X�                        X� �� ��                            ��         ��             X�         ����    @   ��                        �� H�  �                            `�         x� ��                 ��        ����    @   H�                        � �� ��                            ��          � (� ��                     �        ����    @   ��             @�        ����    @   P�                        h�         (� ��                            @� P� ��                            �� �� ��                            ��          � ��                 ��        ����    @   ��                        � P� (�                            h�         �� ��                 �        ����    @   P�                                                      20 20 R0
 
4 
Rp 20 R0 20
 
4 
Rp
 
4 
2p 20 20
 
4 
2p 
R0� p� ����@     N �(  ����)      A)     r)  ���� �0l @� J   ����` �)  �����)      *  ���� B  
 
4 
Rp 20 20 d 4 2p d T 4 2p- -T 
4	 
2p! d �1  
2  �� ! � 
2   2  � !   
2   2  � !   �1  
2  �� 
 
4 
2p! d �2  �2  T� !   �2  �2  T�  B  
 
4 
2p! b�p`0  � � ����    ����                                ��             � @           p 8   @           � H   �4  ����5      55  ����p     }    �    �     �    
 
2P� �  BP0  � �  B   B   B   B   B   b   20 20 20 B  
 
4 
2p B   20 B   d 4 2p
 
4 
Rp d	 4 Rp
 
4 
Rp B   R0 R0
 
4 
2p 4	 Rp� `� ����        ?  ����U?      Z?     �?      �?  ���� 4
 
Rp� 0� ����      ,    <    L �?  �����?      G@     l@     w@     �@      �@  ����
 
4 
2p 20 4	 
Rp�  � ����`     l    |    �  A  ����!A      BA     XA     nA     �A  ����)	 ���	��p`P0  l �� j   ����� �����    � ����� ����� ����� �A  ����<B      IB  ����oB     �B     �B     �B  �����B     �B  ����sC     �C  ����-D     8D  ���� 
R0� �� ����  pD  �����D      �D  ���� 
R0� p� ���� �D  �����D      �D  ���� 
R0� @� ����  �D  ����E      E  ����$ $d  T 4 ��
���p� � ����0  E  �����F       G  ���� 2p`P! � �
 
�	 4  H  [H  � !    H  [H  �  T 4 ��p`� �� ����@     L @I  ����<J      aJ     lJ      �J  ����.  t2 41 . P  l �� b  ����`     n �J  �����K      �K     �L      �L  �����L      �L  ����
 t	 d T 4 2�' d 4 �pl �� Z   ����� ����� �����    � �M  ����N      -N     �O  �����O     �O     �O  ����1	 T$ 4#  �p`  l P� �   ����� �����    �    �    � ����      �O  ����P      9P     VP     [P     �P     �P     �P     mQ     yQ  ����~Q     �Q     �Q  ���� 4
 rp�  � ����  �Q  ����R      R  �����R      5S  ����xS       d 4 2p 20 d 4 2p b   20 d
 4	 Rp 20 B	��  ! d	 �U  V  �� !
 
t 4 V  sV  � !   V  sV  � !   �U  V  ��  d	 T 4 2p 20!
 
t d PZ  sZ  d� !   t  d PZ  sZ  d�  B   20 20 B   4 2p	 	2�P0! �
 t	 d `_  }_  �� !   `_  }_  ��  20 20 20 d 4 2p! T b  .b  � !   b  .b  �  20 B   B   B   d 4 
rp� �� ����0     @    P    ` pc  �����c      �c     �c     �c     $d     'd  ���� 
R0� �� ����p     �    � @d  ����Vd     {d     �d      �d  ����
 
4 
2p! d �d  �d  ,� !   �d  �d  ,� 
 
4 
2p! d pe  �e  \� !   pe  �e  \� 
 
4 
2p! d 0f  df  �� !   0f  df  ��  R0 B   4 Rp 20 B   B  
 
4 
2`! t �h  �h  �� !   �h  �h  ��  20" "d
 4 Rp� �� ����        � ����                 l� @           � 8   �i  �����i      �i     j  �����     �     2P
 
2P� �� # #t d 4 ��� `� ����    ����                  � @           � H   0j  ����\j      �l  �����l      �    
 
RP� `�  20 20 20 20 R0� 0� ���� �n  ���� o      2o  ���� 2P 20$
 $d  4 r���
�p�  � ����    ����                  �� @           0 H    r  ����Mr      =    
 
RP�  �  20 20 20 20 R0� п ����` �u  �����u      �u  ���� 2P R0� �� ����� 0v  ����Pv      �v  ���� 2P 20 20
 
4 
2p
 
4 
2p
 
4 
2p �  �  � ����� `x  �����x      �x  ����
 
4 
2p
 
4 
2p d 4 2p 20 20 20- d 4  p  l �� �   ����� ����� ����� ����� �}  ����E~      Z~  �����~     �~  ����     a  �����     �  ���� 2P �  � �� ���� 0�  ����g�      y�  ���� B   B   4	 Rp� �� ����      . ����:    H p�  �����      �     �      �  ����%�     *�     L�     Q�  ���� B   �  � `� ����` ��  �����      ��  ���� 
R0� �� ����p  �  ����6�      \�  ���� 4	 
Rp� 0� ����� p�  ������      ��  ���� 4	 
Rp�  � �����     � ��  ������      �     1�  ���� 
R0� �� ����� `�  ������      ��  ���� �  � �� ����� ��  ������      	�  ���� B   R0� p� �����     � P�  ����r�      w�     ��  ����
 
4 
2p
 
4 
2p 20
 
4 
2p' d 4 �pl @� j   ����� �  ����h�      ��  ���� 2P' d 4 �pl � j   ����  Ј  ����(�      N�  ���� 2P 4 2p 4 2p r0� �� ����P ��  ������      Ί  ���� 
R0� �� ����`  �  �����      3�  ���� 4	 
Rp� �� ����p     | @�  ����g�     ��      ��  ���� 20 4	 
Rp� �� �����     � ��  �����      "�     8�  ���� 
R0� P� �����     � `�  ������     ��      ��  ���� �  � P� ����� ��  ����'�      9�  ���� B   R0�  � �����     � ��  ������      ��     ʍ  ���� 20
 
4 
2p
 
4 
2p 20
 
4 
2p' d 4 �pl �� j   ����  P�  ������      ΐ  ���� 2P' d 4 �pl �� j   ����0 �  ����h�      ��  ���� 2P 4 2p 4 2p r0� �� ����` ��  �����      .�  ����
 
4 
2`! t Г  2�  �� !   t Г  2�  ��  20 20 B   B  ! 4 �t �t  � !   �t �t  �  B   B  ! 4 Pu cu 4� !   Pu cu 4�  B   B  ! 4 �u �u h� !   �u �u h�  B   B  ! 4 0v Cv �� !   0v Cv ��  B   B  ! 4 �v �v �� !   �v �v �� 2	 $4  ��p`P  l �� �   ����p     |    �    � Е  ����4�      ��     �     �     �      -�     ܘ     �     ��      "�  ���� d	 T 4 2p* T 4 ��p`l �� J   ����� ����� �  ����t�      ��  ����X�     k�  ����4 &d "4  �	��pP  l `� �   ����� ����� ����� ��  ����u�      ��  �����     L�     l�  ���� 20 B  
 
4 
2p
 
4 
2p 20 R0 R0 d	 T 4 2p 20
 
4 
2pe
 et d	 T 4 2�� �t T 4 2` 20	 	2�P0! �
 t	 d �  -�  � !   �  -�  �  R0   T 4 R	�p`� 0� ����� ��  �����       2P R0 r0" "d T
 4	 
Rp�  � ����  0�  ����[�       2P d
 4	 
Rp� �� ����P �  ����B�      s�  ���� b  $
 $d  4 r���
�p� �� ����    ����                  \� @           ` H   �  ����=�      m    
 
RP� ��  b   R0
 
4 
2p 20 4
 2	�`P! t ��  Ʈ  �� ! �	 Ʈ  ��  �� !   Ʈ  ��  �� !   ��  Ʈ  �� �
 �� �T
 4 R
��`! t �  (�  �  20 2��`P0!K K� � t
 ��  ײ  H� !   ��  ײ  H�  t d 4 2� B   4 Rp� p� ����        � ����                 �� @           � 8   ��  �����      ��     �  �����     �     2P
 
2P� p�  20 B   B   b  � @� ����� 0�  ����O�      `�  ���� 2P B   b  � � ����� �  ������      �  ���� 2P b  � �� ����  P�  ����o�      ��  ���� 2P d T 4 2p 20 20 20 B  * d 4 �pl �� r   ����  ��  �����      �  ����`�      ��  ���� 2P
 
4 
2p 20 4 2p! d ��  ��  �� !   ��  ��  ��  20 20
 
4 
2p! d P�  p�  �� !   P�  p�  �� 
 
4 
2p 20 20 20 t	 2�! d 
T 4 p�  ��  4� !   p�  ��  4� 
 
4 
2p 20 20 B   B  ! 4 w #w �� !   w #w ��  B   B  ! 4 �w �w �� !   �w �w ��  B   B  ! 4 �w x �� !   �w x ��  B   B  ! 4 `x sx ,� !   `x sx ,�  B   B  ! 4 �x �x `� !   �x �x `�  B   B  ! 4 @y Sy �� !   @y Sy ��  B   B  ! 4 �y �y �� !   �y �y ��  B   B  ! 4  z 3z �� !    z 3z ��  d
 4	 
Rp� �� ����P     \    l    |    �    � P�  ������      ��     ��     ��      �     A�     h�  ���� 20 d
 4	 
Rp� �� �����     �    �    �    �     ��  ������      �     9�     ]�     ��     ��     ��  ���� Bp`  ! � 
�
 T	 ��  ��  @� !
 
� 4 ��  ��  L� !   ��  ��  L� !   ��  ��  @� ! 
  �  �  �
  T	  4 ��  ��  @� ? .4� x �
���p`P  l `� �  �����     0    @    L    \     h    t    �    �    �    � 
   �    �    �     
        `�  ������      ��     �     ;�     v�     ��     ��     m�     ��     �     D�  	   �  
   T�      �     M�     ��     ��     ��     #�  
   v�     ��     ��     <�  
   l�     ��     ��     V�       2P
 
4 
2p 20 20
 
4 
Rp
 
4 
Rp 20 20
 
4 
2p 20 20 R0" "d T 4
 
rp� 0� ����0 P�  ����{�       2P 20 d 4 
rp�  � ����` P�  ������      ��  ���� 20 B   d 4  p  � �� ����p ��  ����h�      +�  ���� 20 R0
 
4 
2p 20 B  
 
4 
2p B   20< <t T 4 2`
 t	 d T 4 2� 20 4	 Rp� �� �����                             H� @           � 8   ��  �����     �  �����     �    
 
2P� �� 
 
4 
2p B   B   20 20
 
d 
2p! 4  �  �  �� !   4  �  �  �� !    �  �  �� 
 
4 
2p Rp! 4  �  �  � !   4  �  �  � 
 
4 
2p 20 d 4 �p� h    20 d 4 2p 4 2p 20, 4 	 p  l p� �   ����� ��  ������      ��  ����
 
4 
Rp B	��  !
 
d	 4 ��  ��  �� ! t ��  3�  �� !   ��  3�  �� !   ��  ��  ��  20 20 20! t p�  ��  H� !   p�  ��  H� !   t p�  ��  H�  d 4 2p! T `�  ~�  �� !   `�  ~�  ��  20 B   B   B   B   d 4 rp� @� ����� �  ����:�      ��  ���� r0� � �����  �  ����F�      ��  ���� 4	 
Rp� �� ����� ��  ������        ���� R0 4	 
Rp� �� ����  `  �����      �  ���� 4 	 p  � �� ����   ����5     U ���� d 4 2p B  % ( �p`0P  � P� ����  � ����A     % ���� b   20 B  
 
4 
2p
 
4 
2p
 
4 
2p
 
4 
2p
 
4 
2p 20
 
4 
2p 20 4 
rp�  � ����0 � ����	     -	 ����& 4 �pl �� j   ����@ P	 �����	     �	 ����  bp`P0  � �� ����P     \    l  
 ����[
     �
    �
    ' ���� 20 d 4 2p d 4 2p
 
4 
2p 20
 
4 
Rp 20 20 4 2p 20 B   20 20V Vt T
 4	 R` B   d 4 2p B   20! t � � 4� !   � � 4� !   t � � 4�  B   B   B   B   20 T
 4	 2�p`! �  D �� !    D ��  4 Rp`P� �� ����� ����� � ����     >    h ���� d
 4	 
Rp� `� ����    ����                  X� @           � 8   � �����     � �����     �    
 
2P� `� $ Rp`0� 0� ����    ����                  �� @           � 8    ����n     � �����     �    
 
2P� 0�  �p`0P  
 
4 
2`! t � � 8� !   � � 8� !   t � � 8� !   � � 8�  B   b   20 b   b   B   B  
 
4 
2p 20 �0l  � Z   ����   `! �����!     �! ����
 
4 
2p 4
 Rp� �� ����  �" �����"     # ���� 20	 	�P! t d @# �# T� !   @# �# T� 
 
4 
Rp
 
4 
Rp d 4 2p
 
4 
2p 20 R0 R0� �� ����   p) �����)     �) ���� R0� p� ����0  �) �����)      * ���� 20   �  t  d  4  ���P
 t d 4
 R��P0 0d 
4 
2p
 
4 
2`! t p/ 0 t� !   p/ 0 t�  d	 4 Rp
 
4 
2p B  
 
20! t 3 3 �� !   3 3 ��  "   20 20 20 d 4 ��pP! � �4 75 � !   �4 75 � !   � �4 75 �  B  U U4 t	 d 2� 20V Vt T
 4	 R` B   B   d T 4 2pW W� d
 4	 Rp B   B  Z ZT d 4 2p B  
 
4 
2p 2p`0! T �C �C � !
 
�
 �	 �C �C � !   �C �C � !   �C �C � 
 
4 
2p d 4 2p 20! t d �E �E |� !   �E �E |� 
 
4 
2p 20 B   4 �p`P� @� ����@  �G ����`H     bH ����kJ     �J �����M      �0	 t d T 4 �   20-	  �	��p`0P  l � �   ����P      \  P ����VP     mP     R     AR ���� b   20 b   b   b   t d 4 ��� �� ����p  �T �����T     gU ���� d	 4 Rp B  
 
4 
2p 20 b   d	 4 Rp
 
4 
2p b   b   B   20 d 4 2p
 
4 
2p. 4   p`P  l �� �   �����      �     �  �����     �  �Y ����4Z     JZ    kZ    �Z     �Z    �Z    �Z ���� 2P 2P
 
4 
2p 4 
rp� �� �����  �[ ����\     &\ ����
 
4 
2p R0
 
4 
2p d 4 2p d T 4 2p T 4 2p! d �c �c �� !   �c �c ��  d T 4 2p
 
4 
2p 4 Rp� P� ����        �  ����                 <� @           ! 8   Pf ����zf     �f    �f ����!     !     2P
 
2P� P� ' 'd #T 4  �
���p  �  � ����0! ����<!    H!    T! �f �����f     g    .g    =g    +h    Lh ����(
 (4 ����
�p`P� �� ����`! ����l! �h ����Ri     ai    |k ����	 	B   b�0  !T
 Td � � 
t T  l 5l p� ! � 5l �l |� !   5l �l |� !    l 5l p�  � t 
d 4  �0'
 'T #4 r���p`� �� �����! �����! �p ����=q     Iq �����q    �q ���� 4 R��p`P
 
0 201  ��p`P0l �� r   �����!     �!  t ����7t     �t    u      2P b   b   4 Rp d 4 2p! T pw �w �� !   pw �w �� 
 
4 
2p 20 4 Rp
 
4 
2p b   b   20 20# #t d
 4	 R�� `� �����! Pz �����z     �z ���� 20 20! t �z ({ �� !   �z ({ �� !   t �z ({ �� 
 
4 
Rp d 4 2p d 4 2p 20 B   B   20 B   20 B  
 
4 
2p 20 2`! 4  � *� \  !   4  � *� \  !   4  � *� \  !# #t  4  � *� \  !   4  � *� \   d 4 2pe ed 
4 
2p b  � 0� �����! Ѕ �����      � ���� 2P/ /t +d '4  ���
�P  �  � ����" ����"    ("    4" � ����g�     u�    ��    �    (�    G� ���� r�p`P0� �� ����@" ����L" �� �����     &� ����w�    �� ���� 4
 R�p` 4 p 20 20 b   d	 T 4 2p! � Ќ � ( !   Ќ � (  20 d T 4 2p b   b   20 20 b   B   d 4 2p B   20 d 4 2p d 4 2p 20! t �� �� � !   t �� �� � !   t �� �� � !   �� �� � 
 
4 
2p d 4 2p d 4 2p d 4 2p 20
 
4 
2p Rp!
 
d
 4 @� J� � !E ET	 � 
� � J� X� � !   J� X� � !   @� J� �  20 b  � �� ����`" P� ����o�     �� ���� 2P B   20 20 20 b  
 
4 
2p 20 20 d 4 2p B   d 4 2p 20! t �� �� � !   t �� �� � !   �� �� �  2p! 4 � �� � !   � �� � &
 &4 �����p`P� p� �����" �����" �� �����     (� ����q�    }� ����a
 a� d	 T 4 2p t d	 4 R�� @� ����    ����                  � @           �" 8   `� ����˪     �� �����"     �"    
 
2P� @� 
 
4 
2p
 
4 
2ph hd 
4 
2p b  � � �����" �� ����߬     � ���� 2P 4 2p 20 b   4	 
Rp� �� �����" �� ������     � ����
 
4 
2p B   20 T 4 R�p`! �
  � @� � !    � @� �  20!
 !4 R�
���p`P� �� ���� # ����# �� �����     � ����i�    u� ����   T 4 R	�p`� �� ���� # ����,# � ����=�     I� ������    �� ���� 20 d 4 2p& ��p`P0l P� r   ����@# �� ����p for indefinitely repeating animations
					if (this.attribute('repeatCount').value == 'indefinite') {
						this.duration = 0.0
					}
					else if (this.attribute('fill').valueOrDefault('remove') == 'remove' && !this.removed) {
						this.removed = true;
						this.getProperty().value = this.initialValue;
						return true;
					}
					else {
						return false; // no updates made
					}
				}			
				this.duration = this.duration + delta;
			
				// if we're past the begin time
				var updated = false;
				if (this.begin < this.duration) {
					var newValue = this.calcValue(); // tween
					
					if (this.attribute('type').hasValue()) {
						// for transform, etc.
						var type = this.attribute('type').value;
						newValue = type + '(' + newValue + ')';
					}
					
					this.getProperty().value = newValue;
					updated = true;
				}
				
				return updated;
			}
			
			// fraction of duration we've covered
			this.progress = function() {
				return ((this.duration - this.begin) / (this.maxDuration - this.begin));
			}			
		}
		svg.Element.AnimateBase.prototype = new svg.Element.ElementBase;
		
		// animate element
		svg.Element.animate = function(node) {
			this.base = svg.Element.AnimateBase;
			this.base(node);
			
			this.calcValue = function() {
				var from = this.attribute('from').numValue();
				var to = this.attribute('to').numValue();
				
				// tween value linearly
				return from + (to - from) * this.progress(); 
			};
		}
		svg.Element.animate.prototype = new svg.Element.AnimateBase;
			
		// animate color element
		svg.Element.animateColor = function(node) {
			this.base = svg.Element.AnimateBase;
			this.base(node);

			this.calcValue = function() {
				var from = new RGBColor(this.attribute('from').value);
				var to = new RGBColor(this.attribute('to').value);
				
				if (from.ok && to.ok) {
					// tween color linearly
					var r = from.r + (to.r - from.r) * this.progress();
					var g = from.g + (to.g - from.g) * this.progress();
					var b = from.b + (to.b - from.b) * this.progress();
					return 'rgb('+parseInt(r,10)+','+parseInt(g,10)+','+parseInt(b,10)+')';
				}
				return this.attribute('from').value;
			};
		}
		svg.Element.animateColor.prototype = new svg.Element.AnimateBase;
		
		// animate transform element
		svg.Element.animateTransform = function(node) {
			this.base = svg.Element.animate;
			this.base(node);
		}
		svg.Element.animateTransform.prototype = new svg.Element.animate;
		
		// font element
		svg.Element.font = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);

			this.horizAdvX = this.attribute('horiz-adv-x').numValue();			
			
			this.isRTL = false;
			this.isArabic = false;
			this.fontFace = null;
			this.missingGlyph = null;
			this.glyphs = [];			
			for (var i=0; i<this.children.length; i++) {
				var child = this.children[i];
				if (child.type == 'font-face') {
					this.fontFace = child;
					if (child.style('font-family').hasValue()) {
						svg.Definitions[child.style('font-family').value] = this;
					}
				}
				else if (child.type == 'missing-glyph') this.missingGlyph = child;
				else if (child.type == 'glyph') {
					if (child.arabicForm != '') {
						this.isRTL = true;
						this.isArabic = true;
						if (typeof(this.glyphs[child.unicode]) == 'undefined') this.glyphs[child.unicode] = [];
						this.glyphs[child.unicode][child.arabicForm] = child;
					}
					else {
						this.glyphs[child.unicode] = child;
					}
				}
			}	
		}
		svg.Element.font.prototype = new svg.Element.ElementBase;
		
		// font-face element
		svg.Element.fontface = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);	
			
			this.ascent = this.attribute('ascent').value;
			this.descent = this.attribute('descent').value;
			this.unitsPerEm = this.attribute('units-per-em').numValue();				
		}
		svg.Element.fontface.prototype = new svg.Element.ElementBase;
		
		// missing-glyph element
		svg.Element.missingglyph = function(node) {
			this.base = svg.Element.path;
			this.base(node);	
			
			this.horizAdvX = 0;
		}
		svg.Element.missingglyph.prototype = new svg.Element.path;
		
		// glyph element
		svg.Element.glyph = function(node) {
			this.base = svg.Element.path;
			this.base(node);	
			
			this.horizAdvX = this.attribute('horiz-adv-x').numValue();
			this.unicode = this.attribute('unicode').value;
			this.arabicForm = this.attribute('arabic-form').value;
		}
		svg.Element.glyph.prototype = new svg.Element.path;
		
		// text element
		svg.Element.text = function(node) {
			this.base = svg.Element.RenderedElementBase;
			this.base(node);
			
			if (node != null) {
				// add children
				this.children = [];
				for (var i=0; i<node.childNodes.length; i++) {
					var childNode = node.childNodes[i];
					if (childNode.nodeType == 1) { // capture tspan and tref nodes
						this.addChild(childNode, true);
					}
					else if (childNode.nodeType == 3) { // capture text
						this.addChild(new svg.Element.tspan(childNode), false);
					}
				}
			}
			
			this.baseSetContext = this.setContext;
			this.setContext = function(ctx) {
				this.baseSetContext(ctx);
				if (this.style('dominant-baseline').hasValue()) ctx.textBaseline = this.style('dominant-baseline').value;
				if (this.style('alignment-baseline').hasValue()) ctx.textBaseline = this.style('alignment-baseline').value;
			}
			
			this.renderChildren = function(ctx) {
				var textAnchor = this.style('text-anchor').valueOrDefault('start');
				var x = this.attribute('x').Length.toPixels('x');
				var y = this.attribute('y').Length.toPixels('y');
				for (var i=0; i<this.children.length; i++) {
					var child = this.children[i];
				
					if (child.attribute('x').hasValue()) {
						child.x = child.attribute('x').Length.toPixels('x');
					}
					else {
						if (child.attribute('dx').hasValue()) x += child.attribute('dx').Length.toPixels('x');
						child.x = x;
					}
					
					var childLength = child.measureText(ctx);
					if (textAnchor != 'start' && (i==0 || child.attribute('x').hasValue())) { // new group?
						// loop through rest of children
						var groupLength = childLength;
						for (var j=i+1; j<this.children.length; j++) {
							var childInGroup = this.children[j];
							if (childInGroup.attribute('x').hasValue()) break; // new group
							groupLength += childInGroup.measureText(ctx);
						}
						child.x -= (textAnchor == 'end' ? groupLength : groupLength / 2.0);
					}
					x = child.x + childLength;
					
					if (child.attribute('y').hasValue()) {
						child.y = child.attribute('y').Length.toPixels('y');
					}
					else {
						if (child.attribute('dy').hasValue()) y += child.attribute('dy').Length.toPixels('y');
						child.y = y;
					}	
					y = child.y;
					
					child.render(ctx);
				}
			}
		}
		svg.Element.text.prototype = new svg.Element.RenderedElementBase;
		
		// text base
		svg.Element.TextElementBase = function(node) {
			this.base = svg.Element.RenderedElementBase;
			this.base(node);
			
			this.getGlyph = function(font, text, i) {
				var c = text[i];
				var glyph = null;
				if (font.isArabic) {
					var arabicForm = 'isolated';
					if ((i==0 || text[i-1]==' ') && i<text.length-2 && text[i+1]!=' ') arabicForm = 'terminal'; 
					if (i>0 && text[i-1]!=' ' && i<text.length-2 && text[i+1]!=' ') arabicForm = 'medial';
					if (i>0 && text[i-1]!=' ' && (i == text.length-1 || text[i+1]==' ')) arabicForm = 'initial';
					if (typeof(font.glyphs[c]) != 'undefined') {
						glyph = font.glyphs[c][arabicForm];
						if (glyph == null && font.glyphs[c].type == 'glyph') glyph = font.glyphs[c];
					}
				}
				else {
					glyph = font.glyphs[c];
				}
				if (glyph == null) glyph = font.missingGlyph;
				return glyph;
			}
			
			this.renderChildren = function(ctx) {
				var customFont = this.parent.style('font-family').Definition.getDefinition();
				if (customFont != null) {
					var fontSize = this.parent.style('font-size').numValueOrDefault(svg.Font.Parse(svg.ctx.font).fontSize);
					var fontStyle = this.parent.style('font-style').valueOrDefault(svg.Font.Parse(svg.ctx.font).fontStyle);
					var text = this.getText();
					if (customFont.isRTL) text = text.split("").reverse().join("");
					
					var dx = svg.ToNumberArray(this.parent.attribute('dx').value);
					for (var i=0; i<text.length; i++) {
						var glyph = this.getGlyph(customFont, text, i);
						var scale = fontSize / customFont.fontFace.unitsPerEm;
						ctx.translate(this.x, this.y);
						ctx.scale(scale, -scale);
						var lw = ctx.lineWidth;
						ctx.lineWidth = ctx.lineWidth * customFont.fontFace.unitsPerEm / fontSize;
						if (fontStyle == 'italic') ctx.transform(1, 0, .4, 1, 0, 0);
						glyph.render(ctx);
						if (fontStyle == 'italic') ctx.transform(1, 0, -.4, 1, 0, 0);
						ctx.lineWidth = lw;
						ctx.scale(1/scale, -1/scale);
						ctx.translate(-this.x, -this.y);	
						
						this.x += fontSize * (glyph.horizAdvX || customFont.horizAdvX) / customFont.fontFace.unitsPerEm;
						if (typeof(dx[i]) != 'undefined' && !isNaN(dx[i])) {
							this.x += dx[i];
						}
					}
					return;
				}
			
				if (ctx.strokeStyle != '') ctx.strokeText(svg.compressSpaces(this.getText()), this.x, this.y);
				if (ctx.fillStyle != '') ctx.fillText(svg.compressSpaces(this.getText()), this.x, this.y);
			}
			
			this.getText = function() {
				// OVERRIDE ME
			}
			
			this.measureText = function(ctx) {
				var customFont = this.parent.style('font-family').Definition.getDefinition();
				if (customFont != null) {
					var fontSize = this.parent.style('font-size').numValueOrDefault(svg.Font.Parse(svg.ctx.font).fontSize);
					var measure = 0;
					var text = this.getText();
					if (customFont.isRTL) text = text.split("").reverse().join("");
					var dx = svg.ToNumberArray(this.parent.attribute('dx').value);
					for (var i=0; i<text.length; i++) {
						var glyph = this.getGlyph(customFont, text, i);
						measure += (glyph.horizAdvX || customFont.horizAdvX) * fontSize / customFont.fontFace.unitsPerEm;
						if (typeof(dx[i]) != 'undefined' && !isNaN(dx[i])) {
							measure += dx[i];
						}
					}
					return measure;
				}
			
				var textToMeasure = svg.compressSpaces(this.getText());
				if (!ctx.measureText) return textToMeasure.length * 10;
				
				ctx.save();
				this.setContext(ctx);
				var width = ctx.measureText(textToMeasure).width;
				ctx.restore();
				return width;
			}
		}
		svg.Element.TextElementBase.prototype = new svg.Element.RenderedElementBase;
		
		// tspan 
		svg.Element.tspan = function(node) {
			this.base = svg.Element.TextElementBase;
			this.base(node);
			
			this.text = node.nodeType == 3 ? node.nodeValue : // text
						node.childNodes.length > 0 ? node.childNodes[0].nodeValue : // element
						node.text;
			this.getText = function() {
				return this.text;
			}
		}
		svg.Element.tspan.prototype = new svg.Element.TextElementBase;
		
		// tref
		svg.Element.tref = function(node) {
			this.base = svg.Element.TextElementBase;
			this.base(node);
			
			this.getText = function() {
				var element = this.attribute('xlink:href').Definition.getDefinition();
				if (element != null) return element.children[0].getText();
			}
		}
		svg.Element.tref.prototype = new svg.Element.TextElementBase;		
		
		// a element
		svg.Element.a = function(node) {
			this.base = svg.Element.TextElementBase;
			this.base(node);
			
			this.hasText = true;
			for (var i=0; i<node.childNodes.length; i++) {
				if (node.childNodes[i].nodeType != 3) this.hasText = false;
			}
			
			// this might contain text
			this.text = this.hasText ? node.childNodes[0].nodeValue : '';
			this.getText = function() {
				return this.text;
			}		

			this.baseRenderChildren = this.renderChildren;
			this.renderChildren = function(ctx) {
				if (this.hasText) {
					// render as text element
					this.baseRenderChildren(ctx);
					var fontSize = new svg.Property('fontSize', svg.Font.Parse(svg.ctx.font).fontSize);
					svg.Mouse.checkBoundingBox(this, new svg.BoundingBox(this.x, this.y - fontSize.Length.toPixels('y'), this.x + this.measureText(ctx), this.y));					
				}
				else {
					// render as temporary group
					var g = new svg.Element.g();
					g.children = this.children;
					g.parent = this;
					g.render(ctx);
				}
			}
			
			this.onclick = function() {
				window.open(this.attribute('xlink:href').value);
			}
			
			this.onmousemove = function() {
				svg.ctx.canvas.style.cursor = 'pointer';
			}
		}
		svg.Element.a.prototype = new svg.Element.TextElementBase;		
		
		// image element
		svg.Element.image = function(node) {
			this.base = svg.Element.RenderedElementBase;
			this.base(node);
			
			svg.Images.push(this);
			this.img = document.createElement('img');
			this.loaded = false;
			var that = this;
			this.img.onload = function() { that.loaded = true; }
			this.img.src = this.attribute('xlink:href').value;
			
			this.renderChildren = function(ctx) {
				var x = this.attribute('x').Length.toPixels('x');
				var y = this.attribute('y').Length.toPixels('y');
				
				var width = this.attribute('width').Length.toPixels('x');
				var height = this.attribute('height').Length.toPixels('y');			
				if (width == 0 || height == 0) return;
			
				ctx.save();
				ctx.translate(x, y);
				svg.AspectRatio(ctx,
								this.attribute('preserveAspectRatio').value,
								width,
								this.img.width,
								height,
								this.img.height,
								0,
								0);	
				ctx.drawImage(this.img, 0, 0);			
				ctx.restore();
			}
		}
		svg.Element.image.prototype = new svg.Element.RenderedElementBase;
		
		// group element
		svg.Element.g = function(node) {
			this.base = svg.Element.RenderedElementBase;
			this.base(node);
			
			this.getBoundingBox = function() {
				var bb = new svg.BoundingBox();
				for (var i=0; i<this.children.length; i++) {
					bb.addBoundingBox(this.children[i].getBoundingBox());
				}
				return bb;
			};
		}
		svg.Element.g.prototype = new svg.Element.RenderedElementBase;

		// symbol element
		svg.Element.symbol = function(node) {
			this.base = svg.Element.RenderedElementBase;
			this.base(node);
			
			this.baseSetContext = this.setContext;
			this.setContext = function(ctx) {		
				this.baseSetContext(ctx);
				
				// viewbox
				if (this.attribute('viewBox').hasValue()) {				
					var viewBox = svg.ToNumberArray(this.attribute('viewBox').value);
					var minX = viewBox[0];
					var minY = viewBox[1];
					width = viewBox[2];
					height = viewBox[3];
					
					svg.AspectRatio(ctx,
									this.attribute('preserveAspectRatio').value, 
									this.attribute('width').Length.toPixels('x'),
									width,
									this.attribute('height').Length.toPixels('y'),
									height,
									minX,
									minY);

					svg.ViewPort.SetCurrent(viewBox[2], viewBox[3]);						
				}
			}			
		}
		svg.Element.symbol.prototype = new svg.Element.RenderedElementBase;		
			
		// style element
		svg.Element.style = function(node) { 
			this.base = svg.Element.ElementBase;
			this.base(node);
			
			// text, or spaces then CDATA
			var css = node.childNodes[0].nodeValue + (node.childNodes.length > 1 ? node.childNodes[1].nodeValue : '');
			css = css.replace(/(\/\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*+\/)|(^[\s]*\/\/.*)/gm, ''); // remove comments
			css = svg.compressSpaces(css); // replace whitespace
			var cssDefs = css.split('}');
			for (var i=0; i<cssDefs.length; i++) {
				if (svg.trim(cssDefs[i]) != '') {
					var cssDef = cssDefs[i].split('{');
					var cssClasses = cssDef[0].split(',');
					var cssProps = cssDef[1].split(';');
					for (var j=0; j<cssClasses.length; j++) {
						var cssClass = svg.trim(cssClasses[j]);
						if (cssClass != '') {
							var props = {};
							for (var k=0; k<cssProps.length; k++) {
								var prop = cssProps[k].indexOf(':');
								var name = cssProps[k].substr(0, prop);
								var value = cssProps[k].substr(prop + 1, cssProps[k].length - prop);
								if (name != null && value != null) {
									props[svg.trim(name)] = new svg.Property(svg.trim(name), svg.trim(value));
								}
							}
							svg.Styles[cssClass] = props;
							if (cssClass == '@font-face') {
								var fontFamily = props['font-family'].value.replace(/"/g,'');
								var srcs = props['src'].value.split(',');
								for (var s=0; s<srcs.length; s++) {
									if (srcs[s].indexOf('format("svg")') > 0) {
										var urlStart = srcs[s].indexOf('url');
										var urlEnd = srcs[s].indexOf(')', urlStart);
										var url = srcs[s].substr(urlStart + 5, urlEnd - urlStart - 6);
										var doc = svg.parseXml(svg.ajax(url));
										var fonts = doc.getElementsByTagName('font');
										for (var f=0; f<fonts.length; f++) {
											var font = svg.CreateElement(fonts[f]);
											svg.Definitions[fontFamily] = font;
										}
									}
								}
							}
						}
					}
				}
			}
		}
		svg.Element.style.prototype = new svg.Element.ElementBase;
		
		// use element 
		svg.Element.use = function(node) {
			this.base = svg.Element.RenderedElementBase;
			this.base(node);
			
			this.baseSetContext = this.setContext;
			this.setContext = function(ctx) {
				this.baseSetContext(ctx);
				if (this.attribute('x').hasValue()) ctx.translate(this.attribute('x').Length.toPixels('x'), 0);
				if (this.attribute('y').hasValue()) ctx.translate(0, this.attribute('y').Length.toPixels('y'));
			}
			
			this.getDefinition = function() {
				var element = this.attribute('xlink:href').Definition.getDefinition();
				if (this.attribute('width').hasValue()) element.attribute('width', true).value = this.attribute('width').value;
				if (this.attribute('height').hasValue()) element.attribute('height', true).value = this.attribute('height').value;
				return element;
			}
			
			this.path = function(ctx) {
				var element = this.getDefinition();
				if (element != null) element.path(ctx);
			}
			
			this.renderChildren = function(ctx) {
				var element = this.getDefinition();
				if (element != null) element.render(ctx);
			}
		}
		svg.Element.use.prototype = new svg.Element.RenderedElementBase;
		
		// mask element
		svg.Element.mask = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);
						
			this.apply = function(ctx, element) {
				// render as temp svg	
				var x = this.attribute('x').Length.toPixels('x');
				var y = this.attribute('y').Length.toPixels('y');
				var width = this.attribute('width').Length.toPixels('x');
				var height = this.attribute('height').Length.toPixels('y');
				
				// temporarily remove mask to avoid recursion
				var mask = element.attribute('mask').value;
				element.attribute('mask').value = '';
				
					var cMask = document.createElement('canvas');
					cMask.width = x + width;
					cMask.height = y + height;
					var maskCtx = cMask.getContext('2d');
					this.renderChildren(maskCtx);
				
					var c = document.createElement('canvas');
					c.width = x + width;
					c.height = y + height;
					var tempCtx = c.getContext('2d');
					element.render(tempCtx);
					tempCtx.globalCompositeOperation = 'destination-in';
					tempCtx.fillStyle = maskCtx.createPattern(cMask, 'no-repeat');
					tempCtx.fillRect(0, 0, x + width, y + height);
					
					ctx.fillStyle = tempCtx.createPattern(c, 'no-repeat');
					ctx.fillRect(0, 0, x + width, y + height);
					
				// reassign mask
				element.attribute('mask').value = mask;	
			}
			
			this.render = function(ctx) {
				// NO RENDER
			}
		}
		svg.Element.mask.prototype = new svg.Element.ElementBase;
		
		// clip element
		svg.Element.clipPath = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);
			
			this.apply = function(ctx) {
				for (var i=0; i<this.children.length; i++) {
					if (this.children[i].path) {
						this.children[i].path(ctx);
						ctx.clip();
					}
				}
			}
			
			this.render = function(ctx) {
				// NO RENDER
			}
		}
		svg.Element.clipPath.prototype = new svg.Element.ElementBase;

		// filters
		svg.Element.filter = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);
						
			this.apply = function(ctx, element) {
				// render as temp svg	
				var bb = element.getBoundingBox();
				var x = this.attribute('x').Length.toPixels('x');
				var y = this.attribute('y').Length.toPixels('y');
				if (x == 0 || y == 0) {
					x = bb.x1;
					y = bb.y1;
				}
				var width = this.attribute('width').Length.toPixels('x');
				var height = this.attribute('height').Length.toPixels('y');
				if (width == 0 || height == 0) {
					width = bb.width();
					height = bb.height();
				}
				
				// temporarily remove filter to avoid recursion
				var filter = element.style('filter').value;
				element.style('filter').value = '';
				
				// max filter distance
				var extraPercent = .20;
				var px = extraPercent * width;
				var py = extraPercent * height;
				
				var c = document.createElement('canvas');
				c.width = width + 2*px;
				c.height = height + 2*py;
				var tempCtx = c.getContext('2d');
				tempCtx.translate(-x + px, -y + py);
				element.render(tempCtx);
			
				// apply filters
				for (var i=0; i<this.children.length; i++) {
					this.children[i].apply(tempCtx, 0, 0, width + 2*px, height + 2*py);
				}
				
				// render on me
				ctx.drawImage(c, 0, 0, width + 2*px, height + 2*py, x - px, y - py, width + 2*px, height + 2*py);
				
				// reassign filter
				element.style('filter', true).value = filter;	
			}
			
			this.render = function(ctx) {
				// NO RENDER
			}		
		}
		svg.Element.filter.prototype = new svg.Element.ElementBase;
		
		svg.Element.feGaussianBlur = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);	
			
			function make_fgauss(sigma) {
				sigma = Math.max(sigma, 0.01);			      
				var len = Math.ceil(sigma * 4.0) + 1;                     
				mask = [];                               
				for (var i = 0; i < len; i++) {                             
					mask[i] = Math.exp(-0.5 * (i / sigma) * (i / sigma));                                           
				}                                                           
				return mask; 
			}
			
			function normalize(mask) {
				var sum = 0;
				for (var i = 1; i < mask.length; i++) {
					sum += Math.abs(mask[i]);
				}
				sum = 2 * sum + Math.abs(mask[0]);
				for (var i = 0; i < mask.length; i++) {
					mask[i] /= sum;
				}
				return mask;
			}
			
			function convolve_even(src, dst, mask, width, height) {
			  for (var y = 0; y < height; y++) {
				for (var x = 0; x < width; x++) {
				  var a = imGet(src, x, y, width, height, 3)/255;
				  for (var rgba = 0; rgba < 4; rgba++) {					  
					  var sum = mask[0] * (a==0?255:imGet(src, x, y, width, height, rgba)) * (a==0||rgba==3?1:a);
					  for (var i = 1; i < mask.length; i++) {
						var a1 = imGet(src, Math.max(x-i,0), y, width, height, 3)/255;
					    var a2 = imGet(src, Math.min(x+i, width-1), y, width, height, 3)/255;
						sum += mask[i] * 
						  ((a1==0?255:imGet(src, Math.max(x-i,0), y, width, height, rgba)) * (a1==0||rgba==3?1:a1) + 
						   (a2==0?255:imGet(src, Math.min(x+i, width-1), y, width, height, rgba)) * (a2==0||rgba==3?1:a2));
					  }
					  imSet(dst, y, x, height, width, rgba, sum);
				  }			  
				}
			  }
			}		

			function imGet(img, x, y, width, height, rgba) {
				return img[y*width*4 + x*4 + rgba];
			}
			
			function imSet(img, x, y, width, height, rgba, val) {
				img[y*width*4 + x*4 + rgba] = val;
			}
						
			function blur(ctx, width, height, sigma)
			{
				var srcData = ctx.getImageData(0, 0, width, height);
				var mask = make_fgauss(sigma);
				mask = normalize(mask);
				tmp = [];
				convolve_even(srcData.data, tmp, mask, width, height);
				convolve_even(tmp, srcData.data, mask, height, width);
				ctx.clearRect(0, 0, width, height);
				ctx.putImageData(srcData, 0, 0);
			}			
		
			this.apply = function(ctx, x, y, width, height) {
				// assuming x==0 && y==0 for now
				blur(ctx, width, height, this.attribute('stdDeviation').numValue());
			}
		}
		svg.Element.filter.prototype = new svg.Element.feGaussianBlur;
		
		// title element, do nothing
		svg.Element.title = function(node) {
		}
		svg.Element.title.prototype = new svg.Element.ElementBase;

		// desc element, do nothing
		svg.Element.desc = function(node) {
		}
		svg.Element.desc.prototype = new svg.Element.ElementBase;		
		
		svg.Element.MISSING = function(node) {
			console.log('ERROR: Element \'' + node.nodeName + '\' not yet implemented.');
		}
		svg.Element.MISSING.prototype = new svg.Element.ElementBase;
		
		// element factory
		svg.CreateElement = function(node) {	
			var className = node.nodeName.replace(/^[^:]+:/,''); // remove namespace
			className = className.replace(/\-/g,''); // remove dashes
			var e = null;
			if (typeof(svg.Element[className]) != 'undefined') {
				e = new svg.Element[className](node);
			}
			else {
				e = new svg.Element.MISSING(node);
			}

			e.type = node.nodeName;
			return e;
		}
				
		// load from url
		svg.load = function(ctx, url) {
			svg.loadXml(ctx, svg.ajax(url));
		}
		
		// load from xml
		svg.loadXml = function(ctx, xml) {
			svg.loadXmlDoc(ctx, svg.parseXml(xml));
		}
		
		svg.loadXmlDoc = function(ctx, dom) {
			svg.init(ctx);
			
			var mapXY = function(p) {
				var e = ctx.canvas;
				while (e) {
					p.x -= e.offsetLeft;
					p.y -= e.offsetTop;
					e = e.offsetParent;
				}
				if (window.scrollX) p.x += window.scrollX;
				if (window.scrollY) p.y += window.scrollY;
				return p;
			}
			
			// bind mouse
			if (svg.opts['ignoreMouse'] != true) {
				ctx.canvas.onclick = function(e) {
					var p = mapXY(new svg.Point(e != null ? e.clientX : event.clientX, e != null ? e.clientY : event.clientY));
					svg.Mouse.onclick(p.x, p.y);
				};
				ctx.canvas.onmousemove = function(e) {
					var p = mapXY(new svg.Point(e != null ? e.clientX : event.clientX, e != null ? e.clientY : event.clientY));
					svg.Mouse.onmousemove(p.x, p.y);
				};
			}
		
			var e = svg.CreateElement(dom.documentElement);
			e.root = true;
					
			// render loop
			var isFirstRender = true;
			var draw = function() {
				svg.ViewPort.Clear();
				if (ctx.canvas.parentNode) svg.ViewPort.SetCurrent(ctx.canvas.parentNode.clientWidth, ctx.canvas.parentNode.clientHeight);
			
				if (svg.opts['ignoreDimensions'] != true) {
					// set canvas size
					if (e.style('width').hasValue()) {
						ctx.canvas.width = e.style('width').Length.toPixels('x');
						ctx.canvas.style.width = ctx.canvas.width + 'px';
					}
					if (e.style('height').hasValue()) {
						ctx.canvas.height = e.style('height').Length.toPixels('y');
						ctx.canvas.style.height = ctx.canvas.height + 'px';
					}
				}
				var cWidth = ctx.canvas.clientWidth || ctx.canvas.width;
				var cHeight = ctx.canvas.clientHeight || ctx.canvas.height;
				svg.ViewPort.SetCurrent(cWidth, cHeight);		
				
				if (svg.opts != null && svg.opts['offsetX'] != null) e.attribute('x', true).value = svg.opts['offsetX'];
				if (svg.opts != null && svg.opts['offsetY'] != null) e.attribute('y', true).value = svg.opts['offsetY'];
				if (svg.opts != null && svg.opts['scaleWidth'] != null && svg.opts['scaleHeight'] != null) {
					var xRatio = 1, yRatio = 1;
					if (e.attribute('width').hasValue()) xRatio = e.attribute('width').Length.toPixels('x') / svg.opts['scaleWidth'];
					if (e.attribute('height').hasValue()) yRatio = e.attribute('height').Length.toPixels('y') / svg.opts['scaleHeight'];
				
					e.attribute('width', true).value = svg.opts['scaleWidth'];
					e.attribute('height', true).value = svg.opts['scaleHeight'];			
					e.attribute('viewBox', true).value = '0 0 ' + (cWidth * xRatio) + ' ' + (cHeight * yRatio);
					e.attribute('preserveAspectRatio', true).value = 'none';
				}
			
				// clear and render
				if (svg.opts['ignoreClear'] != true) {
					ctx.clearRect(0, 0, cWidth, cHeight);
				}
				e.render(ctx);
				if (isFirstRender) {
					isFirstRender = false;
					if (svg.opts != null && typeof(svg.opts['renderCallback']) == 'function') svg.opts['renderCallback']();
				}			
			}
			
			var waitingForImages = true;
			if (svg.ImagesLoaded()) {
				waitingForImages = false;
				draw();
			}
			svg.intervalID = setInterval(function() { 
				var needUpdate = false;
				
				if (waitingForImages && svg.ImagesLoaded()) {
					waitingForImages = false;
					needUpdate = true;
				}
			
				// need update from mouse events?
				if (svg.opts['ignoreMouse'] != true) {
					needUpdate = needUpdate | svg.Mouse.hasEvents();
				}
			
				// need update from animations?
				if (svg.opts['ignoreAnimation'] != true) {
					for (var i=0; i<svg.Animations.length; i++) {
						needUpdate = needUpdate | svg.Animations[i].update(1000 / svg.FRAMERATE);
					}
				}
				
				// need update from redraw?
				if (svg.opts != null && typeof(svg.opts['forceRedraw']) == 'function') {
					if (svg.opts['forceRedraw']() == true) needUpdate = true;
				}
				
				// render if needed
				if (needUpdate) {
					draw();				
					svg.Mouse.runEvents(); // run and clear our events
				}
			}, 1000 / svg.FRAMERATE);
		}
		
		svg.stop = function() {
			if (svg.intervalID) {
				clearInterval(svg.intervalID);
			}
		}
		
		svg.Mouse = new (function() {
			this.events = [];
			this.hasEvents = function() { return this.events.length != 0; }
		
			this.onclick = function(x, y) {
				this.events.push({ type: 'onclick', x: x, y: y, 
					run: function(e) { if (e.onclick) e.onclick(); }
				});
			}
			
			this.onmousemove = function(x, y) {
				this.events.push({ type: 'onmousemove', x: x, y: y,
					run: function(e) { if (e.onmousemove) e.onmousemove(); }
				});
			}			
			
			this.eventElements = [];
			
			this.checkPath = function(element, ctx) {
				for (var i=0; i<this.events.length; i++) {
					var e = this.events[i];
					if (ctx.isPointInPath && ctx.isPointInPath(e.x, e.y)) this.eventElements[i] = element;
				}
			}
			
			this.checkBoundingBox = function(element, bb) {
				for (var i=0; i<this.events.length; i++) {
					var e = this.events[i];
					if (bb.isPointInBox(e.x, e.y)) this.eventElements[i] = element;
				}			
			}
			
			this.runEvents = function() {
				svg.ctx.canvas.style.cursor = '';
				
				for (var i=0; i<this.events.length; i++) {
					var e = this.events[i];
					var element = this.eventElements[i];
					while (element) {
						e.run(element);
						element = element.parent;
					}
				}		
			
				// done running, clear
				this.events = []; 
				this.eventElements = [];
			}
		});
		
		return svg;
	}
})();

if (CanvasRenderingContext2D) {
	CanvasRenderingContext2D.prototype.drawSvg = function(s, dx, dy, dw, dh) {
		canvg(this.canvas, s, { 
			ignoreMouse: true, 
			ignoreAnimation: true, 
			ignoreDimensions: true, 
			ignoreClear: true, 
			offsetX: dx, 
			offsetY: dy, 
			scaleWidth: dw, 
			scaleHeight: dh
		});
	}
}/**
 * @license Highcharts JS v3.0.6 (2013-10-04)
 * CanVGRenderer Extension module
 *
 * (c) 2011-2012 Torstein Hønsi, Erik Olsson
 *
 * License: www.highcharts.com/license
 */

// JSLint options:
/*global Highcharts */

(function (Highcharts) { // encapsulate
	var UNDEFINED,
		DIV = 'div',
		ABSOLUTE = 'absolute',
		RELATIVE = 'relative',
		HIDDEN = 'hidden',
		VISIBLE = 'visible',
		PX = 'px',
		css = Highcharts.css,
		CanVGRenderer = Highcharts.CanVGRenderer,
		SVGRenderer = Highcharts.SVGRenderer,
		extend = Highcharts.extend,
		merge = Highcharts.merge,
		addEvent = Highcharts.addEvent,
		createElement = Highcharts.createElement,
		discardElement = Highcharts.discardElement;

	// Extend CanVG renderer on demand, inherit from SVGRenderer
	extend(CanVGRenderer.prototype, SVGRenderer.prototype);

	// Add additional functionality:
	extend(CanVGRenderer.prototype, {
		create: function (chart, container, chartWidth, chartHeight) {
			this.setContainer(container, chartWidth, chartHeight);
			this.configure(chart);
		},
		setContainer: function (container, chartWidth, chartHeight) {
			var containerStyle = container.style,
				containerParent = container.parentNode,
				containerLeft = containerStyle.left,
				containerTop = containerStyle.top,
				containerOffsetWidth = container.offsetWidth,
				containerOffsetHeight = container.offsetHeight,
				canvas,
				initialHiddenStyle = { visibility: HIDDEN, position: ABSOLUTE };

			this.init.apply(this, [container, chartWidth, chartHeight]);

			// add the canvas above it
			canvas = createElement('canvas', {
				width: containerOffsetWidth,
				height: containerOffsetHeight
			}, {
				position: RELATIVE,
				left: containerLeft,
				top: containerTop
			}, container);
			this.canvas = canvas;

			// Create the tooltip line and div, they are placed as siblings to
			// the container (and as direct childs to the div specified in the html page)
			this.ttLine = createElement(DIV, null, initialHiddenStyle, containerParent);
			this.ttDiv = createElement(DIV, null, initialHiddenStyle, containerParent);
			this.ttTimer = UNDEFINED;

			// Move away the svg node to a new div inside the container's parent so we can hide it.
			var hiddenSvg = createElement(DIV, {
				width: containerOffsetWidth,
				height: containerOffsetHeight
			}, {
				visibility: HIDDEN,
				left: containerLeft,
				top: containerTop
			}, containerParent);
			this.hiddenSvg = hiddenSvg;
			hiddenSvg.appendChild(this.box);
		},

		/**
		 * Configures the renderer with the chart. Attach a listener to the event tooltipRefresh.
		 **/
		configure: function (chart) {
			var renderer = this,
				options = chart.options.tooltip,
				borderWidth = options.borderWidth,
				tooltipDiv = renderer.ttDiv,
				tooltipDivStyle = options.style,
				tooltipLine = renderer.ttLine,
				padding = parseInt(tooltipDivStyle.padding, 10);

			// Add border styling from options to the style
			tooltipDivStyle = merge(tooltipDivStyle, {
				padding: padding + PX,
				'background-color': options.backgroundColor,
				'border-style': 'solid',
				'border-width': borderWidth + PX,
				'border-radius': options.borderRadius + PX
			});

			// Optionally add shadow
			if (options.shadow) {
				tooltipDivStyle = merge(tooltipDivStyle, {
					'box-shadow': '1px 1px 3px gray', // w3c
					'-webkit-box-shadow': '1px 1px 3px gray' // webkit
				});
			}
			css(tooltipDiv, tooltipDivStyle);

			// Set simple style on the line
			css(tooltipLine, {
				'border-left': '1px solid darkgray'
			});

			// This event is triggered when a new tooltip should be shown
			addEvent(chart, 'tooltipRefresh', function (args) {
				var chartContainer = chart.container,
					offsetLeft = chartContainer.offsetLeft,
					offsetTop = chartContainer.offsetTop,
					position;

				// Set the content of the tooltip
				tooltipDiv.innerHTML = args.text;

				// Compute the best position for the tooltip based on the divs size and container size.
				position = chart.tooltip.getPosition(tooltipDiv.offsetWidth, tooltipDiv.offsetHeight, {plotX: args.x, plotY: args.y});

				css(tooltipDiv, {
					visibility: VISIBLE,
					left: position.x + PX,
					top: position.y + PX,
					'border-color': args.borderColor
				});

				// Position the tooltip line
				css(tooltipLine, {
					visibility: VISIBLE,
					left: offsetLeft + args.x + PX,
					top: offsetTop + chart.plotTop + PX,
					height: chart.plotHeight  + PX
				});

				// This timeout hides the tooltip after 3 seconds
				// First clear any existing timer
				if (renderer.ttTimer !== UNDEFINED) {
					clearTimeout(renderer.ttTimer);
				}

				// Start a new timer that hides tooltip and line
				renderer.ttTimer = setTimeout(function () {
					css(tooltipDiv, { visibility: HIDDEN });
					css(tooltipLine, { visibility: HIDDEN });
				}, 3000);
			});
		},

		/**
		 * Extend SVGRenderer.destroy to also destroy the elements added by CanVGRenderer.
		 */
		destroy: function () {
			var renderer = this;

			// Remove the canvas
			discardElement(renderer.canvas);

			// Kill the timer
			if (renderer.ttTimer !== UNDEFINED) {
				clearTimeout(renderer.ttTimer);
			}

			// Remove the divs for tooltip and line
			discardElement(renderer.ttLine);
			discardElement(renderer.ttDiv);
			discardElement(renderer.hiddenSvg);

			// Continue with base class
			return SVGRenderer.prototype.destroy.apply(renderer);
		},

		/**
		 * Take a color and return it if it's a string, do not make it a gradient even if it is a
		 * gradient. Currently canvg cannot render gradients (turns out black),
		 * see: http://code.google.com/p/canvg/issues/detail?id=104
		 *
		 * @param {Object} color The color or config object
		 */
		color: function (color, elem, prop) {
			if (color && color.linearGradient) {
				// Pick the end color and forward to base implementation
				color = color.stops[color.stops.length - 1][1];
			}
			return SVGRenderer.prototype.color.call(this, color, elem, prop);
		},

		/**
		 * Draws the SVG on the canvas or adds a draw invokation to the deferred list.
		 */
		draw: function () {
			var renderer = this;
			window.canvg(renderer.canvas, renderer.hiddenSvg.innerHTML);
		}
	});
}(Highcharts));
