/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';

import * as arrays
  from 'phosphor-arrays';

import {
  BoxPanel
} from 'phosphor-boxpanel';

import {
  IDisposable
} from 'phosphor-disposable';

import {
  boxSizing, overrideCursor, getDragData, setDragData, clearDragData
} from 'phosphor-domutil';

import {
Message
} from 'phosphor-messaging';

import {
  NodeWrapper
} from 'phosphor-nodewrapper';

import {
  Property
} from 'phosphor-properties';

import {
  Orientation, SplitPanel
} from 'phosphor-splitpanel';

import {
  IWidgetIndexArgs, StackedPanel
} from 'phosphor-stackedpanel';

import {
  ITabDetachArgs, ITabIndexArgs, Tab, TabBar
} from 'phosphor-tabs';

import {
  Widget
} from 'phosphor-widget';

import './index.css';


/**
 * The class name added to DockPanel instances.
 */
var DOCK_PANEL_CLASS = 'p-DockPanel';

/**
 * The class name added to dock split panels.
 */
var SPLIT_PANEL_CLASS = 'p-DockSplitPanel';

/**
 * The class name added to dock tab panels.
 */
var TAB_PANEL_CLASS = 'p-DockTabPanel';

/**
 * The class name added to dock panel overlays.
 */
var OVERLAY_CLASS = 'p-DockPanelOverlay';

/**
 * The class name added to a tab which is being docked.
 */
var DOCKING_CLASS = 'p-mod-docking';

/**
 * The class name added to hidden overlays.
 */
var HIDDEN_CLASS = 'p-mod-hidden';

/**
 * The class name added to top edge dock overlays.
 */
var EDGE_TOP_CLASS = 'p-mod-edge-top';

/**
 * The class name added to left edge dock overlays.
 */
var EDGE_LEFT_CLASS = 'p-mod-edge-left';

/**
 * The class name added to right edge dock overlays.
 */
var EDGE_RIGHT_CLASS = 'p-mod-edge-right';

/**
 * The class name added to bottom edge dock overlays.
 */
var EDGE_BOTTOM_CLASS = 'p-mod-edge-bottom';

/**
 * The class name added to top panel dock overlays.
 */
var PANEL_TOP_CLASS = 'p-mod-panel-top';

/**
 * The class name added to left panel dock overlays.
 */
var PANEL_LEFT_CLASS = 'p-mod-panel-left';

/**
 * The class name added to right panel dock overlays.
 */
var PANEL_RIGHT_CLASS = 'p-mod-panel-right';

/**
 * The class name added to bottom panel dock overlays.
 */
var PANEL_BOTTOM_CLASS = 'p-mod-panel-bottom';

/**
 * The class named added to center panel dock overlays.
 */
var PANEL_CENTER_CLASS = 'p-mod-panel-center';

/**
 * The size of the edge dock zone for the root panel.
 */
var EDGE_SIZE = 30;


/**
 * A widget which provides a flexible docking area for content widgets.
 *
 * #### Notes
 * Widgets should be added to a `DockPanel` using one of the dedicated
 * dock methods. The inherited `<prefix>Child` methods should **not**
 * be used. Widgets can be removed from a `DockPanel` by setting their
 * `parent` reference to `null`.
 */
export
class DockPanel extends BoxPanel {
  /**
   * The MIME type for draggable items that can be dropped on a dock panel.
   */
  static DROP_MIME_TYPE = 'application/x-phosphor-widget-factory';

  /**
   * The property descriptor for the `tab` attached property.
   *
   * This controls the tab used for a widget in a dock panel.
   *
   * #### Notes
   * If the tab for a widget is changed, the new tab will not be
   * reflected until the widget is re-inserted into the dock panel.
   * However, in-place changes to the tab's properties **will** be
   * reflected.
   *
   * **See also:** [[getTab]], [[setTab]]
   */
  static tabProperty = new Property<Widget, Tab>({
    value: null,
    coerce: (owner, value) => value || null,
  });

  /**
   * The property descriptor for the dock panel spacing.
   *
   * The controls the spacing between the panels, in pixels. The default
   * value is `3`.
   *
   * **See also:** [[spacing]]
   */
  static spacingProperty = new Property<DockPanel, number>({
    value: 3,
    coerce: (owner, value) => Math.max(0, value | 0),
    changed: (owner, old, value) => owner._onSpacingChanged(old, value),
  });

  /**
   * Get the dock panel tab for the given widget.
   *
   * @param widget - The widget of interest.
   *
   * @returns The dock panel tab for the given widget.
   *
   * #### Notes
   * This is a pure delegate for the [[tabProperty]].
   */
  static getTab(widget: Widget): Tab {
    return DockPanel.tabProperty.get(widget);
  }

  /**
   * Set the dock panel tab for the given widget.
   *
   * @param widget - The widget of interest.
   *
   * @param tab - The tab to use for the widget in a dock panel.
   *
   * #### Notes
   * This is a pure delegate for the [[tabProperty]].
   */
  static setTab(widget: Widget, tab: Tab): void {
    DockPanel.tabProperty.set(widget, tab);
  }

