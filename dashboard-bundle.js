(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var css = "/*-----------------------------------------------------------------------------\n| Copyright (c) 2014-2015, PhosphorJS Contributors\n|\n| Distributed under the terms of the BSD 3-Clause License.\n|\n| The full license is in the file LICENSE, distributed with this software.\n|----------------------------------------------------------------------------*/\nbody {\n  margin: 0;\n  padding: 0;\n  background: #F5F6F7;\n  overflow: hidden;\n}\n#main {\n  position: absolute;\n  top: 10px;\n  left: 10px;\n  right: 10px;\n  bottom: 10px;\n}\n.content {\n  min-width: 50px;\n  min-height: 50px;\n  font-family: FontAwesome;\n  font-weight: bold;\n  font-size: 1.2em;\n}\n.dashboard-content {\n  padding: 20px;\n}\n.list-item {\n  margin: 1px;\n  min-width: 100px;\n  min-height: 50px;\n  font-family: FontAwesome;\n  font-weight: bold;\n  font-size: 1.2em;\n  opacity: 0.45;\n  cursor: not-allowed;\n}\n.draggable {\n  opacity: 1;\n  cursor: move;\n}\n.list-item.p-mod-ghost {\n  opacity: 0.70;\n  transform: translateX(-10px) translateY(-10px);\n}\n.toggle {\n  margin: 10px;\n  min-width: 100px;\n  min-height: 50px;\n  text-align: center;\n}\n.red {\n  background: #E74C3C;\n  color: #3498DB;\n}\n.yellow {\n  background: #F1C40F;\n  color: #4B0082;\n}\n.green {\n  background: #27AE60;\n}\n.blue {\n  background: #3498DB;\n  color: #E74C3C;\n}\n.purple {\n  background: #4B0082;\n  color: #F1C40F;\n}\n.p-DockTabPanel {\n  padding-right: 2px;\n  padding-bottom: 2px;\n}\n.p-DockTabPanel > .p-StackedPanel {\n  padding: 10px;\n  background: white;\n  border: 1px solid #C0C0C0;\n  border-top: none;\n  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);\n}\n.p-DockPanelOverlay {\n  background: rgba(255, 255, 255, 0.6);\n  border: 1px dashed black;\n}\n.p-DockPanelOverlay.p-mod-edge-top {\n  border-top-width: 2px;\n}\n.p-DockPanelOverlay.p-mod-edge-left {\n  border-left-width: 2px;\n}\n.p-DockPanelOverlay.p-mod-edge-right {\n  border-right-width: 2px;\n}\n.p-DockPanelOverlay.p-mod-edge-bottom {\n  border-bottom-width: 2px;\n}\n.p-TabBar {\n  min-height: 24px;\n}\n.p-TabBar-content {\n  bottom: 1px;\n  align-items: flex-end;\n}\n.p-TabBar-content > .p-Tab {\n  flex-basis: 125px;\n  max-height: 21px;\n  min-width: 35px;\n  margin-left: -1px;\n  border: 1px solid #C0C0C0;\n  border-bottom: none;\n  padding: 0px 10px;\n  background: #E5E5E5;\n  font: 12px Helvetica, Arial, sans-serif;\n}\n.p-TabBar-content > .p-Tab.p-mod-first {\n  margin-left: 0;\n}\n.p-TabBar-content > .p-Tab.p-mod-selected {\n  min-height: 24px;\n  background: white;\n  transform: translateY(1px);\n}\n.p-TabBar-content > .p-Tab:hover:not(.p-mod-selected) {\n  background: #F0F0F0;\n}\n.p-TabBar-content > .p-Tab > span {\n  line-height: 21px;\n}\n.p-TabBar-footer {\n  display: block;\n  height: 1px;\n  background: #C0C0C0;\n}\n.p-Tab.p-mod-closable > .p-Tab-close {\n  margin-left: 4px;\n}\n.p-Tab.p-mod-closable > .p-Tab-close:before {\n  content: '\\f00d';\n  font-family: FontAwesome;\n}\n.p-Tab.p-mod-docking {\n  font: 12px Helvetica, Arial, sans-serif;\n  height: 24px;\n  width: 125px;\n  padding: 0px 10px;\n  background: white;\n  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);\n}\n.p-Tab.p-mod-docking > span {\n  line-height: 21px;\n}\n"; (require("browserify-css").createStyle(css, { "href": "example/dashboard.css"})); module.exports = css;
},{"browserify-css":5}],2:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use-strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var phosphor_domutil_1 = require('phosphor-domutil');
var phosphor_splitpanel_1 = require('phosphor-splitpanel');
var phosphor_tabs_1 = require('phosphor-tabs');
var phosphor_widget_1 = require('phosphor-widget');
var index_1 = require('../lib/index');
require('./dashboard.css');
var ListItem = (function (_super) {
    __extends(ListItem, _super);
    function ListItem(color, label, _plot) {
        _super.call(this);
        this.color = color;
        this.label = label;
        this._plot = _plot;
        this._draggable = false;
        this._dragHandler = null;
        this.node.querySelector('span').textContent = label;
    }
    ListItem.createNode = function () {
        var node = document.createElement('div');
        var span = document.createElement('span');
        node.className = 'list-item';
        node.appendChild(span);
        return node;
    };
    Object.defineProperty(ListItem.prototype, "draggable", {
        get: function () {
            return this._draggable;
        },
        set: function (draggable) {
            if (this._draggable === draggable) {
                return;
            }
            this._draggable = draggable;
            if (draggable) {
                this._dragHandler = new phosphor_domutil_1.DragHandler(this.node, this);
                this._dragHandler.onDragStart = this._onDragStart;
                this._dragHandler.onDragEnd = this._onDragEnd;
                this.addClass('draggable');
            }
            else {
                this.removeClass('draggable');
                this._dragHandler.dispose();
                this._dragHandler = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    ListItem.prototype.dispose = function () {
        this.draggable = false;
        _super.prototype.dispose.call(this);
    };
    ListItem.prototype._onDragStart = function (event, data) {
        var factory = plotFactory(this, this._plot);
        data.setData(index_1.DockPanel.DROP_MIME_TYPE, factory);
    };
    ListItem.prototype._onDragEnd = function (event, data) {
        if (data.dropAction !== 'none') {
            this.draggable = false;
        }
    };
    return ListItem;
})(phosphor_widget_1.Widget);
var Plot = (function (_super) {
    __extends(Plot, _super);
    function Plot(item, node) {
        _super.call(this);
        this._item = null;
        this._item = item;
        this.addClass('content');
        this.addClass('dashboard-content');
        this.node.appendChild(node);
    }
    Plot.prototype.onCloseRequest = function (msg) {
        _super.prototype.onCloseRequest.call(this, msg);
        // Reactivate the list item.
        this._item.draggable = true;
    };
    return Plot;
})(phosphor_widget_1.Widget);
function plotFactory(item, node) {
    return function () {
        var plot = new Plot(item, node);
        // This should become unnecessary in DockPanel instances without tabs.
        var tab = new phosphor_tabs_1.Tab(item.label);
        tab.closable = true;
        index_1.DockPanel.setTab(plot, tab);
        return plot;
    };
}
function createDock() {
    var dock = new index_1.DockPanel();
    dock.addClass('content');
    dock.addClass('green');
    dock.droppable = true;
    return dock;
}
function createList() {
    var widget = new phosphor_widget_1.Widget();
    widget.addClass('content');
    widget.addClass('green');
    return widget;
}
function createToggle(list, dock) {
    var toggle = new phosphor_widget_1.Widget();
    var button = document.createElement('button');
    button.textContent = "Droppable: " + dock.droppable;
    button.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        dock.droppable = !dock.droppable;
        button.textContent = "Droppable: " + dock.droppable;
    });
    toggle.node.appendChild(button);
    toggle.addClass('toggle');
    list.addChild(toggle);
}
function populateList(list, dock) {
    var plots = document.querySelectorAll('div.bk-plot');
    var colors = ['yellow', 'blue', 'red', 'purple'];
    var labels = [
        'Periodic Table',
        'Linked One',
        'Linked Two',
        'Linked Three'
    ];
    for (var index = 0; index < 4; ++index) {
        var plot = document.body.removeChild(plots[index]);
        var item = new ListItem(colors[index], labels[index], plot);
        item.addClass(colors[index]);
        item.draggable = true;
        list.addChild(item);
    }
    createToggle(list, dock);
}
function main() {
    var list = createList();
    var dock = createDock();
    var panel = new phosphor_splitpanel_1.SplitPanel();
    populateList(list, dock);
    panel.orientation = phosphor_splitpanel_1.SplitPanel.Horizontal;
    panel.children = [list, dock];
    phosphor_splitpanel_1.SplitPanel.setStretch(list, 1);
    phosphor_splitpanel_1.SplitPanel.setStretch(dock, 5);
    panel.id = 'main';
    phosphor_widget_1.Widget.attach(panel, document.body);
    window.onresize = function () { return panel.update(); };
}
window.addEventListener('load', function () {
    requestAnimationFrame(main);
});

},{"../lib/index":4,"./dashboard.css":1,"phosphor-domutil":14,"phosphor-splitpanel":22,"phosphor-tabs":30,"phosphor-widget":37}],3:[function(require,module,exports){
var css = "/*-----------------------------------------------------------------------------\n| Copyright (c) 2014-2015, PhosphorJS Contributors\n|\n| Distributed under the terms of the BSD 3-Clause License.\n|\n| The full license is in the file LICENSE, distributed with this software.\n|----------------------------------------------------------------------------*/\n.p-DockPanel {\n  z-index: 0;\n}\n.p-DockPanel > .p-DockSplitPanel {\n  z-index: 0;\n}\n.p-DockPanelOverlay {\n  box-sizing: border-box;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 0;\n  height: 0;\n  z-index: 1;\n}\n.p-DockPanelOverlay.p-mod-hidden {\n  display: none;\n}\n.p-Tab.p-mod-docking {\n  position: absolute;\n  transform: translateX(-40%) translateY(-58%);\n}\n"; (require("browserify-css").createStyle(css, { "href": "lib/index.css"})); module.exports = css;
},{"browserify-css":5}],4:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var arrays = require('phosphor-arrays');
var phosphor_boxpanel_1 = require('phosphor-boxpanel');
var phosphor_domutil_1 = require('phosphor-domutil');
var phosphor_nodewrapper_1 = require('phosphor-nodewrapper');
var phosphor_properties_1 = require('phosphor-properties');
var phosphor_splitpanel_1 = require('phosphor-splitpanel');
var phosphor_stackedpanel_1 = require('phosphor-stackedpanel');
var phosphor_tabs_1 = require('phosphor-tabs');
require('./index.css');
/**
 * The class name added to DockPanel instances.
 */
var DOCK_PANEL_CLASS = 'p-DockPanel';
/**
 * The class name added to dock split panels.
 */
var SPLIT_PANEL_CLASS = 'p-DockSplitPanel';
/**
 * The class name added to dock tab panels.
 */
var TAB_PANEL_CLASS = 'p-DockTabPanel';
/**
 * The class name added to dock panel overlays.
 */
var OVERLAY_CLASS = 'p-DockPanelOverlay';
/**
 * The class name added to a tab which is being docked.
 */
var DOCKING_CLASS = 'p-mod-docking';
/**
 * The class name added to hidden overlays.
 */
var HIDDEN_CLASS = 'p-mod-hidden';
/**
 * The class name added to top edge dock overlays.
 */
var EDGE_TOP_CLASS = 'p-mod-edge-top';
/**
 * The class name added to left edge dock overlays.
 */
var EDGE_LEFT_CLASS = 'p-mod-edge-left';
/**
 * The class name added to right edge dock overlays.
 */
var EDGE_RIGHT_CLASS = 'p-mod-edge-right';
/**
 * The class name added to bottom edge dock overlays.
 */
var EDGE_BOTTOM_CLASS = 'p-mod-edge-bottom';
/**
 * The class name added to top panel dock overlays.
 */
var PANEL_TOP_CLASS = 'p-mod-panel-top';
/**
 * The class name added to left panel dock overlays.
 */
var PANEL_LEFT_CLASS = 'p-mod-panel-left';
/**
 * The class name added to right panel dock overlays.
 */
var PANEL_RIGHT_CLASS = 'p-mod-panel-right';
/**
 * The class name added to bottom panel dock overlays.
 */
var PANEL_BOTTOM_CLASS = 'p-mod-panel-bottom';
/**
 * The class named added to center panel dock overlays.
 */
var PANEL_CENTER_CLASS = 'p-mod-panel-center';
/**
 * The size of the edge dock zone for the root panel.
 */
var EDGE_SIZE = 30;
/**
 * A widget which provides a flexible docking area for content widgets.
 *
 * #### Notes
 * Widgets should be added to a `DockPanel` using one of the dedicated
 * dock methods. The inherited `<prefix>Child` methods should **not**
 * be used. Widgets can be removed from a `DockPanel` by setting their
 * `parent` reference to `null`.
 */
