npm-url-utils
=============

Node.js - An implementation of URLUtils as described by MDN. Useful for emulating window.location on the server side.

**See MDN documentation**: https://developer.mozilla.org/en-US/docs/Web/API/URLUtils

**Example** (using express.js)
```bash
npm install url-utils
```

```javascript
app.get('*', function(req, res){
/*>*/	var URLUtils = require('url-utils');
		var window = {
/*>*/		location: new URLUtils(
/*>*/			req.protocol + '://' + req.get('host') + req.originalUrl
/*>*/		)
		};

/*>*/	console.log( window.location.href ); // "http://mywebsite.com/index.jsx?foo=bar#myhash"
/*>*/	console.log( window.location.protocol ); // "http:"
/*>*/	console.log( window.location.hash ); // "#myhash"
});
```