  /**
   * Construct a new dock panel.
   */
  constructor() {
    super();
    this.addClass(DOCK_PANEL_CLASS);
    this.node.appendChild(this._overlay.node);
    this._root = this._createSplitPanel(Orientation.Horizontal);
    this.addChild(this._root);
  }

  /**
   * Dispose of the resources held by the widget.
   */
  dispose(): void {
    this._abortDrag();
    this._root = null;
    this._items.length = 0;
    super.dispose();
  }

  /**
   * Get whether the dock panel is a drop target.
   */
  get droppable(): boolean {
    return this._droppable;
  }

  /**
   * Set whether the dock panel is a drop target.
   */
  set droppable(droppable: boolean) {
    this._droppable = droppable;
    for (let event of ['dragenter', 'dragleave', 'dragover', 'drop']) {
      if (droppable) {
        this.node.addEventListener(event, this);
      } else {
        this.node.removeEventListener(event, this);
      }
    };
  }

  /**
   * Get the spacing between the docked panels.
   *
   * #### Notes
   * This is a pure delegate to the [[spacingProperty]].
   */
  get spacing(): number {
    return DockPanel.spacingProperty.get(this);
  }

  /**
   * Set the spacing between the docked panels.
   *
   * #### Notes
   * This is a pure delegate to the [[spacingProperty]].
   */
  set spacing(value: number) {
    DockPanel.spacingProperty.set(this, value);
  }

  /**
   * Insert a widget above a reference widget.
   *
   * @param ref - The reference widget. If this is null, or is not
   *   contained in the panel, the widget will be inserted at the
   *   top edge of the dock panel.
   *
   * @param widget - The widget to insert into the dock panel.
   */
  splitTop(ref: Widget, widget: Widget): void {
    if (ref === widget) return;
    this._splitWidget(ref, widget, Orientation.Vertical, false);
  }

  /**
   * Insert a widget to the left of a reference widget.
   *
   * @param ref - The reference widget. If this is null, or is not
   *   contained in the panel, the widget will be inserted at the
   *   left edge of the dock panel.
   *
   * @param widget - The widget to insert into the dock panel.
   */
  splitLeft(ref: Widget, widget: Widget): void {
    if (ref === widget) return;
    this._splitWidget(ref, widget, Orientation.Horizontal, false);
  }

  /**
   * Insert a widget to the right of a reference widget.
   *
   * @param ref - The reference widget. If this is null, or is not
   *   contained in the panel, the widget will be inserted at the
   *   right edge of the dock panel.
   *
   * @param widget - The widget to insert into the dock panel.
   */
  splitRight(ref: Widget, widget: Widget): void {
    if (ref === widget) return;
    this._splitWidget(ref, widget, Orientation.Horizontal, true);
  }

  /**
   * Insert a widget below a reference widget.
   *
   * @param ref - The reference widget. If this is null, or is not
   *   contained in the panel, the widget will be inserted at the
   *   bottom edge of the dock panel.
   *
   * @param widget - The widget to insert into the dock panel.
   */
  splitBottom(ref: Widget, widget: Widget): void {
    if (ref === widget) return;
    this._splitWidget(ref, widget, Orientation.Vertical, true);
  }

  /**
   * Insert a widget as a sibling tab to a reference widget.
   *
   * @param ref - The reference widget. If this is null, or is not
   *   contained in the panel, the widget will be inserted at the
   *   right edge of the dock panel.
   *
   * @param widget - The widget to insert into the dock panel.
   */
  tabify(ref: Widget, widget: Widget): void {
    if (ref === widget) return;
    this._tabifyWidget(ref, widget);
  }

