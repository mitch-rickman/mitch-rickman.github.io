"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/******/(function (modules) {
	// webpackBootstrap
	/******/ // The module cache
	/******/var installedModules = {};

	/******/ // The require function
	/******/function __webpack_require__(moduleId) {

		/******/ // Check if module is in cache
		/******/if (installedModules[moduleId])
			/******/return installedModules[moduleId].exports;

		/******/ // Create a new module (and put it into the cache)
		/******/var module = installedModules[moduleId] = {
			/******/exports: {},
			/******/id: moduleId,
			/******/loaded: false
			/******/ };

		/******/ // Execute the module function
		/******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

		/******/ // Flag the module as loaded
		/******/module.loaded = true;

		/******/ // Return the exports of the module
		/******/return module.exports;
		/******/
	}

	/******/ // expose the modules object (__webpack_modules__)
	/******/__webpack_require__.m = modules;

	/******/ // expose the module cache
	/******/__webpack_require__.c = installedModules;

	/******/ // __webpack_public_path__
	/******/__webpack_require__.p = "";

	/******/ // Load entry module and return exports
	/******/return __webpack_require__(0);
	/******/
})(
/************************************************************************/
/******/[
/* 0 */
/***/function (module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(6);
	module.exports = __webpack_require__(5);

	/***/
},
/* 1 */
/***/function (module, exports, __webpack_require__) {

	(function () {
		var App = __webpack_require__(2);
		var app = new App();
	})();

	/***/
},
/* 2 */
/***/function (module, exports, __webpack_require__) {

	var PickerManager = __webpack_require__(3);
	var Vhost = __webpack_require__(5);
	var Settings = __webpack_require__(6);

	// base application

	var App = function () {
		function App() {
			_classCallCheck(this, App);

			console.log("app init");
			this.baseUrl = "dev.local";
			this.output = document.getElementById('vhosts');
			this.addButton = document.querySelectorAll('.add-host')[0];

			this.setBinds();
			this.enableSettings();
			this.enableFilePickers();
			this.listHosts();
		}

		_createClass(App, [{
			key: "setBinds",
			value: function setBinds() {
				this.addButton.addEventListener('click', this.addHost.bind(this));
			}

			/*
    * Enable user to access settings section
    */

		}, {
			key: "enableSettings",
			value: function enableSettings() {
				this.settings = new Settings();
			}

			/*
    * Generate a list of file pickers
    */

		}, {
			key: "enableFilePickers",
			value: function enableFilePickers(reset) {
				this.pickerManager = new PickerManager('file-picker', 'selector', 'output');
			}

			/*
    * Get hosts from database
    * @return: A list of saved hosts
    */

		}, {
			key: "getHosts",
			value: function getHosts() {
				return [{
					hostName: "CoolProject",
					path: "/user/projects/awesome-sauce-incorporated/"
				}, {
					hostName: "NotSoCoolProject",
					path: "/user/projects/less-awesome-sauce.biz/"
				}];
			}

			/*
    * List hosts
    */

		}, {
			key: "listHosts",
			value: function listHosts() {
				var hosts = this.getHosts();

				// this.pickerManager.disablePickers();

				for (var i = 0, n = hosts.length; i < n; i++) {
					console.log(hosts[i]);
					var vhost = new Vhost(this.baseUrl, i, hosts[i]);
					vhost.render(this.output);
					this.count = i;
				}

				this.pickerManager.init();
			}
		}, {
			key: "addHost",
			value: function addHost() {
				this.count++;
				var vhost = new Vhost(this.baseUrl, this.count);
				vhost.render(this.output);
			}
		}]);

		return App;
	}();

	module.exports = App;

	/***/
},
/* 3 */
/***/function (module, exports, __webpack_require__) {

	var FilePicker = __webpack_require__(4);

	/*
 * create and manage file pickers
 */

	var FilePickerManager = function () {
		function FilePickerManager(wrapperClass, pickerClass, outputClass) {
			_classCallCheck(this, FilePickerManager);

			this.wrapperClass = "." + wrapperClass;
			this.pickerClass = "." + pickerClass;
			this.outputClass = "." + outputClass;
			this.pickerList = [];

			this.init();
		}

		/*
   * Collect pickers and start them
   */


		_createClass(FilePickerManager, [{
			key: "init",
			value: function init() {
				var pickerWrappers = this.getPickers();

				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = pickerWrappers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var wrapper = _step.value;

						this.addPicker(wrapper);
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			}

			/*
    * Add picker to overall list
    */

		}, {
			key: "addPicker",
			value: function addPicker(wrapperElement) {
				var selector = wrapperElement.querySelectorAll(this.pickerClass)[0];
				var output = wrapperElement.querySelectorAll(this.outputClass)[0];
				var picker = new FilePicker(selector, output);
				this.pickerList.push(picker);
			}

			/*
    * return picker elements
    */

		}, {
			key: "getPickers",
			value: function getPickers() {
				return document.querySelectorAll(this.wrapperClass);
			}

			/*
    * Disable file pickers
    */

		}, {
			key: "disablePickers",
			value: function disablePickers() {
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					for (var _iterator2 = this.pickersList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var picker = _step2.value;

						picker.removeEvents();
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2.return) {
							_iterator2.return();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}
			}

			/*
    * Enable file pickers
    */

		}, {
			key: "enablePickers",
			value: function enablePickers() {
				var _iteratorNormalCompletion3 = true;
				var _didIteratorError3 = false;
				var _iteratorError3 = undefined;

				try {
					for (var _iterator3 = this.pickersList[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
						var picker = _step3.value;

						picker.addEvents();
					}
				} catch (err) {
					_didIteratorError3 = true;
					_iteratorError3 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion3 && _iterator3.return) {
							_iterator3.return();
						}
					} finally {
						if (_didIteratorError3) {
							throw _iteratorError3;
						}
					}
				}
			}
		}]);

		return FilePickerManager;
	}();

	module.exports = FilePickerManager;

	/***/
},
/* 4 */
/***/function (module, exports) {
	var FilePicker = function () {
		function FilePicker(selector, output) {
			_classCallCheck(this, FilePicker);

			this.selector = selector;
			this.output = output;
			this.init();
		}

		_createClass(FilePicker, [{
			key: "init",
			value: function init() {
				this.addEvents();
			}

			/*
   * Add events
   */

		}, {
			key: "addEvents",
			value: function addEvents() {
				this.selector.addEventListener('change', this.updateOutputValue.bind(this));
			}

			/*
   * Remove events
   */

		}, {
			key: "removeEvents",
			value: function removeEvents() {
				this.selector.removeEventListener('change', this.updateOutputValue.bind(this));
			}

			/*
   * Update the value of the output to be the selected file path
   */

		}, {
			key: "updateOutputValue",
			value: function updateOutputValue() {
				this.output.value = this.selector.files[0].path;
				this.removeEvents();
			}
		}]);

		return FilePicker;
	}();

	module.exports = FilePicker;

	/***/
},
/* 5 */
/***/function (module, exports) {
	var Vhost = function () {
		function Vhost(baseUrl, pickerId, options) {
			_classCallCheck(this, Vhost);

			var defaults = {
				hostName: false,
				path: false
			};

			this.options = typeof options == "undefined" ? defaults : options;

			var wrap = document.createElement('div');
			wrap.setAttribute('data-id', pickerId);
			wrap.className = "vhost";

			var hiddenInput = document.createElement('input');
			hiddenInput.className = "host-name";
			hiddenInput.setAttribute('type', "hidden");

			var title = this.getTitle(baseUrl);
			var picker = this.getFilePicker(pickerId);

			var deleteButton = document.createElement('button');
			deleteButton.className = 'vhost__delete';
			deleteButton.innerHTML = "Delete";
			deleteButton.addEventListener('click', this.destroy.bind(this));

			wrap.appendChild(hiddenInput);
			wrap.appendChild(title);
			wrap.appendChild(picker);
			wrap.appendChild(deleteButton);

			this.structure = wrap;
		}

		_createClass(Vhost, [{
			key: "getTitle",
			value: function getTitle(baseUrl) {
				var title = document.createElement('h2');
				title.className = "vhost__title";

				var vhostName = document.createElement('span');
				var vhostNameClass = "vhost__name";
				vhostName.setAttribute('contenteditable', 'true');
				if (this.options.hostName != false) {
					vhostName.innerHTML = this.options.hostName;
				} else {
					vhostName.setAttribute("placeholder", this.getPlaceholder());
					vhostNameClass += " clean";
				}
				vhostName.className = vhostNameClass;

				var baseUrlElement = document.createElement('span');
				baseUrlElement.innerHTML = "." + baseUrl;

				title.appendChild(vhostName);
				title.appendChild(baseUrlElement);

				return title;
			}
		}, {
			key: "getFilePicker",
			value: function getFilePicker(pickerId) {
				var wrap = document.createElement('div');
				wrap.className = "file-picker vhost__data";

				var label = document.createElement('label');
				label.className = "button vhost__selector-label";
				label.setAttribute('for', pickerId);
				label.innerHTML = 'Points to:';

				var picker = document.createElement('input');
				picker.className = 'selector vhost__selector';
				picker.setAttribute('id', pickerId);
				picker.setAttribute('name', 'file');
				picker.setAttribute('type', 'file');
				picker.setAttribute('webkitdirectory', 'webkitdirectory');
				picker.setAttribute('directory', 'directory');

				var output = document.createElement('input');
				output.className = "output vhost__output";
				if (this.options.path != false) {
					output.value = this.options.path;
				} else {
					output.setAttribute('placeholder', '/that/one/folder/');
				}

				wrap.appendChild(label);
				wrap.appendChild(picker);
				wrap.appendChild(output);

				return wrap;
			}
		}, {
			key: "getPlaceholder",
			value: function getPlaceholder() {
				var examples = ["awesome-sauce", "plain-ol-sauce", "not-into-this-sauce", "saucerer", "secret-sauce"];
				return examples[Math.floor(Math.random() * examples.length)];
			}
		}, {
			key: "render",
			value: function render(outputLocation) {
				outputLocation.appendChild(this.structure);
			}
		}, {
			key: "destroy",
			value: function destroy(e) {
				var elementToRemove = e.target.parentNode;
				elementToRemove.parentNode.removeChild(elementToRemove);
			}
		}]);

		return Vhost;
	}();

	module.exports = Vhost;

	/***/
},
/* 6 */
/***/function (module, exports) {
	var Settings = function () {
		function Settings() {
			_classCallCheck(this, Settings);

			this.settingsSection = document.querySelectorAll('.settings-section')[0];
			this.settingsButton = document.querySelectorAll('.settings-button')[0];
			this.setBinds();
		}

		/*
   * Connect elements to functionality
   */


		_createClass(Settings, [{
			key: "setBinds",
			value: function setBinds() {
				this.settingsButton.addEventListener('click', this.toggleSettings.bind(this));
			}

			/*
    * Toggle settings sectino open and close
    */

		}, {
			key: "toggleSettings",
			value: function toggleSettings() {
				if (this.isClosed || typeof this.isClosed == 'undefined') {
					this.settingsSection.classList.add('open');
					this.settingsSection.classList.remove('closed');
					this.isClosed = false;
				} else {
					this.settingsSection.classList.remove('open');
					this.settingsSection.classList.add('closed');
					this.isClosed = true;
				}
			}
		}]);

		return Settings;
	}();

	module.exports = Settings;

	/***/
}
/******/]);