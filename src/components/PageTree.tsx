import React, { useState } from "react";
import styles from "./style.module.scss";

import { IPageProps, ITreeProps } from "@/app/types";

const PageTree: React.FC<ITreeProps> = ({ tree, onNodeDrag }) => {
  const [isDragged, setIsDragged] = useState(false);

  const isAncestorNode = (parent: IPageProps | undefined, childId: number): boolean => {
    if (!parent) return false;
    if (parent.id === childId) return true;

    const grandparent = tree.find((page) => page.id === parent.parent_id);
    return isAncestorNode(grandparent, childId);
  };

  const renderNodeChild = (node: IPageProps) => {
    const hasChildren = tree.some((page) => page.parent_id === node.id);
    const isRootTree = tree.some((page) => page.id === node.parent_id);

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: IPageProps) => {
      if (item.parent_id === null) return;
      e.dataTransfer.setData("text/plain", node.id.toString());
      setIsDragged(true);
    };
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLDivElement;
      target.style.background = "#d2691e";
      setIsDragged(false);
    };
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      const target = e.currentTarget as HTMLDivElement;
      target.style.background = "#eee";
    };
    const handleDrop = (e: React.DragEvent<HTMLDivElement>, item: IPageProps) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLDivElement;
      target.style.background = "#eee";
      const nodeId = Number(e.dataTransfer.getData("text/plain"));

      if (isAncestorNode(item, nodeId)) {
        setIsDragged(false);
        return;
      }
      onNodeDrag(nodeId, item.id);
      setIsDragged(false);
    };

    return (
      <div key={node.id} className={styles.listItem}>
        <div
          draggable
          onDragStart={(e) => handleDragStart(e, node)}
          onDragOver={(e) => handleDragOver(e)}
          onDragLeave={(e) => handleDragLeave(e)}
          onDragEnd={(e) => handleDragLeave(e)}
          onDrop={(e) => handleDrop(e, node)}
          className={styles.pageItem}
        >
          {isDragged ? (
            <div className={styles.titleIsDrag}>{node.title}</div>
          ) : (
            <div className={styles.titleIsDrop}>
              {node.title}
              {isRootTree ? <div className={styles.line} /> : <></>}
            </div>
          )}
        </div>
        {hasChildren && (
          <div className={styles.wrapperChild}>
            {tree
              .filter((page) => page.parent_id === node.id)
              .map((childNode) => renderNodeChild(childNode))}
          </div>
        )}
      </div>
    );
  };

  const sourceNode = tree.filter((page) => page.parent_id === null);

  return <div className={styles.container}>{sourceNode.map((node) => renderNodeChild(node))}</div>;
};

export { PageTree };
