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

  var elt = document.getElementById("71e2a3bc-e964-4d36-930a-4adbb7a8c104");
  if(elt==null) {
    console.log("Bokeh: ERROR: autoload.js configured with elementid '71e2a3bc-e964-4d36-930a-4adbb7a8c104' but no matching script tag was found. ")
    return false;
  }

  // These will be set for the static case
  var all_models = [{"attributes": {"callback": null, "factors": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"], "doc": null, "tags": [], "id": "3f9c186d-d31d-4c12-b19d-58851b51bf32"}, "type": "FactorRange", "id": "3f9c186d-d31d-4c12-b19d-58851b51bf32"}, {"attributes": {"callback": null, "factors": ["7", "6", "5", "4", "3", "2", "1"], "doc": null, "tags": [], "id": "f048f258-0997-474e-ab87-65cdf3a3385a"}, "type": "FactorRange", "id": "f048f258-0997-474e-ab87-65cdf3a3385a"}, {"attributes": {"nonselection_glyph": {"type": "Text", "id": "9b8f7b1b-2926-42f8-9e51-50775dc5058a"}, "data_source": {"type": "ColumnDataSource", "id": "6c2e2447-cc60-46e9-847a-dfaaa4bbe67e"}, "tags": [], "doc": null, "selection_glyph": null, "id": "56a805b7-2f32-487b-8c74-1a99a2ff7222", "glyph": {"type": "Text", "id": "ff5eb8b7-95b8-40a1-836d-760598c13751"}}, "type": "GlyphRenderer", "id": "56a805b7-2f32-487b-8c74-1a99a2ff7222"}, {"attributes": {"plot": {"subtype": "Figure", "type": "Plot", "id": "dbf9ba06-e362-4ad3-92b1-da7d16790e50"}, "tags": [], "doc": null, "formatter": {"type": "CategoricalTickFormatter", "id": "0f8ea3e9-93e2-4738-aa11-2f043fe27d23"}, "ticker": {"type": "CategoricalTicker", "id": "6d5d872a-2f42-496f-a6b3-082af79c724b"}, "id": "d7851f06-3413-4dfd-9cd5-2c0fd7601034"}, "type": "CategoricalAxis", "id": "d7851f06-3413-4dfd-9cd5-2c0fd7601034"}, {"attributes": {"tags": [], "doc": null, "id": "6d5d872a-2f42-496f-a6b3-082af79c724b", "num_minor_ticks": 5}, "type": "CategoricalTicker", "id": "6d5d872a-2f42-496f-a6b3-082af79c724b"}, {"attributes": {"angle": {"units": "rad", "value": 0}, "tags": [], "text": {"field": "sym"}, "text_font_size": {"value": "15pt"}, "text_align": "left", "text_alpha": {"value": 1.0}, "text_color": {"value": "black"}, "text_baseline": "middle", "doc": null, "y": {"field": "period"}, "x": {"field": "symx"}, "id": "ff5eb8b7-95b8-40a1-836d-760598c13751", "text_font_style": "bold"}, "type": "Text", "id": "ff5eb8b7-95b8-40a1-836d-760598c13751"}, {"attributes": {"doc": null, "id": "0f8ea3e9-93e2-4738-aa11-2f043fe27d23", "tags": []}, "type": "CategoricalTickFormatter", "id": "0f8ea3e9-93e2-4738-aa11-2f043fe27d23"}, {"attributes": {"plot": {"subtype": "Figure", "type": "Plot", "id": "dbf9ba06-e362-4ad3-92b1-da7d16790e50"}, "grid_line_color": null, "tags": [], "doc": null, "id": "d9512515-c60d-4a3a-a558-04089dad11f3", "ticker": {"type": "CategoricalTicker", "id": "6d5d872a-2f42-496f-a6b3-082af79c724b"}, "dimension": 0}, "type": "Grid", "id": "d9512515-c60d-4a3a-a558-04089dad11f3"}, {"attributes": {"plot": {"subtype": "Figure", "type": "Plot", "id": "dbf9ba06-e362-4ad3-92b1-da7d16790e50"}, "tags": [], "doc": null, "formatter": {"type": "CategoricalTickFormatter", "id": "2a8e4806-ddd4-4e22-82af-5fa847fcc5a1"}, "ticker": {"type": "CategoricalTicker", "id": "7afab9e2-e809-4a1f-b405-4114a3438a3f"}, "id": "737ce567-c60d-4638-a1cd-50a544b24337"}, "type": "CategoricalAxis", "id": "737ce567-c60d-4638-a1cd-50a544b24337"}, {"attributes": {"tags": [], "doc": null, "id": "7afab9e2-e809-4a1f-b405-4114a3438a3f", "num_minor_ticks": 5}, "type": "CategoricalTicker", "id": "7afab9e2-e809-4a1f-b405-4114a3438a3f"}, {"attributes": {"angle": {"units": "rad", "value": 0}, "tags": [], "text": {"field": "atomic_number"}, "text_font_size": {"value": "9pt"}, "text_align": "left", "text_alpha": {"value": 1.0}, "text_color": {"value": "black"}, "text_baseline": "middle", "doc": null, "y": {"field": "numbery"}, "x": {"field": "symx"}, "id": "bed9b253-0b2d-4350-90b3-ab311c7b82b0"}, "type": "Text", "id": "bed9b253-0b2d-4350-90b3-ab311c7b82b0"}, {"attributes": {"doc": null, "id": "2a8e4806-ddd4-4e22-82af-5fa847fcc5a1", "tags": []}, "type": "CategoricalTickFormatter", "id": "2a8e4806-ddd4-4e22-82af-5fa847fcc5a1"}, {"attributes": {"plot": {"subtype": "Figure", "type": "Plot", "id": "dbf9ba06-e362-4ad3-92b1-da7d16790e50"}, "grid_line_color": null, "tags": [], "doc": null, "id": "e221a59a-d1d4-4f21-b51f-75cb4f52af6c", "ticker": {"type": "CategoricalTicker", "id": "7afab9e2-e809-4a1f-b405-4114a3438a3f"}, "dimension": 1}, "type": "Grid", "id": "e221a59a-d1d4-4f21-b51f-75cb4f52af6c"}, {"attributes": {"plot": {"subtype": "Figure", "type": "Plot", "id": "dbf9ba06-e362-4ad3-92b1-da7d16790e50"}, "dimensions": ["width", "height"], "tags": [], "doc": null, "id": "0329bead-adc0-489e-a9fd-1105e4eb034b"}, "type": "PanTool", "id": "0329bead-adc0-489e-a9fd-1105e4eb034b"}, {"attributes": {"line_color": {"field": "type_color"}, "line_alpha": {"value": 1.0}, "fill_color": {"field": "type_color"}, "tags": [], "doc": null, "fill_alpha": {"value": 0.6}, "height": {"units": "data", "value": 0.9}, "width": {"units": "data", "value": 0.9}, "y": {"field": "period"}, "x": {"field": "group"}, "id": "bf44bb0d-257b-460e-b476-e93c8856a0a2"}, "type": "Rect", "id": "bf44bb0d-257b-460e-b476-e93c8856a0a2"}, {"attributes": {"plot": {"subtype": "Figure", "type": "Plot", "id": "dbf9ba06-e362-4ad3-92b1-da7d16790e50"}, "dimensions": ["width", "height"], "tags": [], "doc": null, "id": "69fe9880-377f-46fa-b9a5-934d221f9429"}, "type": "WheelZoomTool", "id": "69fe9880-377f-46fa-b9a5-934d221f9429"}, {"attributes": {"plot": {"subtype": "Figure", "type": "Plot", "id": "dbf9ba06-e362-4ad3-92b1-da7d16790e50"}, "dimensions": ["width", "height"], "tags": [], "doc": null, "id": "c75f6a1f-b918-4ec9-a00f-c3d4adda1097"}, "type": "BoxZoomTool", "id": "c75f6a1f-b918-4ec9-a00f-c3d4adda1097"}, {"attributes": {"plot": {"subtype": "Figure", "type": "Plot", "id": "dbf9ba06-e362-4ad3-92b1-da7d16790e50"}, "tags": [], "doc": null, "id": "01f63adf-64d1-4b34-ae2d-f3f043233079"}, "type": "PreviewSaveTool", "id": "01f63adf-64d1-4b34-ae2d-f3f043233079"}, {"attributes": {"angle": {"units": "rad", "value": 0}, "tags": [], "text": {"field": "sym"}, "text_font_size": {"value": "15pt"}, "text_align": "left", "text_alpha": {"value": 0.1}, "text_color": {"value": "black"}, "text_baseline": "middle", "doc": null, "y": {"field": "period"}, "x": {"field": "symx"}, "id": "9b8f7b1b-2926-42f8-9e51-50775dc5058a", "text_font_style": "bold"}, "type": "Text", "id": "9b8f7b1b-2926-42f8-9e51-50775dc5058a"}, {"attributes": {"plot": {"subtype": "Figure", "type": "Plot", "id": "dbf9ba06-e362-4ad3-92b1-da7d16790e50"}, "tags": [], "doc": null, "id": "3a4c1187-b7ad-4dab-ad0a-3b3702843bb9"}, "type": "ResetTool", "id": "3a4c1187-b7ad-4dab-ad0a-3b3702843bb9"}, {"attributes": {"plot": {"subtype": "Figure", "type": "Plot", "id": "dbf9ba06-e362-4ad3-92b1-da7d16790e50"}, "tags": [], "doc": null, "id": "7ac8c215-01eb-4156-898e-272d18ab93ad"}, "type": "HelpTool", "id": "7ac8c215-01eb-4156-898e-272d18ab93ad"}, {"attributes": {"geometries": [], "tags": [], "doc": null, "id": "c988e5f3-a22b-4b4f-ba51-82293ec633eb"}, "type": "ToolEvents", "id": "c988e5f3-a22b-4b4f-ba51-82293ec633eb"}, {"attributes": {"angle": {"units": "rad", "value": 0}, "tags": [], "text": {"field": "atomic_number"}, "text_font_size": {"value": "9pt"}, "text_align": "left", "text_alpha": {"value": 0.1}, "text_color": {"value": "black"}, "text_baseline": "middle", "doc": null, "y": {"field": "numbery"}, "x": {"field": "symx"}, "id": "399a7d42-9116-490a-bb6a-0178429d9851"}, "type": "Text", "id": "399a7d42-9116-490a-bb6a-0178429d9851"}, {"attributes": {"nonselection_glyph": {"type": "Text", "id": "399a7d42-9116-490a-bb6a-0178429d9851"}, "data_source": {"type": "ColumnDataSource", "id": "6c2e2447-cc60-46e9-847a-dfaaa4bbe67e"}, "tags": [], "doc": null, "selection_glyph": null, "id": "46aa3a88-fe97-4a86-a822-0da6958afe60", "glyph": {"type": "Text", "id": "bed9b253-0b2d-4350-90b3-ab311c7b82b0"}}, "type": "GlyphRenderer", "id": "46aa3a88-fe97-4a86-a822-0da6958afe60"}, {"attributes": {"angle": {"units": "rad", "value": 0}, "tags": [], "text": {"field": "name"}, "text_font_size": {"value": "6pt"}, "text_align": "left", "text_alpha": {"value": 1.0}, "text_color": {"value": "black"}, "text_baseline": "middle", "doc": null, "y": {"field": "namey"}, "x": {"field": "symx"}, "id": "68f5b4fe-85a6-41fc-a4fa-c624dd5b1510"}, "type": "Text", "id": "68f5b4fe-85a6-41fc-a4fa-c624dd5b1510"}, {"attributes": {"angle": {"units": "rad", "value": 0}, "tags": [], "text": {"field": "name"}, "text_font_size": {"value": "6pt"}, "text_align": "left", "text_alpha": {"value": 0.1}, "text_color": {"value": "black"}, "text_baseline": "middle", "doc": null, "y": {"field": "namey"}, "x": {"field": "symx"}, "id": "986f07a8-6d55-40bd-ac6e-d81bf4b0f1f7"}, "type": "Text", "id": "986f07a8-6d55-40bd-ac6e-d81bf4b0f1f7"}, {"attributes": {"nonselection_glyph": {"type": "Text", "id": "986f07a8-6d55-40bd-ac6e-d81bf4b0f1f7"}, "data_source": {"type": "ColumnDataSource", "id": "6c2e2447-cc60-46e9-847a-dfaaa4bbe67e"}, "tags": [], "doc": null, "selection_glyph": null, "id": "964b7035-9a08-4fa9-9262-225cdc8ab9be", "glyph": {"type": "Text", "id": "68f5b4fe-85a6-41fc-a4fa-c624dd5b1510"}}, "type": "GlyphRenderer", "id": "964b7035-9a08-4fa9-9262-225cdc8ab9be"}, {"attributes": {"angle": {"units": "rad", "value": 0}, "tags": [], "text": {"field": "mass"}, "text_font_size": {"value": "5pt"}, "text_align": "left", "text_alpha": {"value": 1.0}, "text_color": {"value": "black"}, "text_baseline": "middle", "doc": null, "y": {"field": "massy"}, "x": {"field": "symx"}, "id": "66f9b3e1-3878-49da-94c0-9ae1a2bdb82b"}, "type": "Text", "id": "66f9b3e1-3878-49da-94c0-9ae1a2bdb82b"}, {"attributes": {"angle": {"units": "rad", "value": 0}, "tags": [], "text": {"field": "mass"}, "text_font_size": {"value": "5pt"}, "text_align": "left", "text_alpha": {"value": 0.1}, "text_color": {"value": "black"}, "text_baseline": "middle", "doc": null, "y": {"field": "massy"}, "x": {"field": "symx"}, "id": "a77592fc-1818-453d-9ea8-a52eb974b30a"}, "type": "Text", "id": "a77592fc-1818-453d-9ea8-a52eb974b30a"}, {"attributes": {"nonselection_glyph": {"type": "Text", "id": "a77592fc-1818-453d-9ea8-a52eb974b30a"}, "data_source": {"type": "ColumnDataSource", "id": "6c2e2447-cc60-46e9-847a-dfaaa4bbe67e"}, "tags": [], "doc": null, "selection_glyph": null, "id": "0edbd2bd-fca8-49d6-8519-fee966296e67", "glyph": {"type": "Text", "id": "66f9b3e1-3878-49da-94c0-9ae1a2bdb82b"}}, "type": "GlyphRenderer", "id": "0edbd2bd-fca8-49d6-8519-fee966296e67"}, {"attributes": {"plot": {"subtype": "Figure", "type": "Plot", "id": "dbf9ba06-e362-4ad3-92b1-da7d16790e50"}, "tags": [], "doc": null, "id": "521b02df-8ede-4c3e-97a7-64bb6be3d725"}, "type": "ResizeTool", "id": "521b02df-8ede-4c3e-97a7-64bb6be3d725"}, {"attributes": {"column_names": ["type_color", "cpk", "group", "name", "atomic_number", "type", "massy", "period", "sym", "namey", "mass", "symx", "electronic", "numbery"], "tags": [], "doc": null, "selected": {"2d": {"indices": []}, "1d": {"indices": []}, "0d": {"indices": [], "flag": false}}, "callback": null, "data": {"type_color": ["#baa2a6", "#bbbb88", "#a6cee3", "#1f78b4", "#33a02c", "#baa2a6", "#baa2a6", "#baa2a6", "#fdbf6f", "#bbbb88", "#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#baa2a6", "#baa2a6", "#fdbf6f", "#bbbb88", "#a6cee3", "#1f78b4", "#e08e79", "#e08e79", "#e08e79", "#e08e79", "#e08e79", "#e08e79", "#e08e79", "#e08e79", "#e08e79", "#e08e79", "#b2df8a", "#33a02c", "#33a02c", "#baa2a6", "#fdbf6f", "#bbbb88", "#a6cee3", "#1f78b4", "#e08e79", "#e08e79", "#e08e79", "#e08e79", "#e08e79", "#e08e79", "#e08e79", "#e08e79", "#e08e79", "#e08e79", "#b2df8a", "#b2df8a", "#33a02c", "#33a02c", "#fdbf6f", "#bbbb88", "#a6cee3", "#1f78b4", "#e08e79", "#e08e79", "#e08e79", "#e08e79", "#e08e79", "#e08e79", "#e08e79", "#e08e79", "#e08e79", "#e08e79", "#b2df8a", "#b2df8a", "#b2df8a", "#33a02c", "#fdbf6f", "#bbbb88", "#a6cee3", "#1f78b4", "#e08e79", "#e08e79", "#e08e79", "#e08e79", "#e08e79", "#e08e79", "#e08e79", "#e08e79", "#e08e79", "#e08e79", "#b2df8a", "#b2df8a", "#b2df8a", "#b2df8a", "#fdbf6f"], "cpk": ["#FFFFFF", "#D9FFFF", "#CC80FF", "#C2FF00", "#FFB5B5", "#909090", "#3050F8", "#FF0D0D", "#90E050", "#B3E3F5", "#AB5CF2", "#8AFF00", "#BFA6A6", "#F0C8A0", "#FF8000", "#FFFF30", "#1FF01F", "#80D1E3", "#8F40D4", "#3DFF00", "#E6E6E6", "#BFC2C7", "#A6A6AB", "#8A99C7", "#9C7AC7", "#E06633", "#F090A0", "#50D050", "#C88033", "#7D80B0", "#C28F8F", "#668F8F", "#BD80E3", "#FFA100", "#A62929", "#5CB8D1", "#702EB0", "#00FF00", "#94FFFF", "#94E0E0", "#73C2C9", "#54B5B5", "#3B9E9E", "#248F8F", "#0A7D8C", "#006985", "#C0C0C0", "#FFD98F", "#A67573", "#668080", "#9E63B5", "#D47A00", "#940094", "#429EB0", "#57178F", "#00C900", "#00AB24", "#4DC2FF", "#4DA6FF", "#2194D6", "#267DAB", "#266696", "#175487", "#D0D0E0", "#FFD123", "#B8B8D0", "#A6544D", "#575961", "#9E4FB5", "#AB5C00", "#754F45", "#428296", "#420066", "#007D00", "#C70066", "#CC0059", "#D1004F", "#D90045", "#E00038", "#E6002E", "#EB0026", "#FF1493", "#FF1493", "#FF1493", "#FF1493", "#FF1493", "#FF1493", "#FF1493", "#FF1493"], "group": ["1", "18", "1", "2", "13", "14", "15", "16", "17", "18", "1", "2", "13", "14", "15", "16", "17", "18", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17"], "name": ["Hydrogen", "Helium", "Lithium", "Beryllium", "Boron", "Carbon", "Nitrogen", "Oxygen", "Fluorine", "Neon", "Sodium", "Magnesium", "Aluminum", "Silicon", "Phosphorus", "Sulfur", "Chlorine", "Argon", "Potassium", "Calcium", "Scandium", "Titanium", "Vanadium", "Chromium", "Manganese", "Iron", "Cobalt", "Nickel", "Copper", "Zinc", "Gallium", "Germanium", "Arsenic", "Selenium", "Bromine", "Krypton", "Rubidium", "Strontium", "Yttrium", "Zirconium", "Niobium", "Molybdenum", "Technetium", "Ruthenium", "Rhodium", "Palladium", "Silver", "Cadmium", "Indium", "Tin", "Antimony", "Tellurium", "Iodine", "Xenon", "Cesium", "Barium", "Lutetium", "Hafnium", "Tantalum", "Tungsten", "Rhenium", "Osmium", "Iridium", "Platinum", "Gold", "Mercury", "Thallium", "Lead", "Bismuth", "Polonium", "Astatine", "Radon", "Francium", "Radium", "Lawrencium", "Rutherfordium", "Dubnium", "Seaborgium", "Bohrium", "Hassium", "Meitnerium", "Darmstadtium", "Roentgenium", "Copernicium", "Ununtrium", "Ununquadium", "Ununpentium", "Ununhexium", "Ununseptium"], "atomic_number": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117], "type": ["nonmetal", "noble gas", "alkali metal", "alkaline earth metal", "metalloid", "nonmetal", "nonmetal", "nonmetal", "halogen", "noble gas", "alkali metal", "alkaline earth metal", "metal", "metalloid", "nonmetal", "nonmetal", "halogen", "noble gas", "alkali metal", "alkaline earth metal", "transition metal", "transition metal", "transition metal", "transition metal", "transition metal", "transition metal", "transition metal", "transition metal", "transition metal", "transition metal", "metal", "metalloid", "metalloid", "nonmetal", "halogen", "noble gas", "alkali metal", "alkaline earth metal", "transition metal", "transition metal", "transition metal", "transition metal", "transition metal", "transition metal", "transition metal", "transition metal", "transition metal", "transition metal", "metal", "metal", "metalloid", "metalloid", "halogen", "noble gas", "alkali metal", "alkaline earth metal", "transition metal", "transition metal", "transition metal", "transition metal", "transition metal", "transition metal", "transition metal", "transition metal", "transition metal", "transition metal", "metal", "metal", "metal", "metalloid", "halogen", "noble gas", "alkali metal", "alkaline earth metal", "transition metal", "transition metal", "transition metal", "transition metal", "transition metal", "transition metal", "transition metal", "transition metal", "transition metal", "transition metal", "metal", "metal", "metal", "metal", "halogen"], "massy": ["1:0.15", "1:0.15", "2:0.15", "2:0.15", "2:0.15", "2:0.15", "2:0.15", "2:0.15", "2:0.15", "2:0.15", "3:0.15", "3:0.15", "3:0.15", "3:0.15", "3:0.15", "3:0.15", "3:0.15", "3:0.15", "4:0.15", "4:0.15", "4:0.15", "4:0.15", "4:0.15", "4:0.15", "4:0.15", "4:0.15", "4:0.15", "4:0.15", "4:0.15", "4:0.15", "4:0.15", "4:0.15", "4:0.15", "4:0.15", "4:0.15", "4:0.15", "5:0.15", "5:0.15", "5:0.15", "5:0.15", "5:0.15", "5:0.15", "5:0.15", "5:0.15", "5:0.15", "5:0.15", "5:0.15", "5:0.15", "5:0.15", "5:0.15", "5:0.15", "5:0.15", "5:0.15", "5:0.15", "6:0.15", "6:0.15", "6:0.15", "6:0.15", "6:0.15", "6:0.15", "6:0.15", "6:0.15", "6:0.15", "6:0.15", "6:0.15", "6:0.15", "6:0.15", "6:0.15", "6:0.15", "6:0.15", "6:0.15", "6:0.15", "7:0.15", "7:0.15", "7:0.15", "7:0.15", "7:0.15", "7:0.15", "7:0.15", "7:0.15", "7:0.15", "7:0.15", "7:0.15", "7:0.15", "7:0.15", "7:0.15", "7:0.15", "7:0.15", "7:0.15"], "period": ["1", "1", "2", "2", "2", "2", "2", "2", "2", "2", "3", "3", "3", "3", "3", "3", "3", "3", "4", "4", "4", "4", "4", "4", "4", "4", "4", "4", "4", "4", "4", "4", "4", "4", "4", "4", "5", "5", "5", "5", "5", "5", "5", "5", "5", "5", "5", "5", "5", "5", "5", "5", "5", "5", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "7", "7", "7", "7", "7", "7", "7", "7", "7", "7", "7", "7", "7", "7", "7", "7", "7"], "sym": ["H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar", "K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br", "Kr", "Rb", "Sr", "Y", "Zr", "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Sb", "Te", "I", "Xe", "Cs", "Ba", "Lu", "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg", "Tl", "Pb", "Bi", "Po", "At", "Rn", "Fr", "Ra", "Lr", "Rf", "Db", "Sg", "Bh", "Hs", "Mt", "Ds", "Rg", "Cn", "Uut", "Uuq", "Uup", "Uuh", "Uus"], "namey": ["1:0.3", "1:0.3", "2:0.3", "2:0.3", "2:0.3", "2:0.3", "2:0.3", "2:0.3", "2:0.3", "2:0.3", "3:0.3", "3:0.3", "3:0.3", "3:0.3", "3:0.3", "3:0.3", "3:0.3", "3:0.3", "4:0.3", "4:0.3", "4:0.3", "4:0.3", "4:0.3", "4:0.3", "4:0.3", "4:0.3", "4:0.3", "4:0.3", "4:0.3", "4:0.3", "4:0.3", "4:0.3", "4:0.3", "4:0.3", "4:0.3", "4:0.3", "5:0.3", "5:0.3", "5:0.3", "5:0.3", "5:0.3", "5:0.3", "5:0.3", "5:0.3", "5:0.3", "5:0.3", "5:0.3", "5:0.3", "5:0.3", "5:0.3", "5:0.3", "5:0.3", "5:0.3", "5:0.3", "6:0.3", "6:0.3", "6:0.3", "6:0.3", "6:0.3", "6:0.3", "6:0.3", "6:0.3", "6:0.3", "6:0.3", "6:0.3", "6:0.3", "6:0.3", "6:0.3", "6:0.3", "6:0.3", "6:0.3", "6:0.3", "7:0.3", "7:0.3", "7:0.3", "7:0.3", "7:0.3", "7:0.3", "7:0.3", "7:0.3", "7:0.3", "7:0.3", "7:0.3", "7:0.3", "7:0.3", "7:0.3", "7:0.3", "7:0.3", "7:0.3"], "mass": ["1.00794", "4.002602", "6.941", "9.012182", "10.811", "12.0107", "14.0067", "15.9994", "18.9984032", "20.1797", "22.98976928", "24.3050", "26.9815386", "28.0855", "30.973762", "32.065", "35.453", "39.948", "39.0983", "40.078", "44.955912", "47.867", "50.9415", "51.9961", "54.938045", "55.845", "58.933195", "58.6934", "63.546", "65.38", "69.723", "72.64", "74.92160", "78.96", "79.904", "83.798", "85.4678", "87.62", "88.90585", "91.224", "92.90638", "95.96", "[98]", "101.07", "102.90550", "106.42", "107.8682", "112.411", "114.818", "118.710", "121.760", "127.60", "126.90447", "131.293", "132.9054519", "137.327", "174.9668", "178.49", "180.94788", "183.84", "186.207", "190.23", "192.217", "195.084", "196.966569", "200.59", "204.3833", "207.2", "208.98040", "[209]", "[210]", "[222]", "[223]", "[226]", "[262]", "[267]", "[268]", "[271]", "[272]", "[270]", "[276]", "[281]", "[280]", "[285]", "[284]", "[289]", "[288]", "[293]", "nan"], "symx": ["1:0.1", "18:0.1", "1:0.1", "2:0.1", "13:0.1", "14:0.1", "15:0.1", "16:0.1", "17:0.1", "18:0.1", "1:0.1", "2:0.1", "13:0.1", "14:0.1", "15:0.1", "16:0.1", "17:0.1", "18:0.1", "1:0.1", "2:0.1", "3:0.1", "4:0.1", "5:0.1", "6:0.1", "7:0.1", "8:0.1", "9:0.1", "10:0.1", "11:0.1", "12:0.1", "13:0.1", "14:0.1", "15:0.1", "16:0.1", "17:0.1", "18:0.1", "1:0.1", "2:0.1", "3:0.1", "4:0.1", "5:0.1", "6:0.1", "7:0.1", "8:0.1", "9:0.1", "10:0.1", "11:0.1", "12:0.1", "13:0.1", "14:0.1", "15:0.1", "16:0.1", "17:0.1", "18:0.1", "1:0.1", "2:0.1", "3:0.1", "4:0.1", "5:0.1", "6:0.1", "7:0.1", "8:0.1", "9:0.1", "10:0.1", "11:0.1", "12:0.1", "13:0.1", "14:0.1", "15:0.1", "16:0.1", "17:0.1", "18:0.1", "1:0.1", "2:0.1", "3:0.1", "4:0.1", "5:0.1", "6:0.1", "7:0.1", "8:0.1", "9:0.1", "10:0.1", "11:0.1", "12:0.1", "13:0.1", "14:0.1", "15:0.1", "16:0.1", "17:0.1"], "electronic": ["1s1", "1s2", "[He] 2s1", "[He] 2s2", "[He] 2s2 2p1", "[He] 2s2 2p2", "[He] 2s2 2p3", "[He] 2s2 2p4", "[He] 2s2 2p5", "[He] 2s2 2p6", "[Ne] 3s1", "[Ne] 3s2", "[Ne] 3s2 3p1", "[Ne] 3s2 3p2", "[Ne] 3s2 3p3", "[Ne] 3s2 3p4", "[Ne] 3s2 3p5", "[Ne] 3s2 3p6", "[Ar] 4s1", "[Ar] 4s2", "[Ar] 3d1 4s2", "[Ar] 3d2 4s2", "[Ar] 3d3 4s2", "[Ar] 3d5 4s1", "[Ar] 3d5 4s2", "[Ar] 3d6 4s2", "[Ar] 3d7 4s2", "[Ar] 3d8 4s2", "[Ar] 3d10 4s1", "[Ar] 3d10 4s2", "[Ar] 3d10 4s2 4p1", "[Ar] 3d10 4s2 4p2", "[Ar] 3d10 4s2 4p3", "[Ar] 3d10 4s2 4p4", "[Ar] 3d10 4s2 4p5", "[Ar] 3d10 4s2 4p6", "[Kr] 5s1", "[Kr] 5s2", "[Kr] 4d1 5s2", "[Kr] 4d2 5s2", "[Kr] 4d4 5s1", "[Kr] 4d5 5s1", "[Kr] 4d5 5s2", "[Kr] 4d7 5s1", "[Kr] 4d8 5s1", "[Kr] 4d10", "[Kr] 4d10 5s1", "[Kr] 4d10 5s2", "[Kr] 4d10 5s2 5p1", "[Kr] 4d10 5s2 5p2", "[Kr] 4d10 5s2 5p3", "[Kr] 4d10 5s2 5p4", "[Kr] 4d10 5s2 5p5", "[Kr] 4d10 5s2 5p6", "[Xe] 6s1", "[Xe] 6s2", "[Xe] 4f14 5d1 6s2", "[Xe] 4f14 5d2 6s2", "[Xe] 4f14 5d3 6s2", "[Xe] 4f14 5d4 6s2", "[Xe] 4f14 5d5 6s2", "[Xe] 4f14 5d6 6s2", "[Xe] 4f14 5d7 6s2", "[Xe] 4f14 5d9 6s1", "[Xe] 4f14 5d10 6s1", "[Xe] 4f14 5d10 6s2", "[Xe] 4f14 5d10 6s2 6p1", "[Xe] 4f14 5d10 6s2 6p2", "[Xe] 4f14 5d10 6s2 6p3", "[Xe] 4f14 5d10 6s2 6p4", "[Xe] 4f14 5d10 6s2 6p5", "[Xe] 4f14 5d10 6s2 6p6", "[Rn] 7s1", "[Rn] 7s2", "[Rn] 5f14 7s2 7p1", "[Rn] 5f14 6d2 7s2", "[Rn].5f14.6d3.7s2", "[Rn].5f14.6d4.7s2", "[Rn].5f14.6d5.7s2", "[Rn].5f14.6d6.7s2", "[Rn].5f14.6d7.7s2", "[Rn].5f14.6d9.7s1", "[Rn].5f14.6d10.7s1", "[Rn].5f14.6d10.7s2", "[Rn].5f14.6d10.7s2.7p1", "[Rn].5f14.6d10.7s2.7p2", "[Rn].5f14.6d10.7s2.7p3", "[Rn].5f14.6d10.7s2.7p4", "[Rn].5f14.6d10.7s2.7p5"], "numbery": ["1:0.8", "1:0.8", "2:0.8", "2:0.8", "2:0.8", "2:0.8", "2:0.8", "2:0.8", "2:0.8", "2:0.8", "3:0.8", "3:0.8", "3:0.8", "3:0.8", "3:0.8", "3:0.8", "3:0.8", "3:0.8", "4:0.8", "4:0.8", "4:0.8", "4:0.8", "4:0.8", "4:0.8", "4:0.8", "4:0.8", "4:0.8", "4:0.8", "4:0.8", "4:0.8", "4:0.8", "4:0.8", "4:0.8", "4:0.8", "4:0.8", "4:0.8", "5:0.8", "5:0.8", "5:0.8", "5:0.8", "5:0.8", "5:0.8", "5:0.8", "5:0.8", "5:0.8", "5:0.8", "5:0.8", "5:0.8", "5:0.8", "5:0.8", "5:0.8", "5:0.8", "5:0.8", "5:0.8", "6:0.8", "6:0.8", "6:0.8", "6:0.8", "6:0.8", "6:0.8", "6:0.8", "6:0.8", "6:0.8", "6:0.8", "6:0.8", "6:0.8", "6:0.8", "6:0.8", "6:0.8", "6:0.8", "6:0.8", "6:0.8", "7:0.8", "7:0.8", "7:0.8", "7:0.8", "7:0.8", "7:0.8", "7:0.8", "7:0.8", "7:0.8", "7:0.8", "7:0.8", "7:0.8", "7:0.8", "7:0.8", "7:0.8", "7:0.8", "7:0.8"]}, "id": "6c2e2447-cc60-46e9-847a-dfaaa4bbe67e"}, "type": "ColumnDataSource", "id": "6c2e2447-cc60-46e9-847a-dfaaa4bbe67e"}, {"attributes": {"line_color": {"value": "#1f77b4"}, "line_alpha": {"value": 0.1}, "fill_color": {"value": "#1f77b4"}, "tags": [], "doc": null, "fill_alpha": {"value": 0.1}, "height": {"units": "data", "value": 0.9}, "width": {"units": "data", "value": 0.9}, "y": {"field": "period"}, "x": {"field": "group"}, "id": "05eb3fe4-2e1f-4b45-bf04-97225818dba7"}, "type": "Rect", "id": "05eb3fe4-2e1f-4b45-bf04-97225818dba7"}, {"subtype": "Figure", "type": "Plot", "id": "dbf9ba06-e362-4ad3-92b1-da7d16790e50", "attributes": {"x_range": {"type": "FactorRange", "id": "3f9c186d-d31d-4c12-b19d-58851b51bf32"}, "right": [], "above": [], "tags": [], "toolbar_location": null, "title": "Periodic Table", "extra_y_ranges": {}, "plot_width": 1200, "renderers": [{"type": "CategoricalAxis", "id": "d7851f06-3413-4dfd-9cd5-2c0fd7601034"}, {"type": "Grid", "id": "d9512515-c60d-4a3a-a558-04089dad11f3"}, {"type": "CategoricalAxis", "id": "737ce567-c60d-4638-a1cd-50a544b24337"}, {"type": "Grid", "id": "e221a59a-d1d4-4f21-b51f-75cb4f52af6c"}, {"type": "GlyphRenderer", "id": "59248d3f-a582-4421-8e13-5a3e5ac3461e"}, {"type": "GlyphRenderer", "id": "56a805b7-2f32-487b-8c74-1a99a2ff7222"}, {"type": "GlyphRenderer", "id": "46aa3a88-fe97-4a86-a822-0da6958afe60"}, {"type": "GlyphRenderer", "id": "964b7035-9a08-4fa9-9262-225cdc8ab9be"}, {"type": "GlyphRenderer", "id": "0edbd2bd-fca8-49d6-8519-fee966296e67"}], "extra_x_ranges": {}, "below": [{"type": "CategoricalAxis", "id": "d7851f06-3413-4dfd-9cd5-2c0fd7601034"}], "tool_events": {"type": "ToolEvents", "id": "c988e5f3-a22b-4b4f-ba51-82293ec633eb"}, "tools": [{"type": "PanTool", "id": "0329bead-adc0-489e-a9fd-1105e4eb034b"}, {"type": "WheelZoomTool", "id": "69fe9880-377f-46fa-b9a5-934d221f9429"}, {"type": "BoxZoomTool", "id": "c75f6a1f-b918-4ec9-a00f-c3d4adda1097"}, {"type": "PreviewSaveTool", "id": "01f63adf-64d1-4b34-ae2d-f3f043233079"}, {"type": "ResizeTool", "id": "521b02df-8ede-4c3e-97a7-64bb6be3d725"}, {"type": "ResetTool", "id": "3a4c1187-b7ad-4dab-ad0a-3b3702843bb9"}, {"type": "HelpTool", "id": "7ac8c215-01eb-4156-898e-272d18ab93ad"}], "doc": null, "y_range": {"type": "FactorRange", "id": "f048f258-0997-474e-ab87-65cdf3a3385a"}, "id": "dbf9ba06-e362-4ad3-92b1-da7d16790e50", "left": [{"type": "CategoricalAxis", "id": "737ce567-c60d-4638-a1cd-50a544b24337"}]}}, {"attributes": {"nonselection_glyph": {"type": "Rect", "id": "05eb3fe4-2e1f-4b45-bf04-97225818dba7"}, "data_source": {"type": "ColumnDataSource", "id": "6c2e2447-cc60-46e9-847a-dfaaa4bbe67e"}, "tags": [], "doc": null, "selection_glyph": null, "id": "59248d3f-a582-4421-8e13-5a3e5ac3461e", "glyph": {"type": "Rect", "id": "bf44bb0d-257b-460e-b476-e93c8856a0a2"}}, "type": "GlyphRenderer", "id": "59248d3f-a582-4421-8e13-5a3e5ac3461e"}];

  if(typeof(Bokeh) !== "undefined") {
    console.log("Bokeh: BokehJS loaded, going straight to plotting");
    Bokeh.embed.inject_plot("71e2a3bc-e964-4d36-930a-4adbb7a8c104", all_models);
  } else {
    load_lib(bokehjs_url, function() {
      console.log("Bokeh: BokehJS plotting callback run at", new Date())
      Bokeh.embed.inject_plot("71e2a3bc-e964-4d36-930a-4adbb7a8c104", all_models);
    });
  }

}(this));