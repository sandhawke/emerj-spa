# emerj-spa
[![NPM version][npm-image]][npm-url]

Tiny framework for single-page apps using emerj

----

[Emerj](https://npmjs.org/package/emerj) is perfect and brilliant and
awesome and when I use it in Single Page Apps, I tend to write the
same code over and over again.  This is that code. (I didn't write
emerj. I once wrote something like it, but emerj is better.)

See example apps.  I'll document this later, if it seems to work out.

Maybe start with:

```terminal
$ curl -O https://raw.githubusercontent.com/sandhawke/emerj-spa/master/index.html
$ curl -O https://raw.githubusercontent.com/sandhawke/emerj-spa/master/index.js
$ watchify -v --debug index.js -o _bundle.js &
$ opn index.html
```

You can also run it directly in node for testing:

```terminal
$ node index.js
running simulated browser app for node
wrote page HTML to _page_snapshot.html
wrote page HTML to _page_snapshot.html
wrote page HTML to _page_snapshot.html
wrote page HTML to _page_snapshot.html
wrote page HTML to _page_snapshot.html
wrote page HTML to _page_snapshot.html
^C
$ cat _page_snapshot.html 
<!doctype html><html><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
</head><body><div id="root"><p>This text has been rendered 6 times</p></div></bo
dy></html>
```

[npm-image]: https://img.shields.io/npm/v/emerj-spa.svg?style=flat-square
[npm-url]: https://npmjs.org/package/emerj-spa
