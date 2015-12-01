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

  var elt = document.getElementById("529580e6-0397-4c66-a7c9-4135e53ef851");
  if(elt==null) {
    console.log("Bokeh: ERROR: autoload.js configured with elementid '529580e6-0397-4c66-a7c9-4135e53ef851' but no matching script tag was found. ")
    return false;
  }

  // These will be set for the static case
  var all_models = [{"attributes": {"plot": {"subtype": "Figure", "type": "Plot", "id": "8d45b414-bc6f-4b64-8f87-5644606b468a"}, "tags": [], "doc": null, "formatter": {"type": "BasicTickFormatter", "id": "0184036b-521b-4490-bf10-1baa70667ecd"}, "ticker": {"type": "BasicTicker", "id": "8d7fa361-732a-41b1-81f5-1bc9c9325421"}, "id": "53dc496c-2192-4f2f-93bb-f1e3af31220d"}, "type": "LinearAxis", "id": "53dc496c-2192-4f2f-93bb-f1e3af31220d"}, {"attributes": {"column_names": ["y", "x"], "tags": [], "doc": null, "selected": {"2d": {"indices": []}, "1d": {"indices": []}, "0d": {"indices": [], "flag": false}}, "callback": null, "data": {"y": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], "x": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}, "id": "563cd3fe-e1f0-4026-a9e5-ca10a11d9933"}, "type": "ColumnDataSource", "id": "563cd3fe-e1f0-4026-a9e5-ca10a11d9933"}, {"attributes": {"doc": null, "id": "0184036b-521b-4490-bf10-1baa70667ecd", "tags": []}, "type": "BasicTickFormatter", "id": "0184036b-521b-4490-bf10-1baa70667ecd"}, {"attributes": {"plot": {"subtype": "Figure", "type": "Plot", "id": "8d45b414-bc6f-4b64-8f87-5644606b468a"}, "tags": [], "doc": null, "dimension": 1, "ticker": {"type": "BasicTicker", "id": "8d7fa361-732a-41b1-81f5-1bc9c9325421"}, "id": "e411552f-aa37-43cd-beab-8470fcfd7c4a"}, "type": "Grid", "id": "e411552f-aa37-43cd-beab-8470fcfd7c4a"}, {"attributes": {"plot": {"subtype": "Figure", "type": "Plot", "id": "8d45b414-bc6f-4b64-8f87-5644606b468a"}, "dimensions": ["width", "height"], "tags": [], "doc": null, "id": "71bd7362-9c2d-4e09-87ba-61285b249c01"}, "type": "PanTool", "id": "71bd7362-9c2d-4e09-87ba-61285b249c01"}, {"attributes": {"line_color": {"value": "navy"}, "line_alpha": {"value": 0.5}, "fill_color": {"value": "navy"}, "tags": [], "doc": null, "fill_alpha": {"value": 0.5}, "y": {"field": "y"}, "x": {"field": "x"}, "id": "60410d95-b43b-4e09-88fb-d7e39166269e", "size": {"units": "screen", "value": 6}}, "type": "Circle", "id": "60410d95-b43b-4e09-88fb-d7e39166269e"}, {"attributes": {"plot": {"subtype": "Figure", "type": "Plot", "id": "8d45b414-bc6f-4b64-8f87-5644606b468a"}, "dimensions": ["width", "height"], "tags": [], "doc": null, "id": "5bb0e130-0f4a-486b-83b2-fe6fca4cc056"}, "type": "BoxZoomTool", "id": "5bb0e130-0f4a-486b-83b2-fe6fca4cc056"}, {"attributes": {"plot": {"subtype": "Figure", "type": "Plot", "id": "8d45b414-bc6f-4b64-8f87-5644606b468a"}, "tags": [], "doc": null, "id": "72e4074c-5f84-42c4-a38c-63c46c1acc07"}, "type": "PreviewSaveTool", "id": "72e4074c-5f84-42c4-a38c-63c46c1acc07"}, {"attributes": {"plot": {"subtype": "Figure", "type": "Plot", "id": "8d45b414-bc6f-4b64-8f87-5644606b468a"}, "tags": [], "doc": null, "id": "efa62264-40b9-4f8b-8ceb-c91295125ce8"}, "type": "ResizeTool", "id": "efa62264-40b9-4f8b-8ceb-c91295125ce8"}, {"attributes": {"plot": {"subtype": "Figure", "type": "Plot", "id": "8d45b414-bc6f-4b64-8f87-5644606b468a"}, "tags": [], "doc": null, "id": "0f696936-156b-4005-9516-c68bdb80da2e"}, "type": "ResetTool", "id": "0f696936-156b-4005-9516-c68bdb80da2e"}, {"attributes": {"line_color": {"value": "#1f77b4"}, "line_alpha": {"value": 0.1}, "fill_color": {"value": "#1f77b4"}, "tags": [], "doc": null, "fill_alpha": {"value": 0.1}, "y": {"field": "y"}, "x": {"field": "x"}, "id": "a738223b-f4ce-42d5-8206-17642b8dc0ad", "size": {"units": "screen", "value": 6}}, "type": "Circle", "id": "a738223b-f4ce-42d5-8206-17642b8dc0ad"}, {"attributes": {"plot": {"subtype": "Figure", "type": "Plot", "id": "8d45b414-bc6f-4b64-8f87-5644606b468a"}, "tags": [], "doc": null, "id": "4938c978-2987-45e9-ba2b-8c6d0fd7048f"}, "type": "HelpTool", "id": "4938c978-2987-45e9-ba2b-8c6d0fd7048f"}, {"attributes": {"tags": [], "doc": null, "mantissas": [2, 5, 10], "id": "8d7fa361-732a-41b1-81f5-1bc9c9325421", "num_minor_ticks": 5}, "type": "BasicTicker", "id": "8d7fa361-732a-41b1-81f5-1bc9c9325421"}, {"subtype": "Figure", "type": "Plot", "id": "8d45b414-bc6f-4b64-8f87-5644606b468a", "attributes": {"x_range": {"type": "DataRange1d", "id": "9cbf88cd-ab8b-4f55-ab3b-f12e3ded64ac"}, "right": [], "above": [], "tags": [], "toolbar_location": null, "title": null, "extra_y_ranges": {}, "plot_width": 175, "renderers": [{"type": "LinearAxis", "id": "5364fee8-8c9a-43e7-8563-1179d55cd783"}, {"type": "Grid", "id": "f7b2e551-41fe-4e2d-bab9-71f223e26b8e"}, {"type": "LinearAxis", "id": "53dc496c-2192-4f2f-93bb-f1e3af31220d"}, {"type": "Grid", "id": "e411552f-aa37-43cd-beab-8470fcfd7c4a"}, {"type": "GlyphRenderer", "id": "755a494c-a21e-401f-826b-986ec45d60e1"}], "extra_x_ranges": {}, "plot_height": 175, "tool_events": {"type": "ToolEvents", "id": "aff48316-9500-4062-ba17-728aaf61915b"}, "tools": [{"type": "PanTool", "id": "71bd7362-9c2d-4e09-87ba-61285b249c01"}, {"type": "WheelZoomTool", "id": "25a53367-1048-4767-9a52-dde6c505f401"}, {"type": "BoxZoomTool", "id": "5bb0e130-0f4a-486b-83b2-fe6fca4cc056"}, {"type": "PreviewSaveTool", "id": "72e4074c-5f84-42c4-a38c-63c46c1acc07"}, {"type": "ResizeTool", "id": "efa62264-40b9-4f8b-8ceb-c91295125ce8"}, {"type": "ResetTool", "id": "0f696936-156b-4005-9516-c68bdb80da2e"}, {"type": "HelpTool", "id": "4938c978-2987-45e9-ba2b-8c6d0fd7048f"}], "doc": null, "id": "8d45b414-bc6f-4b64-8f87-5644606b468a", "y_range": {"type": "DataRange1d", "id": "15b9b85b-4836-49ea-a971-339e08f9edf6"}, "below": [{"type": "LinearAxis", "id": "5364fee8-8c9a-43e7-8563-1179d55cd783"}], "left": [{"type": "LinearAxis", "id": "53dc496c-2192-4f2f-93bb-f1e3af31220d"}]}}, {"attributes": {"plot": {"subtype": "Figure", "type": "Plot", "id": "8d45b414-bc6f-4b64-8f87-5644606b468a"}, "dimensions": ["width", "height"], "tags": [], "doc": null, "id": "25a53367-1048-4767-9a52-dde6c505f401"}, "type": "WheelZoomTool", "id": "25a53367-1048-4767-9a52-dde6c505f401"}, {"attributes": {"geometries": [], "tags": [], "doc": null, "id": "aff48316-9500-4062-ba17-728aaf61915b"}, "type": "ToolEvents", "id": "aff48316-9500-4062-ba17-728aaf61915b"}, {"attributes": {"tags": [], "doc": null, "renderers": [], "callback": null, "names": [], "id": "9cbf88cd-ab8b-4f55-ab3b-f12e3ded64ac"}, "type": "DataRange1d", "id": "9cbf88cd-ab8b-4f55-ab3b-f12e3ded64ac"}, {"attributes": {"nonselection_glyph": {"type": "Circle", "id": "a738223b-f4ce-42d5-8206-17642b8dc0ad"}, "data_source": {"type": "ColumnDataSource", "id": "563cd3fe-e1f0-4026-a9e5-ca10a11d9933"}, "tags": [], "doc": null, "selection_glyph": null, "id": "755a494c-a21e-401f-826b-986ec45d60e1", "glyph": {"type": "Circle", "id": "60410d95-b43b-4e09-88fb-d7e39166269e"}}, "type": "GlyphRenderer", "id": "755a494c-a21e-401f-826b-986ec45d60e1"}, {"attributes": {"tags": [], "doc": null, "renderers": [], "callback": null, "names": [], "id": "15b9b85b-4836-49ea-a971-339e08f9edf6"}, "type": "DataRange1d", "id": "15b9b85b-4836-49ea-a971-339e08f9edf6"}, {"attributes": {"plot": {"subtype": "Figure", "type": "Plot", "id": "8d45b414-bc6f-4b64-8f87-5644606b468a"}, "tags": [], "doc": null, "formatter": {"type": "BasicTickFormatter", "id": "06f3efc7-3597-4ad7-9bed-0d715152e20b"}, "ticker": {"type": "BasicTicker", "id": "b5a590ec-3234-4809-8b2a-b77dbab6eba5"}, "id": "5364fee8-8c9a-43e7-8563-1179d55cd783"}, "type": "LinearAxis", "id": "5364fee8-8c9a-43e7-8563-1179d55cd783"}, {"attributes": {"tags": [], "doc": null, "mantissas": [2, 5, 10], "id": "b5a590ec-3234-4809-8b2a-b77dbab6eba5", "num_minor_ticks": 5}, "type": "BasicTicker", "id": "b5a590ec-3234-4809-8b2a-b77dbab6eba5"}, {"attributes": {"doc": null, "id": "06f3efc7-3597-4ad7-9bed-0d715152e20b", "tags": []}, "type": "BasicTickFormatter", "id": "06f3efc7-3597-4ad7-9bed-0d715152e20b"}, {"attributes": {"plot": {"subtype": "Figure", "type": "Plot", "id": "8d45b414-bc6f-4b64-8f87-5644606b468a"}, "tags": [], "doc": null, "dimension": 0, "ticker": {"type": "BasicTicker", "id": "b5a590ec-3234-4809-8b2a-b77dbab6eba5"}, "id": "f7b2e551-41fe-4e2d-bab9-71f223e26b8e"}, "type": "Grid", "id": "f7b2e551-41fe-4e2d-bab9-71f223e26b8e"}];

  if(typeof(Bokeh) !== "undefined") {
    console.log("Bokeh: BokehJS loaded, going straight to plotting");
    Bokeh.embed.inject_plot("529580e6-0397-4c66-a7c9-4135e53ef851", all_models);
  } else {
    load_lib(bokehjs_url, function() {
      console.log("Bokeh: BokehJS plotting callback run at", new Date())
      Bokeh.embed.inject_plot("529580e6-0397-4c66-a7c9-4135e53ef851", all_models);
    });
  }

}(this));