  /**
   * Handle the DOM events for the dock panel.
   *
   * @param event - The DOM event sent to the dock panel.
   *
   * #### Notes
   * This method implements the DOM `EventListener` interface and is
   * called in response to events on the dock panel's DOM node. It
   * should not be called directly by user code.
   */
  handleEvent(event: Event): void {
    switch (event.type) {
    case 'mousemove':
      this._evtMouseMove(event as MouseEvent);
      break;
    case 'mouseup':
      this._evtMouseUp(event as MouseEvent);
      break;
    case 'contextmenu':
      this._evtContextMenu(event as MouseEvent);
      break;
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
  }

  /**
   * A message handler invoked on a `'before-detach'` message.
   */
  protected onBeforeDetach(msg: Message): void {
    super.onBeforeDetach(msg);

    // Setting droppable to false removes the DOM listeners.
    this.droppable = false;
  }

  /**
   * Add a widget to a new tab panel next to a reference.
   */
  private _splitWidget(ref: Widget, widget: Widget, orientation: Orientation, after: boolean): void {
    var item = ref ? this._findItemByWidget(ref) : void 0;
    if (item) {
      this._splitPanel(item.panel, widget, orientation, after);
    } else {
      this._addPanel(widget, orientation, after);
    }
  }

  /**
   * Add a widget as the tab panel which owns a reference.
   */
  private _tabifyWidget(ref: Widget, widget: Widget): void {
    var item = ref ? this._findItemByWidget(ref) : void 0;
    if (item) {
      this._tabifyPanel(item.panel, widget);
    } else {
      this._addPanel(widget, Orientation.Horizontal, true);
    }
  }

  /**
   * Split a panel with a widget along the given orientation.
   */
  private _splitPanel(target: DockTabPanel, widget: Widget, orientation: Orientation, after: boolean): void {
    // Ensure the widget has a dock panel tab.
    var tab = DockPanel.getTab(widget);
    if (!tab) {
      throw new Error('`DockPanel.tab` property not set');
    }

    // Remove the widget from its current parent.
    widget.parent = null;

    // Create a new dock tab panel to host the widget.
    var panel = this._createTabPanel();

    // Create and add the dock item for the widget.
    this._items.push({ tab: tab, widget: widget, panel: panel });

    // Add the widget to the tab panel.
    panel.stack.addChild(widget);
    panel.tabs.addTab(tab);

    // Add the new panel to the parent split panel. This may require
    // creating a new child split panel to adhere to the orientation
    // constraint. The new panel is sized to occupy 1/2 the space.
    var splitPanel = target.parent as DockSplitPanel;
    if (splitPanel.orientation !== orientation) {
      if (splitPanel.childCount <= 1) {
        splitPanel.orientation = orientation;
        splitPanel.insertChild(+after, panel);
        splitPanel.setSizes([1, 1]);
      } else {
        var sizes = splitPanel.sizes();
        var i = splitPanel.childIndex(target);
        var childSplit = this._createSplitPanel(orientation);
        childSplit.addChild(target);
        childSplit.insertChild(+after, panel);
        splitPanel.insertChild(i, childSplit);
        splitPanel.setSizes(sizes);
        childSplit.setSizes([1, 1]);
      }
    } else {
      var i = splitPanel.childIndex(target);
      var sizes = splitPanel.sizes();
      var size = sizes[i] = sizes[i] / 2;
      splitPanel.insertChild(i + (+after), panel);
      arrays.insert(sizes, i + (+after), size);
      splitPanel.setSizes(sizes);
    }
  }

  /**
   * Add a widget to the specified tab panel.
   */
  private _tabifyPanel(target: DockTabPanel, widget: Widget): void {
    // Ensure the widget has a dock panel tab.
    var tab = DockPanel.getTab(widget);
    if (!tab) {
      throw new Error('`DockPanel.tab` property not set');
    }

    // Remove the widget from its current parent.
    widget.parent = null;

    // Create and add the dock item for the widget.
    this._items.push({ tab: tab, widget: widget, panel: target });

    // Add the widget to the tab panel.
    target.stack.addChild(widget);
    target.tabs.addTab(tab);
    target.tabs.selectedTab = tab;
  }

  /**
   * Add a widget to a new border panel along the given orientation.
   */
  private _addPanel(widget: Widget, orientation: Orientation, after: boolean): void {
    // Ensure the widget has a dock panel tab.
    var tab = DockPanel.getTab(widget);
    if (!tab) {
      throw new Error('`DockPanel.tab` property not set');
    }

    // Remove the widget from its current parent.
    widget.parent = null;

    // Create a new tab panel to host the widget.
    var panel = this._createTabPanel();

    // Create and add the dock item for the widget.
    this._items.push({ tab: tab, widget: widget, panel: panel });

    // Add the widget to the tab panel.
    panel.stack.addChild(widget);
    panel.tabs.addTab(tab);

    // Ensure a proper root panel orientation.
    this._ensureRoot(orientation);

    // Insert the panel and size it to occupy 1/3 the space.
    var sizes = this._root.sizes();
    arrays.insert(sizes, after ? sizes.length : 0, 0.5);
    this._root.insertChild(after ? this._root.childCount : 0, panel);
    this._root.setSizes(sizes);
  }

  /**
   * Handle the `'dragenter'` event for the dock panel.
   */
  private _evtDragEnter(event: DragEvent): void {
    let factory = getDragData(event, DockPanel.DROP_MIME_TYPE);
    event.dataTransfer.dropEffect = factory ? 'copy' : 'none';
    event.preventDefault();
    event.stopPropagation();
  }

  /**
   * Handle the `'dragleave'` event for the dock panel.
   */
  private _evtDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  /**
   * Handle the `'dragover'` event for the dock panel.
   */
  private _evtDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    let factory = getDragData(event, DockPanel.DROP_MIME_TYPE);
    if (factory) {
      this._showOverlay(event.clientX, event.clientY);
    }
  }

  /**
   * Handle the `'drop'` event for the dock panel.
   */
  private _evtDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this._overlay.hide();
    let factory = getDragData(event, DockPanel.DROP_MIME_TYPE);
    if (!factory) {
      return;
    }
    let data = findDockTarget(this._root, event.clientX, event.clientY);
    if (data.zone === DockZone.Invalid) {
      return;
    }
    let widget = factory();

