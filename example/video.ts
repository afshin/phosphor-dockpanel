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


class Video extends Widget {

  constructor(item: ListItem) {
    super();
    this._item = item;
    this.addClass('dashboard-content');
    let iframe = document.createElement('iframe');
    iframe.setAttribute('height', '315');
    iframe.setAttribute('width', '560');
    iframe.setAttribute('src', 'https://www.youtube.com/embed/Rc4JQWowG5I');
    iframe.setAttribute('allowfullscreen', '');
    this.node.appendChild(iframe);
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
function videoFactory(item: ListItem): () => Widget {
  return () => {
    let video = new Video(item);
    item.draggable = false;
    video.title.text = item.label;
    video.title.closable = true;
    return video;
  }
}
