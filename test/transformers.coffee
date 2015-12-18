describe 'transformers', ->
  Given -> @subject = require '../lib/transformers'

  describe 'camelCase', ->
    Then -> @subject.camelCase('foo/bar').should.eql 'fooBar'

  describe 'camel', ->
    Then -> @subject.camel('foo/bar').should.eql 'fooBar'

  describe 'dash', ->
    Then -> @subject.dash('foo/bar').should.eql 'foo-bar'

  describe 'kebab', ->
    Then -> @subject.kebab('foo/bar').should.eql 'foo-bar'

  describe 'kebabCase', ->
    Then -> @subject.kebabCase('foo/bar').should.eql 'foo-bar'

  describe 'underscore', ->
    Then -> @subject.underscore('foo/bar').should.eql 'foo_bar'

  describe 'snake', ->
    Then -> @subject.snake('foo/bar').should.eql 'foo_bar'

  describe 'snakeCase', ->
    Then -> @subject.snakeCase('foo/bar').should.eql 'foo_bar'

  describe 'title', ->
    Then -> @subject.title('foo/bar').should.eql 'Foo Bar'

  describe 'startCase', ->
    Then -> @subject.startCase('foo/bar').should.eql 'Foo Bar'

  describe 'bookCase', ->
    Then -> @subject.bookCase('foo/bar').should.eql 'Foo Bar'

  describe 'human', ->
    Then -> @subject.human('foo/bar').should.eql 'Foo bar'

  describe 'capitalize', ->
    Then -> @subject.capitalize('foo/bar').should.eql 'Foo bar'

  describe 'pipe', ->
    Then -> @subject.pipe('foo/bar').should.eql 'foo|bar'

  describe 'class', ->
    Then -> @subject.class('foo/bar').should.eql 'FooBar'

  describe 'lower', ->
    Then -> @subject.lower('foo/bar').should.eql 'foobar'

  describe 'upper', ->
    Then -> @subject.upper('foo/bar').should.eql 'FOOBAR'

  describe 'dot', ->
    Then -> @subject.dot('foo/bar-baz').should.eql 'foo.barBaz'
