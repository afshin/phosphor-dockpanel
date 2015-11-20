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
DragHandler, DragData
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


class ListItem extends Widget {

  static createNode(): HTMLElement {
    let node = document.createElement('div');
    let span = document.createElement('span');
    node.className = 'list-item';
    node.appendChild(span);
    return node;
  }

  get draggable(): boolean {
    return this._draggable;
  }

  set draggable(draggable: boolean) {
    if (this._draggable === draggable) {
      return;
    }
    this._draggable = draggable;
    if (draggable) {
      this._dragHandler = new DragHandler(this.node, this);
      this._dragHandler.onDragStart = this._onDragStart;
      this._dragHandler.onDragEnd = this._onDragEnd;
      this.addClass('draggable');
    } else {
      this.removeClass('draggable');
      this._dragHandler.dispose();
      this._dragHandler = null;
    }
  }

  constructor(label: string) {
    super();
    this._label = label;
    this.node.querySelector('span').textContent = label;
  }

  dispose(): void {
    this.draggable = false;
    super.dispose();
  }

  private _onDragStart(event: MouseEvent, data: DragData): void {
    let factory = plotFactory(this, this._label);
    data.setData(DockPanel.DROP_MIME_TYPE, factory);
  }

  private _onDragEnd(event: MouseEvent, data: DragData): void {
    if (data.dropAction !== 'none') {
      this.draggable = false;
    }
  }

  private _draggable: boolean = false;
  private _dragHandler: DragHandler = null;
  private _label: string;
}

class Plot extends Widget {

  constructor(item: ListItem, color: string) {
    super();
    this._item = item;
    this.addClass('content');
    this.addClass('dashboard-content');
    this.addClass(color);
    this.node.appendChild(document.createTextNode(`This is ${color}.`));
  }

  protected onCloseRequest(msg: Message) {
    super.onCloseRequest(msg);
    // Reactivate the list item.
    this._item.draggable = true;
  }

  private _item: ListItem = null;
}

function plotFactory(item: ListItem, color: string): () => Widget {
  return () => {
    let plot = new Plot(item, color);

    // This should become unnecessary in DockPanel instances without tabs.
    let tab = new Tab(color);
    tab.closable = true;
    DockPanel.setTab(plot, tab);

    return plot;
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
    let item = new ListItem(color);
    item.addClass(color);
    item.draggable = true;
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
