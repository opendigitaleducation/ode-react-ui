import React, { useState, useEffect, useContext, createContext, forwardRef, useMemo } from "react";
import { Loader, RafterDown } from "@ode-react-ui/icons";
const ERROR_CODE = { SUCCESS: "0000", UNKNOWN: "0010", NOT_INITIALIZED: "0020", NOT_SUPPORTED: "0030", APP_NOT_FOUND: "0040", AGENT_NOT_FOUND: "0050", TRANSPORT_ERROR: "0060", TIME_OUT: "0070", MALFORMED_DATA: "0080" }, APP = { EXPLORER: "explorer", PORTAL: "portal", BLOG: "blog", EXERCIZER: "exercizer", TIMELINE: "timeline", CAS: "cas", VIDEO: "video" };
function getDefaultExportFromCjs(e2) {
  return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2.default : e2;
}
var axios$3 = { exports: {} }, axios$2 = { exports: {} }, bind$2 = function(e2, t) {
  return function() {
    for (var r2 = new Array(arguments.length), n = 0; n < r2.length; n++)
      r2[n] = arguments[n];
    return e2.apply(t, r2);
  };
}, bind$1 = bind$2, toString = Object.prototype.toString;
function isArray$3(e2) {
  return toString.call(e2) === "[object Array]";
}
function isUndefined(e2) {
  return e2 === void 0;
}
function isBuffer(e2) {
  return e2 !== null && !isUndefined(e2) && e2.constructor !== null && !isUndefined(e2.constructor) && typeof e2.constructor.isBuffer == "function" && e2.constructor.isBuffer(e2);
}
function isArrayBuffer(e2) {
  return toString.call(e2) === "[object ArrayBuffer]";
}
function isFormData(e2) {
  return typeof FormData < "u" && e2 instanceof FormData;
}
function isArrayBufferView(e2) {
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? ArrayBuffer.isView(e2) : e2 && e2.buffer && e2.buffer instanceof ArrayBuffer;
}
function isString(e2) {
  return typeof e2 == "string";
}
function isNumber(e2) {
  return typeof e2 == "number";
}
function isObject(e2) {
  return e2 !== null && typeof e2 == "object";
}
function isPlainObject(e2) {
  if (toString.call(e2) !== "[object Object]")
    return !1;
  var t = Object.getPrototypeOf(e2);
  return t === null || t === Object.prototype;
}
function isDate(e2) {
  return toString.call(e2) === "[object Date]";
}
function isFile(e2) {
  return toString.call(e2) === "[object File]";
}
function isBlob(e2) {
  return toString.call(e2) === "[object Blob]";
}
function isFunction$1(e2) {
  return toString.call(e2) === "[object Function]";
}
function isStream(e2) {
  return isObject(e2) && isFunction$1(e2.pipe);
}
function isURLSearchParams(e2) {
  return typeof URLSearchParams < "u" && e2 instanceof URLSearchParams;
}
function trim(e2) {
  return e2.trim ? e2.trim() : e2.replace(/^\s+|\s+$/g, "");
}
function isStandardBrowserEnv() {
  return (typeof navigator > "u" || navigator.product !== "ReactNative" && navigator.product !== "NativeScript" && navigator.product !== "NS") && typeof window < "u" && typeof document < "u";
}
function forEach(e2, t) {
  if (e2 != null)
    if (typeof e2 != "object" && (e2 = [e2]), isArray$3(e2))
      for (var r2 = 0, n = e2.length; r2 < n; r2++)
        t.call(null, e2[r2], r2, e2);
    else
      for (var i in e2)
        Object.prototype.hasOwnProperty.call(e2, i) && t.call(null, e2[i], i, e2);
}
function merge$2() {
  var e2 = {};
  function t(t2, r3) {
    isPlainObject(e2[r3]) && isPlainObject(t2) ? e2[r3] = merge$2(e2[r3], t2) : isPlainObject(t2) ? e2[r3] = merge$2({}, t2) : isArray$3(t2) ? e2[r3] = t2.slice() : e2[r3] = t2;
  }
  for (var r2 = 0, n = arguments.length; r2 < n; r2++)
    forEach(arguments[r2], t);
  return e2;
}
function extend(e2, t, r2) {
  return forEach(t, function(t2, n) {
    e2[n] = r2 && typeof t2 == "function" ? bind$1(t2, r2) : t2;
  }), e2;
}
function stripBOM(e2) {
  return e2.charCodeAt(0) === 65279 && (e2 = e2.slice(1)), e2;
}
var utils$9 = { isArray: isArray$3, isArrayBuffer, isBuffer, isFormData, isArrayBufferView, isString, isNumber, isObject, isPlainObject, isUndefined, isDate, isFile, isBlob, isFunction: isFunction$1, isStream, isURLSearchParams, isStandardBrowserEnv, forEach, merge: merge$2, extend, trim, stripBOM }, utils$8 = utils$9;
function encode(e2) {
  return encodeURIComponent(e2).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
var buildURL$1 = function(e2, t, r2) {
  if (!t)
    return e2;
  var n;
  if (r2)
    n = r2(t);
  else if (utils$8.isURLSearchParams(t))
    n = t.toString();
  else {
    var i = [];
    utils$8.forEach(t, function(e3, t2) {
      e3 != null && (utils$8.isArray(e3) ? t2 += "[]" : e3 = [e3], utils$8.forEach(e3, function(e4) {
        utils$8.isDate(e4) ? e4 = e4.toISOString() : utils$8.isObject(e4) && (e4 = JSON.stringify(e4)), i.push(encode(t2) + "=" + encode(e4));
      }));
    }), n = i.join("&");
  }
  if (n) {
    var o = e2.indexOf("#");
    o !== -1 && (e2 = e2.slice(0, o)), e2 += (e2.indexOf("?") === -1 ? "?" : "&") + n;
  }
  return e2;
}, utils$7 = utils$9;
function InterceptorManager$1() {
  this.handlers = [];
}
InterceptorManager$1.prototype.use = function(e2, t, r2) {
  return this.handlers.push({ fulfilled: e2, rejected: t, synchronous: !!r2 && r2.synchronous, runWhen: r2 ? r2.runWhen : null }), this.handlers.length - 1;
}, InterceptorManager$1.prototype.eject = function(e2) {
  this.handlers[e2] && (this.handlers[e2] = null);
}, InterceptorManager$1.prototype.forEach = function(e2) {
  utils$7.forEach(this.handlers, function(t) {
    t !== null && e2(t);
  });
};
var InterceptorManager_1 = InterceptorManager$1, utils$6 = utils$9, normalizeHeaderName$1 = function(e2, t) {
  utils$6.forEach(e2, function(r2, n) {
    n !== t && n.toUpperCase() === t.toUpperCase() && (e2[t] = r2, delete e2[n]);
  });
}, enhanceError$1 = function(e2, t, r2, n, i) {
  return e2.config = t, r2 && (e2.code = r2), e2.request = n, e2.response = i, e2.isAxiosError = !0, e2.toJSON = function() {
    return { message: this.message, name: this.name, description: this.description, number: this.number, fileName: this.fileName, lineNumber: this.lineNumber, columnNumber: this.columnNumber, stack: this.stack, config: this.config, code: this.code };
  }, e2;
}, createError, hasRequiredCreateError, settle, hasRequiredSettle, cookies, hasRequiredCookies, isAbsoluteURL, hasRequiredIsAbsoluteURL, combineURLs, hasRequiredCombineURLs, buildFullPath, hasRequiredBuildFullPath, parseHeaders, hasRequiredParseHeaders, isURLSameOrigin, hasRequiredIsURLSameOrigin, xhr, hasRequiredXhr;
function requireCreateError() {
  if (hasRequiredCreateError)
    return createError;
  hasRequiredCreateError = 1;
  var e2 = enhanceError$1;
  return createError = function(t, r2, n, i, o) {
    var u = new Error(t);
    return e2(u, r2, n, i, o);
  }, createError;
}
function requireSettle() {
  if (hasRequiredSettle)
    return settle;
  hasRequiredSettle = 1;
  var e2 = requireCreateError();
  return settle = function(t, r2, n) {
    var i = n.config.validateStatus;
    n.status && i && !i(n.status) ? r2(e2("Request failed with status code " + n.status, n.config, null, n.request, n)) : t(n);
  };
}
function requireCookies() {
  if (hasRequiredCookies)
    return cookies;
  hasRequiredCookies = 1;
  var e2 = utils$9;
  return cookies = e2.isStandardBrowserEnv() ? { write: function(t, r2, n, i, o, u) {
    var s = [];
    s.push(t + "=" + encodeURIComponent(r2)), e2.isNumber(n) && s.push("expires=" + new Date(n).toGMTString()), e2.isString(i) && s.push("path=" + i), e2.isString(o) && s.push("domain=" + o), u === !0 && s.push("secure"), document.cookie = s.join("; ");
  }, read: function(e3) {
    var t = document.cookie.match(new RegExp("(^|;\\s*)(" + e3 + ")=([^;]*)"));
    return t ? decodeURIComponent(t[3]) : null;
  }, remove: function(e3) {
    this.write(e3, "", Date.now() - 864e5);
  } } : { write: function() {
  }, read: function() {
    return null;
  }, remove: function() {
  } }, cookies;
}
function requireIsAbsoluteURL() {
  return hasRequiredIsAbsoluteURL ? isAbsoluteURL : (hasRequiredIsAbsoluteURL = 1, isAbsoluteURL = function(e2) {
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e2);
  });
}
function requireCombineURLs() {
  return hasRequiredCombineURLs ? combineURLs : (hasRequiredCombineURLs = 1, combineURLs = function(e2, t) {
    return t ? e2.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e2;
  });
}
function requireBuildFullPath() {
  if (hasRequiredBuildFullPath)
    return buildFullPath;
  hasRequiredBuildFullPath = 1;
  var e2 = requireIsAbsoluteURL(), t = requireCombineURLs();
  return buildFullPath = function(r2, n) {
    return r2 && !e2(n) ? t(r2, n) : n;
  };
}
function requireParseHeaders() {
  if (hasRequiredParseHeaders)
    return parseHeaders;
  hasRequiredParseHeaders = 1;
  var e2 = utils$9, t = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"];
  return parseHeaders = function(r2) {
    var n, i, o, u = {};
    return r2 && e2.forEach(r2.split(`
`), function(r3) {
      if (o = r3.indexOf(":"), n = e2.trim(r3.substr(0, o)).toLowerCase(), i = e2.trim(r3.substr(o + 1)), n) {
        if (u[n] && t.indexOf(n) >= 0)
          return;
        u[n] = n === "set-cookie" ? (u[n] ? u[n] : []).concat([i]) : u[n] ? u[n] + ", " + i : i;
      }
    }), u;
  };
}
function requireIsURLSameOrigin() {
  if (hasRequiredIsURLSameOrigin)
    return isURLSameOrigin;
  hasRequiredIsURLSameOrigin = 1;
  var e2 = utils$9;
  return isURLSameOrigin = e2.isStandardBrowserEnv() ? function() {
    var t, r2 = /(msie|trident)/i.test(navigator.userAgent), n = document.createElement("a");
    function i(e3) {
      var t2 = e3;
      return r2 && (n.setAttribute("href", t2), t2 = n.href), n.setAttribute("href", t2), { href: n.href, protocol: n.protocol ? n.protocol.replace(/:$/, "") : "", host: n.host, search: n.search ? n.search.replace(/^\?/, "") : "", hash: n.hash ? n.hash.replace(/^#/, "") : "", hostname: n.hostname, port: n.port, pathname: n.pathname.charAt(0) === "/" ? n.pathname : "/" + n.pathname };
    }
    return t = i(window.location.href), function(r3) {
      var n2 = e2.isString(r3) ? i(r3) : r3;
      return n2.protocol === t.protocol && n2.host === t.host;
    };
  }() : function() {
    return !0;
  };
}
function requireXhr() {
  if (hasRequiredXhr)
    return xhr;
  hasRequiredXhr = 1;
  var e2 = utils$9, t = requireSettle(), r2 = requireCookies(), n = buildURL$1, i = requireBuildFullPath(), o = requireParseHeaders(), u = requireIsURLSameOrigin(), s = requireCreateError();
  return xhr = function(a) {
    return new Promise(function(c, l) {
      var f = a.data, d = a.headers, p2 = a.responseType;
      e2.isFormData(f) && delete d["Content-Type"];
      var h = new XMLHttpRequest();
      if (a.auth) {
        var b = a.auth.username || "", m = a.auth.password ? unescape(encodeURIComponent(a.auth.password)) : "";
        d.Authorization = "Basic " + btoa(b + ":" + m);
      }
      var v = i(a.baseURL, a.url);
      function g() {
        if (h) {
          var e3 = "getAllResponseHeaders" in h ? o(h.getAllResponseHeaders()) : null, r3 = { data: p2 && p2 !== "text" && p2 !== "json" ? h.response : h.responseText, status: h.status, statusText: h.statusText, headers: e3, config: a, request: h };
          t(c, l, r3), h = null;
        }
      }
      if (h.open(a.method.toUpperCase(), n(v, a.params, a.paramsSerializer), !0), h.timeout = a.timeout, "onloadend" in h ? h.onloadend = g : h.onreadystatechange = function() {
        h && h.readyState === 4 && (h.status !== 0 || h.responseURL && h.responseURL.indexOf("file:") === 0) && setTimeout(g);
      }, h.onabort = function() {
        h && (l(s("Request aborted", a, "ECONNABORTED", h)), h = null);
      }, h.onerror = function() {
        l(s("Network Error", a, null, h)), h = null;
      }, h.ontimeout = function() {
        var e3 = "timeout of " + a.timeout + "ms exceeded";
        a.timeoutErrorMessage && (e3 = a.timeoutErrorMessage), l(s(e3, a, a.transitional && a.transitional.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED", h)), h = null;
      }, e2.isStandardBrowserEnv()) {
        var E = (a.withCredentials || u(v)) && a.xsrfCookieName ? r2.read(a.xsrfCookieName) : void 0;
        E && (d[a.xsrfHeaderName] = E);
      }
      "setRequestHeader" in h && e2.forEach(d, function(e3, t2) {
        f === void 0 && t2.toLowerCase() === "content-type" ? delete d[t2] : h.setRequestHeader(t2, e3);
      }), e2.isUndefined(a.withCredentials) || (h.withCredentials = !!a.withCredentials), p2 && p2 !== "json" && (h.responseType = a.responseType), typeof a.onDownloadProgress == "function" && h.addEventListener("progress", a.onDownloadProgress), typeof a.onUploadProgress == "function" && h.upload && h.upload.addEventListener("progress", a.onUploadProgress), a.cancelToken && a.cancelToken.promise.then(function(e3) {
        h && (h.abort(), l(e3), h = null);
      }), f || (f = null), h.send(f);
    });
  }, xhr;
}
var utils$5 = utils$9, normalizeHeaderName = normalizeHeaderName$1, enhanceError = enhanceError$1, DEFAULT_CONTENT_TYPE = { "Content-Type": "application/x-www-form-urlencoded" };
function setContentTypeIfUnset(e2, t) {
  !utils$5.isUndefined(e2) && utils$5.isUndefined(e2["Content-Type"]) && (e2["Content-Type"] = t);
}
function getDefaultAdapter() {
  var e2;
  return (typeof XMLHttpRequest < "u" || typeof process < "u" && Object.prototype.toString.call(process) === "[object process]") && (e2 = requireXhr()), e2;
}
function stringifySafely(e2, t, r2) {
  if (utils$5.isString(e2))
    try {
      return (t || JSON.parse)(e2), utils$5.trim(e2);
    } catch (e3) {
      if (e3.name !== "SyntaxError")
        throw e3;
    }
  return (r2 || JSON.stringify)(e2);
}
var defaults$3 = { transitional: { silentJSONParsing: !0, forcedJSONParsing: !0, clarifyTimeoutError: !1 }, adapter: getDefaultAdapter(), transformRequest: [function(e2, t) {
  return normalizeHeaderName(t, "Accept"), normalizeHeaderName(t, "Content-Type"), utils$5.isFormData(e2) || utils$5.isArrayBuffer(e2) || utils$5.isBuffer(e2) || utils$5.isStream(e2) || utils$5.isFile(e2) || utils$5.isBlob(e2) ? e2 : utils$5.isArrayBufferView(e2) ? e2.buffer : utils$5.isURLSearchParams(e2) ? (setContentTypeIfUnset(t, "application/x-www-form-urlencoded;charset=utf-8"), e2.toString()) : utils$5.isObject(e2) || t && t["Content-Type"] === "application/json" ? (setContentTypeIfUnset(t, "application/json"), stringifySafely(e2)) : e2;
}], transformResponse: [function(e2) {
  var t = this.transitional, r2 = t && t.silentJSONParsing, n = t && t.forcedJSONParsing, i = !r2 && this.responseType === "json";
  if (i || n && utils$5.isString(e2) && e2.length)
    try {
      return JSON.parse(e2);
    } catch (e3) {
      if (i)
        throw e3.name === "SyntaxError" ? enhanceError(e3, this, "E_JSON_PARSE") : e3;
    }
  return e2;
}], timeout: 0, xsrfCookieName: "XSRF-TOKEN", xsrfHeaderName: "X-XSRF-TOKEN", maxContentLength: -1, maxBodyLength: -1, validateStatus: function(e2) {
  return e2 >= 200 && e2 < 300;
}, headers: { common: { Accept: "application/json, text/plain, */*" } } };
utils$5.forEach(["delete", "get", "head"], function(e2) {
  defaults$3.headers[e2] = {};
}), utils$5.forEach(["post", "put", "patch"], function(e2) {
  defaults$3.headers[e2] = utils$5.merge(DEFAULT_CONTENT_TYPE);
});
var defaults_1 = defaults$3, utils$4 = utils$9, defaults$2 = defaults_1, transformData$1 = function(e2, t, r2) {
  var n = this || defaults$2;
  return utils$4.forEach(r2, function(r3) {
    e2 = r3.call(n, e2, t);
  }), e2;
}, isCancel$1, hasRequiredIsCancel;
function requireIsCancel() {
  return hasRequiredIsCancel ? isCancel$1 : (hasRequiredIsCancel = 1, isCancel$1 = function(e2) {
    return !(!e2 || !e2.__CANCEL__);
  });
}
var utils$3 = utils$9, transformData = transformData$1, isCancel = requireIsCancel(), defaults$1 = defaults_1;
function throwIfCancellationRequested(e2) {
  e2.cancelToken && e2.cancelToken.throwIfRequested();
}
var dispatchRequest$1 = function(e2) {
  return throwIfCancellationRequested(e2), e2.headers = e2.headers || {}, e2.data = transformData.call(e2, e2.data, e2.headers, e2.transformRequest), e2.headers = utils$3.merge(e2.headers.common || {}, e2.headers[e2.method] || {}, e2.headers), utils$3.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function(t) {
    delete e2.headers[t];
  }), (e2.adapter || defaults$1.adapter)(e2).then(function(t) {
    return throwIfCancellationRequested(e2), t.data = transformData.call(e2, t.data, t.headers, e2.transformResponse), t;
  }, function(t) {
    return isCancel(t) || (throwIfCancellationRequested(e2), t && t.response && (t.response.data = transformData.call(e2, t.response.data, t.response.headers, e2.transformResponse))), Promise.reject(t);
  });
}, utils$2 = utils$9, mergeConfig$2 = function(e2, t) {
  t = t || {};
  var r2 = {}, n = ["url", "method", "data"], i = ["headers", "auth", "proxy", "params"], o = ["baseURL", "transformRequest", "transformResponse", "paramsSerializer", "timeout", "timeoutMessage", "withCredentials", "adapter", "responseType", "xsrfCookieName", "xsrfHeaderName", "onUploadProgress", "onDownloadProgress", "decompress", "maxContentLength", "maxBodyLength", "maxRedirects", "transport", "httpAgent", "httpsAgent", "cancelToken", "socketPath", "responseEncoding"], u = ["validateStatus"];
  function s(e3, t2) {
    return utils$2.isPlainObject(e3) && utils$2.isPlainObject(t2) ? utils$2.merge(e3, t2) : utils$2.isPlainObject(t2) ? utils$2.merge({}, t2) : utils$2.isArray(t2) ? t2.slice() : t2;
  }
  function a(n2) {
    utils$2.isUndefined(t[n2]) ? utils$2.isUndefined(e2[n2]) || (r2[n2] = s(void 0, e2[n2])) : r2[n2] = s(e2[n2], t[n2]);
  }
  utils$2.forEach(n, function(e3) {
    utils$2.isUndefined(t[e3]) || (r2[e3] = s(void 0, t[e3]));
  }), utils$2.forEach(i, a), utils$2.forEach(o, function(n2) {
    utils$2.isUndefined(t[n2]) ? utils$2.isUndefined(e2[n2]) || (r2[n2] = s(void 0, e2[n2])) : r2[n2] = s(void 0, t[n2]);
  }), utils$2.forEach(u, function(n2) {
    n2 in t ? r2[n2] = s(e2[n2], t[n2]) : n2 in e2 && (r2[n2] = s(void 0, e2[n2]));
  });
  var c = n.concat(i).concat(o).concat(u), l = Object.keys(e2).concat(Object.keys(t)).filter(function(e3) {
    return c.indexOf(e3) === -1;
  });
  return utils$2.forEach(l, a), r2;
}, name = "axios", version = "0.21.4", description = "Promise based HTTP client for the browser and node.js", main = "index.js", scripts = { test: "grunt test", start: "node ./sandbox/server.js", build: "NODE_ENV=production grunt build", preversion: "npm test", version: "npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json", postversion: "git push && git push --tags", examples: "node ./examples/server.js", coveralls: "cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js", fix: "eslint --fix lib/**/*.js" }, repository = { type: "git", url: "https://github.com/axios/axios.git" }, keywords = ["xhr", "http", "ajax", "promise", "node"], author = "Matt Zabriskie", license = "MIT", bugs = { url: "https://github.com/axios/axios/issues" }, homepage = "https://axios-http.com", devDependencies = { coveralls: "^3.0.0", "es6-promise": "^4.2.4", grunt: "^1.3.0", "grunt-banner": "^0.6.0", "grunt-cli": "^1.2.0", "grunt-contrib-clean": "^1.1.0", "grunt-contrib-watch": "^1.0.0", "grunt-eslint": "^23.0.0", "grunt-karma": "^4.0.0", "grunt-mocha-test": "^0.13.3", "grunt-ts": "^6.0.0-beta.19", "grunt-webpack": "^4.0.2", "istanbul-instrumenter-loader": "^1.0.0", "jasmine-core": "^2.4.1", karma: "^6.3.2", "karma-chrome-launcher": "^3.1.0", "karma-firefox-launcher": "^2.1.0", "karma-jasmine": "^1.1.1", "karma-jasmine-ajax": "^0.1.13", "karma-safari-launcher": "^1.0.0", "karma-sauce-launcher": "^4.3.6", "karma-sinon": "^1.0.5", "karma-sourcemap-loader": "^0.3.8", "karma-webpack": "^4.0.2", "load-grunt-tasks": "^3.5.2", minimist: "^1.2.0", mocha: "^8.2.1", sinon: "^4.5.0", "terser-webpack-plugin": "^4.2.3", typescript: "^4.0.5", "url-search-params": "^0.10.0", webpack: "^4.44.2", "webpack-dev-server": "^3.11.0" }, browser = { "./lib/adapters/http.js": "./lib/adapters/xhr.js" }, jsdelivr = "dist/axios.min.js", unpkg = "dist/axios.min.js", typings = "./index.d.ts", dependencies = { "follow-redirects": "^1.14.0" }, bundlesize = [{ path: "./dist/axios.min.js", threshold: "5kB" }], require$$0 = { name, version, description, main, scripts, repository, keywords, author, license, bugs, homepage, devDependencies, browser, jsdelivr, unpkg, typings, dependencies, bundlesize }, pkg = require$$0, validators$1 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(function(e2, t) {
  validators$1[e2] = function(r2) {
    return typeof r2 === e2 || "a" + (t < 1 ? "n " : " ") + e2;
  };
});
var deprecatedWarnings = {}, currentVerArr = pkg.version.split(".");
function isOlderVersion(e2, t) {
  for (var r2 = t ? t.split(".") : currentVerArr, n = e2.split("."), i = 0; i < 3; i++) {
    if (r2[i] > n[i])
      return !0;
    if (r2[i] < n[i])
      return !1;
  }
  return !1;
}
function assertOptions(e2, t, r2) {
  if (typeof e2 != "object")
    throw new TypeError("options must be an object");
  for (var n = Object.keys(e2), i = n.length; i-- > 0; ) {
    var o = n[i], u = t[o];
    if (u) {
      var s = e2[o], a = s === void 0 || u(s, o, e2);
      if (a !== !0)
        throw new TypeError("option " + o + " must be " + a);
    } else if (r2 !== !0)
      throw Error("Unknown option " + o);
  }
}
validators$1.transitional = function(e2, t, r2) {
  var n = t && isOlderVersion(t);
  function i(e3, t2) {
    return "[Axios v" + pkg.version + "] Transitional option '" + e3 + "'" + t2 + (r2 ? ". " + r2 : "");
  }
  return function(r3, o, u) {
    if (e2 === !1)
      throw new Error(i(o, " has been removed in " + t));
    return n && !deprecatedWarnings[o] && (deprecatedWarnings[o] = !0, console.warn(i(o, " has been deprecated since v" + t + " and will be removed in the near future"))), !e2 || e2(r3, o, u);
  };
};
var validator$1 = { isOlderVersion, assertOptions, validators: validators$1 }, utils$1 = utils$9, buildURL = buildURL$1, InterceptorManager = InterceptorManager_1, dispatchRequest = dispatchRequest$1, mergeConfig$1 = mergeConfig$2, validator = validator$1, validators = validator.validators;
function Axios$1(e2) {
  this.defaults = e2, this.interceptors = { request: new InterceptorManager(), response: new InterceptorManager() };
}
Axios$1.prototype.request = function(e2) {
  typeof e2 == "string" ? (e2 = arguments[1] || {}).url = arguments[0] : e2 = e2 || {}, (e2 = mergeConfig$1(this.defaults, e2)).method ? e2.method = e2.method.toLowerCase() : this.defaults.method ? e2.method = this.defaults.method.toLowerCase() : e2.method = "get";
  var t = e2.transitional;
  t !== void 0 && validator.assertOptions(t, { silentJSONParsing: validators.transitional(validators.boolean, "1.0.0"), forcedJSONParsing: validators.transitional(validators.boolean, "1.0.0"), clarifyTimeoutError: validators.transitional(validators.boolean, "1.0.0") }, !1);
  var r2 = [], n = !0;
  this.interceptors.request.forEach(function(t2) {
    typeof t2.runWhen == "function" && t2.runWhen(e2) === !1 || (n = n && t2.synchronous, r2.unshift(t2.fulfilled, t2.rejected));
  });
  var i, o = [];
  if (this.interceptors.response.forEach(function(e3) {
    o.push(e3.fulfilled, e3.rejected);
  }), !n) {
    var u = [dispatchRequest, void 0];
    for (Array.prototype.unshift.apply(u, r2), u = u.concat(o), i = Promise.resolve(e2); u.length; )
      i = i.then(u.shift(), u.shift());
    return i;
  }
  for (var s = e2; r2.length; ) {
    var a = r2.shift(), c = r2.shift();
    try {
      s = a(s);
    } catch (e3) {
      c(e3);
      break;
    }
  }
  try {
    i = dispatchRequest(s);
  } catch (e3) {
    return Promise.reject(e3);
  }
  for (; o.length; )
    i = i.then(o.shift(), o.shift());
  return i;
}, Axios$1.prototype.getUri = function(e2) {
  return e2 = mergeConfig$1(this.defaults, e2), buildURL(e2.url, e2.params, e2.paramsSerializer).replace(/^\?/, "");
}, utils$1.forEach(["delete", "get", "head", "options"], function(e2) {
  Axios$1.prototype[e2] = function(t, r2) {
    return this.request(mergeConfig$1(r2 || {}, { method: e2, url: t, data: (r2 || {}).data }));
  };
}), utils$1.forEach(["post", "put", "patch"], function(e2) {
  Axios$1.prototype[e2] = function(t, r2, n) {
    return this.request(mergeConfig$1(n || {}, { method: e2, url: t, data: r2 }));
  };
});
var Axios_1 = Axios$1, Cancel_1, hasRequiredCancel, CancelToken_1, hasRequiredCancelToken, spread, hasRequiredSpread, isAxiosError, hasRequiredIsAxiosError;
function requireCancel() {
  if (hasRequiredCancel)
    return Cancel_1;
  function e2(e3) {
    this.message = e3;
  }
  return hasRequiredCancel = 1, e2.prototype.toString = function() {
    return "Cancel" + (this.message ? ": " + this.message : "");
  }, e2.prototype.__CANCEL__ = !0, Cancel_1 = e2;
}
function requireCancelToken() {
  if (hasRequiredCancelToken)
    return CancelToken_1;
  hasRequiredCancelToken = 1;
  var e2 = requireCancel();
  function t(t2) {
    if (typeof t2 != "function")
      throw new TypeError("executor must be a function.");
    var r2;
    this.promise = new Promise(function(e3) {
      r2 = e3;
    });
    var n = this;
    t2(function(t3) {
      n.reason || (n.reason = new e2(t3), r2(n.reason));
    });
  }
  return t.prototype.throwIfRequested = function() {
    if (this.reason)
      throw this.reason;
  }, t.source = function() {
    var e3;
    return { token: new t(function(t2) {
      e3 = t2;
    }), cancel: e3 };
  }, CancelToken_1 = t;
}
function requireSpread() {
  return hasRequiredSpread ? spread : (hasRequiredSpread = 1, spread = function(e2) {
    return function(t) {
      return e2.apply(null, t);
    };
  });
}
function requireIsAxiosError() {
  return hasRequiredIsAxiosError ? isAxiosError : (hasRequiredIsAxiosError = 1, isAxiosError = function(e2) {
    return typeof e2 == "object" && e2.isAxiosError === !0;
  });
}
var utils = utils$9, bind = bind$2, Axios = Axios_1, mergeConfig = mergeConfig$2, defaults = defaults_1;
function createInstance(e2) {
  var t = new Axios(e2), r2 = bind(Axios.prototype.request, t);
  return utils.extend(r2, Axios.prototype, t), utils.extend(r2, t), r2;
}
var axios$1 = createInstance(defaults);
axios$1.Axios = Axios, axios$1.create = function(e2) {
  return createInstance(mergeConfig(axios$1.defaults, e2));
}, axios$1.Cancel = requireCancel(), axios$1.CancelToken = requireCancelToken(), axios$1.isCancel = requireIsCancel(), axios$1.all = function(e2) {
  return Promise.all(e2);
}, axios$1.spread = requireSpread(), axios$1.isAxiosError = requireIsAxiosError(), axios$2.exports = axios$1, axios$2.exports.default = axios$1, axios$3.exports = axios$2.exports;
var axios = getDefaultExportFromCjs(axios$3.exports);
const loadedScripts = {};
class Http {
  constructor(e2) {
    this.axios = axios.create(e2);
  }
  setCdn(e2) {
    e2 && XMLHttpRequest && !XMLHttpRequest.prototype.cdnUrl && (XMLHttpRequest.prototype.cdnUrl = e2, XMLHttpRequest.prototype.baseOpen = XMLHttpRequest.prototype.open, XMLHttpRequest.prototype.open = function() {
      const t = arguments[1];
      return t.startsWith("/infra/public") && (arguments[1] = e2 + t), /^\/([^\/]*)\/public/.test(t) && (arguments[1] = e2 + t), t.startsWith("/assets") && (arguments[1] = e2 + t), t == "/conf/public" && (arguments[1] = t), t.startsWith("http") && (arguments[1] = t), this.baseOpen.apply(this, arguments);
    });
  }
  toAxiosConfig(e2) {
    if (e2) {
      const t = Object.assign({}, this.axios.defaults);
      return e2.headers && (t.headers = Object.assign({}, this.axios.defaults.headers), Object.assign(t.headers, e2.headers)), e2.queryParams && (t.params = Object.assign({}, e2.queryParams)), t;
    }
    return this.axios.defaults;
  }
  toCdnUrl(e2) {
    const t = ConfigurationFrameworkFactory.instance().Platform.cdnDomain;
    if ((t == null ? void 0 : t.length) > 0 && e2 !== "/conf/public") {
      const r2 = "" + e2;
      (r2.startsWith("/infra/public") || r2.startsWith("/assets") || /^\/([^\/]*)\/public/.test(r2)) && (e2 = t + r2);
    }
    return e2;
  }
  mapAxiosError(e2, t) {
    return e2.response ? this._latestResponse = e2.response : e2.request ? this._latestResponse = { status: 408, statusText: ERROR_CODE.TIME_OUT } : this._latestResponse = { status: 500, statusText: ERROR_CODE.UNKNOWN }, !t || t.disableNotifications, this._latestResponse;
  }
  mapAxiosResponse(e2, t) {
    return this._latestResponse = e2, e2.data;
  }
  get latestResponse() {
    return this._latestResponse;
  }
  get(e2, t) {
    return this.axios.get(this.toCdnUrl(e2), this.toAxiosConfig(t)).then((e3) => this.mapAxiosResponse(e3, t)).catch((e3) => this.mapAxiosError(e3, t));
  }
  post(e2, t, r2) {
    return this.axios.post(e2, t, this.toAxiosConfig(r2)).then((e3) => this.mapAxiosResponse(e3, r2)).catch((e3) => this.mapAxiosError(e3, r2));
  }
  postFile(e2, t, r2) {
    const n = this.toAxiosConfig(r2);
    return n.headers["Content-Type"] && delete n.headers["Content-Type"], this.axios.post(e2, t, n).then((e3) => this.mapAxiosResponse(e3, r2)).catch((e3) => this.mapAxiosError(e3, r2));
  }
  postJson(e2, t, r2) {
    return this.toAxiosConfig().headers["Content-Type"] = "application/json", this.axios.post(e2, t, this.toAxiosConfig(r2)).then((e3) => this.mapAxiosResponse(e3, r2)).catch((e3) => this.mapAxiosError(e3, r2));
  }
  put(e2, t, r2) {
    return this.axios.put(e2, t, this.toAxiosConfig(r2)).then((e3) => this.mapAxiosResponse(e3, r2)).catch((e3) => this.mapAxiosError(e3, r2));
  }
  putJson(e2, t, r2) {
    const n = this.toAxiosConfig(r2);
    return n.headers["Content-Type"] = "application/json", this.axios.put(e2, t, n).then((e3) => this.mapAxiosResponse(e3, r2)).catch((e3) => this.mapAxiosError(e3, r2));
  }
  delete(e2, t) {
    return this.axios.delete(e2, this.toAxiosConfig(t)).then((e3) => this.mapAxiosResponse(e3, t)).catch((e3) => this.mapAxiosError(e3, t));
  }
  deleteJson(e2, t) {
    return this.axios.delete(e2, t).then((e3) => this.mapAxiosResponse(e3)).catch((e3) => this.mapAxiosError(e3));
  }
  getScript(url, params, variableName) {
    const resultName = variableName != null ? variableName : "exports", p = this.toAxiosConfig(params);
    return p.headers.Accept = "application/javascript", this.axios.get(this.toCdnUrl(url), p).then((e2) => this.mapAxiosResponse(e2, params)).then((r) => {
      try {
        const e2 = `"use strict";var ${resultName.split(".")[0]}={};${r};return ${resultName};`;
        return Function(e2)();
      } catch (e) {
        const result = eval(r);
        return result;
      }
    }).catch((e2) => {
      throw this.mapAxiosError(e2, params), e2;
    });
  }
  loadScript(e2, t) {
    return loadedScripts[e2] ? Promise.resolve() : this.getScript(e2, t).then((t2) => {
      loadedScripts[e2] = !0;
    });
  }
}
class AgentLoader {
  constructor() {
    this.http = new Http();
  }
  load(e2) {
    let t = appNameForResource[e2];
    if (typeof t != "string")
      throw new Error(`The resource type ${e2} is not supported yet.`);
    return this.http.loadScript(`${t}/public/js/explorer.agent.js`);
  }
}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var extendStatics = function(e2, t) {
  return extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e3, t2) {
    e3.__proto__ = t2;
  } || function(e3, t2) {
    for (var r2 in t2)
      Object.prototype.hasOwnProperty.call(t2, r2) && (e3[r2] = t2[r2]);
  }, extendStatics(e2, t);
};
function __extends(e2, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  function r2() {
    this.constructor = e2;
  }
  extendStatics(e2, t), e2.prototype = t === null ? Object.create(t) : (r2.prototype = t.prototype, new r2());
}
function __awaiter(e2, t, r2, n) {
  return new (r2 || (r2 = Promise))(function(i, o) {
    function u(e3) {
      try {
        a(n.next(e3));
      } catch (e4) {
        o(e4);
      }
    }
    function s(e3) {
      try {
        a(n.throw(e3));
      } catch (e4) {
        o(e4);
      }
    }
    function a(e3) {
      var t2;
      e3.done ? i(e3.value) : (t2 = e3.value, t2 instanceof r2 ? t2 : new r2(function(e4) {
        e4(t2);
      })).then(u, s);
    }
    a((n = n.apply(e2, t || [])).next());
  });
}
function __generator(e2, t) {
  var r2, n, i, o, u = { label: 0, sent: function() {
    if (1 & i[0])
      throw i[1];
    return i[1];
  }, trys: [], ops: [] };
  return o = { next: s(0), throw: s(1), return: s(2) }, typeof Symbol == "function" && (o[Symbol.iterator] = function() {
    return this;
  }), o;
  function s(o2) {
    return function(s2) {
      return function(o3) {
        if (r2)
          throw new TypeError("Generator is already executing.");
        for (; u; )
          try {
            if (r2 = 1, n && (i = 2 & o3[0] ? n.return : o3[0] ? n.throw || ((i = n.return) && i.call(n), 0) : n.next) && !(i = i.call(n, o3[1])).done)
              return i;
            switch (n = 0, i && (o3 = [2 & o3[0], i.value]), o3[0]) {
              case 0:
              case 1:
                i = o3;
                break;
              case 4:
                return u.label++, { value: o3[1], done: !1 };
              case 5:
                u.label++, n = o3[1], o3 = [0];
                continue;
              case 7:
                o3 = u.ops.pop(), u.trys.pop();
                continue;
              default:
                if (i = u.trys, !((i = i.length > 0 && i[i.length - 1]) || o3[0] !== 6 && o3[0] !== 2)) {
                  u = 0;
                  continue;
                }
                if (o3[0] === 3 && (!i || o3[1] > i[0] && o3[1] < i[3])) {
                  u.label = o3[1];
                  break;
                }
                if (o3[0] === 6 && u.label < i[1]) {
                  u.label = i[1], i = o3;
                  break;
                }
                if (i && u.label < i[2]) {
                  u.label = i[2], u.ops.push(o3);
                  break;
                }
                i[2] && u.ops.pop(), u.trys.pop();
                continue;
            }
            o3 = t.call(e2, u);
          } catch (e3) {
            o3 = [6, e3], n = 0;
          } finally {
            r2 = i = 0;
          }
        if (5 & o3[0])
          throw o3[1];
        return { value: o3[0] ? o3[1] : void 0, done: !0 };
      }([o2, s2]);
    };
  }
}
function __values(e2) {
  var t = typeof Symbol == "function" && Symbol.iterator, r2 = t && e2[t], n = 0;
  if (r2)
    return r2.call(e2);
  if (e2 && typeof e2.length == "number")
    return { next: function() {
      return e2 && n >= e2.length && (e2 = void 0), { value: e2 && e2[n++], done: !e2 };
    } };
  throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(e2, t) {
  var r2 = typeof Symbol == "function" && e2[Symbol.iterator];
  if (!r2)
    return e2;
  var n, i, o = r2.call(e2), u = [];
  try {
    for (; (t === void 0 || t-- > 0) && !(n = o.next()).done; )
      u.push(n.value);
  } catch (e3) {
    i = { error: e3 };
  } finally {
    try {
      n && !n.done && (r2 = o.return) && r2.call(o);
    } finally {
      if (i)
        throw i.error;
    }
  }
  return u;
}
function __spreadArray(e2, t) {
  for (var r2 = 0, n = t.length, i = e2.length; r2 < n; r2++, i++)
    e2[i] = t[r2];
  return e2;
}
function __await(e2) {
  return this instanceof __await ? (this.v = e2, this) : new __await(e2);
}
function __asyncGenerator(e2, t, r2) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var n, i = r2.apply(e2, t || []), o = [];
  return n = {}, u("next"), u("throw"), u("return"), n[Symbol.asyncIterator] = function() {
    return this;
  }, n;
  function u(e3) {
    i[e3] && (n[e3] = function(t2) {
      return new Promise(function(r3, n2) {
        o.push([e3, t2, r3, n2]) > 1 || s(e3, t2);
      });
    });
  }
  function s(e3, t2) {
    try {
      (r3 = i[e3](t2)).value instanceof __await ? Promise.resolve(r3.value.v).then(a, c) : l(o[0][2], r3);
    } catch (e4) {
      l(o[0][3], e4);
    }
    var r3;
  }
  function a(e3) {
    s("next", e3);
  }
  function c(e3) {
    s("throw", e3);
  }
  function l(e3, t2) {
    e3(t2), o.shift(), o.length && s(o[0][0], o[0][1]);
  }
}
function __asyncValues(e2) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var t, r2 = e2[Symbol.asyncIterator];
  return r2 ? r2.call(e2) : (e2 = typeof __values == "function" ? __values(e2) : e2[Symbol.iterator](), t = {}, n("next"), n("throw"), n("return"), t[Symbol.asyncIterator] = function() {
    return this;
  }, t);
  function n(r3) {
    t[r3] = e2[r3] && function(t2) {
      return new Promise(function(n2, i) {
        (function(e3, t3, r4, n3) {
          Promise.resolve(n3).then(function(t4) {
            e3({ value: t4, done: r4 });
          }, t3);
        })(n2, i, (t2 = e2[r3](t2)).done, t2.value);
      });
    };
  }
}
function isFunction(e2) {
  return typeof e2 == "function";
}
function createErrorClass(e2) {
  var t = e2(function(e3) {
    Error.call(e3), e3.stack = new Error().stack;
  });
  return t.prototype = Object.create(Error.prototype), t.prototype.constructor = t, t;
}
var UnsubscriptionError = createErrorClass(function(e2) {
  return function(t) {
    e2(this), this.message = t ? t.length + ` errors occurred during unsubscription:
` + t.map(function(e3, t2) {
      return t2 + 1 + ") " + e3.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = t;
  };
});
function arrRemove(e2, t) {
  if (e2) {
    var r2 = e2.indexOf(t);
    0 <= r2 && e2.splice(r2, 1);
  }
}
var Subscription = function() {
  function e2(e3) {
    this.initialTeardown = e3, this.closed = !1, this._parentage = null, this._teardowns = null;
  }
  return e2.prototype.unsubscribe = function() {
    var e3, t, r2, n, i;
    if (!this.closed) {
      this.closed = !0;
      var o = this._parentage;
      if (o)
        if (this._parentage = null, Array.isArray(o))
          try {
            for (var u = __values(o), s = u.next(); !s.done; s = u.next())
              s.value.remove(this);
          } catch (t2) {
            e3 = { error: t2 };
          } finally {
            try {
              s && !s.done && (t = u.return) && t.call(u);
            } finally {
              if (e3)
                throw e3.error;
            }
          }
        else
          o.remove(this);
      var a = this.initialTeardown;
      if (isFunction(a))
        try {
          a();
        } catch (e4) {
          i = e4 instanceof UnsubscriptionError ? e4.errors : [e4];
        }
      var c = this._teardowns;
      if (c) {
        this._teardowns = null;
        try {
          for (var l = __values(c), f = l.next(); !f.done; f = l.next()) {
            var d = f.value;
            try {
              execTeardown(d);
            } catch (e4) {
              i = i != null ? i : [], e4 instanceof UnsubscriptionError ? i = __spreadArray(__spreadArray([], __read(i)), __read(e4.errors)) : i.push(e4);
            }
          }
        } catch (e4) {
          r2 = { error: e4 };
        } finally {
          try {
            f && !f.done && (n = l.return) && n.call(l);
          } finally {
            if (r2)
              throw r2.error;
          }
        }
      }
      if (i)
        throw new UnsubscriptionError(i);
    }
  }, e2.prototype.add = function(t) {
    var r2;
    if (t && t !== this)
      if (this.closed)
        execTeardown(t);
      else {
        if (t instanceof e2) {
          if (t.closed || t._hasParent(this))
            return;
          t._addParent(this);
        }
        (this._teardowns = (r2 = this._teardowns) !== null && r2 !== void 0 ? r2 : []).push(t);
      }
  }, e2.prototype._hasParent = function(e3) {
    var t = this._parentage;
    return t === e3 || Array.isArray(t) && t.includes(e3);
  }, e2.prototype._addParent = function(e3) {
    var t = this._parentage;
    this._parentage = Array.isArray(t) ? (t.push(e3), t) : t ? [t, e3] : e3;
  }, e2.prototype._removeParent = function(e3) {
    var t = this._parentage;
    t === e3 ? this._parentage = null : Array.isArray(t) && arrRemove(t, e3);
  }, e2.prototype.remove = function(t) {
    var r2 = this._teardowns;
    r2 && arrRemove(r2, t), t instanceof e2 && t._removeParent(this);
  }, e2.EMPTY = function() {
    var t = new e2();
    return t.closed = !0, t;
  }(), e2;
}(), EMPTY_SUBSCRIPTION = Subscription.EMPTY;
function isSubscription(e2) {
  return e2 instanceof Subscription || e2 && "closed" in e2 && isFunction(e2.remove) && isFunction(e2.add) && isFunction(e2.unsubscribe);
}
function execTeardown(e2) {
  isFunction(e2) ? e2() : e2.unsubscribe();
}
var config = { onUnhandledError: null, onStoppedNotification: null, Promise: void 0, useDeprecatedSynchronousErrorHandling: !1, useDeprecatedNextContext: !1 }, timeoutProvider = { setTimeout: function() {
  for (var e2 = [], t = 0; t < arguments.length; t++)
    e2[t] = arguments[t];
  var r2 = timeoutProvider.delegate;
  return ((r2 == null ? void 0 : r2.setTimeout) || setTimeout).apply(void 0, __spreadArray([], __read(e2)));
}, clearTimeout: function(e2) {
  return clearTimeout(e2);
}, delegate: void 0 };
function reportUnhandledError(e2) {
  timeoutProvider.setTimeout(function() {
    var t = config.onUnhandledError;
    if (!t)
      throw e2;
    t(e2);
  });
}
function noop() {
}
var COMPLETE_NOTIFICATION = createNotification("C", void 0, void 0);
function errorNotification(e2) {
  return createNotification("E", void 0, e2);
}
function nextNotification(e2) {
  return createNotification("N", e2, void 0);
}
function createNotification(e2, t, r2) {
  return { kind: e2, value: t, error: r2 };
}
var context = null;
function errorContext(e2) {
  if (config.useDeprecatedSynchronousErrorHandling) {
    var t = !context;
    if (t && (context = { errorThrown: !1, error: null }), e2(), t) {
      var r2 = context, n = r2.errorThrown, i = r2.error;
      if (context = null, n)
        throw i;
    }
  } else
    e2();
}
function captureError(e2) {
  config.useDeprecatedSynchronousErrorHandling && context && (context.errorThrown = !0, context.error = e2);
}
var Subscriber = function(e2) {
  function t(t2) {
    var r2 = e2.call(this) || this;
    return r2.isStopped = !1, t2 ? (r2.destination = t2, isSubscription(t2) && t2.add(r2)) : r2.destination = EMPTY_OBSERVER, r2;
  }
  return __extends(t, e2), t.create = function(e3, t2, r2) {
    return new SafeSubscriber(e3, t2, r2);
  }, t.prototype.next = function(e3) {
    this.isStopped ? handleStoppedNotification(nextNotification(e3), this) : this._next(e3);
  }, t.prototype.error = function(e3) {
    this.isStopped ? handleStoppedNotification(errorNotification(e3), this) : (this.isStopped = !0, this._error(e3));
  }, t.prototype.complete = function() {
    this.isStopped ? handleStoppedNotification(COMPLETE_NOTIFICATION, this) : (this.isStopped = !0, this._complete());
  }, t.prototype.unsubscribe = function() {
    this.closed || (this.isStopped = !0, e2.prototype.unsubscribe.call(this), this.destination = null);
  }, t.prototype._next = function(e3) {
    this.destination.next(e3);
  }, t.prototype._error = function(e3) {
    try {
      this.destination.error(e3);
    } finally {
      this.unsubscribe();
    }
  }, t.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  }, t;
}(Subscription), SafeSubscriber = function(e2) {
  function t(t2, r2, n) {
    var i, o = e2.call(this) || this;
    if (isFunction(t2))
      i = t2;
    else if (t2) {
      var u;
      i = t2.next, r2 = t2.error, n = t2.complete, o && config.useDeprecatedNextContext ? (u = Object.create(t2)).unsubscribe = function() {
        return o.unsubscribe();
      } : u = t2, i = i == null ? void 0 : i.bind(u), r2 = r2 == null ? void 0 : r2.bind(u), n = n == null ? void 0 : n.bind(u);
    }
    return o.destination = { next: i ? wrapForErrorHandling(i) : noop, error: wrapForErrorHandling(r2 != null ? r2 : defaultErrorHandler), complete: n ? wrapForErrorHandling(n) : noop }, o;
  }
  return __extends(t, e2), t;
}(Subscriber);
function wrapForErrorHandling(e2, t) {
  return function() {
    for (var t2 = [], r2 = 0; r2 < arguments.length; r2++)
      t2[r2] = arguments[r2];
    try {
      e2.apply(void 0, __spreadArray([], __read(t2)));
    } catch (e3) {
      config.useDeprecatedSynchronousErrorHandling ? captureError(e3) : reportUnhandledError(e3);
    }
  };
}
function defaultErrorHandler(e2) {
  throw e2;
}
function handleStoppedNotification(e2, t) {
  var r2 = config.onStoppedNotification;
  r2 && timeoutProvider.setTimeout(function() {
    return r2(e2, t);
  });
}
var EMPTY_OBSERVER = { closed: !0, next: noop, error: defaultErrorHandler, complete: noop }, observable = typeof Symbol == "function" && Symbol.observable || "@@observable";
function identity(e2) {
  return e2;
}
function pipe() {
  for (var e2 = [], t = 0; t < arguments.length; t++)
    e2[t] = arguments[t];
  return pipeFromArray(e2);
}
function pipeFromArray(e2) {
  return e2.length === 0 ? identity : e2.length === 1 ? e2[0] : function(t) {
    return e2.reduce(function(e3, t2) {
      return t2(e3);
    }, t);
  };
}
var Observable = function() {
  function e2(e3) {
    e3 && (this._subscribe = e3);
  }
  return e2.prototype.lift = function(t) {
    var r2 = new e2();
    return r2.source = this, r2.operator = t, r2;
  }, e2.prototype.subscribe = function(e3, t, r2) {
    var n = this, i = isSubscriber(e3) ? e3 : new SafeSubscriber(e3, t, r2);
    return errorContext(function() {
      var e4 = n, t2 = e4.operator, r3 = e4.source;
      i.add(t2 ? t2.call(i, r3) : r3 ? n._subscribe(i) : n._trySubscribe(i));
    }), i;
  }, e2.prototype._trySubscribe = function(e3) {
    try {
      return this._subscribe(e3);
    } catch (t) {
      e3.error(t);
    }
  }, e2.prototype.forEach = function(e3, t) {
    var r2 = this;
    return new (t = getPromiseCtor(t))(function(t2, n) {
      var i;
      i = r2.subscribe(function(t3) {
        try {
          e3(t3);
        } catch (e4) {
          n(e4), i == null || i.unsubscribe();
        }
      }, n, t2);
    });
  }, e2.prototype._subscribe = function(e3) {
    var t;
    return (t = this.source) === null || t === void 0 ? void 0 : t.subscribe(e3);
  }, e2.prototype[observable] = function() {
    return this;
  }, e2.prototype.pipe = function() {
    for (var e3 = [], t = 0; t < arguments.length; t++)
      e3[t] = arguments[t];
    return pipeFromArray(e3)(this);
  }, e2.prototype.toPromise = function(e3) {
    var t = this;
    return new (e3 = getPromiseCtor(e3))(function(e4, r2) {
      var n;
      t.subscribe(function(e5) {
        return n = e5;
      }, function(e5) {
        return r2(e5);
      }, function() {
        return e4(n);
      });
    });
  }, e2.create = function(t) {
    return new e2(t);
  }, e2;
}();
function getPromiseCtor(e2) {
  var t;
  return (t = e2 != null ? e2 : config.Promise) !== null && t !== void 0 ? t : Promise;
}
function isObserver(e2) {
  return e2 && isFunction(e2.next) && isFunction(e2.error) && isFunction(e2.complete);
}
function isSubscriber(e2) {
  return e2 && e2 instanceof Subscriber || isObserver(e2) && isSubscription(e2);
}
function hasLift(e2) {
  return isFunction(e2 == null ? void 0 : e2.lift);
}
function operate(e2) {
  return function(t) {
    if (hasLift(t))
      return t.lift(function(t2) {
        try {
          return e2(t2, this);
        } catch (e3) {
          this.error(e3);
        }
      });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
var OperatorSubscriber = function(e2) {
  function t(t2, r2, n, i, o) {
    var u = e2.call(this, t2) || this;
    return u.onFinalize = o, u._next = r2 ? function(e3) {
      try {
        r2(e3);
      } catch (e4) {
        t2.error(e4);
      }
    } : e2.prototype._next, u._error = i ? function(e3) {
      try {
        i(e3);
      } catch (e4) {
        t2.error(e4);
      } finally {
        this.unsubscribe();
      }
    } : e2.prototype._error, u._complete = n ? function() {
      try {
        n();
      } catch (e3) {
        t2.error(e3);
      } finally {
        this.unsubscribe();
      }
    } : e2.prototype._complete, u;
  }
  return __extends(t, e2), t.prototype.unsubscribe = function() {
    var t2, r2 = this.closed;
    e2.prototype.unsubscribe.call(this), !r2 && ((t2 = this.onFinalize) === null || t2 === void 0 || t2.call(this));
  }, t;
}(Subscriber);
function refCount() {
  return operate(function(e2, t) {
    var r2 = null;
    e2._refCount++;
    var n = new OperatorSubscriber(t, void 0, void 0, void 0, function() {
      if (!e2 || e2._refCount <= 0 || 0 < --e2._refCount)
        r2 = null;
      else {
        var n2 = e2._connection, i = r2;
        r2 = null, !n2 || i && n2 !== i || n2.unsubscribe(), t.unsubscribe();
      }
    });
    e2.subscribe(n), n.closed || (r2 = e2.connect());
  });
}
var ConnectableObservable = function(e2) {
  function t(t2, r2) {
    var n = e2.call(this) || this;
    return n.source = t2, n.subjectFactory = r2, n._subject = null, n._refCount = 0, n._connection = null, hasLift(t2) && (n.lift = t2.lift), n;
  }
  return __extends(t, e2), t.prototype._subscribe = function(e3) {
    return this.getSubject().subscribe(e3);
  }, t.prototype.getSubject = function() {
    var e3 = this._subject;
    return e3 && !e3.isStopped || (this._subject = this.subjectFactory()), this._subject;
  }, t.prototype._teardown = function() {
    this._refCount = 0;
    var e3 = this._connection;
    this._subject = this._connection = null, e3 == null || e3.unsubscribe();
  }, t.prototype.connect = function() {
    var e3 = this, t2 = this._connection;
    if (!t2) {
      t2 = this._connection = new Subscription();
      var r2 = this.getSubject();
      t2.add(this.source.subscribe(new OperatorSubscriber(r2, void 0, function() {
        e3._teardown(), r2.complete();
      }, function(t3) {
        e3._teardown(), r2.error(t3);
      }, function() {
        return e3._teardown();
      }))), t2.closed && (this._connection = null, t2 = Subscription.EMPTY);
    }
    return t2;
  }, t.prototype.refCount = function() {
    return refCount()(this);
  }, t;
}(Observable), performanceTimestampProvider = { now: function() {
  return (performanceTimestampProvider.delegate || performance).now();
}, delegate: void 0 }, animationFrameProvider = { schedule: function(e2) {
  var t = requestAnimationFrame, r2 = cancelAnimationFrame, i = t(function(t2) {
    r2 = void 0, e2(t2);
  });
  return new Subscription(function() {
    return r2 == null ? void 0 : r2(i);
  });
}, requestAnimationFrame: function() {
  for (var e2 = [], t = 0; t < arguments.length; t++)
    e2[t] = arguments[t];
  var r2 = animationFrameProvider.delegate;
  return ((r2 == null ? void 0 : r2.requestAnimationFrame) || requestAnimationFrame).apply(void 0, __spreadArray([], __read(e2)));
}, cancelAnimationFrame: function() {
  for (var e2 = [], t = 0; t < arguments.length; t++)
    e2[t] = arguments[t];
  return cancelAnimationFrame.apply(void 0, __spreadArray([], __read(e2)));
}, delegate: void 0 };
function animationFrames(e2) {
  return e2 ? animationFramesFactory(e2) : DEFAULT_ANIMATION_FRAMES;
}
function animationFramesFactory(e2) {
  var t = animationFrameProvider.schedule;
  return new Observable(function(r2) {
    var n = new Subscription(), i = e2 || performanceTimestampProvider, o = i.now(), u = function(s) {
      var a = i.now();
      r2.next({ timestamp: e2 ? a : s, elapsed: a - o }), r2.closed || n.add(t(u));
    };
    return n.add(t(u)), n;
  });
}
var DEFAULT_ANIMATION_FRAMES = animationFramesFactory(), ObjectUnsubscribedError = createErrorClass(function(e2) {
  return function() {
    e2(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), Subject = function(e2) {
  function t() {
    var t2 = e2.call(this) || this;
    return t2.closed = !1, t2.observers = [], t2.isStopped = !1, t2.hasError = !1, t2.thrownError = null, t2;
  }
  return __extends(t, e2), t.prototype.lift = function(e3) {
    var t2 = new AnonymousSubject(this, this);
    return t2.operator = e3, t2;
  }, t.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new ObjectUnsubscribedError();
  }, t.prototype.next = function(e3) {
    var t2 = this;
    errorContext(function() {
      var r2, n;
      if (t2._throwIfClosed(), !t2.isStopped) {
        var i = t2.observers.slice();
        try {
          for (var o = __values(i), u = o.next(); !u.done; u = o.next())
            u.value.next(e3);
        } catch (e4) {
          r2 = { error: e4 };
        } finally {
          try {
            u && !u.done && (n = o.return) && n.call(o);
          } finally {
            if (r2)
              throw r2.error;
          }
        }
      }
    });
  }, t.prototype.error = function(e3) {
    var t2 = this;
    errorContext(function() {
      if (t2._throwIfClosed(), !t2.isStopped) {
        t2.hasError = t2.isStopped = !0, t2.thrownError = e3;
        for (var r2 = t2.observers; r2.length; )
          r2.shift().error(e3);
      }
    });
  }, t.prototype.complete = function() {
    var e3 = this;
    errorContext(function() {
      if (e3._throwIfClosed(), !e3.isStopped) {
        e3.isStopped = !0;
        for (var t2 = e3.observers; t2.length; )
          t2.shift().complete();
      }
    });
  }, t.prototype.unsubscribe = function() {
    this.isStopped = this.closed = !0, this.observers = null;
  }, Object.defineProperty(t.prototype, "observed", { get: function() {
    var e3;
    return ((e3 = this.observers) === null || e3 === void 0 ? void 0 : e3.length) > 0;
  }, enumerable: !1, configurable: !0 }), t.prototype._trySubscribe = function(t2) {
    return this._throwIfClosed(), e2.prototype._trySubscribe.call(this, t2);
  }, t.prototype._subscribe = function(e3) {
    return this._throwIfClosed(), this._checkFinalizedStatuses(e3), this._innerSubscribe(e3);
  }, t.prototype._innerSubscribe = function(e3) {
    var t2 = this, r2 = t2.hasError, n = t2.isStopped, i = t2.observers;
    return r2 || n ? EMPTY_SUBSCRIPTION : (i.push(e3), new Subscription(function() {
      return arrRemove(i, e3);
    }));
  }, t.prototype._checkFinalizedStatuses = function(e3) {
    var t2 = this, r2 = t2.hasError, n = t2.thrownError, i = t2.isStopped;
    r2 ? e3.error(n) : i && e3.complete();
  }, t.prototype.asObservable = function() {
    var e3 = new Observable();
    return e3.source = this, e3;
  }, t.create = function(e3, t2) {
    return new AnonymousSubject(e3, t2);
  }, t;
}(Observable), AnonymousSubject = function(e2) {
  function t(t2, r2) {
    var n = e2.call(this) || this;
    return n.destination = t2, n.source = r2, n;
  }
  return __extends(t, e2), t.prototype.next = function(e3) {
    var t2, r2;
    (r2 = (t2 = this.destination) === null || t2 === void 0 ? void 0 : t2.next) === null || r2 === void 0 || r2.call(t2, e3);
  }, t.prototype.error = function(e3) {
    var t2, r2;
    (r2 = (t2 = this.destination) === null || t2 === void 0 ? void 0 : t2.error) === null || r2 === void 0 || r2.call(t2, e3);
  }, t.prototype.complete = function() {
    var e3, t2;
    (t2 = (e3 = this.destination) === null || e3 === void 0 ? void 0 : e3.complete) === null || t2 === void 0 || t2.call(e3);
  }, t.prototype._subscribe = function(e3) {
    var t2, r2;
    return (r2 = (t2 = this.source) === null || t2 === void 0 ? void 0 : t2.subscribe(e3)) !== null && r2 !== void 0 ? r2 : EMPTY_SUBSCRIPTION;
  }, t;
}(Subject), BehaviorSubject = function(e2) {
  function t(t2) {
    var r2 = e2.call(this) || this;
    return r2._value = t2, r2;
  }
  return __extends(t, e2), Object.defineProperty(t.prototype, "value", { get: function() {
    return this.getValue();
  }, enumerable: !1, configurable: !0 }), t.prototype._subscribe = function(t2) {
    var r2 = e2.prototype._subscribe.call(this, t2);
    return !r2.closed && t2.next(this._value), r2;
  }, t.prototype.getValue = function() {
    var e3 = this, t2 = e3.hasError, r2 = e3.thrownError, n = e3._value;
    if (t2)
      throw r2;
    return this._throwIfClosed(), n;
  }, t.prototype.next = function(t2) {
    e2.prototype.next.call(this, this._value = t2);
  }, t;
}(Subject), dateTimestampProvider = { now: function() {
  return (dateTimestampProvider.delegate || Date).now();
}, delegate: void 0 }, ReplaySubject = function(e2) {
  function t(t2, r2, n) {
    t2 === void 0 && (t2 = 1 / 0), r2 === void 0 && (r2 = 1 / 0), n === void 0 && (n = dateTimestampProvider);
    var i = e2.call(this) || this;
    return i._bufferSize = t2, i._windowTime = r2, i._timestampProvider = n, i._buffer = [], i._infiniteTimeWindow = !0, i._infiniteTimeWindow = r2 === 1 / 0, i._bufferSize = Math.max(1, t2), i._windowTime = Math.max(1, r2), i;
  }
  return __extends(t, e2), t.prototype.next = function(t2) {
    var r2 = this, n = r2.isStopped, i = r2._buffer, o = r2._infiniteTimeWindow, u = r2._timestampProvider, s = r2._windowTime;
    n || (i.push(t2), !o && i.push(u.now() + s)), this._trimBuffer(), e2.prototype.next.call(this, t2);
  }, t.prototype._subscribe = function(e3) {
    this._throwIfClosed(), this._trimBuffer();
    for (var t2 = this._innerSubscribe(e3), r2 = this._infiniteTimeWindow, n = this._buffer.slice(), i = 0; i < n.length && !e3.closed; i += r2 ? 1 : 2)
      e3.next(n[i]);
    return this._checkFinalizedStatuses(e3), t2;
  }, t.prototype._trimBuffer = function() {
    var e3 = this, t2 = e3._bufferSize, r2 = e3._timestampProvider, n = e3._buffer, i = e3._infiniteTimeWindow, o = (i ? 1 : 2) * t2;
    if (t2 < 1 / 0 && o < n.length && n.splice(0, n.length - o), !i) {
      for (var u = r2.now(), s = 0, a = 1; a < n.length && n[a] <= u; a += 2)
        s = a;
      s && n.splice(0, s + 1);
    }
  }, t;
}(Subject), AsyncSubject = function(e2) {
  function t() {
    var t2 = e2 !== null && e2.apply(this, arguments) || this;
    return t2._value = null, t2._hasValue = !1, t2._isComplete = !1, t2;
  }
  return __extends(t, e2), t.prototype._checkFinalizedStatuses = function(e3) {
    var t2 = this, r2 = t2.hasError, n = t2._hasValue, i = t2._value, o = t2.thrownError, u = t2.isStopped, s = t2._isComplete;
    r2 ? e3.error(o) : (u || s) && (n && e3.next(i), e3.complete());
  }, t.prototype.next = function(e3) {
    this.isStopped || (this._value = e3, this._hasValue = !0);
  }, t.prototype.complete = function() {
    var t2 = this, r2 = t2._hasValue, n = t2._value;
    t2._isComplete || (this._isComplete = !0, r2 && e2.prototype.next.call(this, n), e2.prototype.complete.call(this));
  }, t;
}(Subject), Action = function(e2) {
  function t(t2, r2) {
    return e2.call(this) || this;
  }
  return __extends(t, e2), t.prototype.schedule = function(e3, t2) {
    return this;
  }, t;
}(Subscription), intervalProvider = { setInterval: function() {
  for (var e2 = [], t = 0; t < arguments.length; t++)
    e2[t] = arguments[t];
  var r2 = intervalProvider.delegate;
  return ((r2 == null ? void 0 : r2.setInterval) || setInterval).apply(void 0, __spreadArray([], __read(e2)));
}, clearInterval: function(e2) {
  return clearInterval(e2);
}, delegate: void 0 }, AsyncAction = function(e2) {
  function t(t2, r2) {
    var n = e2.call(this, t2, r2) || this;
    return n.scheduler = t2, n.work = r2, n.pending = !1, n;
  }
  return __extends(t, e2), t.prototype.schedule = function(e3, t2) {
    if (t2 === void 0 && (t2 = 0), this.closed)
      return this;
    this.state = e3;
    var r2 = this.id, n = this.scheduler;
    return r2 != null && (this.id = this.recycleAsyncId(n, r2, t2)), this.pending = !0, this.delay = t2, this.id = this.id || this.requestAsyncId(n, this.id, t2), this;
  }, t.prototype.requestAsyncId = function(e3, t2, r2) {
    return r2 === void 0 && (r2 = 0), intervalProvider.setInterval(e3.flush.bind(e3, this), r2);
  }, t.prototype.recycleAsyncId = function(e3, t2, r2) {
    if (r2 === void 0 && (r2 = 0), r2 != null && this.delay === r2 && this.pending === !1)
      return t2;
    intervalProvider.clearInterval(t2);
  }, t.prototype.execute = function(e3, t2) {
    if (this.closed)
      return new Error("executing a cancelled action");
    this.pending = !1;
    var r2 = this._execute(e3, t2);
    if (r2)
      return r2;
    this.pending === !1 && this.id != null && (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
  }, t.prototype._execute = function(e3, t2) {
    var r2, n = !1;
    try {
      this.work(e3);
    } catch (e4) {
      n = !0, r2 = !!e4 && e4 || new Error(e4);
    }
    if (n)
      return this.unsubscribe(), r2;
  }, t.prototype.unsubscribe = function() {
    if (!this.closed) {
      var t2 = this.id, r2 = this.scheduler, n = r2.actions;
      this.work = this.state = this.scheduler = null, this.pending = !1, arrRemove(n, this), t2 != null && (this.id = this.recycleAsyncId(r2, t2, null)), this.delay = null, e2.prototype.unsubscribe.call(this);
    }
  }, t;
}(Action), nextHandle = 1, resolved, activeHandles = {};
function findAndClearHandle(e2) {
  return e2 in activeHandles && (delete activeHandles[e2], !0);
}
var Immediate = { setImmediate: function(e2) {
  var t = nextHandle++;
  return activeHandles[t] = !0, resolved || (resolved = Promise.resolve()), resolved.then(function() {
    return findAndClearHandle(t) && e2();
  }), t;
}, clearImmediate: function(e2) {
  findAndClearHandle(e2);
} }, setImmediate = Immediate.setImmediate, clearImmediate = Immediate.clearImmediate, immediateProvider = { setImmediate: function() {
  for (var e2 = [], t = 0; t < arguments.length; t++)
    e2[t] = arguments[t];
  var r2 = immediateProvider.delegate;
  return ((r2 == null ? void 0 : r2.setImmediate) || setImmediate).apply(void 0, __spreadArray([], __read(e2)));
}, clearImmediate: function(e2) {
  return clearImmediate(e2);
}, delegate: void 0 }, AsapAction = function(e2) {
  function t(t2, r2) {
    var n = e2.call(this, t2, r2) || this;
    return n.scheduler = t2, n.work = r2, n;
  }
  return __extends(t, e2), t.prototype.requestAsyncId = function(t2, r2, n) {
    return n === void 0 && (n = 0), n !== null && n > 0 ? e2.prototype.requestAsyncId.call(this, t2, r2, n) : (t2.actions.push(this), t2._scheduled || (t2._scheduled = immediateProvider.setImmediate(t2.flush.bind(t2, void 0))));
  }, t.prototype.recycleAsyncId = function(t2, r2, n) {
    if (n === void 0 && (n = 0), n != null && n > 0 || n == null && this.delay > 0)
      return e2.prototype.recycleAsyncId.call(this, t2, r2, n);
    t2.actions.length === 0 && (immediateProvider.clearImmediate(r2), t2._scheduled = void 0);
  }, t;
}(AsyncAction), Scheduler = function() {
  function e2(t, r2) {
    r2 === void 0 && (r2 = e2.now), this.schedulerActionCtor = t, this.now = r2;
  }
  return e2.prototype.schedule = function(e3, t, r2) {
    return t === void 0 && (t = 0), new this.schedulerActionCtor(this, e3).schedule(r2, t);
  }, e2.now = dateTimestampProvider.now, e2;
}(), AsyncScheduler = function(e2) {
  function t(t2, r2) {
    r2 === void 0 && (r2 = Scheduler.now);
    var n = e2.call(this, t2, r2) || this;
    return n.actions = [], n._active = !1, n._scheduled = void 0, n;
  }
  return __extends(t, e2), t.prototype.flush = function(e3) {
    var t2 = this.actions;
    if (this._active)
      t2.push(e3);
    else {
      var r2;
      this._active = !0;
      do
        if (r2 = e3.execute(e3.state, e3.delay))
          break;
      while (e3 = t2.shift());
      if (this._active = !1, r2) {
        for (; e3 = t2.shift(); )
          e3.unsubscribe();
        throw r2;
      }
    }
  }, t;
}(Scheduler), AsapScheduler = function(e2) {
  function t() {
    return e2 !== null && e2.apply(this, arguments) || this;
  }
  return __extends(t, e2), t.prototype.flush = function(e3) {
    this._active = !0, this._scheduled = void 0;
    var t2, r2 = this.actions, n = -1;
    e3 = e3 || r2.shift();
    var i = r2.length;
    do
      if (t2 = e3.execute(e3.state, e3.delay))
        break;
    while (++n < i && (e3 = r2.shift()));
    if (this._active = !1, t2) {
      for (; ++n < i && (e3 = r2.shift()); )
        e3.unsubscribe();
      throw t2;
    }
  }, t;
}(AsyncScheduler), asapScheduler = new AsapScheduler(AsapAction), asap = asapScheduler, asyncScheduler = new AsyncScheduler(AsyncAction), async = asyncScheduler, QueueAction = function(e2) {
  function t(t2, r2) {
    var n = e2.call(this, t2, r2) || this;
    return n.scheduler = t2, n.work = r2, n;
  }
  return __extends(t, e2), t.prototype.schedule = function(t2, r2) {
    return r2 === void 0 && (r2 = 0), r2 > 0 ? e2.prototype.schedule.call(this, t2, r2) : (this.delay = r2, this.state = t2, this.scheduler.flush(this), this);
  }, t.prototype.execute = function(t2, r2) {
    return r2 > 0 || this.closed ? e2.prototype.execute.call(this, t2, r2) : this._execute(t2, r2);
  }, t.prototype.requestAsyncId = function(t2, r2, n) {
    return n === void 0 && (n = 0), n != null && n > 0 || n == null && this.delay > 0 ? e2.prototype.requestAsyncId.call(this, t2, r2, n) : t2.flush(this);
  }, t;
}(AsyncAction), QueueScheduler = function(e2) {
  function t() {
    return e2 !== null && e2.apply(this, arguments) || this;
  }
  return __extends(t, e2), t;
}(AsyncScheduler), queueScheduler = new QueueScheduler(QueueAction), queue = queueScheduler, AnimationFrameAction = function(e2) {
  function t(t2, r2) {
    var n = e2.call(this, t2, r2) || this;
    return n.scheduler = t2, n.work = r2, n;
  }
  return __extends(t, e2), t.prototype.requestAsyncId = function(t2, r2, n) {
    return n === void 0 && (n = 0), n !== null && n > 0 ? e2.prototype.requestAsyncId.call(this, t2, r2, n) : (t2.actions.push(this), t2._scheduled || (t2._scheduled = animationFrameProvider.requestAnimationFrame(function() {
      return t2.flush(void 0);
    })));
  }, t.prototype.recycleAsyncId = function(t2, r2, n) {
    if (n === void 0 && (n = 0), n != null && n > 0 || n == null && this.delay > 0)
      return e2.prototype.recycleAsyncId.call(this, t2, r2, n);
    t2.actions.length === 0 && (animationFrameProvider.cancelAnimationFrame(r2), t2._scheduled = void 0);
  }, t;
}(AsyncAction), AnimationFrameScheduler = function(e2) {
  function t() {
    return e2 !== null && e2.apply(this, arguments) || this;
  }
  return __extends(t, e2), t.prototype.flush = function(e3) {
    this._active = !0, this._scheduled = void 0;
    var t2, r2 = this.actions, n = -1;
    e3 = e3 || r2.shift();
    var i = r2.length;
    do
      if (t2 = e3.execute(e3.state, e3.delay))
        break;
    while (++n < i && (e3 = r2.shift()));
    if (this._active = !1, t2) {
      for (; ++n < i && (e3 = r2.shift()); )
        e3.unsubscribe();
      throw t2;
    }
  }, t;
}(AsyncScheduler), animationFrameScheduler = new AnimationFrameScheduler(AnimationFrameAction), animationFrame = animationFrameScheduler, VirtualTimeScheduler = function(e2) {
  function t(t2, r2) {
    t2 === void 0 && (t2 = VirtualAction), r2 === void 0 && (r2 = 1 / 0);
    var n = e2.call(this, t2, function() {
      return n.frame;
    }) || this;
    return n.maxFrames = r2, n.frame = 0, n.index = -1, n;
  }
  return __extends(t, e2), t.prototype.flush = function() {
    for (var e3, t2, r2 = this.actions, n = this.maxFrames; (t2 = r2[0]) && t2.delay <= n && (r2.shift(), this.frame = t2.delay, !(e3 = t2.execute(t2.state, t2.delay))); )
      ;
    if (e3) {
      for (; t2 = r2.shift(); )
        t2.unsubscribe();
      throw e3;
    }
  }, t.frameTimeFactor = 10, t;
}(AsyncScheduler), VirtualAction = function(e2) {
  function t(t2, r2, n) {
    n === void 0 && (n = t2.index += 1);
    var i = e2.call(this, t2, r2) || this;
    return i.scheduler = t2, i.work = r2, i.index = n, i.active = !0, i.index = t2.index = n, i;
  }
  return __extends(t, e2), t.prototype.schedule = function(r2, n) {
    if (n === void 0 && (n = 0), Number.isFinite(n)) {
      if (!this.id)
        return e2.prototype.schedule.call(this, r2, n);
      this.active = !1;
      var i = new t(this.scheduler, this.work);
      return this.add(i), i.schedule(r2, n);
    }
    return Subscription.EMPTY;
  }, t.prototype.requestAsyncId = function(e3, r2, n) {
    n === void 0 && (n = 0), this.delay = e3.frame + n;
    var i = e3.actions;
    return i.push(this), i.sort(t.sortActions), !0;
  }, t.prototype.recycleAsyncId = function(e3, t2, r2) {
  }, t.prototype._execute = function(t2, r2) {
    if (this.active === !0)
      return e2.prototype._execute.call(this, t2, r2);
  }, t.sortActions = function(e3, t2) {
    return e3.delay === t2.delay ? e3.index === t2.index ? 0 : e3.index > t2.index ? 1 : -1 : e3.delay > t2.delay ? 1 : -1;
  }, t;
}(AsyncAction), EMPTY = new Observable(function(e2) {
  return e2.complete();
});
function empty(e2) {
  return e2 ? emptyScheduled(e2) : EMPTY;
}
function emptyScheduled(e2) {
  return new Observable(function(t) {
    return e2.schedule(function() {
      return t.complete();
    });
  });
}
function scheduleArray(e2, t) {
  return new Observable(function(r2) {
    var n = 0;
    return t.schedule(function() {
      n === e2.length ? r2.complete() : (r2.next(e2[n++]), r2.closed || this.schedule());
    });
  });
}
var isArrayLike = function(e2) {
  return e2 && typeof e2.length == "number" && typeof e2 != "function";
};
function isPromise(e2) {
  return isFunction(e2 == null ? void 0 : e2.then);
}
function scheduleObservable(e2, t) {
  return new Observable(function(r2) {
    var n = new Subscription();
    return n.add(t.schedule(function() {
      var i = e2[observable]();
      n.add(i.subscribe({ next: function(e3) {
        n.add(t.schedule(function() {
          return r2.next(e3);
        }));
      }, error: function(e3) {
        n.add(t.schedule(function() {
          return r2.error(e3);
        }));
      }, complete: function() {
        n.add(t.schedule(function() {
          return r2.complete();
        }));
      } }));
    })), n;
  });
}
function schedulePromise(e2, t) {
  return new Observable(function(r2) {
    return t.schedule(function() {
      return e2.then(function(e3) {
        r2.add(t.schedule(function() {
          r2.next(e3), r2.add(t.schedule(function() {
            return r2.complete();
          }));
        }));
      }, function(e3) {
        r2.add(t.schedule(function() {
          return r2.error(e3);
        }));
      });
    });
  });
}
function getSymbolIterator() {
  return typeof Symbol == "function" && Symbol.iterator ? Symbol.iterator : "@@iterator";
}
var iterator = getSymbolIterator(), NotificationKind;
function caughtSchedule(e2, t, r2, n) {
  n === void 0 && (n = 0);
  var i = t.schedule(function() {
    try {
      r2.call(this);
    } catch (t2) {
      e2.error(t2);
    }
  }, n);
  return e2.add(i), i;
}
function scheduleIterable(e2, t) {
  return new Observable(function(r2) {
    var n;
    return r2.add(t.schedule(function() {
      n = e2[iterator](), caughtSchedule(r2, t, function() {
        var e3 = n.next(), t2 = e3.value;
        e3.done ? r2.complete() : (r2.next(t2), this.schedule());
      });
    })), function() {
      return isFunction(n == null ? void 0 : n.return) && n.return();
    };
  });
}
function scheduleAsyncIterable(e2, t) {
  if (!e2)
    throw new Error("Iterable cannot be null");
  return new Observable(function(r2) {
    var n = new Subscription();
    return n.add(t.schedule(function() {
      var i = e2[Symbol.asyncIterator]();
      n.add(t.schedule(function() {
        var e3 = this;
        i.next().then(function(t2) {
          t2.done ? r2.complete() : (r2.next(t2.value), e3.schedule());
        });
      }));
    })), n;
  });
}
function isInteropObservable(e2) {
  return isFunction(e2[observable]);
}
function isIterable(e2) {
  return isFunction(e2 == null ? void 0 : e2[iterator]);
}
function isAsyncIterable(e2) {
  return Symbol.asyncIterator && isFunction(e2 == null ? void 0 : e2[Symbol.asyncIterator]);
}
function createInvalidObservableTypeError(e2) {
  return new TypeError("You provided " + (e2 !== null && typeof e2 == "object" ? "an invalid object" : "'" + e2 + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
function readableStreamLikeToAsyncGenerator(e2) {
  return __asyncGenerator(this, arguments, function() {
    var t, r2, n;
    return __generator(this, function(i) {
      switch (i.label) {
        case 0:
          t = e2.getReader(), i.label = 1;
        case 1:
          i.trys.push([1, , 9, 10]), i.label = 2;
        case 2:
          return [4, __await(t.read())];
        case 3:
          return r2 = i.sent(), n = r2.value, r2.done ? [4, __await(void 0)] : [3, 5];
        case 4:
          return [2, i.sent()];
        case 5:
          return [4, __await(n)];
        case 6:
          return [4, i.sent()];
        case 7:
          return i.sent(), [3, 2];
        case 8:
          return [3, 10];
        case 9:
          return t.releaseLock(), [7];
        case 10:
          return [2];
      }
    });
  });
}
function isReadableStreamLike(e2) {
  return isFunction(e2 == null ? void 0 : e2.getReader);
}
function scheduleReadableStreamLike(e2, t) {
  return scheduleAsyncIterable(readableStreamLikeToAsyncGenerator(e2), t);
}
function scheduled(e2, t) {
  if (e2 != null) {
    if (isInteropObservable(e2))
      return scheduleObservable(e2, t);
    if (isArrayLike(e2))
      return scheduleArray(e2, t);
    if (isPromise(e2))
      return schedulePromise(e2, t);
    if (isAsyncIterable(e2))
      return scheduleAsyncIterable(e2, t);
    if (isIterable(e2))
      return scheduleIterable(e2, t);
    if (isReadableStreamLike(e2))
      return scheduleReadableStreamLike(e2, t);
  }
  throw createInvalidObservableTypeError(e2);
}
function from(e2, t) {
  return t ? scheduled(e2, t) : innerFrom(e2);
}
function innerFrom(e2) {
  if (e2 instanceof Observable)
    return e2;
  if (e2 != null) {
    if (isInteropObservable(e2))
      return fromInteropObservable(e2);
    if (isArrayLike(e2))
      return fromArrayLike(e2);
    if (isPromise(e2))
      return fromPromise(e2);
    if (isAsyncIterable(e2))
      return fromAsyncIterable(e2);
    if (isIterable(e2))
      return fromIterable(e2);
    if (isReadableStreamLike(e2))
      return fromReadableStreamLike(e2);
  }
  throw createInvalidObservableTypeError(e2);
}
function fromInteropObservable(e2) {
  return new Observable(function(t) {
    var r2 = e2[observable]();
    if (isFunction(r2.subscribe))
      return r2.subscribe(t);
    throw new TypeError("Provided object does not correctly implement Symbol.observable");
  });
}
function fromArrayLike(e2) {
  return new Observable(function(t) {
    for (var r2 = 0; r2 < e2.length && !t.closed; r2++)
      t.next(e2[r2]);
    t.complete();
  });
}
function fromPromise(e2) {
  return new Observable(function(t) {
    e2.then(function(e3) {
      t.closed || (t.next(e3), t.complete());
    }, function(e3) {
      return t.error(e3);
    }).then(null, reportUnhandledError);
  });
}
function fromIterable(e2) {
  return new Observable(function(t) {
    var r2, n;
    try {
      for (var i = __values(e2), o = i.next(); !o.done; o = i.next()) {
        var u = o.value;
        if (t.next(u), t.closed)
          return;
      }
    } catch (e3) {
      r2 = { error: e3 };
    } finally {
      try {
        o && !o.done && (n = i.return) && n.call(i);
      } finally {
        if (r2)
          throw r2.error;
      }
    }
    t.complete();
  });
}
function fromAsyncIterable(e2) {
  return new Observable(function(t) {
    process$1(e2, t).catch(function(e3) {
      return t.error(e3);
    });
  });
}
function fromReadableStreamLike(e2) {
  return fromAsyncIterable(readableStreamLikeToAsyncGenerator(e2));
}
function process$1(e2, t) {
  var r2, n, i, o;
  return __awaiter(this, void 0, void 0, function() {
    var u, s;
    return __generator(this, function(a) {
      switch (a.label) {
        case 0:
          a.trys.push([0, 5, 6, 11]), r2 = __asyncValues(e2), a.label = 1;
        case 1:
          return [4, r2.next()];
        case 2:
          if ((n = a.sent()).done)
            return [3, 4];
          if (u = n.value, t.next(u), t.closed)
            return [2];
          a.label = 3;
        case 3:
          return [3, 1];
        case 4:
          return [3, 11];
        case 5:
          return s = a.sent(), i = { error: s }, [3, 11];
        case 6:
          return a.trys.push([6, , 9, 10]), n && !n.done && (o = r2.return) ? [4, o.call(r2)] : [3, 8];
        case 7:
          a.sent(), a.label = 8;
        case 8:
          return [3, 10];
        case 9:
          if (i)
            throw i.error;
          return [7];
        case 10:
          return [7];
        case 11:
          return t.complete(), [2];
      }
    });
  });
}
function internalFromArray(e2, t) {
  return t ? scheduleArray(e2, t) : fromArrayLike(e2);
}
function isScheduler(e2) {
  return e2 && isFunction(e2.schedule);
}
function last$1(e2) {
  return e2[e2.length - 1];
}
function popResultSelector(e2) {
  return isFunction(last$1(e2)) ? e2.pop() : void 0;
}
function popScheduler(e2) {
  return isScheduler(last$1(e2)) ? e2.pop() : void 0;
}
function popNumber(e2, t) {
  return typeof last$1(e2) == "number" ? e2.pop() : t;
}
function of() {
  for (var e2 = [], t = 0; t < arguments.length; t++)
    e2[t] = arguments[t];
  var r2 = popScheduler(e2);
  return r2 ? scheduleArray(e2, r2) : internalFromArray(e2);
}
function throwError(e2, t) {
  var r2 = isFunction(e2) ? e2 : function() {
    return e2;
  }, n = function(e3) {
    return e3.error(r2());
  };
  return new Observable(t ? function(e3) {
    return t.schedule(n, 0, e3);
  } : n);
}
(function(e2) {
  e2.NEXT = "N", e2.ERROR = "E", e2.COMPLETE = "C";
})(NotificationKind || (NotificationKind = {}));
var Notification$1 = function() {
  function e2(e3, t, r2) {
    this.kind = e3, this.value = t, this.error = r2, this.hasValue = e3 === "N";
  }
  return e2.prototype.observe = function(e3) {
    return observeNotification(this, e3);
  }, e2.prototype.do = function(e3, t, r2) {
    var n = this, i = n.kind, o = n.value, u = n.error;
    return i === "N" ? e3 == null ? void 0 : e3(o) : i === "E" ? t == null ? void 0 : t(u) : r2 == null ? void 0 : r2();
  }, e2.prototype.accept = function(e3, t, r2) {
    var n;
    return isFunction((n = e3) === null || n === void 0 ? void 0 : n.next) ? this.observe(e3) : this.do(e3, t, r2);
  }, e2.prototype.toObservable = function() {
    var e3 = this, t = e3.kind, r2 = e3.value, n = e3.error, i = t === "N" ? of(r2) : t === "E" ? throwError(function() {
      return n;
    }) : t === "C" ? EMPTY : 0;
    if (!i)
      throw new TypeError("Unexpected notification kind " + t);
    return i;
  }, e2.createNext = function(t) {
    return new e2("N", t);
  }, e2.createError = function(t) {
    return new e2("E", void 0, t);
  }, e2.createComplete = function() {
    return e2.completeNotification;
  }, e2.completeNotification = new e2("C"), e2;
}();
function observeNotification(e2, t) {
  var r2, n, i, o = e2, u = o.kind, s = o.value, a = o.error;
  if (typeof u != "string")
    throw new TypeError('Invalid notification, missing "kind"');
  u === "N" ? (r2 = t.next) === null || r2 === void 0 || r2.call(t, s) : u === "E" ? (n = t.error) === null || n === void 0 || n.call(t, a) : (i = t.complete) === null || i === void 0 || i.call(t);
}
function isObservable(e2) {
  return !!e2 && (e2 instanceof Observable || isFunction(e2.lift) && isFunction(e2.subscribe));
}
var EmptyError = createErrorClass(function(e2) {
  return function() {
    e2(this), this.name = "EmptyError", this.message = "no elements in sequence";
  };
});
function lastValueFrom(e2, t) {
  var r2 = typeof t == "object";
  return new Promise(function(n, i) {
    var o, u = !1;
    e2.subscribe({ next: function(e3) {
      o = e3, u = !0;
    }, error: i, complete: function() {
      u ? n(o) : r2 ? n(t.defaultValue) : i(new EmptyError());
    } });
  });
}
function firstValueFrom(e2, t) {
  var r2 = typeof t == "object";
  return new Promise(function(n, i) {
    var o = new SafeSubscriber({ next: function(e3) {
      n(e3), o.unsubscribe();
    }, error: i, complete: function() {
      r2 ? n(t.defaultValue) : i(new EmptyError());
    } });
    e2.subscribe(o);
  });
}
var ArgumentOutOfRangeError = createErrorClass(function(e2) {
  return function() {
    e2(this), this.name = "ArgumentOutOfRangeError", this.message = "argument out of range";
  };
}), NotFoundError = createErrorClass(function(e2) {
  return function(t) {
    e2(this), this.name = "NotFoundError", this.message = t;
  };
}), SequenceError = createErrorClass(function(e2) {
  return function(t) {
    e2(this), this.name = "SequenceError", this.message = t;
  };
});
function isValidDate(e2) {
  return e2 instanceof Date && !isNaN(e2);
}
var TimeoutError = createErrorClass(function(e2) {
  return function(t) {
    t === void 0 && (t = null), e2(this), this.message = "Timeout has occurred", this.name = "TimeoutError", this.info = t;
  };
});
function timeout(e2, t) {
  var r2 = isValidDate(e2) ? { first: e2 } : typeof e2 == "number" ? { each: e2 } : e2, n = r2.first, i = r2.each, o = r2.with, u = o === void 0 ? timeoutErrorFactory : o, s = r2.scheduler, a = s === void 0 ? t != null ? t : asyncScheduler : s, c = r2.meta, l = c === void 0 ? null : c;
  if (n == null && i == null)
    throw new TypeError("No timeout provided.");
  return operate(function(e3, t2) {
    var r3, o2, s2 = null, c2 = 0, f = function(e4) {
      o2 = caughtSchedule(t2, a, function() {
        r3.unsubscribe(), innerFrom(u({ meta: l, lastValue: s2, seen: c2 })).subscribe(t2);
      }, e4);
    };
    r3 = e3.subscribe(new OperatorSubscriber(t2, function(e4) {
      o2 == null || o2.unsubscribe(), c2++, t2.next(s2 = e4), i > 0 && f(i);
    }, void 0, void 0, function() {
      (o2 == null ? void 0 : o2.closed) || o2 == null || o2.unsubscribe(), s2 = null;
    })), f(n != null ? typeof n == "number" ? n : +n - a.now() : i);
  });
}
function timeoutErrorFactory(e2) {
  throw new TimeoutError(e2);
}
function subscribeOn(e2, t) {
  return t === void 0 && (t = 0), operate(function(r2, n) {
    n.add(e2.schedule(function() {
      return r2.subscribe(n);
    }, t));
  });
}
function map(e2, t) {
  return operate(function(r2, n) {
    var i = 0;
    r2.subscribe(new OperatorSubscriber(n, function(r3) {
      n.next(e2.call(t, r3, i++));
    }));
  });
}
var isArray$2 = Array.isArray;
function callOrApply(e2, t) {
  return isArray$2(t) ? e2.apply(void 0, __spreadArray([], __read(t))) : e2(t);
}
function mapOneOrManyArgs(e2) {
  return map(function(t) {
    return callOrApply(e2, t);
  });
}
function observeOn(e2, t) {
  return t === void 0 && (t = 0), operate(function(r2, n) {
    r2.subscribe(new OperatorSubscriber(n, function(r3) {
      return n.add(e2.schedule(function() {
        return n.next(r3);
      }, t));
    }, function() {
      return n.add(e2.schedule(function() {
        return n.complete();
      }, t));
    }, function(r3) {
      return n.add(e2.schedule(function() {
        return n.error(r3);
      }, t));
    }));
  });
}
function bindCallbackInternals(e2, t, r2, n) {
  if (r2) {
    if (!isScheduler(r2))
      return function() {
        for (var i = [], o = 0; o < arguments.length; o++)
          i[o] = arguments[o];
        return bindCallbackInternals(e2, t, n).apply(this, i).pipe(mapOneOrManyArgs(r2));
      };
    n = r2;
  }
  return n ? function() {
    for (var r3 = [], i = 0; i < arguments.length; i++)
      r3[i] = arguments[i];
    return bindCallbackInternals(e2, t).apply(this, r3).pipe(subscribeOn(n), observeOn(n));
  } : function() {
    for (var r3 = this, n2 = [], i = 0; i < arguments.length; i++)
      n2[i] = arguments[i];
    var o = new AsyncSubject(), u = !0;
    return new Observable(function(i2) {
      var s = o.subscribe(i2);
      if (u) {
        u = !1;
        var a = !1, c = !1;
        t.apply(r3, __spreadArray(__spreadArray([], __read(n2)), [function() {
          for (var t2 = [], r4 = 0; r4 < arguments.length; r4++)
            t2[r4] = arguments[r4];
          if (e2) {
            var n3 = t2.shift();
            if (n3 != null)
              return void o.error(n3);
          }
          o.next(1 < t2.length ? t2 : t2[0]), c = !0, a && o.complete();
        }])), c && o.complete(), a = !0;
      }
      return s;
    });
  };
}
function bindCallback(e2, t, r2) {
  return bindCallbackInternals(!1, e2, t, r2);
}
function bindNodeCallback(e2, t, r2) {
  return bindCallbackInternals(!0, e2, t, r2);
}
var isArray$1 = Array.isArray, getPrototypeOf = Object.getPrototypeOf, objectProto = Object.prototype, getKeys = Object.keys;
function argsArgArrayOrObject(e2) {
  if (e2.length === 1) {
    var t = e2[0];
    if (isArray$1(t))
      return { args: t, keys: null };
    if (isPOJO(t)) {
      var r2 = getKeys(t);
      return { args: r2.map(function(e3) {
        return t[e3];
      }), keys: r2 };
    }
  }
  return { args: e2, keys: null };
}
function isPOJO(e2) {
  return e2 && typeof e2 == "object" && getPrototypeOf(e2) === objectProto;
}
function createObject(e2, t) {
  return e2.reduce(function(e3, r2, n) {
    return e3[r2] = t[n], e3;
  }, {});
}
function combineLatest$1() {
  for (var e2 = [], t = 0; t < arguments.length; t++)
    e2[t] = arguments[t];
  var r2 = popScheduler(e2), n = popResultSelector(e2), i = argsArgArrayOrObject(e2), o = i.args, u = i.keys;
  if (o.length === 0)
    return from([], r2);
  var s = new Observable(combineLatestInit(o, r2, u ? function(e3) {
    return createObject(u, e3);
  } : identity));
  return n ? s.pipe(mapOneOrManyArgs(n)) : s;
}
function combineLatestInit(e2, t, r2) {
  return r2 === void 0 && (r2 = identity), function(n) {
    maybeSchedule(t, function() {
      for (var i = e2.length, o = new Array(i), u = i, s = i, a = function(i2) {
        maybeSchedule(t, function() {
          var a2 = from(e2[i2], t), c2 = !1;
          a2.subscribe(new OperatorSubscriber(n, function(e3) {
            o[i2] = e3, c2 || (c2 = !0, s--), s || n.next(r2(o.slice()));
          }, function() {
            --u || n.complete();
          }));
        }, n);
      }, c = 0; c < i; c++)
        a(c);
    }, n);
  };
}
function maybeSchedule(e2, t, r2) {
  e2 ? r2.add(e2.schedule(t)) : t();
}
function mergeInternals(e2, t, r2, n, i, o, u, s) {
  var a = [], c = 0, l = 0, f = !1, d = function() {
    !f || a.length || c || t.complete();
  }, p2 = function(e3) {
    return c < n ? h(e3) : a.push(e3);
  }, h = function(e3) {
    o && t.next(e3), c++;
    var s2 = !1;
    innerFrom(r2(e3, l++)).subscribe(new OperatorSubscriber(t, function(e4) {
      i == null || i(e4), o ? p2(e4) : t.next(e4);
    }, function() {
      s2 = !0;
    }, void 0, function() {
      if (s2)
        try {
          c--;
          for (var e4 = function() {
            var e5 = a.shift();
            u ? t.add(u.schedule(function() {
              return h(e5);
            })) : h(e5);
          }; a.length && c < n; )
            e4();
          d();
        } catch (e5) {
          t.error(e5);
        }
    }));
  };
  return e2.subscribe(new OperatorSubscriber(t, p2, function() {
    f = !0, d();
  })), function() {
    s == null || s();
  };
}
function mergeMap(e2, t, r2) {
  return r2 === void 0 && (r2 = 1 / 0), isFunction(t) ? mergeMap(function(r3, n) {
    return map(function(e3, i) {
      return t(r3, e3, n, i);
    })(innerFrom(e2(r3, n)));
  }, r2) : (typeof t == "number" && (r2 = t), operate(function(t2, n) {
    return mergeInternals(t2, n, e2, r2);
  }));
}
function mergeAll(e2) {
  return e2 === void 0 && (e2 = 1 / 0), mergeMap(identity, e2);
}
function concatAll() {
  return mergeAll(1);
}
function concat$1() {
  for (var e2 = [], t = 0; t < arguments.length; t++)
    e2[t] = arguments[t];
  return concatAll()(internalFromArray(e2, popScheduler(e2)));
}
function defer(e2) {
  return new Observable(function(t) {
    innerFrom(e2()).subscribe(t);
  });
}
var DEFAULT_CONFIG$1 = { connector: function() {
  return new Subject();
}, resetOnDisconnect: !0 };
function connectable(e2, t) {
  t === void 0 && (t = DEFAULT_CONFIG$1);
  var r2 = null, n = t.connector, i = t.resetOnDisconnect, o = i === void 0 || i, u = n(), s = new Observable(function(e3) {
    return u.subscribe(e3);
  });
  return s.connect = function() {
    return r2 && !r2.closed || (r2 = defer(function() {
      return e2;
    }).subscribe(u), o && r2.add(function() {
      return u = n();
    })), r2;
  }, s;
}
function forkJoin() {
  for (var e2 = [], t = 0; t < arguments.length; t++)
    e2[t] = arguments[t];
  var r2 = popResultSelector(e2), n = argsArgArrayOrObject(e2), i = n.args, o = n.keys, u = new Observable(function(e3) {
    var t2 = i.length;
    if (t2)
      for (var r3 = new Array(t2), n2 = t2, u2 = t2, s = function(t3) {
        var s2 = !1;
        innerFrom(i[t3]).subscribe(new OperatorSubscriber(e3, function(e4) {
          s2 || (s2 = !0, u2--), r3[t3] = e4;
        }, function() {
          --n2 && s2 || (u2 || e3.next(o ? createObject(o, r3) : r3), e3.complete());
        }));
      }, a = 0; a < t2; a++)
        s(a);
    else
      e3.complete();
  });
  return r2 ? u.pipe(mapOneOrManyArgs(r2)) : u;
}
var nodeEventEmitterMethods = ["addListener", "removeListener"], eventTargetMethods = ["addEventListener", "removeEventListener"], jqueryMethods = ["on", "off"];
function fromEvent(e2, t, r2, n) {
  if (isFunction(r2) && (n = r2, r2 = void 0), n)
    return fromEvent(e2, t, r2).pipe(mapOneOrManyArgs(n));
  var i = __read(isEventTarget(e2) ? eventTargetMethods.map(function(n2) {
    return function(i2) {
      return e2[n2](t, i2, r2);
    };
  }) : isNodeStyleEventEmitter(e2) ? nodeEventEmitterMethods.map(toCommonHandlerRegistry(e2, t)) : isJQueryStyleEventEmitter(e2) ? jqueryMethods.map(toCommonHandlerRegistry(e2, t)) : [], 2), o = i[0], u = i[1];
  if (!o && isArrayLike(e2))
    return mergeMap(function(e3) {
      return fromEvent(e3, t, r2);
    })(internalFromArray(e2));
  if (!o)
    throw new TypeError("Invalid event target");
  return new Observable(function(e3) {
    var t2 = function() {
      for (var t3 = [], r3 = 0; r3 < arguments.length; r3++)
        t3[r3] = arguments[r3];
      return e3.next(1 < t3.length ? t3 : t3[0]);
    };
    return o(t2), function() {
      return u(t2);
    };
  });
}
function toCommonHandlerRegistry(e2, t) {
  return function(r2) {
    return function(n) {
      return e2[r2](t, n);
    };
  };
}
function isNodeStyleEventEmitter(e2) {
  return isFunction(e2.addListener) && isFunction(e2.removeListener);
}
function isJQueryStyleEventEmitter(e2) {
  return isFunction(e2.on) && isFunction(e2.off);
}
function isEventTarget(e2) {
  return isFunction(e2.addEventListener) && isFunction(e2.removeEventListener);
}
function fromEventPattern(e2, t, r2) {
  return r2 ? fromEventPattern(e2, t).pipe(mapOneOrManyArgs(r2)) : new Observable(function(r3) {
    var n = function() {
      for (var e3 = [], t2 = 0; t2 < arguments.length; t2++)
        e3[t2] = arguments[t2];
      return r3.next(e3.length === 1 ? e3[0] : e3);
    }, i = e2(n);
    return isFunction(t) ? function() {
      return t(n, i);
    } : void 0;
  });
}
function generate(e2, t, r2, n, i) {
  var o, u, s, a;
  function c() {
    var e3;
    return __generator(this, function(n2) {
      switch (n2.label) {
        case 0:
          e3 = a, n2.label = 1;
        case 1:
          return t && !t(e3) ? [3, 4] : [4, s(e3)];
        case 2:
          n2.sent(), n2.label = 3;
        case 3:
          return e3 = r2(e3), [3, 1];
        case 4:
          return [2];
      }
    });
  }
  return arguments.length === 1 ? (a = (o = e2).initialState, t = o.condition, r2 = o.iterate, u = o.resultSelector, s = u === void 0 ? identity : u, i = o.scheduler) : (a = e2, !n || isScheduler(n) ? (s = identity, i = n) : s = n), defer(i ? function() {
    return scheduleIterable(c(), i);
  } : c);
}
function iif(e2, t, r2) {
  return defer(function() {
    return e2() ? t : r2;
  });
}
function timer(e2, t, r2) {
  e2 === void 0 && (e2 = 0), r2 === void 0 && (r2 = async);
  var n = -1;
  return t != null && (isScheduler(t) ? r2 = t : n = t), new Observable(function(t2) {
    var i = isValidDate(e2) ? +e2 - r2.now() : e2;
    i < 0 && (i = 0);
    var o = 0;
    return r2.schedule(function() {
      t2.closed || (t2.next(o++), 0 <= n ? this.schedule(void 0, n) : t2.complete());
    }, i);
  });
}
function interval(e2, t) {
  return e2 === void 0 && (e2 = 0), t === void 0 && (t = asyncScheduler), e2 < 0 && (e2 = 0), timer(e2, e2, t);
}
function merge$1() {
  for (var e2 = [], t = 0; t < arguments.length; t++)
    e2[t] = arguments[t];
  var r2 = popScheduler(e2), n = popNumber(e2, 1 / 0), i = e2;
  return i.length ? i.length === 1 ? innerFrom(i[0]) : mergeAll(n)(internalFromArray(i, r2)) : EMPTY;
}
var NEVER = new Observable(noop);
function never() {
  return NEVER;
}
var isArray = Array.isArray;
function argsOrArgArray(e2) {
  return e2.length === 1 && isArray(e2[0]) ? e2[0] : e2;
}
function onErrorResumeNext$1() {
  for (var e2 = [], t = 0; t < arguments.length; t++)
    e2[t] = arguments[t];
  var r2 = argsOrArgArray(e2);
  return operate(function(e3, t2) {
    var n = __spreadArray([e3], __read(r2)), i = function() {
      if (!t2.closed)
        if (n.length > 0) {
          var e4 = void 0;
          try {
            e4 = innerFrom(n.shift());
          } catch {
            return void i();
          }
          var r3 = new OperatorSubscriber(t2, void 0, noop, noop);
          t2.add(e4.subscribe(r3)), r3.add(i);
        } else
          t2.complete();
    };
    i();
  });
}
function onErrorResumeNext() {
  for (var e2 = [], t = 0; t < arguments.length; t++)
    e2[t] = arguments[t];
  return onErrorResumeNext$1(argsOrArgArray(e2))(EMPTY);
}
function pairs(e2, t) {
  return from(Object.entries(e2), t);
}
function not(e2, t) {
  return function(r2, n) {
    return !e2.call(t, r2, n);
  };
}
function filter(e2, t) {
  return operate(function(r2, n) {
    var i = 0;
    r2.subscribe(new OperatorSubscriber(n, function(r3) {
      return e2.call(t, r3, i++) && n.next(r3);
    }));
  });
}
function partition(e2, t, r2) {
  return [filter(t, r2)(innerFrom(e2)), filter(not(t, r2))(innerFrom(e2))];
}
function race() {
  for (var e2 = [], t = 0; t < arguments.length; t++)
    e2[t] = arguments[t];
  return (e2 = argsOrArgArray(e2)).length === 1 ? innerFrom(e2[0]) : new Observable(raceInit(e2));
}
function raceInit(e2) {
  return function(t) {
    for (var r2 = [], n = function(n2) {
      r2.push(innerFrom(e2[n2]).subscribe(new OperatorSubscriber(t, function(e3) {
        if (r2) {
          for (var i2 = 0; i2 < r2.length; i2++)
            i2 !== n2 && r2[i2].unsubscribe();
          r2 = null;
        }
        t.next(e3);
      })));
    }, i = 0; r2 && !t.closed && i < e2.length; i++)
      n(i);
  };
}
function range(e2, t, r2) {
  if (t == null && (t = e2, e2 = 0), t <= 0)
    return EMPTY;
  var n = t + e2;
  return new Observable(r2 ? function(t2) {
    var i = e2;
    return r2.schedule(function() {
      i < n ? (t2.next(i++), this.schedule()) : t2.complete();
    });
  } : function(t2) {
    for (var r3 = e2; r3 < n && !t2.closed; )
      t2.next(r3++);
    t2.complete();
  });
}
function using(e2, t) {
  return new Observable(function(r2) {
    var n = e2(), i = t(n);
    return (i ? innerFrom(i) : EMPTY).subscribe(r2), function() {
      n && n.unsubscribe();
    };
  });
}
function zip$1() {
  for (var e2 = [], t = 0; t < arguments.length; t++)
    e2[t] = arguments[t];
  var r2 = popResultSelector(e2), n = argsOrArgArray(e2);
  return n.length ? new Observable(function(e3) {
    var t2 = n.map(function() {
      return [];
    }), i = n.map(function() {
      return !1;
    });
    e3.add(function() {
      t2 = i = null;
    });
    for (var o = function(o2) {
      innerFrom(n[o2]).subscribe(new OperatorSubscriber(e3, function(n2) {
        if (t2[o2].push(n2), t2.every(function(e4) {
          return e4.length;
        })) {
          var u2 = t2.map(function(e4) {
            return e4.shift();
          });
          e3.next(r2 ? r2.apply(void 0, __spreadArray([], __read(u2))) : u2), t2.some(function(e4, t3) {
            return !e4.length && i[t3];
          }) && e3.complete();
        }
      }, function() {
        i[o2] = !0, !t2[o2].length && e3.complete();
      }));
    }, u = 0; !e3.closed && u < n.length; u++)
      o(u);
    return function() {
      t2 = i = null;
    };
  }) : EMPTY;
}
function audit(e2) {
  return operate(function(t, r2) {
    var n = !1, i = null, o = null, u = !1, s = function() {
      if (o == null || o.unsubscribe(), o = null, n) {
        n = !1;
        var e3 = i;
        i = null, r2.next(e3);
      }
      u && r2.complete();
    }, a = function() {
      o = null, u && r2.complete();
    };
    t.subscribe(new OperatorSubscriber(r2, function(t2) {
      n = !0, i = t2, o || innerFrom(e2(t2)).subscribe(o = new OperatorSubscriber(r2, s, a));
    }, function() {
      u = !0, (!n || !o || o.closed) && r2.complete();
    }));
  });
}
function auditTime(e2, t) {
  return t === void 0 && (t = async), audit(function() {
    return timer(e2, t);
  });
}
function buffer(e2) {
  return operate(function(t, r2) {
    var n = [];
    return t.subscribe(new OperatorSubscriber(r2, function(e3) {
      return n.push(e3);
    }, function() {
      r2.next(n), r2.complete();
    })), e2.subscribe(new OperatorSubscriber(r2, function() {
      var e3 = n;
      n = [], r2.next(e3);
    }, noop)), function() {
      n = null;
    };
  });
}
function bufferCount(e2, t) {
  return t === void 0 && (t = null), t = t != null ? t : e2, operate(function(r2, n) {
    var i = [], o = 0;
    r2.subscribe(new OperatorSubscriber(n, function(r3) {
      var u, s, a, c, l = null;
      o++ % t == 0 && i.push([]);
      try {
        for (var f = __values(i), d = f.next(); !d.done; d = f.next())
          (b = d.value).push(r3), e2 <= b.length && (l = l != null ? l : []).push(b);
      } catch (e3) {
        u = { error: e3 };
      } finally {
        try {
          d && !d.done && (s = f.return) && s.call(f);
        } finally {
          if (u)
            throw u.error;
        }
      }
      if (l)
        try {
          for (var p2 = __values(l), h = p2.next(); !h.done; h = p2.next()) {
            var b = h.value;
            arrRemove(i, b), n.next(b);
          }
        } catch (e3) {
          a = { error: e3 };
        } finally {
          try {
            h && !h.done && (c = p2.return) && c.call(p2);
          } finally {
            if (a)
              throw a.error;
          }
        }
    }, function() {
      var e3, t2;
      try {
        for (var r3 = __values(i), o2 = r3.next(); !o2.done; o2 = r3.next()) {
          var u = o2.value;
          n.next(u);
        }
      } catch (t3) {
        e3 = { error: t3 };
      } finally {
        try {
          o2 && !o2.done && (t2 = r3.return) && t2.call(r3);
        } finally {
          if (e3)
            throw e3.error;
        }
      }
      n.complete();
    }, void 0, function() {
      i = null;
    }));
  });
}
function bufferTime(e2) {
  for (var t, r2, n = [], i = 1; i < arguments.length; i++)
    n[i - 1] = arguments[i];
  var o = (t = popScheduler(n)) !== null && t !== void 0 ? t : asyncScheduler, u = (r2 = n[0]) !== null && r2 !== void 0 ? r2 : null, s = n[1] || 1 / 0;
  return operate(function(t2, r3) {
    var n2 = [], i2 = !1, a = function(e3) {
      var t3 = e3.buffer;
      e3.subs.unsubscribe(), arrRemove(n2, e3), r3.next(t3), i2 && c();
    }, c = function() {
      if (n2) {
        var t3 = new Subscription();
        r3.add(t3);
        var i3 = { buffer: [], subs: t3 };
        n2.push(i3), t3.add(o.schedule(function() {
          return a(i3);
        }, e2));
      }
    };
    u !== null && u >= 0 ? r3.add(o.schedule(function() {
      c(), !this.closed && r3.add(this.schedule(null, u));
    }, u)) : i2 = !0, c();
    var l = new OperatorSubscriber(r3, function(e3) {
      var t3, r4, i3 = n2.slice();
      try {
        for (var o2 = __values(i3), u2 = o2.next(); !u2.done; u2 = o2.next()) {
          var c2 = u2.value, l2 = c2.buffer;
          l2.push(e3), s <= l2.length && a(c2);
        }
      } catch (e4) {
        t3 = { error: e4 };
      } finally {
        try {
          u2 && !u2.done && (r4 = o2.return) && r4.call(o2);
        } finally {
          if (t3)
            throw t3.error;
        }
      }
    }, function() {
      for (; n2 != null && n2.length; )
        r3.next(n2.shift().buffer);
      l == null || l.unsubscribe(), r3.complete(), r3.unsubscribe();
    }, void 0, function() {
      return n2 = null;
    });
    t2.subscribe(l);
  });
}
function bufferToggle(e2, t) {
  return operate(function(r2, n) {
    var i = [];
    innerFrom(e2).subscribe(new OperatorSubscriber(n, function(e3) {
      var r3 = [];
      i.push(r3);
      var o = new Subscription();
      o.add(innerFrom(t(e3)).subscribe(new OperatorSubscriber(n, function() {
        arrRemove(i, r3), n.next(r3), o.unsubscribe();
      }, noop)));
    }, noop)), r2.subscribe(new OperatorSubscriber(n, function(e3) {
      var t2, r3;
      try {
        for (var n2 = __values(i), o = n2.next(); !o.done; o = n2.next())
          o.value.push(e3);
      } catch (e4) {
        t2 = { error: e4 };
      } finally {
        try {
          o && !o.done && (r3 = n2.return) && r3.call(n2);
        } finally {
          if (t2)
            throw t2.error;
        }
      }
    }, function() {
      for (; i.length > 0; )
        n.next(i.shift());
      n.complete();
    }));
  });
}
function bufferWhen(e2) {
  return operate(function(t, r2) {
    var n = null, i = null, o = function() {
      i == null || i.unsubscribe();
      var t2 = n;
      n = [], t2 && r2.next(t2), innerFrom(e2()).subscribe(i = new OperatorSubscriber(r2, o, noop));
    };
    o(), t.subscribe(new OperatorSubscriber(r2, function(e3) {
      return n == null ? void 0 : n.push(e3);
    }, function() {
      n && r2.next(n), r2.complete();
    }, void 0, function() {
      return n = i = null;
    }));
  });
}
function catchError(e2) {
  return operate(function(t, r2) {
    var n, i = null, o = !1;
    i = t.subscribe(new OperatorSubscriber(r2, void 0, void 0, function(u) {
      n = innerFrom(e2(u, catchError(e2)(t))), i ? (i.unsubscribe(), i = null, n.subscribe(r2)) : o = !0;
    })), o && (i.unsubscribe(), i = null, n.subscribe(r2));
  });
}
function scanInternals(e2, t, r2, n, i) {
  return function(o, u) {
    var s = r2, a = t, c = 0;
    o.subscribe(new OperatorSubscriber(u, function(t2) {
      var r3 = c++;
      a = s ? e2(a, t2, r3) : (s = !0, t2), n && u.next(a);
    }, i && function() {
      s && u.next(a), u.complete();
    }));
  };
}
function reduce(e2, t) {
  return operate(scanInternals(e2, t, arguments.length >= 2, !1, !0));
}
var arrReducer = function(e2, t) {
  return e2.push(t), e2;
};
function toArray() {
  return operate(function(e2, t) {
    reduce(arrReducer, [])(e2).subscribe(t);
  });
}
function joinAllInternals(e2, t) {
  return pipe(toArray(), mergeMap(function(t2) {
    return e2(t2);
  }), t ? mapOneOrManyArgs(t) : identity);
}
function combineLatestAll(e2) {
  return joinAllInternals(combineLatest$1, e2);
}
var combineAll = combineLatestAll;
function combineLatest() {
  for (var e2 = [], t = 0; t < arguments.length; t++)
    e2[t] = arguments[t];
  var r2 = popResultSelector(e2);
  return r2 ? pipe(combineLatest.apply(void 0, __spreadArray([], __read(e2))), mapOneOrManyArgs(r2)) : operate(function(t2, r3) {
    combineLatestInit(__spreadArray([t2], __read(argsOrArgArray(e2))))(r3);
  });
}
function combineLatestWith() {
  for (var e2 = [], t = 0; t < arguments.length; t++)
    e2[t] = arguments[t];
  return combineLatest.apply(void 0, __spreadArray([], __read(e2)));
}
function concatMap(e2, t) {
  return isFunction(t) ? mergeMap(e2, t, 1) : mergeMap(e2, 1);
}
function concatMapTo(e2, t) {
  return isFunction(t) ? concatMap(function() {
    return e2;
  }, t) : concatMap(function() {
    return e2;
  });
}
function concat() {
  for (var e2 = [], t = 0; t < arguments.length; t++)
    e2[t] = arguments[t];
  var r2 = popScheduler(e2);
  return operate(function(t2, n) {
    concatAll()(internalFromArray(__spreadArray([t2], __read(e2)), r2)).subscribe(n);
  });
}
function concatWith() {
  for (var e2 = [], t = 0; t < arguments.length; t++)
    e2[t] = arguments[t];
  return concat.apply(void 0, __spreadArray([], __read(e2)));
}
function fromSubscribable(e2) {
  return new Observable(function(t) {
    return e2.subscribe(t);
  });
}
var DEFAULT_CONFIG = { connector: function() {
  return new Subject();
} };
function connect(e2, t) {
  t === void 0 && (t = DEFAULT_CONFIG);
  var r2 = t.connector;
  return operate(function(t2, n) {
    var i = r2();
    from(e2(fromSubscribable(i))).subscribe(n), n.add(t2.subscribe(i));
  });
}
function count(e2) {
  return reduce(function(t, r2, n) {
    return !e2 || e2(r2, n) ? t + 1 : t;
  }, 0);
}
function debounce(e2) {
  return operate(function(t, r2) {
    var n = !1, i = null, o = null, u = function() {
      if (o == null || o.unsubscribe(), o = null, n) {
        n = !1;
        var e3 = i;
        i = null, r2.next(e3);
      }
    };
    t.subscribe(new OperatorSubscriber(r2, function(t2) {
      o == null || o.unsubscribe(), n = !0, i = t2, o = new OperatorSubscriber(r2, u, noop), innerFrom(e2(t2)).subscribe(o);
    }, function() {
      u(), r2.complete();
    }, void 0, function() {
      i = o = null;
    }));
  });
}
function debounceTime(e2, t) {
  return t === void 0 && (t = asyncScheduler), operate(function(r2, n) {
    var i = null, o = null, u = null, s = function() {
      if (i) {
        i.unsubscribe(), i = null;
        var e3 = o;
        o = null, n.next(e3);
      }
    };
    function a() {
      var r3 = u + e2, o2 = t.now();
      if (o2 < r3)
        return i = this.schedule(void 0, r3 - o2), void n.add(i);
      s();
    }
    r2.subscribe(new OperatorSubscriber(n, function(r3) {
      o = r3, u = t.now(), i || (i = t.schedule(a, e2), n.add(i));
    }, function() {
      s(), n.complete();
    }, void 0, function() {
      o = i = null;
    }));
  });
}
function defaultIfEmpty(e2) {
  return operate(function(t, r2) {
    var n = !1;
    t.subscribe(new OperatorSubscriber(r2, function(e3) {
      n = !0, r2.next(e3);
    }, function() {
      n || r2.next(e2), r2.complete();
    }));
  });
}
function take(e2) {
  return e2 <= 0 ? function() {
    return EMPTY;
  } : operate(function(t, r2) {
    var n = 0;
    t.subscribe(new OperatorSubscriber(r2, function(t2) {
      ++n <= e2 && (r2.next(t2), e2 <= n && r2.complete());
    }));
  });
}
function ignoreElements() {
  return operate(function(e2, t) {
    e2.subscribe(new OperatorSubscriber(t, noop));
  });
}
function mapTo(e2) {
  return map(function() {
    return e2;
  });
}
function delayWhen(e2, t) {
  return t ? function(r2) {
    return concat$1(t.pipe(take(1), ignoreElements()), r2.pipe(delayWhen(e2)));
  } : mergeMap(function(t2, r2) {
    return e2(t2, r2).pipe(take(1), mapTo(t2));
  });
}
function delay(e2, t) {
  t === void 0 && (t = asyncScheduler);
  var r2 = timer(e2, t);
  return delayWhen(function() {
    return r2;
  });
}
function dematerialize() {
  return operate(function(e2, t) {
    e2.subscribe(new OperatorSubscriber(t, function(e3) {
      return observeNotification(e3, t);
    }));
  });
}
function distinct(e2, t) {
  return operate(function(r2, n) {
    var i = /* @__PURE__ */ new Set();
    r2.subscribe(new OperatorSubscriber(n, function(t2) {
      var r3 = e2 ? e2(t2) : t2;
      i.has(r3) || (i.add(r3), n.next(t2));
    })), t == null || t.subscribe(new OperatorSubscriber(n, function() {
      return i.clear();
    }, noop));
  });
}
function distinctUntilChanged(e2, t) {
  return t === void 0 && (t = identity), e2 = e2 != null ? e2 : defaultCompare, operate(function(r2, n) {
    var i, o = !0;
    r2.subscribe(new OperatorSubscriber(n, function(r3) {
      var u = t(r3);
      !o && e2(i, u) || (o = !1, i = u, n.next(r3));
    }));
  });
}
function defaultCompare(e2, t) {
  return e2 === t;
}
function distinctUntilKeyChanged(e2, t) {
  return distinctUntilChanged(function(r2, n) {
    return t ? t(r2[e2], n[e2]) : r2[e2] === n[e2];
  });
}
function throwIfEmpty(e2) {
  return e2 === void 0 && (e2 = defaultErrorFactory), operate(function(t, r2) {
    var n = !1;
    t.subscribe(new OperatorSubscriber(r2, function(e3) {
      n = !0, r2.next(e3);
    }, function() {
      return n ? r2.complete() : r2.error(e2());
    }));
  });
}
function defaultErrorFactory() {
  return new EmptyError();
}
function elementAt(e2, t) {
  if (e2 < 0)
    throw new ArgumentOutOfRangeError();
  var r2 = arguments.length >= 2;
  return function(n) {
    return n.pipe(filter(function(t2, r3) {
      return r3 === e2;
    }), take(1), r2 ? defaultIfEmpty(t) : throwIfEmpty(function() {
      return new ArgumentOutOfRangeError();
    }));
  };
}
function endWith() {
  for (var e2 = [], t = 0; t < arguments.length; t++)
    e2[t] = arguments[t];
  return function(t2) {
    return concat$1(t2, of.apply(void 0, __spreadArray([], __read(e2))));
  };
}
function every(e2, t) {
  return operate(function(r2, n) {
    var i = 0;
    r2.subscribe(new OperatorSubscriber(n, function(o) {
      e2.call(t, o, i++, r2) || (n.next(!1), n.complete());
    }, function() {
      n.next(!0), n.complete();
    }));
  });
}
function exhaustAll() {
  return operate(function(e2, t) {
    var r2 = !1, n = null;
    e2.subscribe(new OperatorSubscriber(t, function(e3) {
      n || (n = innerFrom(e3).subscribe(new OperatorSubscriber(t, void 0, function() {
        n = null, r2 && t.complete();
      })));
    }, function() {
      r2 = !0, !n && t.complete();
    }));
  });
}
var exhaust = exhaustAll;
function exhaustMap(e2, t) {
  return t ? function(r2) {
    return r2.pipe(exhaustMap(function(r3, n) {
      return innerFrom(e2(r3, n)).pipe(map(function(e3, i) {
        return t(r3, e3, n, i);
      }));
    }));
  } : operate(function(t2, r2) {
    var n = 0, i = null, o = !1;
    t2.subscribe(new OperatorSubscriber(r2, function(t3) {
      i || (i = new OperatorSubscriber(r2, void 0, function() {
        i = null, o && r2.complete();
      }), innerFrom(e2(t3, n++)).subscribe(i));
    }, function() {
      o = !0, !i && r2.complete();
    }));
  });
}
function expand(e2, t, r2) {
  return t === void 0 && (t = 1 / 0), t = (t || 0) < 1 ? 1 / 0 : t, operate(function(n, i) {
    return mergeInternals(n, i, e2, t, void 0, !0, r2);
  });
}
function finalize(e2) {
  return operate(function(t, r2) {
    try {
      t.subscribe(r2);
    } finally {
      r2.add(e2);
    }
  });
}
function find(e2, t) {
  return operate(createFind(e2, t, "value"));
}
function createFind(e2, t, r2) {
  var n = r2 === "index";
  return function(r3, i) {
    var o = 0;
    r3.subscribe(new OperatorSubscriber(i, function(u) {
      var s = o++;
      e2.call(t, u, s, r3) && (i.next(n ? s : u), i.complete());
    }, function() {
      i.next(n ? -1 : void 0), i.complete();
    }));
  };
}
function findIndex(e2, t) {
  return operate(createFind(e2, t, "index"));
}
function first(e2, t) {
  var r2 = arguments.length >= 2;
  return function(n) {
    return n.pipe(e2 ? filter(function(t2, r3) {
      return e2(t2, r3, n);
    }) : identity, take(1), r2 ? defaultIfEmpty(t) : throwIfEmpty(function() {
      return new EmptyError();
    }));
  };
}
function groupBy(e2, t, r2, n) {
  return operate(function(i, o) {
    var u;
    t && typeof t != "function" ? (r2 = t.duration, u = t.element, n = t.connector) : u = t;
    var s = /* @__PURE__ */ new Map(), a = function(e3) {
      s.forEach(e3), e3(o);
    }, c = function(e3) {
      return a(function(t2) {
        return t2.error(e3);
      });
    }, l = new GroupBySubscriber(o, function(t2) {
      try {
        var i2 = e2(t2), a2 = s.get(i2);
        if (!a2) {
          s.set(i2, a2 = n ? n() : new Subject());
          var f = (p2 = i2, h = a2, (b = new Observable(function(e3) {
            l.activeGroups++;
            var t3 = h.subscribe(e3);
            return function() {
              t3.unsubscribe(), --l.activeGroups == 0 && l.teardownAttempted && l.unsubscribe();
            };
          })).key = p2, b);
          if (o.next(f), r2) {
            var d = new OperatorSubscriber(a2, function() {
              a2.complete(), d == null || d.unsubscribe();
            }, void 0, void 0, function() {
              return s.delete(i2);
            });
            l.add(innerFrom(r2(f)).subscribe(d));
          }
        }
        a2.next(u ? u(t2) : t2);
      } catch (e3) {
        c(e3);
      }
      var p2, h, b;
    }, function() {
      return a(function(e3) {
        return e3.complete();
      });
    }, c, function() {
      return s.clear();
    });
    i.subscribe(l);
  });
}
var GroupBySubscriber = function(e2) {
  function t() {
    var t2 = e2 !== null && e2.apply(this, arguments) || this;
    return t2.activeGroups = 0, t2.teardownAttempted = !1, t2;
  }
  return __extends(t, e2), t.prototype.unsubscribe = function() {
    this.teardownAttempted = !0, this.activeGroups === 0 && e2.prototype.unsubscribe.call(this);
  }, t;
}(OperatorSubscriber);
function isEmpty() {
  return operate(function(e2, t) {
    e2.subscribe(new OperatorSubscriber(t, function() {
      t.next(!1), t.complete();
    }, function() {
      t.next(!0), t.complete();
    }));
  });
}
function takeLast(e2) {
  return e2 <= 0 ? function() {
    return EMPTY;
  } : operate(function(t, r2) {
    var n = [];
    t.subscribe(new OperatorSubscriber(r2, function(t2) {
      n.push(t2), e2 < n.length && n.shift();
    }, function() {
      var e3, t2;
      try {
        for (var i = __values(n), o = i.next(); !o.done; o = i.next()) {
          var u = o.value;
          r2.next(u);
        }
      } catch (t3) {
        e3 = { error: t3 };
      } finally {
        try {
          o && !o.done && (t2 = i.return) && t2.call(i);
        } finally {
          if (e3)
            throw e3.error;
        }
      }
      r2.complete();
    }, void 0, function() {
      n = null;
    }));
  });
}
function last(e2, t) {
  var r2 = arguments.length >= 2;
  return function(n) {
    return n.pipe(e2 ? filter(function(t2, r3) {
      return e2(t2, r3, n);
    }) : identity, takeLast(1), r2 ? defaultIfEmpty(t) : throwIfEmpty(function() {
      return new EmptyError();
    }));
  };
}
function materialize() {
  return operate(function(e2, t) {
    e2.subscribe(new OperatorSubscriber(t, function(e3) {
      t.next(Notification$1.createNext(e3));
    }, function() {
      t.next(Notification$1.createComplete()), t.complete();
    }, function(e3) {
      t.next(Notification$1.createError(e3)), t.complete();
    }));
  });
}
function max(e2) {
  return reduce(isFunction(e2) ? function(t, r2) {
    return e2(t, r2) > 0 ? t : r2;
  } : function(e3, t) {
    return e3 > t ? e3 : t;
  });
}
var flatMap = mergeMap;
function mergeMapTo(e2, t, r2) {
  return r2 === void 0 && (r2 = 1 / 0), isFunction(t) ? mergeMap(function() {
    return e2;
  }, t, r2) : (typeof t == "number" && (r2 = t), mergeMap(function() {
    return e2;
  }, r2));
}
function mergeScan(e2, t, r2) {
  return r2 === void 0 && (r2 = 1 / 0), operate(function(n, i) {
    var o = t;
    return mergeInternals(n, i, function(t2, r3) {
      return e2(o, t2, r3);
    }, r2, function(e3) {
      o = e3;
    }, !1, void 0, function() {
      return o = null;
    });
  });
}
function merge() {
  for (var e2 = [], t = 0; t < arguments.length; t++)
    e2[t] = arguments[t];
  var r2 = popScheduler(e2), n = popNumber(e2, 1 / 0);
  return e2 = argsOrArgArray(e2), operate(function(t2, i) {
    mergeAll(n)(internalFromArray(__spreadArray([t2], __read(e2)), r2)).subscribe(i);
  });
}
function mergeWith() {
  for (var e2 = [], t = 0; t < arguments.length; t++)
    e2[t] = arguments[t];
  return merge.apply(void 0, __spreadArray([], __read(e2)));
}
function min(e2) {
  return reduce(isFunction(e2) ? function(t, r2) {
    return e2(t, r2) < 0 ? t : r2;
  } : function(e3, t) {
    return e3 < t ? e3 : t;
  });
}
function multicast(e2, t) {
  var r2 = isFunction(e2) ? e2 : function() {
    return e2;
  };
  return isFunction(t) ? connect(t, { connector: r2 }) : function(e3) {
    return new ConnectableObservable(e3, r2);
  };
}
function pairwise() {
  return operate(function(e2, t) {
    var r2, n = !1;
    e2.subscribe(new OperatorSubscriber(t, function(e3) {
      var i = r2;
      r2 = e3, n && t.next([i, e3]), n = !0;
    }));
  });
}
function pluck() {
  for (var e2 = [], t = 0; t < arguments.length; t++)
    e2[t] = arguments[t];
  var r2 = e2.length;
  if (r2 === 0)
    throw new Error("list of properties cannot be empty.");
  return map(function(t2) {
    for (var n = t2, i = 0; i < r2; i++) {
      var o = n == null ? void 0 : n[e2[i]];
      if (o === void 0)
        return;
      n = o;
    }
    return n;
  });
}
function publish(e2) {
  return e2 ? function(t) {
    return connect(e2)(t);
  } : function(e3) {
    return multicast(new Subject())(e3);
  };
}
function publishBehavior(e2) {
  return function(t) {
    var r2 = new BehaviorSubject(e2);
    return new ConnectableObservable(t, function() {
      return r2;
    });
  };
}
function publishLast() {
  return function(e2) {
    var t = new AsyncSubject();
    return new ConnectableObservable(e2, function() {
      return t;
    });
  };
}
function publishReplay(e2, t, r2, n) {
  r2 && !isFunction(r2) && (n = r2);
  var i = isFunction(r2) ? r2 : void 0;
  return function(r3) {
    return multicast(new ReplaySubject(e2, t, n), i)(r3);
  };
}
function raceWith() {
  for (var e2 = [], t = 0; t < arguments.length; t++)
    e2[t] = arguments[t];
  return e2.length ? operate(function(t2, r2) {
    raceInit(__spreadArray([t2], __read(e2)))(r2);
  }) : identity;
}
function repeat(e2) {
  return e2 === void 0 && (e2 = 1 / 0), e2 <= 0 ? function() {
    return EMPTY;
  } : operate(function(t, r2) {
    var n, i = 0, o = function() {
      var u = !1;
      n = t.subscribe(new OperatorSubscriber(r2, void 0, function() {
        ++i < e2 ? n ? (n.unsubscribe(), n = null, o()) : u = !0 : r2.complete();
      })), u && (n.unsubscribe(), n = null, o());
    };
    o();
  });
}
function repeatWhen(e2) {
  return operate(function(t, r2) {
    var n, i, o = !1, u = !1, s = !1, a = function() {
      return s && u && (r2.complete(), !0);
    }, c = function() {
      s = !1, n = t.subscribe(new OperatorSubscriber(r2, void 0, function() {
        s = !0, !a() && (i || (i = new Subject(), e2(i).subscribe(new OperatorSubscriber(r2, function() {
          n ? c() : o = !0;
        }, function() {
          u = !0, a();
        }))), i).next();
      })), o && (n.unsubscribe(), n = null, o = !1, c());
    };
    c();
  });
}
function retry(e2) {
  var t;
  e2 === void 0 && (e2 = 1 / 0);
  var r2 = (t = e2 && typeof e2 == "object" ? e2 : { count: e2 }).count, n = r2 === void 0 ? 1 / 0 : r2, i = t.delay, o = t.resetOnSuccess, u = o !== void 0 && o;
  return n <= 0 ? identity : operate(function(e3, t2) {
    var r3, o2 = 0, s = function() {
      var a = !1;
      r3 = e3.subscribe(new OperatorSubscriber(t2, function(e4) {
        u && (o2 = 0), t2.next(e4);
      }, void 0, function(e4) {
        if (o2++ < n) {
          var u2 = function() {
            r3 ? (r3.unsubscribe(), r3 = null, s()) : a = !0;
          };
          if (i != null) {
            var c = typeof i == "number" ? timer(i) : innerFrom(i(e4, o2)), l = new OperatorSubscriber(t2, function() {
              l.unsubscribe(), u2();
            }, function() {
              t2.complete();
            });
            c.subscribe(l);
          } else
            u2();
        } else
          t2.error(e4);
      })), a && (r3.unsubscribe(), r3 = null, s());
    };
    s();
  });
}
function retryWhen(e2) {
  return operate(function(t, r2) {
    var n, i, o = !1, u = function() {
      n = t.subscribe(new OperatorSubscriber(r2, void 0, void 0, function(t2) {
        i || (i = new Subject(), e2(i).subscribe(new OperatorSubscriber(r2, function() {
          return n ? u() : o = !0;
        }))), i && i.next(t2);
      })), o && (n.unsubscribe(), n = null, o = !1, u());
    };
    u();
  });
}
function sample(e2) {
  return operate(function(t, r2) {
    var n = !1, i = null;
    t.subscribe(new OperatorSubscriber(r2, function(e3) {
      n = !0, i = e3;
    })), e2.subscribe(new OperatorSubscriber(r2, function() {
      if (n) {
        n = !1;
        var e3 = i;
        i = null, r2.next(e3);
      }
    }, noop));
  });
}
function sampleTime(e2, t) {
  return t === void 0 && (t = asyncScheduler), sample(interval(e2, t));
}
function scan(e2, t) {
  return operate(scanInternals(e2, t, arguments.length >= 2, !0));
}
function sequenceEqual(e2, t) {
  return t === void 0 && (t = function(e3, t2) {
    return e3 === t2;
  }), operate(function(r2, n) {
    var i = createState(), o = createState(), u = function(e3) {
      n.next(e3), n.complete();
    }, s = function(e3, r3) {
      var i2 = new OperatorSubscriber(n, function(n2) {
        var i3 = r3.buffer, o2 = r3.complete;
        i3.length === 0 ? o2 ? u(!1) : e3.buffer.push(n2) : !t(n2, i3.shift()) && u(!1);
      }, function() {
        e3.complete = !0;
        var t2 = r3.complete, n2 = r3.buffer;
        t2 && u(n2.length === 0), i2 == null || i2.unsubscribe();
      });
      return i2;
    };
    r2.subscribe(s(i, o)), e2.subscribe(s(o, i));
  });
}
function createState() {
  return { buffer: [], complete: !1 };
}
function share(e2) {
  e2 === void 0 && (e2 = {});
  var t = e2.connector, r2 = t === void 0 ? function() {
    return new Subject();
  } : t, n = e2.resetOnError, i = n === void 0 || n, o = e2.resetOnComplete, u = o === void 0 || o, s = e2.resetOnRefCountZero, a = s === void 0 || s;
  return function(e3) {
    var t2 = null, n2 = null, o2 = null, s2 = 0, c = !1, l = !1, f = function() {
      n2 == null || n2.unsubscribe(), n2 = null;
    }, d = function() {
      f(), t2 = o2 = null, c = l = !1;
    }, p2 = function() {
      var e4 = t2;
      d(), e4 == null || e4.unsubscribe();
    };
    return operate(function(e4, h) {
      s2++, l || c || f();
      var b = o2 = o2 != null ? o2 : r2();
      h.add(function() {
        --s2 !== 0 || l || c || (n2 = handleReset(p2, a));
      }), b.subscribe(h), t2 || (t2 = new SafeSubscriber({ next: function(e5) {
        return b.next(e5);
      }, error: function(e5) {
        l = !0, f(), n2 = handleReset(d, i, e5), b.error(e5);
      }, complete: function() {
        c = !0, f(), n2 = handleReset(d, u), b.complete();
      } }), from(e4).subscribe(t2));
    })(e3);
  };
}
function handleReset(e2, t) {
  for (var r2 = [], n = 2; n < arguments.length; n++)
    r2[n - 2] = arguments[n];
  return t === !0 ? (e2(), null) : t === !1 ? null : t.apply(void 0, __spreadArray([], __read(r2))).pipe(take(1)).subscribe(function() {
    return e2();
  });
}
function shareReplay(e2, t, r2) {
  var n, i, o, u = !1;
  return e2 && typeof e2 == "object" ? (o = (n = e2.bufferSize) !== null && n !== void 0 ? n : 1 / 0, t = (i = e2.windowTime) !== null && i !== void 0 ? i : 1 / 0, u = !!e2.refCount, r2 = e2.scheduler) : o = e2 != null ? e2 : 1 / 0, share({ connector: function() {
    return new ReplaySubject(o, t, r2);
  }, resetOnError: !0, resetOnComplete: !1, resetOnRefCountZero: u });
}
function single(e2) {
  return operate(function(t, r2) {
    var n, i = !1, o = !1, u = 0;
    t.subscribe(new OperatorSubscriber(r2, function(s) {
      o = !0, e2 && !e2(s, u++, t) || (i && r2.error(new SequenceError("Too many matching values")), i = !0, n = s);
    }, function() {
      i ? (r2.next(n), r2.complete()) : r2.error(o ? new NotFoundError("No matching values") : new EmptyError());
    }));
  });
}
function skip(e2) {
  return filter(function(t, r2) {
    return e2 <= r2;
  });
}
function skipLast(e2) {
  return e2 <= 0 ? identity : operate(function(t, r2) {
    var n = new Array(e2), i = 0;
    return t.subscribe(new OperatorSubscriber(r2, function(t2) {
      var o = i++;
      if (o < e2)
        n[o] = t2;
      else {
        var u = o % e2, s = n[u];
        n[u] = t2, r2.next(s);
      }
    })), function() {
      n = null;
    };
  });
}
function skipUntil(e2) {
  return operate(function(t, r2) {
    var n = !1, i = new OperatorSubscriber(r2, function() {
      i == null || i.unsubscribe(), n = !0;
    }, noop);
    innerFrom(e2).subscribe(i), t.subscribe(new OperatorSubscriber(r2, function(e3) {
      return n && r2.next(e3);
    }));
  });
}
function skipWhile(e2) {
  return operate(function(t, r2) {
    var n = !1, i = 0;
    t.subscribe(new OperatorSubscriber(r2, function(t2) {
      return (n || (n = !e2(t2, i++))) && r2.next(t2);
    }));
  });
}
function startWith() {
  for (var e2 = [], t = 0; t < arguments.length; t++)
    e2[t] = arguments[t];
  var r2 = popScheduler(e2);
  return operate(function(t2, n) {
    (r2 ? concat$1(e2, t2, r2) : concat$1(e2, t2)).subscribe(n);
  });
}
function switchMap(e2, t) {
  return operate(function(r2, n) {
    var i = null, o = 0, u = !1, s = function() {
      return u && !i && n.complete();
    };
    r2.subscribe(new OperatorSubscriber(n, function(r3) {
      i == null || i.unsubscribe();
      var u2 = 0, a = o++;
      innerFrom(e2(r3, a)).subscribe(i = new OperatorSubscriber(n, function(e3) {
        return n.next(t ? t(r3, e3, a, u2++) : e3);
      }, function() {
        i = null, s();
      }));
    }, function() {
      u = !0, s();
    }));
  });
}
function switchAll() {
  return switchMap(identity);
}
function switchMapTo(e2, t) {
  return isFunction(t) ? switchMap(function() {
    return e2;
  }, t) : switchMap(function() {
    return e2;
  });
}
function switchScan(e2, t) {
  return operate(function(r2, n) {
    var i = t;
    return switchMap(function(t2, r3) {
      return e2(i, t2, r3);
    }, function(e3, t2) {
      return i = t2, t2;
    })(r2).subscribe(n), function() {
      i = null;
    };
  });
}
function takeUntil(e2) {
  return operate(function(t, r2) {
    innerFrom(e2).subscribe(new OperatorSubscriber(r2, function() {
      return r2.complete();
    }, noop)), !r2.closed && t.subscribe(r2);
  });
}
function takeWhile(e2, t) {
  return t === void 0 && (t = !1), operate(function(r2, n) {
    var i = 0;
    r2.subscribe(new OperatorSubscriber(n, function(r3) {
      var o = e2(r3, i++);
      (o || t) && n.next(r3), !o && n.complete();
    }));
  });
}
function tap(e2, t, r2) {
  var n = isFunction(e2) || t || r2 ? { next: e2, error: t, complete: r2 } : e2;
  return n ? operate(function(e3, t2) {
    var r3;
    (r3 = n.subscribe) === null || r3 === void 0 || r3.call(n);
    var i = !0;
    e3.subscribe(new OperatorSubscriber(t2, function(e4) {
      var r4;
      (r4 = n.next) === null || r4 === void 0 || r4.call(n, e4), t2.next(e4);
    }, function() {
      var e4;
      i = !1, (e4 = n.complete) === null || e4 === void 0 || e4.call(n), t2.complete();
    }, function(e4) {
      var r4;
      i = !1, (r4 = n.error) === null || r4 === void 0 || r4.call(n, e4), t2.error(e4);
    }, function() {
      var e4, t3;
      i && ((e4 = n.unsubscribe) === null || e4 === void 0 || e4.call(n)), (t3 = n.finalize) === null || t3 === void 0 || t3.call(n);
    }));
  }) : identity;
}
var defaultThrottleConfig = { leading: !0, trailing: !1 };
function throttle(e2, t) {
  var r2 = t === void 0 ? defaultThrottleConfig : t, n = r2.leading, i = r2.trailing;
  return operate(function(t2, r3) {
    var o = !1, u = null, s = null, a = !1, c = function() {
      s == null || s.unsubscribe(), s = null, i && (d(), a && r3.complete());
    }, l = function() {
      s = null, a && r3.complete();
    }, f = function(t3) {
      return s = innerFrom(e2(t3)).subscribe(new OperatorSubscriber(r3, c, l));
    }, d = function() {
      if (o) {
        o = !1;
        var e3 = u;
        u = null, r3.next(e3), !a && f(e3);
      }
    };
    t2.subscribe(new OperatorSubscriber(r3, function(e3) {
      o = !0, u = e3, (!s || s.closed) && (n ? d() : f(e3));
    }, function() {
      a = !0, (!(i && o && s) || s.closed) && r3.complete();
    }));
  });
}
function throttleTime(e2, t, r2) {
  t === void 0 && (t = asyncScheduler), r2 === void 0 && (r2 = defaultThrottleConfig);
  var n = timer(e2, t);
  return throttle(function() {
    return n;
  }, r2);
}
function timeInterval(e2) {
  return e2 === void 0 && (e2 = async), function(t) {
    return defer(function() {
      return t.pipe(scan(function(t2, r2) {
        var n = t2.current;
        return { value: r2, current: e2.now(), last: n };
      }, { current: e2.now(), value: void 0, last: void 0 }), map(function(e3) {
        var t2 = e3.current, r2 = e3.last, n = e3.value;
        return new TimeInterval(n, t2 - r2);
      }));
    });
  };
}
var TimeInterval = function(e2, t) {
  this.value = e2, this.interval = t;
};
function timeoutWith(e2, t, r2) {
  var n, i, o;
  if (r2 = r2 != null ? r2 : async, isValidDate(e2) ? n = e2 : typeof e2 == "number" && (i = e2), !t)
    throw new TypeError("No observable provided to switch to");
  if (o = function() {
    return t;
  }, n == null && i == null)
    throw new TypeError("No timeout provided.");
  return timeout({ first: n, each: i, scheduler: r2, with: o });
}
function timestamp(e2) {
  return e2 === void 0 && (e2 = dateTimestampProvider), map(function(t) {
    return { value: t, timestamp: e2.now() };
  });
}
function window$1(e2) {
  return operate(function(t, r2) {
    var n = new Subject();
    r2.next(n.asObservable());
    var i = function(e3) {
      n.error(e3), r2.error(e3);
    };
    return t.subscribe(new OperatorSubscriber(r2, function(e3) {
      return n == null ? void 0 : n.next(e3);
    }, function() {
      n.complete(), r2.complete();
    }, i)), e2.subscribe(new OperatorSubscriber(r2, function() {
      n.complete(), r2.next(n = new Subject());
    }, noop, i)), function() {
      n == null || n.unsubscribe(), n = null;
    };
  });
}
function windowCount(e2, t) {
  t === void 0 && (t = 0);
  var r2 = t > 0 ? t : e2;
  return operate(function(t2, n) {
    var i = [new Subject()], o = 0;
    n.next(i[0].asObservable()), t2.subscribe(new OperatorSubscriber(n, function(t3) {
      var u, s;
      try {
        for (var a = __values(i), c = a.next(); !c.done; c = a.next())
          c.value.next(t3);
      } catch (e3) {
        u = { error: e3 };
      } finally {
        try {
          c && !c.done && (s = a.return) && s.call(a);
        } finally {
          if (u)
            throw u.error;
        }
      }
      var l = o - e2 + 1;
      if (l >= 0 && l % r2 == 0 && i.shift().complete(), ++o % r2 == 0) {
        var f = new Subject();
        i.push(f), n.next(f.asObservable());
      }
    }, function() {
      for (; i.length > 0; )
        i.shift().complete();
      n.complete();
    }, function(e3) {
      for (; i.length > 0; )
        i.shift().error(e3);
      n.error(e3);
    }, function() {
      i = null;
    }));
  });
}
function windowTime(e2) {
  for (var t, r2, n = [], i = 1; i < arguments.length; i++)
    n[i - 1] = arguments[i];
  var o = (t = popScheduler(n)) !== null && t !== void 0 ? t : asyncScheduler, u = (r2 = n[0]) !== null && r2 !== void 0 ? r2 : null, s = n[1] || 1 / 0;
  return operate(function(t2, r3) {
    var n2 = [], i2 = !1, a = function(e3) {
      var t3 = e3.window, r4 = e3.subs;
      t3.complete(), r4.unsubscribe(), arrRemove(n2, e3), i2 && c();
    }, c = function() {
      if (n2) {
        var t3 = new Subscription();
        r3.add(t3);
        var i3 = new Subject(), u2 = { window: i3, subs: t3, seen: 0 };
        n2.push(u2), r3.next(i3.asObservable()), t3.add(o.schedule(function() {
          return a(u2);
        }, e2));
      }
    };
    u !== null && u >= 0 ? r3.add(o.schedule(function() {
      c(), !this.closed && r3.add(this.schedule(null, u));
    }, u)) : i2 = !0, c();
    var l = function(e3) {
      return n2.slice().forEach(e3);
    }, f = function(e3) {
      l(function(t3) {
        var r4 = t3.window;
        return e3(r4);
      }), e3(r3), r3.unsubscribe();
    };
    return t2.subscribe(new OperatorSubscriber(r3, function(e3) {
      l(function(t3) {
        t3.window.next(e3), s <= ++t3.seen && a(t3);
      });
    }, function() {
      return f(function(e3) {
        return e3.complete();
      });
    }, function(e3) {
      return f(function(t3) {
        return t3.error(e3);
      });
    })), function() {
      n2 = null;
    };
  });
}
function windowToggle(e2, t) {
  return operate(function(r2, n) {
    var i = [], o = function(e3) {
      for (; 0 < i.length; )
        i.shift().error(e3);
      n.error(e3);
    };
    innerFrom(e2).subscribe(new OperatorSubscriber(n, function(e3) {
      var r3 = new Subject();
      i.push(r3);
      var u, s = new Subscription();
      try {
        u = innerFrom(t(e3));
      } catch (e4) {
        return void o(e4);
      }
      n.next(r3.asObservable()), s.add(u.subscribe(new OperatorSubscriber(n, function() {
        arrRemove(i, r3), r3.complete(), s.unsubscribe();
      }, noop, o)));
    }, noop)), r2.subscribe(new OperatorSubscriber(n, function(e3) {
      var t2, r3, n2 = i.slice();
      try {
        for (var o2 = __values(n2), u = o2.next(); !u.done; u = o2.next())
          u.value.next(e3);
      } catch (e4) {
        t2 = { error: e4 };
      } finally {
        try {
          u && !u.done && (r3 = o2.return) && r3.call(o2);
        } finally {
          if (t2)
            throw t2.error;
        }
      }
    }, function() {
      for (; 0 < i.length; )
        i.shift().complete();
      n.complete();
    }, o, function() {
      for (; 0 < i.length; )
        i.shift().unsubscribe();
    }));
  });
}
function windowWhen(e2) {
  return operate(function(t, r2) {
    var n, i, o = function(e3) {
      n.error(e3), r2.error(e3);
    }, u = function() {
      var t2;
      i == null || i.unsubscribe(), n == null || n.complete(), n = new Subject(), r2.next(n.asObservable());
      try {
        t2 = innerFrom(e2());
      } catch (e3) {
        return void o(e3);
      }
      t2.subscribe(i = new OperatorSubscriber(r2, u, u, o));
    };
    u(), t.subscribe(new OperatorSubscriber(r2, function(e3) {
      return n.next(e3);
    }, function() {
      n.complete(), r2.complete();
    }, o, function() {
      i == null || i.unsubscribe(), n = null;
    }));
  });
}
function withLatestFrom() {
  for (var e2 = [], t = 0; t < arguments.length; t++)
    e2[t] = arguments[t];
  var r2 = popResultSelector(e2);
  return operate(function(t2, n) {
    for (var i = e2.length, o = new Array(i), u = e2.map(function() {
      return !1;
    }), s = !1, a = function(t3) {
      innerFrom(e2[t3]).subscribe(new OperatorSubscriber(n, function(e3) {
        o[t3] = e3, s || u[t3] || (u[t3] = !0, (s = u.every(identity)) && (u = null));
      }, noop));
    }, c = 0; c < i; c++)
      a(c);
    t2.subscribe(new OperatorSubscriber(n, function(e3) {
      if (s) {
        var t3 = __spreadArray([e3], __read(o));
        n.next(r2 ? r2.apply(void 0, __spreadArray([], __read(t3))) : t3);
      }
    }));
  });
}
function zipAll(e2) {
  return joinAllInternals(zip$1, e2);
}
function zip() {
  for (var e2 = [], t = 0; t < arguments.length; t++)
    e2[t] = arguments[t];
  return operate(function(t2, r2) {
    zip$1.apply(void 0, __spreadArray([t2], __read(e2))).subscribe(r2);
  });
}
function zipWith() {
  for (var e2 = [], t = 0; t < arguments.length; t++)
    e2[t] = arguments[t];
  return zip.apply(void 0, __spreadArray([], __read(e2)));
}
Object.freeze({ __proto__: null, Observable, ConnectableObservable, observable, animationFrames, Subject, BehaviorSubject, ReplaySubject, AsyncSubject, asap, asapScheduler, async, asyncScheduler, queue, queueScheduler, animationFrame, animationFrameScheduler, VirtualTimeScheduler, VirtualAction, Scheduler, Subscription, Subscriber, Notification: Notification$1, get NotificationKind() {
  return NotificationKind;
}, pipe, noop, identity, isObservable, lastValueFrom, firstValueFrom, ArgumentOutOfRangeError, EmptyError, NotFoundError, ObjectUnsubscribedError, SequenceError, TimeoutError, UnsubscriptionError, bindCallback, bindNodeCallback, combineLatest: combineLatest$1, concat: concat$1, connectable, defer, empty, forkJoin, from, fromEvent, fromEventPattern, generate, iif, interval, merge: merge$1, never, of, onErrorResumeNext, pairs, partition, race, range, throwError, timer, using, zip: zip$1, scheduled, EMPTY, NEVER, config, audit, auditTime, buffer, bufferCount, bufferTime, bufferToggle, bufferWhen, catchError, combineAll, combineLatestAll, combineLatestWith, concatAll, concatMap, concatMapTo, concatWith, connect, count, debounce, debounceTime, defaultIfEmpty, delay, delayWhen, dematerialize, distinct, distinctUntilChanged, distinctUntilKeyChanged, elementAt, endWith, every, exhaust, exhaustAll, exhaustMap, expand, filter, finalize, find, findIndex, first, groupBy, ignoreElements, isEmpty, last, map, mapTo, materialize, max, mergeAll, flatMap, mergeMap, mergeMapTo, mergeScan, mergeWith, min, multicast, observeOn, pairwise, pluck, publish, publishBehavior, publishLast, publishReplay, raceWith, reduce, repeat, repeatWhen, retry, retryWhen, refCount, sample, sampleTime, scan, sequenceEqual, share, shareReplay, single, skip, skipLast, skipUntil, skipWhile, startWith, subscribeOn, switchAll, switchMap, switchMapTo, switchScan, take, takeLast, takeUntil, takeWhile, tap, throttle, throttleTime, throwIfEmpty, timeInterval, timeout, timeoutWith, timestamp, toArray, window: window$1, windowCount, windowTime, windowToggle, windowWhen, withLatestFrom, zipAll, zipWith });
class Bus {
  constructor() {
    this.agents = {}, this.comm = new Subject();
  }
  setAgentFor(e2, t, r2) {
    this.getActionMapping(e2)[t] = r2;
  }
  getAgentFor(e2, t) {
    return this.getActionMapping(e2)[t];
  }
  publish(e2, t, r2) {
    return Promise.resolve().then(() => {
      var r3;
      return (r3 = this.getAgentFor(e2, t)) !== null && r3 !== void 0 ? r3 : explorer.requestAgentFor(e2, t);
    }).then((n) => {
      const i = n.activate(e2, t, r2);
      return this.comm.next({ res: e2, action: t, input: r2, output: i }), i;
    });
  }
  subscribe(e2, t) {
    return this.comm.asObservable().pipe(filter((r2) => r2.res === e2 && r2.action === t));
  }
  getActionMapping(e2) {
    let t = this.agents[e2];
    if (t === void 0) {
      t = {};
      for (let e3 of Object.values(ACTION))
        t[e3] = null;
      this.agents[e2] = t;
    }
    return t;
  }
}
class BusFactory {
  static get instance() {
    return this._instance = this._instance || new Bus();
  }
}
class ExplorerContext {
  constructor(e2, t) {
    this.latestResults = new Subject(), this.context = null, this.bus = ExplorerFrameworkFactory.instance().getBus(), this.searchParameters = { types: e2, app: t, filters: {}, pagination: { startIdx: 0, pageSize: 20 } };
  }
  clear() {
    this.searchParameters.filters = { owner: !0, shared: !0, public: !0 }, this.searchParameters.pagination.startIdx = 0, this.searchParameters.pagination.pageSize = 20, this.context = null;
  }
  isInitialized() {
    return this.context !== null;
  }
  getContext() {
    if (this.context !== null)
      return this.context;
  }
  getSearchParameters() {
    return this.searchParameters;
  }
  duplicateSearchParameters() {
    return JSON.parse(JSON.stringify(this.searchParameters));
  }
  latestResources() {
    return this.latestResults.asObservable();
  }
  initialize() {
    const e2 = this.duplicateSearchParameters();
    return Promise.resolve().then(() => this.bus.publish(RESOURCE.FOLDER, ACTION.INITIALIZE, e2)).then((t) => {
      if (this.context = t, !this.context)
        throw new Error(ERROR_CODE.UNKNOWN);
      return this.latestResults.next({ input: e2, output: this.context }), this.context;
    });
  }
  getResources() {
    const e2 = this.duplicateSearchParameters();
    return this.bus.publish(RESOURCE.FOLDER, ACTION.SEARCH, e2).then((t) => {
      let r2 = t;
      if (!r2)
        throw new Error(ERROR_CODE.UNKNOWN);
      return this.latestResults.next({ input: e2, output: r2 }), r2;
    });
  }
  getSubFolders(e2) {
    throw new Error("Method not implemented.");
  }
  createFolder(e2, t, r2) {
    const n = { app: this.searchParameters.app, name: r2, parentId: t, type: e2 };
    return this.bus.publish(RESOURCE.FOLDER, ACTION.CREATE, n).then((e3) => {
      let t2 = e3;
      if (!t2)
        throw new Error(ERROR_CODE.UNKNOWN);
      return t2;
    });
  }
  updateFolder(e2, t, r2, n) {
    const i = { folderId: e2, app: this.searchParameters.app, name: n, parentId: r2, type: t };
    return this.bus.publish(RESOURCE.FOLDER, ACTION.UPD_PROPS, i).then((e3) => {
      let t2 = e3;
      if (!t2)
        throw new Error(ERROR_CODE.UNKNOWN);
      return t2;
    });
  }
  copy(e2, t, r2) {
    const n = { folderId: e2, resourceIds: t, folderIds: r2 };
    return this.bus.publish(RESOURCE.FOLDER, ACTION.COPY, n).then((e3) => {
    });
  }
  move(e2, t, r2) {
    const n = { folderId: e2, resourceIds: t, folderIds: r2 };
    return this.bus.publish(RESOURCE.FOLDER, ACTION.MOVE, n).then((e3) => {
    });
  }
  delete(e2, t) {
    const r2 = { resourceIds: e2, folderIds: t };
    return this.bus.publish(RESOURCE.FOLDER, ACTION.DELETE, r2).then((e3) => {
    });
  }
  manageProperties(e2, t) {
    const r2 = { resources: t };
    return this.bus.publish(e2, ACTION.MANAGE, r2).then((e3) => {
      let t2 = e3;
      if (!t2)
        throw new Error(ERROR_CODE.UNKNOWN);
      return t2;
    });
  }
  updateProperties(e2, t, r2) {
    const n = { resources: t, props: r2 };
    return this.bus.publish(e2, ACTION.UPD_PROPS, n).then((e3) => {
      let t2 = e3;
      if (!t2)
        throw new Error(ERROR_CODE.UNKNOWN);
      return t2;
    });
  }
}
class ExplorerFramework {
  get agentLoader() {
    return this._agentLoader || (this._agentLoader = new AgentLoader()), this._agentLoader;
  }
  setAgentLoader(e2) {
    e2 && (this._agentLoader = e2);
  }
  requestAgentFor(e2, t) {
    return this.agentLoader.load(e2).then(() => {
      let r2 = this.getBus().getAgentFor(e2, t);
      if (!r2)
        throw new Error(ERROR_CODE.AGENT_NOT_FOUND);
      return r2;
    });
  }
  createContext(e2, t) {
    return new ExplorerContext(e2, t);
  }
  getBus() {
    return BusFactory.instance;
  }
}
const explorer = new ExplorerFramework();
class ExplorerFrameworkFactory {
  static instance() {
    return explorer;
  }
}
const RESOURCE = { FOLDER: "folder", BLOG: "blog", EXERCISE: "exercise" }, appNameForResource = { folder: APP.EXPLORER, blog: APP.BLOG, exercise: APP.EXERCIZER }, ACTION = { INITIALIZE: "initialize", SEARCH: "search", CREATE: "create", OPEN: "open", MANAGE: "manage", UPD_PROPS: "properties", COMMENT: "comment", DELETE: "delete", MOVE: "move", COPY: "copy", EXPORT: "export", SHARE: "share", PUBLISH: "publish", PRINT: "print" }, ASYNC_DATA_NAME = { SESSION_READY: "sessionReady", LANG_READY: "langReady", SKIN_READY: "skinReady", OVERRIDE_READY: "overrideReady" };
class Promisified {
  constructor() {
    this._promise = new Promise((e2, t) => {
      this._resolution = e2, this._rejection = t;
    });
  }
  get promise() {
    return this._promise;
  }
  resolve(e2) {
    this._resolution && this._resolution(e2);
  }
  reject(e2) {
    this._rejection && this._rejection(e2);
  }
}
class NotifyFramework {
  constructor() {
    this.promises = {}, this.subject = new Subject();
  }
  asyncData(e2) {
    return this.promises[e2] === void 0 && (this.promises[e2] = new Promisified()), this.promises[e2];
  }
  onSessionReady() {
    return this.asyncData(ASYNC_DATA_NAME.SESSION_READY);
  }
  onLangReady() {
    return this.asyncData(ASYNC_DATA_NAME.LANG_READY);
  }
  onSkinReady() {
    return this.asyncData(ASYNC_DATA_NAME.SKIN_READY);
  }
  onOverridesReady() {
    return this.asyncData(ASYNC_DATA_NAME.OVERRIDE_READY);
  }
  promisify() {
    return new Promisified();
  }
  events() {
    return this.subject;
  }
}
const notify = new NotifyFramework();
class NotifyFrameworkFactory {
  static instance() {
    return notify;
  }
}
class TransportFramework {
  constructor() {
    this._http = new Http();
  }
  get http() {
    return this._http;
  }
  newHttpInstance(e2) {
    return new Http(e2);
  }
}
const transport = new TransportFramework();
class TransportFrameworkFactory {
  static instance() {
    return transport;
  }
}
const http$2 = transport.http;
class Session {
  constructor() {
    this._me = null, this._currentLanguage = "", this._notLoggedIn = !0;
  }
  get currentLanguage() {
    return this._currentLanguage;
  }
  get notLoggedIn() {
    return this._notLoggedIn;
  }
  get description() {
    return this._description;
  }
  get avatarUrl() {
    let e2 = this.description.photo;
    return (!e2 || e2 === "no-avatar.jpg" || e2 === "no-avatar.svg") && (e2 = ConfigurationFrameworkFactory.instance().Platform.theme.basePath + "/img/illustrations/no-avatar.svg"), e2;
  }
  get user() {
    return this._me;
  }
  get currentApp() {
    return configure.Platform.apps.currentApp;
  }
  initialize() {
    return http$2.get("/auth/oauth2/userinfo").then((e2) => (this.setCurrentModel(e2), this._notLoggedIn ? this.loadDefaultLanguage() : this.loadUserLanguage())).then((e2) => (this.setCurrentLanguage(e2), this.loadDescription())).then(() => {
      notify.onSessionReady().resolve(this._me);
    }).catch((e2) => {
      notify.onSessionReady().reject(e2);
    });
  }
  setCurrentModel(e2) {
    this._me = e2, this._notLoggedIn = !(e2 && e2.sessionMetadata && e2.sessionMetadata.userId);
  }
  hasWorkflow(e2) {
    var t;
    return e2 === void 0 || ((t = this._me) === null || t === void 0 ? void 0 : t.authorizedActions.findIndex((t2) => t2.name === e2)) !== -1;
  }
  hasRight(e2, t) {
    if (t === "owner")
      return e2.owner && e2.owner.userId === this._me.userId;
    const r2 = t.right || t, n = e2.shared.filter((e3) => (this._me.groupsIds || []).indexOf(e3.groupId) !== -1 || e3.userId === this._me.userId).find((e3) => e3[r2] || e3.manager) !== void 0, i = !t.workflow || this.hasWorkflow(t.workflow);
    return n && i;
  }
  get latestQuotaAndUsage() {
    return http$2.get(`/workspace/quota/user/${this._me.userId}`).then((e2) => (this._description && (this._description.quota = e2.quota, this._description.storage = e2.storage), e2)).catch(() => ({ quota: 0, storage: 0 }));
  }
  setCurrentLanguage(e2) {
    this._currentLanguage = e2, notify.onLangReady().resolve(e2);
  }
  loadDefaultLanguage() {
    return http$2.get("/locale").then((e2) => e2.locale).catch(() => this._currentLanguage);
  }
  loadUserLanguage() {
    return http$2.get("/userbook/preference/language").then((e2) => {
      try {
        return JSON.parse(e2.preference)["default-domain"];
      } catch {
        return this.loadDefaultLanguage();
      }
    }).catch(() => this.loadDefaultLanguage());
  }
  loadDescription() {
    return Promise.all([http$2.get("/userbook/api/person", { requestName: "refreshAvatar" }), http$2.get("/directory/userbook/" + this._me.userId)]).then((e2) => (e2[0].status === "ok" && e2[0].result && e2[0].result.length > 0 ? this._description = e2[0].result[0] : this._description = {}, this._description.type && !this._description.profiles && (this._description.profiles = this._description.type), Object.assign(this._description, e2[1]), this._description));
  }
  getEmailValidationInfos() {
    return http$2.get("/directory/user/mailstate");
  }
  checkEmail(e2) {
    return http$2.put("/directory/user/mailstate", { email: e2 });
  }
  tryEmailValidation(e2) {
    return http$2.post("/directory/user/mailstate", { key: e2 });
  }
}
class SessionFramework {
  constructor() {
    this.session = new Session();
  }
  initialize() {
    return this.session.initialize();
  }
}
const session = new SessionFramework();
class Theme {
  constructor() {
    this.skinName = "", this.themeName = "", this.skin = "raw", this.themeUrl = "/assets/themes/raw/default/", this.templateOverrides = {}, this.portalTemplate = "/assets/themes/raw/portal.html", this.basePath = "", this.logoutCallback = "/", this.skins = [], this.is1D = !1, this.is2D = !1, this._onSkinReady = notify.onSkinReady(), this._onOverrideReady = notify.onOverridesReady();
  }
  initialize(e2) {
    return notify.onSessionReady().promise.then(() => this.load(e2));
  }
  get version() {
    return configure.Platform.deploymentTag;
  }
  get cdnDomain() {
    return configure.Platform.cdnDomain;
  }
  onFullyReady() {
    return __awaiter(this, void 0, void 0, function* () {
      return yield this._loaded, this;
    });
  }
  onSkinReady() {
    return this._onSkinReady.promise;
  }
  onOverrideReady() {
    return this._onOverrideReady.promise;
  }
  getConf(e2) {
    var t;
    return __awaiter(this, void 0, void 0, function* () {
      return this._conf = (t = this._conf) !== null && t !== void 0 ? t : yield transport.http.getScript("/assets/theme-conf.js", { queryParams: { v: e2 != null ? e2 : this.version } }, "exports.conf"), this._conf;
    });
  }
  load(e2) {
    return e2 = e2 != null ? e2 : this.version, this._loaded || (this._loaded = (session.session.notLoggedIn ? this.loadDisconnected(e2) : this.loadConnected(e2)).then(() => __awaiter(this, void 0, void 0, function* () {
      var e3, t;
      const r2 = yield this.listSkins();
      this.is1D = ((e3 = r2.find((e4) => e4.child === this.skin)) === null || e3 === void 0 ? void 0 : e3.parent) === "panda", this.is2D = ((t = r2.find((e4) => e4.child === this.skin)) === null || t === void 0 ? void 0 : t.parent) === "theme-open-ent";
    }))), this._loaded;
  }
  loadDisconnected(e2) {
    return new Promise((t, r2) => {
      transport.http.get("/skin", { queryParams: { v: this.version } }).then((r3) => {
        this.skin = r3.skin, this.themeUrl = `${this.cdnDomain}/assets/themes/${r3.skin}/skins/default/`, this.basePath = this.themeUrl + "../../", this._onSkinReady.resolve(this), transport.http.get(`/assets/themes/${r3.skin}/template/override.json`, { disableNotifications: !0, queryParams: { v: e2 } }).then((e3) => {
          this.templateOverrides = e3, this._onOverrideReady.resolve(e3), t();
        }).catch((e3) => {
          if (transport.http.latestResponse.status !== 404)
            throw e3;
          t();
        });
      }).catch((e3) => {
        this._onSkinReady.reject(e3), this._onOverrideReady.reject(e3), r2();
      });
    });
  }
  loadConnected(e2) {
    return new Promise((t, r2) => {
      this.loadDefaultTheme(e2).then(() => {
        this._onSkinReady.resolve(this), transport.http.get(`/assets/themes/${this.skin}/template/override.json`, { disableNotifications: !0, queryParams: { v: e2 } }).then((e3) => {
          this.templateOverrides = e3, this._onOverrideReady.resolve(e3), t();
        }).catch((e3) => {
          if (transport.http.latestResponse.status !== 404)
            throw e3;
          t(), this._onSkinReady.reject(e3), this._onOverrideReady.reject(e3);
        });
      });
    });
  }
  loadDefaultTheme(e2) {
    return __awaiter(this, void 0, void 0, function* () {
      return session.session.notLoggedIn ? Promise.reject() : transport.http.get("/theme", { queryParams: { _: e2 } }).then((e3) => {
        this.skinName = e3.skinName, this.themeName = e3.themeName, this.themeUrl = e3.skin, this.basePath = `${this.cdnDomain}${this.themeUrl}../../`, this.skin = this.themeUrl.split("/assets/themes/")[1].split("/")[0], this.portalTemplate = `${this.cdnDomain}/assets/themes/${this.skin}/portal.html`, this.logoutCallback = e3.logoutCallback;
      });
    });
  }
  listThemes() {
    return transport.http.get("/themes");
  }
  setDefaultTheme(e2) {
    return __awaiter(this, void 0, void 0, function* () {
      yield transport.http.get("/userbook/api/edit-userbook-info?prop=theme-" + this.skin + "&value=" + e2._id), yield this.loadDefaultTheme(this.version);
    });
  }
  listSkins() {
    return this.skins.length > 0 ? Promise.resolve(this.skins) : this.getConf().then((e2) => {
      const t = e2.overriding.find((e3) => e3.child === this.skin);
      return t != null && t.group ? this.skins = this.skins.concat(e2.overriding.filter((e3) => e3.group === t.group)) : this.skins = this.skins.concat(e2.overriding), this.skins;
    });
  }
  getHelpPath() {
    var e2;
    return __awaiter(this, void 0, void 0, function* () {
      const t = (yield this.listSkins()).find((e3) => e3.child === this.skin);
      return (e2 = t == null ? void 0 : t.help) !== null && e2 !== void 0 ? e2 : "/help";
    });
  }
}
const bundle = {}, promises = {}, defaultDiacriticsRemovalMap = [{ base: "A", letters: /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g }, { base: "AA", letters: /[\uA732]/g }, { base: "AE", letters: /[\u00C6\u01FC\u01E2]/g }, { base: "AO", letters: /[\uA734]/g }, { base: "AU", letters: /[\uA736]/g }, { base: "AV", letters: /[\uA738\uA73A]/g }, { base: "AY", letters: /[\uA73C]/g }, { base: "B", letters: /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g }, { base: "C", letters: /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g }, { base: "D", letters: /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g }, { base: "DZ", letters: /[\u01F1\u01C4]/g }, { base: "Dz", letters: /[\u01F2\u01C5]/g }, { base: "E", letters: /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g }, { base: "F", letters: /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g }, { base: "G", letters: /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g }, { base: "H", letters: /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g }, { base: "I", letters: /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g }, { base: "J", letters: /[\u004A\u24BF\uFF2A\u0134\u0248]/g }, { base: "K", letters: /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g }, { base: "L", letters: /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g }, { base: "LJ", letters: /[\u01C7]/g }, { base: "Lj", letters: /[\u01C8]/g }, { base: "M", letters: /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g }, { base: "N", letters: /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g }, { base: "NJ", letters: /[\u01CA]/g }, { base: "Nj", letters: /[\u01CB]/g }, { base: "O", letters: /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g }, { base: "OI", letters: /[\u01A2]/g }, { base: "OO", letters: /[\uA74E]/g }, { base: "OU", letters: /[\u0222]/g }, { base: "P", letters: /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g }, { base: "Q", letters: /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g }, { base: "R", letters: /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g }, { base: "S", letters: /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g }, { base: "T", letters: /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g }, { base: "TZ", letters: /[\uA728]/g }, { base: "U", letters: /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g }, { base: "V", letters: /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g }, { base: "VY", letters: /[\uA760]/g }, { base: "W", letters: /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g }, { base: "X", letters: /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g }, { base: "Y", letters: /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g }, { base: "Z", letters: /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g }, { base: "a", letters: /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g }, { base: "aa", letters: /[\uA733]/g }, { base: "ae", letters: /[\u00E6\u01FD\u01E3]/g }, { base: "ao", letters: /[\uA735]/g }, { base: "au", letters: /[\uA737]/g }, { base: "av", letters: /[\uA739\uA73B]/g }, { base: "ay", letters: /[\uA73D]/g }, { base: "b", letters: /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g }, { base: "c", letters: /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g }, { base: "d", letters: /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g }, { base: "dz", letters: /[\u01F3\u01C6]/g }, { base: "e", letters: /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g }, { base: "f", letters: /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g }, { base: "g", letters: /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g }, { base: "h", letters: /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g }, { base: "hv", letters: /[\u0195]/g }, { base: "i", letters: /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g }, { base: "j", letters: /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g }, { base: "k", letters: /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g }, { base: "l", letters: /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g }, { base: "lj", letters: /[\u01C9]/g }, { base: "m", letters: /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g }, { base: "n", letters: /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g }, { base: "nj", letters: /[\u01CC]/g }, { base: "o", letters: /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g }, { base: "oi", letters: /[\u01A3]/g }, { base: "ou", letters: /[\u0223]/g }, { base: "oo", letters: /[\uA74F]/g }, { base: "p", letters: /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g }, { base: "q", letters: /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g }, { base: "r", letters: /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g }, { base: "s", letters: /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g }, { base: "t", letters: /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g }, { base: "tz", letters: /[\uA729]/g }, { base: "u", letters: /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g }, { base: "v", letters: /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g }, { base: "vy", letters: /[\uA761]/g }, { base: "w", letters: /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g }, { base: "x", letters: /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g }, { base: "y", letters: /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g }, { base: "z", letters: /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g }];
class Idiom {
  translate(e2, t) {
    let r2 = bundle[e2 = e2 != null ? e2 : ""] === void 0 ? e2 : bundle[e2];
    if (t && typeof t == "object")
      for (let e3 in t)
        t[e3] !== void 0 && (r2 = r2.replace(new RegExp("\\${" + e3 + "}", "g"), "" + t[e3]));
    return r2;
  }
  addBundlePromise(e2) {
    return this.loadBundlePromise(session.session.currentLanguage, e2);
  }
  addBundle(e2, t) {
    this.loadBundle(session.session.currentLanguage, e2, t);
  }
  loadBundlePromise(e2, t) {
    return this.loadBundle(e2, t), promises[t];
  }
  loadBundle(e2, t, r2) {
    const n = promises[t];
    if (n)
      r2 && n.then(r2).catch(r2);
    else {
      const n2 = new Promisified();
      promises[t] = n2.promise;
      const i = {};
      e2 && (i["Accept-Language"] = e2), transport.http.get(t, { headers: i }).then((e3) => {
        Object.assign(bundle, e3), typeof r2 == "function" && r2(), n2.resolve();
      }).catch((e3) => {
        typeof r2 == "function" && r2(), n2.reject();
      });
    }
  }
  addTranslations(e2, t) {
    notify.onLangReady().promise.then((r2) => {
      this.loadBundle(r2, e2 + "/" + r2 + ".json", t);
    });
  }
  addAllTranslations(e2) {
    return e2 && e2.length > 0 ? notify.onLangReady().promise.then((t) => Promise.all(e2.map((e3) => this.loadBundlePromise(t, e3 + "/" + t + ".json")))).then(() => {
    }) : Promise.reject();
  }
  addKeys(e2) {
    for (var t in e2)
      typeof bundle[t] != "string" && (bundle[t] = e2[t]);
  }
  removeAccents(e2) {
    for (var t = 0; t < defaultDiacriticsRemovalMap.length; t++)
      e2 = e2.replace(defaultDiacriticsRemovalMap[t].letters, defaultDiacriticsRemovalMap[t].base);
    return e2;
  }
}
class UserPreferences {
  constructor() {
    this.data = {};
  }
  get(e2) {
    return this.data[e2];
  }
  load(e2, t) {
    return transport.http.get("/userbook/preference/" + e2).then((e3) => {
      try {
        return JSON.parse(e3.preference);
      } catch {
        return t != null ? t : {};
      }
    }).then((t2) => (this.data[e2] = t2 != null ? t2 : {}, t2));
  }
  update(e2, t) {
    return t !== void 0 && (this.data[e2] = t), this;
  }
  save(e2) {
    return transport.http.putJson("/userbook/preference/" + e2, this.data[e2]);
  }
}
class User {
  constructor() {
    this._me = null, this._keepOpenOnLogout = !1, this._preferences = new UserPreferences(), this._bookmarkedApps = [];
  }
  get keepOpenOnLogout() {
    return this._keepOpenOnLogout;
  }
  get preferences() {
    return this._preferences;
  }
  get bookmarkedApps() {
    return this._bookmarkedApps;
  }
  initialize(e2) {
    return this.loadPublicConf(), notify.onSessionReady().promise.then((e3) => {
      e3 && this.setCurrentModel(e3);
    });
  }
  setCurrentModel(e2) {
    this._me = e2, this._preferences = new UserPreferences(), this.loadBookmarks();
  }
  loadPublicConf() {
    return transport.http.get("/conf/public").then((e2) => (this._keepOpenOnLogout = (e2 == null ? void 0 : e2.keepOpenOnLogout) || !1, e2));
  }
  loadBookmarks() {
    return __awaiter(this, void 0, void 0, function* () {
      yield transport.http.get("/userbook/preference/apps").then((e2) => {
        e2.preference || (e2.preference = null);
        const t = JSON.parse(e2.preference);
        let r2;
        if (t && t.length && typeof t.concat == "function")
          return this._bookmarkedApps = t, r2 = { bookmarks: t.map((e3) => e3.name), applications: [] }, void transport.http.putJson("/userbook/preference/apps", r2);
        r2 = t, r2 || (r2 = { bookmarks: [], applications: [] });
        let n = !0;
        const i = [];
        r2.bookmarks.forEach((e3, t2) => {
          const r3 = this._me.apps.find((t3) => t3.name === e3);
          if (r3) {
            let e4 = Object.assign({}, r3);
            this._bookmarkedApps.push(e4);
          } else
            i.push(e3), n = !1;
        }), i.forEach((e3) => {
          let t2 = r2.bookmarks.indexOf(e3);
          t2 !== -1 && r2.bookmarks.splice(t2, 1);
        }), n || transport.http.putJson("/userbook/preference/apps", r2);
      });
    });
  }
  loadAppPrefs(e2) {
    return this.preferences.load(e2, {});
  }
  saveAppPrefs(e2) {
    return this.preferences.save(e2);
  }
  loadLanguage() {
    return this.preferences.load("language", { "default-domain": session.session.currentLanguage }).then((e2) => e2["default-domain"]);
  }
  saveLanguage(e2) {
    return this.preferences.update("language", { "default-domain": e2 }).save("language");
  }
}
const http$1 = transport == null ? void 0 : transport.http;
class AppConf {
  constructor() {
    this._publicConf = {};
  }
  get currentApp() {
    var e2;
    return (e2 = this._currentApp) !== null && e2 !== void 0 ? e2 : null;
  }
  setCurrentApp(e2) {
    return this._currentApp = e2, this;
  }
  initialize(e2, t = !1) {
    return __awaiter(this, void 0, void 0, function* () {
      t || this.setCurrentApp(e2), yield Promise.all([this.getPublicConf(e2), this.loadI18n(e2)]);
    });
  }
  getPublicConf(e2) {
    return __awaiter(this, void 0, void 0, function* () {
      return this._publicConf[e2] || (this._publicConf[e2] = yield http$1.get(`/${e2}/conf/public`, { queryParams: { _: configure.Platform.deploymentTag } })), this._publicConf[e2];
    });
  }
  loadI18n(e2) {
    return notify.onLangReady().promise.then((t) => configure.Platform.idiom.addBundlePromise(`/${e2}/i18n`));
  }
}
class Analytics {
  constructor() {
    this._status = "void";
  }
  get status() {
    return this._status;
  }
  xiti() {
    return this.parametersWithCheck("xiti", !1);
  }
  parameters(e2) {
    return this.parametersWithCheck(e2, !0);
  }
  parametersWithCheck(e2, t) {
    return __awaiter(this, void 0, void 0, function* () {
      return this.initialize().promise.then((r2) => t && r2.type !== e2 && r2.type !== "multiple" ? void 0 : r2[e2]);
    });
  }
  initialize() {
    return this._params || (this._params = notify.promisify(), this._status = "pending", Promise.all([transport.http.get("/analyticsConf"), transport.http.get("/xiti/config")]).then((e2) => __awaiter(this, void 0, void 0, function* () {
      var t;
      if (!e2 || !e2[0] || !e2[0].type)
        throw ERROR_CODE.MALFORMED_DATA;
      e2[1] && e2[1].active && (e2[0].xiti = yield this.initializeXiti(e2[1])), (t = this._params) === null || t === void 0 || t.resolve(e2[0]), this._status = "ready";
    })).catch((e2) => {
      var t;
      throw this._status = "failed", (t = this._params) === null || t === void 0 || t.reject(), e2;
    })), this._params;
  }
  initializeXiti(e2) {
    var t;
    return __awaiter(this, void 0, void 0, function* () {
      if (!e2.structureMap || !configure.Platform.apps.currentApp)
        return;
      const r2 = yield notify.onSessionReady().promise, n = session.session.description;
      let i;
      for (let t2 of r2.structures) {
        const r3 = e2.structureMap[t2];
        if (r3 && r3.collectiviteId && r3.UAI) {
          i = r3;
          break;
        }
      }
      if (!i || !i.active)
        return;
      const o = yield configure.Platform.apps.getPublicConf(configure.Platform.apps.currentApp);
      if (!o)
        return;
      const u = o.xiti;
      if (!!u && !!u.LIBELLE_SERVICE && !!i.UAI)
        return { LIBELLE_SERVICE: u.LIBELLE_SERVICE, TYPE: u.OUTIL ? "TIERS" : "NATIF", OUTIL: u.OUTIL ? u.OUTIL : "", STRUCT_ID: i.collectiviteId, STRUCT_UAI: i.UAI, PROJET: i.projetId ? i.projetId : e2.ID_PROJET, EXPLOITANT: e2.ID_EXPLOITANT, PLATFORME: i.plateformeId ? i.plateformeId : e2.ID_PLATEFORME, ID_PERSO: function(e3) {
          let t2 = "";
          for (let r3 = 0; r3 < e3.length; r3++)
            t2 += e3.charCodeAt(r3);
          return t2;
        }(r2.userId), PROFILE: n.profiles && n.profiles.length > 0 && (t = { Student: "ELEVE", Teacher: "ENSEIGNANT", Relative: "PARENT", Personnel: "ADMIN_VIE_SCOL_TECH", Guest: "AUTRE" }[n.profiles[0]]) !== null && t !== void 0 ? t : "" };
    });
  }
}
class ConfigurationFramework {
  constructor() {
    this.Platform = { deploymentTag: "", cdnDomain: "", apps: new AppConf(), theme: new Theme(), analytics: new Analytics(), idiom: new Idiom(), listLanguages: () => transport.http.get("/languages") }, this.School = {}, this.User = new User();
  }
  initialize(e2, t) {
    return __awaiter(this, void 0, void 0, function* () {
      if (!e2) {
        const t2 = (e3) => (e3 < 10 ? "0" : "") + e3.toFixed(0), r3 = new Date(), n = r3.getFullYear(), i = r3.getMonth() + 1, o = r3.getDate();
        r3.getMinutes(), e2 = `${n}${t2(i)}${t2(o)}`;
      }
      const r2 = e2;
      this.Platform.deploymentTag = e2, typeof t == "string" && t.length > 0 && (this.Platform.cdnDomain = t), transport.http.setCdn(this.Platform.cdnDomain), yield Promise.all([this.Platform.theme.initialize(r2), notify.onSessionReady().promise.then((e3) => this.Platform.idiom.addBundlePromise("/i18n")), this.User.initialize(r2)]);
    });
  }
}
const configure = new ConfigurationFramework();
class ConfigurationFrameworkFactory {
  static instance() {
    return configure;
  }
}
class SessionFrameworkFactory {
  static instance() {
    return session;
  }
}
var _a;
transport == null || transport.http;
(_a = session == null ? void 0 : session.session) === null || _a === void 0 || _a.user;
function useOdeFactory() {
  function conf() {
    return ConfigurationFrameworkFactory.instance();
  }
  function explore() {
    return ExplorerFrameworkFactory.instance();
  }
  function notif() {
    return NotifyFrameworkFactory.instance();
  }
  function http() {
    return TransportFrameworkFactory.instance().http;
  }
  function session2() {
    return SessionFrameworkFactory.instance().session;
  }
  return {
    conf,
    explore,
    notif,
    http,
    session: session2
  };
}
function useOdeIcons() {
  const { conf } = useOdeFactory(), iconOfWidget = {
    "last-infos-widget": "ic-widget-actualites",
    birthday: "ic-star",
    "calendar-widget": "ic-widget-calendar",
    "carnet-de-bord": "ic-widget-carnet-de-bord",
    "record-me": "ic-widget-microphone",
    mood: "ic-star",
    "my-apps": "ic-widget-apps",
    notes: "ic-widget-notes",
    "rss-widget": "ic-widget-rss",
    "bookmark-widget": "ic-widget-signets",
    qwant: "ic-widget-qwant",
    "qwant-junior": "ic-widget-qwant",
    "agenda-widget": "ic-widget-agenda",
    "cursus-widget": "ic-widget-aide-devoirs",
    "maxicours-widget": "ic-widget-maxicours",
    "school-widget": "ic-widget-schoolbook",
    universalis: "ic-widget-universalis"
  };
  function getIconCode(app) {
    const { icon } = app;
    let appCode = icon.trim().toLowerCase() || "";
    switch (appCode && appCode.length > 0 ? appCode.endsWith("-large") && (appCode = appCode.replace("-large", "")) : appCode = app.displayName.trim().toLowerCase(), appCode = conf().Platform.idiom.removeAccents(appCode), appCode) {
      case "admin.title":
        appCode = "admin";
        break;
      case "banques des savoirs":
        appCode = "banquesavoir";
        break;
      case "collaborativewall":
        appCode = "collaborative-wall";
        break;
      case "communaut\xE9s":
        appCode = "community";
        break;
      case "directory.user":
        appCode = "userbook";
        break;
      case "emploi du temps":
        appCode = "edt";
        break;
      case "messagerie":
        appCode = "conversation";
        break;
      case "news":
        appCode = "actualites";
        break;
      case "homeworks":
      case "cahier de texte":
        appCode = "cahier-de-texte";
        break;
      case "diary":
      case "cahier de texte 2d":
        appCode = "cahier-textes";
        break;
    }
    return appCode;
  }
  function isIconUrl(icon) {
    return icon && (icon.startsWith("/") || icon.startsWith("http://") || icon.startsWith("https://"));
  }
  function getIconClass(app) {
    const appCode = getIconCode(app);
    return appCode ? `color-app-${appCode}` : "color-app-default";
  }
  function getWidgetIconClass(widget) {
    return iconOfWidget[widget.platformConf.name];
  }
  return {
    getIconClass,
    getIconCode,
    getWidgetIconClass,
    isIconUrl
  };
}
function useTitle() {
  const documentDefined = typeof document < "u", [title, setTitle] = useState(() => document.title);
  return useEffect(() => {
    !documentDefined || setTitle(document.title);
  }, []), {
    title
  };
}
function r(e2) {
  var t, f, n = "";
  if (typeof e2 == "string" || typeof e2 == "number")
    n += e2;
  else if (typeof e2 == "object")
    if (Array.isArray(e2))
      for (t = 0; t < e2.length; t++)
        e2[t] && (f = r(e2[t])) && (n && (n += " "), n += f);
    else
      for (t in e2)
        e2[t] && (n && (n += " "), n += t);
  return n;
}
function clsx() {
  for (var e2, t, f = 0, n = ""; f < arguments.length; )
    (e2 = arguments[f++]) && (t = r(e2)) && (n && (n += " "), n += t);
  return n;
}
const AppCardContext = createContext(null);
function useAppCardContext() {
  const context2 = useContext(AppCardContext);
  if (!context2)
    throw new Error(
      "AppCard compound components cannot be rendered outside the AppCard component"
    );
  return context2;
}
function AppIcon({
  title,
  size = "24",
  color = "currentColor",
  ...props
}) {
  const { isIconUrl } = useOdeIcons(), { code, displayName, icon } = useAppCardContext(), classes = clsx("icon", code || "");
  return isIconUrl(icon) ? /* @__PURE__ */ React.createElement("img", { src: icon, alt: displayName, width: size, height: size }) : /* @__PURE__ */ React.createElement(
    "svg",
    {
      width: size,
      height: size,
      fill: color,
      xmlns: "http://www.w3.org/2000/svg",
      "aria-hidden": "true",
      className: classes,
      ...props
    },
    title ? /* @__PURE__ */ React.createElement("title", null, title) : null,
    /* @__PURE__ */ React.createElement("use", { xlinkHref: `apps.svg#${code || "placeholder"}` })
  );
}
const Heading = forwardRef(
  ({
    level: Component = "h1",
    headingStyle = "h1",
    children,
    ...restProps
  }, ref) => /* @__PURE__ */ React.createElement(Component, { ref, className: headingStyle, ...restProps }, children)
);
Heading.displayName = "Heading";
const Heading$1 = Heading, Root = forwardRef(
  ({
    app,
    as,
    children,
    headingStyle,
    isHeading = !1,
    level,
    variant = "title",
    ...restProps
  }, ref) => {
    const { getIconClass, getIconCode } = useOdeIcons(), { name: name2 } = app, displayName = name2 || "Application", classes = clsx(
      "app-card app-card-react",
      {
        "app-card-title": variant === "title"
      },
      getIconClass(app)
    ), value = useMemo(
      () => ({
        icon: app.icon,
        displayName: app.icon,
        code: getIconCode(app)
      }),
      []
    ), Component = as || "div";
    return /* @__PURE__ */ React.createElement(AppCardContext.Provider, { value }, /* @__PURE__ */ React.createElement(Component, { ref, className: classes, ...restProps }, children, isHeading ? /* @__PURE__ */ React.createElement(Heading$1, { level, headingStyle }, displayName) : /* @__PURE__ */ React.createElement("p", null, displayName)));
  }
), AppCard = Object.assign({}, Root, {
  Icon: AppIcon
}), AppCard$1 = AppCard, Loading = forwardRef(
  (props, ref) => {
    const {
      loading,
      loadingIcon,
      loadingPosition = "left",
      children,
      ...restProps
    } = props, getLoadingIcon = () => {
      let icon;
      return loadingIcon ? icon = loadingIcon : icon = /* @__PURE__ */ React.createElement(Loader, { ...restProps, "aria-label": "Loading" }), icon;
    }, classes = clsx("loading", {
      "is-loading": loading
    });
    return /* @__PURE__ */ React.createElement("div", { className: classes, role: "status", ref }, (!loadingPosition || loadingPosition === "left") && getLoadingIcon(), children, loadingPosition === "right" && getLoadingIcon());
  }
);
Loading.displayName = "Loading";
const Loading$1 = Loading, Button = forwardRef((props, ref) => {
  const {
    color = "primary",
    children,
    loading = !1,
    loadingIcon,
    loadingPosition,
    leftIcon,
    rightIcon,
    variant = "filled",
    ariaLabel,
    ...restProps
  } = props, classes = clsx("btn", {
    "btn-icon": !children,
    [`btn-filled btn-${color}`]: variant === "filled",
    [`btn-${variant}-${color}`]: variant === "outline" || variant === "ghost",
    "btn-loading": loading
  });
  return /* @__PURE__ */ React.createElement("button", { ref, className: classes, "aria-label": ariaLabel, ...restProps }, loading ? /* @__PURE__ */ React.createElement(
    Loading$1,
    {
      loading: !0,
      loadingIcon,
      loadingPosition
    },
    children
  ) : /* @__PURE__ */ React.createElement("span", null, leftIcon, children, rightIcon));
});
Button.displayName = "Button";
const Button$1 = Button, SvgCommunity = ({
  title,
  titleId,
  ...props
}) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    "aria-labelledby": titleId,
    ...props
  },
  title ? /* @__PURE__ */ React.createElement("title", { id: titleId }, title) : null,
  /* @__PURE__ */ React.createElement(
    "path",
    {
      d: "M19.935 17.51c.725 0 1.348.264 1.868.792.52.529.78 1.162.78 1.898 0 .737-.26 1.37-.78 1.898-.52.529-1.135.793-1.844.793-.71 0-1.333-.264-1.869-.793a2.52 2.52 0 0 1-.78-1.922c0-.288.063-.6.19-.936l-3.997-2.931c-.773.8-1.703 1.2-2.79 1.2-1.089 0-2.019-.392-2.791-1.176-.773-.785-1.167-1.738-1.183-2.86 0-.143.024-.352.071-.624l-3.168-1.057a1.248 1.248 0 0 1-.852.337c-.378 0-.693-.129-.946-.385a1.315 1.315 0 0 1-.378-.96c0-.385.126-.698.378-.938.253-.24.568-.368.946-.384.316 0 .584.104.804.312.221.208.37.457.45.745l3.192 1.08a3.798 3.798 0 0 1 1.443-1.56 3.839 3.839 0 0 1 2.033-.577c.82 0 1.577.248 2.27.745l4.706-4.781c-.252-.48-.378-.921-.378-1.321 0-.737.26-1.37.78-1.898.52-.529 1.143-.793 1.869-.793.725 0 1.34.264 1.844.793.505.528.765 1.16.78 1.898a2.417 2.417 0 0 1-.78 1.873c-.536.513-1.159.777-1.868.793-.41 0-.844-.136-1.3-.408l-4.707 4.804c.49.705.733 1.474.733 2.307 0 .592-.134 1.177-.402 1.753l3.997 2.907c.52-.416 1.08-.624 1.679-.624Z",
      fill: "currentColor"
    }
  )
), SvgCommunity$1 = SvgCommunity, SvgDisconnect = ({
  title,
  titleId,
  ...props
}) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    "aria-labelledby": titleId,
    ...props
  },
  title ? /* @__PURE__ */ React.createElement("title", { id: titleId }, title) : null,
  /* @__PURE__ */ React.createElement(
    "path",
    {
      d: "M22.995 13.153c0 1.393-.29 2.722-.872 3.987a10.627 10.627 0 0 1-2.336 3.292c-.975.929-2.147 1.665-3.516 2.21-1.369.544-2.79.817-4.26.817-1.472 0-2.9-.273-4.287-.817-1.386-.545-2.55-1.281-3.49-2.21a12.338 12.338 0 0 1-2.362-3.291A8.11 8.11 0 0 1 1 13.152c0-1.634.385-3.164 1.155-4.589.77-1.425 1.848-2.634 3.234-3.627.411-.289.873-.4 1.386-.337.514.064.907.289 1.181.673.308.368.428.793.36 1.273-.07.48-.309.857-.72 1.13a6.993 6.993 0 0 0-2.155 2.426 6.383 6.383 0 0 0-.18 5.717 6.98 6.98 0 0 0 1.566 2.186c.65.609 1.428 1.097 2.335 1.466a7.498 7.498 0 0 0 2.85.552 7.31 7.31 0 0 0 2.823-.552 8.296 8.296 0 0 0 2.36-1.466 6.04 6.04 0 0 0 1.567-2.186c.359-.849.547-1.738.564-2.666 0-1.09-.256-2.107-.77-3.051-.513-.945-1.232-1.754-2.156-2.427a1.752 1.752 0 0 1-.719-1.129c-.085-.464.035-.889.36-1.273.29-.384.693-.609 1.206-.673.514-.064.967.048 1.36.337 1.386.977 2.464 2.186 3.234 3.627a9.599 9.599 0 0 1 1.155 4.589ZM13.833 2.846v8.6c0 .465-.18.866-.54 1.202-.359.336-.786.505-1.283.505-.496 0-.932-.169-1.309-.505-.376-.336-.556-.737-.539-1.201v-8.6c0-.465.18-.865.54-1.202.359-.336.795-.504 1.308-.504.514 0 .941.168 1.284.504.342.337.521.737.539 1.201Z",
      fill: "currentColor"
    }
  )
), SvgDisconnect$1 = SvgDisconnect, SvgHome = ({
  title,
  titleId,
  ...props
}) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    "aria-labelledby": titleId,
    ...props
  },
  title ? /* @__PURE__ */ React.createElement("title", { id: titleId }, title) : null,
  /* @__PURE__ */ React.createElement(
    "path",
    {
      d: "M20.584 13.536v7.458c0 .28-.098.512-.294.699a1.062 1.062 0 0 1-.667.307H13.91v-5.978h-3.817V22H4.383a.848.848 0 0 1-.668-.307 1.162 1.162 0 0 1-.293-.699v-7.569l8.567-7.375 8.568 7.375c.018.018.027.055.027.111Zm3.31-1.09-.908 1.146a.543.543 0 0 1-.32.168h-.054a.59.59 0 0 1-.32-.084L11.989 4.682 1.687 13.676a.505.505 0 0 1-.347.084.544.544 0 0 1-.32-.168l-.935-1.145a.524.524 0 0 1-.08-.363.589.589 0 0 1 .16-.335l10.703-9.33c.32-.28.694-.419 1.121-.419.427 0 .81.14 1.148.419l3.63 3.156V2.56c0-.15.044-.27.133-.363a.458.458 0 0 1 .347-.14h2.856c.143 0 .258.046.347.14a.504.504 0 0 1 .134.363v6.34l3.256 2.85c.107.074.16.186.16.335 0 .149-.036.27-.107.363Z",
      fill: "currentColor"
    }
  )
), SvgHome$1 = SvgHome, SvgMyApps = ({
  title,
  titleId,
  ...props
}) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    "aria-labelledby": titleId,
    ...props
  },
  title ? /* @__PURE__ */ React.createElement("title", { id: titleId }, title) : null,
  /* @__PURE__ */ React.createElement(
    "path",
    {
      d: "M1.898 22.555c-.072-.145-.096-1.37-.048-2.691l.048-2.402h5.261v5.26l-2.595.049c-1.994.048-2.594 0-2.666-.216Zm7.76 0c-.049-.145-.073-1.37-.049-2.691l.072-2.402h5.238v5.26l-2.571.049c-2.018.048-2.595 0-2.69-.216Zm7.759 0c-.048-.145-.072-1.37-.048-2.691l.072-2.402h5.237v5.26l-2.57.049c-1.994.048-2.595 0-2.691-.216Zm-15.52-7.76c-.071-.168-.095-1.37-.047-2.69l.048-2.403h5.261v5.261l-2.595.048c-1.994.048-2.594 0-2.666-.216Zm7.76 0c-.048-.168-.072-1.37-.048-2.69l.072-2.403h5.238v5.261l-2.571.048c-2.018.048-2.595 0-2.69-.216Zm7.76 0c-.048-.168-.072-1.37-.048-2.69l.072-2.403h5.237v5.261l-2.57.048c-1.994.048-2.595 0-2.691-.216ZM1.897 7.011c-.071-.144-.095-1.345-.047-2.666l.048-2.402h5.261V7.18l-2.595.072c-1.994.048-2.594 0-2.666-.24Zm7.76 0c-.048-.144-.072-1.345-.048-2.666l.072-2.402h5.238V7.18l-2.571.072c-2.018.048-2.595 0-2.69-.24Zm7.76 0c-.048-.144-.072-1.345-.048-2.666l.072-2.402h5.237V7.18l-2.57.072c-1.994.048-2.595 0-2.691-.24Z",
      fill: "currentColor"
    }
  )
), SvgMyApps$1 = SvgMyApps, SvgNeoAssistance = ({
  title,
  titleId,
  ...props
}) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    "aria-labelledby": titleId,
    ...props
  },
  title ? /* @__PURE__ */ React.createElement("title", { id: titleId }, title) : null,
  /* @__PURE__ */ React.createElement(
    "path",
    {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12ZM7.123 7.667C8.276 5.958 9.745 5 12.013 5 14.425 5 17 6.941 17 9.5c0 2.113-1.377 2.932-2.418 3.552-.633.376-1.142.68-1.142 1.154v.169a.693.693 0 0 1-.682.703h-2.06a.693.693 0 0 1-.681-.703v-.287c0-1.768 1.269-2.5 2.266-3.075l.073-.042c.863-.499 1.392-.838 1.392-1.499 0-.874-1.082-1.454-1.956-1.454-1.112 0-1.64.53-2.351 1.449a.668.668 0 0 1-.945.121L7.27 8.63a.718.718 0 0 1-.147-.963ZM9.76 17.97c0-1.12.883-2.03 1.969-2.03 1.085 0 1.968.91 1.968 2.03 0 1.119-.883 2.029-1.968 2.029-1.086 0-1.969-.91-1.969-2.03Z",
      fill: "currentColor"
    }
  )
), SvgNeoAssistance$1 = SvgNeoAssistance, SvgNeoMessaging = ({
  title,
  titleId,
  ...props
}) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    "aria-labelledby": titleId,
    ...props
  },
  title ? /* @__PURE__ */ React.createElement("title", { id: titleId }, title) : null,
  /* @__PURE__ */ React.createElement(
    "path",
    {
      d: "m.5 21.257 7.46-8.216 4.052 2.403 4.052-2.403 7.46 8.216H.5Zm0-2.738V8.573l5.848 3.531L.5 18.52Zm0-12.084V3.048h23.023v3.387l-11.511 6.847L.5 6.435Zm17.176 5.67 5.848-3.532v9.946l-5.848-6.415Z",
      fill: "currentColor"
    }
  )
), SvgNeoMessaging$1 = SvgNeoMessaging, SvgNewRelease = ({
  title,
  titleId,
  ...props
}) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    width: "24",
    height: "24",
    "aria-hidden": "true",
    "aria-labelledby": titleId,
    ...props
  },
  title ? /* @__PURE__ */ React.createElement("title", { id: titleId }, title) : null,
  /* @__PURE__ */ React.createElement(
    "path",
    {
      fill: "currentColor",
      d: "M13.07 13.07V6.54h-2.14v6.53h2.14zm0 4.4v-2.2h-2.14v2.2h2.14zM24 12l-2.65 3.01.35 4.04-3.93.86-2.04 3.48L12 21.8l-3.73 1.6-2.04-3.42-3.93-.92.35-4.04L0 12l2.65-3.06-.35-3.99 3.93-.86L8.27.6 12 2.2 15.73.6l2.04 3.48 3.93.86L21.34 9z"
    }
  )
), SvgNewRelease$1 = SvgNewRelease, SvgOneMessaging = ({
  title,
  titleId,
  ...props
}) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    "aria-labelledby": titleId,
    ...props
  },
  title ? /* @__PURE__ */ React.createElement("title", { id: titleId }, title) : null,
  /* @__PURE__ */ React.createElement(
    "path",
    {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M5.051 12.366a455.802 455.802 0 0 1-2.746-1.822A6.543 6.543 0 0 1 .74 9.067C.248 8.44.002 7.859.002 7.322a2.7 2.7 0 0 1 .141-.905c.098-.286.242-.542.424-.752C.935 5.222 1.462 5 2.15 5h19.7c.541-.016 1.071.195 1.507.6.424.4.636.882.636 1.446 0 .673-.218 1.317-.657 1.93a6.217 6.217 0 0 1-1.632 1.567c-3.358 2.226-5.447 3.61-6.267 4.156l-.242.167-.323.222a15.448 15.448 0 0 1-1.42.902 4.052 4.052 0 0 1-.77.345 2.215 2.215 0 0 1-.67.115h-.026a2.222 2.222 0 0 1-.67-.116 4.052 4.052 0 0 1-.77-.344c-.272-.154-.506-.29-.697-.415a30.199 30.199 0 0 1-.723-.487c-.288-.2-.477-.33-.565-.389-.81-.545-1.98-1.323-3.51-2.334Zm10.943 3.962c1.517-1.052 3.74-2.524 6.667-4.416.478-.306.927-.68 1.339-1.113v10.16c0 .564-.209 1.044-.63 1.446-.437.405-.97.614-1.512.594H2.149c-.545.02-1.08-.192-1.52-.601C.21 21.995 0 21.52 0 20.95V10.8c.416.437.871.81 1.356 1.113 3.232 2.099 5.45 3.571 6.656 4.416.512.358.926.637 1.243.837a7.7 7.7 0 0 0 1.265.614c.475.198.97.303 1.47.313h.026c.5-.01.995-.115 1.47-.313a7.647 7.647 0 0 0 1.265-.614c.32-.2.735-.479 1.243-.837Z",
      fill: "currentColor"
    }
  )
), SvgOneMessaging$1 = SvgOneMessaging, SvgOneProfile = ({
  title,
  titleId,
  ...props
}) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    width: "24",
    height: "24",
    "aria-hidden": "true",
    "aria-labelledby": titleId,
    ...props
  },
  title ? /* @__PURE__ */ React.createElement("title", { id: titleId }, title) : null,
  /* @__PURE__ */ React.createElement("g", { clipPath: "url(#one-profile_svg__a)" }, /* @__PURE__ */ React.createElement(
    "path",
    {
      fill: "currentColor",
      d: "M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24Zm0 4.65a4.26 4.26 0 1 1 0 8.51 4.26 4.26 0 0 1 0-8.51Zm0 16.64a9.27 9.27 0 0 1-7.09-3.3 5.4 5.4 0 0 1 4.77-2.9c.11 0 .23.03.34.06.63.2 1.29.33 1.98.33.7 0 1.35-.13 1.98-.33.11-.03.23-.05.34-.05a5.4 5.4 0 0 1 4.77 2.89 9.27 9.27 0 0 1-7.09 3.3Z"
    }
  )),
  /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("clipPath", { id: "one-profile_svg__a" }, /* @__PURE__ */ React.createElement("path", { fill: "#fff", d: "M0 0h24v24H0z" })))
), SvgOneProfile$1 = SvgOneProfile, SvgProfile = ({
  title,
  titleId,
  ...props
}) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    "aria-labelledby": titleId,
    ...props
  },
  title ? /* @__PURE__ */ React.createElement("title", { id: titleId }, title) : null,
  /* @__PURE__ */ React.createElement(
    "path",
    {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M22.308 18.368A13.406 13.406 0 0 1 12.154 23 13.406 13.406 0 0 1 2 18.368c1.528-2.63 7.136-3.927 10.154-3.927s8.625 1.296 10.154 3.927ZM6.91 6.41c.004 2.948 2.348 5.335 5.243 5.33h.008c2.895-.004 5.239-2.39 5.235-5.338C17.397 3.45 15.053 1 12.154 1 9.255 1 6.91 3.45 6.91 6.402v.008Z",
      fill: "currentColor"
    }
  )
), SvgProfile$1 = SvgProfile, SvgSearch = ({
  title,
  titleId,
  ...props
}) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    "aria-labelledby": titleId,
    ...props
  },
  title ? /* @__PURE__ */ React.createElement("title", { id: titleId }, title) : null,
  /* @__PURE__ */ React.createElement(
    "path",
    {
      d: "M1.27 11.552a7.745 7.745 0 0 1 0-4.156c.38-1.377 1.095-2.579 2.149-3.604a7.928 7.928 0 0 1 2.716-1.777c1.02-.4 2.074-.6 3.161-.6 1.07 0 2.115.2 3.136.6 1.02.4 1.926.993 2.716 1.777a7.904 7.904 0 0 1 1.902 2.86 7.812 7.812 0 0 1 .518 3.29 7.647 7.647 0 0 1-.889 3.171c.461.129.865.36 1.21.697l4.297 4.156c.576.56.864 1.241.864 2.042 0 .801-.288 1.482-.864 2.042-.576.56-1.276.841-2.099.841-.823 0-1.523-.28-2.099-.84l-4.272-4.18a2.423 2.423 0 0 1-.74-1.178 8.302 8.302 0 0 1-3.68.84c-1.087 0-2.14-.2-3.16-.6a8.102 8.102 0 0 1-2.717-1.753 7.854 7.854 0 0 1-2.149-3.628Zm2.495-2.066c0 1.49.535 2.755 1.605 3.796 1.086 1.04 2.395 1.561 3.926 1.561 1.515 0 2.807-.52 3.877-1.561 1.07-1.041 1.613-2.307 1.63-3.796.016-1.49-.527-2.755-1.63-3.796-1.087-1.057-2.379-1.585-3.877-1.585-1.515 0-2.823.528-3.926 1.585C4.3 6.731 3.765 7.996 3.765 9.486Z",
      fill: "currentColor"
    }
  )
), SvgSearch$1 = SvgSearch, SvgUserbook = ({
  title,
  titleId,
  ...props
}) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    width: "24",
    height: "24",
    "aria-hidden": "true",
    "aria-labelledby": titleId,
    ...props
  },
  title ? /* @__PURE__ */ React.createElement("title", { id: titleId }, title) : null,
  /* @__PURE__ */ React.createElement(
    "path",
    {
      d: "M0 24.58V.53h24.05v4.28h-2.62V7.1h2.62v4.28h-2.62v2.35h2.62V18h-2.62v2.3h2.62v4.29H0zm4.64-6.85h12.12V14l-4.5-2.67q.9-.46 1.4-1.3t.53-1.85q0-1.4-1.01-2.43T10.7 4.72 8.25 5.75 7.24 8.18q0 1.03.53 1.85t1.4 1.3L4.63 14v3.73z",
      fill: "currentColor"
    }
  )
), SvgUserbook$1 = SvgUserbook;
function Logo({
  url: url2,
  is1d,
  translate = "Retour accueil"
}) {
  const classes = clsx("navbar-brand d-none d-md-block"), logo = `logo ${is1d ? "ONE" : "NEO"}`;
  return /* @__PURE__ */ React.createElement("a", { className: classes, href: "/", "aria-label": translate }, /* @__PURE__ */ React.createElement("img", { className: "logo", src: url2, alt: logo }));
}
function NavLink({
  link,
  className,
  children,
  button,
  translate
}) {
  const classes = clsx(className, {
    "nav-link": !button,
    button
  });
  return /* @__PURE__ */ React.createElement("a", { href: link, className: classes }, children, translate && /* @__PURE__ */ React.createElement("span", null, translate));
}
const Header = ({ is1d = !1 }) => {
  const welcomeUser = "Bonjour Support ONE, bienvenue !", { title } = useTitle(), [isCollapsed, setIsCollapsed] = useState(!0);
  function toggleCollapsedNav() {
    setIsCollapsed(!isCollapsed);
  }
  const classes = clsx("header header-react", {
    "no-2d": is1d,
    "no-1d": !is1d
  });
  return /* @__PURE__ */ React.createElement("header", { className: classes }, is1d ? /* @__PURE__ */ React.createElement("div", { className: "container-fluid" }, /* @__PURE__ */ React.createElement("nav", { className: "navbar" }, /* @__PURE__ */ React.createElement("a", { className: "navbar-title d-md-none text-truncate", href: "/" }, title), /* @__PURE__ */ React.createElement("div", { className: "d-none d-md-inline-flex gap-12 align-items-center" }, /* @__PURE__ */ React.createElement(SvgProfile$1, { className: "icon profile" }), /* @__PURE__ */ React.createElement("span", { className: "navbar-text" }, welcomeUser)), /* @__PURE__ */ React.createElement("ul", { className: "navbar-nav", "aria-label": "navigation principale" }, /* @__PURE__ */ React.createElement("li", { className: "nav-item" }, /* @__PURE__ */ React.createElement("a", { href: "/", className: "nav-link" }, /* @__PURE__ */ React.createElement(SvgOneMessaging$1, { className: "icon notification" }), /* @__PURE__ */ React.createElement("span", { className: "position-absolute badge rounded-pill bg-danger" }, 2, /* @__PURE__ */ React.createElement("span", { className: "visually-hidden" }, "Messages")))), /* @__PURE__ */ React.createElement("li", { className: "nav-item" }, /* @__PURE__ */ React.createElement("a", { href: "/", className: "nav-link" }, /* @__PURE__ */ React.createElement(SvgOneProfile$1, { className: "icon user" }), /* @__PURE__ */ React.createElement("span", { className: "visually-hidden" }, "Profil"))), /* @__PURE__ */ React.createElement("li", { className: "nav-item" }, /* @__PURE__ */ React.createElement("a", { href: "/", className: "nav-link" }, /* @__PURE__ */ React.createElement(SvgNeoAssistance$1, { className: "icon help" }), /* @__PURE__ */ React.createElement("span", { className: "visually-hidden" }, "Assistance"))), /* @__PURE__ */ React.createElement("li", { className: "nav-item" }, /* @__PURE__ */ React.createElement("a", { href: "/", className: "nav-link" }, /* @__PURE__ */ React.createElement(SvgDisconnect$1, { className: "icon logout" }), /* @__PURE__ */ React.createElement("span", { className: "visually-hidden" }, "D\xE9connexion"))), /* @__PURE__ */ React.createElement("li", { className: "nav-item d-md-none" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      className: "nav-link btn btn-naked",
      type: "button",
      "aria-controls": "navbarCollapsed",
      "aria-expanded": !isCollapsed,
      "aria-label": "Navigation secondaire",
      onClick: toggleCollapsedNav
    },
    /* @__PURE__ */ React.createElement(
      RafterDown,
      {
        className: "icon rafter-down",
        width: "20",
        height: "20"
      }
    )
  )))), /* @__PURE__ */ React.createElement(
    "nav",
    {
      className: "no-2d navbar navbar-secondary navbar-expand-md",
      "aria-label": "navigation secondaire"
    },
    /* @__PURE__ */ React.createElement(
      "div",
      {
        className: `collapse navbar-collapse ${isCollapsed ? "" : "show"}`,
        id: "navbarCollapsed"
      },
      /* @__PURE__ */ React.createElement(
        Logo,
        {
          is1d: !0,
          url: "/assets/logo-one.png",
          translate: "Retour accueil"
        }
      ),
      /* @__PURE__ */ React.createElement("ul", { className: "navbar-nav gap-8" }, /* @__PURE__ */ React.createElement("li", { className: "nav-item" }, /* @__PURE__ */ React.createElement("a", { href: "/", className: "button" }, /* @__PURE__ */ React.createElement(SvgNewRelease$1, { color: "#fff", className: "d-md-none" }), /* @__PURE__ */ React.createElement("span", { className: "d-inline-block" }, "Quoi de neuf ?"))), /* @__PURE__ */ React.createElement("li", { className: "nav-item" }, /* @__PURE__ */ React.createElement("a", { href: "/", className: "button" }, /* @__PURE__ */ React.createElement(SvgUserbook$1, { color: "#fff", className: "d-md-none" }), /* @__PURE__ */ React.createElement("span", { className: "d-inline-block" }, "La classe"))), /* @__PURE__ */ React.createElement("li", { className: "nav-item" }, /* @__PURE__ */ React.createElement("a", { href: "/", className: "button" }, /* @__PURE__ */ React.createElement(SvgMyApps$1, { color: "#fff", className: "d-md-none" }), /* @__PURE__ */ React.createElement("span", { className: "d-inline-block" }, "Mes applis"))))
    )
  )) : /* @__PURE__ */ React.createElement("nav", { className: "navbar navbar-expand-md" }, /* @__PURE__ */ React.createElement("div", { className: "container-fluid" }, /* @__PURE__ */ React.createElement(
    Logo,
    {
      url: "https://recette.opendigitaleducation.com/assets/themes/cg77/img/illustrations/logo.png",
      translate: "Retour accueil"
    }
  ), /* @__PURE__ */ React.createElement("a", { href: "/", className: "navbar-title d-md-none" }, title), /* @__PURE__ */ React.createElement("div", { className: "navbar-nav" }, /* @__PURE__ */ React.createElement(NavLink, { link: "/", translate: "Home" }, /* @__PURE__ */ React.createElement(SvgHome$1, { color: "#fff" })), /* @__PURE__ */ React.createElement(NavLink, { link: "/welcome", translate: "Applications" }, /* @__PURE__ */ React.createElement(SvgMyApps$1, { color: "#fff" })), /* @__PURE__ */ React.createElement(NavLink, { link: "/", translate: "Conversation" }, /* @__PURE__ */ React.createElement(SvgNeoMessaging$1, { color: "#fff" })), /* @__PURE__ */ React.createElement(NavLink, { link: "/", translate: "Assistance" }, /* @__PURE__ */ React.createElement(SvgNeoAssistance$1, { color: "#fff" })), /* @__PURE__ */ React.createElement("div", { className: "dropdown" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      className: "btn btn-naked d-md-none",
      type: "button",
      "aria-controls": "dropdown-navbar",
      "aria-expanded": !isCollapsed,
      "aria-label": "Ouvrir sous-menu",
      onClick: toggleCollapsedNav
    },
    /* @__PURE__ */ React.createElement(
      RafterDown,
      {
        className: "icon rafter-down",
        width: "20",
        height: "20",
        color: "#fff"
      }
    )
  ), /* @__PURE__ */ React.createElement(
    "div",
    {
      className: `dropdown-menu dropdown-menu-end ${isCollapsed ? "" : "show"}`,
      id: "dropdown-navbar"
    },
    /* @__PURE__ */ React.createElement(
      NavLink,
      {
        link: "/",
        className: "dropdown-item",
        translate: "Communaut\xE9s"
      },
      /* @__PURE__ */ React.createElement(SvgCommunity$1, { className: "icon community" })
    ),
    /* @__PURE__ */ React.createElement(
      NavLink,
      {
        link: "/searchengine",
        className: "dropdown-item",
        translate: "Search"
      },
      /* @__PURE__ */ React.createElement(SvgSearch$1, { className: "icon search" })
    ),
    /* @__PURE__ */ React.createElement(
      NavLink,
      {
        link: "/userbook/mon-compte",
        className: "dropdown-item",
        translate: "Mon compte"
      },
      /* @__PURE__ */ React.createElement(SvgProfile$1, { className: "icon user" })
    ),
    /* @__PURE__ */ React.createElement("hr", { className: "dropdown-divider" }),
    /* @__PURE__ */ React.createElement(
      NavLink,
      {
        link: "/",
        className: "dropdown-item",
        translate: "D\xE9connexion"
      },
      /* @__PURE__ */ React.createElement(SvgDisconnect$1, { className: "icon logout" })
    )
  ))))));
}, Header$1 = Header;
export {
  AppCard$1 as AppCard,
  Button$1 as Button,
  Header$1 as Header,
  Heading$1 as Heading,
  Loading$1 as Loading
};
