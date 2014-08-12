var URLUtils = (function(){
    var Constructor = function(url) {
        if(url.constructor == Constructor) {
            this.__copy(url);
        } else {
            this.__parse(url);
        }
    };

    Constructor.prototype = {
        __urlRegex: /(?:([^\:]*)\:\/\/)?(?:([^\:\@]*)(?:\:([^\@]*))?\@)?(?:([^\/\:]*)\.(?=[^\.\/\:]*\.[^\.\/\:]*))?([^\.\/\:]*)(?:\.([^\/\.\:]*))?(?:\:([0-9]*))?(\/[^\?#]*(?=.*?\/)\/)?([^\?#]*)?(?:\?([^#]*))?(?:#(.*))?/,

        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        password: "",
        pathname: "",
        port: "",
        protocol: "",
        search: "",
        username: "",

        __copy: function(oldConstructor) {
            for(var x in oldConstructor) {
                this[x] = oldConstructor[x];
            }
        },
        __parse: function(urlStr) {
            var matches = urlStr.match(this.__urlRegex);

            //  1       2       3       4           5       6       7       8               9           10                  11
            // ["ftp", "user", "pass", "www.cs", "server", "com", "8080", "/dir1/dir2/", "file.php", "param1=value1", "hashtag"]
            // ftp://user:pass@www.cs.server.com:8080/dir1/dir2/file.php?param1=value1#hashtag

            this.protocol = matches[1] + ":";

            var hostNameArr = [];
            if(matches[4]) hostNameArr.push(matches[4]);
            if(matches[5]) hostNameArr.push(matches[5]);
            if(matches[6]) hostNameArr.push(matches[6]);
            this.hostname = hostNameArr.join('.');

            this.port = matches[7] || "";

            this.host = this.hostname + (
                this.port ?
                    ":"+this.port
                :
                    ""
            );

            this.origin = this.protocol + "//" + this.host;

            this.username = matches[2];
            this.password = matches[3];

            this.pathname = matches[8] + (matches[9] || "");

            this.search = (
                matches[10] ?
                    "?" + matches[10]
                :
                    ""
            );

            this.hash = (
                matches[11] ?
                    "#" + matches[11]
                :
                    ""
            );

            this.href = matches[0];
        },

        toString: function(){
            return this.href;
        }
    };

    return Constructor;
})();

module.exports = URLUtils;
