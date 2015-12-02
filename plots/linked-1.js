(function(global) {
  if (typeof (window._bokeh_onload_callbacks) === "undefined"){
    window._bokeh_onload_callbacks = [];
  }
  function load_lib(url, callback){
    window._bokeh_onload_callbacks.push(callback);
    if (window._bokeh_is_loading){
      console.log("Bokeh: BokehJS is being loaded, scheduling callback at", new Date());
      return null;
    }
    console.log("Bokeh: BokehJS not loaded, scheduling load and callback at", new Date());
    window._bokeh_is_loading = true;
    var s = document.createElement('script');
    s.src = url;
    s.async = true;
    s.onreadystatechange = s.onload = function(){
      Bokeh.embed.inject_css("http://cdn.pydata.org/bokeh/release/bokeh-0.10.0.min.css");
      window._bokeh_onload_callbacks.forEach(function(callback){callback()});
    };
    s.onerror = function(){
      console.warn("failed to load library " + url);
    };
    document.getElementsByTagName("head")[0].appendChild(s);
  }

  bokehjs_url = "http://cdn.pydata.org/bokeh/release/bokeh-0.10.0.min.js"

  var elt = document.getElementById("489af527-c0a5-408a-856b-393dee0b5789");
  if(elt==null) {
    console.log("Bokeh: ERROR: autoload.js configured with elementid '489af527-c0a5-408a-856b-393dee0b5789' but no matching script tag was found. ")
    return false;
  }

  // These will be set for the static case
  var all_models = [{"attributes": {"plot": {"subtype": "Figure", "type": "Plot", "id": "56772556-1e7e-4b8f-bf98-83c342c90205"}, "tags": [], "doc": null, "formatter": {"type": "BasicTickFormatter", "id": "79f5e3d1-8d4e-4856-b18f-2ddcd05e772d"}, "ticker": {"type": "BasicTicker", "id": "9abd45d8-0d31-47f6-a2e6-fc990e2a18af"}, "id": "17c1c2ce-b0cd-4ec2-874a-cc4150521183"}, "type": "LinearAxis", "id": "17c1c2ce-b0cd-4ec2-874a-cc4150521183"}, {"attributes": {"tags": [], "doc": null, "mantissas": [2, 5, 10], "id": "9abd45d8-0d31-47f6-a2e6-fc990e2a18af", "num_minor_ticks": 5}, "type": "BasicTicker", "id": "9abd45d8-0d31-47f6-a2e6-fc990e2a18af"}, {"attributes": {"doc": null, "id": "79f5e3d1-8d4e-4856-b18f-2ddcd05e772d", "tags": []}, "type": "BasicTickFormatter", "id": "79f5e3d1-8d4e-4856-b18f-2ddcd05e772d"}, {"attributes": {"plot": {"subtype": "Figure", "type": "Plot", "id": "56772556-1e7e-4b8f-bf98-83c342c90205"}, "tags": [], "doc": null, "dimension": 1, "ticker": {"type": "BasicTicker", "id": "9abd45d8-0d31-47f6-a2e6-fc990e2a18af"}, "id": "e5da6c72-6db9-4769-ae98-07b2d28c8b65"}, "type": "Grid", "id": "e5da6c72-6db9-4769-ae98-07b2d28c8b65"}, {"attributes": {"plot": {"subtype": "Figure", "type": "Plot", "id": "56772556-1e7e-4b8f-bf98-83c342c90205"}, "dimensions": ["width", "height"], "tags": [], "doc": null, "id": "f1b47829-e349-4087-9842-a917740ea867"}, "type": "PanTool", "id": "f1b47829-e349-4087-9842-a917740ea867"}, {"attributes": {"line_color": {"value": "navy"}, "line_alpha": {"value": 0.5}, "fill_color": {"value": "navy"}, "tags": [], "doc": null, "fill_alpha": {"value": 0.5}, "y": {"field": "y"}, "x": {"field": "x"}, "id": "885a8f4e-01a3-4ead-8117-e588aa8611ed", "size": {"units": "screen", "value": 6}}, "type": "Circle", "id": "885a8f4e-01a3-4ead-8117-e588aa8611ed"}, {"attributes": {"plot": {"subtype": "Figure", "type": "Plot", "id": "56772556-1e7e-4b8f-bf98-83c342c90205"}, "dimensions": ["width", "height"], "tags": [], "doc": null, "id": "0a9402cc-9ea9-419a-a58b-8aaa14a90dc3"}, "type": "BoxZoomTool", "id": "0a9402cc-9ea9-419a-a58b-8aaa14a90dc3"}, {"attributes": {"plot": {"subtype": "Figure", "type": "Plot", "id": "56772556-1e7e-4b8f-bf98-83c342c90205"}, "tags": [], "doc": null, "id": "ed46eb71-53bd-45ce-b5e1-716b698fb243"}, "type": "PreviewSaveTool", "id": "ed46eb71-53bd-45ce-b5e1-716b698fb243"}, {"attributes": {"plot": {"subtype": "Figure", "type": "Plot", "id": "56772556-1e7e-4b8f-bf98-83c342c90205"}, "tags": [], "doc": null, "id": "8457cf78-2e11-4b94-97c2-0c037fc64c11"}, "type": "ResizeTool", "id": "8457cf78-2e11-4b94-97c2-0c037fc64c11"}, {"attributes": {"plot": {"subtype": "Figure", "type": "Plot", "id": "56772556-1e7e-4b8f-bf98-83c342c90205"}, "tags": [], "doc": null, "id": "6a86905e-6db1-497e-9177-41070532533a"}, "type": "ResetTool", "id": "6a86905e-6db1-497e-9177-41070532533a"}, {"attributes": {"line_color": {"value": "#1f77b4"}, "line_alpha": {"value": 0.1}, "fill_color": {"value": "#1f77b4"}, "tags": [], "doc": null, "fill_alpha": {"value": 0.1}, "y": {"field": "y"}, "x": {"field": "x"}, "id": "077f7912-20b8-4516-be46-4c755449a30f", "size": {"units": "screen", "value": 6}}, "type": "Circle", "id": "077f7912-20b8-4516-be46-4c755449a30f"}, {"attributes": {"plot": {"subtype": "Figure", "type": "Plot", "id": "56772556-1e7e-4b8f-bf98-83c342c90205"}, "tags": [], "doc": null, "id": "b15208f0-f402-4329-88e7-7b2995fb09bd"}, "type": "HelpTool", "id": "b15208f0-f402-4329-88e7-7b2995fb09bd"}, {"attributes": {"column_names": ["y", "x"], "tags": [], "doc": null, "selected": {"2d": {"indices": []}, "1d": {"indices": []}, "0d": {"indices": [], "flag": false}}, "callback": null, "data": {"y": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], "x": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}, "id": "574e2960-67dc-4ed2-afd6-3f39469bea17"}, "type": "ColumnDataSource", "id": "574e2960-67dc-4ed2-afd6-3f39469bea17"}, {"subtype": "Figure", "type": "Plot", "id": "56772556-1e7e-4b8f-bf98-83c342c90205", "attributes": {"x_range": {"type": "DataRange1d", "id": "80dbfe96-6641-4ba2-b783-1fb0c9cd06da"}, "right": [], "above": [], "tags": [], "toolbar_location": null, "title": null, "extra_y_ranges": {}, "plot_width": 250, "renderers": [{"type": "LinearAxis", "id": "766d301e-787c-4bf3-a7ee-4169abca97bf"}, {"type": "Grid", "id": "48b2c33d-7834-48af-ba10-42ddef2c720f"}, {"type": "LinearAxis", "id": "17c1c2ce-b0cd-4ec2-874a-cc4150521183"}, {"type": "Grid", "id": "e5da6c72-6db9-4769-ae98-07b2d28c8b65"}, {"type": "GlyphRenderer", "id": "70aea4b1-7243-4c93-a3f7-a9553613c776"}], "extra_x_ranges": {}, "plot_height": 250, "tool_events": {"type": "ToolEvents", "id": "88a4b355-b245-4a25-8cab-59c4baa26540"}, "tools": [{"type": "PanTool", "id": "f1b47829-e349-4087-9842-a917740ea867"}, {"type": "WheelZoomTool", "id": "e0ac5e73-7bbc-47e9-9a4b-33c939666311"}, {"type": "BoxZoomTool", "id": "0a9402cc-9ea9-419a-a58b-8aaa14a90dc3"}, {"type": "PreviewSaveTool", "id": "ed46eb71-53bd-45ce-b5e1-716b698fb243"}, {"type": "ResizeTool", "id": "8457cf78-2e11-4b94-97c2-0c037fc64c11"}, {"type": "ResetTool", "id": "6a86905e-6db1-497e-9177-41070532533a"}, {"type": "HelpTool", "id": "b15208f0-f402-4329-88e7-7b2995fb09bd"}], "doc": null, "id": "56772556-1e7e-4b8f-bf98-83c342c90205", "y_range": {"type": "DataRange1d", "id": "5af55497-2240-4958-811a-ea9995b4c141"}, "below": [{"type": "LinearAxis", "id": "766d301e-787c-4bf3-a7ee-4169abca97bf"}], "left": [{"type": "LinearAxis", "id": "17c1c2ce-b0cd-4ec2-874a-cc4150521183"}]}}, {"attributes": {"geometries": [], "tags": [], "doc": null, "id": "88a4b355-b245-4a25-8cab-59c4baa26540"}, "type": "ToolEvents", "id": "88a4b355-b245-4a25-8cab-59c4baa26540"}, {"attributes": {"tags": [], "doc": null, "renderers": [], "callback": null, "names": [], "id": "80dbfe96-6641-4ba2-b783-1fb0c9cd06da"}, "type": "DataRange1d", "id": "80dbfe96-6641-4ba2-b783-1fb0c9cd06da"}, {"attributes": {"plot": {"subtype": "Figure", "type": "Plot", "id": "56772556-1e7e-4b8f-bf98-83c342c90205"}, "dimensions": ["width", "height"], "tags": [], "doc": null, "id": "e0ac5e73-7bbc-47e9-9a4b-33c939666311"}, "type": "WheelZoomTool", "id": "e0ac5e73-7bbc-47e9-9a4b-33c939666311"}, {"attributes": {"nonselection_glyph": {"type": "Circle", "id": "077f7912-20b8-4516-be46-4c755449a30f"}, "data_source": {"type": "ColumnDataSource", "id": "574e2960-67dc-4ed2-afd6-3f39469bea17"}, "tags": [], "doc": null, "selection_glyph": null, "id": "70aea4b1-7243-4c93-a3f7-a9553613c776", "glyph": {"type": "Circle", "id": "885a8f4e-01a3-4ead-8117-e588aa8611ed"}}, "type": "GlyphRenderer", "id": "70aea4b1-7243-4c93-a3f7-a9553613c776"}, {"attributes": {"tags": [], "doc": null, "renderers": [], "callback": null, "names": [], "id": "5af55497-2240-4958-811a-ea9995b4c141"}, "type": "DataRange1d", "id": "5af55497-2240-4958-811a-ea9995b4c141"}, {"attributes": {"plot": {"subtype": "Figure", "type": "Plot", "id": "56772556-1e7e-4b8f-bf98-83c342c90205"}, "tags": [], "doc": null, "formatter": {"type": "BasicTickFormatter", "id": "84b9bdd2-5e2c-470e-82f7-440f39ed6108"}, "ticker": {"type": "BasicTicker", "id": "c4c33b46-a871-46b9-9681-9bfb8e35b8f3"}, "id": "766d301e-787c-4bf3-a7ee-4169abca97bf"}, "type": "LinearAxis", "id": "766d301e-787c-4bf3-a7ee-4169abca97bf"}, {"attributes": {"tags": [], "doc": null, "mantissas": [2, 5, 10], "id": "c4c33b46-a871-46b9-9681-9bfb8e35b8f3", "num_minor_ticks": 5}, "type": "BasicTicker", "id": "c4c33b46-a871-46b9-9681-9bfb8e35b8f3"}, {"attributes": {"doc": null, "id": "84b9bdd2-5e2c-470e-82f7-440f39ed6108", "tags": []}, "type": "BasicTickFormatter", "id": "84b9bdd2-5e2c-470e-82f7-440f39ed6108"}, {"attributes": {"plot": {"subtype": "Figure", "type": "Plot", "id": "56772556-1e7e-4b8f-bf98-83c342c90205"}, "tags": [], "doc": null, "dimension": 0, "ticker": {"type": "BasicTicker", "id": "c4c33b46-a871-46b9-9681-9bfb8e35b8f3"}, "id": "48b2c33d-7834-48af-ba10-42ddef2c720f"}, "type": "Grid", "id": "48b2c33d-7834-48af-ba10-42ddef2c720f"}];

  if(typeof(Bokeh) !== "undefined") {
    console.log("Bokeh: BokehJS loaded, going straight to plotting");
    Bokeh.embed.inject_plot("489af527-c0a5-408a-856b-393dee0b5789", all_models);
  } else {
    load_lib(bokehjs_url, function() {
      console.log("Bokeh: BokehJS plotting callback run at", new Date())
      Bokeh.embed.inject_plot("489af527-c0a5-408a-856b-393dee0b5789", all_models);
    });
  }

}(this));