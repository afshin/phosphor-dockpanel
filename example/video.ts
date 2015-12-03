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
ResizeMessage, Widget
} from 'phosphor-widget';

import {
  ListItem
} from './listitem';

import {
  updateStatus
} from './status';


const ASPECT_RATIO = 1.6;

const URL = 'https://www.continuum.io/sites/default/files/bokeh_simple_map.mp4';

class Video extends Widget {

  constructor() {
    super();
    this.addClass('dashboard-content');
    let video = document.createElement('video');
    let source = document.createElement('source');
    video.appendChild(source);
    video.setAttribute('height', '320');
    video.setAttribute('width', '512');
    video.setAttribute('controls', '');
    source.setAttribute('src', URL);
    source.setAttribute('type', 'video/mp4');
    this.node.appendChild(video);
  }

  protected onResize(msg: ResizeMessage): void {
    super.onResize(msg);
    if (this.isVisible) {
      let width = msg.width < 0 ? this.node.offsetWidth : msg.width;
      let height = msg.height < 0 ? this.node.offsetHeight : msg.height;
      let video = this.node.querySelector('video');
      if (width / height >= ASPECT_RATIO) {
        video.setAttribute('width', `${height * ASPECT_RATIO}`);
        video.setAttribute('height', `${height}`);
      } else {
        video.setAttribute('width', `${width}`);
        video.setAttribute('height', `${Math.floor(width / ASPECT_RATIO)}`);
      }
    }
  }
}

export
function videoFactory(item: ListItem): () => Widget {
  return () => {
    let video = new Video();
    video.title.text = item.label;
    video.title.closable = true;
    video.addClass(item.icon);
    return video;
  }
}
