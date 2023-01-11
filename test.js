const test = require('brittle')
const nodePath = require('path')
const pearPath = require('./index.js')

test('export based on platform', function (t) {
  if (process.platform === 'win32') {
    t.is(pearPath, pearPath.win32)
    t.not(pearPath, pearPath.posix)
  } else {
    t.is(pearPath, pearPath.posix)
    t.not(pearPath, pearPath.win32)
  }
})

test('basename', function (t) {
  t.is(pearPath.posix.basename('/tmp/file.html'), nodePath.posix.basename('/tmp/file.html'))
  t.is(pearPath.win32.basename('C:\\temp\\file.html'), nodePath.win32.basename('C:\\temp\\file.html'))

  t.is(pearPath.posix.basename('/tmp/file.html/'), nodePath.posix.basename('/tmp/file.html/'))
  t.is(pearPath.win32.basename('C:\\temp\\file.html\\'), nodePath.win32.basename('C:\\temp\\file.html\\'))
})

test('basename suffix', function (t) {
  t.is(pearPath.posix.basename('/tmp/file.html', '.html'), nodePath.posix.basename('/tmp/file.html', '.html'))
  t.is(pearPath.win32.basename('C:\\temp\\file.html', '.html'), nodePath.win32.basename('C:\\temp\\file.html', '.html'))
})

test('basename suffix is case-sensitive', function (t) {
  t.is(pearPath.posix.basename('/tmp/file.HTML', '.html'), nodePath.posix.basename('/tmp/file.HTML', '.html'))
  t.is(pearPath.win32.basename('C:\\temp\\file.HTML', '.html'), nodePath.win32.basename('C:\\temp\\file.HTML', '.html'))
})

test('delimiter', function (t) {
  t.is(pearPath.delimiter, nodePath.delimiter)
})

test('dirname', function (t) {
  t.is(pearPath.posix.dirname('/foo/bar/baz/asdf/quux'), nodePath.posix.dirname('/foo/bar/baz/asdf/quux'))
  t.is(pearPath.win32.dirname('C:\\foo\\bar\\baz\\asdf\\quux'), nodePath.win32.dirname('C:\\foo\\bar\\baz\\asdf\\quux'))

  t.is(pearPath.posix.dirname('/foo/bar/'), nodePath.posix.dirname('/foo/bar/'))
  t.is(pearPath.win32.dirname('C:\\foo\\bar\\'), nodePath.win32.dirname('C:\\foo\\bar\\'))
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

  t.is(pearPath.posix.isAbsolute('/foo/bar'), nodePath.posix.isAbsolute('/foo/bar'))
  t.is(pearPath.posix.isAbsolute('/baz/..'), nodePath.posix.isAbsolute('/baz/..'))
  t.is(pearPath.posix.isAbsolute('qux/'), nodePath.posix.isAbsolute('qux/'))

  t.is(pearPath.posix.isAbsolute('//server'), nodePath.posix.isAbsolute('//server'))
  t.is(pearPath.win32.isAbsolute('\\\\server'), nodePath.win32.isAbsolute('\\\\server'))
  t.is(pearPath.win32.isAbsolute('C:/foo/..'), nodePath.win32.isAbsolute('C:/foo/..'))
  t.is(pearPath.win32.isAbsolute('C:\\foo\\..'), nodePath.win32.isAbsolute('C:\\foo\\..'))
  t.is(pearPath.win32.isAbsolute('bar\\baz'), nodePath.win32.isAbsolute('bar\\baz'))
  t.is(pearPath.posix.isAbsolute('bar/baz'), nodePath.posix.isAbsolute('bar/baz'))
})

test('join', function (t) {
  t.is(pearPath.join('', ''), nodePath.join('', ''))

  t.is(pearPath.posix.join('/foo', 'bar', 'baz/asdf', 'quux', '..'), nodePath.posix.join('/foo', 'bar', 'baz/asdf', 'quux', '..'))
  t.is(pearPath.win32.join('C:\\foo', 'bar', 'baz\\asdf', 'quux', '..'), nodePath.win32.join('C:\\foo', 'bar', 'baz\\asdf', 'quux', '..'))
})

test('normalize', function (t) {
  t.is(pearPath.normalize(''), nodePath.normalize(''))

  t.is(pearPath.posix.normalize('/foo/bar//baz/asdf/quux/..'), nodePath.posix.normalize('/foo/bar//baz/asdf/quux/..'))
  t.is(pearPath.win32.normalize('C:\\temp\\\\foo\\bar\\..\\'), nodePath.win32.normalize('C:\\temp\\\\foo\\bar\\..\\'))

  t.is(pearPath.posix.normalize('/tmp/dir/'), nodePath.posix.normalize('/tmp/dir/'))
  t.is(pearPath.win32.normalize('C:\\temp\\\\dir\\'), nodePath.win32.normalize('C:\\temp\\\\dir\\'))
  t.is(pearPath.win32.normalize('C:\\temp\\\\dir\\/'), nodePath.win32.normalize('C:\\temp\\\\dir\\/'))

  t.is(pearPath.win32.normalize('C:////temp\\\\/\\/\\/foo/bar'), nodePath.win32.normalize('C:////temp\\\\/\\/\\/foo/bar'))
})

test.skip('parse', function (t) {})

test.skip('relative', function (t) {})

test('resolve', function (t) {
  // t.is(pearPath.resolve(), nodePath.resolve()) // + absolute path of the current working directory
  t.is(pearPath.resolve(''), nodePath.resolve(''))
  t.is(pearPath.resolve('', ''), nodePath.resolve('', ''))

  t.is(pearPath.posix.resolve('/foo/bar', '', './baz', ''), nodePath.posix.resolve('/foo/bar', '', './baz', ''))
  t.is(pearPath.posix.resolve('/foo/bar', './baz'), nodePath.posix.resolve('/foo/bar', './baz'))
  t.is(pearPath.posix.resolve('/foo/bar', '/tmp/file/'), nodePath.posix.resolve('/foo/bar', '/tmp/file/'))
  t.is(pearPath.posix.resolve('wwwroot', 'static_files/png/', '../gif/image.gif'), nodePath.posix.resolve('wwwroot', 'static_files/png/', '../gif/image.gif'))

  t.is(pearPath.win32.resolve('C:\\'), nodePath.win32.resolve('C:\\'))
  t.is(pearPath.win32.resolve('C:'), nodePath.win32.resolve('C:'))

  t.is(pearPath.posix.resolve('/foo', '/bar', 'baz'), nodePath.posix.resolve('/foo', '/bar', 'baz'))
  t.is(pearPath.win32.resolve('C:\\foo', 'C:\\bar', 'baz'), nodePath.win32.resolve('C:\\foo', 'C:\\bar', 'baz'))
})

test('sep', function (t) {
  t.is(pearPath.sep, nodePath.sep)
})

test.skip('toNamespacedPath', function (t) {})