    // Dock the panel according to the indicated zone.
    switch (data.zone) {
    case DockZone.EdgeTop:
      this._addPanel(widget, Orientation.Vertical, false);
      break;
    case DockZone.EdgeLeft:
      this._addPanel(widget, Orientation.Horizontal, false);
      break;
    case DockZone.EdgeRight:
      this._addPanel(widget, Orientation.Horizontal, true);
      break;
    case DockZone.EdgeBottom:
      this._addPanel(widget, Orientation.Vertical, true);
      break;
    case DockZone.PanelTop:
      this._splitPanel(data.panel, widget, Orientation.Vertical, false);
      break;
    case DockZone.PanelLeft:
      this._splitPanel(data.panel, widget, Orientation.Horizontal, false);
      break;
    case DockZone.PanelRight:
      this._splitPanel(data.panel, widget, Orientation.Horizontal, true);
      break;
    case DockZone.PanelBottom:
      this._splitPanel(data.panel, widget, Orientation.Vertical, true);
      break;
    case DockZone.PanelCenter:
      this._tabifyPanel(data.panel, widget);
      break;
    }
  }

  /**
   * Handle the `'mousemove'` event for the dock panel.
   */
  private _evtMouseMove(event: MouseEvent): void {
    // Kill the event and bail if the drag data is not setup.
    event.preventDefault();
    event.stopPropagation();
    var dragData = this._dragData;
    if (!dragData) {
      return;
    }

    // Show the dock overlay for the given client position. The overlay
    // will be hidden if the position is not over a valid docking zone.
    this._showOverlay(event.clientX, event.clientY);

    // Unconditionally update the position of the tab. The CSS for the
    // tab includes a transform which provides a nice relative offset.
    var style = dragData.item.tab.node.style;
    style.top = event.clientY + 'px';
    style.left = event.clientX + 'px';
  }

  /**
   * Handle the `'mouseup'` event for the dock panel.
   */
  private _evtMouseUp(event: MouseEvent): void {
    // Bail if the left mouse button is not released.
    if (event.button !== 0) {
      return;
    }

    // Kill the event and remove the mouse listeners.
    event.preventDefault();
    event.stopPropagation();
    document.removeEventListener('mouseup', this, true);
    document.removeEventListener('mousemove', this, true);
    document.removeEventListener('contextmenu', this, true);

    // Clear the drag data or bail if it wasn't setup.
    var dragData = this._dragData;
    if (!dragData) {
      return;
    }
    this._dragData = null;

    // Fetch common variables.
    var item = dragData.item;
    var ownPanel = item.panel;
    var ownBar = ownPanel.tabs;
    var ownCount = ownBar.tabCount;
    var itemTab = item.tab;

    // Restore the application cursor and hide the overlay.
    dragData.cursorGrab.dispose();
    this._overlay.hide();

    // Remove the tab from the document and reset its state.
    var tabStyle = itemTab.node.style;
    document.body.removeChild(itemTab.node);
    itemTab.removeClass(DOCKING_CLASS);
    tabStyle.top = '';
    tabStyle.left = '';

    // Find the dock target for the given client position.
    var data = findDockTarget(this._root, event.clientX, event.clientY);

    // If the dock zone is invalid, restore the tab and bail.
    if (data.zone === DockZone.Invalid) {
      ownBar.insertTab(dragData.index, itemTab);
      return;
    }

    // Restore the tab if the dock zone is the same tab group.
    if (data.panel === ownPanel && data.zone === DockZone.PanelCenter) {
      ownBar.insertTab(dragData.index, itemTab);
      return;
    }

    // Restore the tab if the dock zone has no effective change.
    if (data.panel === ownPanel && ownCount === 0) {
      ownBar.insertTab(dragData.index, itemTab);
      return;
    }

    // Dock the panel according to the indicated zone.
    switch (data.zone) {
    case DockZone.EdgeTop:
      this._addPanel(item.widget, Orientation.Vertical, false);
      break;
    case DockZone.EdgeLeft:
      this._addPanel(item.widget, Orientation.Horizontal, false);
      break;
    case DockZone.EdgeRight:
      this._addPanel(item.widget, Orientation.Horizontal, true);
      break;
    case DockZone.EdgeBottom:
      this._addPanel(item.widget, Orientation.Vertical, true);
      break;
    case DockZone.PanelTop:
      this._splitPanel(data.panel, item.widget, Orientation.Vertical, false);
      break;
    case DockZone.PanelLeft:
      this._splitPanel(data.panel, item.widget, Orientation.Horizontal, false);
      break;
    case DockZone.PanelRight:
      this._splitPanel(data.panel, item.widget, Orientation.Horizontal, true);
      break;
    case DockZone.PanelBottom:
      this._splitPanel(data.panel, item.widget, Orientation.Vertical, true);
      break;
    case DockZone.PanelCenter:
      this._tabifyPanel(data.panel, item.widget);
      break;
    }

    // Restore the previous tab for the old tab bar.
    var i = ownBar.tabIndex(dragData.prevTab);
    if (i === -1) i = ownBar.tabCount - 1;
    ownBar.selectedTab = ownBar.tabAt(i);
  }

  /**
   * Handle the `'contextmenu'` event for the dock panel.
   */
  private _evtContextMenu(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  /**
   * Ensure the root split panel has the given orientation.
   */
  private _ensureRoot(orientation: Orientation): void {
    // This is a no-op if the root orientation is correct.
    if (this._root.orientation === orientation) {
      return;
    }

    // If the root has at most one child, just change the orientation.
    if (this._root.childCount <= 1) {
      this._root.orientation = orientation;
      return;
    }

    // Otherwise, create a new root panel with the given orientation.
    // The existing root panel is added as a child of the new root.
    var panel = this._createSplitPanel(orientation);
    panel.addChild(this._root);
    this._root = panel;
    this.addChild(panel);
  }

  /**
   * Create a new dock tab panel and setup the signal handlers.
   */
  private _createTabPanel(): DockTabPanel {
    var panel = new DockTabPanel();
    panel.tabs.tabSelected.connect(this._onTabSelected, this);
    panel.tabs.tabCloseRequested.connect(this._onTabCloseRequested, this);
    panel.tabs.tabDetachRequested.connect(this._onTabDetachRequested, this);
    panel.stack.widgetRemoved.connect(this._onWidgetRemoved, this);
    return panel;
  }

  /**
   * Create a new dock split panel for the dock panel.
   */
  private _createSplitPanel(orientation: Orientation): DockSplitPanel {
    var panel = new DockSplitPanel();
    panel.orientation = orientation;
    panel.spacing = this.spacing;
    return panel;
  }

  /**
   * Remove an empty dock tab panel from the hierarchy.
   *
   * This ensures that the hierarchy is kept consistent by merging an
   * ancestor split panel when it contains only a single child widget.
   */
  private _removePanel(panel: DockTabPanel): void {
    // The parent of a tab panel is always a split panel.
    var splitPanel = panel.parent as DockSplitPanel;

    // Dispose the panel to ensure its resources are released.
    panel.dispose();

    // If the split panel still has multiple children after removing
    // the target panel, nothing else needs to be done.
    if (splitPanel.childCount > 1) {
      return;
    }

    // If the split panel is the root panel and has a remaining child
    // which is a split panel, that child becomes the root.
    if (splitPanel === this._root) {
      if (splitPanel.childCount === 1) {
        var child = splitPanel.childAt(0);
        if (child instanceof DockSplitPanel) {
          var sizes = child.sizes();
          splitPanel.parent = null;
          this._root = child;
          this.addChild(child);
          child.setSizes(sizes);
          splitPanel.dispose();
        }
      }
      return;
    }

    // Non-root split panels always have a split panel parent and are
    // always created with 2 children, so the split panel is guaranteed
    // to have a single child at this point. Also, split panels always
    // have an orthogonal orientation to their parent, so a grandparent
    // and a grandchild split panel will have the same orientation. This
    // means the children of the grandchild can be merged as children of
    // the grandparent.
    var gParent = splitPanel.parent as DockSplitPanel;
    var gSizes = gParent.sizes();
    var gChild = splitPanel.childAt(0);
    var index = gParent.childIndex(splitPanel);
    splitPanel.parent = null;
    if (gChild instanceof DockTabPanel) {
      gParent.insertChild(index, gChild);
    } else {
      var gcsp = gChild as DockSplitPanel;
      var gcspSizes = gcsp.sizes();
      var sizeShare = arrays.removeAt(gSizes, index);
      for (var i = 0; gcsp.childCount !== 0; ++i) {
        gParent.insertChild(index + i, gcsp.childAt(0));
        arrays.insert(gSizes, index + i, sizeShare * gcspSizes[i]);
      }
    }
    gParent.setSizes(gSizes);
    splitPanel.dispose();
  }

  /**
   * Abort the tab drag operation if one is in progress.
   */
  private _abortDrag(): void {
    var dragData = this._dragData;
    if (!dragData) {
      return;
    }
    this._dragData = null;

    // Release the mouse grab and restore the application cursor.
    document.removeEventListener('mouseup', this, true);
    document.removeEventListener('mousemove', this, true);
    document.removeEventListener('contextmenu', this, true);
    dragData.cursorGrab.dispose();

    // Hide the dock zone overlay.
    this._overlay.hide();

    // Restore the tab to its original location in its owner panel.
    var item = dragData.item;
    var tabStyle = item.tab.node.style;
    item.tab.removeClass(DOCKING_CLASS);
    tabStyle.top = '';
    tabStyle.left = '';
    item.panel.tabs.insertTab(dragData.index, item.tab);
  }

  /**
   * Find the dock item which contains the given tab.
   *
   * Returns `undefined` if there is no matching item.
   */
  private _findItemByTab(tab: Tab): IDockItem {
    return arrays.find(this._items, item => item.tab === tab);
  }

  /**
   * Find the dock item which contains the given widget.
   *
   * Returns `undefined` if there is no matching item.
   */
  private _findItemByWidget(widget: Widget): IDockItem {
    return arrays.find(this._items, item => item.widget === widget);
  }

  /**
   * Show the dock panel overlay indicator at the given client position.
   *
   * If the position is not over a dock zone, the overlay is hidden.
   */
  private _showOverlay(clientX: number, clientY: number): void {
    // Find the dock target for the given client position.
    var data = findDockTarget(this._root, clientX, clientY);

    // If the dock zone is invalid, hide the overlay and bail.
    if (data.zone === DockZone.Invalid) {
      this._overlay.hide();
      return;
    }

    // Setup the variables needed to compute the overlay geometry.
    var top: number;
    var left: number;
    var width: number;
    var height: number;
    var box = boxSizing(this.node);
    var rect = this.node.getBoundingClientRect();

    // Compute the overlay geometry based on the dock zone.
    switch (data.zone) {
    case DockZone.EdgeTop:
      top = box.paddingTop;
      left = box.paddingLeft;
      width = rect.width - box.horizontalSum;
      height = (rect.height - box.verticalSum) / 3;
      break;
    case DockZone.EdgeLeft:
      top = box.paddingTop;
      left = box.paddingLeft;
      width = (rect.width - box.horizontalSum) / 3;
      height = rect.height - box.verticalSum;
      break;
    case DockZone.EdgeRight:
      top = box.paddingTop;
      width = (rect.width - box.horizontalSum) / 3;
      left = box.paddingLeft + 2 * width;
      height = rect.height - box.verticalSum;
      break;
    case DockZone.EdgeBottom:
      height = (rect.height - box.verticalSum) / 3;
      top = box.paddingTop + 2 * height;
      left = box.paddingLeft;
      width = rect.width - box.horizontalSum;
      break;
    case DockZone.PanelTop:
      var pr = data.panel.node.getBoundingClientRect();
      top = pr.top - rect.top - box.borderTop;
      left = pr.left - rect.left - box.borderLeft;
      width = pr.width;
      height = pr.height / 2;
      break;
    case DockZone.PanelLeft:
      var pr = data.panel.node.getBoundingClientRect();
      top = pr.top - rect.top - box.borderTop;
      left = pr.left - rect.left - box.borderLeft;
      width = pr.width / 2;
      height = pr.height;
      break;
    case DockZone.PanelRight:
      var pr = data.panel.node.getBoundingClientRect();
      top = pr.top - rect.top - box.borderTop;
      left = pr.left - rect.left - box.borderLeft + pr.width / 2;
      width = pr.width / 2;
      height = pr.height;
      break;
    case DockZone.PanelBottom:
      var pr = data.panel.node.getBoundingClientRect();
      top = pr.top - rect.top - box.borderTop + pr.height / 2;
      left = pr.left - rect.left - box.borderLeft;
      width = pr.width;
      height = pr.height / 2;
      break;
    case DockZone.PanelCenter:
      var pr = data.panel.node.getBoundingClientRect();
      top = pr.top - rect.top - box.borderTop;
      left = pr.left - rect.left - box.borderLeft;
      width = pr.width;
      height = pr.height;
      break;
    }

    // Show the overlay at the computed zone position.
    this._overlay.show(data.zone, left, top, width, height);
  }

  /**
   * The change handler for the [[spacingProperty]].
   */
  private _onSpacingChanged(old: number, value: number): void {
    this._root.setSpacingRecursive(value);
  }

  /**
   * Handle the `tabSelected` signal from a tab bar.
   */
  private _onTabSelected(sender: TabBar, args: ITabIndexArgs): void {
    var item = this._findItemByTab(args.tab);
    if (item) item.panel.stack.currentWidget = item.widget;
  }

  /**
   * Handle the `tabCloseRequested` signal from a tab bar.
   */
  private _onTabCloseRequested(sender: TabBar, args: ITabIndexArgs): void {
    var item = this._findItemByTab(args.tab);
    if (item) item.widget.close();
  }

  /**
   * Handle the `tabDetachRequested` signal from the tab bar.
   */
  private _onTabDetachRequested(sender: TabBar, args: ITabDetachArgs): void {
    // Find the dock item for the detach or bail if not found.
    var item = this._findItemByTab(args.tab);
    if (!item) {
      return;
    }

    // Setup the drag data object.
    this._dragData = {
      item: item,
      index: args.index,
      prevTab: sender.previousTab,
      cursorGrab: overrideCursor('default'),
    };

    // Unset the tab before detaching so that the content widget does
    // not change during the drag operation.
    sender.selectedTab = null;
    sender.removeTabAt(args.index);

    // Setup the style and position for the floating tab.
    var style = args.tab.node.style;
    style.zIndex = '';
    style.top = args.clientY + 'px';
    style.left = args.clientX + 'px';
    args.tab.addClass(DOCKING_CLASS);

    // Add the tab to the document body.
    document.body.appendChild(args.tab.node);

    // Attach the necessary mouse event listeners.
    document.addEventListener('mouseup', this, true);
    document.addEventListener('mousemove', this, true);
    document.addEventListener('contextmenu', this, true);
  }

  /**
   * Handle the `widgetRemoved` signal from a stacked widget.
   */
  private _onWidgetRemoved(sender: StackedPanel, args: IWidgetIndexArgs): void {
    var item = this._findItemByWidget(args.widget);
    if (!item) {
      return;
    }
    this._abortDrag();
    arrays.remove(this._items, item);
    item.panel.tabs.removeTab(item.tab);
    if (item.panel.stack.childCount === 0) {
      this._removePanel(item.panel);
    }
  }

  private _droppable: boolean = false;
  private _root: DockSplitPanel;
  private _items: IDockItem[] = [];
  private _dragData: IDragData = null;
  private _overlay = new DockPanelOverlay();
}