var DockPanel = (function (_super) {
    __extends(DockPanel, _super);
    /**
     * Construct a new dock panel.
     */
    function DockPanel() {
        _super.call(this);
        this._droppable = false;
        this._dropHandler = null;
        this._items = [];
        this._dragData = null;
        this._overlay = new DockPanelOverlay();
        this.addClass(DOCK_PANEL_CLASS);
        this.node.appendChild(this._overlay.node);
        this._root = this._createSplitPanel(phosphor_splitpanel_1.Orientation.Horizontal);
        this.addChild(this._root);
    }
    /**
     * Get the dock panel tab for the given widget.
     *
     * @param widget - The widget of interest.
     *
     * @returns The dock panel tab for the given widget.
     *
     * #### Notes
     * This is a pure delegate for the [[tabProperty]].
     */
    DockPanel.getTab = function (widget) {
        return DockPanel.tabProperty.get(widget);
    };
    /**
     * Set the dock panel tab for the given widget.
     *
     * @param widget - The widget of interest.
     *
     * @param tab - The tab to use for the widget in a dock panel.
     *
     * #### Notes
     * This is a pure delegate for the [[tabProperty]].
     */
    DockPanel.setTab = function (widget, tab) {
        DockPanel.tabProperty.set(widget, tab);
    };
    /**
     * Dispose of the resources held by the widget.
     */
    DockPanel.prototype.dispose = function () {
        this._abortDrag();
        this._root = null;
        this._items.length = 0;
        _super.prototype.dispose.call(this);
    };
    Object.defineProperty(DockPanel.prototype, "droppable", {
        /**
         * Get whether the dock panel is a drop target.
         */
        get: function () {
            return this._droppable;
        },
        /**
         * Set whether the dock panel is a drop target.
         */
        set: function (droppable) {
            if (this._droppable === droppable) {
                return;
            }
            this._droppable = droppable;
            if (droppable) {
                this._dropHandler = new phosphor_domutil_1.DropHandler(this.node, this);
                this._dropHandler.onDragEnter = this._onDragEnter;
                this._dropHandler.onDragLeave = this._onDragLeave;
                this._dropHandler.onDragOver = this._onDragOver;
                this._dropHandler.onDrop = this._onDrop;
            }
            else {
                this._dropHandler.dispose();
                this._dropHandler = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DockPanel.prototype, "spacing", {
        /**
         * Get the spacing between the docked panels.
         *
         * #### Notes
         * This is a pure delegate to the [[spacingProperty]].
         */
        get: function () {
            return DockPanel.spacingProperty.get(this);
        },
        /**
         * Set the spacing between the docked panels.
         *
         * #### Notes
         * This is a pure delegate to the [[spacingProperty]].
         */
        set: function (value) {
            DockPanel.spacingProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Insert a widget above a reference widget.
     *
     * @param ref - The reference widget. If this is null, or is not
     *   contained in the panel, the widget will be inserted at the
     *   top edge of the dock panel.
     *
     * @param widget - The widget to insert into the dock panel.
     */
    DockPanel.prototype.splitTop = function (ref, widget) {
        if (ref === widget)
            return;
        this._splitWidget(ref, widget, phosphor_splitpanel_1.Orientation.Vertical, false);
    };
    /**
     * Insert a widget to the left of a reference widget.
     *
     * @param ref - The reference widget. If this is null, or is not
     *   contained in the panel, the widget will be inserted at the
     *   left edge of the dock panel.
     *
     * @param widget - The widget to insert into the dock panel.
     */
    DockPanel.prototype.splitLeft = function (ref, widget) {
        if (ref === widget)
            return;
        this._splitWidget(ref, widget, phosphor_splitpanel_1.Orientation.Horizontal, false);
    };
    /**
     * Insert a widget to the right of a reference widget.
     *
     * @param ref - The reference widget. If this is null, or is not
     *   contained in the panel, the widget will be inserted at the
     *   right edge of the dock panel.
     *
     * @param widget - The widget to insert into the dock panel.
     */
    DockPanel.prototype.splitRight = function (ref, widget) {
        if (ref === widget)
            return;
        this._splitWidget(ref, widget, phosphor_splitpanel_1.Orientation.Horizontal, true);
    };
    /**
     * Insert a widget below a reference widget.
     *
     * @param ref - The reference widget. If this is null, or is not
     *   contained in the panel, the widget will be inserted at the
     *   bottom edge of the dock panel.
     *
     * @param widget - The widget to insert into the dock panel.
     */
    DockPanel.prototype.splitBottom = function (ref, widget) {
        if (ref === widget)
            return;
        this._splitWidget(ref, widget, phosphor_splitpanel_1.Orientation.Vertical, true);
    };
    /**
     * Insert a widget as a sibling tab to a reference widget.
     *
     * @param ref - The reference widget. If this is null, or is not
     *   contained in the panel, the widget will be inserted at the
     *   right edge of the dock panel.
     *
     * @param widget - The widget to insert into the dock panel.
     */
    DockPanel.prototype.tabify = function (ref, widget) {
        if (ref === widget)
            return;
        this._tabifyWidget(ref, widget);
    };
    /**
     * Handle the DOM events for the dock panel.
     *
     * @param event - The DOM event sent to the dock panel.
     *
     * #### Notes
     * This method implements the DOM `EventListener` interface and is
     * called in response to events on the dock panel's DOM node. It
     * should not be called directly by user code.
     */
    DockPanel.prototype.handleEvent = function (event) {
        switch (event.type) {
            case 'mousemove':
                this._evtMouseMove(event);
                break;
            case 'mouseup':
                this._evtMouseUp(event);
                break;
            case 'contextmenu':
                this._evtContextMenu(event);
                break;
        }
    };
    /**
     * A message handler invoked on a `'before-detach'` message.
     */
    DockPanel.prototype.onBeforeDetach = function (msg) {
        _super.prototype.onBeforeDetach.call(this, msg);
        // Setting droppable to false removes the DOM listeners.
        this.droppable = false;
    };
    DockPanel.prototype._onDragEnter = function (event, dragData) {
        dragData.dropAction = 'copy';
    };
    DockPanel.prototype._onDragOver = function (event, dragData) {
        var factory = dragData.getData(DockPanel.DROP_MIME_TYPE);
        if (factory) {
            this._showOverlay(event.clientX, event.clientY);
        }
    };
    DockPanel.prototype._onDragLeave = function (event, dragData) {
        this._overlay.hide();
    };
    DockPanel.prototype._onDrop = function (event, dragData) {
        var factory = dragData.getData(DockPanel.DROP_MIME_TYPE);
        this._overlay.hide();
        if (!factory) {
            console.log("no appropriate data for " + DockPanel.DROP_MIME_TYPE);
            dragData.dropAction = 'none';
            return;
        }
        var data = findDockTarget(this._root, event.clientX, event.clientY);
        if (data.zone === 9 /* Invalid */) {
            return;
        }
        var widget = factory();
        // Dock the panel according to the indicated zone.
        switch (data.zone) {
            case 0 /* EdgeTop */:
                this._addPanel(widget, phosphor_splitpanel_1.Orientation.Vertical, false);
                break;
            case 1 /* EdgeLeft */:
                this._addPanel(widget, phosphor_splitpanel_1.Orientation.Horizontal, false);
                break;
            case 2 /* EdgeRight */:
                this._addPanel(widget, phosphor_splitpanel_1.Orientation.Horizontal, true);
                break;
            case 3 /* EdgeBottom */:
                this._addPanel(widget, phosphor_splitpanel_1.Orientation.Vertical, true);
                break;
            case 4 /* PanelTop */:
                this._splitPanel(data.panel, widget, phosphor_splitpanel_1.Orientation.Vertical, false);
                break;
            case 5 /* PanelLeft */:
                this._splitPanel(data.panel, widget, phosphor_splitpanel_1.Orientation.Horizontal, false);
                break;
            case 6 /* PanelRight */:
                this._splitPanel(data.panel, widget, phosphor_splitpanel_1.Orientation.Horizontal, true);
                break;
            case 7 /* PanelBottom */:
                this._splitPanel(data.panel, widget, phosphor_splitpanel_1.Orientation.Vertical, true);
                break;
            case 8 /* PanelCenter */:
                this._tabifyPanel(data.panel, widget);
                break;
        }
    };
    /**
     * Add a widget to a new tab panel next to a reference.
     */
    DockPanel.prototype._splitWidget = function (ref, widget, orientation, after) {
        var item = ref ? this._findItemByWidget(ref) : void 0;
        if (item) {
            this._splitPanel(item.panel, widget, orientation, after);
        }
        else {
            this._addPanel(widget, orientation, after);
        }
    };
    /**
     * Add a widget as the tab panel which owns a reference.
     */
    DockPanel.prototype._tabifyWidget = function (ref, widget) {
        var item = ref ? this._findItemByWidget(ref) : void 0;
        if (item) {
            this._tabifyPanel(item.panel, widget);
        }
        else {
            this._addPanel(widget, phosphor_splitpanel_1.Orientation.Horizontal, true);
        }
    };
    /**
     * Split a panel with a widget along the given orientation.
     */
    DockPanel.prototype._splitPanel = function (target, widget, orientation, after) {
        // Ensure the widget has a dock panel tab.
        var tab = DockPanel.getTab(widget);
        if (!tab) {
            throw new Error('`DockPanel.tab` property not set');
        }
        // Remove the widget from its current parent.
        widget.parent = null;
        // Create a new dock tab panel to host the widget.
        var panel = this._createTabPanel();
        // Create and add the dock item for the widget.
        this._items.push({ tab: tab, widget: widget, panel: panel });
        // Add the widget to the tab panel.
        panel.stack.addChild(widget);
        panel.tabs.addTab(tab);
        // Add the new panel to the parent split panel. This may require
        // creating a new child split panel to adhere to the orientation
        // constraint. The new panel is sized to occupy 1/2 the space.
        var splitPanel = target.parent;
        if (splitPanel.orientation !== orientation) {
            if (splitPanel.childCount <= 1) {
                splitPanel.orientation = orientation;
                splitPanel.insertChild(+after, panel);
                splitPanel.setSizes([1, 1]);
            }
            else {
                var sizes = splitPanel.sizes();
                var i = splitPanel.childIndex(target);
                var childSplit = this._createSplitPanel(orientation);
                childSplit.addChild(target);
                childSplit.insertChild(+after, panel);
                splitPanel.insertChild(i, childSplit);
                splitPanel.setSizes(sizes);
                childSplit.setSizes([1, 1]);
            }
        }
        else {
            var i = splitPanel.childIndex(target);
            var sizes = splitPanel.sizes();
            var size = sizes[i] = sizes[i] / 2;
            splitPanel.insertChild(i + (+after), panel);
            arrays.insert(sizes, i + (+after), size);
            splitPanel.setSizes(sizes);
        }
    };
    /**
     * Add a widget to the specified tab panel.
     */
    DockPanel.prototype._tabifyPanel = function (target, widget) {
        // Ensure the widget has a dock panel tab.
        var tab = DockPanel.getTab(widget);
        if (!tab) {
            throw new Error('`DockPanel.tab` property not set');
        }
        // Remove the widget from its current parent.
        widget.parent = null;
        // Create and add the dock item for the widget.
        this._items.push({ tab: tab, widget: widget, panel: target });
        // Add the widget to the tab panel.
        target.stack.addChild(widget);
        target.tabs.addTab(tab);
        target.tabs.selectedTab = tab;
    };
    /**
     * Add a widget to a new border panel along the given orientation.
     */
    DockPanel.prototype._addPanel = function (widget, orientation, after) {
        // Ensure the widget has a dock panel tab.
        var tab = DockPanel.getTab(widget);
        if (!tab) {
            throw new Error('`DockPanel.tab` property not set');
        }
        // Remove the widget from its current parent.
        widget.parent = null;
        // Create a new tab panel to host the widget.
        var panel = this._createTabPanel();
        // Create and add the dock item for the widget.
        this._items.push({ tab: tab, widget: widget, panel: panel });
        // Add the widget to the tab panel.
        panel.stack.addChild(widget);
        panel.tabs.addTab(tab);
        // Ensure a proper root panel orientation.
        this._ensureRoot(orientation);
        // Insert the panel and size it to occupy 1/3 the space.
        var sizes = this._root.sizes();
        arrays.insert(sizes, after ? sizes.length : 0, 0.5);
        this._root.insertChild(after ? this._root.childCount : 0, panel);
        this._root.setSizes(sizes);
    };
    /**
     * Handle the `'mousemove'` event for the dock panel.
     */
    DockPanel.prototype._evtMouseMove = function (event) {
        // Kill the event and bail if the drag data is not setup.
        event.preventDefault();
        event.stopPropagation();
        var dragData = this._dragData;
        if (!dragData) {
            return;
        }
        // Show the dock overlay for the given client position. The overlay
        // will be hidden if the position is not over a valid docking zone.
        this._showOverlay(event.clientX, event.clientY);
        // Unconditionally update the position of the tab. The CSS for the
        // tab includes a transform which provides a nice relative offset.
        var style = dragData.item.tab.node.style;
        style.top = event.clientY + 'px';
        style.left = event.clientX + 'px';
    };
    /**
     * Handle the `'mouseup'` event for the dock panel.
     */
    DockPanel.prototype._evtMouseUp = function (event) {
        // Bail if the left mouse button is not released.
        if (event.button !== 0) {
            return;
        }
        // Kill the event and remove the mouse listeners.
        event.preventDefault();
        event.stopPropagation();
        document.removeEventListener('mouseup', this, true);
        document.removeEventListener('mousemove', this, true);
        document.removeEventListener('contextmenu', this, true);
        // Clear the drag data or bail if it wasn't setup.
        var dragData = this._dragData;
        if (!dragData) {
            return;
        }
        this._dragData = null;
        // Fetch common variables.
        var item = dragData.item;
        var ownPanel = item.panel;
        var ownBar = ownPanel.tabs;
        var ownCount = ownBar.tabCount;
        var itemTab = item.tab;
        // Restore the application cursor and hide the overlay.
        dragData.cursorGrab.dispose();
        this._overlay.hide();
        // Remove the tab from the document and reset its state.
        var tabStyle = itemTab.node.style;
        document.body.removeChild(itemTab.node);
        itemTab.removeClass(DOCKING_CLASS);
        tabStyle.top = '';
        tabStyle.left = '';
        // Find the dock target for the given client position.
        var data = findDockTarget(this._root, event.clientX, event.clientY);
        // If the dock zone is invalid, restore the tab and bail.
        if (data.zone === 9 /* Invalid */) {
            ownBar.insertTab(dragData.index, itemTab);
            return;
        }
        // Restore the tab if the dock zone is the same tab group.
        if (data.panel === ownPanel && data.zone === 8 /* PanelCenter */) {
            ownBar.insertTab(dragData.index, itemTab);
            return;
        }
        // Restore the tab if the dock zone has no effective change.
        if (data.panel === ownPanel && ownCount === 0) {
            ownBar.insertTab(dragData.index, itemTab);
            return;
        }
        // Dock the panel according to the indicated zone.
        switch (data.zone) {
            case 0 /* EdgeTop */:
                this._addPanel(item.widget, phosphor_splitpanel_1.Orientation.Vertical, false);
                break;
            case 1 /* EdgeLeft */:
                this._addPanel(item.widget, phosphor_splitpanel_1.Orientation.Horizontal, false);
                break;
            case 2 /* EdgeRight */:
                this._addPanel(item.widget, phosphor_splitpanel_1.Orientation.Horizontal, true);
                break;
            case 3 /* EdgeBottom */:
                this._addPanel(item.widget, phosphor_splitpanel_1.Orientation.Vertical, true);
                break;
            case 4 /* PanelTop */:
                this._splitPanel(data.panel, item.widget, phosphor_splitpanel_1.Orientation.Vertical, false);
                break;
            case 5 /* PanelLeft */:
                this._splitPanel(data.panel, item.widget, phosphor_splitpanel_1.Orientation.Horizontal, false);
                break;
            case 6 /* PanelRight */:
                this._splitPanel(data.panel, item.widget, phosphor_splitpanel_1.Orientation.Horizontal, true);
                break;
            case 7 /* PanelBottom */:
                this._splitPanel(data.panel, item.widget, phosphor_splitpanel_1.Orientation.Vertical, true);
                break;
            case 8 /* PanelCenter */:
                this._tabifyPanel(data.panel, item.widget);
                break;
        }
        // Restore the previous tab for the old tab bar.
        var i = ownBar.tabIndex(dragData.prevTab);
        if (i === -1)
            i = ownBar.tabCount - 1;
        ownBar.selectedTab = ownBar.tabAt(i);
    };
    /**
     * Handle the `'contextmenu'` event for the dock panel.
     */
    DockPanel.prototype._evtContextMenu = function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    /**
     * Ensure the root split panel has the given orientation.
     */
    DockPanel.prototype._ensureRoot = function (orientation) {
        // This is a no-op if the root orientation is correct.
        if (this._root.orientation === orientation) {
            return;
        }
        // If the root has at most one child, just change the orientation.
        if (this._root.childCount <= 1) {
            this._root.orientation = orientation;
            return;
        }
        // Otherwise, create a new root panel with the given orientation.
        // The existing root panel is added as a child of the new root.
        var panel = this._createSplitPanel(orientation);
        panel.addChild(this._root);
        this._root = panel;
        this.addChild(panel);
    };
    /**
     * Create a new dock tab panel and setup the signal handlers.
     */
    DockPanel.prototype._createTabPanel = function () {
        var panel = new DockTabPanel();
        panel.tabs.tabSelected.connect(this._onTabSelected, this);
        panel.tabs.tabCloseRequested.connect(this._onTabCloseRequested, this);
        panel.tabs.tabDetachRequested.connect(this._onTabDetachRequested, this);
        panel.stack.widgetRemoved.connect(this._onWidgetRemoved, this);
        return panel;
    };
    /**
     * Create a new dock split panel for the dock panel.
     */
    DockPanel.prototype._createSplitPanel = function (orientation) {
        var panel = new DockSplitPanel();
        panel.orientation = orientation;
        panel.spacing = this.spacing;
        return panel;
    };
    /**
     * Remove an empty dock tab panel from the hierarchy.
     *
     * This ensures that the hierarchy is kept consistent by merging an
     * ancestor split panel when it contains only a single child widget.
     */
    DockPanel.prototype._removePanel = function (panel) {
        // The parent of a tab panel is always a split panel.
        var splitPanel = panel.parent;
        // Dispose the panel to ensure its resources are released.
        panel.dispose();
        // If the split panel still has multiple children after removing
        // the target panel, nothing else needs to be done.
        if (splitPanel.childCount > 1) {
            return;
        }
        // If the split panel is the root panel and has a remaining child
        // which is a split panel, that child becomes the root.
        if (splitPanel === this._root) {
            if (splitPanel.childCount === 1) {
                var child = splitPanel.childAt(0);
                if (child instanceof DockSplitPanel) {
                    var sizes = child.sizes();
                    splitPanel.parent = null;
                    this._root = child;
                    this.addChild(child);
                    child.setSizes(sizes);
                    splitPanel.dispose();
                }
            }
            return;
        }
        // Non-root split panels always have a split panel parent and are
        // always created with 2 children, so the split panel is guaranteed
        // to have a single child at this point. Also, split panels always
        // have an orthogonal orientation to their parent, so a grandparent
        // and a grandchild split panel will have the same orientation. This
        // means the children of the grandchild can be merged as children of
        // the grandparent.
        var gParent = splitPanel.parent;
        var gSizes = gParent.sizes();
        var gChild = splitPanel.childAt(0);
        var index = gParent.childIndex(splitPanel);
        splitPanel.parent = null;
        if (gChild instanceof DockTabPanel) {
            gParent.insertChild(index, gChild);
        }
        else {
            var gcsp = gChild;
            var gcspSizes = gcsp.sizes();
            var sizeShare = arrays.removeAt(gSizes, index);
            for (var i = 0; gcsp.childCount !== 0; ++i) {
                gParent.insertChild(index + i, gcsp.childAt(0));
                arrays.insert(gSizes, index + i, sizeShare * gcspSizes[i]);
            }
        }
        gParent.setSizes(gSizes);
        splitPanel.dispose();
    };
    /**
     * Abort the tab drag operation if one is in progress.
     */
    DockPanel.prototype._abortDrag = function () {
        var dragData = this._dragData;
        if (!dragData) {
            return;
        }
        this._dragData = null;
        // Release the mouse grab and restore the application cursor.
        document.removeEventListener('mouseup', this, true);
        document.removeEventListener('mousemove', this, true);
        document.removeEventListener('contextmenu', this, true);
        dragData.cursorGrab.dispose();
        // Hide the dock zone overlay.
        this._overlay.hide();
        // Restore the tab to its original location in its owner panel.
        var item = dragData.item;
        var tabStyle = item.tab.node.style;
        item.tab.removeClass(DOCKING_CLASS);
        tabStyle.top = '';
        tabStyle.left = '';
        item.panel.tabs.insertTab(dragData.index, item.tab);
    };
    /**
     * Find the dock item which contains the given tab.
     *
     * Returns `undefined` if there is no matching item.
     */
    DockPanel.prototype._findItemByTab = function (tab) {
        return arrays.find(this._items, function (item) { return item.tab === tab; });
    };
    /**
     * Find the dock item which contains the given widget.
     *
     * Returns `undefined` if there is no matching item.
     */
    DockPanel.prototype._findItemByWidget = function (widget) {
        return arrays.find(this._items, function (item) { return item.widget === widget; });
    };
    /**
     * Show the dock panel overlay indicator at the given client position.
     *
     * If the position is not over a dock zone, the overlay is hidden.
     */
    DockPanel.prototype._showOverlay = function (clientX, clientY) {
        // Find the dock target for the given client position.
        var data = findDockTarget(this._root, clientX, clientY);
        // If the dock zone is invalid, hide the overlay and bail.
        if (data.zone === 9 /* Invalid */) {
            this._overlay.hide();
            return;
        }
        // Setup the variables needed to compute the overlay geometry.
        var top;
        var left;
        var width;
        var height;
        var box = phosphor_domutil_1.boxSizing(this.node);
        var rect = this.node.getBoundingClientRect();
        // Compute the overlay geometry based on the dock zone.
        switch (data.zone) {
            case 0 /* EdgeTop */:
                top = box.paddingTop;
                left = box.paddingLeft;
                width = rect.width - box.horizontalSum;
                height = (rect.height - box.verticalSum) / 3;
                break;
            case 1 /* EdgeLeft */:
                top = box.paddingTop;
                left = box.paddingLeft;
                width = (rect.width - box.horizontalSum) / 3;
                height = rect.height - box.verticalSum;
                break;
            case 2 /* EdgeRight */:
                top = box.paddingTop;
                width = (rect.width - box.horizontalSum) / 3;
                left = box.paddingLeft + 2 * width;
                height = rect.height - box.verticalSum;
                break;
            case 3 /* EdgeBottom */:
                height = (rect.height - box.verticalSum) / 3;
                top = box.paddingTop + 2 * height;
                left = box.paddingLeft;
                width = rect.width - box.horizontalSum;
                break;
            case 4 /* PanelTop */:
                var pr = data.panel.node.getBoundingClientRect();
                top = pr.top - rect.top - box.borderTop;
                left = pr.left - rect.left - box.borderLeft;
                width = pr.width;
                height = pr.height / 2;
                break;
            case 5 /* PanelLeft */:
                var pr = data.panel.node.getBoundingClientRect();
                top = pr.top - rect.top - box.borderTop;
                left = pr.left - rect.left - box.borderLeft;
                width = pr.width / 2;
                height = pr.height;
                break;
            case 6 /* PanelRight */:
                var pr = data.panel.node.getBoundingClientRect();
                top = pr.top - rect.top - box.borderTop;
                left = pr.left - rect.left - box.borderLeft + pr.width / 2;
                width = pr.width / 2;
                height = pr.height;
                break;
            case 7 /* PanelBottom */:
                var pr = data.panel.node.getBoundingClientRect();
                top = pr.top - rect.top - box.borderTop + pr.height / 2;
                left = pr.left - rect.left - box.borderLeft;
                width = pr.width;
                height = pr.height / 2;
                break;
            case 8 /* PanelCenter */:
                var pr = data.panel.node.getBoundingClientRect();
                top = pr.top - rect.top - box.borderTop;
                left = pr.left - rect.left - box.borderLeft;
                width = pr.width;
                height = pr.height;
                break;
        }
        // Show the overlay at the computed zone position.
        this._overlay.show(data.zone, left, top, width, height);
    };
    /**
     * The change handler for the [[spacingProperty]].
     */
    DockPanel.prototype._onSpacingChanged = function (old, value) {
        this._root.setSpacingRecursive(value);
    };
    /**
     * Handle the `tabSelected` signal from a tab bar.
     */
    DockPanel.prototype._onTabSelected = function (sender, args) {
        var item = this._findItemByTab(args.tab);
        if (item)
            item.panel.stack.currentWidget = item.widget;
    };
    /**
     * Handle the `tabCloseRequested` signal from a tab bar.
     */
    DockPanel.prototype._onTabCloseRequested = function (sender, args) {
        var item = this._findItemByTab(args.tab);
        if (item)
            item.widget.close();
    };
    /**
     * Handle the `tabDetachRequested` signal from the tab bar.
     */
    DockPanel.prototype._onTabDetachRequested = function (sender, args) {
        // Find the dock item for the detach or bail if not found.
        var item = this._findItemByTab(args.tab);
        if (!item) {
            return;
        }
        // Setup the drag data object.
        this._dragData = {
            item: item,
            index: args.index,
            prevTab: sender.previousTab,
            cursorGrab: phosphor_domutil_1.overrideCursor('default'),
        };
        // Unset the tab before detaching so that the content widget does
        // not change during the drag operation.
        sender.selectedTab = null;
        sender.removeTabAt(args.index);
        // Setup the style and position for the floating tab.
        var style = args.tab.node.style;
        style.zIndex = '';
        style.top = args.clientY + 'px';
        style.left = args.clientX + 'px';
        args.tab.addClass(DOCKING_CLASS);
        // Add the tab to the document body.
        document.body.appendChild(args.tab.node);
        // Attach the necessary mouse event listeners.
        document.addEventListener('mouseup', this, true);
        document.addEventListener('mousemove', this, true);
        document.addEventListener('contextmenu', this, true);
    };
    /**
     * Handle the `widgetRemoved` signal from a stacked widget.
     */
    DockPanel.prototype._onWidgetRemoved = function (sender, args) {
        var item = this._findItemByWidget(args.widget);
        if (!item) {
            return;
        }
        this._abortDrag();
        arrays.remove(this._items, item);
        item.panel.tabs.removeTab(item.tab);
        if (item.panel.stack.childCount === 0) {
            this._removePanel(item.panel);
        }
    };
    /**
     * The MIME type for draggable items that can be dropped on a dock panel.
     */
    DockPanel.DROP_MIME_TYPE = 'application/x-phosphor-widget-factory';
    /**
     * The property descriptor for the `tab` attached property.
     *
     * This controls the tab used for a widget in a dock panel.
     *
     * #### Notes
     * If the tab for a widget is changed, the new tab will not be
     * reflected until the widget is re-inserted into the dock panel.
     * However, in-place changes to the tab's properties **will** be
     * reflected.
     *
     * **See also:** [[getTab]], [[setTab]]
     */
    DockPanel.tabProperty = new phosphor_properties_1.Property({
        value: null,
        coerce: function (owner, value) { return value || null; },
    });
    /**
     * The property descriptor for the dock panel spacing.
     *
     * The controls the spacing between the panels, in pixels. The default
     * value is `3`.
     *
     * **See also:** [[spacing]]
     */
    DockPanel.spacingProperty = new phosphor_properties_1.Property({
        value: 3,
        coerce: function (owner, value) { return Math.max(0, value | 0); },
        changed: function (owner, old, value) { return owner._onSpacingChanged(old, value); },
    });
    return DockPanel;
})(phosphor_boxpanel_1.BoxPanel);
exports.DockPanel = DockPanel;
/**
 * A node wrapper used as an overlay dock indicator for a dock panel.
 */
var DockPanelOverlay = (function (_super) {
    __extends(DockPanelOverlay, _super);
    /**
     * Construct a new dock panel overlay.
     */
    function DockPanelOverlay() {
        _super.call(this);
        this._zone = 9 /* Invalid */;
        this.addClass(OVERLAY_CLASS);
        this.addClass(HIDDEN_CLASS);
    }
    /**
     * Show the overlay with the given zone and geometry
     */
    DockPanelOverlay.prototype.show = function (zone, left, top, width, height) {
        var style = this.node.style;
        style.top = top + 'px';
        style.left = left + 'px';
        style.width = width + 'px';
        style.height = height + 'px';
        this.removeClass(HIDDEN_CLASS);
        this._setZone(zone);
    };
    /**
     * Hide the overlay and reset its zone.
     */
    DockPanelOverlay.prototype.hide = function () {
        this.addClass(HIDDEN_CLASS);
        this._setZone(9 /* Invalid */);
    };
    /**
     * Set the dock zone for the overlay.
     */
    DockPanelOverlay.prototype._setZone = function (zone) {
        if (zone === this._zone) {
            return;
        }
        var oldClass = DockPanelOverlay.zoneMap[this._zone];
        var newClass = DockPanelOverlay.zoneMap[zone];
        if (oldClass)
            this.removeClass(oldClass);
        if (newClass)
            this.addClass(newClass);
        this._zone = zone;
    };
    /**
     * A mapping of dock zone enum value to modifier class.
     */
    DockPanelOverlay.zoneMap = [
        EDGE_TOP_CLASS,
        EDGE_LEFT_CLASS,
        EDGE_RIGHT_CLASS,
        EDGE_BOTTOM_CLASS,
        PANEL_TOP_CLASS,
        PANEL_LEFT_CLASS,
        PANEL_RIGHT_CLASS,
        PANEL_BOTTOM_CLASS,
        PANEL_CENTER_CLASS
    ];
    return DockPanelOverlay;
})(phosphor_nodewrapper_1.NodeWrapper);
/**
 * A split panel used by a DockPanel.
 */
var DockSplitPanel = (function (_super) {
    __extends(DockSplitPanel, _super);
    /**
     * Construct a new dock split panel.
     */
    function DockSplitPanel() {
        _super.call(this);
        this.addClass(SPLIT_PANEL_CLASS);
    }
    /**
     * Recursively set the spacing for the split panel hierarchy.
     */
    DockSplitPanel.prototype.setSpacingRecursive = function (spacing) {
        for (var i = 0, n = this.childCount; i < n; ++i) {
            var child = this.childAt(i);
            if (child instanceof DockSplitPanel) {
                child.setSpacingRecursive(spacing);
            }
        }
        this.spacing = spacing;
    };
    return DockSplitPanel;
})(phosphor_splitpanel_1.SplitPanel);
/**
 * A tabbed panel used by a DockPanel.
 *
 * This tab panel acts as a simple container for a tab bar and stacked
 * panel. The dock panel manages the tab bar and stacked panel directly,
 * as there is not always a 1:1 association between a tab and panel.
 */
var DockTabPanel = (function (_super) {
    __extends(DockTabPanel, _super);
    /**
     * Construct a new dock tab panel.
     */
    function DockTabPanel() {
        _super.call(this);
        this._tabs = new phosphor_tabs_1.TabBar();
        this._stack = new phosphor_stackedpanel_1.StackedPanel();
        this.addClass(TAB_PANEL_CLASS);
        this.direction = phosphor_boxpanel_1.BoxPanel.TopToBottom;
        this.spacing = 0;
        phosphor_boxpanel_1.BoxPanel.setStretch(this._tabs, 0);
        phosphor_boxpanel_1.BoxPanel.setStretch(this._stack, 1);
        this.addChild(this._tabs);
        this.addChild(this._stack);
    }
    /**
     * Dispose of the resources held by the widget.
     */
    DockTabPanel.prototype.dispose = function () {
        this._tabs = null;
        this._stack = null;
        _super.prototype.dispose.call(this);
    };
    Object.defineProperty(DockTabPanel.prototype, "tabs", {
        /**
         * Get the tab bar for the dock tab panel.
         */
        get: function () {
            return this._tabs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DockTabPanel.prototype, "stack", {
        /**
         * Get the stacked panel for the dock tab panel.
         */
        get: function () {
            return this._stack;
        },
        enumerable: true,
        configurable: true
    });
    return DockTabPanel;
})(phosphor_boxpanel_1.BoxPanel);
/**
 * Find the dock target for the given client position.
 *
 * If the position does not represent a valid dock target, the `zone`
 * property of the dock target will be `Invalid`.
 */
function findDockTarget(root, clientX, clientY) {
    var rect = root.node.getBoundingClientRect();
    if (!hitTestRect(rect, clientX, clientY)) {
        return { zone: 9 /* Invalid */, panel: null };
    }
    var zone = getEdgeZone(rect, clientX, clientY);
    if (zone !== 9 /* Invalid */) {
        return { zone: zone, panel: null };
    }
    return findTargetRecursive(root, clientX, clientY);
}
/**
 * Recursively find the panel dock target for the client position.
 *
 * If the position does not represent a valid dock target, the `zone`
 * property of the dock target will be `Invalid`.
 */
function findTargetRecursive(panel, clientX, clientY) {
    for (var i = 0, n = panel.childCount; i < n; ++i) {
        var child = panel.childAt(i);
        var rect = child.node.getBoundingClientRect();
        if (!hitTestRect(rect, clientX, clientY)) {
            continue;
        }
        if (child instanceof DockSplitPanel) {
            return findTargetRecursive(child, clientX, clientY);
        }
        if (child instanceof DockTabPanel) {
            return { zone: getPanelZone(rect, clientX, clientY), panel: child };
        }
    }
    return { zone: 9 /* Invalid */, panel: null };
}
/**
 * Get the panel zone for the given client rect and position.
 *
 * This assumes the position lies within the client rect.
 *
 * Returns the `Invalid` zone if the position is not within the edge.
 */
function getEdgeZone(r, x, y) {
    var zone;
    if (x < r.left + EDGE_SIZE) {
        if (y - r.top < x - r.left) {
            zone = 0 /* EdgeTop */;
        }
        else if (r.bottom - y < x - r.left) {
            zone = 3 /* EdgeBottom */;
        }
        else {
            zone = 1 /* EdgeLeft */;
        }
    }
    else if (x >= r.right - EDGE_SIZE) {
        if (y - r.top < r.right - x) {
            zone = 0 /* EdgeTop */;
        }
        else if (r.bottom - y < r.right - x) {
            zone = 3 /* EdgeBottom */;
        }
        else {
            zone = 2 /* EdgeRight */;
        }
    }
    else if (y < r.top + EDGE_SIZE) {
        zone = 0 /* EdgeTop */;
    }
    else if (y >= r.bottom - EDGE_SIZE) {
        zone = 3 /* EdgeBottom */;
    }
    else {
        zone = 9 /* Invalid */;
    }
    return zone;
}
/**
 * Get the panel zone for the given client rect and position.
 *
 * This assumes the position lies within the client rect.
 *
 * This always returns a valid zone.
 */
function getPanelZone(r, x, y) {
    var zone;
    var fracX = (x - r.left) / r.width;
    var fracY = (y - r.top) / r.height;
    if (fracX < 1 / 3) {
        if (fracY < fracX) {
            zone = 4 /* PanelTop */;
        }
        else if (1 - fracY < fracX) {
            zone = 7 /* PanelBottom */;
        }
        else {
            zone = 5 /* PanelLeft */;
        }
    }
    else if (fracX < 2 / 3) {
        if (fracY < 1 / 3) {
            zone = 4 /* PanelTop */;
        }
        else if (fracY < 2 / 3) {
            zone = 8 /* PanelCenter */;
        }
        else {
            zone = 7 /* PanelBottom */;
        }
    }
    else {
        if (fracY < 1 - fracX) {
            zone = 4 /* PanelTop */;
        }
        else if (fracY > fracX) {
            zone = 7 /* PanelBottom */;
        }
        else {
            zone = 6 /* PanelRight */;
        }
    }
    return zone;
}
/**
 * Test whether a client rect contains the given client position.
 */
function hitTestRect(r, x, y) {
    return x >= r.left && y >= r.top && x < r.right && y < r.bottom;
}

},{"./index.css":3,"phosphor-arrays":6,"phosphor-boxpanel":9,"phosphor-domutil":14,"phosphor-nodewrapper":17,"phosphor-properties":18,"phosphor-splitpanel":22,"phosphor-stackedpanel":26,"phosphor-tabs":30}],5:[function(require,module,exports){
'use strict';
// For more information about browser field, check out the browser field at https://github.com/substack/browserify-handbook#browser-field.

module.exports = {
    // Create a <link> tag with optional data attributes
    createLink: function(href, attributes) {
        var head = document.head || document.getElementsByTagName('head')[0];
        var link = document.createElement('link');

        link.href = href;
        link.rel = 'stylesheet';

        for (var key in attributes) {
            if ( ! attributes.hasOwnProperty(key)) {
                continue;
            }
            var value = attributes[key];
            link.setAttribute('data-' + key, value);
        }

        head.appendChild(link);
    },
    // Create a <style> tag with optional data attributes
    createStyle: function(cssText, attributes) {
        var head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style');

        style.type = 'text/css';

        for (var key in attributes) {
            if ( ! attributes.hasOwnProperty(key)) {
                continue;
            }
            var value = attributes[key];
            style.setAttribute('data-' + key, value);
        }
        
        if (style.sheet) { // for jsdom and IE9+
            style.innerHTML = cssText;
            style.sheet.cssText = cssText;
            head.appendChild(style);
        } else if (style.styleSheet) { // for IE8 and below
            head.appendChild(style);
            style.styleSheet.cssText = cssText;
        } else { // for Chrome, Firefox, and Safari
            style.appendChild(document.createTextNode(cssText));
            head.appendChild(style);
        }
    }
};

},{}],6:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
/**
 * Execute a callback for each element in an array.
 *
 * @param array - The array of values to iterate.
 *
 * @param callback - The callback to invoke for the array elements.
 *
 * @param fromIndex - The starting index for iteration.
 *
 * @param wrap - Whether iteration wraps around at the end of the array.
 *
 * @returns The first value returned by `callback` which is not
 *   equal to `undefined`, or `undefined` if the callback does
 *   not return a value or if the start index is out of range.
 *
 * #### Notes
 * It is not safe to modify the size of the array while iterating.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * function logger(value: number): void {
 *   console.log(value);
 * }
 *
 * var data = [1, 2, 3, 4];
 * arrays.forEach(data, logger);           // logs 1, 2, 3, 4
 * arrays.forEach(data, logger, 2);        // logs 3, 4
 * arrays.forEach(data, logger, 2, true);  // logs 3, 4, 1, 2
 * arrays.forEach(data, (v, i) => {        // 2
 *   if (v === 3) return i;
 * });
 * ```
 *
 * **See also** [[rforEach]]
 */
function forEach(array, callback, fromIndex, wrap) {
    if (fromIndex === void 0) { fromIndex = 0; }
    if (wrap === void 0) { wrap = false; }
    var start = fromIndex | 0;
    if (start < 0 || start >= array.length) {
        return void 0;
    }
    if (wrap) {
        for (var i = 0, n = array.length; i < n; ++i) {
            var j = (start + i) % n;
            var result = callback(array[j], j);
            if (result !== void 0)
                return result;
        }
    }
    else {
        for (var i = start, n = array.length; i < n; ++i) {
            var result = callback(array[i], i);
            if (result !== void 0)
                return result;
        }
    }
    return void 0;
}
exports.forEach = forEach;
/**
 * Execute a callback for each element in an array, in reverse.
 *
 * @param array - The array of values to iterate.
 *
 * @param callback - The callback to invoke for the array elements.
 *
 * @param fromIndex - The starting index for iteration.
 *
 * @param wrap - Whether iteration wraps around at the end of the array.
 *
 * @returns The first value returned by `callback` which is not
 *   equal to `undefined`, or `undefined` if the callback does
 *   not return a value or if the start index is out of range.
 *
 * #### Notes
 * It is not safe to modify the size of the array while iterating.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * function logger(value: number): void {
 *   console.log(value);
 * }
 *
 * var data = [1, 2, 3, 4];
 * arrays.rforEach(data, logger);           // logs 4, 3, 2, 1
 * arrays.rforEach(data, logger, 2);        // logs 3, 2, 1
 * arrays.rforEach(data, logger, 2, true);  // logs 3, 2, 1, 4
 * arrays.rforEach(data, (v, i) => {        // 2
 *   if (v === 3) return i;
 * });
 * ```
 * **See also** [[forEach]]
 */
function rforEach(array, callback, fromIndex, wrap) {
    if (fromIndex === void 0) { fromIndex = array.length - 1; }
    if (wrap === void 0) { wrap = false; }
    var start = fromIndex | 0;
    if (start < 0 || start >= array.length) {
        return void 0;
    }
    if (wrap) {
        for (var i = 0, n = array.length; i < n; ++i) {
            var j = (start - i + n) % n;
            var result = callback(array[j], j);
            if (result !== void 0)
                return result;
        }
    }
    else {
        for (var i = start; i >= 0; --i) {
            var result = callback(array[i], i);
            if (result !== void 0)
                return result;
        }
    }
    return void 0;
}
exports.rforEach = rforEach;
/**
 * Find the index of the first value which matches a predicate.
 *
 * @param array - The array of values to be searched.
 *
 * @param pred - The predicate function to apply to the values.
 *
 * @param fromIndex - The starting index of the search.
 *
 * @param wrap - Whether the search wraps around at the end of the array.
 *
 * @returns The index of the first matching value, or `-1` if no value
 *   matches the predicate or if the start index is out of range.
 *
 * #### Notes
 * It is not safe to modify the size of the array while iterating.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * function isEven(value: number): boolean {
 *   return value % 2 === 0;
 * }
 *
 * var data = [1, 2, 3, 4, 3, 2, 1];
 * arrays.findIndex(data, isEven);           // 1
 * arrays.findIndex(data, isEven, 4);        // 5
 * arrays.findIndex(data, isEven, 6);        // -1
 * arrays.findIndex(data, isEven, 6, true);  // 1
 * ```
 *
 * **See also** [[rfindIndex]].
 */
function findIndex(array, pred, fromIndex, wrap) {
    if (fromIndex === void 0) { fromIndex = 0; }
    if (wrap === void 0) { wrap = false; }
    var start = fromIndex | 0;
    if (start < 0 || start >= array.length) {
        return -1;
    }
    if (wrap) {
        for (var i = 0, n = array.length; i < n; ++i) {
            var j = (start + i) % n;
            if (pred(array[j], j))
                return j;
        }
    }
    else {
        for (var i = start, n = array.length; i < n; ++i) {
            if (pred(array[i], i))
                return i;
        }
    }
    return -1;
}
exports.findIndex = findIndex;
/**
 * Find the index of the last value which matches a predicate.
 *
 * @param array - The array of values to be searched.
 *
 * @param pred - The predicate function to apply to the values.
 *
 * @param fromIndex - The starting index of the search.
 *
 * @param wrap - Whether the search wraps around at the front of the array.
 *
 * @returns The index of the last matching value, or `-1` if no value
 *   matches the predicate or if the start index is out of range.
 *
 * #### Notes
 * It is not safe to modify the size of the array while iterating.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * function isEven(value: number): boolean {
 *   return value % 2 === 0;
 * }
 *
 * var data = [1, 2, 3, 4, 3, 2, 1];
 * arrays.rfindIndex(data, isEven);           // 5
 * arrays.rfindIndex(data, isEven, 4);        // 3
 * arrays.rfindIndex(data, isEven, 0);        // -1
 * arrays.rfindIndex(data, isEven, 0, true);  // 5
 * ```
 *
 * **See also** [[findIndex]].
 */
function rfindIndex(array, pred, fromIndex, wrap) {
    if (fromIndex === void 0) { fromIndex = array.length - 1; }
    if (wrap === void 0) { wrap = false; }
    var start = fromIndex | 0;
    if (start < 0 || start >= array.length) {
        return -1;
    }
    if (wrap) {
        for (var i = 0, n = array.length; i < n; ++i) {
            var j = (start - i + n) % n;
            if (pred(array[j], j))
                return j;
        }
    }
    else {
        for (var i = start; i >= 0; --i) {
            if (pred(array[i], i))
                return i;
        }
    }
    return -1;
}
exports.rfindIndex = rfindIndex;
/**
 * Find the first value which matches a predicate.
 *
 * @param array - The array of values to be searched.
 *
 * @param pred - The predicate function to apply to the values.
 *
 * @param fromIndex - The starting index of the search.
 *
 * @param wrap - Whether the search wraps around at the end of the array.
 *
 * @returns The first matching value, or `undefined` if no value matches
 *   the predicate or if the start index is out of range.
 *
 * #### Notes
 * It is not safe to modify the size of the array while iterating.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * function isEven(value: number): boolean {
 *   return value % 2 === 0;
 * }
 *
 * var data = [1, 2, 3, 4, 3, 2, 1];
 * arrays.find(data, isEven);           // 2
 * arrays.find(data, isEven, 4);        // 2
 * arrays.find(data, isEven, 6);        // undefined
 * arrays.find(data, isEven, 6, true);  // 2
 * ```
 *
 * **See also** [[rfind]].
 */
function find(array, pred, fromIndex, wrap) {
    var i = findIndex(array, pred, fromIndex, wrap);
    return i !== -1 ? array[i] : void 0;
}
exports.find = find;
/**
 * Find the last value which matches a predicate.
 *
 * @param array - The array of values to be searched.
 *
 * @param pred - The predicate function to apply to the values.
 *
 * @param fromIndex - The starting index of the search.
 *
 * @param wrap - Whether the search wraps around at the front of the array.
 *
 * @returns The last matching value, or `undefined` if no value matches
 *   the predicate or if the start index is out of range.
 *
 * #### Notes
 * The range of visited indices is set before the first invocation of
 * `pred`. It is not safe for `pred` to change the length of `array`.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * function isEven(value: number): boolean {
 *   return value % 2 === 0;
 * }
 *
 * var data = [1, 2, 3, 4, 3, 2, 1];
 * arrays.rfind(data, isEven);           // 2
 * arrays.rfind(data, isEven, 4);        // 4
 * arrays.rfind(data, isEven, 0);        // undefined
 * arrays.rfind(data, isEven, 0, true);  // 2
 * ```
 *
 * **See also** [[find]].
 */
function rfind(array, pred, fromIndex, wrap) {
    var i = rfindIndex(array, pred, fromIndex, wrap);
    return i !== -1 ? array[i] : void 0;
}
exports.rfind = rfind;
/**
 * Insert an element into an array at a specified index.
 *
 * @param array - The array of values to modify.
 *
 * @param index - The index at which to insert the value. This value
 *   is clamped to the bounds of the array.
 *
 * @param value - The value to insert into the array.
 *
 * @returns The index at which the value was inserted.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * var data = [0, 1, 2, 3, 4];
 * arrays.insert(data, 0, 12);  // 0
 * arrays.insert(data, 3, 42);  // 3
 * arrays.insert(data, -9, 9);  // 0
 * arrays.insert(data, 12, 8);  // 8
 * console.log(data);           // [9, 12, 0, 1, 42, 2, 3, 4, 8]
 * ```
 *
 * **See also** [[removeAt]] and [[remove]]
 */
function insert(array, index, value) {
    var j = Math.max(0, Math.min(index | 0, array.length));
    for (var i = array.length; i > j; --i) {
        array[i] = array[i - 1];
    }
    array[j] = value;
    return j;
}
exports.insert = insert;
/**
 * Move an element in an array from one index to another.
 *
 * @param array - The array of values to modify.
 *
 * @param fromIndex - The index of the element to move.
 *
 * @param toIndex - The target index of the element.
 *
 * @returns `true` if the element was moved, or `false` if either
 *   index is out of range.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * var data = [0, 1, 2, 3, 4];
 * arrays.move(data, 1, 2);   // true
 * arrays.move(data, -1, 0);  // false
 * arrays.move(data, 4, 2);   // true
 * arrays.move(data, 10, 0);  // false
 * console.log(data);         // [0, 2, 4, 1, 3]
 * ```
 */
function move(array, fromIndex, toIndex) {
    var j = fromIndex | 0;
    if (j < 0 || j >= array.length) {
        return false;
    }
    var k = toIndex | 0;
    if (k < 0 || k >= array.length) {
        return false;
    }
    var value = array[j];
    if (j > k) {
        for (var i = j; i > k; --i) {
            array[i] = array[i - 1];
        }
    }
    else if (j < k) {
        for (var i = j; i < k; ++i) {
            array[i] = array[i + 1];
        }
    }
    array[k] = value;
    return true;
}
exports.move = move;
/**
 * Remove an element from an array at a specified index.
 *
 * @param array - The array of values to modify.
 *
 * @param index - The index of the element to remove.
 *
 * @returns The removed value, or `undefined` if the index is out
 *   of range.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * var data = [0, 1, 2, 3, 4];
 * arrays.removeAt(data, 1);   // 1
 * arrays.removeAt(data, 3);   // 4
 * arrays.removeAt(data, 10);  // undefined
 * console.log(data);          // [0, 2, 3]
 * ```
 *
 * **See also** [[remove]] and [[insert]]
 */
function removeAt(array, index) {
    var j = index | 0;
    if (j < 0 || j >= array.length) {
        return void 0;
    }
    var value = array[j];
    for (var i = j + 1, n = array.length; i < n; ++i) {
        array[i - 1] = array[i];
    }
    array.length -= 1;
    return value;
}
exports.removeAt = removeAt;
/**
 * Remove the first occurrence of a value from an array.
 *
 * @param array - The array of values to modify.
 *
 * @param value - The value to remove from the array.
 *
 * @returns The index where the value was located, or `-1` if the
 *   value is not the array.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * var data = [0, 1, 2, 3, 4];
 * arrays.remove(data, 1);  // 1
 * arrays.remove(data, 3);  // 2
 * arrays.remove(data, 7);  // -1
 * console.log(data);       // [0, 2, 4]
 * ```
 *
 * **See also** [[removeAt]] and [[insert]]
 */
function remove(array, value) {
    var j = -1;
    for (var i = 0, n = array.length; i < n; ++i) {
        if (array[i] === value) {
            j = i;
            break;
        }
    }
    if (j === -1) {
        return -1;
    }
    for (var i = j + 1, n = array.length; i < n; ++i) {
        array[i - 1] = array[i];
    }
    array.length -= 1;
    return j;
}
exports.remove = remove;
/**
 * Reverse an array in-place subject to an optional range.
 *
 * @param array - The array to reverse.
 *
 * @param fromIndex - The index of the first element of the range.
 *   This value will be clamped to the array bounds.
 *
 * @param toIndex - The index of the last element of the range.
 *   This value will be clamped to the array bounds.
 *
 * @returns A reference to the original array.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * var data = [0, 1, 2, 3, 4];
 * arrays.reverse(data, 1, 3);    // [0, 3, 2, 1, 4]
 * arrays.reverse(data, 3);       // [0, 3, 2, 4, 1]
 * arrays.reverse(data);          // [1, 4, 2, 3, 0]
 * ```
 *
 * **See also** [[rotate]]
 */
function reverse(array, fromIndex, toIndex) {
    if (fromIndex === void 0) { fromIndex = 0; }
    if (toIndex === void 0) { toIndex = array.length; }
    var i = Math.max(0, Math.min(fromIndex | 0, array.length - 1));
    var j = Math.max(0, Math.min(toIndex | 0, array.length - 1));
    if (j < i)
        i = j + (j = i, 0);
    while (i < j) {
        var tmpval = array[i];
        array[i++] = array[j];
        array[j--] = tmpval;
    }
    return array;
}
exports.reverse = reverse;
/**
 * Rotate the elements of an array by a positive or negative delta.
 *
 * @param array - The array to rotate.
 *
 * @param delta - The amount of rotation to apply to the elements. A
 *   positive delta will shift the elements to the left. A negative
 *   delta will shift the elements to the right.
 *
 * @returns A reference to the original array.
 *
 * #### Notes
 * This executes in `O(n)` time and `O(1)` space.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * var data = [0, 1, 2, 3, 4];
 * arrays.rotate(data, 2);    // [2, 3, 4, 0, 1]
 * arrays.rotate(data, -2);   // [0, 1, 2, 3, 4]
 * arrays.rotate(data, 10);   // [0, 1, 2, 3, 4]
 * arrays.rotate(data, 9);    // [4, 0, 1, 2, 3]
 * ```
 *
 * **See also** [[reverse]]
 */
function rotate(array, delta) {
    var n = array.length;
    if (n <= 1) {
        return array;
    }
    var d = delta | 0;
    if (d > 0) {
        d = d % n;
    }
    else if (d < 0) {
        d = ((d % n) + n) % n;
    }
    if (d === 0) {
        return array;
    }
    reverse(array, 0, d - 1);
    reverse(array, d, n - 1);
    reverse(array, 0, n - 1);
    return array;
}
exports.rotate = rotate;
/**
 * Using a binary search, find the index of the first element in an
 * array which compares `>=` to a value.
 *
 * @param array - The array of values to be searched. It must be sorted
 *   in ascending order.
 *
 * @param value - The value to locate in the array.
 *
 * @param cmp - The comparison function which returns `true` if an
 *   array element is less than the given value.
 *
 * @returns The index of the first element in `array` which compares
 *   `>=` to `value`, or `array.length` if there is no such element.
 *
 * #### Notes
 * It is not safe for the comparison function to modify the array.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * function numberCmp(a: number, b: number): boolean {
 *   return a < b;
 * }
 *
 * var data = [0, 3, 4, 7, 7, 9];
 * arrays.lowerBound(data, 0, numberCmp);   // 0
 * arrays.lowerBound(data, 6, numberCmp);   // 3
 * arrays.lowerBound(data, 7, numberCmp);   // 3
 * arrays.lowerBound(data, -1, numberCmp);  // 0
 * arrays.lowerBound(data, 10, numberCmp);  // 6
 * ```
 *
 * **See also** [[upperBound]]
 */
function lowerBound(array, value, cmp) {
    var begin = 0;
    var half;
    var middle;
    var n = array.length;
    while (n > 0) {
        half = n >> 1;
        middle = begin + half;
        if (cmp(array[middle], value)) {
            begin = middle + 1;
            n -= half + 1;
        }
        else {
            n = half;
        }
    }
    return begin;
}
exports.lowerBound = lowerBound;
/**
 * Using a binary search, find the index of the first element in an
 * array which compares `>` than a value.
 *
 * @param array - The array of values to be searched. It must be sorted
 *   in ascending order.
 *
 * @param value - The value to locate in the array.
 *
 * @param cmp - The comparison function which returns `true` if the
 *   the given value is less than an array element.
 *
 * @returns The index of the first element in `array` which compares
 *   `>` than `value`, or `array.length` if there is no such element.
 *
 * #### Notes
 * It is not safe for the comparison function to modify the array.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * function numberCmp(a: number, b: number): number {
 *   return a < b;
 * }
 *
 * var data = [0, 3, 4, 7, 7, 9];
 * arrays.upperBound(data, 0, numberCmp);   // 1
 * arrays.upperBound(data, 6, numberCmp);   // 3
 * arrays.upperBound(data, 7, numberCmp);   // 5
 * arrays.upperBound(data, -1, numberCmp);  // 0
 * arrays.upperBound(data, 10, numberCmp);  // 6
 * ```
 *
 * **See also** [[lowerBound]]
 */
function upperBound(array, value, cmp) {
    var begin = 0;
    var half;
    var middle;
    var n = array.length;
    while (n > 0) {
        half = n >> 1;
        middle = begin + half;
        if (cmp(value, array[middle])) {
            n = half;
        }
        else {
            begin = middle + 1;
            n -= half + 1;
        }
    }
    return begin;
}
exports.upperBound = upperBound;

},{}],7:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
/**
 * The sizer object for the [[boxCalc]] function.
 *
 * A box sizer holds the geometry information for an object along the
 * layout orientation. An array of box sizers representing a line of
 * objects is passed to [[boxCalc]] along with the amount of space
 * available for layout. The algorithm will update the [[size]] of
 * each box sizer with its computed size.
 *
 * #### Notes
 * For best performance, this class should be treated as a raw data
 * struct. It should not typically be subclassed.
 */
var BoxSizer = (function () {
    function BoxSizer() {
        /**
         * The preferred size for the sizer.
         *
         * The sizer will be given this initial size subject to its size
         * bounds. The sizer will not deviate from this size unless such
         * deviation is required to fit into the available layout space.
         *
         * #### Notes
         * There is no limit to this value, but it will be clamped to the
         * bounds defined by [[minSize]] and [[maxSize]].
         *
         * The default value is `0`.
         */
        this.sizeHint = 0;
        /**
         * The minimum size of the sizer.
         *
         * The sizer will never be sized less than this value, even if
         * it means the sizer will overflow the available layout space.
         *
         * #### Notes
         * It is assumed that this value lies in the range `[0, Infinity)`
         * and that it is `<=` to [[maxSize]]. Failure to adhere to this
         * constraint will yield undefined results.
         *
         * The default value is `0`.
         */
        this.minSize = 0;
        /**
         * The maximum size of the sizer.
         *
         * The sizer will never be sized greater than this value, even if
         * it means the sizer will underflow the available layout space.
         *
         * #### Notes
         * It is assumed that this value lies in the range `[0, Infinity]`
         * and that it is `>=` to [[minSize]]. Failure to adhere to this
         * constraint will yield undefined results.
         *
         * The default value is `Infinity`.
         */
        this.maxSize = Infinity;
        /**
         * The stretch factor for the sizer.
         *
         * This controls how much the sizer stretches relative to its sibling
         * sizers when layout space is distributed. A stretch factor of zero
         * is special and will cause the sizer to only be resized after all
         * other sizers with a stretch factor greater than zero have been
         * resized to their limits.
         *
         * #### Notes
         * It is assumed that this value is an integer that lies in the range
         * `[0, Infinity)`. Failure to adhere to this constraint will yield
         * undefined results.
         *
         * The default value is `1`.
         */
        this.stretch = 1;
        /**
         * The computed size of the sizer.
         *
         * This value is the output of a call to [[boxCalc]]. It represents
         * the computed size for the object along the layout orientation,
         * and will always lie in the range `[minSize, maxSize]`.
         *
         * #### Notes
         * This value is output only. Changing the value will have no effect.
         */
        this.size = 0;
        /**
         * An internal storage property for the layout algorithm.
         *
         * #### Notes
         * This value is used as temporary storage by the layout algorithm.
         * Changing the value will have no effect.
         */
        this.done = false;
    }
    return BoxSizer;
})();
exports.BoxSizer = BoxSizer;
/**
 * Compute the optimal layout sizes for an array of box sizers.
 *
 * This distributes the available layout space among the box sizers
 * according to the following algorithm:
 *
 * 1. Initialize the sizers's size to its size hint and compute the
 *    sums for each of size hint, min size, and max size.
 *
 * 2. If the total size hint equals the available space, return.
 *
 * 3. If the available space is less than the total min size, set all
 *    sizers to their min size and return.
 *
 * 4. If the available space is greater than the total max size, set
 *    all sizers to their max size and return.
 *
 * 5. If the layout space is less than the total size hint, distribute
 *    the negative delta as follows:
 *
 *    a. Shrink each sizer with a stretch factor greater than zero by
 *       an amount proportional to the negative space and the sum of
 *       stretch factors. If the sizer reaches its min size, remove
 *       it and its stretch factor from the computation.
 *
 *    b. If after adjusting all stretch sizers there remains negative
 *       space, distribute the space equally among the sizers with a
 *       stretch factor of zero. If a sizer reaches its min size,
 *       remove it from the computation.
 *
 * 6. If the layout space is greater than the total size hint,
 *    distribute the positive delta as follows:
 *
 *    a. Expand each sizer with a stretch factor greater than zero by
 *       an amount proportional to the postive space and the sum of
 *       stretch factors. If the sizer reaches its max size, remove
 *       it and its stretch factor from the computation.
 *
 *    b. If after adjusting all stretch sizers there remains positive
 *       space, distribute the space equally among the sizers with a
 *       stretch factor of zero. If a sizer reaches its max size,
 *       remove it from the computation.
 *
 * 7. return
 *
 * @param sizers - The sizers for a particular layout line.
 *
 * @param space - The available layout space for the sizers.
 *
 * #### Notes
 * This function can be called at any time to recompute the layout
 * sizing for an existing array of sizers. The previously computed
 * results will have no effect on the new output. It is therefore
 * not necessary to create new sizers on each resize event.
 */
function boxCalc(sizers, space) {
    // Bail early if there is nothing to do.
    var count = sizers.length;
    if (count === 0) {
        return;
    }
    // Setup the size and stretch counters.
    var totalMin = 0;
    var totalMax = 0;
    var totalSize = 0;
    var totalStretch = 0;
    var stretchCount = 0;
    // Setup the sizers and compute the totals.
    for (var i = 0; i < count; ++i) {
        var sizer = sizers[i];
        initSizer(sizer);
        totalSize += sizer.size;
        totalMin += sizer.minSize;
        totalMax += sizer.maxSize;
        if (sizer.stretch > 0) {
            totalStretch += sizer.stretch;
            stretchCount++;
        }
    }
    // If the space is equal to the total size, return.
    if (space === totalSize) {
        return;
    }
    // If the space is less than the total min, minimize each sizer.
    if (space <= totalMin) {
        for (var i = 0; i < count; ++i) {
            var sizer = sizers[i];
            sizer.size = sizer.minSize;
        }
        return;
    }
    // If the space is greater than the total max, maximize each sizer.
    if (space >= totalMax) {
        for (var i = 0; i < count; ++i) {
            var sizer = sizers[i];
            sizer.size = sizer.maxSize;
        }
        return;
    }
    // The loops below perform sub-pixel precision sizing. A near zero
    // value is used for compares instead of zero to ensure that the
    // loop terminates when the subdivided space is reasonably small.
    var nearZero = 0.01;
    // A counter which is decremented each time a sizer is resized to
    // its limit. This ensures the loops terminate even if there is
    // space remaining to distribute.
    var notDoneCount = count;
    // Distribute negative delta space.
    if (space < totalSize) {
        // Shrink each stretchable sizer by an amount proportional to its
        // stretch factor. If a sizer reaches its min size it's marked as
        // done. The loop progresses in phases where each sizer is given
        // a chance to consume its fair share for the pass, regardless of
        // whether a sizer before it reached its limit. This continues
        // until the stretchable sizers or the free space is exhausted.
        var freeSpace = totalSize - space;
        while (stretchCount > 0 && freeSpace > nearZero) {
            var distSpace = freeSpace;
            var distStretch = totalStretch;
            for (var i = 0; i < count; ++i) {
                var sizer = sizers[i];
                if (sizer.done || sizer.stretch === 0) {
                    continue;
                }
                var amt = sizer.stretch * distSpace / distStretch;
                if (sizer.size - amt <= sizer.minSize) {
                    freeSpace -= sizer.size - sizer.minSize;
                    totalStretch -= sizer.stretch;
                    sizer.size = sizer.minSize;
                    sizer.done = true;
                    notDoneCount--;
                    stretchCount--;
                }
                else {
                    freeSpace -= amt;
                    sizer.size -= amt;
                }
            }
        }
        // Distribute any remaining space evenly among the non-stretchable
        // sizers. This progresses in phases in the same manner as above.
        while (notDoneCount > 0 && freeSpace > nearZero) {
            var amt = freeSpace / notDoneCount;
            for (var i = 0; i < count; ++i) {
                var sizer = sizers[i];
                if (sizer.done) {
                    continue;
                }
                if (sizer.size - amt <= sizer.minSize) {
                    freeSpace -= sizer.size - sizer.minSize;
                    sizer.size = sizer.minSize;
                    sizer.done = true;
                    notDoneCount--;
                }
                else {
                    freeSpace -= amt;
                    sizer.size -= amt;
                }
            }
        }
    }
    else {
        // Expand each stretchable sizer by an amount proportional to its
        // stretch factor. If a sizer reaches its max size it's marked as
        // done. The loop progresses in phases where each sizer is given
        // a chance to consume its fair share for the pass, regardless of
        // whether a sizer before it reached its limit. This continues
        // until the stretchable sizers or the free space is exhausted.
        var freeSpace = space - totalSize;
        while (stretchCount > 0 && freeSpace > nearZero) {
            var distSpace = freeSpace;
            var distStretch = totalStretch;
            for (var i = 0; i < count; ++i) {
                var sizer = sizers[i];
                if (sizer.done || sizer.stretch === 0) {
                    continue;
                }
                var amt = sizer.stretch * distSpace / distStretch;
                if (sizer.size + amt >= sizer.maxSize) {
                    freeSpace -= sizer.maxSize - sizer.size;
                    totalStretch -= sizer.stretch;
                    sizer.size = sizer.maxSize;
                    sizer.done = true;
                    notDoneCount--;
                    stretchCount--;
                }
                else {
                    freeSpace -= amt;
                    sizer.size += amt;
                }
            }
        }
        // Distribute any remaining space evenly among the non-stretchable
        // sizers. This progresses in phases in the same manner as above.
        while (notDoneCount > 0 && freeSpace > nearZero) {
            var amt = freeSpace / notDoneCount;
            for (var i = 0; i < count; ++i) {
                var sizer = sizers[i];
                if (sizer.done) {
                    continue;
                }
                if (sizer.size + amt >= sizer.maxSize) {
                    freeSpace -= sizer.maxSize - sizer.size;
                    sizer.size = sizer.maxSize;
                    sizer.done = true;
                    notDoneCount--;
                }
                else {
                    freeSpace -= amt;
                    sizer.size += amt;
                }
            }
        }
    }
}
exports.boxCalc = boxCalc;
/**
 * (Re)initialize a box sizer's data for a layout pass.
 */
function initSizer(sizer) {
    sizer.size = Math.max(sizer.minSize, Math.min(sizer.sizeHint, sizer.maxSize));
    sizer.done = false;
}

},{}],8:[function(require,module,exports){
var css = "/*-----------------------------------------------------------------------------\r\n| Copyright (c) 2014-2015, PhosphorJS Contributors\r\n|\r\n| Distributed under the terms of the BSD 3-Clause License.\r\n|\r\n| The full license is in the file LICENSE, distributed with this software.\r\n|----------------------------------------------------------------------------*/\n.p-BoxPanel {\n  position: relative;\n}\n.p-BoxPanel > .p-Widget {\n  position: absolute;\n}\n"; (require("browserify-css").createStyle(css, { "href": "node_modules/phosphor-boxpanel/lib/index.css"})); module.exports = css;
},{"browserify-css":5}],9:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var arrays = require('phosphor-arrays');
var phosphor_boxengine_1 = require('phosphor-boxengine');
var phosphor_domutil_1 = require('phosphor-domutil');
var phosphor_messaging_1 = require('phosphor-messaging');
var phosphor_properties_1 = require('phosphor-properties');
var phosphor_widget_1 = require('phosphor-widget');
require('./index.css');
/**
 * The class name added to BoxPanel instances.
 */
var BOX_PANEL_CLASS = 'p-BoxPanel';
/**
 * The class name added to left-to-right box panels.
 */
var LEFT_TO_RIGHT_CLASS = 'p-mod-left-to-right';
/**
 * The class name added to right-to-left box panels.
 */
var RIGHT_TO_LEFT_CLASS = 'p-mod-right-to-left';
/**
 * The class name added to top-to-bottom box panels.
 */
var TOP_TO_BOTTOM_CLASS = 'p-mod-top-to-bottom';
/**
 * The class name added to bottom-to-top box panels.
 */
var BOTTOM_TO_TOP_CLASS = 'p-mod-bottom-to-top';
/**
 * The layout direction of a box panel.
 */
(function (Direction) {
    /**
     * Left to right direction.
     */
    Direction[Direction["LeftToRight"] = 0] = "LeftToRight";
    /**
     * Right to left direction.
     */
    Direction[Direction["RightToLeft"] = 1] = "RightToLeft";
    /**
     * Top to bottom direction.
     */
    Direction[Direction["TopToBottom"] = 2] = "TopToBottom";
    /**
     * Bottom to top direction.
     */
    Direction[Direction["BottomToTop"] = 3] = "BottomToTop";
})(exports.Direction || (exports.Direction = {}));
var Direction = exports.Direction;
/**
 * A widget which arranges its children in a single row or column.
 */
var BoxPanel = (function (_super) {
    __extends(BoxPanel, _super);
    /**
     * Construct a new box panel.
     */
    function BoxPanel() {
        _super.call(this);
        this._fixedSpace = 0;
        this._box = null;
        this._sizers = [];
        this.addClass(BOX_PANEL_CLASS);
        this.addClass(TOP_TO_BOTTOM_CLASS);
    }
    /**
     * Get the box panel stretch factor for the given widget.
     *
     * @param widget - The widget of interest.
     *
     * @returns The box panel stretch factor for the widget.
     *
     * #### Notes
     * This is a pure delegate to the [[stretchProperty]].
     */
    BoxPanel.getStretch = function (widget) {
        return BoxPanel.stretchProperty.get(widget);
    };
    /**
     * Set the box panel stretch factor for the given widget.
     *
     * @param widget - The widget of interest.
     *
     * @param value - The value for the stretch factor.
     *
     * #### Notes
     * This is a pure delegate to the [[stretchProperty]].
     */
    BoxPanel.setStretch = function (widget, value) {
        BoxPanel.stretchProperty.set(widget, value);
    };
    /**
     * Get the box panel size basis for the given widget.
     *
     * @param widget - The widget of interest.
     *
     * @returns The box panel size basis for the widget.
     *
     * #### Notes
     * This is a pure delegate to the [[sizeBasisProperty]].
     */
    BoxPanel.getSizeBasis = function (widget) {
        return BoxPanel.sizeBasisProperty.get(widget);
    };
    /**
     * Set the box panel size basis for the given widget.
     *
     * @param widget - The widget of interest.
     *
     * @param value - The value for the size basis.
     *
     * #### Notes
     * This is a pure delegate to the [[sizeBasisProperty]].
     */
    BoxPanel.setSizeBasis = function (widget, value) {
        BoxPanel.sizeBasisProperty.set(widget, value);
    };
    /**
     * Dispose of the resources held by the panel.
     */
    BoxPanel.prototype.dispose = function () {
        this._sizers.length = 0;
        _super.prototype.dispose.call(this);
    };
    Object.defineProperty(BoxPanel.prototype, "direction", {
        /**
         * Get the layout direction for the box panel.
         *
         * #### Notes
         * This is a pure delegate to the [[directionProperty]].
         */
        get: function () {
            return BoxPanel.directionProperty.get(this);
        },
        /**
         * Set the layout direction for the box panel.
         *
         * #### Notes
         * This is a pure delegate to the [[directionProperty]].
         */
        set: function (value) {
            BoxPanel.directionProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoxPanel.prototype, "spacing", {
        /**
         * Get the inter-element spacing for the box panel.
         *
         * #### Notes
         * This is a pure delegate to the [[spacingProperty]].
         */
        get: function () {
            return BoxPanel.spacingProperty.get(this);
        },
        /**
         * Set the inter-element spacing for the box panel.
         *
         * #### Notes
         * This is a pure delegate to the [[spacingProperty]].
         */
        set: function (value) {
            BoxPanel.spacingProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * A message handler invoked on a `'child-added'` message.
     */
    BoxPanel.prototype.onChildAdded = function (msg) {
        arrays.insert(this._sizers, msg.currentIndex, new phosphor_boxengine_1.BoxSizer());
        this.node.appendChild(msg.child.node);
        if (this.isAttached)
            phosphor_messaging_1.sendMessage(msg.child, phosphor_widget_1.Widget.MsgAfterAttach);
        phosphor_messaging_1.postMessage(this, phosphor_widget_1.Widget.MsgLayoutRequest);
    };
    /**
     * A message handler invoked on a `'child-removed'` message.
     */
    BoxPanel.prototype.onChildRemoved = function (msg) {
        arrays.removeAt(this._sizers, msg.previousIndex);
        if (this.isAttached)
            phosphor_messaging_1.sendMessage(msg.child, phosphor_widget_1.Widget.MsgBeforeDetach);
        this.node.removeChild(msg.child.node);
        phosphor_messaging_1.postMessage(this, phosphor_widget_1.Widget.MsgLayoutRequest);
        resetGeometry(msg.child);
    };
    /**
     * A message handler invoked on a `'child-moved'` message.
     */
    BoxPanel.prototype.onChildMoved = function (msg) {
        arrays.move(this._sizers, msg.previousIndex, msg.currentIndex);
        this.update();
    };
    /**
     * A message handler invoked on an `'after-show'` message.
     */
    BoxPanel.prototype.onAfterShow = function (msg) {
        this.update(true);
    };
    /**
     * A message handler invoked on an `'after-attach'` message.
     */
    BoxPanel.prototype.onAfterAttach = function (msg) {
        phosphor_messaging_1.postMessage(this, phosphor_widget_1.Widget.MsgLayoutRequest);
    };
    /**
     * A message handler invoked on a `'child-shown'` message.
     */
    BoxPanel.prototype.onChildShown = function (msg) {
        phosphor_messaging_1.postMessage(this, phosphor_widget_1.Widget.MsgLayoutRequest);
    };
    /**
     * A message handler invoked on a `'child-hidden'` message.
     */
    BoxPanel.prototype.onChildHidden = function (msg) {
        phosphor_messaging_1.postMessage(this, phosphor_widget_1.Widget.MsgLayoutRequest);
    };
    /**
     * A message handler invoked on a `'resize'` message.
     */
    BoxPanel.prototype.onResize = function (msg) {
        if (this.isVisible) {
            var width = msg.width < 0 ? this.node.offsetWidth : msg.width;
            var height = msg.height < 0 ? this.node.offsetHeight : msg.height;
            this._layoutChildren(width, height);
        }
    };
    /**
     * A message handler invoked on an `'update-request'` message.
     */
    BoxPanel.prototype.onUpdateRequest = function (msg) {
        if (this.isVisible) {
            this._layoutChildren(this.node.offsetWidth, this.node.offsetHeight);
        }
    };
    /**
     * A message handler invoked on a `'layout-request'` message.
     */
    BoxPanel.prototype.onLayoutRequest = function (msg) {
        if (this.isAttached) {
            this._setupGeometry();
        }
    };
    /**
     * Update the size constraints of the panel.
     */
    BoxPanel.prototype._setupGeometry = function () {
        // Compute the visible item count.
        var visibleCount = 0;
        for (var i = 0, n = this.childCount; i < n; ++i) {
            if (!this.childAt(i).hidden)
                visibleCount++;
        }
        // Update the fixed space for the visible items.
        this._fixedSpace = this.spacing * Math.max(0, visibleCount - 1);
        // Update the sizers and compute the new size limits.
        var minW = 0;
        var minH = 0;
        var maxW = Infinity;
        var maxH = Infinity;
        var dir = this.direction;
        if (dir === Direction.LeftToRight || dir === Direction.RightToLeft) {
            minW = this._fixedSpace;
            maxW = visibleCount > 0 ? minW : maxW;
            for (var i = 0, n = this.childCount; i < n; ++i) {
                var widget = this.childAt(i);
                var sizer = this._sizers[i];
                if (widget.hidden) {
                    sizer.minSize = 0;
                    sizer.maxSize = 0;
                    continue;
                }
                var limits = phosphor_domutil_1.sizeLimits(widget.node);
                sizer.sizeHint = BoxPanel.getSizeBasis(widget);
                sizer.stretch = BoxPanel.getStretch(widget);
                sizer.minSize = limits.minWidth;
                sizer.maxSize = limits.maxWidth;
                minW += limits.minWidth;
                maxW += limits.maxWidth;
                minH = Math.max(minH, limits.minHeight);
                maxH = Math.min(maxH, limits.maxHeight);
            }
        }
        else {
            minH = this._fixedSpace;
            maxH = visibleCount > 0 ? minH : maxH;
            for (var i = 0, n = this.childCount; i < n; ++i) {
                var widget = this.childAt(i);
                var sizer = this._sizers[i];
                if (widget.hidden) {
                    sizer.minSize = 0;
                    sizer.maxSize = 0;
                    continue;
                }
                var limits = phosphor_domutil_1.sizeLimits(widget.node);
                sizer.sizeHint = BoxPanel.getSizeBasis(widget);
                sizer.stretch = BoxPanel.getStretch(widget);
                sizer.minSize = limits.minHeight;
                sizer.maxSize = limits.maxHeight;
                minH += limits.minHeight;
                maxH += limits.maxHeight;
                minW = Math.max(minW, limits.minWidth);
                maxW = Math.min(maxW, limits.maxWidth);
            }
        }
        // Update the box sizing and add it to the size constraints.
        this._box = phosphor_domutil_1.boxSizing(this.node);
        minW += this._box.horizontalSum;
        minH += this._box.verticalSum;
        maxW += this._box.horizontalSum;
        maxH += this._box.verticalSum;
        // Update the panel's size constraints.
        var style = this.node.style;
        style.minWidth = minW + 'px';
        style.minHeight = minH + 'px';
        style.maxWidth = maxW === Infinity ? 'none' : maxW + 'px';
        style.maxHeight = maxH === Infinity ? 'none' : maxH + 'px';
        // Notifiy the parent that it should relayout.
        if (this.parent)
            phosphor_messaging_1.sendMessage(this.parent, phosphor_widget_1.Widget.MsgLayoutRequest);
        // Update the layout for the child widgets.
        this.update(true);
    };
    /**
     * Layout the children using the given offset width and height.
     */
    BoxPanel.prototype._layoutChildren = function (offsetWidth, offsetHeight) {
        // Bail early if their are no children to arrange.
        if (this.childCount === 0) {
            return;
        }
        // Ensure the box sizing is created.
        var box = this._box || (this._box = phosphor_domutil_1.boxSizing(this.node));
        // Compute the actual layout bounds adjusted for border and padding.
        var top = box.paddingTop;
        var left = box.paddingLeft;
        var width = offsetWidth - box.horizontalSum;
        var height = offsetHeight - box.verticalSum;
        // Distribute the layout space and layout the items.
        var dir = this.direction;
        var spacing = this.spacing;
        if (dir === Direction.LeftToRight) {
            phosphor_boxengine_1.boxCalc(this._sizers, Math.max(0, width - this._fixedSpace));
            for (var i = 0, n = this.childCount; i < n; ++i) {
                var widget = this.childAt(i);
                if (widget.hidden) {
                    continue;
                }
                var size = this._sizers[i].size;
                setGeometry(widget, left, top, size, height);
                left += size + spacing;
            }
        }
        else if (dir === Direction.TopToBottom) {
            phosphor_boxengine_1.boxCalc(this._sizers, Math.max(0, height - this._fixedSpace));
            for (var i = 0, n = this.childCount; i < n; ++i) {
                var widget = this.childAt(i);
                if (widget.hidden) {
                    continue;
                }
                var size = this._sizers[i].size;
                setGeometry(widget, left, top, width, size);
                top += size + spacing;
            }
        }
        else if (dir === Direction.RightToLeft) {
            left += width;
            phosphor_boxengine_1.boxCalc(this._sizers, Math.max(0, width - this._fixedSpace));
            for (var i = 0, n = this.childCount; i < n; ++i) {
                var widget = this.childAt(i);
                if (widget.hidden) {
                    continue;
                }
                var size = this._sizers[i].size;
                setGeometry(widget, left - size, top, size, height);
                left -= size + spacing;
            }
        }
        else {
            top += height;
            phosphor_boxengine_1.boxCalc(this._sizers, Math.max(0, height - this._fixedSpace));
            for (var i = 0, n = this.childCount; i < n; ++i) {
                var widget = this.childAt(i);
                if (widget.hidden) {
                    continue;
                }
                var size = this._sizers[i].size;
                setGeometry(widget, left, top - size, width, size);
                top -= size + spacing;
            }
        }
    };
    /**
     * The change handler for the [[orientationProperty]].
     */
    BoxPanel.prototype._onDirectionChanged = function (old, value) {
        this.toggleClass(LEFT_TO_RIGHT_CLASS, value === Direction.LeftToRight);
        this.toggleClass(RIGHT_TO_LEFT_CLASS, value === Direction.RightToLeft);
        this.toggleClass(TOP_TO_BOTTOM_CLASS, value === Direction.TopToBottom);
        this.toggleClass(BOTTOM_TO_TOP_CLASS, value === Direction.BottomToTop);
        phosphor_messaging_1.postMessage(this, phosphor_widget_1.Widget.MsgLayoutRequest);
    };
    /**
     * A convenience alias of the `LeftToRight` [[Direction]].
     */
    BoxPanel.LeftToRight = Direction.LeftToRight;
    /**
     * A convenience alias of the `RightToLeft` [[Direction]].
     */
    BoxPanel.RightToLeft = Direction.RightToLeft;
    /**
     * A convenience alias of the `TopToBottom` [[Direction]].
     */
    BoxPanel.TopToBottom = Direction.TopToBottom;
    /**
     * A convenience alias of the `BottomToTop` [[Direction]].
     */
    BoxPanel.BottomToTop = Direction.BottomToTop;
    /**
     * The property descriptor for the box panel layout direction.
     *
     * The controls the arrangement of child widgets within the panel.
     * The default value is `TopToBottom`.
     *
     * **See also:** [[direction]]
     */
    BoxPanel.directionProperty = new phosphor_properties_1.Property({
        value: Direction.TopToBottom,
        changed: function (owner, old, value) { return owner._onDirectionChanged(old, value); },
    });
    /**
     * The property descriptor for the box panel spacing.
     *
     * The controls the fixed spacing between the child widgets, in
     * pixels. The default value is `8`.
     *
     * **See also:** [[spacing]]
     */
    BoxPanel.spacingProperty = new phosphor_properties_1.Property({
        value: 8,
        coerce: function (owner, value) { return Math.max(0, value | 0); },
        changed: function (owner) { return phosphor_messaging_1.postMessage(owner, phosphor_widget_1.Widget.MsgLayoutRequest); },
    });
    /**
     * The property descriptor for a widget stretch factor.
     *
     * This is an attached property which controls how much a child widget
     * stretches or shrinks relative to its siblings when the box panel is
     * resized. The default value is `0`.
     *
     * **See also:** [[getStretch]], [[setStretch]]
     */
    BoxPanel.stretchProperty = new phosphor_properties_1.Property({
        value: 0,
        coerce: function (owner, value) { return Math.max(0, value | 0); },
        changed: onChildPropertyChanged,
    });
    /**
     * The property descriptor for a widget size basis.
     *
     * This is an attached property which controls the preferred size of
     * a child widget. The widget will be initialized to this size before
     * being expanded or shrunk to fit the available layout space. The
     * default value is `0`.
     *
     * **See also:** [[getSizeBasis]], [[setSizeBasis]]
     */
    BoxPanel.sizeBasisProperty = new phosphor_properties_1.Property({
        value: 0,
        coerce: function (owner, value) { return Math.max(0, value | 0); },
        changed: onChildPropertyChanged,
    });
    return BoxPanel;
})(phosphor_widget_1.Widget);
exports.BoxPanel = BoxPanel;
/**
 * A private attached property which stores a widget offset rect.
 */
var rectProperty = new phosphor_properties_1.Property({
    create: createRect,
});
/**
 * Create a new offset rect filled with NaNs.
 */
function createRect() {
    return { top: NaN, left: NaN, width: NaN, height: NaN };
}
/**
 * Get the offset rect for a widget.
 */
function getRect(widget) {
    return rectProperty.get(widget);
}
/**
 * Set the offset geometry for the given widget.
 *
 * A resize message will be dispatched to the widget if appropriate.
 */
function setGeometry(widget, left, top, width, height) {
    var resized = false;
    var rect = getRect(widget);
    var style = widget.node.style;
    if (rect.top !== top) {
        rect.top = top;
        style.top = top + 'px';
    }
    if (rect.left !== left) {
        rect.left = left;
        style.left = left + 'px';
    }
    if (rect.width !== width) {
        resized = true;
        rect.width = width;
        style.width = width + 'px';
    }
    if (rect.height !== height) {
        resized = true;
        rect.height = height;
        style.height = height + 'px';
    }
    if (resized) {
        phosphor_messaging_1.sendMessage(widget, new phosphor_widget_1.ResizeMessage(width, height));
    }
}
/**
 * Reset the inline geometry and rect cache for the given widget
 */
function resetGeometry(widget) {
    var rect = getRect(widget);
    var style = widget.node.style;
    rect.top = NaN;
    rect.left = NaN;
    rect.width = NaN;
    rect.height = NaN;
    style.top = '';
    style.left = '';
    style.width = '';
    style.height = '';
}
/**
 * The change handler for the attached child properties.
 */
function onChildPropertyChanged(child) {
    if (child.parent instanceof BoxPanel) {
        phosphor_messaging_1.postMessage(child.parent, phosphor_widget_1.Widget.MsgLayoutRequest);
    }
}

},{"./index.css":8,"phosphor-arrays":6,"phosphor-boxengine":7,"phosphor-domutil":11,"phosphor-messaging":16,"phosphor-properties":18,"phosphor-widget":37}],10:[function(require,module,exports){
var css = "/*-----------------------------------------------------------------------------\r\n| Copyright (c) 2014-2015, PhosphorJS Contributors\r\n|\r\n| Distributed under the terms of the BSD 3-Clause License.\r\n|\r\n| The full license is in the file LICENSE, distributed with this software.\r\n|----------------------------------------------------------------------------*/\nbody.p-mod-override-cursor * {\n  cursor: inherit !important;\n}\n"; (require("browserify-css").createStyle(css, { "href": "node_modules/phosphor-boxpanel/node_modules/phosphor-domutil/lib/index.css"})); module.exports = css;
},{"browserify-css":5}],11:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var phosphor_disposable_1 = require('phosphor-disposable');
require('./index.css');
/**
 * The class name added to the document body during cursor override.
 */
var OVERRIDE_CURSOR_CLASS = 'p-mod-override-cursor';
/**
 * The id for the active cursor override.
 */
var overrideID = 0;
/**
 * Override the cursor for the entire document.
 *
 * @param cursor - The string representing the cursor style.
 *
 * @returns A disposable which will clear the override when disposed.
 *
 * #### Notes
 * The most recent call to `overrideCursor` takes precendence. Disposing
 * an old override is a no-op and will not effect the current override.
 *
 * #### Example
 * ```typescript
 * import { overrideCursor } from 'phosphor-domutil';
 *
 * // force the cursor to be 'wait' for the entire document
 * var override = overrideCursor('wait');
 *
 * // clear the override by disposing the return value
 * override.dispose();
 * ```
 */
function overrideCursor(cursor) {
    var id = ++overrideID;
    var body = document.body;
    body.style.cursor = cursor;
    body.classList.add(OVERRIDE_CURSOR_CLASS);
    return new phosphor_disposable_1.DisposableDelegate(function () {
        if (id === overrideID) {
            body.style.cursor = '';
            body.classList.remove(OVERRIDE_CURSOR_CLASS);
        }
    });
}
exports.overrideCursor = overrideCursor;
/**
 * Test whether a client position lies within a node.
 *
 * @param node - The DOM node of interest.
 *
 * @param clientX - The client X coordinate of interest.
 *
 * @param clientY - The client Y coordinate of interest.
 *
 * @returns `true` if the node covers the position, `false` otherwise.
 *
 * #### Example
 * ```typescript
 * import { hitTest } from 'phosphor-domutil';
 *
 * var div = document.createElement('div');
 * div.style.position = 'absolute';
 * div.style.left = '0px';
 * div.style.top = '0px';
 * div.style.width = '100px';
 * div.style.height = '100px';
 * document.body.appendChild(div);
 *
 * hitTest(div, 50, 50);   // true
 * hitTest(div, 150, 150); // false
 * ```
 */
function hitTest(node, clientX, clientY) {
    var rect = node.getBoundingClientRect();
    return (clientX >= rect.left &&
        clientX < rect.right &&
        clientY >= rect.top &&
        clientY < rect.bottom);
}
exports.hitTest = hitTest;
/**
 * Compute the box sizing for a DOM node.
 *
 * @param node - The DOM node for which to compute the box sizing.
 *
 * @returns The box sizing data for the specified DOM node.
 *
 * #### Example
 * ```typescript
 * import { boxSizing } from 'phosphor-domutil';
 *
 * var div = document.createElement('div');
 * div.style.borderTop = 'solid 10px black';
 * document.body.appendChild(div);
 *
 * var sizing = boxSizing(div);
 * sizing.borderTop;    // 10
 * sizing.paddingLeft;  // 0
 * // etc...
 * ```
 */
function boxSizing(node) {
    var cstyle = window.getComputedStyle(node);
    var bt = parseInt(cstyle.borderTopWidth, 10) || 0;
    var bl = parseInt(cstyle.borderLeftWidth, 10) || 0;
    var br = parseInt(cstyle.borderRightWidth, 10) || 0;
    var bb = parseInt(cstyle.borderBottomWidth, 10) || 0;
    var pt = parseInt(cstyle.paddingTop, 10) || 0;
    var pl = parseInt(cstyle.paddingLeft, 10) || 0;
    var pr = parseInt(cstyle.paddingRight, 10) || 0;
    var pb = parseInt(cstyle.paddingBottom, 10) || 0;
    var hs = bl + pl + pr + br;
    var vs = bt + pt + pb + bb;
    return {
        borderTop: bt,
        borderLeft: bl,
        borderRight: br,
        borderBottom: bb,
        paddingTop: pt,
        paddingLeft: pl,
        paddingRight: pr,
        paddingBottom: pb,
        horizontalSum: hs,
        verticalSum: vs,
    };
}
exports.boxSizing = boxSizing;
/**
 * Compute the size limits for a DOM node.
 *
 * @param node - The node for which to compute the size limits.
 *
 * @returns The size limit data for the specified DOM node.
 *
 * #### Example
 * ```typescript
 * import { sizeLimits } from 'phosphor-domutil';
 *
 * var div = document.createElement('div');
 * div.style.minWidth = '90px';
 * document.body.appendChild(div);
 *
 * var limits = sizeLimits(div);
 * limits.minWidth;   // 90
 * limits.maxHeight;  // Infinity
 * // etc...
 * ```
 */
function sizeLimits(node) {
    var cstyle = window.getComputedStyle(node);
    return {
        minWidth: parseInt(cstyle.minWidth, 10) || 0,
        minHeight: parseInt(cstyle.minHeight, 10) || 0,
        maxWidth: parseInt(cstyle.maxWidth, 10) || Infinity,
        maxHeight: parseInt(cstyle.maxHeight, 10) || Infinity,
    };
}
exports.sizeLimits = sizeLimits;
/**
 * The internal MIME type used to store the custom drag data.
 */
var DRAG_MIME_TYPE = 'application/x-phosphor-internal-drag-data';
/**
 * The internal cache that holds the custom drag data.
 */
var dragCache = {
    data: Object.create(null),
    id: 0
};
/**
 * Get the custom data associated with a drag and drop operation.
 *
 * @param event - The DragEvent generated by a user interaction.
 *
 * @param mime - The MIME type whose data is being retrieved.
 *
 * @returns The value associated with a DragEvent and a MIME type,
 *   or `undefined` if not data has been set for the combination.
 *
 * #### Notes
 * The native drag and drop life cycle ends for the drop target with
 * a `drop` event where the value associated with a particular MIME
 * should be retrieved. One example is a Widget being dropped on a
 * target that will clone it using a retrieved factory function.
 */
function getDragData(event, mime) {
    var id = event.dataTransfer.getData(DRAG_MIME_TYPE);
    return id && dragCache.data[id] && dragCache.data[id][mime];
}
exports.getDragData = getDragData;
/**
 * Set custom drag data for a specific drag event.
 *
 * @param event - The DragEvent generated by a user interaction.
 *
 * @param mime - The MIME type whose data is being retrieved.
 *
 * @param data - The value to stored for the DragEvent and MIME
 *   combination. This can be any object, not just string data.
 *
 * #### Notes
 * The native drag and drop life cycle begins with a `dragstart` event
 * on the draggable node. The value associated with a particular MIME
 * should be set in this event handler.
 */
function setDragData(event, mime, data) {
    var id = event.dataTransfer.getData(DRAG_MIME_TYPE);
    if (!id) {
        id = "drag-" + ++dragCache.id;
        event.dataTransfer.setData(DRAG_MIME_TYPE, id);
    }
    if (!dragCache.data[id]) {
        dragCache.data[id] = Object.create(null);
    }
    dragCache.data[id][mime] = data;
}
exports.setDragData = setDragData;
/**
 * Clear the data being held for a specific drag event.
 *
 * @param event - The DragEvent generated by a user interaction.
 *
 * #### Notes
 * The native drag and drop life cycle ends with a `dragend` event on
 * the draggable node. The values associated with a particular event
 * should be cleared in this event handler.
 */
function clearDragData(event) {
    var id = event.dataTransfer.getData(DRAG_MIME_TYPE);
    if (id)
        delete dragCache.data[id];
}
exports.clearDragData = clearDragData;

},{"./index.css":10,"phosphor-disposable":12}],12:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
/**
 * A disposable object which delegates to a callback.
 */
var DisposableDelegate = (function () {
    /**
     * Construct a new disposable delegate.
     *
     * @param callback - The function to invoke when the delegate is
     *   disposed.
     */
    function DisposableDelegate(callback) {
        this._callback = callback;
    }
    Object.defineProperty(DisposableDelegate.prototype, "isDisposed", {
        /**
         * Test whether the delegate has been disposed.
         *
         * #### Notes
         * This is a read-only property which is always safe to access.
         */
        get: function () {
            return !this._callback;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Dispose of the delegate and invoke its callback.
     *
     * #### Notes
     * If this method is called more than once, all calls made after the
     * first will be a no-op.
     */
    DisposableDelegate.prototype.dispose = function () {
        var callback = this._callback;
        this._callback = null;
        if (callback)
            callback();
    };
    return DisposableDelegate;
})();
exports.DisposableDelegate = DisposableDelegate;
/**
 * An object which manages a collection of disposable items.
 */
var DisposableSet = (function () {
    /**
     * Construct a new disposable set.
     *
     * @param items - The initial disposable items for the set.
     */
    function DisposableSet(items) {
        var _this = this;
        this._set = new Set();
        if (items)
            items.forEach(function (item) { return _this._set.add(item); });
    }
    Object.defineProperty(DisposableSet.prototype, "isDisposed", {
        /**
         * Test whether the set has been disposed.
         *
         * #### Notes
         * This is a read-only property which is always safe to access.
         */
        get: function () {
            return !this._set;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Dispose of the set and dispose the items it contains.
     *
     * #### Notes
     * Items are disposed in the order they are added to the set.
     *
     * It is unsafe to use the set after it has been disposed.
     *
     * If this method is called more than once, all calls made after the
     * first will be a no-op.
     */
    DisposableSet.prototype.dispose = function () {
        var set = this._set;
        this._set = null;
        if (set)
            set.forEach(function (item) { return item.dispose(); });
    };
    /**
     * Add a disposable item to the set.
     *
     * @param item - The disposable item to add to the set. If the item
     *   is already contained in the set, this is a no-op.
     *
     * @throws Will throw an error if the set has been disposed.
     */
    DisposableSet.prototype.add = function (item) {
        if (!this._set) {
            throw new Error('object is disposed');
        }
        this._set.add(item);
    };
    /**
     * Remove a disposable item from the set.
     *
     * @param item - The disposable item to remove from the set. If the
     *   item does not exist in the set, this is a no-op.
     *
     * @throws Will throw an error if the set has been disposed.
     */
    DisposableSet.prototype.remove = function (item) {
        if (!this._set) {
            throw new Error('object is disposed');
        }
        this._set.delete(item);
    };
    /**
     * Clear all disposable items from the set.
     *
     * @throws Will throw an error if the set has been disposed.
     */
    DisposableSet.prototype.clear = function () {
        if (!this._set) {
            throw new Error('object is disposed');
        }
        this._set.clear();
    };
    return DisposableSet;
})();
exports.DisposableSet = DisposableSet;

},{}],13:[function(require,module,exports){
var css = "/*-----------------------------------------------------------------------------\r\n| Copyright (c) 2014-2015, PhosphorJS Contributors\r\n|\r\n| Distributed under the terms of the BSD 3-Clause License.\r\n|\r\n| The full license is in the file LICENSE, distributed with this software.\r\n|----------------------------------------------------------------------------*/\nbody.p-mod-override-cursor * {\n  cursor: inherit !important;\n}\n.p-mod-ghost {\n  position: absolute;\n}\n"; (require("browserify-css").createStyle(css, { "href": "node_modules/phosphor-domutil/lib/index.css"})); module.exports = css;
},{"browserify-css":5}],14:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var phosphor_disposable_1 = require('phosphor-disposable');
require('./index.css');
/**
 * The class name added to the document body during cursor override.
 */
var OVERRIDE_CURSOR_CLASS = 'p-mod-override-cursor';
/**
 * The class name added to a drag ghost node.
 */
var GHOST_CLASS = 'p-mod-ghost';
/**
 * The number of pixels of movement before the drag/drop lifecycle begins.
 */
var DRAG_THRESHOLD = 5;
/**
 * Override the cursor for the entire document.
 *
 * @param cursor - The string representing the cursor style.
 *
 * @returns A disposable which will clear the override when disposed.
 *
 * #### Notes
 * The most recent call to `overrideCursor` takes precedence. Disposing
 * an old override is a no-op and will not effect the current override.
 *
 * #### Example
 * ```typescript
 * import { overrideCursor } from 'phosphor-domutil';
 *
 * // force the cursor to be 'wait' for the entire document
 * let override = overrideCursor('wait');
 *
 * // clear the override by disposing the return value
 * override.dispose();
 * ```
 */
function overrideCursor(cursor) {
    var id = ++overrideID;
    var body = document.body;
    body.style.cursor = cursor;
    body.classList.add(OVERRIDE_CURSOR_CLASS);
    return new phosphor_disposable_1.DisposableDelegate(function () {
        if (id === overrideID) {
            body.style.cursor = '';
            body.classList.remove(OVERRIDE_CURSOR_CLASS);
        }
    });
}
exports.overrideCursor = overrideCursor;
/**
 * The internal id for the active cursor override.
 */
var overrideID = 0;
/**
 * Test whether a client position lies within a node.
 *
 * @param node - The DOM node of interest.
 *
 * @param clientX - The client X coordinate of interest.
 *
 * @param clientY - The client Y coordinate of interest.
 *
 * @returns `true` if the node covers the position, `false` otherwise.
 *
 * #### Example
 * ```typescript
 * import { hitTest } from 'phosphor-domutil';
 *
 * let div = document.createElement('div');
 * div.style.position = 'absolute';
 * div.style.left = '0px';
 * div.style.top = '0px';
 * div.style.width = '100px';
 * div.style.height = '100px';
 * document.body.appendChild(div);
 *
 * hitTest(div, 50, 50);   // true
 * hitTest(div, 150, 150); // false
 * ```
 */
function hitTest(node, clientX, clientY) {
    return hitTestRect(node.getBoundingClientRect(), clientX, clientY);
}
exports.hitTest = hitTest;
/**
 * Test whether a client position lies within a client rect.
 */
function hitTestRect(r, x, y) {
    return x >= r.left && x < r.right && y >= r.top && y < r.bottom;
}
/**
 * Compute the box sizing for a DOM node.
 *
 * @param node - The DOM node for which to compute the box sizing.
 *
 * @returns The box sizing data for the specified DOM node.
 *
 * #### Example
 * ```typescript
 * import { boxSizing } from 'phosphor-domutil';
 *
 * let div = document.createElement('div');
 * div.style.borderTop = 'solid 10px black';
 * document.body.appendChild(div);
 *
 * let sizing = boxSizing(div);
 * sizing.borderTop;    // 10
 * sizing.paddingLeft;  // 0
 * // etc...
 * ```
 */
function boxSizing(node) {
    var cstyle = window.getComputedStyle(node);
    var bt = parseInt(cstyle.borderTopWidth, 10) || 0;
    var bl = parseInt(cstyle.borderLeftWidth, 10) || 0;
    var br = parseInt(cstyle.borderRightWidth, 10) || 0;
    var bb = parseInt(cstyle.borderBottomWidth, 10) || 0;
    var pt = parseInt(cstyle.paddingTop, 10) || 0;
    var pl = parseInt(cstyle.paddingLeft, 10) || 0;
    var pr = parseInt(cstyle.paddingRight, 10) || 0;
    var pb = parseInt(cstyle.paddingBottom, 10) || 0;
    var hs = bl + pl + pr + br;
    var vs = bt + pt + pb + bb;
    return {
        borderTop: bt,
        borderLeft: bl,
        borderRight: br,
        borderBottom: bb,
        paddingTop: pt,
        paddingLeft: pl,
        paddingRight: pr,
        paddingBottom: pb,
        horizontalSum: hs,
        verticalSum: vs,
    };
}
exports.boxSizing = boxSizing;
/**
 * Compute the size limits for a DOM node.
 *
 * @param node - The node for which to compute the size limits.
 *
 * @returns The size limit data for the specified DOM node.
 *
 * #### Example
 * ```typescript
 * import { sizeLimits } from 'phosphor-domutil';
 *
 * let div = document.createElement('div');
 * div.style.minWidth = '90px';
 * document.body.appendChild(div);
 *
 * let limits = sizeLimits(div);
 * limits.minWidth;   // 90
 * limits.maxHeight;  // Infinity
 * // etc...
 * ```
 */
function sizeLimits(node) {
    var cstyle = window.getComputedStyle(node);
    return {
        minWidth: parseInt(cstyle.minWidth, 10) || 0,
        minHeight: parseInt(cstyle.minHeight, 10) || 0,
        maxWidth: parseInt(cstyle.maxWidth, 10) || Infinity,
        maxHeight: parseInt(cstyle.maxHeight, 10) || Infinity,
    };
}
exports.sizeLimits = sizeLimits;
/**
 * The data object for a drag and drop operation.
 *
 * Instances of this class are created automatically as needed.
 */
var DragData = (function () {
    /**
     * Construct a new drag data object.
     *
     * @param ghost - The HTML element which follows the cursor.
     */
    function DragData(ghost) {
        this._data = Object.create(null);
        this._ghost = ghost;
        this._action = 'none';
        this._override = overrideCursor('no-drop');
    }
    Object.defineProperty(DragData.prototype, "ghost", {
        /**
         * The HTML element which follows the cursor.
         *
         * #### Notes
         * This is a read-only property.
         */
        get: function () {
            return this._ghost;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragData.prototype, "dropAction", {
        /**
         * Get the current drop action.
         *
         * #### Notes
         * This will be one of `'copy'`, `'link'`, `'move'`, or `'none'`.
         */
        get: function () {
            return this._action;
        },
        /**
         * Set the current drop action.
         *
         * #### Notes
         * This must be one of `'copy'`, `'link'`, `'move'`, or `'none'`.
         *
         * The current cursor style will be updated to reflect the action.
         */
        set: function (value) {
            if (value === this._action) {
                return;
            }
            switch (value) {
                case 'copy':
                    this._action = value;
                    this._override = overrideCursor('copy');
                    break;
                case 'link':
                    this._action = value;
                    this._override = overrideCursor('alias');
                    break;
                case 'move':
                    this._action = value;
                    this._override = overrideCursor('move');
                    break;
                case 'none':
                    this._action = value;
                    this._override = overrideCursor('no-drop');
                    break;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * List the mime types added to the drag data.
     *
     * @returns A new array of the mime types added to the drag data.
     */
    DragData.prototype.types = function () {
        return Object.keys(this._data);
    };
    /**
     * Get the data for a particular mime type.
     *
     * @param mime - The mime type for the data.
     *
     * @returns The data for the mime type, or `undefined`.
     */
    DragData.prototype.getData = function (mime) {
        return this._data[mime];
    };
    /**
     * Set the data for a particular mime type.
     *
     * @param mime - The mime type for the data.
     *
     * @param data - The data for the mime type.
     */
    DragData.prototype.setData = function (mime, data) {
        this._data[mime] = data;
    };
    /**
     * Remove the data for a particular mime type.
     *
     * @param mime - The mime type for the data.
     */
    DragData.prototype.clearData = function (mime) {
        delete this._data[mime];
    };
    return DragData;
})();
exports.DragData = DragData;
/**
 * A class for implementing drag targets.
 *
 * #### Example
 * ```typescript
 * import {
 *   DragData, DragHandler
 * } from 'phosphor-domutil';
 *
 * class DragTarget {
 *
 *   constructor() {
 *     this._node = someNodeFactory();
 *     this._dragHandler = new DragHandler(this._node, this);
 *     this._dragHandler.onDragStart = this._onDragStart;
 *     this._dragHandler.onDragEnd = this._onDragEnd;
 *   }
 *
 *   dispose(): void {
 *     this._dragHandler.dispose();
 *   }
 *
 *   private _onDragStart(event: MouseEvent, data: DragData): void {
 *     data.setData('text/plain', 'hello');
 *     data.setData('application/x-my-custom-type', { foo: 42 });
 *     console.log('drag start', data);
 *   }
 *
 *   private _onDrag(event: MouseEvent, data: DragData): void {
 *     console.log('drag', data);
 *   }
 *
 *   private _onDragEnd(event: MouseEvent, data: DragData): void {
 *     console.log('drag end', data);
 *   }
 *
 *   private _node: HTMLElement;
 *   private _dragHandler: DragHandler;
 * }
 * ```
 */
var DragHandler = (function () {
    /**
     * Construct a new drag handler.
     *
     * @param node - The node which acts as the drag target.
     *
     * @param context - The `this` context for the drag handlers.
     */
    function DragHandler(node, context) {
        /**
         * A function called when the drag operation starts.
         *
         * @param event - The underlying native mouse event.
         *
         * @param data - The drag data object for the drag operation.
         *
         * #### Notes
         * The creator of the drag handler should assign a function to this
         * property to handle the drag start event.
         *
         * The handler should populate the data with the relevant mime data.
         */
        this.onDragStart = null;
        /**
         * A function called when the mouse cursor moves during the drag.
         *
         * @param event - The underlying native mouse event.
         *
         * @param data - The drag data object for the drag operation.
         *
         * #### Notes
         * The creator of the drag handler should assign a function to this
         * property to handle the drag event.
         *
         * This handler will not typically be provided. It is only useful in
         * special cases where the drag *source* wants to take action during
         * drag move events.
         */
        this.onDrag = null;
        /**
         * A function called when the drag operation ends.
         *
         * @param event - The underlying native mouse event.
         *
         * @param data - The drag data object for the drag operation.
         *
         * #### Notes
         * The creator of the drag handler should assign a function to this
         * property to handle the drag end event.
         *
         * The handler should read the `dropAction` property to determine
         * whether and how the drop target handled the drop action. If the
         * value is `'none'`, it indicates that the drop was not handled.
         */
        this.onDragEnd = null;
        this._pressX = -1;
        this._pressY = -1;
        this._dragData = null;
        this._node = node;
        this._context = context;
        node.addEventListener('mousedown', this);
    }
    /**
     * Dispose of the drag handler and remove its event listeners.
     */
    DragHandler.prototype.dispose = function () {
        document.removeEventListener('mousemove', this, true);
        document.removeEventListener('mouseup', this, true);
        this._node.removeEventListener('mousedown', this);
        this._node = null;
        this._context = null;
        this._disposeDragData();
        this.onDragStart = null;
        this.onDrag = null;
        this.onDragEnd = null;
    };
    Object.defineProperty(DragHandler.prototype, "isDisposed", {
        /**
         * Test if the drag handler is disposed.
         */
        get: function () {
            return this._node === null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragHandler.prototype, "node", {
        /**
         * Get the DOM node for the drag handler.
         *
         * #### Notes
         * This is a read-only property.
         */
        get: function () {
            return this._node;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragHandler.prototype, "context", {
        /**
         * Get the `this` context for the drag handlers.
         *
         * #### Notes
         * This is a read-only property.
         */
        get: function () {
            return this._context;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Create the HTML element that will follow the cursor.
     *
     * #### Notes
     * This can be reimplemented by a subclass to create a custom ghost
     * node. The default implementation clones the handler's `node`.
     */
    DragHandler.prototype.createGhost = function () {
        var node = this.node.cloneNode(true);
        var rect = this.node.getBoundingClientRect();
        node.style.height = rect.height + "px";
        node.style.width = rect.width + "px";
        node.classList.add(GHOST_CLASS);
        return node;
    };
    /**
     * Synthetically start the drag operation.
     *
     * @param clientX - The current client X position of the mouse.
     *
     * @param clientY - The current client Y position of the mouse.
     *
     * @param data - A mapping of mime type to mime data. This is used
     *   to populate the drag data object.
     *
     * #### Notes
     * This acts as a synthetic mouse press for the cases where a drag
     * operation needs to be started from other mouse handling code.
     *
     * The `onDragStart` handler will not be invoked when this method
     * is used to manually start a drag.
     */
    DragHandler.prototype.start = function (clientX, clientY, data) {
        // Do nothing if the drag is already started.
        if (this._dragData) {
            return;
        }
        // Store the initial mouse press position.
        this._pressX = clientX;
        this._pressY = clientY;
        // Add the document mouse listeners.
        document.addEventListener('mousemove', this, true);
        document.addEventListener('mouseup', this, true);
        // Invalidate the cached drop data before starting the drag.
        invalidateCachedDropData();
        // Create the drag data and attach the ghost node.
        this._dragData = new DragData(this.createGhost());
        document.body.appendChild(this._dragData.ghost);
        // Populate the drag data with the given mime data.
        for (var mime in data) {
            this._dragData.setData(mime, data[mime]);
        }
        // Move the ghost node to the new mouse position.
        var style = this._dragData.ghost.style;
        style.top = clientY + "px";
        style.left = clientX + "px";
    };
    /**
     * Handle the DOM events for the drag handler.
     *
     * @param event - The DOM event sent to the drag handler.
     *
     * #### Notes
     * This method implements the DOM `EventListener` interface and is
     * called in response to events on the drag handler's DOM node. It
     * should not be called directly by user code.
     */
    DragHandler.prototype.handleEvent = function (event) {
        switch (event.type) {
            case 'mousedown':
                this._evtMouseDown(event);
                break;
            case 'mousemove':
                this._evtMouseMove(event);
                break;
            case 'mouseup':
                this._evtMouseUp(event);
                break;
        }
    };
    /**
     * Handle the `'mousedown'` event for the drag handler.
     */
    DragHandler.prototype._evtMouseDown = function (event) {
        // Do nothing if the drag is already started.
        if (this._dragData) {
            return;
        }
        // Do nothing if the left button is not pressed.
        if (event.button !== 0) {
            return;
        }
        // TODO should we stop propagation here?
        // We may want to allow it in order to allow focus change.
        // Store the initial mouse press position.
        this._pressX = event.clientX;
        this._pressY = event.clientY;
        // Add the document mouse listeners.
        document.addEventListener('mousemove', this, true);
        document.addEventListener('mouseup', this, true);
    };
    /**
     * Handle the `'mousemove'` event for the drag handler.
     */
    DragHandler.prototype._evtMouseMove = function (event) {
        // Mouse move events are never propagated since this handler
        // is only installed when during a left mouse drag operation.
        event.preventDefault();
        event.stopPropagation();
        // Check to see if the drag threshold has been exceeded, and
        // start the drag operation the first time that event occurs.
        if (!this._dragData) {
            var dx = Math.abs(event.clientX - this._pressX);
            var dy = Math.abs(event.clientY - this._pressY);
            if (dx < DRAG_THRESHOLD && dy < DRAG_THRESHOLD) {
                return;
            }
            // Invalidate the cached drop data before starting the drag.
            invalidateCachedDropData();
            // Create the drag data and attach the ghost node.
            this._dragData = new DragData(this.createGhost());
            document.body.appendChild(this._dragData.ghost);
            // Run the drag start handler.
            runDragStart(this, event, this._dragData);
        }
        // Move the ghost node to the new mouse position.
        var style = this._dragData.ghost.style;
        style.top = event.clientY + "px";
        style.left = event.clientX + "px";
        // Run the drop handlers for the drag event.
        runDropHandlers(0 /* Drag */, event, this._dragData);
        // Run the drag event handler.
        runDrag(this, event, this._dragData);
    };
    /**
     * Handle the `'mouseup'` event for the drag handler.
     */
    DragHandler.prototype._evtMouseUp = function (event) {
        // Do nothing if the left mouse button is not released.
        if (event.button !== 0) {
            return;
        }
        // Mouse up events are never propagated since this handler
        // is only installed when during a left mouse drag operation.
        event.preventDefault();
        event.stopPropagation();
        // Remove the extra mouse handlers.
        document.removeEventListener('mousemove', this, true);
        document.removeEventListener('mouseup', this, true);
        // Bail if no drag is in progress.
        if (!this._dragData) {
            return;
        }
        // Run the drop and end handlers, then dispose the drag data.
        try {
            runDropHandlers(1 /* Drop */, event, this._dragData);
            runDragEnd(this, event, this._dragData);
        }
        finally {
            this._disposeDragData();
        }
    };
    /**
     * Dispose of the resources held by the drag data.
     */
    DragHandler.prototype._disposeDragData = function () {
        var data = this._dragData;
        if (!data) {
            return;
        }
        this._dragData = null;
        document.body.removeChild(data.ghost);
        data._override.dispose();
    };
    return DragHandler;
})();
exports.DragHandler = DragHandler;
/**
 * A class for implementing drop targets.
 *
 * #### Example
 * ```typescript
 * import {
 *   DragData, DropHandler
 * } from 'phosphor-domutil';
 *
 * class DropTarget {
 *
 *   constructor() {
 *     this._node = someNodeFactory();
 *     this._dropHandler = new DropHandler(this._node, this);
 *     this._dropHandler.onDragEnter = this._onDragEnter;
 *     this._dropHandler.onDragLeave = this._onDragLeave;
 *     this._dropHandler.onDragOver = this._onDragOver;
 *     this._dropHandler.onDrop = this._onDrop;
 *   }
 *
 *   dispose(): void {
 *     this._dropHandler.dispose();
 *   }
 *
 *   private _onDragEnter(event: MouseEvent, data: DragData): void {
 *     console.log('drag enter', data);
 *   }
 *
 *   private _onDragLeave(event: MouseEvent, data: DragData): void {
 *     console.log('drag leave', data);
 *   }
 *
 *   private _onDragOver(event: MouseEvent, data: DragData): void {
 *     console.log('drag', data);
 *   }
 *
 *   private _onDrop(event: MouseEvent, data: DragData): void {
 *     console.log(data.getData('text/plain'));
 *     console.log(data.getData('application/x-my-custom-type'));
 *     console.log('drop', data);
 *   }
 *
 *   private _node: HTMLElement;
 *   private _dropHandler: DropHandler;
 * }
 * ```
 */
var DropHandler = (function () {
    /**
     * Construct a new drop handler.
     *
     * @param node - The node which acts as the drop target.
     *
     * @param context - The `this` context for the drop handlers.
     */
    function DropHandler(node, context) {
        /**
         * A function called when the drag enters the DOM node.
         *
         * @param event - The underlying native mouse event.
         *
         * @param data - The drag data object for the drag operation.
         *
         * #### Notes
         * The creator of the drop handler should assign a function to this
         * property to handle the drag enter event.
         *
         * The handler should update the `dropAction` of the data to reflect
         * whether or not it can accept drops from the given drag data.
         */
        this.onDragEnter = null;
        /**
         * A function called when the drag moves over the DOM node.
         *
         * @param event - The underlying native mouse event.
         *
         * @param data - The drag data object for the drag operation.
         *
         * #### Notes
         * The creator of the drop handler should assign a function to this
         * property to handle the drag over event.
         *
         * The handler should update the `dropAction` of the data if the
         * result is different than the action set by the enter handler.
         */
        this.onDragOver = null;
        /**
         * A function called when the drag leaves the DOM node.
         *
         * @param event - The underlying native mouse event.
         *
         * @param data - The drag data object for the drag operation.
         *
         * #### Notes
         * The creator of the drop handler should assign a function to this
         * property to handle the drag leave event.
         *
         * The `dropAction` is set to `'none'` after this handler returns.
         */
        this.onDragLeave = null;
        /**
         * A function called when a drop occurs on the DOM node.
         *
         * @param event - The underlying native mouse event.
         *
         * @param data - The drag data object for the drag operation.
         *
         * #### Notes
         * The creator of the drop handler should assign a function to this
         * property to handle the drop event.
         *
         * The handler should update the `dropAction` of the data if the
         * result is different than the action which was previously set.
         *
         * The `dropAction` will be set to `'none'` if the handler is `null`.
         */
        this.onDrop = null;
        this._id = nextDropID();
        this._node = node;
        this._context = context;
        dropRegistry[this._id] = createDropRecord(this);
    }
    /**
     * Dispose of the resources held by the drop handler.
     */
    DropHandler.prototype.dispose = function () {
        delete dropRegistry[this._id];
        this.onDragEnter = null;
        this.onDragOver = null;
        this.onDragLeave = null;
        this.onDrop = null;
        this._context = null;
        this._node = null;
    };
    Object.defineProperty(DropHandler.prototype, "isDisposed", {
        /**
         * Test if the drop handler is disposed.
         */
        get: function () {
            return this._node === null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropHandler.prototype, "node", {
        /**
         * Get the DOM node for the drop handler.
         *
         * #### Notes
         * This is a read-only property.
         */
        get: function () {
            return this._node;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropHandler.prototype, "context", {
        /**
         * Get the `this` context for the drop handlers.
         *
         * #### Notes
         * This is a read-only property.
         */
        get: function () {
            return this._context;
        },
        enumerable: true,
        configurable: true
    });
    return DropHandler;
})();
exports.DropHandler = DropHandler;
/**
 * A function which computes successive unique drop ids.
 */
var nextDropID = (function () { var id = 0; return function () { return 'dropID-' + id++; }; })();
/**
 * The registry of drop records.
 */
var dropRegistry = Object.create(null);
/**
 * Create a drop record for the given drop handler.
 */
function createDropRecord(handler) {
    return { handler: handler, entered: false, rect: null };
}
/**
 * Invalidate the cached drop record data.
 */
function invalidateCachedDropData() {
    for (var key in dropRegistry) {
        var record = dropRegistry[key];
        record.entered = false;
        record.rect = null;
    }
}
/**
 * Run the relevant drop handlers for the given parameters.
 */
function runDropHandlers(action, event, data) {
    // TODO handle z-order for overlapping drop targets.
    // Refresh the client rects and run drag leave handlers.
    for (var key in dropRegistry) {
        // Fetch common variables.
        var record = dropRegistry[key];
        var handler = record.handler;
        // Refresh the client drop rect if necessary.
        if (!record.rect) {
            record.rect = handler.node.getBoundingClientRect();
        }
        // Skip all un-entered records
        if (!record.entered) {
            continue;
        }
        // Dispatch the drag leave event if necessary.
        if (!hitTestRect(record.rect, event.clientX, event.clientY)) {
            record.entered = false;
            runDragLeave(record.handler, event, data);
        }
    }
    // Dispatch the rest of the relevant handlers.
    for (var key in dropRegistry) {
        // Fetch common variables.
        var record = dropRegistry[key];
        var handler = record.handler;
        // Skip the non-relevant targets.
        if (!hitTestRect(record.rect, event.clientX, event.clientY)) {
            continue;
        }
        // Run the drag enter event if necessary.
        if (!record.entered) {
            record.entered = true;
            runDragEnter(record.handler, event, data);
        }
        // Run the drag over or drop as needed.
        if (action === 0 /* Drag */) {
            runDragOver(record.handler, event, data);
        }
        else if (action === 1 /* Drop */) {
            runDrop(record.handler, event, data);
        }
    }
}
/**
 * Run a drag handler's drag start event handler, if it exists.
 */
function runDragStart(handler, event, data) {
    if (handler.onDragStart) {
        handler.onDragStart.call(handler.context, event, data);
    }
}
/**
 * Run a drag handler's drag event handler, if it exists.
 */
function runDrag(handler, event, data) {
    if (handler.onDrag) {
        handler.onDrag.call(handler.context, event, data);
    }
}
/**
 * Run a drag handler's drag end event handler, if it exists.
 */
function runDragEnd(handler, event, data) {
    if (handler.onDragEnd) {
        handler.onDragEnd.call(handler.context, event, data);
    }
}
/**
 * Run a drop handler's drag enter event handler, if it exists.
 */
function runDragEnter(handler, event, data) {
    if (handler.onDragEnter) {
        handler.onDragEnter.call(handler.context, event, data);
    }
}
/**
 * Run a drop handler's drag over event handler, if it exists.
 */
function runDragOver(handler, event, data) {
    if (handler.onDragOver) {
        handler.onDragOver.call(handler.context, event, data);
    }
}
/**
 * Run a drop handler's drag leave event handler, if it exists.
 */
function runDragLeave(handler, event, data) {
    if (handler.onDragLeave) {
        handler.onDragLeave.call(handler.context, event, data);
    }
    data.dropAction = 'none';
}
/**
 * Run a drop handler's drop event handler, if it exists.
 */
function runDrop(handler, event, data) {
    if (handler.onDrop) {
        handler.onDrop.call(handler.context, event, data);
    }
    else {
        data.dropAction = 'none';
    }
}

},{"./index.css":13,"phosphor-disposable":15}],15:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
/**
 * A disposable object which delegates to a callback.
 */
var DisposableDelegate = (function () {
    /**
     * Construct a new disposable delegate.
     *
     * @param callback - The function to invoke when the delegate is
     *   disposed.
     */
    function DisposableDelegate(callback) {
        this._callback = callback || null;
    }
    Object.defineProperty(DisposableDelegate.prototype, "isDisposed", {
        /**
         * Test whether the delegate has been disposed.
         *
         * #### Notes
         * This is a read-only property which is always safe to access.
         */
        get: function () {
            return this._callback === null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Dispose of the delegate and invoke its callback.
     *
     * #### Notes
     * If this method is called more than once, all calls made after the
     * first will be a no-op.
     */
    DisposableDelegate.prototype.dispose = function () {
        if (this._callback === null) {
            return;
        }
        var callback = this._callback;
        this._callback = null;
        callback();
    };
    return DisposableDelegate;
})();
exports.DisposableDelegate = DisposableDelegate;
/**
 * An object which manages a collection of disposable items.
 */
var DisposableSet = (function () {
    /**
     * Construct a new disposable set.
     *
     * @param items - The initial disposable items for the set.
     */
    function DisposableSet(items) {
        var _this = this;
        this._set = new Set();
        if (items)
            items.forEach(function (item) { _this._set.add(item); });
    }
    Object.defineProperty(DisposableSet.prototype, "isDisposed", {
        /**
         * Test whether the set has been disposed.
         *
         * #### Notes
         * This is a read-only property which is always safe to access.
         */
        get: function () {
            return this._set === null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Dispose of the set and dispose the items it contains.
     *
     * #### Notes
     * Items are disposed in the order they are added to the set.
     *
     * It is unsafe to use the set after it has been disposed.
     *
     * If this method is called more than once, all calls made after the
     * first will be a no-op.
     */
    DisposableSet.prototype.dispose = function () {
        if (this._set === null) {
            return;
        }
        var set = this._set;
        this._set = null;
        set.forEach(function (item) { item.dispose(); });
    };
    /**
     * Add a disposable item to the set.
     *
     * @param item - The disposable item to add to the set. If the item
     *   is already contained in the set, this is a no-op.
     *
     * @throws Will throw an error if the set has been disposed.
     */
    DisposableSet.prototype.add = function (item) {
        if (this._set === null) {
            throw new Error('object is disposed');
        }
        this._set.add(item);
    };
    /**
     * Remove a disposable item from the set.
     *
     * @param item - The disposable item to remove from the set. If the
     *   item does not exist in the set, this is a no-op.
     *
     * @throws Will throw an error if the set has been disposed.
     */
    DisposableSet.prototype.remove = function (item) {
        if (this._set === null) {
            throw new Error('object is disposed');
        }
        this._set.delete(item);
    };
    /**
     * Clear all disposable items from the set.
     *
     * @throws Will throw an error if the set has been disposed.
     */
    DisposableSet.prototype.clear = function () {
        if (this._set === null) {
            throw new Error('object is disposed');
        }
        this._set.clear();
    };
    return DisposableSet;
})();
exports.DisposableSet = DisposableSet;

},{}],16:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var phosphor_queue_1 = require('phosphor-queue');
/**
 * A mesage which can be sent or posted to a message handler.
 *
 * #### Notes
 * This class may be subclassed to create complex message types.
 *
 * **See Also** [[postMessage]] and [[sendMessage]].
 */
var Message = (function () {
    /**
     * Construct a new message.
     *
     * @param type - The type of the message. Consumers of a message will
     *   use this value to cast the message to the appropriately derived
     *   message type.
     */
    function Message(type) {
        this._type = type;
    }
    Object.defineProperty(Message.prototype, "type", {
        /**
         * Get the type of the message.
         */
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    return Message;
})();
exports.Message = Message;
/**
 * Send a message to the message handler to process immediately.
 *
 * @param handler - The handler which should process the message.
 *
 * @param msg - The message to send to the handler.
 *
 * #### Notes
 * Unlike [[postMessage]], [[sendMessage]] delivers the message to
 * the handler immediately. The handler will not have the opportunity
 * to compress the message, however the message will still be sent
 * through any installed message filters.
 *
 * **See Also** [[postMessage]].
 */
function sendMessage(handler, msg) {
    getDispatcher(handler).sendMessage(handler, msg);
}
exports.sendMessage = sendMessage;
/**
 * Post a message to the message handler to process in the future.
 *
 * @param handler - The handler which should process the message.
 *
 * @param msg - The message to post to the handler.
 *
 * #### Notes
 * Unlike [[sendMessage]], [[postMessage]] will schedule the deliver of
 * the message for the next cycle of the event loop. The handler will
 * have the opportunity to compress the message in order to optimize
 * its handling of similar messages. The message will be sent through
 * any installed message filters before being delivered to the handler.
 *
 * **See Also** [[sendMessage]].
 */
function postMessage(handler, msg) {
    getDispatcher(handler).postMessage(handler, msg);
}
exports.postMessage = postMessage;
/**
 * Test whether a message handler has posted messages pending delivery.
 *
 * @param handler - The message handler of interest.
 *
 * @returns `true` if the handler has pending posted messages, `false`
 *   otherwise.
 *
 * **See Also** [[sendPendingMessage]].
 */
function hasPendingMessages(handler) {
    return getDispatcher(handler).hasPendingMessages();
}
exports.hasPendingMessages = hasPendingMessages;
/**
 * Send the first pending posted message to the message handler.
 *
 * @param handler - The message handler of interest.
 *
 * #### Notes
 * If the handler has no pending messages, this is a no-op.
 *
 * **See Also** [[hasPendingMessages]].
 */
function sendPendingMessage(handler) {
    getDispatcher(handler).sendPendingMessage(handler);
}
exports.sendPendingMessage = sendPendingMessage;
/**
 * Install a message filter for a message handler.
 *
 * A message filter is invoked before the message handler processes a
 * message. If the filter returns `true` from its [[filterMessage]] method,
 * no other filters will be invoked, and the message will not be delivered.
 *
 * The most recently installed message filter is executed first.
 *
 * @param handler - The handler whose messages should be filtered.
 *
 * @param filter - The filter to install for the handler.
 *
 * #### Notes
 * It is possible to install the same filter multiple times. If the
 * filter should be unique, call [[removeMessageFilter]] first.
 *
 * **See Also** [[removeMessageFilter]].
 */
function installMessageFilter(handler, filter) {
    getDispatcher(handler).installMessageFilter(filter);
}
exports.installMessageFilter = installMessageFilter;
/**
 * Remove a previously installed message filter for a message handler.
 *
 * @param handler - The handler for which the filter is installed.
 *
 * @param filter - The filter to remove.
 *
 * #### Notes
 * This will remove **all** occurrences of the filter. If the filter is
 * not installed, this is a no-op.
 *
 * It is safe to call this function while the filter is executing.
 *
 * **See Also** [[installMessageFilter]].
 */
function removeMessageFilter(handler, filter) {
    getDispatcher(handler).removeMessageFilter(filter);
}
exports.removeMessageFilter = removeMessageFilter;
/**
 * Clear all message data associated with the message handler.
 *
 * @param handler - The message handler for which to clear the data.
 *
 * #### Notes
 * This will remove all pending messages and filters for the handler.
 */
function clearMessageData(handler) {
    var dispatcher = dispatcherMap.get(handler);
    if (dispatcher)
        dispatcher.clear();
    dispatchQueue.removeAll(handler);
}
exports.clearMessageData = clearMessageData;
/**
 * The internal mapping of message handler to message dispatcher
 */
var dispatcherMap = new WeakMap();
/**
 * The internal queue of pending message handlers.
 */
var dispatchQueue = new phosphor_queue_1.Queue();
/**
 * The internal animation frame id for the message loop wake up call.
 */
var frameId = void 0;
/**
 * A local reference to an event loop hook.
 */
var raf;
if (typeof requestAnimationFrame === 'function') {
    raf = requestAnimationFrame;
}
else {
    raf = setImmediate;
}
/**
 * Get or create the message dispatcher for a message handler.
 */
function getDispatcher(handler) {
    var dispatcher = dispatcherMap.get(handler);
    if (dispatcher)
        return dispatcher;
    dispatcher = new MessageDispatcher();
    dispatcherMap.set(handler, dispatcher);
    return dispatcher;
}
/**
 * Wake up the message loop to process any pending dispatchers.
 *
 * This is a no-op if a wake up is not needed or is already pending.
 */
function wakeUpMessageLoop() {
    if (frameId === void 0 && !dispatchQueue.empty) {
        frameId = raf(runMessageLoop);
    }
}
/**
 * Run an iteration of the message loop.
 *
 * This will process all pending dispatchers in the queue. Dispatchers
 * which are added to the queue while the message loop is running will
 * be processed on the next message loop cycle.
 */
function runMessageLoop() {
    // Clear the frame id so the next wake up call can be scheduled.
    frameId = void 0;
    // If the queue is empty, there is nothing else to do.
    if (dispatchQueue.empty) {
        return;
    }
    // Add a null sentinel value to the end of the queue. The queue
    // will only be processed up to the first null value. This means
    // that messages posted during this cycle will execute on the next
    // cycle of the loop. If the last value in the array is null, it
    // means that an exception was thrown by a message handler and the
    // loop had to be restarted.
    if (dispatchQueue.back !== null) {
        dispatchQueue.push(null);
    }
    // The message dispatch loop. If the dispatcher is the null sentinel,
    // the processing of the current block of messages is complete and
    // another loop is scheduled. Otherwise, the pending message is
    // dispatched to the message handler.
    while (!dispatchQueue.empty) {
        var handler = dispatchQueue.pop();
        if (handler === null) {
            wakeUpMessageLoop();
            return;
        }
        dispatchMessage(dispatcherMap.get(handler), handler);
    }
}
/**
 * Safely process the pending handler message.
 *
 * If the message handler throws an exception, the message loop will
 * be restarted and the exception will be rethrown.
 */
function dispatchMessage(dispatcher, handler) {
    try {
        dispatcher.sendPendingMessage(handler);
    }
    catch (ex) {
        wakeUpMessageLoop();
        throw ex;
    }
}
/**
 * An internal class which manages message dispatching for a handler.
 */
var MessageDispatcher = (function () {
    function MessageDispatcher() {
        this._filters = null;
        this._messages = null;
    }
    /**
     * Send a message to the handler immediately.
     *
     * The message will first be sent through installed filters.
     */
    MessageDispatcher.prototype.sendMessage = function (handler, msg) {
        if (!this._filterMessage(handler, msg)) {
            handler.processMessage(msg);
        }
    };
    /**
     * Post a message for delivery in the future.
     *
     * The message will first be compressed if possible.
     */
    MessageDispatcher.prototype.postMessage = function (handler, msg) {
        if (!this._compressMessage(handler, msg)) {
            this._enqueueMessage(handler, msg);
        }
    };
    /**
     * Test whether the dispatcher has messages pending delivery.
     */
    MessageDispatcher.prototype.hasPendingMessages = function () {
        return !!(this._messages && !this._messages.empty);
    };
    /**
     * Send the first pending message to the message handler.
     */
    MessageDispatcher.prototype.sendPendingMessage = function (handler) {
        if (this._messages && !this._messages.empty) {
            this.sendMessage(handler, this._messages.pop());
        }
    };
    /**
     * Install a message filter for the dispatcher.
     */
    MessageDispatcher.prototype.installMessageFilter = function (filter) {
        this._filters = { next: this._filters, filter: filter };
    };
    /**
     * Remove all occurrences of a message filter from the dispatcher.
     */
    MessageDispatcher.prototype.removeMessageFilter = function (filter) {
        var link = this._filters;
        var prev = null;
        while (link !== null) {
            if (link.filter === filter) {
                link.filter = null;
            }
            else if (prev === null) {
                this._filters = link;
                prev = link;
            }
            else {
                prev.next = link;
                prev = link;
            }
            link = link.next;
        }
        if (!prev) {
            this._filters = null;
        }
        else {
            prev.next = null;
        }
    };
    /**
     * Clear all messages and filters from the dispatcher.
     */
    MessageDispatcher.prototype.clear = function () {
        if (this._messages) {
            this._messages.clear();
        }
        for (var link = this._filters; link !== null; link = link.next) {
            link.filter = null;
        }
        this._filters = null;
    };
    /**
     * Run the installed message filters for the handler.
     *
     * Returns `true` if the message was filtered, `false` otherwise.
     */
    MessageDispatcher.prototype._filterMessage = function (handler, msg) {
        for (var link = this._filters; link !== null; link = link.next) {
            if (link.filter && link.filter.filterMessage(handler, msg)) {
                return true;
            }
        }
        return false;
    };
    /**
     * Compress the mssage for the given handler.
     *
     * Returns `true` if the message was compressed, `false` otherwise.
     */
    MessageDispatcher.prototype._compressMessage = function (handler, msg) {
        if (!handler.compressMessage) {
            return false;
        }
        if (!this._messages || this._messages.empty) {
            return false;
        }
        return handler.compressMessage(msg, this._messages);
    };
    /**
     * Enqueue the message for future delivery to the handler.
     */
    MessageDispatcher.prototype._enqueueMessage = function (handler, msg) {
        (this._messages || (this._messages = new phosphor_queue_1.Queue())).push(msg);
        dispatchQueue.push(handler);
        wakeUpMessageLoop();
    };
    return MessageDispatcher;
})();

},{"phosphor-queue":19}],17:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
/**
 * A base class for creating objects which wrap a DOM node.
 */
var NodeWrapper = (function () {
    function NodeWrapper() {
        this._node = this.constructor.createNode();
    }
    /**
     * Create the DOM node for a new node wrapper instance.
     *
     * @returns The DOM node to use with the node wrapper instance.
     *
     * #### Notes
     * The default implementation creates an empty `<div>`.
     *
     * This may be reimplemented by a subclass to create a custom node.
     */
    NodeWrapper.createNode = function () {
        return document.createElement('div');
    };
    Object.defineProperty(NodeWrapper.prototype, "node", {
        /**
         * Get the DOM node managed by the wrapper.
         *
         * #### Notes
         * This property is read-only.
         */
        get: function () {
            return this._node;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeWrapper.prototype, "id", {
        /**
         * Get the id of the wrapper's DOM node.
         */
        get: function () {
            return this._node.id;
        },
        /**
         * Set the id of the wrapper's DOM node.
         */
        set: function (value) {
            this._node.id = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Test whether the wrapper's DOM node has the given class name.
     *
     * @param name - The class name of interest.
     *
     * @returns `true` if the node has the class, `false` otherwise.
     */
    NodeWrapper.prototype.hasClass = function (name) {
        return this._node.classList.contains(name);
    };
    /**
     * Add a class name to the wrapper's DOM node.
     *
     * @param name - The class name to add to the node.
     *
     * #### Notes
     * If the class name is already added to the node, this is a no-op.
     */
    NodeWrapper.prototype.addClass = function (name) {
        this._node.classList.add(name);
    };
    /**
     * Remove a class name from the wrapper's DOM node.
     *
     * @param name - The class name to remove from the node.
     *
     * #### Notes
     * If the class name is not yet added to the node, this is a no-op.
     */
    NodeWrapper.prototype.removeClass = function (name) {
        this._node.classList.remove(name);
    };
    /**
     * Toggle a class name on the wrapper's DOM node.
     *
     * @param name - The class name to toggle on the node.
     *
     * @param force - Whether to force add the class (`true`) or force
     *   remove the class (`false`). If not provided, the presence of
     *   the class will be toggled from its current state.
     *
     * @returns `true` if the class is now present, `false` otherwise.
     */
    NodeWrapper.prototype.toggleClass = function (name, force) {
        var present;
        if (force === true) {
            this.addClass(name);
            present = true;
        }
        else if (force === false) {
            this.removeClass(name);
            present = false;
        }
        else if (this.hasClass(name)) {
            this.removeClass(name);
            present = false;
        }
        else {
            this.addClass(name);
            present = true;
        }
        return present;
    };
    return NodeWrapper;
})();
exports.NodeWrapper = NodeWrapper;

},{}],18:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var phosphor_signaling_1 = require('phosphor-signaling');
/**
 * A property descriptor for a property on an object.
 *
 * Properties descriptors can be used to expose a rich interface for an
 * object which encapsulates value creation, coercion, and notification.
 * They can also be used to extend the state of an object with semantic
 * data from another class.
 *
 * #### Example
 * ```typescript
 * import { Property } from 'phosphor-properties';
 *
 * class MyClass {
 *
 *   static myValueProperty = new Property<MyClass, number>({
 *      value: 0,
 *      coerce: (owner, value) => Math.max(0, value),
 *      changed: (owner, oldValue, newValue) => { console.log(newValue); },
 *   });
 *
 *   get myValue(): number {
 *     return MyClass.myValueProperty.get(this);
 *   }
 *
 *   set myValue(value: number) {
 *     MyClass.myValueProperty.set(this, value);
 *   }
 * }
 * ```
 */
var Property = (function () {
    /**
     * Construct a new property descriptor.
     *
     * @param options - The options for initializing the property.
     */
    function Property(options) {
        if (options === void 0) { options = {}; }
        this._pid = nextPID();
        this._changedSignal = new phosphor_signaling_1.Signal();
        this._value = options.value;
        this._create = options.create;
        this._coerce = options.coerce;
        this._compare = options.compare;
        this._changed = options.changed;
        this._silent = !!options.silent;
        this._metadata = options.metadata || {};
    }
    /**
     * Get the bound changed signal for a given property owner.
     *
     * @param owner - The object to bind to the changed signal.
     *
     * @returns The bound changed signal for the owner.
     *
     * #### Notes
     * This signal will be emitted whenever **any** property value for
     * the specified owner is changed.
     *
     * This signal is emitted **after** the instance changed signal.
     *
     * This signal will not be emmited for properties marked as silent.
     */
    Property.getChanged = function (owner) {
        return Property.changedSignal.bind(owner);
    };
    Object.defineProperty(Property.prototype, "metadata", {
        /**
         * Get the metadata for the property.
         *
         * #### Notes
         * This is a read-only property.
         */
        get: function () {
            return this._metadata;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Property.prototype, "changedSignal", {
        /**
         * A signal emitted when the property value changes.
         *
         * #### Notes
         * This is an attached signal which will be emitted using the owner
         * of the property value as the sender.
         *
         * **See Also:** [[getChanged]]
         */
        get: function () {
            return this._changedSignal;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Get the bound changed signal for a given property owner.
     *
     * @param owner - The object to bind to the changed signal.
     *
     * @returns The bound changed signal for the owner.
     *
     * #### Notes
     * This signal will be emitted whenever **this** property value
     * for the specified owner is changed.
     *
     * This signal is emitted **before** the static changed signal.
     *
     * This signal will not be emmited for properties marked as silent.
     */
    Property.prototype.getChanged = function (owner) {
        return this._changedSignal.bind(owner);
    };
    /**
     * Get the current value of the property for a given owner.
     *
     * @param owner - The property owner of interest.
     *
     * @returns The current value of the property.
     *
     * #### Notes
     * If the value has not yet been set, the default value will be
     * computed and assigned as the current value of the property.
     */
    Property.prototype.get = function (owner) {
        var value;
        var hash = lookupHash(owner);
        if (this._pid in hash) {
            value = hash[this._pid];
        }
        else {
            value = hash[this._pid] = this._createValue(owner);
        }
        return value;
    };
    /**
     * Set the current value of the property for a given owner.
     *
     * @param owner - The property owner of interest.
     *
     * @param value - The value for the property.
     *
     * #### Notes
     * If this operation causes the property value to change, the
     * changed signals will be emitted with the owner as sender.
     *
     * If the value has not yet been set, the default value will be
     * computed and used as the previous value for the comparison.
     */
    Property.prototype.set = function (owner, value) {
        var oldValue;
        var hash = lookupHash(owner);
        if (this._pid in hash) {
            oldValue = hash[this._pid];
        }
        else {
            oldValue = hash[this._pid] = this._createValue(owner);
        }
        var newValue = this._coerceValue(owner, value);
        this._maybeNotify(owner, oldValue, hash[this._pid] = newValue);
    };
    /**
     * Explicitly coerce the current property value for a given owner.
     *
     * @param owner - The property owner of interest.
     *
     * #### Notes
     * If this operation causes the property value to change, the
     * changed signals will be emitted with the owner as sender.
     *
     * If the value has not yet been set, the default value will be
     * computed and used as the previous value for the comparison.
     */
    Property.prototype.coerce = function (owner) {
        var oldValue;
        var hash = lookupHash(owner);
        if (this._pid in hash) {
            oldValue = hash[this._pid];
        }
        else {
            oldValue = hash[this._pid] = this._createValue(owner);
        }
        var newValue = this._coerceValue(owner, oldValue);
        this._maybeNotify(owner, oldValue, hash[this._pid] = newValue);
    };
    /**
     * Get or create the default value for the given owner.
     */
    Property.prototype._createValue = function (owner) {
        var create = this._create;
        return create ? create(owner) : this._value;
    };
    /**
     * Coerce the value for the given owner.
     */
    Property.prototype._coerceValue = function (owner, value) {
        var coerce = this._coerce;
        return coerce ? coerce(owner, value) : value;
    };
    /**
     * Compare the old value and new value for equality.
     */
    Property.prototype._compareValue = function (oldValue, newValue) {
        var compare = this._compare;
        return compare ? compare(oldValue, newValue) : oldValue === newValue;
    };
    /**
     * Run the change notification if the given values are different.
     */
    Property.prototype._maybeNotify = function (owner, oldValue, newValue) {
        if (this._compareValue(oldValue, newValue)) {
            return;
        }
        var changed = this._changed;
        if (changed) {
            changed(owner, oldValue, newValue);
        }
        if (this._silent) {
            return;
        }
        var args = { property: this, oldValue: oldValue, newValue: newValue };
        this.getChanged(owner).emit(args);
        Property.getChanged(owner).emit(args);
    };
    /**
     * A signal emitted when a property value changes.
     *
     * #### Notes
     * This is an attached signal which will be emitted using the owner
     * of the property value as the sender.
     *
     * **See Also:** [[getChanged]]
     */
    Property.changedSignal = new phosphor_signaling_1.Signal();
    return Property;
})();
exports.Property = Property;
/**
 * Clear the stored property data for the given property owner.
 *
 * @param owner - The property owner of interest.
 *
 * #### Notes
 * This will clear all property values for the owner, but it will
 * **not** emit any change notifications.
 */
function clearPropertyData(owner) {
    ownerData.delete(owner);
}
exports.clearPropertyData = clearPropertyData;
/**
 * A weak mapping of property owner to property hash.
 */
var ownerData = new WeakMap();
/**
 * A function which computes successive unique property ids.
 */
var nextPID = (function () { var id = 0; return function () { return 'pid-' + id++; }; })();
/**
 * Lookup the data hash for the property owner.
 *
 * This will create the hash if one does not already exist.
 */
function lookupHash(owner) {
    var hash = ownerData.get(owner);
    if (hash !== void 0)
        return hash;
    hash = Object.create(null);
    ownerData.set(owner, hash);
    return hash;
}

},{"phosphor-signaling":20}],19:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
/**
 * A generic FIFO queue data structure.
 *
 * #### Notes
 * This queue is implemented internally using a singly linked list and
 * can grow to arbitrary size.
 *
 * #### Example
 * ```typescript
 * var q = new Queue<number>([0, 1, 2]);
 * q.size;      // 3
 * q.empty;     // false
 * q.pop();     // 0
 * q.pop();     // 1
 * q.push(42);  // undefined
 * q.size;      // 2
 * q.pop();     // 2
 * q.pop();     // 42
 * q.pop();     // undefined
 * q.size;      // 0
 * q.empty;     // true
 * ```
 */
var Queue = (function () {
    /**
     * Construct a new queue.
     *
     * @param items - The initial items for the queue.
     */
    function Queue(items) {
        var _this = this;
        this._size = 0;
        this._front = null;
        this._back = null;
        if (items)
            items.forEach(function (item) { return _this.push(item); });
    }
    Object.defineProperty(Queue.prototype, "size", {
        /**
         * Get the number of elements in the queue.
         *
         * #### Notes
         * This has `O(1)` complexity.
         */
        get: function () {
            return this._size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Queue.prototype, "empty", {
        /**
         * Test whether the queue is empty.
         *
         * #### Notes
         * This has `O(1)` complexity.
         */
        get: function () {
            return this._size === 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Queue.prototype, "front", {
        /**
         * Get the value at the front of the queue.
         *
         * #### Notes
         * This has `O(1)` complexity.
         *
         * If the queue is empty, this value will be `undefined`.
         */
        get: function () {
            return this._front !== null ? this._front.value : void 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Queue.prototype, "back", {
        /**
         * Get the value at the back of the queue.
         *
         * #### Notes
         * This has `O(1)` complexity.
         *
         * If the queue is empty, this value will be `undefined`.
         */
        get: function () {
            return this._back !== null ? this._back.value : void 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Push a value onto the back of the queue.
     *
     * @param value - The value to add to the queue.
     *
     * #### Notes
     * This has `O(1)` complexity.
     */
    Queue.prototype.push = function (value) {
        var link = { next: null, value: value };
        if (this._back === null) {
            this._front = link;
            this._back = link;
        }
        else {
            this._back.next = link;
            this._back = link;
        }
        this._size++;
    };
    /**
     * Pop and return the value at the front of the queue.
     *
     * @returns The value at the front of the queue.
     *
     * #### Notes
     * This has `O(1)` complexity.
     *
     * If the queue is empty, the return value will be `undefined`.
     */
    Queue.prototype.pop = function () {
        var link = this._front;
        if (link === null) {
            return void 0;
        }
        if (link.next === null) {
            this._front = null;
            this._back = null;
        }
        else {
            this._front = link.next;
        }
        this._size--;
        return link.value;
    };
    /**
     * Remove the first occurrence of a value from the queue.
     *
     * @param value - The value to remove from the queue.
     *
     * @returns `true` on success, `false` otherwise.
     *
     * #### Notes
     * This has `O(N)` complexity.
     */
    Queue.prototype.remove = function (value) {
        var link = this._front;
        var prev = null;
        while (link !== null) {
            if (link.value === value) {
                if (prev === null) {
                    this._front = link.next;
                }
                else {
                    prev.next = link.next;
                }
                if (link.next === null) {
                    this._back = prev;
                }
                this._size--;
                return true;
            }
            prev = link;
            link = link.next;
        }
        return false;
    };
    /**
     * Remove all occurrences of a value from the queue.
     *
     * @param value - The value to remove from the queue.
     *
     * @returns The number of occurrences removed.
     *
     * #### Notes
     * This has `O(N)` complexity.
     */
    Queue.prototype.removeAll = function (value) {
        var count = 0;
        var link = this._front;
        var prev = null;
        while (link !== null) {
            if (link.value === value) {
                count++;
                this._size--;
            }
            else if (prev === null) {
                this._front = link;
                prev = link;
            }
            else {
                prev.next = link;
                prev = link;
            }
            link = link.next;
        }
        if (!prev) {
            this._front = null;
            this._back = null;
        }
        else {
            prev.next = null;
            this._back = prev;
        }
        return count;
    };
    /**
     * Remove all values from the queue.
     *
     * #### Notes
     * This has `O(1)` complexity.
     */
    Queue.prototype.clear = function () {
        this._size = 0;
        this._front = null;
        this._back = null;
    };
    /**
     * Create an array from the values in the queue.
     *
     * @returns An array of all values in the queue.
     *
     * #### Notes
     * This has `O(N)` complexity.
     */
    Queue.prototype.toArray = function () {
        var result = new Array(this._size);
        for (var i = 0, link = this._front; link !== null; link = link.next, ++i) {
            result[i] = link.value;
        }
        return result;
    };
    /**
     * Test whether any value in the queue passes a predicate function.
     *
     * @param pred - The predicate to apply to the values.
     *
     * @returns `true` if any value in the queue passes the predicate,
     *   or `false` otherwise.
     *
     * #### Notes
     * This has `O(N)` complexity.
     *
     * It is **not** safe for the predicate to modify the queue while
     * iterating.
     */
    Queue.prototype.some = function (pred) {
        for (var i = 0, link = this._front; link !== null; link = link.next, ++i) {
            if (pred(link.value, i))
                return true;
        }
        return false;
    };
    /**
     * Test whether all values in the queue pass a predicate function.
     *
     * @param pred - The predicate to apply to the values.
     *
     * @returns `true` if all values in the queue pass the predicate,
     *   or `false` otherwise.
     *
     * #### Notes
     * This has `O(N)` complexity.
     *
     * It is **not** safe for the predicate to modify the queue while
     * iterating.
     */
    Queue.prototype.every = function (pred) {
        for (var i = 0, link = this._front; link !== null; link = link.next, ++i) {
            if (!pred(link.value, i))
                return false;
        }
        return true;
    };
    /**
     * Create an array of the values which pass a predicate function.
     *
     * @param pred - The predicate to apply to the values.
     *
     * @returns The array of values which pass the predicate.
     *
     * #### Notes
     * This has `O(N)` complexity.
     *
     * It is **not** safe for the predicate to modify the queue while
     * iterating.
     */
    Queue.prototype.filter = function (pred) {
        var result = [];
        for (var i = 0, link = this._front; link !== null; link = link.next, ++i) {
            if (pred(link.value, i))
                result.push(link.value);
        }
        return result;
    };
    /**
     * Create an array of mapped values for the values in the queue.
     *
     * @param callback - The map function to apply to the values.
     *
     * @returns The array of values returned by the map function.
     *
     * #### Notes
     * This has `O(N)` complexity.
     *
     * It is **not** safe for the callback to modify the queue while
     * iterating.
     */
    Queue.prototype.map = function (callback) {
        var result = new Array(this._size);
        for (var i = 0, link = this._front; link !== null; link = link.next, ++i) {
            result[i] = callback(link.value, i);
        }
        return result;
    };
    /**
     * Execute a callback for each value in the queue.
     *
     * @param callback - The function to apply to the values.
     *
     * @returns The first value returned by the callback which is not
     *   `undefined`.
     *
     * #### Notes
     * This has `O(N)` complexity.
     *
     * Iteration will terminate immediately if the callback returns any
     * value other than `undefined`.
     *
     * It is **not** safe for the callback to modify the queue while
     * iterating.
     */
    Queue.prototype.forEach = function (callback) {
        for (var i = 0, link = this._front; link !== null; link = link.next, ++i) {
            var result = callback(link.value, i);
            if (result !== void 0)
                return result;
        }
        return void 0;
    };
    return Queue;
})();
exports.Queue = Queue;

},{}],20:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
/**
 * An object used for type-safe inter-object communication.
 *
 * Signals provide a type-safe implementation of the publish-subscribe
 * pattern. An object (publisher) declares which signals it will emit,
 * and consumers connect callbacks (subscribers) to those signals. The
 * subscribers are invoked whenever the publisher emits the signal.
 *
 * A `Signal` object must be bound to a sender in order to be useful.
 * A common pattern is to declare a `Signal` object as a static class
 * member, along with a convenience getter which binds the signal to
 * the `this` instance on-demand.
 *
 * #### Example
 * ```typescript
 * import { ISignal, Signal } from 'phosphor-signaling';
 *
 * class MyClass {
 *
 *   static valueChangedSignal = new Signal<MyClass, number>();
 *
 *   constructor(name: string) {
 *     this._name = name;
 *   }
 *
 *   get valueChanged(): ISignal<MyClass, number> {
 *     return MyClass.valueChangedSignal.bind(this);
 *   }
 *
 *   get name(): string {
 *     return this._name;
 *   }
 *
 *   get value(): number {
 *     return this._value;
 *   }
 *
 *   set value(value: number) {
 *     if (value !== this._value) {
 *       this._value = value;
 *       this.valueChanged.emit(value);
 *     }
 *   }
 *
 *   private _name: string;
 *   private _value = 0;
 * }
 *
 * function logger(sender: MyClass, value: number): void {
 *   console.log(sender.name, value);
 * }
 *
 * var m1 = new MyClass('foo');
 * var m2 = new MyClass('bar');
 *
 * m1.valueChanged.connect(logger);
 * m2.valueChanged.connect(logger);
 *
 * m1.value = 42;  // logs: foo 42
 * m2.value = 17;  // logs: bar 17
 * ```
 */
var Signal = (function () {
    function Signal() {
    }
    /**
     * Bind the signal to a specific sender.
     *
     * @param sender - The sender object to bind to the signal.
     *
     * @returns The bound signal object which can be used for connecting,
     *   disconnecting, and emitting the signal.
     */
    Signal.prototype.bind = function (sender) {
        return new BoundSignal(this, sender);
    };
    return Signal;
})();
exports.Signal = Signal;
/**
 * Remove all connections where the given object is the sender.
 *
 * @param sender - The sender object of interest.
 *
 * #### Example
 * ```typescript
 * disconnectSender(someObject);
 * ```
 */
function disconnectSender(sender) {
    var list = senderMap.get(sender);
    if (!list) {
        return;
    }
    var conn = list.first;
    while (conn !== null) {
        removeFromSendersList(conn);
        conn.callback = null;
        conn.thisArg = null;
        conn = conn.nextReceiver;
    }
    senderMap.delete(sender);
}
exports.disconnectSender = disconnectSender;
/**
 * Remove all connections where the given object is the receiver.
 *
 * @param receiver - The receiver object of interest.
 *
 * #### Notes
 * If a `thisArg` is provided when connecting a signal, that object
 * is considered the receiver. Otherwise, the `callback` is used as
 * the receiver.
 *
 * #### Example
 * ```typescript
 * // disconnect a regular object receiver
 * disconnectReceiver(myObject);
 *
 * // disconnect a plain callback receiver
 * disconnectReceiver(myCallback);
 * ```
 */
function disconnectReceiver(receiver) {
    var conn = receiverMap.get(receiver);
    if (!conn) {
        return;
    }
    while (conn !== null) {
        var next = conn.nextSender;
        conn.callback = null;
        conn.thisArg = null;
        conn.prevSender = null;
        conn.nextSender = null;
        conn = next;
    }
    receiverMap.delete(receiver);
}
exports.disconnectReceiver = disconnectReceiver;
/**
 * Clear all signal data associated with the given object.
 *
 * @param obj - The object for which the signal data should be cleared.
 *
 * #### Notes
 * This removes all signal connections where the object is used as
 * either the sender or the receiver.
 *
 * #### Example
 * ```typescript
 * clearSignalData(someObject);
 * ```
 */
function clearSignalData(obj) {
    disconnectSender(obj);
    disconnectReceiver(obj);
}
exports.clearSignalData = clearSignalData;
/**
 * A concrete implementation of ISignal.
 */
var BoundSignal = (function () {
    /**
     * Construct a new bound signal.
     */
    function BoundSignal(signal, sender) {
        this._signal = signal;
        this._sender = sender;
    }
    /**
     * Connect a callback to the signal.
     */
    BoundSignal.prototype.connect = function (callback, thisArg) {
        return connect(this._sender, this._signal, callback, thisArg);
    };
    /**
     * Disconnect a callback from the signal.
     */
    BoundSignal.prototype.disconnect = function (callback, thisArg) {
        return disconnect(this._sender, this._signal, callback, thisArg);
    };
    /**
     * Emit the signal and invoke the connected callbacks.
     */
    BoundSignal.prototype.emit = function (args) {
        emit(this._sender, this._signal, args);
    };
    return BoundSignal;
})();
/**
 * A struct which holds connection data.
 */
var Connection = (function () {
    function Connection() {
        /**
         * The signal for the connection.
         */
        this.signal = null;
        /**
         * The callback connected to the signal.
         */
        this.callback = null;
        /**
         * The `this` context for the callback.
         */
        this.thisArg = null;
        /**
         * The next connection in the singly linked receivers list.
         */
        this.nextReceiver = null;
        /**
         * The next connection in the doubly linked senders list.
         */
        this.nextSender = null;
        /**
         * The previous connection in the doubly linked senders list.
         */
        this.prevSender = null;
    }
    return Connection;
})();
/**
 * The list of receiver connections for a specific sender.
 */
var ConnectionList = (function () {
    function ConnectionList() {
        /**
         * The ref count for the list.
         */
        this.refs = 0;
        /**
         * The first connection in the list.
         */
        this.first = null;
        /**
         * The last connection in the list.
         */
        this.last = null;
    }
    return ConnectionList;
})();
/**
 * A mapping of sender object to its receiver connection list.
 */
var senderMap = new WeakMap();
/**
 * A mapping of receiver object to its sender connection list.
 */
var receiverMap = new WeakMap();
/**
 * Create a connection between a sender, signal, and callback.
 */
function connect(sender, signal, callback, thisArg) {
    // Coerce a `null` thisArg to `undefined`.
    thisArg = thisArg || void 0;
    // Search for an equivalent connection and bail if one exists.
    var list = senderMap.get(sender);
    if (list && findConnection(list, signal, callback, thisArg)) {
        return false;
    }
    // Create a new connection.
    var conn = new Connection();
    conn.signal = signal;
    conn.callback = callback;
    conn.thisArg = thisArg;
    // Add the connection to the receivers list.
    if (!list) {
        list = new ConnectionList();
        list.first = conn;
        list.last = conn;
        senderMap.set(sender, list);
    }
    else if (list.last === null) {
        list.first = conn;
        list.last = conn;
    }
    else {
        list.last.nextReceiver = conn;
        list.last = conn;
    }
    // Add the connection to the senders list.
    var receiver = thisArg || callback;
    var head = receiverMap.get(receiver);
    if (head) {
        head.prevSender = conn;
        conn.nextSender = head;
    }
    receiverMap.set(receiver, conn);
    return true;
}
/**
 * Break the connection between a sender, signal, and callback.
 */
function disconnect(sender, signal, callback, thisArg) {
    // Coerce a `null` thisArg to `undefined`.
    thisArg = thisArg || void 0;
    // Search for an equivalent connection and bail if none exists.
    var list = senderMap.get(sender);
    if (!list) {
        return false;
    }
    var conn = findConnection(list, signal, callback, thisArg);
    if (!conn) {
        return false;
    }
    // Remove the connection from the senders list. It will be removed
    // from the receivers list the next time the signal is emitted.
    removeFromSendersList(conn);
    // Clear the connection data so it becomes a dead connection.
    conn.callback = null;
    conn.thisArg = null;
    return true;
}
/**
 * Emit a signal and invoke the connected callbacks.
 */
function emit(sender, signal, args) {
    var list = senderMap.get(sender);
    if (!list) {
        return;
    }
    list.refs++;
    try {
        var dirty = invokeList(list, sender, signal, args);
    }
    finally {
        list.refs--;
    }
    if (dirty && list.refs === 0) {
        cleanList(list);
    }
}
/**
 * Find a matching connection in the given connection list.
 *
 * Returns `null` if no matching connection is found.
 */
function findConnection(list, signal, callback, thisArg) {
    var conn = list.first;
    while (conn !== null) {
        if (conn.signal === signal &&
            conn.callback === callback &&
            conn.thisArg === thisArg) {
            return conn;
        }
        conn = conn.nextReceiver;
    }
    return null;
}
/**
 * Invoke the callbacks for the matching signals in the list.
 *
 * Connections added during dispatch will not be invoked. This returns
 * `true` if there are dead connections in the list, `false` otherwise.
 */
function invokeList(list, sender, signal, args) {
    var dirty = false;
    var last = list.last;
    var conn = list.first;
    while (conn !== null) {
        if (!conn.callback) {
            dirty = true;
        }
        else if (conn.signal === signal) {
            conn.callback.call(conn.thisArg, sender, args);
        }
        if (conn === last) {
            break;
        }
        conn = conn.nextReceiver;
    }
    return dirty;
}
/**
 * Remove the dead connections from the given connection list.
 */
function cleanList(list) {
    var prev;
    var conn = list.first;
    while (conn !== null) {
        var next = conn.nextReceiver;
        if (!conn.callback) {
            conn.nextReceiver = null;
        }
        else if (!prev) {
            list.first = conn;
            prev = conn;
        }
        else {
            prev.nextReceiver = conn;
            prev = conn;
        }
        conn = next;
    }
    if (!prev) {
        list.first = null;
        list.last = null;
    }
    else {
        prev.nextReceiver = null;
        list.last = prev;
    }
}
/**
 * Remove a connection from the doubly linked list of senders.
 */
function removeFromSendersList(conn) {
    var receiver = conn.thisArg || conn.callback;
    var prev = conn.prevSender;
    var next = conn.nextSender;
    if (prev === null && next === null) {
        receiverMap.delete(receiver);
    }
    else if (prev === null) {
        receiverMap.set(receiver, next);
        next.prevSender = null;
    }
    else if (next === null) {
        prev.nextSender = null;
    }
    else {
        prev.nextSender = next;
        next.prevSender = prev;
    }
    conn.prevSender = null;
    conn.nextSender = null;
}

},{}],21:[function(require,module,exports){
var css = "/*-----------------------------------------------------------------------------\r\n| Copyright (c) 2014-2015, PhosphorJS Contributors\r\n|\r\n| Distributed under the terms of the BSD 3-Clause License.\r\n|\r\n| The full license is in the file LICENSE, distributed with this software.\r\n|----------------------------------------------------------------------------*/\n.p-SplitPanel {\n  position: relative;\n  z-index: 0;\n}\n.p-SplitPanel > .p-Widget {\n  position: absolute;\n  z-index: 0;\n}\n.p-SplitHandle {\n  box-sizing: border-box;\n  position: absolute;\n  z-index: 1;\n}\n.p-SplitHandle.p-mod-hidden {\n  display: none;\n}\n.p-SplitHandle.p-mod-horizontal {\n  cursor: ew-resize;\n}\n.p-SplitHandle.p-mod-vertical {\n  cursor: ns-resize;\n}\n.p-SplitHandle-overlay {\n  box-sizing: border-box;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n.p-SplitHandle.p-mod-horizontal > .p-SplitHandle-overlay {\n  min-width: 7px;\n  left: 50%;\n  transform: translateX(-50%);\n}\n.p-SplitHandle.p-mod-vertical > .p-SplitHandle-overlay {\n  min-height: 7px;\n  top: 50%;\n  transform: translateY(-50%);\n}\n"; (require("browserify-css").createStyle(css, { "href": "node_modules/phosphor-splitpanel/lib/index.css"})); module.exports = css;
},{"browserify-css":5}],22:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var arrays = require('phosphor-arrays');
var phosphor_boxengine_1 = require('phosphor-boxengine');
var phosphor_domutil_1 = require('phosphor-domutil');
var phosphor_messaging_1 = require('phosphor-messaging');
var phosphor_nodewrapper_1 = require('phosphor-nodewrapper');
var phosphor_properties_1 = require('phosphor-properties');
var phosphor_widget_1 = require('phosphor-widget');
require('./index.css');
/**
 * The class name added to SplitPanel instances.
 */
var SPLIT_PANEL_CLASS = 'p-SplitPanel';
/**
 * The class name added to SplitHandle instances.
 */
var SPLIT_HANDLE_CLASS = 'p-SplitHandle';
/**
 * The class name added to a split handle overlay.
 */
var OVERLAY_CLASS = 'p-SplitHandle-overlay';
/**
 * The class name added to horizontal split panels and handles.
 */
var HORIZONTAL_CLASS = 'p-mod-horizontal';
/**
 * The class name added to vertical split panels and handles.
 */
var VERTICAL_CLASS = 'p-mod-vertical';
/**
 * The class name added to hidden split handles.
 */
var HIDDEN_CLASS = 'p-mod-hidden';
/**
 * The layout orientation of a split panel.
 */
(function (Orientation) {
    /**
     * Left-to-right horizontal orientation.
     */
    Orientation[Orientation["Horizontal"] = 0] = "Horizontal";
    /**
     * Top-to-bottom vertical orientation.
     */
    Orientation[Orientation["Vertical"] = 1] = "Vertical";
})(exports.Orientation || (exports.Orientation = {}));
var Orientation = exports.Orientation;
/**
 * A widget which arranges its children into resizable sections.
 */
var SplitPanel = (function (_super) {
    __extends(SplitPanel, _super);
    /**
     * Construct a new split panel.
     */
    function SplitPanel() {
        _super.call(this);
        this._fixedSpace = 0;
        this._pendingSizes = false;
        this._box = null;
        this._sizers = [];
        this._pressData = null;
        this.addClass(SPLIT_PANEL_CLASS);
        this.addClass(HORIZONTAL_CLASS);
    }
    /**
     * Get the split panel stretch factor for the given widget.
     *
     * @param widget - The widget of interest.
     *
     * @returns The split panel stretch factor for the widget.
     *
     * #### Notes
     * This is a pure delegate to the [[stretchProperty]].
     */
    SplitPanel.getStretch = function (widget) {
        return SplitPanel.stretchProperty.get(widget);
    };
    /**
     * Set the split panel stretch factor for the given widget.
     *
     * @param widget - The widget of interest.
     *
     * @param value - The value for the stretch factor.
     *
     * #### Notes
     * This is a pure delegate to the [[stretchProperty]].
     */
    SplitPanel.setStretch = function (widget, value) {
        SplitPanel.stretchProperty.set(widget, value);
    };
    /**
     * Dispose of the resources held by the panel.
     */
    SplitPanel.prototype.dispose = function () {
        this._releaseMouse();
        this._sizers.length = 0;
        _super.prototype.dispose.call(this);
    };
    Object.defineProperty(SplitPanel.prototype, "orientation", {
        /**
         * Get the orientation of the split panel.
         *
         * #### Notes
         * This is a pure delegate to the [[orientationProperty]].
         */
        get: function () {
            return SplitPanel.orientationProperty.get(this);
        },
        /**
         * Set the orientation of the split panel.
         *
         * #### Notes
         * This is a pure delegate to the [[orientationProperty]].
         */
        set: function (value) {
            SplitPanel.orientationProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitPanel.prototype, "spacing", {
        /**
         * Get the inter-element spacing for the split panel.
         *
         * #### Notes
         * This is a pure delegate to the [[spacingProperty]].
         */
        get: function () {
            return SplitPanel.spacingProperty.get(this);
        },
        /**
         * Set the inter-element spacing for the split panel.
         *
         * #### Notes
         * This is a pure delegate to the [[spacingProperty]].
         */
        set: function (size) {
            SplitPanel.spacingProperty.set(this, size);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Get the normalized sizes of the widgets in the panel.
     *
     * @returns The normalized sizes of the widgets in the panel.
     */
    SplitPanel.prototype.sizes = function () {
        return normalize(this._sizers.map(function (sizer) { return sizer.size; }));
    };
    /**
     * Set the relative sizes for the child widgets in the panel.
     *
     * @param sizes - The relative sizes for the children in the panel.
     *   These values will be normalized to the available layout space.
     *
     * #### Notes
     * Extra values are ignored, too few will yield an undefined layout.
     */
    SplitPanel.prototype.setSizes = function (sizes) {
        var normed = normalize(sizes);
        for (var i = 0, n = this._sizers.length; i < n; ++i) {
            var hint = Math.max(0, normed[i] || 0);
            var sizer = this._sizers[i];
            sizer.sizeHint = hint;
            sizer.size = hint;
        }
        this._pendingSizes = true;
        this.update();
    };
    /**
     * Handle the DOM events for the split panel.
     *
     * @param event - The DOM event sent to the panel.
     *
     * #### Notes
     * This method implements the DOM `EventListener` interface and is
     * called in response to events on the panel's DOM node. It should
     * not be called directly by user code.
     */
    SplitPanel.prototype.handleEvent = function (event) {
        switch (event.type) {
            case 'mousedown':
                this._evtMouseDown(event);
                break;
            case 'mouseup':
                this._evtMouseUp(event);
                break;
            case 'mousemove':
                this._evtMouseMove(event);
                break;
        }
    };
    /**
     * A message handler invoked on a `'child-added'` message.
     */
    SplitPanel.prototype.onChildAdded = function (msg) {
        var sizer = createSizer(averageSize(this._sizers));
        arrays.insert(this._sizers, msg.currentIndex, sizer);
        this.node.appendChild(msg.child.node);
        this.node.appendChild(getHandle(msg.child).node);
        if (this.isAttached)
            phosphor_messaging_1.sendMessage(msg.child, phosphor_widget_1.Widget.MsgAfterAttach);
        phosphor_messaging_1.postMessage(this, phosphor_widget_1.Widget.MsgLayoutRequest);
    };
    /**
     * A message handler invoked on a `'child-removed'` message.
     */
    SplitPanel.prototype.onChildRemoved = function (msg) {
        arrays.removeAt(this._sizers, msg.previousIndex);
        if (this.isAttached)
            phosphor_messaging_1.sendMessage(msg.child, phosphor_widget_1.Widget.MsgBeforeDetach);
        this.node.removeChild(msg.child.node);
        this.node.removeChild(getHandle(msg.child).node);
        phosphor_messaging_1.postMessage(this, phosphor_widget_1.Widget.MsgLayoutRequest);
        resetGeometry(msg.child);
    };
    /**
     * A message handler invoked on a `'child-moved'` message.
     */
    SplitPanel.prototype.onChildMoved = function (msg) {
        arrays.move(this._sizers, msg.previousIndex, msg.currentIndex);
        phosphor_messaging_1.postMessage(this, phosphor_widget_1.Widget.MsgLayoutRequest);
    };
    /**
     * A message handler invoked on an `'after-show'` message.
     */
    SplitPanel.prototype.onAfterShow = function (msg) {
        this.update(true);
    };
    /**
     * A message handler invoked on an `'after-attach'` message.
     */
    SplitPanel.prototype.onAfterAttach = function (msg) {
        this.node.addEventListener('mousedown', this);
        phosphor_messaging_1.postMessage(this, phosphor_widget_1.Widget.MsgLayoutRequest);
    };
    /**
     * A message handler invoked on a `'before-detach'` message.
     */
    SplitPanel.prototype.onBeforeDetach = function (msg) {
        this.node.removeEventListener('mousedown', this);
    };
    /**
     * A message handler invoked on a `'child-shown'` message.
     */
    SplitPanel.prototype.onChildShown = function (msg) {
        phosphor_messaging_1.postMessage(this, phosphor_widget_1.Widget.MsgLayoutRequest);
    };
    /**
     * A message handler invoked on a `'child-hidden'` message.
     */
    SplitPanel.prototype.onChildHidden = function (msg) {
        phosphor_messaging_1.postMessage(this, phosphor_widget_1.Widget.MsgLayoutRequest);
    };
    /**
     * A message handler invoked on a `'resize'` message.
     */
    SplitPanel.prototype.onResize = function (msg) {
        if (this.isVisible) {
            var width = msg.width < 0 ? this.node.offsetWidth : msg.width;
            var height = msg.height < 0 ? this.node.offsetHeight : msg.height;
            this._layoutChildren(width, height);
        }
    };
    /**
     * A message handler invoked on an `'update-request'` message.
     */
    SplitPanel.prototype.onUpdateRequest = function (msg) {
        if (this.isVisible) {
            this._layoutChildren(this.node.offsetWidth, this.node.offsetHeight);
        }
    };
    /**
     * A message handler invoked on a `'layout-request'` message.
     */
    SplitPanel.prototype.onLayoutRequest = function (msg) {
        if (this.isAttached) {
            this._setupGeometry();
        }
    };
    /**
     * Update the size constraints of the panel.
     */
    SplitPanel.prototype._setupGeometry = function () {
        // Update the handles and track the visible widget count.
        var visibleCount = 0;
        var orientation = this.orientation;
        var lastVisibleHandle = null;
        for (var i = 0, n = this.childCount; i < n; ++i) {
            var widget = this.childAt(i);
            var handle = getHandle(widget);
            handle.hidden = widget.hidden;
            handle.orientation = orientation;
            if (!handle.hidden) {
                lastVisibleHandle = handle;
                visibleCount++;
            }
        }
        // Hide the last visible handle and update the fixed space.
        if (lastVisibleHandle)
            lastVisibleHandle.hidden = true;
        this._fixedSpace = this.spacing * Math.max(0, visibleCount - 1);
        // Compute new size constraints for the split panel.
        var minW = 0;
        var minH = 0;
        var maxW = Infinity;
        var maxH = Infinity;
        if (orientation === Orientation.Horizontal) {
            minW = this._fixedSpace;
            maxW = visibleCount > 0 ? minW : maxW;
            for (var i = 0, n = this.childCount; i < n; ++i) {
                var widget = this.childAt(i);
                var sizer = this._sizers[i];
                if (sizer.size > 0) {
                    sizer.sizeHint = sizer.size;
                }
                if (widget.hidden) {
                    sizer.minSize = 0;
                    sizer.maxSize = 0;
                    continue;
                }
                var limits = phosphor_domutil_1.sizeLimits(widget.node);
                sizer.stretch = SplitPanel.getStretch(widget);
                sizer.minSize = limits.minWidth;
                sizer.maxSize = limits.maxWidth;
                minW += limits.minWidth;
                maxW += limits.maxWidth;
                minH = Math.max(minH, limits.minHeight);
                maxH = Math.min(maxH, limits.maxHeight);
            }
        }
        else {
            minH = this._fixedSpace;
            maxH = visibleCount > 0 ? minH : maxH;
            for (var i = 0, n = this.childCount; i < n; ++i) {
                var widget = this.childAt(i);
                var sizer = this._sizers[i];
                if (sizer.size > 0) {
                    sizer.sizeHint = sizer.size;
                }
                if (widget.hidden) {
                    sizer.minSize = 0;
                    sizer.maxSize = 0;
                    continue;
                }
                var limits = phosphor_domutil_1.sizeLimits(widget.node);
                sizer.stretch = SplitPanel.getStretch(widget);
                sizer.minSize = limits.minHeight;
                sizer.maxSize = limits.maxHeight;
                minH += limits.minHeight;
                maxH += limits.maxHeight;
                minW = Math.max(minW, limits.minWidth);
                maxW = Math.min(maxW, limits.maxWidth);
            }
        }
        // Update the box sizing and add it to the size constraints.
        this._box = phosphor_domutil_1.boxSizing(this.node);
        minW += this._box.horizontalSum;
        minH += this._box.verticalSum;
        maxW += this._box.horizontalSum;
        maxH += this._box.verticalSum;
        // Update the panel's size constraints.
        var style = this.node.style;
        style.minWidth = minW + 'px';
        style.minHeight = minH + 'px';
        style.maxWidth = maxW === Infinity ? 'none' : maxW + 'px';
        style.maxHeight = maxH === Infinity ? 'none' : maxH + 'px';
        // Notifiy the parent that it should relayout.
        if (this.parent)
            phosphor_messaging_1.sendMessage(this.parent, phosphor_widget_1.Widget.MsgLayoutRequest);
        // Update the layout for the child widgets.
        this.update(true);
    };
    /**
     * Layout the children using the given offset width and height.
     */
    SplitPanel.prototype._layoutChildren = function (offsetWidth, offsetHeight) {
        // Bail early if their are no children to arrange.
        if (this.childCount === 0) {
            return;
        }
        // Ensure the box sizing is created.
        var box = this._box || (this._box = phosphor_domutil_1.boxSizing(this.node));
        // Compute the actual layout bounds adjusted for border and padding.
        var top = box.paddingTop;
        var left = box.paddingLeft;
        var width = offsetWidth - box.horizontalSum;
        var height = offsetHeight - box.verticalSum;
        // Fetch whether the orientation is horizontal.
        var horizontal = this.orientation === Orientation.Horizontal;
        // Update the sizer hints if there is a pending `setSizes`.
        if (this._pendingSizes) {
            var space = horizontal ? width : height;
            var adjusted = Math.max(0, space - this._fixedSpace);
            for (var i = 0, n = this._sizers.length; i < n; ++i) {
                this._sizers[i].sizeHint *= adjusted;
            }
            this._pendingSizes = false;
        }
        // Distribute the layout space and layout the items.
        var spacing = this.spacing;
        if (horizontal) {
            phosphor_boxengine_1.boxCalc(this._sizers, Math.max(0, width - this._fixedSpace));
            for (var i = 0, n = this.childCount; i < n; ++i) {
                var widget = this.childAt(i);
                if (widget.hidden) {
                    continue;
                }
                var size = this._sizers[i].size;
                var hStyle = getHandle(widget).node.style;
                setGeometry(widget, left, top, size, height);
                hStyle.top = top + 'px';
                hStyle.left = left + size + 'px';
                hStyle.width = spacing + 'px';
                hStyle.height = height + 'px';
                left += size + spacing;
            }
        }
        else {
            phosphor_boxengine_1.boxCalc(this._sizers, Math.max(0, height - this._fixedSpace));
            for (var i = 0, n = this.childCount; i < n; ++i) {
                var widget = this.childAt(i);
                if (widget.hidden) {
                    continue;
                }
                var size = this._sizers[i].size;
                var hStyle = getHandle(widget).node.style;
                setGeometry(widget, left, top, width, size);
                hStyle.top = top + size + 'px';
                hStyle.left = left + 'px';
                hStyle.width = width + 'px';
                hStyle.height = spacing + 'px';
                top += size + spacing;
            }
        }
    };
    /**
     * Handle the `'mousedown'` event for the split panel.
     */
    SplitPanel.prototype._evtMouseDown = function (event) {
        if (event.button !== 0) {
            return;
        }
        var index = this._findHandleIndex(event.target);
        if (index === -1) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        document.addEventListener('mouseup', this, true);
        document.addEventListener('mousemove', this, true);
        var delta;
        var node = getHandle(this.childAt(index)).node;
        if (this.orientation === Orientation.Horizontal) {
            delta = event.clientX - node.getBoundingClientRect().left;
        }
        else {
            delta = event.clientY - node.getBoundingClientRect().top;
        }
        var override = phosphor_domutil_1.overrideCursor(window.getComputedStyle(node).cursor);
        this._pressData = { index: index, delta: delta, override: override };
    };
    /**
     * Handle the `'mouseup'` event for the split panel.
     */
    SplitPanel.prototype._evtMouseUp = function (event) {
        if (event.button !== 0) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        this._releaseMouse();
    };
    /**
     * Handle the `'mousemove'` event for the split panel.
     */
    SplitPanel.prototype._evtMouseMove = function (event) {
        event.preventDefault();
        event.stopPropagation();
        var pos;
        var data = this._pressData;
        var rect = this.node.getBoundingClientRect();
        if (this.orientation === Orientation.Horizontal) {
            pos = event.clientX - data.delta - rect.left;
        }
        else {
            pos = event.clientY - data.delta - rect.top;
        }
        this._moveHandle(data.index, pos);
    };
    /**
     * Release the mouse grab for the split panel.
     */
    SplitPanel.prototype._releaseMouse = function () {
        if (!this._pressData) {
            return;
        }
        this._pressData.override.dispose();
        this._pressData = null;
        document.removeEventListener('mouseup', this, true);
        document.removeEventListener('mousemove', this, true);
    };
    /**
     * Move a splitter handle to the specified client position.
     */
    SplitPanel.prototype._moveHandle = function (index, pos) {
        // Bail if the handle is invalid or hidden.
        var widget = this.childAt(index);
        if (!widget) {
            return;
        }
        var handle = getHandle(widget);
        if (handle.hidden) {
            return;
        }
        // Compute the delta movement for the handle.
        var delta;
        if (this.orientation === Orientation.Horizontal) {
            delta = pos - handle.node.offsetLeft;
        }
        else {
            delta = pos - handle.node.offsetTop;
        }
        if (delta === 0) {
            return;
        }
        // Prevent item resizing unless needed.
        for (var i = 0, n = this._sizers.length; i < n; ++i) {
            var sizer = this._sizers[i];
            if (sizer.size > 0)
                sizer.sizeHint = sizer.size;
        }
        // Adjust the sizers to reflect the movement.
        if (delta > 0) {
            growSizer(this._sizers, index, delta);
        }
        else {
            shrinkSizer(this._sizers, index, -delta);
        }
        // Update the layout of the widget items. The message is posted
        // instead of sent because the mouse move event frequency can
        // outpace the browser's ability to layout, leading to choppy
        // handle movement, especially on IE. Posting ensures we don't
        // try to layout faster than the browser can handle.
        this.update();
    };
    /**
     * Find the index of the split handle which contains the given target.
     */
    SplitPanel.prototype._findHandleIndex = function (target) {
        for (var i = 0, n = this.childCount; i < n; ++i) {
            var handle = getHandle(this.childAt(i));
            if (handle.node.contains(target))
                return i;
        }
        return -1;
    };
    /**
     * The change handler for the [[orientationProperty]].
     */
    SplitPanel.prototype._onOrientationChanged = function (old, value) {
        this.toggleClass(HORIZONTAL_CLASS, value === Orientation.Horizontal);
        this.toggleClass(VERTICAL_CLASS, value === Orientation.Vertical);
        phosphor_messaging_1.postMessage(this, phosphor_widget_1.Widget.MsgLayoutRequest);
    };
    /**
     * A convenience alias of the `Horizontal` [[Orientation]].
     */
    SplitPanel.Horizontal = Orientation.Horizontal;
    /**
     * A convenience alias of the `Vertical` [[Orientation]].
     */
    SplitPanel.Vertical = Orientation.Vertical;
    /**
     * The property descriptor for the split panel orientation.
     *
     * The controls whether the child widgets are arranged lef-to-right
     * (`Horizontal` the default) or top-to-bottom (`Vertical`).
     *
     * **See also:** [[orientation]]
     */
    SplitPanel.orientationProperty = new phosphor_properties_1.Property({
        value: Orientation.Horizontal,
        changed: function (owner, old, value) { return owner._onOrientationChanged(old, value); },
    });
    /**
     * The property descriptor for the split panel spacing.
     *
     * The controls the fixed spacing between the child widgets, in
     * pixels. The default value is `3`.
     *
     * **See also:** [[spacing]]
     */
    SplitPanel.spacingProperty = new phosphor_properties_1.Property({
        value: 3,
        coerce: function (owner, value) { return Math.max(0, value | 0); },
        changed: function (owner) { return phosphor_messaging_1.postMessage(owner, phosphor_widget_1.Widget.MsgLayoutRequest); },
    });
    /**
     * The property descriptor for a widget stretch factor.
     *
     * This is an attached property which controls how much a child widget
     * stretches or shrinks relative to its siblings when the split panel
     * is resized. The default value is `0`.
     *
     * **See also:** [[getStretch]], [[setStretch]]
     */
    SplitPanel.stretchProperty = new phosphor_properties_1.Property({
        value: 0,
        coerce: function (owner, value) { return Math.max(0, value | 0); },
        changed: onStretchChanged,
    });
    return SplitPanel;
})(phosphor_widget_1.Widget);
exports.SplitPanel = SplitPanel;
/**
 * A class which manages a handle node for a split panel.
 */
var SplitHandle = (function (_super) {
    __extends(SplitHandle, _super);
    /**
     * Construct a new split handle.
     */
    function SplitHandle() {
        _super.call(this);
        this._hidden = false;
        this._orientation = Orientation.Horizontal;
        this.addClass(SPLIT_HANDLE_CLASS);
        this.addClass(HORIZONTAL_CLASS);
    }
    /**
     * Create the DOM node for a split handle.
     */
    SplitHandle.createNode = function () {
        var node = document.createElement('div');
        var overlay = document.createElement('div');
        overlay.className = OVERLAY_CLASS;
        node.appendChild(overlay);
        return node;
    };
    Object.defineProperty(SplitHandle.prototype, "hidden", {
        /**
         * Get whether the handle is hidden.
         */
        get: function () {
            return this._hidden;
        },
        /**
         * Set whether the handle is hidden.
         */
        set: function (hidden) {
            if (hidden === this._hidden) {
                return;
            }
            this._hidden = hidden;
            this.toggleClass(HIDDEN_CLASS, hidden);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitHandle.prototype, "orientation", {
        /**
         * Get the orientation of the handle.
         */
        get: function () {
            return this._orientation;
        },
        /**
         * Set the orientation of the handle.
         */
        set: function (value) {
            if (value === this._orientation) {
                return;
            }
            this._orientation = value;
            this.toggleClass(HORIZONTAL_CLASS, value === Orientation.Horizontal);
            this.toggleClass(VERTICAL_CLASS, value === Orientation.Vertical);
        },
        enumerable: true,
        configurable: true
    });
    return SplitHandle;
})(phosphor_nodewrapper_1.NodeWrapper);
/**
 * A private attached property for the split handle for a widget.
 */
var splitHandleProperty = new phosphor_properties_1.Property({
    create: function (owner) { return new SplitHandle(); },
});
/**
 * A private attached property which stores a widget offset rect.
 */
var rectProperty = new phosphor_properties_1.Property({
    create: createRect,
});
/**
 * Lookup the split handle for the given widget.
 */
function getHandle(widget) {
    return splitHandleProperty.get(widget);
}
/**
 * Create a new offset rect filled with NaNs.
 */
function createRect() {
    return { top: NaN, left: NaN, width: NaN, height: NaN };
}
/**
 * Get the offset rect for a widget.
 */
function getRect(widget) {
    return rectProperty.get(widget);
}
/**
 * Set the offset geometry for the given widget.
 *
 * A resize message will be dispatched to the widget if appropriate.
 */
function setGeometry(widget, left, top, width, height) {
    var resized = false;
    var rect = getRect(widget);
    var style = widget.node.style;
    if (rect.top !== top) {
        rect.top = top;
        style.top = top + 'px';
    }
    if (rect.left !== left) {
        rect.left = left;
        style.left = left + 'px';
    }
    if (rect.width !== width) {
        resized = true;
        rect.width = width;
        style.width = width + 'px';
    }
    if (rect.height !== height) {
        resized = true;
        rect.height = height;
        style.height = height + 'px';
    }
    if (resized) {
        phosphor_messaging_1.sendMessage(widget, new phosphor_widget_1.ResizeMessage(width, height));
    }
}
/**
 * Reset the inline geometry and rect cache for the given widget
 */
function resetGeometry(widget) {
    var rect = getRect(widget);
    var style = widget.node.style;
    rect.top = NaN;
    rect.left = NaN;
    rect.width = NaN;
    rect.height = NaN;
    style.top = '';
    style.left = '';
    style.width = '';
    style.height = '';
}
/**
 * The change handler for the stretch attached property.
 */
function onStretchChanged(child, old, value) {
    if (child.parent instanceof SplitPanel) {
        phosphor_messaging_1.postMessage(child.parent, phosphor_widget_1.Widget.MsgLayoutRequest);
    }
}
/**
 * Create a new box sizer with the given size hint.
 */
function createSizer(size) {
    var sizer = new phosphor_boxengine_1.BoxSizer();
    sizer.sizeHint = size | 0;
    return sizer;
}
/**
 * Compute the average size of the given box sizers.
 */
function averageSize(sizers) {
    var sum = sizers.reduce(function (v, s) { return v + s.size; }, 0);
    return sum > 0 ? sum / sizers.length : 0;
}
/**
 * Grow a sizer to the right by a positive delta and adjust neighbors.
 */
function growSizer(sizers, index, delta) {
    var growLimit = 0;
    for (var i = 0; i <= index; ++i) {
        var sizer = sizers[i];
        growLimit += sizer.maxSize - sizer.size;
    }
    var shrinkLimit = 0;
    for (var i = index + 1, n = sizers.length; i < n; ++i) {
        var sizer = sizers[i];
        shrinkLimit += sizer.size - sizer.minSize;
    }
    delta = Math.min(delta, growLimit, shrinkLimit);
    var grow = delta;
    for (var i = index; i >= 0 && grow > 0; --i) {
        var sizer = sizers[i];
        var limit = sizer.maxSize - sizer.size;
        if (limit >= grow) {
            sizer.sizeHint = sizer.size + grow;
            grow = 0;
        }
        else {
            sizer.sizeHint = sizer.size + limit;
            grow -= limit;
        }
    }
    var shrink = delta;
    for (var i = index + 1, n = sizers.length; i < n && shrink > 0; ++i) {
        var sizer = sizers[i];
        var limit = sizer.size - sizer.minSize;
        if (limit >= shrink) {
            sizer.sizeHint = sizer.size - shrink;
            shrink = 0;
        }
        else {
            sizer.sizeHint = sizer.size - limit;
            shrink -= limit;
        }
    }
}
/**
 * Shrink a sizer to the left by a positive delta and adjust neighbors.
 */
function shrinkSizer(sizers, index, delta) {
    var growLimit = 0;
    for (var i = index + 1, n = sizers.length; i < n; ++i) {
        var sizer = sizers[i];
        growLimit += sizer.maxSize - sizer.size;
    }
    var shrinkLimit = 0;
    for (var i = 0; i <= index; ++i) {
        var sizer = sizers[i];
        shrinkLimit += sizer.size - sizer.minSize;
    }
    delta = Math.min(delta, growLimit, shrinkLimit);
    var grow = delta;
    for (var i = index + 1, n = sizers.length; i < n && grow > 0; ++i) {
        var sizer = sizers[i];
        var limit = sizer.maxSize - sizer.size;
        if (limit >= grow) {
            sizer.sizeHint = sizer.size + grow;
            grow = 0;
        }
        else {
            sizer.sizeHint = sizer.size + limit;
            grow -= limit;
        }
    }
    var shrink = delta;
    for (var i = index; i >= 0 && shrink > 0; --i) {
        var sizer = sizers[i];
        var limit = sizer.size - sizer.minSize;
        if (limit >= shrink) {
            sizer.sizeHint = sizer.size - shrink;
            shrink = 0;
        }
        else {
            sizer.sizeHint = sizer.size - limit;
            shrink -= limit;
        }
    }
}
/**
 * Normalize an array of positive values.
 */
function normalize(values) {
    var n = values.length;
    if (n === 0) {
        return [];
    }
    var sum = 0;
    for (var i = 0; i < n; ++i) {
        sum += values[i];
    }
    var result = new Array(n);
    if (sum === 0) {
        for (var i = 0; i < n; ++i) {
            result[i] = 1 / n;
        }
    }
    else {
        for (var i = 0; i < n; ++i) {
            result[i] = values[i] / sum;
        }
    }
    return result;
}

},{"./index.css":21,"phosphor-arrays":6,"phosphor-boxengine":7,"phosphor-domutil":24,"phosphor-messaging":16,"phosphor-nodewrapper":17,"phosphor-properties":18,"phosphor-widget":37}],23:[function(require,module,exports){
var css = "/*-----------------------------------------------------------------------------\r\n| Copyright (c) 2014-2015, PhosphorJS Contributors\r\n|\r\n| Distributed under the terms of the BSD 3-Clause License.\r\n|\r\n| The full license is in the file LICENSE, distributed with this software.\r\n|----------------------------------------------------------------------------*/\nbody.p-mod-override-cursor * {\n  cursor: inherit !important;\n}\n"; (require("browserify-css").createStyle(css, { "href": "node_modules/phosphor-splitpanel/node_modules/phosphor-domutil/lib/index.css"})); module.exports = css;
},{"browserify-css":5}],24:[function(require,module,exports){
arguments[4][11][0].apply(exports,arguments)
},{"./index.css":23,"dup":11,"phosphor-disposable":12}],25:[function(require,module,exports){
var css = "/*-----------------------------------------------------------------------------\r\n| Copyright (c) 2014-2015, PhosphorJS Contributors\r\n|\r\n| Distributed under the terms of the BSD 3-Clause License.\r\n|\r\n| The full license is in the file LICENSE, distributed with this software.\r\n|----------------------------------------------------------------------------*/\n.p-StackedPanel {\n  position: relative;\n}\n.p-StackedPanel > .p-Widget {\n  position: absolute;\n}\n"; (require("browserify-css").createStyle(css, { "href": "node_modules/phosphor-stackedpanel/lib/index.css"})); module.exports = css;
},{"browserify-css":5}],26:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var phosphor_domutil_1 = require('phosphor-domutil');
var phosphor_messaging_1 = require('phosphor-messaging');
var phosphor_properties_1 = require('phosphor-properties');
var phosphor_signaling_1 = require('phosphor-signaling');
var phosphor_widget_1 = require('phosphor-widget');
require('./index.css');
/**
 * The class name added to StackedPanel instances.
 */
var STACKED_PANEL_CLASS = 'p-StackedPanel';
/**
 * A layout widget where only one child widget is visible at a time.
 */
var StackedPanel = (function (_super) {
    __extends(StackedPanel, _super);
    /**
     * Construct a new stacked panel.
     */
    function StackedPanel() {
        _super.call(this);
        this._box = null;
        this.addClass(STACKED_PANEL_CLASS);
    }
    Object.defineProperty(StackedPanel.prototype, "currentChanged", {
        /**
         * A signal emitted when the current widget is changed.
         *
         * #### Notes
         * This is a pure delegate to the [[currentChangedSignal]].
         */
        get: function () {
            return StackedPanel.currentChangedSignal.bind(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StackedPanel.prototype, "widgetRemoved", {
        /**
         * A signal emitted when a widget is removed from the panel.
         *
         * #### Notes
         * This is a pure delegate to the [[widgetRemovedSignal]].
         */
        get: function () {
            return StackedPanel.widgetRemovedSignal.bind(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StackedPanel.prototype, "currentWidget", {
        /**
         * Get the current panel widget.
         *
         * #### Notes
         * This is a pure delegate to the [[currentWidgetProperty]].
         */
        get: function () {
            return StackedPanel.currentWidgetProperty.get(this);
        },
        /**
         * Set the current panel widget.
         *
         * #### Notes
         * This is a pure delegate to the [[currentWidgetProperty]].
         */
        set: function (widget) {
            StackedPanel.currentWidgetProperty.set(this, widget);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * A message handler invoked on a `'child-added'` message.
     */
    StackedPanel.prototype.onChildAdded = function (msg) {
        msg.child.hidden = true;
        this.node.appendChild(msg.child.node);
        if (this.isAttached)
            phosphor_messaging_1.sendMessage(msg.child, phosphor_widget_1.Widget.MsgAfterAttach);
    };
    /**
     * A message handler invoked on a `'child-removed'` message.
     */
    StackedPanel.prototype.onChildRemoved = function (msg) {
        if (msg.child === this.currentWidget)
            this.currentWidget = null;
        if (this.isAttached)
            phosphor_messaging_1.sendMessage(msg.child, phosphor_widget_1.Widget.MsgBeforeDetach);
        this.node.removeChild(msg.child.node);
        resetGeometry(msg.child);
        this.widgetRemoved.emit({ index: msg.previousIndex, widget: msg.child });
    };
    /**
     * A message handler invoked on a `'child-moved'` message.
     */
    StackedPanel.prototype.onChildMoved = function (msg) { };
    /**
     * A message handler invoked on an `'after-show'` message.
     */
    StackedPanel.prototype.onAfterShow = function (msg) {
        this.update(true);
    };
    /**
     * A message handler invoked on an `'after-attach'` message.
     */
    StackedPanel.prototype.onAfterAttach = function (msg) {
        phosphor_messaging_1.postMessage(this, phosphor_widget_1.Widget.MsgLayoutRequest);
    };
    /**
     * A message handler invoked on a `'resize'` message.
     */
    StackedPanel.prototype.onResize = function (msg) {
        if (this.isVisible) {
            var width = msg.width < 0 ? this.node.offsetWidth : msg.width;
            var height = msg.height < 0 ? this.node.offsetHeight : msg.height;
            this._layoutChildren(width, height);
        }
    };
    /**
     * A message handler invoked on an `'update-request'` message.
     */
    StackedPanel.prototype.onUpdateRequest = function (msg) {
        if (this.isVisible) {
            this._layoutChildren(this.node.offsetWidth, this.node.offsetHeight);
        }
    };
    /**
     * A message handler invoked on a `'layout-request'` message.
     */
    StackedPanel.prototype.onLayoutRequest = function (msg) {
        if (this.isAttached) {
            this._setupGeometry();
        }
    };
    /**
     * Update the size constraints of the panel.
     */
    StackedPanel.prototype._setupGeometry = function () {
        // Compute the new size limits.
        var minW = 0;
        var minH = 0;
        var maxW = Infinity;
        var maxH = Infinity;
        var widget = this.currentWidget;
        if (widget) {
            var limits = phosphor_domutil_1.sizeLimits(widget.node);
            minW = limits.minWidth;
            minH = limits.minHeight;
            maxW = limits.maxWidth;
            maxH = limits.maxHeight;
        }
        // Update the box sizing and add it to the size constraints.
        this._box = phosphor_domutil_1.boxSizing(this.node);
        minW += this._box.horizontalSum;
        minH += this._box.verticalSum;
        maxW += this._box.horizontalSum;
        maxH += this._box.verticalSum;
        // Update the panel's size constraints.
        var style = this.node.style;
        style.minWidth = minW + 'px';
        style.minHeight = minH + 'px';
        style.maxWidth = maxW === Infinity ? 'none' : maxW + 'px';
        style.maxHeight = maxH === Infinity ? 'none' : maxH + 'px';
        // Notifiy the parent that it should relayout.
        if (this.parent)
            phosphor_messaging_1.sendMessage(this.parent, phosphor_widget_1.Widget.MsgLayoutRequest);
        // Update the layout for the child widgets.
        this.update(true);
    };
    /**
     * Layout the children using the given offset width and height.
     */
    StackedPanel.prototype._layoutChildren = function (offsetWidth, offsetHeight) {
        // Bail early if there is no current widget.
        var widget = this.currentWidget;
        if (!widget) {
            return;
        }
        // Ensure the box sizing is created.
        var box = this._box || (this._box = phosphor_domutil_1.boxSizing(this.node));
        // Compute the actual layout bounds adjusted for border and padding.
        var top = box.paddingTop;
        var left = box.paddingLeft;
        var width = offsetWidth - box.horizontalSum;
        var height = offsetHeight - box.verticalSum;
        // Update the current widget's layout geometry.
        setGeometry(widget, left, top, width, height);
    };
    /**
     * The change handler for the [[currentWidgetProperty]].
     */
    StackedPanel.prototype._onCurrentWidgetChanged = function (old, val) {
        if (old)
            old.hidden = true;
        if (val)
            val.hidden = false;
        // Ideally, the layout request would be posted in order to take
        // advantage of message compression, but some browsers repaint
        // before the message gets processed, resulting in jitter. So,
        // the layout request is sent and processed immediately.
        phosphor_messaging_1.sendMessage(this, phosphor_widget_1.Widget.MsgLayoutRequest);
        this.currentChanged.emit({ index: this.childIndex(val), widget: val });
    };
    /**
     * A signal emitted when the current widget is changed.
     *
     * **See also:** [[currentChanged]]
     */
    StackedPanel.currentChangedSignal = new phosphor_signaling_1.Signal();
    /**
     * A signal emitted when a widget is removed from the panel.
     *
     * **See also:** [[widgetRemoved]]
     */
    StackedPanel.widgetRemovedSignal = new phosphor_signaling_1.Signal();
    /**
     * The property descriptor for the current widget.
     *
     * This controls which child widget is visible.
     *
     * **See also:** [[currentWidget]]
     */
    StackedPanel.currentWidgetProperty = new phosphor_properties_1.Property({
        value: null,
        coerce: function (owner, val) { return (val && val.parent === owner) ? val : null; },
        changed: function (owner, old, val) { return owner._onCurrentWidgetChanged(old, val); },
    });
    return StackedPanel;
})(phosphor_widget_1.Widget);
exports.StackedPanel = StackedPanel;
/**
 * A private attached property which stores a widget offset rect.
 */
var rectProperty = new phosphor_properties_1.Property({
    create: createRect,
});
/**
 * Create a new offset rect filled with NaNs.
 */
function createRect() {
    return { top: NaN, left: NaN, width: NaN, height: NaN };
}
/**
 * Get the offset rect for a widget.
 */
function getRect(widget) {
    return rectProperty.get(widget);
}
/**
 * Set the offset geometry for the given widget.
 *
 * A resize message will be dispatched to the widget if appropriate.
 */
function setGeometry(widget, left, top, width, height) {
    var resized = false;
    var rect = getRect(widget);
    var style = widget.node.style;
    if (rect.top !== top) {
        rect.top = top;
        style.top = top + 'px';
    }
    if (rect.left !== left) {
        rect.left = left;
        style.left = left + 'px';
    }
    if (rect.width !== width) {
        resized = true;
        rect.width = width;
        style.width = width + 'px';
    }
    if (rect.height !== height) {
        resized = true;
        rect.height = height;
        style.height = height + 'px';
    }
    if (resized) {
        phosphor_messaging_1.sendMessage(widget, new phosphor_widget_1.ResizeMessage(width, height));
    }
}
/**
 * Reset the inline geometry and rect cache for the given widget
 */
function resetGeometry(widget) {
    var rect = getRect(widget);
    var style = widget.node.style;
    rect.top = NaN;
    rect.left = NaN;
    rect.width = NaN;
    rect.height = NaN;
    style.top = '';
    style.left = '';
    style.width = '';
    style.height = '';
}

},{"./index.css":25,"phosphor-domutil":28,"phosphor-messaging":16,"phosphor-properties":18,"phosphor-signaling":20,"phosphor-widget":37}],27:[function(require,module,exports){
var css = "/*-----------------------------------------------------------------------------\r\n| Copyright (c) 2014-2015, PhosphorJS Contributors\r\n|\r\n| Distributed under the terms of the BSD 3-Clause License.\r\n|\r\n| The full license is in the file LICENSE, distributed with this software.\r\n|----------------------------------------------------------------------------*/\nbody.p-mod-override-cursor * {\n  cursor: inherit !important;\n}\n"; (require("browserify-css").createStyle(css, { "href": "node_modules/phosphor-stackedpanel/node_modules/phosphor-domutil/lib/index.css"})); module.exports = css;
},{"browserify-css":5}],28:[function(require,module,exports){
arguments[4][11][0].apply(exports,arguments)
},{"./index.css":27,"dup":11,"phosphor-disposable":12}],29:[function(require,module,exports){
var css = "/*-----------------------------------------------------------------------------\r\n| Copyright (c) 2014-2015, PhosphorJS Contributors\r\n|\r\n| Distributed under the terms of the BSD 3-Clause License.\r\n|\r\n| The full license is in the file LICENSE, distributed with this software.\r\n|----------------------------------------------------------------------------*/\n.p-TabBar {\n  position: relative;\n  z-index: 0;\n}\n.p-TabBar-header {\n  display: none;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  z-index: 0;\n}\n.p-TabBar-content {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 2;\n  display: flex;\n  flex-direction: row;\n}\n.p-TabBar-footer {\n  display: none;\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 1;\n}\n.p-Tab {\n  display: flex;\n  flex-direction: row;\n  box-sizing: border-box;\n  overflow: hidden;\n}\n.p-Tab-icon,\n.p-Tab-close {\n  flex: 0 0 auto;\n}\n.p-Tab-text {\n  flex: 1 1 auto;\n  overflow: hidden;\n  white-space: nowrap;\n}\n.p-TabBar.p-mod-dragging > .p-TabBar-content > .p-Tab {\n  position: relative;\n  left: 0;\n  transition: left 150ms ease;\n}\n.p-TabBar.p-mod-dragging > .p-TabBar-content > .p-Tab.p-mod-active {\n  transition: none;\n}\n.p-TabPanel {\n  z-index: 0;\n}\n.p-TabPanel > .p-TabBar {\n  z-index: 1;\n}\n.p-TabPanel > .p-StackedPanel {\n  z-index: 0;\n}\n"; (require("browserify-css").createStyle(css, { "href": "node_modules/phosphor-tabs/lib/index.css"})); module.exports = css;
},{"browserify-css":5}],30:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./tab'));
__export(require('./tabbar'));
__export(require('./tabpanel'));
require('./index.css');

},{"./index.css":29,"./tab":31,"./tabbar":32,"./tabpanel":33}],31:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var phosphor_nodewrapper_1 = require('phosphor-nodewrapper');
/**
 * The class name added to Tab instances.
 */
var TAB_CLASS = 'p-Tab';
/**
 * The class name added to a tab text node.
 */
var TEXT_CLASS = 'p-Tab-text';
/**
 * The class name added to a tab icon node.
 */
var ICON_CLASS = 'p-Tab-icon';
/**
 * The class name added to a tab close node.
 */
var CLOSE_CLASS = 'p-Tab-close';
/**
 * The class name added to a selected tab.
 */
var SELECTED_CLASS = 'p-mod-selected';
/**
 * The class name added to a closable tab.
 */
var CLOSABLE_CLASS = 'p-mod-closable';
/**
 * An object which manages a node for a tab bar.
 */
var Tab = (function (_super) {
    __extends(Tab, _super);
    /**
     * Construct a new tab.
     *
     * @param text - The initial text for the tab.
     */
    function Tab(text) {
        _super.call(this);
        this.addClass(TAB_CLASS);
        if (text)
            this.text = text;
    }
    /**
     * Create the DOM node for a tab.
     */
    Tab.createNode = function () {
        var node = document.createElement('div');
        var icon = document.createElement('span');
        var text = document.createElement('span');
        var close = document.createElement('span');
        icon.className = ICON_CLASS;
        text.className = TEXT_CLASS;
        close.className = CLOSE_CLASS;
        node.appendChild(icon);
        node.appendChild(text);
        node.appendChild(close);
        return node;
    };
    Object.defineProperty(Tab.prototype, "text", {
        /**
         * Get the text for the tab.
         */
        get: function () {
            return this.node.children[1].textContent;
        },
        /**
         * Set the text for the tab.
         */
        set: function (text) {
            this.node.children[1].textContent = text;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab.prototype, "selected", {
        /**
         * Get whether the tab is selected.
         */
        get: function () {
            return this.hasClass(SELECTED_CLASS);
        },
        /**
         * Set whether the tab is selected.
         */
        set: function (selected) {
            this.toggleClass(SELECTED_CLASS, selected);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab.prototype, "closable", {
        /**
         * Get whether the tab is closable.
         */
        get: function () {
            return this.hasClass(CLOSABLE_CLASS);
        },
        /**
         * Set whether the tab is closable.
         */
        set: function (closable) {
            this.toggleClass(CLOSABLE_CLASS, closable);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab.prototype, "closeIconNode", {
        /**
         * Get the DOM node for the tab close icon.
         */
        get: function () {
            return this.node.lastChild;
        },
        enumerable: true,
        configurable: true
    });
    return Tab;
})(phosphor_nodewrapper_1.NodeWrapper);
exports.Tab = Tab;

},{"phosphor-nodewrapper":17}],32:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var arrays = require('phosphor-arrays');
var phosphor_domutil_1 = require('phosphor-domutil');
var phosphor_properties_1 = require('phosphor-properties');
var phosphor_signaling_1 = require('phosphor-signaling');
var phosphor_widget_1 = require('phosphor-widget');
/**
 * The class name added to TabBar instances.
 */
var TAB_BAR_CLASS = 'p-TabBar';
/**
 * The class name added to the tab bar header div.
 */
var HEADER_CLASS = 'p-TabBar-header';
/**
 * The class name added to the tab bar content div.
 */
var CONTENT_CLASS = 'p-TabBar-content';
/**
 * The class name added to the tab bar footer div.
 */
var FOOTER_CLASS = 'p-TabBar-footer';
/**
 * A class name added to the tab bar when dragging.
 */
var DRAGGING_CLASS = 'p-mod-dragging';
/**
 * A class name added to the active drag tab.
 */
var ACTIVE_CLASS = 'p-mod-active';
/**
 * A class name added to the first tab in the tab bar.
 */
var FIRST_CLASS = 'p-mod-first';
/**
 * A class name adde to the last tab in the tab bar.
 */
var LAST_CLASS = 'p-mod-last';
/**
 * The start drag distance threshold.
 */
var DRAG_THRESHOLD = 5;
/**
 * The detach distance threshold.
 */
var DETACH_THRESHOLD = 20;
/**
 * The tab transition duration. Keep in sync with CSS.
 */
var TRANSITION_DURATION = 150;
/**
 * A widget which displays a row of tabs.
 *
 * #### Notes
 * A `TabBar` widget does not support child widgets. Adding children
 * to a `TabBar` will result in undefined behavior.
 */
var TabBar = (function (_super) {
    __extends(TabBar, _super);
    /**
     * Construct a new tab bar.
     */
    function TabBar() {
        _super.call(this);
        this._tabs = [];
        this._dragData = null;
        this.addClass(TAB_BAR_CLASS);
    }
    /**
     * Create the DOM node for a tab bar.
     */
    TabBar.createNode = function () {
        var node = document.createElement('div');
        var header = document.createElement('div');
        var content = document.createElement('div');
        var footer = document.createElement('div');
        header.className = HEADER_CLASS;
        content.className = CONTENT_CLASS;
        footer.className = FOOTER_CLASS;
        node.appendChild(header);
        node.appendChild(content);
        node.appendChild(footer);
        return node;
    };
    /**
     * Dispose of the resources held by the widget.
     */
    TabBar.prototype.dispose = function () {
        this._releaseMouse();
        this._tabs.length = 0;
        _super.prototype.dispose.call(this);
    };
    Object.defineProperty(TabBar.prototype, "tabMoved", {
        /**
         * A signal emitted when a tab is moved.
         *
         * #### Notes
         * This is a pure delegate to the [[tabMovedSignal]].
         */
        get: function () {
            return TabBar.tabMovedSignal.bind(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabBar.prototype, "tabSelected", {
        /**
         * A signal emitted when a tab is selected.
         *
         * #### Notes
         * This is a pure delegate to the [[tabSelectedSignal]].
         */
        get: function () {
            return TabBar.tabSelectedSignal.bind(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabBar.prototype, "tabCloseRequested", {
        /**
         * A signal emitted when the user clicks a tab close icon.
         *
         * #### Notes
         * This is a pure delegate to the [[tabCloseRequestedSignal]].
         */
        get: function () {
            return TabBar.tabCloseRequestedSignal.bind(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabBar.prototype, "tabDetachRequested", {
        /**
         * A signal emitted when a tab is dragged beyond the detach threshold.
         *
         * #### Notes
         * This is a pure delegate to the [[tabDetachRequestedSignal]].
         */
        get: function () {
            return TabBar.tabDetachRequestedSignal.bind(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabBar.prototype, "previousTab", {
        /**
         * Get the previously selected tab.
         *
         * #### Notes
         * This is a pure delegate to the [[previousTabProperty]].
         */
        get: function () {
            return TabBar.previousTabProperty.get(this);
        },
        /**
         * Set the previously selected tab.
         *
         * #### Notes
         * This is a pure delegate to the [[previousTabProperty]].
         */
        set: function (value) {
            TabBar.previousTabProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabBar.prototype, "selectedTab", {
        /**
         * Get the selected tab.
         *
         * #### Notes
         * This is a pure delegate to the [[selectedTabProperty]].
         */
        get: function () {
            return TabBar.selectedTabProperty.get(this);
        },
        /**
         * Set the selected tab.
         *
         * #### Notes
         * This is a pure delegate to the [[selectedTabProperty]].
         */
        set: function (value) {
            TabBar.selectedTabProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabBar.prototype, "tabsMovable", {
        /**
         * Get whether the tabs are movable by the user.
         *
         * #### Notes
         * This is a pure delegate to the [[tabsMovableProperty]].
         */
        get: function () {
            return TabBar.tabsMovableProperty.get(this);
        },
        /**
         * Set whether the tabs are movable by the user.
         *
         * #### Notes
         * This is a pure delegate to the [[tabsMovableProperty]].
         */
        set: function (value) {
            TabBar.tabsMovableProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabBar.prototype, "tabs", {
        /**
         * Get a shallow copy of the array of tabs.
         *
         * #### Notes
         * When only iterating over the tabs, it can be faster to use
         * the tab query methods, which do not perform a copy.
         *
         * **See also:** [[tabCount]], [[tabAt]]
         */
        get: function () {
            return this._tabs.slice();
        },
        /**
         * Set the tabs for the tab bar.
         *
         * #### Notes
         * This will clear the current tabs and add the specified tabs.
         * Depending on the desired outcome, it can be more efficient to
         * use one of the tab manipulation methods.
         *
         * **See also:** [[addTab]], [[insertTab]], [[removeTab]]
         */
        set: function (tabs) {
            var _this = this;
            this.clearTabs();
            tabs.forEach(function (tab) { return _this.addTab(tab); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabBar.prototype, "tabCount", {
        /**
         * Get the number of tabs in the tab bar.
         *
         * #### Notes
         * This is a read-only property.
         *
         * **See also:** [[tabs]], [[tabAt]]
         */
        get: function () {
            return this._tabs.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Get the tab at a specific index.
     *
     * @param index - The index of the tab of interest.
     *
     * @returns The tab at the specified index, or `undefined` if the
     *   index is out of range.
     *
     * **See also:** [[tabCount]], [[tabIndex]]
     */
    TabBar.prototype.tabAt = function (index) {
        return this._tabs[index | 0];
    };
    /**
     * Get the index of a specific tab.
     *
     * @param tab - The tab of interest.
     *
     * @returns The index of the specified tab, or `-1` if the tab is
     *   not contained within the tab bar.
     *
     * **See also:** [[tabCount]], [[tabAt]]
     */
    TabBar.prototype.tabIndex = function (tab) {
        return this._tabs.indexOf(tab);
    };
    /**
     * Add a tab to the end of the tab bar.
     *
     * @param tab - The tab to add to the tab bar.
     *
     * @returns The new index of the tab.
     *
     * #### Notes
     * If the tab is already contained within the tab bar, it will first
     * be removed.
     *
     * The tab *must not* be contained by any other tab bar.
     *
     * **See also:** [[insertTab]], [[moveTab]]
     */
    TabBar.prototype.addTab = function (tab) {
        return this.insertTab(this._tabs.length, tab);
    };
    /**
     * Insert a tab into the tab bar at the given index.
     *
     * @param index - The index at which to insert the tab. This will be
     *   clamped to the bounds of the tabs.
     *
     * @param tab - The tab to add to the tab bar.
     *
     * @returns The new index of the tab.
     *
     * #### Notes
     * If the tab is already contained within the tab bar, it will first
     * be removed.
     *
     * The tab *must not* be contained by any other tab bar.
     *
     * **See also:** [[addTab]], [[moveTab]]
     */
    TabBar.prototype.insertTab = function (index, tab) {
        this.removeTab(tab);
        return this._insertTab(index, tab);
    };
    /**
     * Move a tab from one index to another.
     *
     * @param fromIndex - The index of the tab to move.
     *
     * @param toIndex - The target index of the tab.
     *
     * @returns `true` if the move was successful, or `false` if either
     *   index is out of range.
     *
     * #### Notes
     * This can be more efficient than re-inserting an existing tab.
     *
     * **See also:** [[addTab]], [[insertTab]]
     */
    TabBar.prototype.moveTab = function (fromIndex, toIndex) {
        this._releaseMouse();
        return this._moveTab(fromIndex, toIndex);
    };
    /**
     * Remove the tab at a specific index.
     *
     * @param index - The index of the tab of interest.
     *
     * @returns The removed tab, or `undefined` if the index is out
     *   of range.
     *
     * **See also:** [[removeTab]], [[clearTabs]]
     */
    TabBar.prototype.removeTabAt = function (index) {
        this._releaseMouse();
        return this._removeTab(index);
    };
    /**
     * Remove a specific tab from the tab bar.
     *
     * @param tab - The tab of interest.
     *
     * @returns The index occupied by the tab, or `-1` if the tab is
     *   not contained by the tab bar.
     *
     * **See also:** [[removeTabAt]], [[clearTabs]]
     */
    TabBar.prototype.removeTab = function (tab) {
        this._releaseMouse();
        var i = this._tabs.indexOf(tab);
        if (i !== -1)
            this._removeTab(i);
        return i;
    };
    /**
     * Remove all tabs from the tab bar.
     *
     * **See also:** [[removeTab]], [[removeTabAt]]
     */
    TabBar.prototype.clearTabs = function () {
        while (this._tabs.length > 0) {
            this.removeTabAt(this._tabs.length - 1);
        }
    };
    /**
     * Add a tab to the tab bar at the given client X position.
     *
     * @param tab - The tab to attach to the tab bar.
     *
     * @param clientX - The current client X mouse position.
     *
     * @returns `true` if the tab was attached, `false` otherwise.
     *
     * #### Notes
     * This method is intended for use by code which supports tear-off
     * tab interfaces. It will insert the tab at the specified location
     * and grab the mouse to continue the tab drag. It assumes that the
     * left mouse button is currently pressed.
     *
     * This is a no-op if the tab is already contained by the tab bar,
     * if the tabs are not movable, or if a tab drag is in progress.
     */
    TabBar.prototype.attachTab = function (tab, clientX) {
        // Bail if there is a drag in progress or the tabs aren't movable.
        if (this._dragData || !this.tabsMovable) {
            return false;
        }
        // Bail if the tab is already part of the tab bar.
        if (this._tabs.indexOf(tab) !== -1) {
            return false;
        }
        // Insert and select the new tab.
        var index = this._tabs.length;
        this._insertTab(index, tab);
        this.selectedTab = tab;
        // Setup the drag data object.
        var content = this.node.firstChild.nextSibling;
        var tabRect = tab.node.getBoundingClientRect();
        var data = this._dragData = new DragData();
        data.tab = tab;
        data.tabIndex = index;
        data.tabLeft = tab.node.offsetLeft;
        data.tabWidth = tabRect.width;
        data.pressX = tabRect.left + Math.floor(0.4 * tabRect.width);
        data.pressY = tabRect.top + (tabRect.height >> 1);
        data.tabPressX = Math.floor(0.4 * tabRect.width);
        data.tabLayout = snapTabLayout(this._tabs);
        data.contentRect = content.getBoundingClientRect();
        data.cursorGrab = phosphor_domutil_1.overrideCursor('default');
        data.dragActive = true;
        // Add the extra mouse event listeners.
        document.addEventListener('mouseup', this, true);
        document.addEventListener('mousemove', this, true);
        // Add the dragging style classes.
        tab.addClass(ACTIVE_CLASS);
        this.addClass(DRAGGING_CLASS);
        // Update the drag tab position.
        this._updateDragPosition(clientX);
        return true;
    };
    /**
     * Handle the DOM events for the tab bar.
     *
     * @param event - The DOM event sent to the tab bar.
     *
     * #### Notes
     * This method implements the DOM `EventListener` interface and is
     * called in response to events on the tab bar's DOM node. It should
     * not be called directly by user code.
     */
    TabBar.prototype.handleEvent = function (event) {
        switch (event.type) {
            case 'click':
                this._evtClick(event);
                break;
            case 'mousedown':
                this._evtMouseDown(event);
                break;
            case 'mousemove':
                this._evtMouseMove(event);
                break;
            case 'mouseup':
                this._evtMouseUp(event);
                break;
        }
    };
    /**
     * A message handler invoked on an `'after-attach'` message.
     */
    TabBar.prototype.onAfterAttach = function (msg) {
        this.node.addEventListener('mousedown', this);
        this.node.addEventListener('click', this);
    };
    /**
     * A message handler invoked on a `'before-dettach'` message.
     */
    TabBar.prototype.onBeforeDetach = function (msg) {
        this.node.removeEventListener('mousedown', this);
        this.node.removeEventListener('click', this);
    };
    /**
     * Handle the `'click'` event for the tab bar.
     */
    TabBar.prototype._evtClick = function (event) {
        // Do nothing if it's not a left click.
        if (event.button !== 0) {
            return;
        }
        // Do nothing if the click is not on a tab.
        var index = hitTestTabs(this._tabs, event.clientX, event.clientY);
        if (index < 0) {
            return;
        }
        // Clicking on a tab stops the event propagation.
        event.preventDefault();
        event.stopPropagation();
        // If the click was on a node contained by the close icon node
        // of a closable tab, emit the `tabCloseRequested` signal.
        var tab = this._tabs[index];
        var target = event.target;
        if (tab.closable && tab.closeIconNode.contains(target)) {
            this.tabCloseRequested.emit({ index: index, tab: tab });
        }
    };
    /**
     * Handle the `'mousedown'` event for the tab bar.
     */
    TabBar.prototype._evtMouseDown = function (event) {
        // Do nothing if it's not a left mouse press.
        if (event.button !== 0) {
            return;
        }
        // Bail if a previous drag is still transitioning.
        if (this._dragData) {
            return;
        }
        // Do nothing of the press is not on a tab.
        var index = hitTestTabs(this._tabs, event.clientX, event.clientY);
        if (index < 0) {
            return;
        }
        // Pressing on a tab stops the event propagation.
        event.preventDefault();
        event.stopPropagation();
        // Do nothing further if the press was on the tab close icon.
        var tab = this._tabs[index];
        if (tab.closeIconNode.contains(event.target)) {
            return;
        }
        // Setup the drag if the tabs are movable.
        if (this.tabsMovable) {
            var tabRect = tab.node.getBoundingClientRect();
            var data = this._dragData = new DragData();
            data.tab = tab;
            data.tabIndex = index;
            data.tabLeft = tab.node.offsetLeft;
            data.tabWidth = tabRect.width;
            data.pressX = event.clientX;
            data.pressY = event.clientY;
            data.tabPressX = event.clientX - tabRect.left;
            document.addEventListener('mouseup', this, true);
            document.addEventListener('mousemove', this, true);
        }
        // Update the selected tab to the pressed tab.
        this.selectedTab = tab;
    };
    /**
     * Handle the `'mousemove'` event for the tab bar.
     */
    TabBar.prototype._evtMouseMove = function (event) {
        // Mouse move events are never propagated since this handler
        // is only installed when during a left mouse drag operation.
        event.preventDefault();
        event.stopPropagation();
        // Bail if there is no drag in progress.
        if (!this._dragData) {
            return;
        }
        // Check to see if the drag threshold has been exceeded, and
        // start the tab drag operation the first time that occurrs.
        var data = this._dragData;
        if (!data.dragActive) {
            var dx = Math.abs(event.clientX - data.pressX);
            var dy = Math.abs(event.clientY - data.pressY);
            if (dx < DRAG_THRESHOLD && dy < DRAG_THRESHOLD) {
                return;
            }
            // Fill in the remaining drag data.
            var content = this.node.firstChild.nextSibling;
            data.tabLayout = snapTabLayout(this._tabs);
            data.contentRect = content.getBoundingClientRect();
            data.cursorGrab = phosphor_domutil_1.overrideCursor('default');
            data.dragActive = true;
            // Add the dragging style classes.
            data.tab.addClass(ACTIVE_CLASS);
            this.addClass(DRAGGING_CLASS);
        }
        // Check to see if the detach threshold has been exceeded, and
        // emit the detach request signal the first time that occurrs.
        // If the drag data gets set to null, the mouse was released.
        if (!data.detachRequested && shouldDetach(data.contentRect, event)) {
            data.detachRequested = true;
            this.tabDetachRequested.emit({
                tab: data.tab,
                index: data.tabIndex,
                clientX: event.clientX,
                clientY: event.clientY,
            });
            if (!this._dragData) {
                return;
            }
        }
        // Update the drag tab position.
        this._updateDragPosition(event.clientX);
    };
    /**
     * Handle the `'mouseup'` event for the tab bar.
     */
    TabBar.prototype._evtMouseUp = function (event) {
        var _this = this;
        // Do nothing if the left mouse button is not released.
        if (event.button !== 0) {
            return;
        }
        // Mouse move events are never propagated since this handler
        // is only installed when during a left mouse drag operation.
        event.preventDefault();
        event.stopPropagation();
        // Bail if there is no drag in progress.
        if (!this._dragData) {
            return;
        }
        // Remove the extra mouse handlers.
        document.removeEventListener('mouseup', this, true);
        document.removeEventListener('mousemove', this, true);
        // Store a local reference to the drag data.
        var data = this._dragData;
        // If the drag is not active, clear the reference and bail.
        if (!data.dragActive) {
            this._dragData = null;
            return;
        }
        // Compute the approximate final relative tab offset.
        var idealLeft;
        if (data.tabTargetIndex === data.tabIndex) {
            idealLeft = 0;
        }
        else if (data.tabTargetIndex > data.tabIndex) {
            var tl = data.tabLayout[data.tabTargetIndex];
            idealLeft = tl.left + tl.width - data.tabWidth - data.tabLeft;
        }
        else {
            var tl = data.tabLayout[data.tabTargetIndex];
            idealLeft = tl.left - data.tabLeft;
        }
        // Position the tab to its final position, subject to limits.
        var maxLeft = data.contentRect.width - (data.tabLeft + data.tabWidth);
        var adjustedLeft = Math.max(-data.tabLeft, Math.min(idealLeft, maxLeft));
        data.tab.node.style.left = adjustedLeft + 'px';
        // Remove the active class from the tab so it can be transitioned.
        data.tab.removeClass(ACTIVE_CLASS);
        // Complete the release on a timer to allow the tab to transition.
        setTimeout(function () {
            // Bail if the drag data has been changed or released.
            if (_this._dragData !== data) {
                return;
            }
            // Clear the drag data reference.
            _this._dragData = null;
            // Clear the relative tab positions.
            for (var i = 0, n = _this._tabs.length; i < n; ++i) {
                _this._tabs[i].node.style.left = '';
            }
            // Clear the cursor grab and drag styles.
            data.cursorGrab.dispose();
            data.tab.removeClass(ACTIVE_CLASS);
            _this.removeClass(DRAGGING_CLASS);
            // Finally, move the drag tab to its final index location.
            if (data.tabTargetIndex !== -1) {
                _this._moveTab(data.tabIndex, data.tabTargetIndex);
            }
        }, TRANSITION_DURATION);
    };
    /**
     * Update the drag tab position for the given mouse X position.
     *
     * This method is a no-op if an active drag is not in progress.
     */
    TabBar.prototype._updateDragPosition = function (clientX) {
        // Bail if there is not an active drag.
        var data = this._dragData;
        if (!data || !data.dragActive) {
            return;
        }
        // Compute the target bounds of the drag tab.
        var offsetLeft = clientX - data.contentRect.left;
        var targetLeft = offsetLeft - data.tabPressX;
        var targetRight = targetLeft + data.tabWidth;
        // Reset the target tab index.
        data.tabTargetIndex = data.tabIndex;
        // Update the non-drag tab positions and the tab target index.
        for (var i = 0, n = this._tabs.length; i < n; ++i) {
            var style = this._tabs[i].node.style;
            var layout = data.tabLayout[i];
            var threshold = layout.left + (layout.width >> 1);
            if (i < data.tabIndex && targetLeft < threshold) {
                style.left = data.tabWidth + data.tabLayout[i + 1].margin + 'px';
                data.tabTargetIndex = Math.min(data.tabTargetIndex, i);
            }
            else if (i > data.tabIndex && targetRight > threshold) {
                style.left = -data.tabWidth - layout.margin + 'px';
                data.tabTargetIndex = i;
            }
            else if (i !== data.tabIndex) {
                style.left = '';
            }
        }
        // Update the drag tab position
        var idealLeft = clientX - data.pressX;
        var maxLeft = data.contentRect.width - (data.tabLeft + data.tabWidth);
        var adjustedLeft = Math.max(-data.tabLeft, Math.min(idealLeft, maxLeft));
        data.tab.node.style.left = adjustedLeft + 'px';
    };
    /**
     * Release the mouse grab and restore the tab positions.
     */
    TabBar.prototype._releaseMouse = function () {
        // Bail early if there is no drag in progress.
        if (!this._dragData) {
            return;
        }
        // Remove the extra mouse listeners.
        document.removeEventListener('mouseup', this, true);
        document.removeEventListener('mousemove', this, true);
        // Clear the drag data reference.
        var data = this._dragData;
        this._dragData = null;
        // If the drag is not active, there's nothing left to do.
        if (!data.dragActive) {
            return;
        }
        // Reset the positions of the tabs.
        for (var i = 0, n = this._tabs.length; i < n; ++i) {
            this._tabs[i].node.style.left = '';
        }
        // Clear the cursor grab and drag styles.
        data.cursorGrab.dispose();
        data.tab.removeClass(ACTIVE_CLASS);
        this.removeClass(DRAGGING_CLASS);
    };
    /**
     * Insert a new tab into the tab bar at the given index.
     *
     * The tab should not already be contained in the tab bar.
     *
     * The mouse should be released before calling this method.
     */
    TabBar.prototype._insertTab = function (index, tab) {
        tab.selected = false;
        var i = arrays.insert(this._tabs, index, tab);
        var content = this.node.firstChild.nextSibling;
        content.appendChild(tab.node);
        if (!this.selectedTab) {
            this.selectedTab = tab;
        }
        else {
            this._updateTabOrdering();
        }
        return i;
    };
    /**
     * Move a tab to a new index in the tab bar.
     *
     * The mouse should be released before calling this method.
     */
    TabBar.prototype._moveTab = function (fromIndex, toIndex) {
        var i = fromIndex | 0;
        var j = toIndex | 0;
        if (!arrays.move(this._tabs, i, j)) {
            return false;
        }
        if (i === j) {
            return true;
        }
        this._updateTabOrdering();
        this.tabMoved.emit({ fromIndex: i, toIndex: j });
        return true;
    };
    /**
     * Remove and return the tab at the given index.
     *
     * The mouse should be released before calling this method.
     */
    TabBar.prototype._removeTab = function (index) {
        // Bail if the index is invalid.
        var i = index | 0;
        var tab = arrays.removeAt(this._tabs, i);
        if (!tab) {
            return void 0;
        }
        // Remove the tab from the DOM and reset its style.
        var content = this.node.firstChild.nextSibling;
        content.removeChild(tab.node);
        tab.selected = false;
        tab.node.style.left = '';
        tab.node.style.zIndex = '';
        tab.removeClass(ACTIVE_CLASS);
        tab.removeClass(FIRST_CLASS);
        tab.removeClass(LAST_CLASS);
        // Update the selected tab. If the removed tab was the selected tab,
        // select the next best tab by starting with the previous tab, then
        // the next sibling, and finally the previous sibling. Otherwise,
        // update the state and tab ordering as appropriate.
        if (tab === this.selectedTab) {
            var next = this.previousTab || this._tabs[i] || this._tabs[i - 1];
            this.selectedTab = next;
            this.previousTab = null;
        }
        else if (tab === this.previousTab) {
            this.previousTab = null;
            this._updateTabOrdering();
        }
        else {
            this._updateTabOrdering();
        }
        return tab;
    };
    /**
     * Update the Z-index and flex order of the tabs.
     */
    TabBar.prototype._updateTabOrdering = function () {
        if (this._tabs.length === 0) {
            return;
        }
        var selectedTab = this.selectedTab;
        for (var i = 0, n = this._tabs.length, k = n - 1; i < n; ++i) {
            var tab = this._tabs[i];
            var style = tab.node.style;
            tab.removeClass(FIRST_CLASS);
            tab.removeClass(LAST_CLASS);
            style.order = i + '';
            if (tab === selectedTab) {
                style.zIndex = n + '';
            }
            else {
                style.zIndex = k-- + '';
            }
        }
        this._tabs[0].addClass(FIRST_CLASS);
        this._tabs[this._tabs.length - 1].addClass(LAST_CLASS);
    };
    /**
     * The change handler for the [[selectedTabProperty]].
     */
    TabBar.prototype._onSelectedTabChanged = function (old, tab) {
        if (old)
            old.selected = false;
        if (tab)
            tab.selected = true;
        this.previousTab = old;
        this._updateTabOrdering();
        this.tabSelected.emit({ index: this.tabIndex(tab), tab: tab });
    };
    /**
     * A signal emitted when a tab is moved.
     *
     * **See also:** [[tabMoved]]
     */
    TabBar.tabMovedSignal = new phosphor_signaling_1.Signal();
    /**
     * A signal emitted when a tab is selected.
     *
     * **See also:** [[tabSelected]]
     */
    TabBar.tabSelectedSignal = new phosphor_signaling_1.Signal();
    /**
     * A signal emitted when the user clicks a tab close icon.
     *
     * **See also:** [[tabCloseRequested]
     */
    TabBar.tabCloseRequestedSignal = new phosphor_signaling_1.Signal();
    /**
     * A signal emitted when a tab is dragged beyond the detach threshold.
     *
     * **See also:** [[tabDetachRequested]]
     */
    TabBar.tabDetachRequestedSignal = new phosphor_signaling_1.Signal();
    /**
     * The property descriptor for the previous tab.
     *
     * This controls which tab is selected after if selected tab is
     * removed. It is typically updated automatically.
     *
     * **See also:** [[previousTab]]
     */
    TabBar.previousTabProperty = new phosphor_properties_1.Property({
        value: null,
        coerce: function (owner, val) { return (val && owner.tabIndex(val) !== -1) ? val : null; },
    });
    /**
     * The property descriptor for the selected tab.
     *
     * This controls which tab is selected in the tab bar.
     *
     * **See also:** [[selectedTab]]
     */
    TabBar.selectedTabProperty = new phosphor_properties_1.Property({
        value: null,
        coerce: function (owner, val) { return (val && owner.tabIndex(val) !== -1) ? val : null; },
        changed: function (owner, old, val) { return owner._onSelectedTabChanged(old, val); },
    });
    /**
     * The property descriptor for the tabs movable property
     *
     * This controls whether tabs are movable by the user.
     *
     * **See also:** [[tabsMovable]]
     */
    TabBar.tabsMovableProperty = new phosphor_properties_1.Property({
        value: true,
    });
    return TabBar;
})(phosphor_widget_1.Widget);
exports.TabBar = TabBar;
/**
 * A struct which holds the drag data for a tab bar.
 */
var DragData = (function () {
    function DragData() {
        /**
         * The tab being dragged.
         */
        this.tab = null;
        /**
         * The offset left of the tab being dragged.
         */
        this.tabLeft = -1;
        /**
         * The offset width of the tab being dragged.
         */
        this.tabWidth = -1;
        /**
         * The index of the tab being dragged.
         */
        this.tabIndex = -1;
        /**
         * The orgian mouse X position in tab coordinates.
         */
        this.tabPressX = -1;
        /**
         * The tab target index upon mouse release.
         */
        this.tabTargetIndex = -1;
        /**
         * The array of tab layout objects snapped at drag start.
         */
        this.tabLayout = null;
        /**
         * The mouse press client X position.
         */
        this.pressX = -1;
        /**
         * The mouse press client Y position.
         */
        this.pressY = -1;
        /**
         * The bounding client rect of the tab bar content node.
         */
        this.contentRect = null;
        /**
         * The disposable to clean up the cursor override.
         */
        this.cursorGrab = null;
        /**
         * Whether the drag is currently active.
         */
        this.dragActive = false;
        /**
         * Whether the detach request signal has been emitted.
         */
        this.detachRequested = false;
    }
    return DragData;
})();
/**
 * Test if a mouse position lies outside the detach bound of a rect.
 */
function shouldDetach(rect, event) {
    return ((event.clientX < rect.left - DETACH_THRESHOLD) ||
        (event.clientX >= rect.right + DETACH_THRESHOLD) ||
        (event.clientY < rect.top - DETACH_THRESHOLD) ||
        (event.clientY >= rect.bottom + DETACH_THRESHOLD));
}
/**
 * Get the index of the tab which intersect the client point, or -1.
 */
function hitTestTabs(tabs, clientX, clientY) {
    for (var i = 0, n = tabs.length; i < n; ++i) {
        if (phosphor_domutil_1.hitTest(tabs[i].node, clientX, clientY)) {
            return i;
        }
    }
    return -1;
}
/**
 * Snap an array of the current tab layout values.
 */
function snapTabLayout(tabs) {
    var layout = new Array(tabs.length);
    for (var i = 0, n = tabs.length; i < n; ++i) {
        var node = tabs[i].node;
        var left = node.offsetLeft;
        var width = node.offsetWidth;
        var cstyle = window.getComputedStyle(tabs[i].node);
        var margin = parseInt(cstyle.marginLeft, 10) || 0;
        layout[i] = { margin: margin, left: left, width: width };
    }
    return layout;
}

},{"phosphor-arrays":6,"phosphor-domutil":35,"phosphor-properties":18,"phosphor-signaling":20,"phosphor-widget":37}],33:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var phosphor_boxpanel_1 = require('phosphor-boxpanel');
var phosphor_properties_1 = require('phosphor-properties');
var phosphor_signaling_1 = require('phosphor-signaling');
var phosphor_stackedpanel_1 = require('phosphor-stackedpanel');
var tabbar_1 = require('./tabbar');
/**
 * The class name added to TabPanel instances.
 */
var TAB_PANEL_CLASS = 'p-TabPanel';
/**
 * A panel which provides a tabbed layout for child widgets.
 *
 * The `TabPanel` provides a convenient combination of a `TabBar` and
 * a `StackedPanel` which allows the user to toggle between widgets by
 * selecting the tab associated with a widget.
 *
 * #### Notes
 * Widgets should be added to a `TabPanel` using the `<prefix>Widget`
 * methods, **not** the `<prefix>Child` methods. The children of a
 * `TabPanel` should **not** be manipulated directly by user code.
 */
var TabPanel = (function (_super) {
    __extends(TabPanel, _super);
    /**
     * Construct a new tab panel.
     */
    function TabPanel() {
        _super.call(this);
        this._tabs = new tabbar_1.TabBar();
        this._stack = new phosphor_stackedpanel_1.StackedPanel();
        this.addClass(TAB_PANEL_CLASS);
        this._tabs.tabMoved.connect(this._onTabMoved, this);
        this._tabs.tabSelected.connect(this._onTabSelected, this);
        this._tabs.tabCloseRequested.connect(this._onTabCloseRequested, this);
        this._stack.currentChanged.connect(this._onCurrentChanged, this);
        this._stack.widgetRemoved.connect(this._onWidgetRemoved, this);
        phosphor_boxpanel_1.BoxPanel.setStretch(this._tabs, 0);
        phosphor_boxpanel_1.BoxPanel.setStretch(this._stack, 1);
        this.direction = phosphor_boxpanel_1.BoxPanel.TopToBottom;
        this.spacing = 0;
        this.addChild(this._tabs);
        this.addChild(this._stack);
    }
    /**
     * Get the tab for the given widget.
     *
     * @param widget - The widget of interest.
     *
     * @returns The tab for the given widget.
     *
     * #### Notes
     * This is a pure delegate for the [[tabProperty]].
     */
    TabPanel.getTab = function (widget) {
        return TabPanel.tabProperty.get(widget);
    };
    /**
     * Set the tab for the given widget.
     *
     * @param widget - The widget of interest.
     *
     * @param tab - The tab to use for the widget.
     *
     * #### Notes
     * This is a pure delegate for the [[tabProperty]].
     */
    TabPanel.setTab = function (widget, tab) {
        TabPanel.tabProperty.set(widget, tab);
    };
    /**
     * Dispose of the resources held by the widget.
     */
    TabPanel.prototype.dispose = function () {
        this._tabs = null;
        this._stack = null;
        _super.prototype.dispose.call(this);
    };
    Object.defineProperty(TabPanel.prototype, "currentChanged", {
        /**
         * A signal emitted when the current widget is changed.
         *
         * #### Notes
         * This is a pure delegate to the [[currentChangedSignal]].
         */
        get: function () {
            return TabPanel.currentChangedSignal.bind(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabPanel.prototype, "currentWidget", {
        /**
         * Get the currently selected widget.
         */
        get: function () {
            return this._stack.currentWidget;
        },
        /**
         * Set the currently selected widget.
         */
        set: function (widget) {
            var i = this._stack.childIndex(widget);
            this._tabs.selectedTab = this._tabs.tabAt(i);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabPanel.prototype, "tabsMovable", {
        /**
         * Get whether the tabs are movable by the user.
         */
        get: function () {
            return this._tabs.tabsMovable;
        },
        /**
         * Set whether the tabs are movable by the user.
         */
        set: function (movable) {
            this._tabs.tabsMovable = movable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabPanel.prototype, "widgets", {
        /**
         * Get a shallow copy of the array of widgets.
         *
         * #### Notes
         * When only iterating over the widgets, it can be faster to use
         * the widget query methods, which do not perform a copy.
         *
         * **See also:** [[widgetCount]], [[widgetAt]]
         */
        get: function () {
            return this._stack.children;
        },
        /**
         * Set the widgets for the tab panel.
         *
         * #### Notes
         * This will clear the current widgets and add the specified widgets.
         * Depending on the desired outcome, it can be more efficient to use
         * one of the widget manipulation methods.
         *
         * **See also:** [[addWidget]], [[insertWidget]], [[removeWidget]]
         */
        set: function (widgets) {
            var _this = this;
            this.clearWidgets();
            widgets.forEach(function (widget) { return _this.addWidget(widget); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabPanel.prototype, "widgetCount", {
        /**
         * Get the number of widgets in the tab panel.
         *
         * #### Notes
         * This is a read-only property.
         *
         * **See also:** [[widgets]], [[widgetAt]]
         */
        get: function () {
            return this._stack.childCount;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Get the widget at a specific index.
     *
     * @param index - The index of the widget of interest.
     *
     * @returns The widget widget at the specified index, or `undefined`
     *   if the index is out of range.
     *
     * **See also:** [[widgetCount]], [[widgetIndex]]
     */
    TabPanel.prototype.widgetAt = function (index) {
        return this._stack.childAt(index);
    };
    /**
     * Get the index of a specific widget.
     *
     * @param widget - The widget of interest.
     *
     * @returns The index of the specified widget, or `-1` if the widget
     *   is not contained in the tab panel.
     *
     * **See also:** [[widgetCount]], [[widgetAt]]
     */
    TabPanel.prototype.widgetIndex = function (widget) {
        return this._stack.childIndex(widget);
    };
    /**
     * Add a widget to the end of the panel.
     *
     * @param widget - The widget to add to the panel.
     *
     * @returns The new index of the widget.
     *
     * #### Notes
     * If the widget already exists in the panel, it will first be
     * removed.
     *
     * The `TabPanel.tab` attached property *must* be set with the
     * tab to use for the widget, or an error will be thrown. This
     * can be set via `TabPanel.setTab`.
     *
     * The `TabPanel.tab` attached property is assumed to remain
     * constant while the widget is contained by the tab panel.
     *
     * **See also:** [[insertWidget]], [[moveWidget]]
     */
    TabPanel.prototype.addWidget = function (widget) {
        return this.insertWidget(this.widgetCount, widget);
    };
    /**
     * Insert a widget into the panel at the given index.
     *
     * @param index - The target index for the widget. This will be
     *   clamped to the bounds of the widgets.
     *
     * @param widget - The widget to insert into the panel.
     *
     * @returns The new index of the widget.
     *
     * #### Notes
     * If the widget already exists in the panel, it will first be
     * removed.
     *
     * The `TabPanel.tab` attached property *must* be set with the
     * tab to use for the widget, or an error will be thrown. This
     * can be set via `TabPanel.setTab`.
     *
     * The `TabPanel.tab` attached property is assumed to remain
     * constant while the widget is contained by the tab panel.
     *
     * **See also:** [[addWidget]], [[moveWidget]]
     */
    TabPanel.prototype.insertWidget = function (index, widget) {
        var tab = TabPanel.getTab(widget);
        if (!tab)
            throw new Error('`TabPanel.tab` property not set');
        var i = this._stack.insertChild(index, widget);
        return this._tabs.insertTab(i, tab);
    };
    /**
     * Move a widget from one index to another.
     *
     * @param fromIndex - The index of the widget of interest.
     *
     * @param toIndex - The target index for the widget.
     *
     * @returns 'true' if the widget was moved, or `false` if either
     *   of the given indices are out of range.
     *
     * #### Notes
     * This can be more efficient than re-inserting an existing widget.
     *
     * **See also:** [[addWidget]], [[insertWidget]]
     */
    TabPanel.prototype.moveWidget = function (fromIndex, toIndex) {
        return this._tabs.moveTab(fromIndex, toIndex);
    };
    /**
     * Remove the widget at a specific index.
     *
     * @param index - The index of the widget of interest.
     *
     * @returns The removed widget, or `undefined` if the index
     *   is out of range.
     *
     * **See also:** [[removeWidget]], [[clearWidgets]]
     */
    TabPanel.prototype.removeWidgetAt = function (index) {
        return this._stack.removeChildAt(index);
    };
    /**
     * Remove a specific widget from the panel.
     *
     * @param child - The widget of interest.
     *
     * @returns The index which the widget occupied, or `-1` if the
     *   widget is not contained in the tab panel.
     *
     * **See also:** [[removeWidgetAt]], [[clearWidgets]]
     */
    TabPanel.prototype.removeWidget = function (widget) {
        return this._stack.removeChild(widget);
    };
    /**
     * Remove all widgets from the tab panel.
     *
     * **See also:** [[removeWidget]], [[removeWidgetAt]]
     */
    TabPanel.prototype.clearWidgets = function () {
        this._stack.clearChildren();
    };
    /**
     * Handle the `tabMoved` signal from the tab bar.
     */
    TabPanel.prototype._onTabMoved = function (sender, args) {
        this._stack.moveChild(args.fromIndex, args.toIndex);
    };
    /**
     * Handle the `tabSelected` signal from the tab bar.
     */
    TabPanel.prototype._onTabSelected = function (sender, args) {
        this._stack.currentWidget = this._stack.childAt(args.index);
    };
    /**
     * Handle the `tabCloseRequested` signal from the tab bar.
     */
    TabPanel.prototype._onTabCloseRequested = function (sender, args) {
        this._stack.childAt(args.index).close();
    };
    /**
     * Handle the `currentChanged` signal from the stacked panel.
     */
    TabPanel.prototype._onCurrentChanged = function (sender, args) {
        this.currentChanged.emit(args);
    };
    /**
     * Handle the `widgetRemoved` signal from the stacked panel.
     */
    TabPanel.prototype._onWidgetRemoved = function (sender, args) {
        this._tabs.removeTabAt(args.index);
    };
    /**
     * A signal emitted when the current widget is changed.
     *
     * **See also:** [[currentChanged]]
     */
    TabPanel.currentChangedSignal = new phosphor_signaling_1.Signal();
    /**
     * The property descriptor for the tab attached property.
     *
     * This controls the tab used for a widget in a tab panel.
     *
     * #### Notes
     * If the tab for a widget is changed, the new tab will not be
     * reflected until the widget is re-inserted into the tab panel.
     * However, in-place changes to the tab's properties **will** be
     * reflected.
     *
     * **See also:** [[getTab]], [[setTab]]
     */
    TabPanel.tabProperty = new phosphor_properties_1.Property({
        value: null,
        coerce: function (owner, value) { return value || null; },
    });
    return TabPanel;
})(phosphor_boxpanel_1.BoxPanel);
exports.TabPanel = TabPanel;

},{"./tabbar":32,"phosphor-boxpanel":9,"phosphor-properties":18,"phosphor-signaling":20,"phosphor-stackedpanel":26}],34:[function(require,module,exports){
var css = "/*-----------------------------------------------------------------------------\r\n| Copyright (c) 2014-2015, PhosphorJS Contributors\r\n|\r\n| Distributed under the terms of the BSD 3-Clause License.\r\n|\r\n| The full license is in the file LICENSE, distributed with this software.\r\n|----------------------------------------------------------------------------*/\nbody.p-mod-override-cursor * {\n  cursor: inherit !important;\n}\n"; (require("browserify-css").createStyle(css, { "href": "node_modules/phosphor-tabs/node_modules/phosphor-domutil/lib/index.css"})); module.exports = css;
},{"browserify-css":5}],35:[function(require,module,exports){
arguments[4][11][0].apply(exports,arguments)
},{"./index.css":34,"dup":11,"phosphor-disposable":12}],36:[function(require,module,exports){
var css = "/*-----------------------------------------------------------------------------\r\n| Copyright (c) 2014-2015, PhosphorJS Contributors\r\n|\r\n| Distributed under the terms of the BSD 3-Clause License.\r\n|\r\n| The full license is in the file LICENSE, distributed with this software.\r\n|----------------------------------------------------------------------------*/\n.p-Widget {\n  box-sizing: border-box;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  overflow: hidden;\n  cursor: default;\n}\n.p-Widget.p-mod-hidden {\n  display: none;\n}\n"; (require("browserify-css").createStyle(css, { "href": "node_modules/phosphor-widget/lib/index.css"})); module.exports = css;
},{"browserify-css":5}],37:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./title'));
__export(require('./widget'));
require('./index.css');

},{"./index.css":36,"./title":38,"./widget":39}],38:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var phosphor_properties_1 = require('phosphor-properties');
/**
 * An object which holds data related to a widget title.
 */
var Title = (function () {
    function Title() {
    }
    Object.defineProperty(Title.prototype, "text", {
        /**
         * Get the text for the title.
         *
         * #### Notes
         * This is a pure delegate to the [[textProperty]].
         */
        get: function () {
            return Title.textProperty.get(this);
        },
        /**
         * Set the text for the title.
         *
         * #### Notes
         * This is a pure delegate to the [[textProperty]].
         */
        set: function (value) {
            Title.textProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Title.prototype, "icon", {
        /**
         * Get the icon class for the title.
         *
         * #### Notes
         * This is a pure delegate to the [[iconProperty]].
         */
        get: function () {
            return Title.iconProperty.get(this);
        },
        /**
         * Set the icon class for the title.
         *
         * #### Notes
         * This is a pure delegate to the [[iconProperty]].
         */
        set: function (value) {
            Title.iconProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Title.prototype, "editable", {
        /**
         * Get the editable state for the title.
         *
         * #### Notes
         * This is a pure delegate to the [[editableProperty]].
         */
        get: function () {
            return Title.editableProperty.get(this);
        },
        /**
         * Set the editable state for the title.
         *
         * #### Notes
         * This is a pure delegate to the [[editableProperty]].
         */
        set: function (value) {
            Title.editableProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Title.prototype, "editHandler", {
        /**
         * Get the edit handler for the title.
         *
         * #### Notes
         * This is a pure delegate to the [[editHandlerProperty]].
         */
        get: function () {
            return Title.editHandlerProperty.get(this);
        },
        /**
         * Set the edit handler for the title.
         *
         * #### Notes
         * This is a pure delegate to the [[editHandlerProperty]].
         */
        set: function (value) {
            Title.editHandlerProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Title.prototype, "closable", {
        /**
         * Get the closable state for the title.
         *
         * #### Notes
         * This is a pure delegate to the [[closableProperty]].
         */
        get: function () {
            return Title.closableProperty.get(this);
        },
        /**
         * Set the closable state for the title.
         *
         * #### Notes
         * This is a pure delegate to the [[closableProperty]].
         */
        set: function (value) {
            Title.closableProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Title.prototype, "className", {
        /**
         * Get the extra class name for the title.
         *
         * #### Notes
         * This is a pure delegate to the [[classNameProperty]].
         */
        get: function () {
            return Title.classNameProperty.get(this);
        },
        /**
         * Set the extra class name for the title.
         *
         * #### Notes
         * This is a pure delegate to the [[classNameProperty]].
         */
        set: function (value) {
            Title.classNameProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * The property descriptor for the title text.
     *
     * This will be used as the display text in title contexts.
     *
     * The default value is an empty string.
     *
     * **See also:** [[text]]
     */
    Title.textProperty = new phosphor_properties_1.Property({
        value: '',
    });
    /**
     * The property descriptor for the title icon class.
     *
     * This will be added to the class name of the title icon node.
     *
     * Multiple class names can be separated with whitespace.
     *
     * The default value is an empty string.
     *
     * **See also:** [[icon]]
     */
    Title.iconProperty = new phosphor_properties_1.Property({
        value: '',
    });
    /**
     * The property descriptor for the title editable state.
     *
     * This controls whether the title is editable by the user.
     *
     * The default value is `false`.
     *
     * **See also:** [[editable]]
     */
    Title.editableProperty = new phosphor_properties_1.Property({
        value: false,
    });
    /**
     * The property descriptor for the title edit handler.
     *
     * If the title is user editable, this handler will be invoked when
     * the text is edited by the user. The handler should update its own
     * internal state and then update the title text as appropriate. If
     * this is not provided, the title text will be updated directly.
     *
     * The default value is `null`.
     *
     * **See also:** [[editHandler]]
     */
    Title.editHandlerProperty = new phosphor_properties_1.Property({
        value: null,
    });
    /**
     * The property descriptor for the title closable state.
     *
     * This controls whether the title area shows a close icon.
     *
     * The default value is `false`.
     *
     * **See also:** [[closable]]
     */
    Title.closableProperty = new phosphor_properties_1.Property({
        value: false,
    });
    /**
     * The property descriptor for the title extra class name.
     *
     * This will be added to the class name of the title area node.
     *
     * Multiple class names can be separated with whitespace.
     *
     * The default value is an empty string.
     *
     * **See also:** [[className]]
     */
    Title.classNameProperty = new phosphor_properties_1.Property({
        value: '',
    });
    return Title;
})();
exports.Title = Title;

},{"phosphor-properties":18}],39:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var arrays = require('phosphor-arrays');
var phosphor_messaging_1 = require('phosphor-messaging');
var phosphor_nodewrapper_1 = require('phosphor-nodewrapper');
var phosphor_properties_1 = require('phosphor-properties');
var phosphor_signaling_1 = require('phosphor-signaling');
var title_1 = require('./title');
/**
 * The class name added to Widget instances.
 */
var WIDGET_CLASS = 'p-Widget';
/**
 * The class name added to hidden widgets.
 */
var HIDDEN_CLASS = 'p-mod-hidden';
/**
 * The base class of the Phosphor widget hierarchy.
 *
 * #### Notes
 * This class will typically be subclassed in order to create a useful
 * widget. However, it can be used by itself to host foreign content
 * such as a React or Bootstrap component. Simply instantiate an empty
 * widget and add the content directly to its `.node`. The widget and
 * its content can then be embedded within a Phosphor widget hierarchy.
 */
var Widget = (function (_super) {
    __extends(Widget, _super);
    /**
     * Construct a new widget.
     */
    function Widget() {
        _super.call(this);
        this._flags = 0;
        this._parent = null;
        this._children = [];
        this.addClass(WIDGET_CLASS);
    }
    /**
     * Attach a widget to a host DOM node.
     *
     * @param widget - The widget to attach to the DOM.
     *
     * @param host - The node to use as the widget's host.
     *
     * @throws Will throw an error if the widget is not a root widget,
     *   if the widget is already attached to the DOM, or if the host
     *   is not attached to the DOM.
     *
     * #### Notes
     * The function should be used in lieu of manual DOM attachment. It
     * ensures that an `'after-attach'` message is properly dispatched
     * to the widget hierarchy.
     */
    Widget.attach = function (widget, host) {
        if (widget.parent) {
            throw new Error('only a root widget can be attached to the DOM');
        }
        if (widget.isAttached || document.body.contains(widget.node)) {
            throw new Error('widget is already attached to the DOM');
        }
        if (!document.body.contains(host)) {
            throw new Error('host is not attached to the DOM');
        }
        host.appendChild(widget.node);
        phosphor_messaging_1.sendMessage(widget, Widget.MsgAfterAttach);
    };
    /**
     * Detach a widget from its host DOM node.
     *
     * @param widget - The widget to detach from the DOM.
     *
     * @throws Will throw an error if the widget is not a root widget,
     *   or if the widget is not attached to the DOM.
     *
     * #### Notes
     * The function should be used in lieu of manual DOM detachment. It
     * ensures that a `'before-detach'` message is properly dispatched
     * to the widget hierarchy.
     */
    Widget.detach = function (widget) {
        if (widget.parent) {
            throw new Error('only a root widget can be detached from the DOM');
        }
        if (!widget.isAttached || !document.body.contains(widget.node)) {
            throw new Error('widget is not attached to the DOM');
        }
        phosphor_messaging_1.sendMessage(widget, Widget.MsgBeforeDetach);
        widget.node.parentNode.removeChild(widget.node);
    };
    /**
     * Dispose of the widget and its descendant widgets.
     *
     * #### Notes
     * It is generally unsafe to use the widget after it has been
     * disposed.
     *
     * If this method is called more than once, all calls made after
     * the first will be a no-op.
     */
    Widget.prototype.dispose = function () {
        if (this.isDisposed) {
            return;
        }
        this._flags |= WidgetFlag.IsDisposed;
        this.disposed.emit(void 0);
        if (this._parent) {
            this._parent.removeChild(this);
        }
        else if (this.isAttached) {
            Widget.detach(this);
        }
        while (this._children.length > 0) {
            var child = this._children.pop();
            child._parent = null;
            child.dispose();
        }
        phosphor_signaling_1.clearSignalData(this);
        phosphor_messaging_1.clearMessageData(this);
        phosphor_properties_1.clearPropertyData(this);
    };
    Object.defineProperty(Widget.prototype, "disposed", {
        /**
         * A signal emitted when the widget is disposed.
         *
         * #### Notes
         * This is a pure delegate to the [[disposedSignal]].
         */
        get: function () {
            return Widget.disposedSignal.bind(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "isAttached", {
        /**
         * Test whether the widget's node is attached to the DOM.
         *
         * #### Notes
         * This is a read-only property which is always safe to access.
         *
         * **See also:** [[attach]], [[detach]]
         */
        get: function () {
            return (this._flags & WidgetFlag.IsAttached) !== 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "isDisposed", {
        /**
         * Test whether the widget has been disposed.
         *
         * #### Notes
         * This is a read-only property which is always safe to access.
         *
         * **See also:** [[disposed]]
         */
        get: function () {
            return (this._flags & WidgetFlag.IsDisposed) !== 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "isVisible", {
        /**
         * Test whether the widget is visible.
         *
         * #### Notes
         * A widget is visible when it is attached to the DOM, is not
         * explicitly hidden, and has no explicitly hidden ancestors.
         *
         * This is a read-only property which is always safe to access.
         *
         * **See also:** [[hidden]]
         */
        get: function () {
            return (this._flags & WidgetFlag.IsVisible) !== 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "hidden", {
        /**
         * Get whether the widget is explicitly hidden.
         *
         * #### Notes
         * This is a pure delegate to the [[hiddenProperty]].
         *
         * **See also:** [[isVisible]]
         */
        get: function () {
            return Widget.hiddenProperty.get(this);
        },
        /**
         * Set whether the widget is explicitly hidden.
         *
         * #### Notes
         * This is a pure delegate to the [[hiddenProperty]].
         *
         * **See also:** [[isVisible]]
         */
        set: function (value) {
            Widget.hiddenProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "title", {
        /**
         * Get the title data object for the widget.
         *
         * #### Notes
         * The title data is used by some container widgets when displaying
         * the widget along with a title, such as a tab panel or dock panel.
         *
         * Not all widgets will make use of the title data, so it is created
         * on-demand the first time it is accessed.
         */
        get: function () {
            return getTitle(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "parent", {
        /**
         * Get the parent of the widget.
         *
         * #### Notes
         * This will be `null` if the widget does not have a parent.
         */
        get: function () {
            return this._parent;
        },
        /**
         * Set the parent of the widget.
         *
         * @throws Will throw an error if the widget is the parent.
         *
         * #### Notes
         * If the specified parent is the current parent, this is a no-op.
         *
         * If the specified parent is `null`, this is equivalent to the
         * expression `widget.parent.removeChild(widget)`, otherwise it
         * is equivalent to the expression `parent.addChild(widget)`.
         *
         * **See also:** [[addChild]], [[insertChild]], [[removeChild]]
         */
        set: function (parent) {
            if (parent && parent !== this._parent) {
                parent.addChild(this);
            }
            else if (!parent && this._parent) {
                this._parent.removeChild(this);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "children", {
        /**
         * Get a shallow copy of the array of child widgets.
         *
         * #### Notes
         * When only iterating over the children, it can be faster to use
         * the child query methods, which do not perform a copy.
         *
         * **See also:** [[childCount]], [[childAt]]
         */
        get: function () {
            return this._children.slice();
        },
        /**
         * Set the children of the widget.
         *
         * #### Notes
         * This will clear the current child widgets and add the specified
         * child widgets. Depending on the desired outcome, it can be more
         * efficient to use one of the child manipulation methods.
         *
         * **See also:** [[addChild]], [[insertChild]], [[removeChild]]
         */
        set: function (children) {
            var _this = this;
            this.clearChildren();
            children.forEach(function (child) { _this.addChild(child); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "childCount", {
        /**
         * Get the number of children of the widget.
         *
         * #### Notes
         * This is a read-only property.
         *
         * **See also:** [[children]], [[childAt]]
         */
        get: function () {
            return this._children.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Get the child widget at a specific index.
     *
     * @param index - The index of the child of interest.
     *
     * @returns The child widget at the specified index, or `undefined`
     *  if the index is out of range.
     *
     * **See also:** [[childCount]], [[childIndex]]
     */
    Widget.prototype.childAt = function (index) {
        return this._children[index | 0];
    };
    /**
     * Get the index of a specific child widget.
     *
     * @param child - The child widget of interest.
     *
     * @returns The index of the specified child widget, or `-1` if
     *   the widget is not a child of this widget.
     *
     * **See also:** [[childCount]], [[childAt]]
     */
    Widget.prototype.childIndex = function (child) {
        return this._children.indexOf(child);
    };
    /**
     * Add a child widget to the end of the widget's children.
     *
     * @param child - The child widget to add to this widget.
     *
     * @returns The new index of the child.
     *
     * @throws Will throw an error if a widget is added to itself.
     *
     * #### Notes
     * The child will be automatically removed from its current parent
     * before being added to this widget.
     *
     * **See also:** [[insertChild]], [[moveChild]]
     */
    Widget.prototype.addChild = function (child) {
        return this.insertChild(this._children.length, child);
    };
    /**
     * Insert a child widget at a specific index.
     *
     * @param index - The target index for the widget. This will be
     *   clamped to the bounds of the children.
     *
     * @param child - The child widget to insert into the widget.
     *
     * @returns The new index of the child.
     *
     * @throws Will throw an error if a widget is inserted into itself.
     *
     * #### Notes
     * The child will be automatically removed from its current parent
     * before being added to this widget.
     *
     * **See also:** [[addChild]], [[moveChild]]
     */
    Widget.prototype.insertChild = function (index, child) {
        if (child === this) {
            throw new Error('invalid child widget');
        }
        if (child._parent) {
            child._parent.removeChild(child);
        }
        else if (child.isAttached) {
            Widget.detach(child);
        }
        child._parent = this;
        var i = arrays.insert(this._children, index, child);
        phosphor_messaging_1.sendMessage(this, new ChildMessage('child-added', child, -1, i));
        return i;
    };
    /**
     * Move a child widget from one index to another.
     *
     * @param fromIndex - The index of the child of interest.
     *
     * @param toIndex - The target index for the child.
     *
     * @returns 'true' if the child was moved, or `false` if either
     *   of the given indices are out of range.
     *
     * #### Notes
     * This method can be more efficient than re-inserting an existing
     * child, as some widgets may be able to optimize child moves and
     * avoid making unnecessary changes to the DOM.
     *
     * **See also:** [[addChild]], [[insertChild]]
     */
    Widget.prototype.moveChild = function (fromIndex, toIndex) {
        var i = fromIndex | 0;
        var j = toIndex | 0;
        if (!arrays.move(this._children, i, j)) {
            return false;
        }
        if (i !== j) {
            var child = this._children[j];
            phosphor_messaging_1.sendMessage(this, new ChildMessage('child-moved', child, i, j));
        }
        return true;
    };
    /**
     * Remove the child widget at a specific index.
     *
     * @param index - The index of the child of interest.
     *
     * @returns The removed child widget, or `undefined` if the index
     *   is out of range.
     *
     * **See also:** [[removeChild]], [[clearChildren]]
     */
    Widget.prototype.removeChildAt = function (index) {
        var i = index | 0;
        var child = arrays.removeAt(this._children, i);
        if (child) {
            child._parent = null;
            phosphor_messaging_1.sendMessage(this, new ChildMessage('child-removed', child, i, -1));
        }
        return child;
    };
    /**
     * Remove a specific child widget from this widget.
     *
     * @param child - The child widget of interest.
     *
     * @returns The index which the child occupied, or `-1` if the
     *   child is not a child of this widget.
     *
     * **See also:** [[removeChildAt]], [[clearChildren]]
     */
    Widget.prototype.removeChild = function (child) {
        var i = this.childIndex(child);
        if (i !== -1)
            this.removeChildAt(i);
        return i;
    };
    /**
     * Remove all child widgets from the widget.
     *
     * #### Notes
     * This will continue to remove children until the `childCount`
     * reaches zero. It is therefore possible to enter an infinite
     * loop if a message handler causes a child widget to be added
     * in response to one being removed.
     *
     * **See also:** [[removeChild]], [[removeChildAt]]
     */
    Widget.prototype.clearChildren = function () {
        while (this.childCount > 0) {
            this.removeChildAt(this.childCount - 1);
        }
    };
    /**
     * Dispatch an `'update-request'` message to the widget.
     *
     * @param immediate - Whether to dispatch the message immediately
     *   (`true`) or in the future (`false`). The default is `false`.
     *
     * **See also:** [[MsgUpdateRequest]], [[onUpdateRequest]]
     */
    Widget.prototype.update = function (immediate) {
        if (immediate === void 0) { immediate = false; }
        if (immediate) {
            phosphor_messaging_1.sendMessage(this, Widget.MsgUpdateRequest);
        }
        else {
            phosphor_messaging_1.postMessage(this, Widget.MsgUpdateRequest);
        }
    };
    /**
     * Dispatch a `'close-request'` message to the widget.
     *
     * @param immediate - Whether to dispatch the message immediately
     *   (`true`) or in the future (`false`). The default is `false`.
     *
     * **See also:** [[MsgCloseRequest]], [[onCloseRequest]]
     */
    Widget.prototype.close = function (immediate) {
        if (immediate === void 0) { immediate = false; }
        if (immediate) {
            phosphor_messaging_1.sendMessage(this, Widget.MsgCloseRequest);
        }
        else {
            phosphor_messaging_1.postMessage(this, Widget.MsgCloseRequest);
        }
    };
    /**
     * Process a message sent to the widget.
     *
     * @param msg - The message sent to the widget.
     *
     * #### Notes
     * Subclasses may reimplement this method as needed.
     */
    Widget.prototype.processMessage = function (msg) {
        switch (msg.type) {
            case 'resize':
                this.onResize(msg);
                break;
            case 'update-request':
                this.onUpdateRequest(msg);
                break;
            case 'layout-request':
                this.onLayoutRequest(msg);
                break;
            case 'child-added':
                this.onChildAdded(msg);
                break;
            case 'child-removed':
                this.onChildRemoved(msg);
                break;
            case 'child-moved':
                this.onChildMoved(msg);
                break;
            case 'after-show':
                this._flags |= WidgetFlag.IsVisible;
                this.onAfterShow(msg);
                sendToShown(this._children, msg);
                break;
            case 'before-hide':
                this.onBeforeHide(msg);
                sendToShown(this._children, msg);
                this._flags &= ~WidgetFlag.IsVisible;
                break;
            case 'after-attach':
                var visible = !this.hidden && (!this._parent || this._parent.isVisible);
                if (visible)
                    this._flags |= WidgetFlag.IsVisible;
                this._flags |= WidgetFlag.IsAttached;
                this.onAfterAttach(msg);
                sendToAll(this._children, msg);
                break;
            case 'before-detach':
                this.onBeforeDetach(msg);
                sendToAll(this._children, msg);
                this._flags &= ~WidgetFlag.IsVisible;
                this._flags &= ~WidgetFlag.IsAttached;
                break;
            case 'child-shown':
                this.onChildShown(msg);
                break;
            case 'child-hidden':
                this.onChildHidden(msg);
                break;
            case 'close-request':
                this.onCloseRequest(msg);
                break;
        }
    };
    /**
     * Compress a message posted to the widget.
     *
     * @param msg - The message posted to the widget.
     *
     * @param pending - The queue of pending messages for the widget.
     *
     * @returns `true` if the message was compressed and should be
     *   dropped, or `false` if the message should be enqueued for
     *   delivery as normal.
     *
     * #### Notes
     * The default implementation compresses the following messages:
     * `'update-request'`, `'layout-request'`, and `'close-request'`.
     *
     * Subclasses may reimplement this method as needed.
     */
    Widget.prototype.compressMessage = function (msg, pending) {
        switch (msg.type) {
            case 'update-request':
            case 'layout-request':
            case 'close-request':
                return pending.some(function (other) { return other.type === msg.type; });
        }
        return false;
    };
    /**
     * A message handler invoked on a `'child-added'` message.
     *
     * #### Notes
     * The default implementation adds the child node to the widget
     * node at the proper location and dispatches an `'after-attach'`
     * message if appropriate.
     *
     * Subclasses may reimplement this method to control how the child
     * node is added, but they must dispatch an `'after-attach'` message
     * if appropriate.
     */
    Widget.prototype.onChildAdded = function (msg) {
        var next = this.childAt(msg.currentIndex + 1);
        this.node.insertBefore(msg.child.node, next && next.node);
        if (this.isAttached)
            phosphor_messaging_1.sendMessage(msg.child, Widget.MsgAfterAttach);
    };
    /**
     * A message handler invoked on a `'child-removed'` message.
     *
     * #### Notes
     * The default implementation removes the child node from the widget
     * node and dispatches a `'before-detach'` message if appropriate.
     *
     * Subclasses may reimplement this method to control how the child
     * node is removed, but they must  dispatch a `'before-detach'`
     * message if appropriate.
     */
    Widget.prototype.onChildRemoved = function (msg) {
        if (this.isAttached)
            phosphor_messaging_1.sendMessage(msg.child, Widget.MsgBeforeDetach);
        this.node.removeChild(msg.child.node);
    };
    /**
     * A message handler invoked on a `'child-moved'` message.
     *
     * #### Notes
     * The default implementation moves the child node to the proper
     * location in the widget node and dispatches a `'before-detach'`
     * and `'after-attach'` message if appropriate.
     *
     * Subclasses may reimplement this method to control how the child
     * node is moved, but they must dispatch a `'before-detach'` and
     * `'after-attach'` message if appropriate.
     */
    Widget.prototype.onChildMoved = function (msg) {
        if (this.isAttached)
            phosphor_messaging_1.sendMessage(msg.child, Widget.MsgBeforeDetach);
        var next = this.childAt(msg.currentIndex + 1);
        this.node.insertBefore(msg.child.node, next && next.node);
        if (this.isAttached)
            phosphor_messaging_1.sendMessage(msg.child, Widget.MsgAfterAttach);
    };
    /**
     * A message handler invoked on a `'resize'` message.
     *
     * #### Notes
     * The default implementation of this handler sends an [[UnknownSize]]
     * resize message to each child. This ensures that the resize messages
     * propagate through all widgets in the hierarchy.
     *
     * Subclasses may reimplement this method as needed, but they must
     * dispatch `'resize'` messages to their children as appropriate.
     */
    Widget.prototype.onResize = function (msg) {
        sendToAll(this._children, ResizeMessage.UnknownSize);
    };
    /**
     * A message handler invoked on an `'update-request'` message.
     *
     * #### Notes
     * The default implementation of this handler sends an [[UnknownSize]]
     * resize message to each child. This ensures that the resize messages
     * propagate through all widgets in the hierarchy.
     *
     * Subclass may reimplement this method as needed, but they should
     * dispatch `'resize'` messages to their children as appropriate.
     *
     * **See also:** [[update]], [[MsgUpdateRequest]]
     */
    Widget.prototype.onUpdateRequest = function (msg) {
        sendToAll(this._children, ResizeMessage.UnknownSize);
    };
    /**
     * A message handler invoked on a `'close-request'` message.
     *
     * #### Notes
     * The default implementation of this handler will unparent or detach
     * the widget as appropriate. Subclasses may reimplement this handler
     * for custom close behavior.
     *
     * **See also:** [[close]], [[MsgCloseRequest]]
     */
    Widget.prototype.onCloseRequest = function (msg) {
        if (this._parent) {
            this._parent.removeChild(this);
        }
        else if (this.isAttached) {
            Widget.detach(this);
        }
    };
    /**
     * A message handler invoked on a `'layout-request'` message.
     *
     * The default implementation of this handler is a no-op.
     *
     * **See also:** [[MsgLayoutRequest]]
     */
    Widget.prototype.onLayoutRequest = function (msg) { };
    /**
     * A message handler invoked on an `'after-show'` message.
     *
     * The default implementation of this handler is a no-op.
     *
     * **See also:** [[MsgAfterShow]]
     */
    Widget.prototype.onAfterShow = function (msg) { };
    /**
     * A message handler invoked on a `'before-hide'` message.
     *
     * The default implementation of this handler is a no-op.
     *
     * **See also:** [[MsgBeforeHide]]
     */
    Widget.prototype.onBeforeHide = function (msg) { };
    /**
     * A message handler invoked on an `'after-attach'` message.
     *
     * The default implementation of this handler is a no-op.
     *
     * **See also:** [[MsgAfterAttach]]
     */
    Widget.prototype.onAfterAttach = function (msg) { };
    /**
     * A message handler invoked on a `'before-detach'` message.
     *
     * The default implementation of this handler is a no-op.
     *
     * **See also:** [[MsgBeforeDetach]]
     */
    Widget.prototype.onBeforeDetach = function (msg) { };
    /**
     * A message handler invoked on a `'child-shown'` message.
     *
     * The default implementation of this handler is a no-op.
     */
    Widget.prototype.onChildShown = function (msg) { };
    /**
     * A message handler invoked on a `'child-hidden'` message.
     *
     * The default implementation of this handler is a no-op.
     */
    Widget.prototype.onChildHidden = function (msg) { };
    /**
     * A singleton `'update-request'` message.
     *
     * #### Notes
     * This message can be dispatched to supporting widgets in order to
     * update their content. Not all widgets will respond to messages of
     * this type.
     *
     * This message is typically used to update the position and size of
     * a widget's children, or to update a widget's content to reflect the
     * current state of the widget.
     *
     * Messages of this type are compressed by default.
     *
     * **See also:** [[update]], [[onUpdateRequest]]
     */
    Widget.MsgUpdateRequest = new phosphor_messaging_1.Message('update-request');
    /**
     * A singleton `'layout-request'` message.
     *
     * #### Notes
     * This message can be dispatched to supporting widgets in order to
     * update their layout. Not all widgets will respond to messages of
     * this type.
     *
     * This message is typically used to update the size contraints of
     * a widget and to update the position and size of its children.
     *
     * Messages of this type are compressed by default.
     *
     * **See also:** [[onLayoutRequest]]
     */
    Widget.MsgLayoutRequest = new phosphor_messaging_1.Message('layout-request');
    /**
     * A singleton `'close-request'` message.
     *
     * #### Notes
     * This message should be dispatched to a widget when it should close
     * and remove itself from the widget hierarchy.
     *
     * Messages of this type are compressed by default.
     *
     * **See also:** [[close]], [[onCloseRequest]]
     */
    Widget.MsgCloseRequest = new phosphor_messaging_1.Message('close-request');
    /**
     * A singleton `'after-show'` message.
     *
     * #### Notes
     * This message is sent to a widget when it becomes visible.
     *
     * This message is **not** sent when the widget is attached.
     *
     * **See also:** [[isVisible]], [[onAfterShow]]
     */
    Widget.MsgAfterShow = new phosphor_messaging_1.Message('after-show');
    /**
     * A singleton `'before-hide'` message.
     *
     * #### Notes
     * This message is sent to a widget when it becomes not-visible.
     *
     * This message is **not** sent when the widget is detached.
     *
     * **See also:** [[isVisible]], [[onBeforeHide]]
     */
    Widget.MsgBeforeHide = new phosphor_messaging_1.Message('before-hide');
    /**
     * A singleton `'after-attach'` message.
     *
     * #### Notes
     * This message is sent to a widget after it is attached to the DOM.
     *
     * **See also:** [[isAttached]], [[onAfterAttach]]
     */
    Widget.MsgAfterAttach = new phosphor_messaging_1.Message('after-attach');
    /**
     * A singleton `'before-detach'` message.
     *
     * #### Notes
     * This message is sent to a widget before it is detached from the DOM.
     *
     * **See also:** [[isAttached]], [[onBeforeDetach]]
     */
    Widget.MsgBeforeDetach = new phosphor_messaging_1.Message('before-detach');
    /**
     * A signal emitted when the widget is disposed.
     *
     * **See also:** [[disposed]], [[isDisposed]]
     */
    Widget.disposedSignal = new phosphor_signaling_1.Signal();
    /**
     * A property descriptor which controls the hidden state of a widget.
     *
     * #### Notes
     * This property controls whether a widget is explicitly hidden.
     *
     * Hiding a widget will cause the widget and all of its descendants
     * to become not-visible.
     *
     * This property will toggle the presence of `'p-mod-hidden'` on a
     * widget. It will also dispatch `'after-show'` and `'before-hide'`
     * messages as appropriate.
     *
     * The default property value is `false`.
     *
     * **See also:** [[hidden]], [[isVisible]]
     */
    Widget.hiddenProperty = new phosphor_properties_1.Property({
        value: false,
        changed: onHiddenChanged,
    });
    return Widget;
})(phosphor_nodewrapper_1.NodeWrapper);
exports.Widget = Widget;
/**
 * A message class for child-related messages.
 */
var ChildMessage = (function (_super) {
    __extends(ChildMessage, _super);
    /**
     * Construct a new child message.
     *
     * @param type - The message type.
     *
     * @param child - The child widget for the message.
     *
     * @param previousIndex - The previous index of the child, if known.
     *   The default index is `-1` and indicates an unknown index.
     *
     * @param currentIndex - The current index of the child, if known.
     *   The default index is `-1` and indicates an unknown index.
     */
    function ChildMessage(type, child, previousIndex, currentIndex) {
        if (previousIndex === void 0) { previousIndex = -1; }
        if (currentIndex === void 0) { currentIndex = -1; }
        _super.call(this, type);
        this._child = child;
        this._currentIndex = currentIndex;
        this._previousIndex = previousIndex;
    }
    Object.defineProperty(ChildMessage.prototype, "child", {
        /**
         * The child widget for the message.
         *
         * #### Notes
         * This is a read-only property.
         */
        get: function () {
            return this._child;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChildMessage.prototype, "currentIndex", {
        /**
         * The current index of the child.
         *
         * #### Notes
         * This will be `-1` if the current index is unknown.
         *
         * This is a read-only property.
         */
        get: function () {
            return this._currentIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChildMessage.prototype, "previousIndex", {
        /**
         * The previous index of the child.
         *
         * #### Notes
         * This will be `-1` if the previous index is unknown.
         *
         * This is a read-only property.
         */
        get: function () {
            return this._previousIndex;
        },
        enumerable: true,
        configurable: true
    });
    return ChildMessage;
})(phosphor_messaging_1.Message);
exports.ChildMessage = ChildMessage;
/**
 * A message class for `'resize'` messages.
 */
var ResizeMessage = (function (_super) {
    __extends(ResizeMessage, _super);
    /**
     * Construct a new resize message.
     *
     * @param width - The **offset width** of the widget, or `-1` if
     *   the width is not known.
     *
     * @param height - The **offset height** of the widget, or `-1` if
     *   the height is not known.
     */
    function ResizeMessage(width, height) {
        _super.call(this, 'resize');
        this._width = width;
        this._height = height;
    }
    Object.defineProperty(ResizeMessage.prototype, "width", {
        /**
         * The offset width of the widget.
         *
         * #### Notes
         * This will be `-1` if the width is unknown.
         *
         * This is a read-only property.
         */
        get: function () {
            return this._width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResizeMessage.prototype, "height", {
        /**
         * The offset height of the widget.
         *
         * #### Notes
         * This will be `-1` if the height is unknown.
         *
         * This is a read-only property.
         */
        get: function () {
            return this._height;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * A singleton `'resize'` message with an unknown size.
     */
    ResizeMessage.UnknownSize = new ResizeMessage(-1, -1);
    return ResizeMessage;
})(phosphor_messaging_1.Message);
exports.ResizeMessage = ResizeMessage;
/**
 * An enum of widget bit flags.
 */
var WidgetFlag;
(function (WidgetFlag) {
    /**
     * The widget is attached to the DOM.
     */
    WidgetFlag[WidgetFlag["IsAttached"] = 1] = "IsAttached";
    /**
     * The widget is visible.
     */
    WidgetFlag[WidgetFlag["IsVisible"] = 2] = "IsVisible";
    /**
     * The widget has been disposed.
     */
    WidgetFlag[WidgetFlag["IsDisposed"] = 4] = "IsDisposed";
})(WidgetFlag || (WidgetFlag = {}));
/**
 * A private attached property for the title data for a widget.
 */
var titleProperty = new phosphor_properties_1.Property({
    create: function () { return new title_1.Title(); },
});
/**
 * Lookup the title data for the given widget.
 */
function getTitle(widget) {
    return titleProperty.get(widget);
}
/**
 * The change handler for the [[hiddenProperty]].
 */
function onHiddenChanged(owner, old, hidden) {
    if (hidden) {
        if (owner.isAttached && (!owner.parent || owner.parent.isVisible)) {
            phosphor_messaging_1.sendMessage(owner, Widget.MsgBeforeHide);
        }
        owner.addClass(HIDDEN_CLASS);
        if (owner.parent) {
            phosphor_messaging_1.sendMessage(owner.parent, new ChildMessage('child-hidden', owner));
        }
    }
    else {
        owner.removeClass(HIDDEN_CLASS);
        if (owner.isAttached && (!owner.parent || owner.parent.isVisible)) {
            phosphor_messaging_1.sendMessage(owner, Widget.MsgAfterShow);
        }
        if (owner.parent) {
            phosphor_messaging_1.sendMessage(owner.parent, new ChildMessage('child-shown', owner));
        }
    }
}
/**
 * Send a message to all widgets in an array.
 */
function sendToAll(widgets, msg) {
    widgets.forEach(function (w) { phosphor_messaging_1.sendMessage(w, msg); });
}
/**
 * Send a message to all non-hidden widgets in an array.
 */
function sendToShown(widgets, msg) {
    widgets.forEach(function (w) { if (!w.hidden)
        phosphor_messaging_1.sendMessage(w, msg); });
}

},{"./title":38,"phosphor-arrays":6,"phosphor-messaging":16,"phosphor-nodewrapper":17,"phosphor-properties":18,"phosphor-signaling":20}]},{},[2]);
