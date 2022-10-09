/**
 * TreeView Component
 *
 * @see Docs     Storybook Link
 * @see Source   https://github.com/opendigitaleducation/ode-react-ui/blob/main/libs/advanced/src/TreeView/TreeView.tsx
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/treeview/
 */

import TreeItem from "@mui/lab/TreeItem";
import TreeView from "@mui/lab/TreeView";
import { ArrowRight, ArrowDown } from "@ode-react-ui/icons";

import { RenderTree } from "./TreeViewProps";

/**
 * TreeView component for file system navigation
 */
export default function RichObjectTreeView({ data }: any) {
  const renderTree = (nodes: RenderTree) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <TreeView
      aria-label="rich object"
      defaultCollapseIcon={<ArrowDown />}
      defaultExpanded={["root"]}
      defaultExpandIcon={<ArrowRight />}
      sx={{ height: 500, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
    >
      {renderTree(data)}
    </TreeView>
  );
}