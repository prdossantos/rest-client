var RC;
(function(window,document){

	var config = {
		host: ''
	}

	RC = function(arg1, arg2) {
		
		var el;

		if( arg1 ) {
			el = document.querySelector(arg1);
		}

		if( localStorage.getItem('rc_config') ) {
			config = JSON.parse(localStorage.getItem('rc_config'))
		}

		function session(cleanAll)
		{
			if(arg1 && arg2) {
				eventListener(el,arg2, function(event){
					if(event.type == arg2) {
						if(cleanAll && typeof cleanAll == 'boolean')
							localStorage.removeItem('rc_config')
						else if(cleanAll && typeof cleanAll == 'string')
							localStorage.removeItem(cleanAll)
					}
				})
			} else {
				if(cleanAll && typeof cleanAll == 'boolean') {
					localStorage.removeItem('rc_config')
					config = {}
				} else if(cleanAll && typeof cleanAll == 'string') {
					localStorage.removeItem(cleanAll)	
				}
			}
			
		}

		function _getConfig(key)
		{
			return config[key] || config;
		}

		function _setConfig(arg1,arg2,store)
		{
			if( typeof arg1 == 'object')
				config = mergeUnique(arg1,config)
			else
				config[arg1] = arg2


			if(store)
				localStorage.setItem('rc_config',JSON.stringify(config)) 
		}

		function _get(path, arg, callback)
		{
			if(typeof arg == 'function') {
				callback = arg
				arg = ''
			}
			// console.log(arg)
			if( arg1 && arg2 ) {
				eventListener(el, arg2, function(event){
					if( event.type == arg2) {
						xhr({
							method: 'get',
							url: config.host + path,
							data: normalizeXhrData(arg),
							callback: callback,
							header : config.header
						}).then(_doneCallbacks, _failCallbacks)
					}
				})
			} else {
				xhr({
					method: 'get',
					url: config.host + path,
					data: normalizeXhrData(arg),
					callback: callback,
					header : config.header
				}).then(_doneCallbacks, _failCallbacks)
			}
		}

		function _post(path, arg, callback)
		{
			if(typeof arg == 'function') {
				callback = arg
				arg = ''
			}
			// console.log(arg)
			if( arg1 && arg2 ) {
				eventListener(el, arg2, function(event){
					if( event.type == arg2) {
						xhr({
							method: 'post',
							url: config.host + path,
							data: normalizeXhrData(arg),
							callback: callback,
							header : config.header
						}).then(_doneCallbacks, _failCallbacks)
					}
				})
			} else {
				xhr({
					method: 'post',
					url: config.host + path,
					data: normalizeXhrData(arg),
					callback: callback,
					header : config.header
				}).then(_doneCallbacks, _failCallbacks)
			}
		}

		function _put(path, arg, callback)
		{
			if(typeof arg == 'function') {
				callback = arg
				arg = ''
			}
			// console.log(arg)
			if( arg1 && arg2 ) {
				eventListener(el, arg2, function(event){
					if( event.type == arg2) {
						xhr({
							method: 'put',
							url: config.host + path,
							data: normalizeXhrData(arg),
							callback: callback,
							header : config.header
						}).then(_doneCallbacks, _failCallbacks)
					}
				})
			} else {
				xhr({
					method: 'put',
					url: config.host + path,
					data: normalizeXhrData(arg),
					callback: callback,
					header : config.header
				}).then(_doneCallbacks, _failCallbacks)
			}
		}

		function _patch(path, arg, callback)
		{
			if(typeof arg == 'function') {
				callback = arg
				arg = ''
			}
			// console.log(arg)
			if( arg1 && arg2 ) {
				eventListener(el, arg2, function(event){
					if( event.type == arg2) {
						xhr({
							method: 'patch',
							url: config.host + path,
							data: normalizeXhrData(arg),
							callback: callback,
							header : config.header
						}).then(_doneCallbacks, _failCallbacks)
					}
				})
			} else {
				xhr({
					method: 'patch',
					url: config.host + path,
					data: normalizeXhrData(arg),
					callback: callback,
					header : config.header
				}).then(_doneCallbacks, _failCallbacks)
			}
		}

		function _delete(path, arg, callback)
		{
			if(typeof arg == 'function') {
				callback = arg
				arg = ''
			}
			// console.log(arg)
			if( arg1 && arg2 ) {
				eventListener(el, arg2, function(event){
					if( event.type == arg2) {
						xhr({
							method: 'delete',
							url: config.host + path,
							data: normalizeXhrData(arg),
							callback: callback,
							header : config.header
						}).then(_doneCallbacks, _failCallbacks)
					}
				})
			} else {
				xhr({
					method: 'delete',
					url: config.host + path,
					data: normalizeXhrData(arg),
					callback: callback,
					header : config.header
				}).then(_doneCallbacks, _failCallbacks)
			}
		}

		/** Utils */

		function eventListener(element, event, callback)
		{
			if(event && element) {
				element.addEventListener(event, function(e){
					callback(e)
				})	
			}
		}

		function mergeUnique(newObj,oldObj)
		{
			if(typeof newObj == 'object' && typeof oldObj == 'object') {
				Object.keys(newObj).forEach(function(index){
					if( typeof newObj[index] == 'object' ) {
						mergeUnique(newObj[index], oldObj[index])
					} else {
						oldObj[index] = newObj[index]
					}
				})
			}

			return oldObj;
		}

		function objToString(obj)
		{
			var v = [], str = ''
			
			if ( typeof obj == 'object' ) {
				Object.keys(obj).forEach(function(index){
					if( typeof obj[index] == 'string' ) {
					 	var el = document.querySelector(obj[index])
					 	if(el) {
					 		v.push(index+'='+el.value)
					 	} else {
					 		v.push(index+'='+obj[index])	
					 	}
					}
				})

				str = v.join('&')
			} else {
				str = obj
			}

			return str;
		}

		function normalizeXhrData(data,fields)
		{
			var el = document.querySelector(data), v = []
			// console.log(el)
			if( typeof data == 'object' ) {
				data = objToString(data);
			} else if(typeof data == 'string' && data) {
				if(el && fields) {
					Object.keys(fields).forEach(function(index){
						var tag = fields[index]
						if( fields[index].indexOf('.') > -1 || fields[index].indexOf('#') > -1 || fields[index].indexOf('[') > -1 ) {
							tag = tag
						} else {
							tag = 'input[name='+fields[index]+']'
						}
						var field = el.querySelector(tag)
						if(field)
							v.push(index+'='+field.value)
					})

					data = v.join('&')
				} else if( el ) {
					var form = el;
					data = formSerialize(form)
				}	
			}

			return data
		}

		function formSerialize(form)
		{
			var v=[],i=0,accepted = ['input','select','textarea'];

			if(typeof form == 'string') form = document.querySelector(form)

			var elements = form.querySelectorAll(accepted.join(','))

			if(elements) {
				for(i in elements){
					let el = elements[i]
					if( el.value ) {
						var name = el.name || 'field'+ ++i
						var value = el.value
						if( el.localName == 'input' && (el.type == 'radio' || el.type == 'checkbox') && el.checked ){
							v.push(name+'='+value)
						}
						if( el.localName == 'select'){
							var options = el.querySelectorAll('option');
							options.forEach(function(opt){
								if(opt.selected) {
									if(el.hasAttribute('multiple') && name.indexOf('[') == -1) {
										name = name+'[]';
									}

									v.push(name+'='+opt.value)
								}	
							})
							
						} 
						if( el.type == 'text' || el.type == 'textarea' ){
							v.push(name+'='+value)
						}
					}
				};

				return v.join('&');
			}

			return '';

		}

		function xhr(options)
		{
			return new Promise(function(resolve, reject){
				var opt = options;
					opt.method = options.method || 'post'
					opt.url = options.url || ''
					opt.data = options.data || ''
					opt.callback = options.callback || false
					opt.header = options.header || false

				var data = opt.data

				if( opt.method.toLowerCase() == 'get' )
					opt.url = opt.url + '?' + data

				var xhr = new XMLHttpRequest();
					xhr.open(opt.method, opt.url, true)
					if(opt.method.toLowerCase() != 'get')
						xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
					if(opt.header) {
						Object.keys(opt.header).forEach( function(index) {
							xhr.setRequestHeader(index,opt.header[index])
						});
					}

					xhr.onload = function(res){
						obj = res.target
						if( obj.status == 200 ) {
							obj.options = options
							resolve(obj)
						} else {
							reject(Error('Proccess didn\'t load successfully, error: ('+obj.status+')'+obj.statusText))
						}
					}

					xhr.onerror = function() {
						reject(Error('There was a network error'))
					}

					xhr.send(data);

				return xhr
			})
		}

		function _doneCallbacks(obj)
		{
			if(obj.options.callback)
 				obj.options.callback(obj.responseText,obj.status,obj.statusText);

		}

		function _failCallbacks(Error) 
		{
			console.log(Error)
		}

		return {
			get: _get,
			post: _post,
			put: _put,
			patch: _patch,
			delete: _delete,
			clearSess: session,
			getConfig: _getConfig,
			setConfig: _setConfig
		}
	}
}(window,document));