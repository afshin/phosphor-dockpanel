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
Widget, ResizeMessage
} from 'phosphor-widget';

import {
  ListItem
} from './listitem';

import {
  updateStatus
} from './status';


class Editor extends Widget {

  constructor(item: ListItem) {
    super();
    this._item = item;
    this._editor = CodeMirror(this.node, {
      dragDrop: false,
      value: '\/* This is a code editor in JS mode. *\/',
      mode: 'text/javascript',
      readOnly: false
    });
    setTimeout(() => {
      this._editor.refresh();
      this._editor.focus();
    });
    this.title.text = item.label;
    this.title.closable = true;
  }

  protected onCloseRequest(msg: Message) {
    super.onCloseRequest(msg);
    updateStatus(this._item.clearStatus);
  }

  protected onResize(msg: ResizeMessage): void {
    if (msg.width < 0 || msg.height < 0) {
      this._editor.refresh();
    } else {
      this._editor.setSize(msg.width, msg.height);
    }
  }

  private _editor: CodeMirror.Editor = null;
  private _item: ListItem = null;
}

export
function editorFactory(item: ListItem): () => Widget {
  return () => {
    let editor = new Editor(item);
    editor.addClass('dashboard-content');
    editor.addClass(item.icon);
    return editor;
  }
}
