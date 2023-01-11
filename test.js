const test = require('brittle')
const nodePath = require('path')
const pearPath = require('./index.js')

/*
node:
C:\\foo.html and C:\\foo.HTML refer to the same file
Trailing directory separators are ignored
*/

test('export based on platform', function (t) {
  if (process.platform === 'win32') {
    t.is(pearPath, pearPath.win32)
    t.not(pearPath, pearPath.posix)
  } else {
    t.is(pearPath, pearPath.posix)
    t.not(pearPath, pearPath.win32)
  }
})

test('basename', async function (t) {
  const filenamePosix = '/tmp/file.html'
  const filenameWin32 = 'C:\\temp\\file.html'

  t.is(pearPath.basename(filenamePosix), nodePath.basename(filenamePosix))
  t.is(pearPath.basename(filenameWin32), nodePath.basename(filenameWin32))
})

test('basename suffix', async function (t) {
  const filenamePosix = '/tmp/file.html'
  const filenameWin32 = 'C:\\temp\\file.html'

  t.is(pearPath.basename(filenamePosix, '.html'), nodePath.basename(filenamePosix, '.html'))
  t.is(pearPath.basename(filenameWin32, '.html'), nodePath.basename(filenameWin32, '.html'))
})

test('basename suffix is case-sensitive', async function (t) {
  const filenamePosix = '/tmp/file.HTML'
  const filenameWin32 = 'C:\\temp\\file.HTML'

  t.is(pearPath.basename(filenamePosix, '.html'), nodePath.basename(filenamePosix, '.html'))
  t.is(pearPath.basename(filenameWin32, '.html'), nodePath.basename(filenameWin32, '.html'))
})

test('delimiter', function (t) {
  t.is(pearPath.delimiter, nodePath.delimiter)
})

test('dirname', function (t) {
  const dirnamePosix = '/foo/bar/baz/asdf/quux'
  const dirnameWin32 = 'C:\\foo\\bar\\baz\\asdf\\quux'

  // + Trailing directory separators are ignored
  t.is(pearPath.dirname(dirnamePosix), nodePath.dirname(dirnamePosix))
  t.is(pearPath.dirname(dirnameWin32), nodePath.dirname(dirnameWin32))
})

test('extname', function (t) {
  t.is(pearPath.extname('index.html'), nodePath.extname('index.html'))
  t.is(pearPath.extname('index.coffee.md'), nodePath.extname('index.coffee.md'))
  t.is(pearPath.extname('index.'), nodePath.extname('index.'))
  t.is(pearPath.extname('index'), nodePath.extname('index'))
  t.is(pearPath.extname('.index'), nodePath.extname('.index'))
  t.is(pearPath.extname('.index.md'), nodePath.extname('.index.md'))
})

test.skip('format', function (t) {})

test('isAbsolute', function (t) {
  t.is(pearPath.isAbsolute(''), nodePath.isAbsolute(''))
  t.is(pearPath.isAbsolute('.'), nodePath.isAbsolute('.'))

  t.is(pearPath.isAbsolute('/foo/bar'), nodePath.isAbsolute('/foo/bar'))
  t.is(pearPath.isAbsolute('/baz/..'), nodePath.isAbsolute('/baz/..'))
  t.is(pearPath.isAbsolute('qux/'), nodePath.isAbsolute('qux/'))

  t.is(pearPath.isAbsolute('//server'), nodePath.isAbsolute('//server'))
  t.is(pearPath.isAbsolute('\\\\server'), nodePath.isAbsolute('\\\\server'))
  t.is(pearPath.isAbsolute('C:/foo/..'), nodePath.isAbsolute('C:/foo/..'))
  t.is(pearPath.isAbsolute('C:\\foo\\..'), nodePath.isAbsolute('C:\\foo\\..'))
  t.is(pearPath.isAbsolute('bar\\baz'), nodePath.isAbsolute('bar\\baz'))
  t.is(pearPath.isAbsolute('bar/baz'), nodePath.isAbsolute('bar/baz'))
})

test('join', function (t) {
  t.is(pearPath.join('', ''), nodePath.join('', ''))

  t.is(pearPath.join('/foo', 'bar', 'baz/asdf', 'quux', '..'), nodePath.join('/foo', 'bar', 'baz/asdf', 'quux', '..'))
  t.is(pearPath.join('C:\\foo', 'bar', 'baz\\asdf', 'quux', '..'), nodePath.join('C:\\foo', 'bar', 'baz\\asdf', 'quux', '..'))
})

test('normalize', function (t) {
  t.is(pearPath.normalize(''), nodePath.normalize(''))

  t.is(pearPath.normalize('/foo/bar//baz/asdf/quux/..'), nodePath.normalize('/foo/bar//baz/asdf/quux/..'))
  t.is(pearPath.normalize('C:\\temp\\\\foo\\bar\\..\\'), nodePath.normalize('C:\\temp\\\\foo\\bar\\..\\'))

  t.is(pearPath.normalize('/tmp/dir/'), nodePath.normalize('/tmp/dir/'))
  t.is(pearPath.normalize('C:\\temp\\\\dir\\'), nodePath.normalize('C:\\temp\\\\dir\\'))
  t.is(pearPath.normalize('C:\\temp\\\\dir\\/'), nodePath.normalize('C:\\temp\\\\dir\\/'))

  t.is(pearPath.win32.normalize('C:////temp\\\\/\\/\\/foo/bar'), nodePath.win32.normalize('C:////temp\\\\/\\/\\/foo/bar'))
})

test.skip('parse', function (t) {})

test.skip('relative', function (t) {})

test('resolve', function (t) {
  // t.is(pearPath.resolve(), nodePath.resolve()) // + absolute path of the current working directory
  t.is(pearPath.resolve(''), nodePath.resolve(''))
  t.is(pearPath.resolve('', ''), nodePath.resolve('', ''))

  t.is(pearPath.resolve('/foo/bar', '', './baz', ''), nodePath.resolve('/foo/bar', '', './baz', ''))
  t.is(pearPath.resolve('/foo/bar', './baz'), nodePath.resolve('/foo/bar', './baz'))
  t.is(pearPath.resolve('/foo/bar', '/tmp/file/'), nodePath.resolve('/foo/bar', '/tmp/file/'))
  t.is(pearPath.resolve('wwwroot', 'static_files/png/', '../gif/image.gif'), nodePath.resolve('wwwroot', 'static_files/png/', '../gif/image.gif'))

  t.is(pearPath.win32.resolve('C:\\'), nodePath.win32.resolve('C:\\'))
  t.is(pearPath.win32.resolve('C:'), nodePath.win32.resolve('C:'))

  t.is(pearPath.posix.resolve('/foo', '/bar', 'baz'), nodePath.posix.resolve('/foo', '/bar', 'baz'))
  t.is(pearPath.win32.resolve('C:\\foo', 'C:\\bar', 'baz'), nodePath.win32.resolve('C:\\foo', 'C:\\bar', 'baz'))
})

test('sep', function (t) {
  t.is(pearPath.sep, nodePath.sep)
})

test.skip('toNamespacedPath', function (t) {})
