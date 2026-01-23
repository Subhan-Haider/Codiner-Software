import React from "react";
import { Folder, FolderOpen, Search } from "lucide-react";
import { selectedFileAtom } from "@/atoms/viewAtoms";
import { useSetAtom } from "jotai";

interface FileTreeProps {
  files: string[];
}

interface TreeNode {
  name: string;
  path: string;
  isDirectory: boolean;
  children: TreeNode[];
}

// Convert flat file list to tree structure
const buildFileTree = (files: string[]): TreeNode[] => {
  const root: TreeNode[] = [];

  files.forEach((path) => {
    const parts = path.split("/");
    let currentLevel = root;

    parts.forEach((part, index) => {
      const isLastPart = index === parts.length - 1;
      const currentPath = parts.slice(0, index + 1).join("/");

      // Check if this node already exists at the current level
      const existingNode = currentLevel.find((node) => node.name === part);

      if (existingNode) {
        // If we found the node, just drill down to its children for the next level
        currentLevel = existingNode.children;
      } else {
        // Create a new node
        const newNode: TreeNode = {
          name: part,
          path: currentPath,
          isDirectory: !isLastPart,
          children: [],
        };

        currentLevel.push(newNode);
        currentLevel = newNode.children;
      }
    });
  });

  return root;
};

// File tree component
export const FileTree = ({ files }: FileTreeProps) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredFiles = React.useMemo(() => {
    if (!searchQuery.trim()) return files;
    const query = searchQuery.toLowerCase();
    return files.filter((file) => file.toLowerCase().includes(query));
  }, [files, searchQuery]);

  const treeData = buildFileTree(filteredFiles);
  const isSearching = !!searchQuery.trim();

  return (
    <div className="file-tree mt-2">
      <div className="px-2 mb-2">
        <div className="relative">
          <Search
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={14}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search files..."
            className="w-full pl-8 pr-2 py-1 text-sm bg-transparent border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
      <TreeNodes nodes={treeData} level={0} expandAll={isSearching} />
    </div>
  );
};

interface TreeNodesProps {
  nodes: TreeNode[];
  level: number;
  expandAll?: boolean;
}

// Sort nodes to show directories first
const sortNodes = (nodes: TreeNode[]): TreeNode[] => {
  return [...nodes].sort((a, b) => {
    if (a.isDirectory === b.isDirectory) {
      return a.name.localeCompare(b.name);
    }
    return a.isDirectory ? -1 : 1;
  });
};

// Tree nodes component
const TreeNodes = ({ nodes, level, expandAll }: TreeNodesProps) => (
  <ul className="ml-4">
    {sortNodes(nodes).map((node) => (
      <TreeNode key={node.path} node={node} level={level} expandAll={expandAll} />
    ))}
  </ul>
);

interface TreeNodeProps {
  node: TreeNode;
  level: number;
  expandAll?: boolean;
}

// Individual tree node component
const TreeNode = ({ node, level, expandAll }: TreeNodeProps) => {
  const [expanded, setExpanded] = React.useState(level < 2);
  const setSelectedFile = useSetAtom(selectedFileAtom);

  React.useEffect(() => {
    if (expandAll) {
      setExpanded(true);
    }
  }, [expandAll]);

  const handleClick = () => {
    if (node.isDirectory) {
      setExpanded(!expanded);
    } else {
      setSelectedFile({
        path: node.path,
      });
    }
  };

  return (
    <li className="py-0.5">
      <div
        className="flex items-center hover:bg-(--sidebar) rounded cursor-pointer px-1.5 py-0.5 text-sm"
        onClick={handleClick}
      >
        {node.isDirectory && (
          <span className="mr-1 text-gray-500">
            {expanded ? <FolderOpen size={16} /> : <Folder size={16} />}
          </span>
        )}
        <span>{node.name}</span>
      </div>

      {node.isDirectory && expanded && node.children.length > 0 && (
        <TreeNodes nodes={node.children} level={level + 1} expandAll={expandAll} />
      )}
    </li>
  );
};
