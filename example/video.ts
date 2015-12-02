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
    let video = document.createElement('video');
    let source = document.createElement('source');
    video.appendChild(source);
    video.setAttribute('height', '320');
    video.setAttribute('width', '512');
    video.setAttribute('controls', '');
    source.setAttribute('src', 'https://www.dropbox.com/s/opjvn36se5tvld2/bokeh_simple_map.mp4');
    source.setAttribute('type', 'video/mp4');
    this.node.appendChild(video);
  }

  private _item: ListItem = null;
}

export
function videoFactory(item: ListItem): () => Widget {
  return () => {
    let video = new Video(item);
    video.title.text = item.label;
    video.title.closable = true;
    return video;
  }
}
