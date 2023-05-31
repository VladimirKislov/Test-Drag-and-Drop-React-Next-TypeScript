"use client";
import React, { useState } from "react";
import styles from './style.module.scss'

import { PageTree } from "@/components/PageTree";
import { IPageProps } from "@/app/types";

const Home: React.FC = () => {
  const initialPages: IPageProps[] = [
    { id: 1, title: "Главная", parent_id: null },
    { id: 2, title: "О нас", parent_id: 1 },
    { id: 3, title: "Контакты", parent_id: 1 },
    { id: 4, title: "Телефоны", parent_id: 3 },
    { id: 5, title: "Адрес", parent_id: 3 },
    { id: 6, title: "Каталог", parent_id: 8 },
    { id: 7, title: "Главная 2", parent_id: null },
    { id: 8, title: "Главная 3", parent_id: null },
    { id: 9, title: "Товары", parent_id: 6 },
    { id: 10, title: "Услуги", parent_id: 6 },
  ];

  const [pages, setPages] = useState<IPageProps[]>(initialPages);

  const handleNodeDrag = (nodeId: number, parentId: number | null) => {
    const updatedPages: IPageProps[] = [...pages];
    const draggedNodeIndex: number = updatedPages.findIndex(
      (node: IPageProps) => node.id === nodeId
    );

    if (draggedNodeIndex !== -1) {
      const draggedNode = updatedPages[draggedNodeIndex];

      if (parentId === null) {
        draggedNode.parent_id = null;
      } else {
        draggedNode.parent_id = parentId;
      }

      updatedPages.splice(draggedNodeIndex, 1);
      setPages([...updatedPages, draggedNode]);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Дерево вложенных страниц</h1>
      <PageTree tree={pages} onNodeDrag={handleNodeDrag} />
    </div>
  );
};

export default Home;
