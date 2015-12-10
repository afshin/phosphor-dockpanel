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
Widget
} from 'phosphor-widget';

import {
  ListItem
} from './listitem';

import {
  updateStatus
} from './status';


class Plot extends Widget {

  constructor(item: ListItem, plot: Node) {
    super();
    this._item = item;
    this.node.appendChild(plot);
  }

  protected onCloseRequest(msg: Message) {
    super.onCloseRequest(msg);
    // Reactivate the list item.
    this._item.draggable = true;
    updateStatus(this._item.clearStatus);
  }

  private _item: ListItem = null;
}

export
function plotFactory(item: ListItem, node: Node): () => Widget {
  return () => {
    let plot = new Plot(item, node);
    item.draggable = false;
    plot.addClass('d-content');
    plot.addClass(item.icon);
    plot.title.text = item.label;
    plot.title.closable = true;
    return plot;
  }
}
