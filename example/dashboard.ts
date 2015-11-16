/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use-strict';

import {
Message
} from 'phosphor-messaging';

import {
DragHandler, IDragDropData
} from 'phosphor-domutil';

import {
SplitPanel
} from 'phosphor-splitpanel';

import {
  Tab
} from 'phosphor-tabs';

import {
Widget
} from 'phosphor-widget';

import {
  DockPanel
} from '../lib/index';

import './dashboard.css';


class DraggableListItem extends Widget {

  static createNode(): HTMLElement {
    let node = document.createElement('div');
    let span = document.createElement('span');
    node.className = 'list-item';
    node.appendChild(span);
    return node;
  }

  constructor(label: string, factory: () => Widget) {
    super();
    this._factory = widgetFactory(label);
    this._dragHandler = new DragHandler(this.node, this);
    this._dragHandler.onDragStart = this._onDragStart;
    this.node.querySelector('span').appendChild(document.createTextNode(label));
  }

  dispose(): void {
    this._dragHandler.dispose();
    super.dispose();
  }

  private _onDragStart(event: MouseEvent, dragData: IDragDropData): void {
    dragData.payload[DockPanel.DROP_MIME_TYPE] = this._factory;
  }

  private _factory: () => Widget = null;
  private _dragHandler: DragHandler = null;
}

function widgetFactory(color: string): () => Widget {
  return () => {
    let widget = new Widget();
    widget.addClass('content');
    widget.addClass('dashboard-content');
    widget.addClass(color);
    widget.node.appendChild(document.createTextNode(`This is ${color}.`));

    // This should become unnecessary in DockPanel instances without tabs.
    let tab = new Tab(color);
    tab.closable = true;
    DockPanel.setTab(widget, tab);

    return widget;
  }
}

function createDock(): DockPanel {
  let dock = new DockPanel();
  dock.addClass('content');
  dock.addClass('green');
  dock.droppable = true;
  return dock;
}


function createList(): Widget {
  let widget = new Widget();
  widget.addClass('content');
  widget.addClass('green');
  return widget;
}

function createToggle(list: Widget, dock: DockPanel): void {
  let toggle = new Widget();
  let button = document.createElement('button');
  button.textContent = `Droppable: ${dock.droppable}`;
  button.addEventListener('click', event => {
    event.preventDefault();
    event.stopPropagation();
    dock.droppable = !dock.droppable;
    button.textContent = `Droppable: ${dock.droppable}`;
  });
  toggle.node.appendChild(button);
  toggle.addClass('toggle');
  list.addChild(toggle);
}


function populateList(list: Widget, dock: DockPanel): void {
  for (let color of ['yellow', 'blue', 'red', 'purple']) {
    let item = new DraggableListItem(color, widgetFactory(color));
    item.addClass(color);
    list.addChild(item);
  }
  createToggle(list, dock);
}


function main(): void {
  let list = createList();
  let dock = createDock();
  let panel = new SplitPanel();
  populateList(list, dock);
  panel.orientation = SplitPanel.Horizontal;
  panel.children = [list, dock];
  SplitPanel.setStretch(list, 1);
  SplitPanel.setStretch(dock, 5);
  panel.id = 'main';
  Widget.attach(panel, document.body);
  window.onresize = () => panel.update();
}


window.onload = main;