/**
 * An item which holds data for a widget in a dock panel.
 */
interface IDockItem {
  /**
   * The widget tab at the time the widget was inserted.
   */
  tab: Tab;

  /**
   * The widget added to the dock panel.
   */
  widget: Widget;

  /**
   * The tab panel which owns the widget.
   */
  panel: DockTabPanel;
}


/**
 * An object which holds drag data for a dock panel.
 */
interface IDragData {
  /**
   * The item associated with the drag.
   */
  item: IDockItem;

  /**
   * The original index of the tab.
   */
  index: number;

  /**
   * The previous tab of the tab bar which owned the docking tab.
   */
  prevTab: Tab;

  /**
   * The cursor override disposable.
   */
  cursorGrab: IDisposable;
}


/**
 * An enum of the interactive dock zones for a dock panel.
 */
const enum DockZone {
  /**
   * The dock zone at the top edge of the root split panel.
   */
  EdgeTop,

  /**
   * The dock zone at the left edge of the root split panel.
   */
  EdgeLeft,

  /**
   * The dock zone at the right edge of the root split panel.
   */
  EdgeRight,

  /**
   * The dock zone at the bottom edge of the root split panel.
   */
  EdgeBottom,

  /**
   * The dock zone at the top third of a tab panel.
   */
  PanelTop,

  /**
   * The dock zone at the left third of a tab panel.
   */
  PanelLeft,

  /**
   * The dock zone at the right third of a tab panel.
   */
  PanelRight,

  /**
   * The dock zone at the bottom third of a tab panel.
   */
  PanelBottom,

  /**
   * The dock zone at the center of a tab panel.
   */
  PanelCenter,

  /**
   * An invalid dock zone.
   */
  Invalid,
}


