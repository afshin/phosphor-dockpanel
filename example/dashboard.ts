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
BoxPanel
} from 'phosphor-boxpanel';

import {
  Drag, DropAction, DropActions, IDragEvent, MimeData
} from 'phosphor-dragdrop';

import {
SplitPanel
} from 'phosphor-splitpanel';

import {
Panel, Widget
} from 'phosphor-widget';

import {
  DockPanel, FACTORY_MIME
} from '../lib/index';

import './dashboard.css';


const INSTRUCTIONS = 'Drag items from the left side onto the right-hand panel.';

const DRAG_THRESHOLD = 5;

class ListItem extends Widget {

  static createNode(): HTMLElement {
    let node = document.createElement('div');
    let span = document.createElement('span');
    let space = document.createTextNode(' ');
    let icon = document.createElement('i');
    node.className = 'list-item';
    node.appendChild(icon);
    node.appendChild(space);
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
      this.addClass('draggable');
      this.node.addEventListener('mousedown', this as any);
    } else {
      this.removeClass('draggable');
      this._releaseMouse();
      if (this._drag) {
        this._drag.dispose();
        this._drag = null;
      }
      this.node.removeEventListener('mousedown', this as any);
    }
  }

  constructor(public color: string, public icon: string, public label: string) {
    super();
    this.node.querySelector('i').classList.add('fa', `fa-${icon}`);
    this.node.querySelector('span').textContent = label;
  }

  dispose(): void {
    this.draggable = false;
    super.dispose();
  }

  factory: () => Widget = null;

  handleEvent(event: Event): void {
    switch (event.type) {
    case 'mousedown':
      this._evtMouseDown(<MouseEvent>event);
      break;
    case 'mousemove':
      this._evtMouseMove(<MouseEvent>event);
      break;
    case 'mouseup':
      this._evtMouseUp(<MouseEvent>event);
      break;
    }
  }

  proposedAction: DropAction = null;

  supportedActions: DropActions = null;

  private _evtMouseDown(event: MouseEvent): void {
    if (event.button !== 0) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    this._dragData = { pressX: event.clientX, pressY: event.clientY };
    document.addEventListener('mouseup', this as any, true);
    document.addEventListener('mousemove', this as any, true);
  }

  private _evtMouseMove(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (this._drag) {
      return;
    }
    let data = this._dragData;
    let dx = Math.abs(event.clientX - data.pressX);
    let dy = Math.abs(event.clientY - data.pressY);
    if (dx < DRAG_THRESHOLD && dy < DRAG_THRESHOLD) {
      return;
    }
    this._drag = new Drag({
      dragImage: this.node.cloneNode(true) as HTMLElement,
      mimeData: new MimeData(),
      supportedActions: this.supportedActions,
      proposedAction: this.proposedAction
    });
    this._releaseMouse();
    this._drag.mimeData.setData(FACTORY_MIME, this.factory);
    this._drag.start(event.clientX, event.clientY);
  }

  private _evtMouseUp(event: MouseEvent): void {
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
  }

  private _releaseMouse(): void {
    document.removeEventListener('mouseup', this as any, true);
    document.removeEventListener('mousemove', this as any, true);
  }

  private _draggable: boolean = false;
  private _dragData: { pressX: number, pressY: number } = null;
  private _drag: Drag = null;
}

class Plot extends Widget {

  constructor(item: ListItem, plot: Node) {
    super();
    this._item = item;
    this.addClass('dashboard-content');
    this.addClass(item.icon);
    this.node.appendChild(plot);
  }

  protected onCloseRequest(msg: Message) {
    super.onCloseRequest(msg);
    // Reactivate the list item.
    this._item.draggable = true;
  }

  private _item: ListItem = null;
}

function plotFactory(item: ListItem, node: Node): () => Widget {
  return () => {
    let plot = new Plot(item, node);
    item.draggable = false;
    plot.title.text = item.label;
    plot.title.closable = true;
    return plot;
  }
}

function createDock(): DockPanel {
  let dock = new DockPanel();
  dock.addClass('dock');
  return dock;
}

function createInstructions(): Widget {
  let instructions = new Widget();
  let lightbulb = document.createElement('i');
  lightbulb.classList.add('fa', 'fa-lightbulb-o');
  instructions.addClass('instructions');
  instructions.node.appendChild(lightbulb);
  instructions.node.appendChild(document.createTextNode(` ${INSTRUCTIONS}`));
  BoxPanel.setSizeBasis(instructions, 20);
  BoxPanel.setStretch(instructions, 0);
  return instructions;
}

function createList(): Panel {
  let panel = new Panel();
  panel.addClass('list');
  return panel;
}

function createPanel(instructions: Widget, list: Panel, dock: DockPanel): BoxPanel {
  let panel = new BoxPanel();
  let subpanel = new SplitPanel();

  subpanel.orientation = SplitPanel.Horizontal;
  subpanel.children.assign([list, dock]);
  subpanel.setSizes([0, 1]);

  panel.children.assign([instructions, subpanel]);
  panel.spacing = 0;
  panel.direction = BoxPanel.TopToBottom;

  panel.id = 'main';
  return panel;
}

function populateList(list: Panel, dock: DockPanel): void {
  let plots = document.querySelectorAll('div.bk-plot');
  let colors = ['yellow', 'blue', 'blue', 'blue'];
  let labels = [
    'Elements',
    'Linked 1',
    'Linked 2',
    'Linked 3'
  ];
  let icons = [
    'table',
    'line-chart',
    'line-chart',
    'line-chart'
  ];
  for (let index = 0; index < 4; ++index) {
    let plot = document.body.removeChild(plots[index]);
    let label = labels[index];
    let icon = icons[index];
    let color = colors[index];
    let item = new ListItem(color, icon, label);
    item.addClass(color);
    item.draggable = true;
    item.factory = plotFactory(item, plot);
    item.supportedActions = DropActions.Move;
    item.proposedAction = DropAction.Move;
    list.children.add(item);
  }
}

function main(): void {
  document.body.style.visibility = '';
  let instructions = createInstructions();
  let list = createList();
  let dock = createDock();
  let panel = createPanel(instructions, list, dock);
  populateList(list, dock);
  Widget.attach(panel, document.body);
  window.onresize = () => panel.update();
}

window.addEventListener('load', () => {
  let check = () => {
    if (document.querySelectorAll('div.bk-plot').length !== 4) {
      return setTimeout(check, 250);
    }
    main();
  }
  check();
});
