function drawGraph(data){
    
      var new_data = [];

      for(var i = 0;i<data.length;i++){
        var now = data[i];
        var obj = {
          "value": now.value,
          "children": [].concat(now.children),
        }
        new_data.push(obj)
      }

    var datastr = d3.layout.hierarchy(new_data);
    var treestr = d3.layout.tree().size([500,300]);
    var info = treestr(datastr);
    console.log(info.descendants());
}