/**
 * The result object for a dock target hit test.
 */
interface IDockTarget {
  /**
   * The dock zone at the specified position.
   *
   * This will be `Invalid` if the position is not over a dock zone.
   */
  zone: DockZone;

  /**
   * The dock tab panel for the panel dock zone.
   *
   * This will be null if the dock zone is not a panel zone.
   */
  panel: DockTabPanel;
}


/**
 * A node wrapper used as an overlay dock indicator for a dock panel.
 */
class DockPanelOverlay extends NodeWrapper {
  /**
   * A mapping of dock zone enum value to modifier class.
   */
  static zoneMap = [  // keep in-sync with DockZone enum
    EDGE_TOP_CLASS,
    EDGE_LEFT_CLASS,
    EDGE_RIGHT_CLASS,
    EDGE_BOTTOM_CLASS,
    PANEL_TOP_CLASS,
    PANEL_LEFT_CLASS,
    PANEL_RIGHT_CLASS,
    PANEL_BOTTOM_CLASS,
    PANEL_CENTER_CLASS
  ];

  /**
   * Construct a new dock panel overlay.
   */
  constructor() {
    super();
    this.addClass(OVERLAY_CLASS);
    this.addClass(HIDDEN_CLASS);
  }

  /**
   * Show the overlay with the given zone and geometry
   */
  show(zone: DockZone, left: number, top: number, width: number, height: number): void {
    var style = this.node.style;
    style.top = top + 'px';
    style.left = left + 'px';
    style.width = width + 'px';
    style.height = height + 'px';
    this.removeClass(HIDDEN_CLASS);
    this._setZone(zone);
  }

