function markdownEditor() {
  $(function() {
    $('#wizard .content textarea').markdown({
      iconlibrary: 'fa',
      hiddenButtons: 'cmdPreview',
      disabledButtons: 'cmdPreview',
      width: '100%',
      additionalButtons: [
        [{
          name: 'graphButton',
          data: [{
            name: 'insertGraph',
            title: 'Graphs',
            toggle: false,
            icon: 'fa fa-line-chart',
            callback: function(e) {
              $('#graphModal').modal({
                show: true
              });
              var str = '',
                graph = $('#graphModal').data('graph'),
                end = e.getContent().length;
              $('#createGraph').off().one('click', function() {
                str = '&nbsp;<!-- .element: class="graph center-block" '
                  + 'nvd3-' + graph.graphType + '="nvd3" '
                  + 'reportId="' + (graph.reportId || '') + '" '
                  + 'sobId="' + (graph.sobId || '') + '" '
                  + 'xValue="' + graph.xValue +'" '
                  + 'yValue="' + graph.yValue +'" '
                  + 'graphType="' + graph.graphType +'" '
                  + 'data="graph[\''+ (graph.reportId || graph.sobId || '') + graph.graphType + graph.xValue + graph.yValue +'\']"'
                  + 'isArea="true" showXAxis="true" showYAxis="true" interactive="true" showLegend="true" staggerLabels="true" rotateLabels="60"';
                if (graph.graphType === 'pie-chart' || graph.graphType === 'scatter-chart'
                    || graph.graphType === 'sparkline-chart' || graph.graphType === 'line-with-focus-chart') {
                  str += ' x="xFunction()" ' + 'y="yFunction()"';
                }
                // for(var o in graph.options) {
                //   if (o === 'rotateLabels') str += ' ' + o + '="60"';
                //   else str += ' ' + o + '="'+ graph.options[o] +'"';
                // }
                if (graph.option && graph.option.date) str += ' xAxisTickFormat="xAxisTickFormatFunction()"';
                str += ' width="600" height="350" -->';
                e.setSelection(end, end);
                e.replaceSelection(str);
                $('#graphModal input[type="checkbox"]:checked').removeAttr('checked');
                $('#graphModal select').val(null);
                $('#graphModal').data('graph', '');
                $('#graphModal').modal('hide');
              });
            }
          }]
        }, {
          name: 'tableButton',
          data: [{
            name: 'insertTable',
            title: 'Table',
            toggle: false,
            icon: 'fa fa-table',
            callback: function(e) {
              $('#tableModal').modal({
                show: true
              });
              $('#createTable').one('click', function() {
                console.log('table')
                var rows = document.getElementById('rows').value;
                var columns = document.getElementById('columns').value;
                var table = '\n';
                if (document.getElementById('headers').checked) {
                  table = table + '|';
                  for (var i = 0; i < columns; i++) {
                    table = table + '      |';
                  }
                  table = table + '\n';
                  table = table + '|';
                  for (var j = 0; j < columns; j++) {
                    table = table + '------|';
                  }
                  table = table + '\n';
                }
                for(var k = 0; k < rows; k++) {
                  table = table + '|';
                  for (var m = 0; m < columns; m++) {
                    table = table + '      |';
                  }
                  table = table + '\n';
                }
                e.setSelection(e.getSelection(), e.getSelection()+table.length);
                e.replaceSelection(table);
                $('#tableModal').modal('hide');
              });
            }
          }]
        }]
      ]
    });
  });
}
