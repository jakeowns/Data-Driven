$(function() {
  Reveal.initialize({
    controls: true,
    keyboard: true,
    width: 960,
    height: 700,
    margin: 0.1,
    progress: true,
    transition: 'fade',
    transitionSpeed: 'slow',
    mouseWheel: true,
    multiplex: {
      secret: 'secret123',
      id: '1',
      url: ''
    },
    dependencies: [
      { src: '/socket.io/socket.io.js' },
      { src: '/app/plugin/multiplex/master.js' },
      { src: 'lib/js/classList.js', condition: function() { return !document.body.classList; } },
      { src: '/app/plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
      { src: '/app/plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } }
    ]
  });
});