  /**
   * Hide the overlay and reset its zone.
   */
  hide(): void {
    this.addClass(HIDDEN_CLASS);
    this._setZone(DockZone.Invalid);
  }

  /**
   * Set the dock zone for the overlay.
   */
  private _setZone(zone: DockZone): void {
    if (zone === this._zone) {
      return;
    }
    var oldClass = DockPanelOverlay.zoneMap[this._zone];
    var newClass = DockPanelOverlay.zoneMap[zone];
    if (oldClass) this.removeClass(oldClass);
    if (newClass) this.addClass(newClass);
    this._zone = zone;
  }

  private _zone = DockZone.Invalid;
}


/**
 * A split panel used by a DockPanel.
 */
class DockSplitPanel extends SplitPanel {
  /**
   * Construct a new dock split panel.
   */
  constructor() {
    super();
    this.addClass(SPLIT_PANEL_CLASS);
  }

  /**
   * Recursively set the spacing for the split panel hierarchy.
   */
  setSpacingRecursive(spacing: number): void {
    for (var i = 0, n = this.childCount; i < n; ++i) {
      var child = this.childAt(i);
      if (child instanceof DockSplitPanel) {
        child.setSpacingRecursive(spacing);
      }
    }
    this.spacing = spacing;
  }
}


/**
 * A tabbed panel used by a DockPanel.
 *
 * This tab panel acts as a simple container for a tab bar and stacked
 * panel. The dock panel manages the tab bar and stacked panel directly,
 * as there is not always a 1:1 association between a tab and panel.
 */
