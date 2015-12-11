import { Message } from 'phosphor-messaging';
import { Property } from 'phosphor-properties';
import { StackedPanel } from 'phosphor-stackedpanel';
import { Widget } from 'phosphor-widget';
/**
 * A panel which provides a flexible docking area for content widgets.
 *
 * #### Notes
 * Widgets should be added to a `DockPanel` using one of the dedicated
 * insertion methods. The `children` widget list should not be used. A
 * widget can be removed by setting its `parent` to `null`.
 */
export declare class DockPanel extends StackedPanel {
    /**
     * Ensure the specified content widget is selected.
     *
     * @param widget - The content widget of interest.
     *
     * #### Notes
     * If the widget is not contained in a dock panel, or is already
     * the selected tab in its respective tab panel, this is a no-op.
     */
    static select(widget: Widget): void;
    /**
     * The property descriptor for the spacing between panels.
     *
     * The default value is `3`.
     *
     * **See also:** [[spacing]]
     */
    static spacingProperty: Property<DockPanel, number>;
    /**
     * Construct a new dock panel.
     */
    constructor();
    /**
     * Get the spacing between panels.
     *
     * #### Notes
     * This is a pure delegate to the [[spacingProperty]].
     */
    /**
     * Set the spacing between panels.
     *
     * #### Notes
     * This is a pure delegate to the [[spacingProperty]].
     */
    spacing: number;
    /**
     * Insert a widget as a new panel above a reference widget.
     *
     * @param widget - The widget to insert into the dock panel.
     *
     * @param ref - The reference widget. If this is not provided, the
     *   widget will be inserted at the top edge of the dock panel.
     *
     * @throws An error if either `widget` or `ref` is invalid.
     */
    insertTop(widget: Widget, ref?: Widget): void;
    /**
     * Insert a widget as a new panel to the left of a reference widget.
     *
     * @param widget - The widget to insert into the dock panel.
     *
     * @param ref - The reference widget. If this is not provided, the
     *   widget will be inserted at the left edge of the dock panel.
     *
     * @throws An error if either `widget` or `ref` is invalid.
     */
    insertLeft(widget: Widget, ref?: Widget): void;
    /**
     * Insert a widget as a new panel to the right of a reference widget.
     *
     * @param widget - The widget to insert into the dock panel.
     *
     * @param ref - The reference widget. If this is not provided, the
     *   widget will be inserted at the right edge of the dock panel.
     *
     * @throws An error if either `widget` or `ref` is invalid.
     */
    insertRight(widget: Widget, ref?: Widget): void;
    /**
     * Insert a widget as a new panel below a reference widget.
     *
     * @param widget - The widget to insert into the dock panel.
     *
     * @param ref - The reference widget. If this is not provided, the
     *   widget will be inserted at the bottom edge of the dock panel.
     *
     * @throws An error if either `widget` or `ref` is invalid.
     */
    insertBottom(widget: Widget, ref?: Widget): void;
    /**
     * Insert a widget as a sibling tab before a reference widget.
     *
     * @param widget - The widget to insert into the dock panel.
     *
     * @param ref - The reference widget. If this is not provided, the
     *   widget will be inserted as the first tab in the top-left panel.
     *
     * @throws An error if either `widget` or `ref` is invalid.
     */
    insertTabBefore(widget: Widget, ref?: Widget): void;
    /**
     * Insert a widget as a sibling tab after a reference widget.
     *
     * @param widget - The widget to insert into the dock panel.
     *
     * @param ref - The reference widget. If this is not provided, the
     *   widget will be inserted as the last tab in the top-left panel.
     *
     * @throws An error if either `widget` or `ref` is invalid.
     */
    insertTabAfter(widget: Widget, ref?: Widget): void;
    /**
     * Handle the DOM events for the dock panel.
     *
     * @param event - The DOM event sent to the dock panel.
     *
     * #### Notes
     * This method implements the DOM `EventListener` interface and is
     * called in response to events on the dock panel's node. It should
     * not be called directly by user code.
     */
    handleEvent(event: Event): void;
    /**
     * A message handler invoked on an `'after-attach'` message.
     */
    protected onAfterAttach(msg: Message): void;
    /**
     * A message handler invoked on a `'before-detach'` message.
     */
    protected onBeforeDetach(msg: Message): void;
    /**
     * Handle the `'p-dragenter'` event for the dock panel.
     */
    private _evtDragEnter(event);
    /**
     * Handle the `'p-dragleave'` event for the dock panel.
     */
    private _evtDragLeave(event);
    /**
     * Handle the `'p-dragover'` event for the dock panel.
     */
    private _evtDragOver(event);
    /**
     * Handle the `'p-drop'` event for the dock panel.
     */
    private _evtDrop(event);
}
