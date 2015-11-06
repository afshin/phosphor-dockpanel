/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use-strict';

import {
  getDragData, setDragData, clearDragData
} from 'phosphor-domutil';

import {
Message
} from 'phosphor-messaging';

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


class DraggableWidget extends Widget {

  static createNode(): HTMLElement {
    let node = document.createElement('div');
    let span = document.createElement('span');
    node.className = 'list-item';
    node.setAttribute('draggable', 'true');
    node.appendChild(span);
    return node;
  }

  constructor(label: string, private _factory: () => Widget) {
    super();
    this.node.querySelector('span').appendChild(document.createTextNode(label));
  }

  handleEvent(event: Event): void {
    switch (event.type) {
    case 'dragstart':
      this._evtDragStart(<DragEvent>event);
      break;
    case 'dragend':
      this._evtDragEnd(<DragEvent>event);
      break;
    }
  }

  protected onAfterAttach(msg: Message): void {
    super.onAfterAttach(msg);
    this.node.addEventListener('dragstart', this);
    this.node.addEventListener('dragend', this);
  }

  protected onBeforeDetach(msg: Message): void {
    super.onBeforeDetach(msg);
    this.node.removeEventListener('dragstart', this);
    this.node.removeEventListener('dragend', this);
  }

  private _evtDragStart(event: DragEvent): void {
    setDragData(event, DockPanel.DROP_MIME_TYPE, this._factory);
  }

  private _evtDragEnd(event: DragEvent): void {
    clearDragData(event);
  }
}

function widgetFactory(color: string): () => Widget {
  return () => {
    var widget = new Widget();
    widget.addClass('content');
    widget.addClass(color);
    widget.node.appendChild(document.createTextNode(`This is ${color}.`));

    var tab = new Tab(color);
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
  dock.droppable = true;
  return dock;
}


function createList(): Widget {
  let widget = new Widget();
  widget.addClass('content');
  widget.addClass('blue');
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


function populateList(list: Widget): void {
  let itemOne = new DraggableWidget('yellow', widgetFactory('yellow'));
  itemOne.addClass('yellow');
  let itemTwo = new DraggableWidget('green', widgetFactory('green'));
  itemTwo.addClass('green');
  let itemThree = new DraggableWidget('red', widgetFactory('red'));
  itemThree.addClass('red');
  list.addChild(itemOne);
  list.addChild(itemTwo);
  list.addChild(itemThree);
}


function main(): void {
  let list = createList();
  let dock = createDock();
  let panel = new SplitPanel();
  populateList(list);
  createToggle(list, dock);
  panel.orientation = SplitPanel.Horizontal;
  panel.children = [list, dock];
  SplitPanel.setStretch(list, 1);
  SplitPanel.setStretch(dock, 5);
  panel.id = 'main';
  Widget.attach(panel, document.body);
  window.onresize = () => panel.update();
}


window.onload = main;