class DockTabPanel extends BoxPanel {
  /**
   * Construct a new dock tab panel.
   */
  constructor() {
    super();
    this.addClass(TAB_PANEL_CLASS);

    this.direction = BoxPanel.TopToBottom;
    this.spacing = 0;

    BoxPanel.setStretch(this._tabs, 0);
    BoxPanel.setStretch(this._stack, 1);

    this.addChild(this._tabs);
    this.addChild(this._stack);
  }

  /**
   * Dispose of the resources held by the widget.
   */
  dispose(): void {
    this._tabs = null;
    this._stack = null;
    super.dispose();
  }

  /**
   * Get the tab bar for the dock tab panel.
   */
  get tabs(): TabBar {
    return this._tabs;
  }

  /**
   * Get the stacked panel for the dock tab panel.
   */
  get stack(): StackedPanel {
    return this._stack;
  }

  private _tabs = new TabBar();
  private _stack = new StackedPanel();
}


/**
 * Find the dock target for the given client position.
 *
 * If the position does not represent a valid dock target, the `zone`
 * property of the dock target will be `Invalid`.
 */
function findDockTarget(root: DockSplitPanel, clientX: number, clientY: number): IDockTarget {
  var rect = root.node.getBoundingClientRect();
  if (!hitTestRect(rect, clientX, clientY)) {
    return { zone: DockZone.Invalid, panel: null };
  }
  var zone = getEdgeZone(rect, clientX, clientY);
  if (zone !== DockZone.Invalid) {
    return { zone, panel: null };
  }
  return findTargetRecursive(root, clientX, clientY);
}


/**
 * Recursively find the panel dock target for the client position.
 *
 * If the position does not represent a valid dock target, the `zone`
 * property of the dock target will be `Invalid`.
 */
function findTargetRecursive(panel: DockSplitPanel, clientX: number, clientY: number): IDockTarget {
  for (var i = 0, n = panel.childCount; i < n; ++i) {
    var child = panel.childAt(i);
    var rect = child.node.getBoundingClientRect();
    if (!hitTestRect(rect, clientX, clientY)) {
      continue;
    }
    if (child instanceof DockSplitPanel) {
      return findTargetRecursive(child, clientX, clientY);
    }
    if (child instanceof DockTabPanel) {
      return { zone: getPanelZone(rect, clientX, clientY), panel: child };
    }
  }
  return { zone: DockZone.Invalid, panel: null };
}


/**
 * Get the panel zone for the given client rect and position.
 *
 * This assumes the position lies within the client rect.
 *
 * Returns the `Invalid` zone if the position is not within the edge.
 */
function getEdgeZone(r: ClientRect, x: number, y: number): DockZone {
  var zone: DockZone;
  if (x < r.left + EDGE_SIZE) {
    if (y - r.top < x - r.left) {
      zone = DockZone.EdgeTop;
    } else if (r.bottom - y < x - r.left) {
      zone = DockZone.EdgeBottom;
    } else {
      zone = DockZone.EdgeLeft;
    }
  } else if (x >= r.right - EDGE_SIZE) {
    if (y - r.top < r.right - x) {
      zone = DockZone.EdgeTop;
    } else if (r.bottom - y < r.right - x) {
      zone = DockZone.EdgeBottom;
    } else {
      zone = DockZone.EdgeRight;
    }
  } else if (y < r.top + EDGE_SIZE) {
    zone = DockZone.EdgeTop;
  } else if (y >= r.bottom - EDGE_SIZE) {
    zone = DockZone.EdgeBottom;
  } else {
    zone = DockZone.Invalid;
  }
  return zone;
}


/**
 * Get the panel zone for the given client rect and position.
 *
 * This assumes the position lies within the client rect.
 *
 * This always returns a valid zone.
 */
function getPanelZone(r: ClientRect, x: number, y: number): DockZone {
  var zone: DockZone;
  var fracX = (x - r.left) / r.width;
  var fracY = (y - r.top) / r.height;
  if (fracX < 1 / 3) {
    if (fracY < fracX) {
      zone = DockZone.PanelTop;
    } else if (1 - fracY < fracX) {
      zone = DockZone.PanelBottom;
    } else {
      zone = DockZone.PanelLeft;
    }
  } else if (fracX < 2 / 3) {
    if (fracY < 1 / 3) {
      zone = DockZone.PanelTop;
    } else if (fracY < 2 / 3) {
      zone = DockZone.PanelCenter;
    } else {
      zone = DockZone.PanelBottom;
    }
  } else {
    if (fracY < 1 - fracX) {
      zone = DockZone.PanelTop;
    } else if (fracY > fracX) {
      zone = DockZone.PanelBottom;
    } else {
      zone = DockZone.PanelRight;
    }
  }
  return zone;
}


/**
 * Test whether a client rect contains the given client position.
 */
function hitTestRect(r: ClientRect, x: number, y: number): boolean {
  return x >= r.left && y >= r.top && x < r.right && y < r.bottom;
}
