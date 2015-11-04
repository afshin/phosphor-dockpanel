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

const MIME_TYPE = 'application/x-phosphor-draggable';


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
    setDragData(event, MIME_TYPE, this._factory);
  }

  private _evtDragEnd(event: DragEvent): void {
    clearDragData(event);
  }
}


class DroppableWidget extends DockPanel {

  handleEvent(event: Event): void {
    switch (event.type) {
    case 'dragenter':
      this._evtDragEnter(event as DragEvent);
      return;
    case 'dragleave':
      this._evtDragLeave(event as DragEvent);
      return;
    case 'dragover':
      this._evtDragOver(event as DragEvent);
      return;
    case 'drop':
      this._evtDrop(event as DragEvent);
      return;
    }
    super.handleEvent(event);
  }

  protected onAfterAttach(msg: Message): void {
    super.onAfterAttach(msg);
    for (let event of ['dragenter', 'dragleave', 'dragover', 'drop']) {
      this.node.addEventListener(event, this);
    };
  }

  protected onBeforeDetach(msg: Message): void {
    super.onBeforeDetach(msg);
    for (let event of ['dragenter', 'dragleave', 'dragover', 'drop']) {
      this.node.removeEventListener(event, this);
    };
  }

  private _evtDragEnter(event: DragEvent): void {
    let factory = getDragData(event, MIME_TYPE);
    event.dataTransfer.dropEffect = factory ? 'copy' : 'none';
    event.preventDefault();
    event.stopPropagation();
  }

  private _evtDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  private _evtDragOver(event: DragEvent): void {
    let factory = getDragData(event, MIME_TYPE);
    if (!factory) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
  }

  private _evtDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    let factory = getDragData(event, MIME_TYPE);
    if (factory) {
      let index = this.addChild(factory());
      let ref = ~(index - 1) ? this.childAt(index - 1) : null;
      this.tabify(ref, this.childAt(index))
    }
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

function createDroppable(): DroppableWidget {
  let widget = new DroppableWidget();
  widget.addClass('content');
  widget.addClass('green');
  return widget;
}


function createList(): Widget {
  let widget = new Widget();
  widget.addClass('content');
  widget.addClass('blue');
  return widget;
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
  let droppable = createDroppable();
  let panel = new SplitPanel();
  panel.orientation = SplitPanel.Horizontal;
  panel.children = [list, droppable];
  SplitPanel.setStretch(list, 1);
  SplitPanel.setStretch(droppable, 5);
  populateList(list);
  panel.id = 'main';
  Widget.attach(panel, document.body);
  window.onresize = () => panel.update();
}


window.onload = main;
