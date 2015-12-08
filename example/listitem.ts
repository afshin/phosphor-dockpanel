/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use-strict';

import {
  Drag, DropAction, DropActions, MimeData
} from 'phosphor-dragdrop';

import {
Widget
} from 'phosphor-widget';

import {
  updateStatus
} from './status';

import './listitem.css';


const DRAG_THRESHOLD = 5;

const FACTORY_MIME = 'application/x-phosphor-widget-factory';

export
class ListItem extends Widget {

  static createNode(): HTMLElement {
    let node = document.createElement('div');
    let span = document.createElement('span');
    let space = document.createTextNode(' ');
    let icon = document.createElement('i');
    let description = document.createElement('div');
    icon.classList.add('fa');
    node.classList.add('list-item');
    description.classList.add('description');
    node.appendChild(icon);
    node.appendChild(space);
    node.appendChild(span);
    node.appendChild(description);
    return node;
  }

  set description(description: string) {
    if (this._description === description) {
      return;
    }
    this._description = description;
    this.node.querySelector('.description').textContent = description;
  }

  get description(): string {
    return this._description;
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
      this.node.removeEventListener('mousedown', this as any);
    }
  }

  set icon(icon: string) {
    if (this._icon === icon) {
      return;
    }
    if (this._icon) {
      this.node.querySelector('i').classList.remove(`fa-${this._icon}`);
    }
    this._icon = icon;
    this.node.querySelector('i').classList.add(`fa-${icon}`);
  }

  get icon(): string {
    return this._icon;
  }

  set label(label: string) {
    if (this._label === label) {
      return;
    }
    this._label = label;
    this.node.querySelector('span').textContent = label;
  }

  get label(): string {
    return this._label;
  }

  dispose(): void {
    this.draggable = false;
    super.dispose();
  }

  clearStatus: string = null;

  dragStatus: string = null;

  dropStatus: string = null;

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
    this._drag.mimeData.setData(FACTORY_MIME, this.factory);
    updateStatus(this.dragStatus, true);
    let { clientX, clientY } = event;
    this._releaseMouse();
    this._drag.start(clientX, clientY).then(action => {
      updateStatus(action === DropAction.None ? '' : this.dropStatus);
      this._drag = null;
    });
  }

  private _evtMouseUp(event: MouseEvent): void {
    if (event.button !== 0 || !this._drag) {
      this._releaseMouse();
      return;
    }
    event.preventDefault();
    event.stopPropagation();
  }

  private _releaseMouse(): void {
    document.removeEventListener('mouseup', this as any, true);
    document.removeEventListener('mousemove', this as any, true);
  }

  private _description: string;
  private _icon: string;
  private _color: string;
  private _label: string;
  private _draggable: boolean = false;
  private _dragData: { pressX: number, pressY: number } = null;
  private _drag: Drag = null;
}
