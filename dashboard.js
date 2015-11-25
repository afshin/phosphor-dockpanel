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
    document.body.style.visibility = '';
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
    var check = function () {
        if (document.querySelectorAll('div.bk-plot').length !== 4) {
            return setTimeout(check, 250);
        }
        main();
    };
    check();
});
