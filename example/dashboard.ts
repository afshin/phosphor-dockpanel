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
  DropAction, DropActions
} from 'phosphor-dragdrop';

import {
Panel, Widget
} from 'phosphor-widget';

import {
  DockPanel
} from '../lib/index';

import {
  createStatus, updateStatus
} from './status';

import {
  editorFactory
} from './editor';

import {
  plotFactory
} from './plot';

import {
  videoFactory, IVideoSpec
} from './video';

import {
  ListItem
} from './listitem';

import './dashboard.css';


interface IWidgetSpec {
  type: string;
  color: string;
  label: string;
  icon: string;
  dragStatus: string;
  dropStatus: string;
  clearStatus: string;
  config?: any;
}

const INSTRUCTIONS = 'Drag items from the left side onto the right-hand panel.';

const specs: IWidgetSpec[] = [
  {
    type: 'plot',
    color: 'yellow',
    label: 'Elements',
    icon: 'table',
    dragStatus: 'Dragging periodic table of elements',
    dropStatus: 'Mounted periodic table of elements',
    clearStatus: 'Reactivated periodic table of elements'
  },
  {
    type: 'plot',
    color: 'blue',
    label: 'Linked 1',
    icon: 'line-chart',
    dragStatus: 'Dragging first linked plot',
    dropStatus: 'Mounted first linked plot',
    clearStatus: 'Reactivated first linked plot'
  },
  {
    type: 'plot',
    color: 'blue',
    label: 'Linked 2',
    icon: 'line-chart',
    dragStatus: 'Dragging second linked plot',
    dropStatus: 'Mounted second linked plot',
    clearStatus: 'Reactivated second linked plot'
  },
  {
    type: 'plot',
    color: 'blue',
    label: 'Linked 3',
    icon: 'line-chart',
    dragStatus: 'Dragging third linked plot',
    dropStatus: 'Mounted third linked plot',
    clearStatus: 'Reactivated third linked plot'
  },
  {
    type: 'editor',
    color: 'green',
    label: 'JS editor',
    icon: 'pencil',
    dragStatus: 'Dragging JS editor',
    dropStatus: 'Mounted JS editor',
    clearStatus: 'Unmounted JS editor'
  },
  {
    type: 'video',
    color: 'red',
    label: 'Bokeh video',
    icon: 'television',
    dragStatus: 'Dragging Bokeh video',
    dropStatus: 'Mounted Bokeh video',
    clearStatus: 'Unmounted Bokeh video',
    config: ({
      aspect: 1.6,
      mime: 'video/mp4',
      url: 'https://www.continuum.io/sites/default/files/bokeh_simple_map.mp4'
    } as IVideoSpec)
  }
];

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

function createPanel(instructions: Widget, list: Panel, dock: DockPanel, status: Widget): BoxPanel {
  let panel = new BoxPanel();
  let subpanel = new BoxPanel();

  subpanel.direction = BoxPanel.LeftToRight;
  subpanel.children.assign([list, dock]);
  BoxPanel.setSizeBasis(list, 150);
  BoxPanel.setStretch(list, 0);

  panel.children.assign([instructions, subpanel, status]);
  panel.spacing = 0;
  panel.direction = BoxPanel.TopToBottom;

  panel.id = 'main';
  return panel;
}

function populateList(list: Panel, dock: DockPanel): void {
  let plots = document.querySelectorAll('div.bk-plot');
  for (let index = 0; index < specs.length; ++index) {
    let { color, label, icon, type } = specs[index];
    let { dragStatus, dropStatus, clearStatus } = specs[index];
    let item = new ListItem(color, icon, label);
    item.addClass(color);
    item.draggable = true;
    item.dragStatus = dragStatus;
    item.dropStatus = dropStatus;
    item.clearStatus = clearStatus;
    switch (type) {
    case 'plot':
      let plot = document.body.removeChild(plots[index]);
      item.supportedActions = DropActions.Move;
      item.proposedAction = DropAction.Move;
      item.factory = plotFactory(item, plot);
      break;
    case 'editor':
      item.supportedActions = DropActions.Copy;
      item.proposedAction = DropAction.Copy;
      item.factory = editorFactory(item);
      break;
    case 'video':
      item.supportedActions = DropActions.Copy;
      item.proposedAction = DropAction.Copy;
      item.factory = videoFactory(item, specs[index].config);
      break;
    }
    list.children.add(item);
  }
}

function main(): void {
  document.body.style.visibility = '';
  let instructions = createInstructions();
  let list = createList();
  let dock = createDock();
  let status = createStatus();
  let panel = createPanel(instructions, list, dock, status);
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
