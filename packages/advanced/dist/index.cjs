"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const React=require("react"),icons=require("@ode-react-ui/icons"),_interopDefaultLegacy=e=>e&&typeof e=="object"&&"default"in e?e:{default:e},React__default=_interopDefaultLegacy(React),TreeItem=props=>{const{nodeId,label,children,section,selected,select}=props,[expanded,setExpanded]=React.useState(!1),handleInteraction=event=>{event.preventDefault(),setExpanded(!expanded),select(nodeId),event.stopPropagation()},renderItem=()=>React__default.default.createElement("li",{id:nodeId,role:"treeitem","aria-selected":selected},React__default.default.createElement("div",{onClick:handleInteraction,onKeyPress:handleInteraction,role:"button",tabIndex:0,"aria-expanded":expanded},React__default.default.createElement("div",null,Array.isArray(children)&&!expanded&&React__default.default.createElement(icons.RafterRight,{title:"RafterRight"}),Array.isArray(children)&&expanded&&React__default.default.createElement(icons.RafterDown,{title:"RafterDown"}),section&&React__default.default.createElement(icons.Folder,{title:"Folder"}),React__default.default.createElement("span",null,label)),Array.isArray(children)&&React__default.default.createElement("ul",{role:"group"},children)));return section?React__default.default.createElement("ul",{role:"tree"},renderItem()):renderItem()};TreeItem.displayName="TreeItem";const TreeView=React.forwardRef(({data},ref)=>{const[selectedItem,setSelectedItem]=React.useState(""),handleSelected=selectedNodeId=>{setSelectedItem(selectedNodeId)},renderTree=node=>React__default.default.createElement(TreeItem,{key:node.id,nodeId:node.id,label:node.name,section:node.section,selected:selectedItem===node.id,select:handleSelected},Array.isArray(node.children)?node.children.map(item=>renderTree(item)):null);return React__default.default.createElement("div",{id:"treeview",ref,className:"treeview"},renderTree(data))});TreeView.displayName="TreeView";const TreeView$1=TreeView;exports.TreeView=TreeView$1;
