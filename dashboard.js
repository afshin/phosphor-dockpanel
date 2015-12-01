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
var phosphor_boxpanel_1 = require('phosphor-boxpanel');
var phosphor_dragdrop_1 = require('phosphor-dragdrop');
var phosphor_splitpanel_1 = require('phosphor-splitpanel');
var phosphor_widget_1 = require('phosphor-widget');
var index_1 = require('../lib/index');
require('./dashboard.css');
var INSTRUCTIONS = 'Drag items from the left side onto the right-hand panel.';
var DRAG_THRESHOLD = 5;
var ListItem = (function (_super) {
    __extends(ListItem, _super);
    function ListItem(color, icon, label) {
        _super.call(this);
        this.color = color;
        this.icon = icon;
        this.label = label;
        this.creationStatus = null;
        this.dragStatus = null;
        this.factory = null;
        this.proposedAction = null;
        this.supportedActions = null;
        this._draggable = false;
        this._dragData = null;
        this._drag = null;
        this.node.querySelector('i').classList.add('fa', "fa-" + icon);
        this.node.querySelector('span').textContent = label;
    }
    ListItem.createNode = function () {
        var node = document.createElement('div');
        var span = document.createElement('span');
        var space = document.createTextNode(' ');
        var icon = document.createElement('i');
        node.className = 'list-item';
        node.appendChild(icon);
        node.appendChild(space);
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
                this.addClass('draggable');
                this.node.addEventListener('mousedown', this);
            }
            else {
                this.removeClass('draggable');
                this._releaseMouse();
                if (this._drag) {
                    this._drag.dispose();
                    this._drag = null;
                }
                this.node.removeEventListener('mousedown', this);
            }
        },
        enumerable: true,
        configurable: true
    });
    ListItem.prototype.dispose = function () {
        this.draggable = false;
        _super.prototype.dispose.call(this);
    };
    ListItem.prototype.handleEvent = function (event) {
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
    ListItem.prototype._evtMouseDown = function (event) {
        if (event.button !== 0) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        this._dragData = { pressX: event.clientX, pressY: event.clientY };
        document.addEventListener('mouseup', this, true);
        document.addEventListener('mousemove', this, true);
    };
    ListItem.prototype._evtMouseMove = function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (this._drag) {
            return;
        }
        var data = this._dragData;
        var dx = Math.abs(event.clientX - data.pressX);
        var dy = Math.abs(event.clientY - data.pressY);
        if (dx < DRAG_THRESHOLD && dy < DRAG_THRESHOLD) {
            return;
        }
        this._drag = new phosphor_dragdrop_1.Drag({
            dragImage: this.node.cloneNode(true),
            mimeData: new phosphor_dragdrop_1.MimeData(),
            supportedActions: this.supportedActions,
            proposedAction: this.proposedAction
        });
        this._releaseMouse();
        this._drag.mimeData.setData(index_1.FACTORY_MIME, this.factory);
        this._drag.start(event.clientX, event.clientY);
        Status.update(this.dragStatus, true);
    };
    ListItem.prototype._evtMouseUp = function (event) {
        if (event.button !== 0) {
            return;
        }
        if (!this._drag) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        this._drag.dispose();
        this._drag = null;
        this._releaseMouse();
    };
    ListItem.prototype._releaseMouse = function () {
        Status.update('');
        document.removeEventListener('mouseup', this, true);
        document.removeEventListener('mousemove', this, true);
    };
    return ListItem;
})(phosphor_widget_1.Widget);
var Plot = (function (_super) {
    __extends(Plot, _super);
    function Plot(item, plot) {
        _super.call(this);
        this._item = null;
        this._item = item;
        this.addClass('dashboard-content');
        this.addClass(item.icon);
        this.node.appendChild(plot);
    }
    Plot.prototype.onCloseRequest = function (msg) {
        _super.prototype.onCloseRequest.call(this, msg);
        // Reactivate the list item.
        this._item.draggable = true;
        Status.update("Reactivated " + this._item.label);
    };
    return Plot;
})(phosphor_widget_1.Widget);
var Status;
(function (Status) {
    var DURATION = 1500;
    var IDLE_MESSAGE = 'Idle';
    var status = null;
    var timeout = null;
    function create() {
        status = new phosphor_widget_1.Widget();
        status.addClass('status');
        status.node.textContent = IDLE_MESSAGE;
        phosphor_boxpanel_1.BoxPanel.setSizeBasis(status, 20);
        phosphor_boxpanel_1.BoxPanel.setStretch(status, 0);
        return status;
    }
    Status.create = create;
    function update(text, permanent) {
        status.node.textContent = text || IDLE_MESSAGE;
        if (permanent) {
            clearTimeout(timeout);
            return;
        }
        timeout = setTimeout(function () { return status.node.textContent = IDLE_MESSAGE; }, DURATION);
    }
    Status.update = update;
})(Status || (Status = {}));
function plotFactory(item, node) {
    return function () {
        var plot = new Plot(item, node);
        item.draggable = false;
        plot.title.text = item.label;
        plot.title.closable = true;
        Status.update(item.creationStatus);
        return plot;
    };
}
function createDock() {
    var dock = new index_1.DockPanel();
    dock.addClass('dock');
    return dock;
}
function createInstructions() {
    var instructions = new phosphor_widget_1.Widget();
    var lightbulb = document.createElement('i');
    lightbulb.classList.add('fa', 'fa-lightbulb-o');
    instructions.addClass('instructions');
    instructions.node.appendChild(lightbulb);
    instructions.node.appendChild(document.createTextNode(" " + INSTRUCTIONS));
    phosphor_boxpanel_1.BoxPanel.setSizeBasis(instructions, 20);
    phosphor_boxpanel_1.BoxPanel.setStretch(instructions, 0);
    return instructions;
}
function createList() {
    var panel = new phosphor_widget_1.Panel();
    panel.addClass('list');
    return panel;
}
function createPanel(instructions, list, dock, status) {
    var panel = new phosphor_boxpanel_1.BoxPanel();
    var subpanel = new phosphor_splitpanel_1.SplitPanel();
    subpanel.orientation = phosphor_splitpanel_1.SplitPanel.Horizontal;
    subpanel.children.assign([list, dock]);
    subpanel.setSizes([0, 1]);
    panel.children.assign([instructions, subpanel, status]);
    panel.spacing = 0;
    panel.direction = phosphor_boxpanel_1.BoxPanel.TopToBottom;
    panel.id = 'main';
    return panel;
}
function populateList(list, dock) {
    var plots = document.querySelectorAll('div.bk-plot');
    var specs = [
        {
            color: 'yellow',
            label: 'Elements',
            icon: 'table',
            creationStatus: 'Created periodic table of elements',
            dragStatus: 'Dragging periodic table of elements'
        },
        {
            color: 'blue',
            label: 'Linked 1',
            icon: 'line-chart',
            creationStatus: 'Created first linked plot',
            dragStatus: 'Dragging first linked plot'
        },
        {
            color: 'blue',
            label: 'Linked 2',
            icon: 'line-chart',
            creationStatus: 'Created second linked plot',
            dragStatus: 'Dragging second linked plot'
        },
        {
            color: 'blue',
            label: 'Linked 3',
            icon: 'line-chart',
            creationStatus: 'Created third linked plot',
            dragStatus: 'Dragging third linked plot'
        }
    ];
    for (var index = 0; index < 4; ++index) {
        var plot = document.body.removeChild(plots[index]);
        var _a = specs[index], color = _a.color, label = _a.label, icon = _a.icon, creationStatus = _a.creationStatus, dragStatus = _a.dragStatus;
        var item = new ListItem(color, icon, label);
        item.addClass(color);
        item.draggable = true;
        item.factory = plotFactory(item, plot);
        item.creationStatus = creationStatus;
        item.dragStatus = dragStatus;
        item.supportedActions = phosphor_dragdrop_1.DropActions.Move;
        item.proposedAction = phosphor_dragdrop_1.DropAction.Move;
        list.children.add(item);
    }
}
function main() {
    document.body.style.visibility = '';
    var instructions = createInstructions();
    var list = createList();
    var dock = createDock();
    var status = Status.create();
    var panel = createPanel(instructions, list, dock, status);
    populateList(list, dock);
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
