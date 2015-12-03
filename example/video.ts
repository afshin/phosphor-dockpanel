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


export
interface IVideoSpec {
  url: string;
  mime: string;
  aspect: number;
}

class Video extends Widget {

  constructor(spec: IVideoSpec) {
    super();
    this.addClass('dashboard-content');
    let video = document.createElement('video');
    let source = document.createElement('source');
    video.appendChild(source);
    video.setAttribute('controls', '');
    source.setAttribute('src', spec.url);
    source.setAttribute('type', spec.mime);
    this._aspect = spec.aspect;
    this.node.appendChild(video);
  }

  protected onResize(msg: ResizeMessage): void {
    super.onResize(msg);
    if (this.isVisible) {
      let width = msg.width < 0 ? this.node.offsetWidth : msg.width;
      let height = msg.height < 0 ? this.node.offsetHeight : msg.height;
      let video = this.node.querySelector('video');
      if (width / height >= this._aspect) {
        video.setAttribute('width', `${height * this._aspect}`);
        video.setAttribute('height', `${height}`);
      } else {
        video.setAttribute('width', `${width}`);
        video.setAttribute('height', `${Math.floor(width / this._aspect)}`);
      }
    }
  }

  private _aspect: number = null;
}

export
function videoFactory(item: ListItem, spec: IVideoSpec): () => Widget {
  return () => {
    let video = new Video(spec);
    video.title.text = item.label;
    video.title.closable = true;
    video.addClass(item.icon);
    return video;
  }
}
