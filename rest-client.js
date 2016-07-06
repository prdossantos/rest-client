var RC;
(function(window,document){

	var config = {
		host: 'api.altoqi.com.br',
		auth: {
			fields:{
				username: 'username',
				password: 'password',
			},			
			method: 'post',
			local_storage: false,
		}
	}

	RC = function(arg1, arg2) {
		
		var el;

		if(arg1 == 'config' && typeof arg2 == 'object') {
 			config = mergeUnique(arg2,config)
		} else if( arg1 ) {
			el = document.querySelector(arg1);
		}
		
		if( config.auth.local_storage && localStorage.getItem(config.auth.local_storage) ) {
			config.header = {'Authorization':'Bearer '+localStorage.getItem(config.auth.local_storage)}
		}

		function session(cleanAll=false)
		{
			if(cleanAll)
				localStorage.removeItem(config.auth.local_storage)
		}

		function auth(path, arg, callback)
		{
			arg = arg || config.auth.fields

			if(typeof arg == 'function') {
				callback = arg
				arg = config.auth.fields
			}
			if( arg1 && arg2 ) {
				eventListener(el, arg2, function(event){
					if( event.type == arg2) {
						var res = xhr({
							method: config.auth.method,
							url: config.host + path,
							data: normalizeXhrData(arg,config.auth.fields),
							callback: callback,
							header : config.auth.header
						})

						if( config.auth.local_storage ) {
							
							res.onload = function (res) {
								try {
									let obj = JSON.parse(res.target.responseText)
									if( obj && obj.data) {
										localStorage.setItem(config.auth.local_storage,obj.data)
										config.header = {'Authorization':'Bearer '+obj.data}
									}
								} catch (e) {
									console.log(e)
								}
							}
						}
					}
				})
			} else {
				var res = xhr({
					method: config.auth.method,
					url: config.host,
					data: normalizeXhrData(arg,config.auth.fields),
					callback: callback,
					header : config.auth.header
				})

				if( config.auth.local_storage ) {
				 	res.onload = storage
				}
			}
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
						var res = xhr({
							method: 'get',
							url: config.host + path,
							data: normalizeXhrData(arg),
							callback: callback,
							header : config.header
						})
					}
				})
			} else {
				var res = xhr({
					method: 'get',
					url: config.host + path,
					data: normalizeXhrData(arg),
					callback: callback,
					header : config.header
				})
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
						var res = xhr({
							method: 'post',
							url: config.host + path,
							data: normalizeXhrData(arg),
							callback: callback,
							header : config.header
						})
					}
				})
			} else {
				var res = xhr({
					method: 'post',
					url: config.host + path,
					data: normalizeXhrData(arg),
					callback: callback,
					header : config.header
				})
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
						var res = xhr({
							method: 'put',
							url: config.host + path,
							data: normalizeXhrData(arg),
							callback: callback,
							header : config.header
						})
					}
				})
			} else {
				var res = xhr({
					method: 'put',
					url: config.host + path,
					data: normalizeXhrData(arg),
					callback: callback,
					header : config.header
				})
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
						var res = xhr({
							method: 'patch',
							url: config.host + path,
							data: normalizeXhrData(arg),
							callback: callback,
							header : config.header
						})
					}
				})
			} else {
				var res = xhr({
					method: 'patch',
					url: config.host + path,
					data: normalizeXhrData(arg),
					callback: callback,
					header : config.header
				})
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
						var res = xhr({
							method: 'delete',
							url: config.host + path,
							data: normalizeXhrData(arg),
							callback: callback,
							header : config.header
						})
					}
				})
			} else {
				var res = xhr({
					method: 'delete',
					url: config.host + path,
					data: normalizeXhrData(arg),
					callback: callback,
					header : config.header
				})
			}
		}

		/** Utils */

		function eventListener(element, event, callback)
		{
			element.addEventListener(event, function(e){
				callback(e)
			})
		}

		function mergeUnique(newObj,oldObj)
		{
			if(typeof newObj == 'object' && typeof oldObj == 'object') {
				Object.keys(newObj).forEach(function(index){
					if( typeof newObj[index] == 'object' ) {
						mergeUnique(newObj[index], oldObj[index])
					} else {
						if(typeof oldObj[index] != 'undefined')
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
					 	let el = document.querySelector(obj[index])
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
			let el = document.querySelector(data), v = []
			// console.log(el)
			if( typeof data == 'object' ) {
				data = objToString(data);
			} else if(typeof data == 'string' && data) {
				if(el && fields) {
					Object.keys(fields).forEach(function(index){
						let tag = fields[index]
						if( fields[index].indexOf('.') > -1 || fields[index].indexOf('#') > -1 || fields[index].indexOf('[') > -1 ) {
							tag = tag
						} else {
							tag = 'input[name='+fields[index]+']'
						}
						let field = el.querySelector(tag)
						if(field)
							v.push(index+'='+field.value)
					})

					data = v.join('&')
				} else if( el ) {
					let form = el;
					data = formSerialize(form)
				}	
			}

			return data
		}

		function formSerialize(form)
		{
			let v=[],i=0,accepted = ['input','select','textarea'];

			if(typeof form == 'string') form = document.querySelector(form)

			var elements = form.querySelectorAll(accepted.join(','))

			if(elements) {
				elements.forEach(function(el){
					if( el.value ) {
						let name = el.name || 'field'+ ++i
						let value = el.value
						if( el.localName == 'input' && (el.type == 'radio' || el.type == 'checkbox') && el.checked ){
							v.push(name+'='+value)
						}
						if( el.localName == 'select'){
							let options = el.querySelectorAll('option');
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
				});

				return v.join('&');
			}

			return '';

		}

		function xhr(options)
		{
 			let opt = options;
				opt.method = options.method || 'post'
				opt.url = options.url || ''
				opt.data = options.data || ''
				opt.callback = options.callback || false
				opt.header = options.header || false

			let data = opt.data

			if( opt.method.toLowerCase() == 'get' )
				opt.url = opt.url + '?' + data

			let xhr = new XMLHttpRequest();
				xhr.open(opt.method, opt.url, true)
				if(opt.method.toLowerCase() != 'get')
					xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
				if(opt.header) {
					Object.keys(opt.header).forEach( function(index) {
						xhr.setRequestHeader(index,opt.header[index])
					});
				}

				var r = xhr.onload = function(res){
					obj = res.target
					if(opt.callback)
						opt.callback(obj.responseText,obj.status,obj.statusText);

				}
				xhr.send(data);

			return xhr
		}

		return {
			auth: auth,
			get: _get,
			post: _post,
			put: _put,
			patch: _patch,
			delete: _delete,
			clearSess: session
		}
	}
}(window,document));